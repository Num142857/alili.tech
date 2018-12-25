---
title: 'Vue2 源码漫游（一）' 
date: 2018-12-26 2:30:14
hidden: true
slug: kkovjwosiwr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue2 源码漫游（一）</h2>
<h3 id="articleHeader1">描述：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue框架中的基本原理可能大家都基本了解了，但是还没有漫游一下源码。
所以，觉得还是有必要跑一下。
由于是代码漫游，所以大部分为关键性代码，以主线路和主要分支的代码为主，大部分理解都写在代码注释中。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>Vue框架中的基本原理可能大家都基本了解了，但是还没有漫游一下源码。
所以，觉得还是有必要跑一下。
由于是代码漫游，所以大部分为关键性代码，以主线路和主要分支的代码为主，大部分理解都写在代码注释中。

</code></pre>
<hr>
<h2 id="articleHeader2">一、代码主线</h2>
<p>文件结构1--&gt;4，代码执行顺序4--&gt;1</p>
<p><span class="img-wrap"><img data-src="/img/bVX3C4?w=293&amp;h=623" src="https://static.alili.tech/img/bVX3C4?w=293&amp;h=623" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">1.<strong>platforms/web/entry-runtime.js/index.js</strong>
</h2>
<p>web不同平台入口；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

import Vue from './runtime/index'

export default Vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'./runtime/index'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue
</code></pre>
<h2 id="articleHeader4">2.<strong>runtime/index.js</strong>
</h2>
<p>为Vue配置一些属性方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives &amp; components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el &amp;&amp; inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
Vue.nextTick(() => {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue)
    } else if (process.env.NODE_ENV !== 'production' &amp;&amp; isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    config.productionTip !== false &amp;&amp;
    inBrowser &amp;&amp; typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      `You are running Vue in development mode.\n` +
      `Make sure to turn on production mode when deploying for production.\n` +
      `See more tips at https://vuejs.org/guide/deployment.html`
    )
  }
}, 0)

export default Vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'core/index'</span>
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'core/config'</span>
<span class="hljs-keyword">import</span> { extend, noop } <span class="hljs-keyword">from</span> <span class="hljs-string">'shared/util'</span>
<span class="hljs-keyword">import</span> { mountComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'core/instance/lifecycle'</span>
<span class="hljs-keyword">import</span> { devtools, inBrowser, isChrome } <span class="hljs-keyword">from</span> <span class="hljs-string">'core/util/index'</span>

<span class="hljs-keyword">import</span> {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} <span class="hljs-keyword">from</span> <span class="hljs-string">'web/util/index'</span>

<span class="hljs-keyword">import</span> { patch } <span class="hljs-keyword">from</span> <span class="hljs-string">'./patch'</span>
<span class="hljs-keyword">import</span> platformDirectives <span class="hljs-keyword">from</span> <span class="hljs-string">'./directives/index'</span>
<span class="hljs-keyword">import</span> platformComponents <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/index'</span>

<span class="hljs-comment">// install platform specific utils</span>
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

<span class="hljs-comment">// install platform runtime directives &amp; components</span>
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

<span class="hljs-comment">// install platform patch function</span>
Vue.prototype.__patch__ = inBrowser ? patch : noop

<span class="hljs-comment">// public mount method</span>
Vue.prototype.$mount = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
  el?: <span class="hljs-built_in">string</span> | Element,
  hydrating?: <span class="hljs-built_in">boolean</span>
</span>): <span class="hljs-title">Component</span> </span>{
  el = el &amp;&amp; inBrowser ? query(el) : <span class="hljs-literal">undefined</span>
  <span class="hljs-keyword">return</span> mountComponent(<span class="hljs-keyword">this</span>, el, hydrating)
}

<span class="hljs-comment">// devtools global hook</span>
<span class="hljs-comment">/* istanbul ignore next */</span>
Vue.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (config.devtools) {
    <span class="hljs-keyword">if</span> (devtools) {
      devtools.emit(<span class="hljs-string">'init'</span>, Vue)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; isChrome) {
      <span class="hljs-built_in">console</span>[<span class="hljs-built_in">console</span>.info ? <span class="hljs-string">'info'</span> : <span class="hljs-string">'log'</span>](
        <span class="hljs-string">'Download the Vue Devtools extension for a better development experience:\n'</span> +
        <span class="hljs-string">'https://github.com/vuejs/vue-devtools'</span>
      )
    }
  }
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp;
    config.productionTip !== <span class="hljs-literal">false</span> &amp;&amp;
    inBrowser &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span> !== <span class="hljs-string">'undefined'</span>
  ) {
    <span class="hljs-built_in">console</span>[<span class="hljs-built_in">console</span>.info ? <span class="hljs-string">'info'</span> : <span class="hljs-string">'log'</span>](
      <span class="hljs-string">`You are running Vue in development mode.\n`</span> +
      <span class="hljs-string">`Make sure to turn on production mode when deploying for production.\n`</span> +
      <span class="hljs-string">`See more tips at https://vuejs.org/guide/deployment.html`</span>
    )
  }
}, <span class="hljs-number">0</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue
</code></pre>
<h2 id="articleHeader5">3.<strong>core/index.js</strong>
</h2>
<p><span class="img-wrap"><img data-src="/img/bVXZxt?w=573&amp;h=398" src="https://static.alili.tech/img/bVXZxt?w=573&amp;h=398" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // 重写config,创建了一个configDef对象，最终目的是为了Object.defineProperty(Vue, 'config', configDef)
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)
  // 具体Vue.congfig的具体内容就要看../config文件了

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on them unless you are aware of the risk.
  // 添加一些方法，但是该方法并不是公共API的一部分。源码中引入了flow.js
  Vue.util = {
    warn, // 查看'../util/debug'
    extend,//查看'../sharde/util'
    mergeOptions,//查看'../util/options'
    defineReactive//查看'../observe/index'
  }

  Vue.set = set //查看'../observe/index' 
  Vue.delete = del//查看'../observe/index'
  Vue.nextTick = nextTick//查看'../util/next-click'.在callbacks中注册回调函数

  // 创建一个纯净的options对象，添加components、directives、filters属性
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  

  // this is used to identify the &quot;base&quot; constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // ../components/keep-alive.js  拷贝组件对象。该部分最重要的一部分。
  extend(Vue.options.components, builtInComponents)
  // Vue.options = {
  //   components : {
  //     KeepAlive : {
  //       name : 'keep-alive',
  //       abstract : true,
  //       created : function created(){},
  //       destoryed : function destoryed(){},
  //       props : {
  //         exclude : [String, RegExp, Array],
  //         includen : [String, RegExp, Array],
  //         max : [String, Number]
  //       },
  //       render : function render(){},
  //       watch : {
  //         exclude : function exclude(){},
  //         includen : function includen(){},
  //       }
  //     },
  //     directives : {},
  //     filters : {},
  //     _base : Vue
  //   }
  // }
  // 添加Vue.use方法，使用插件，内部维护一个插件列表_installedPlugins，如果插件有install方法就执行自己的install方法，否则如果plugin是一个function就执行这个方法，传参(this, args)
  initUse(Vue)
  // ./mixin.js 添加Vue.mixin方法，this.options = mergeOptions(this.options, mixin)，
  initMixin(Vue)
  // ./extend.js 添加Vue.cid（每一个够着函数实例都有一个cid，方便缓存），Vue.extend(options)方法
  initExtend(Vue)
  // ./assets.js 创建收集方法Vue[type] = function (id: string, definition: Function | Object)，其中type ： component / directive / filter
  initAssetRegisters(Vue)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'../config'</span>
<span class="hljs-keyword">import</span> { initUse } <span class="hljs-keyword">from</span> <span class="hljs-string">'./use'</span>
<span class="hljs-keyword">import</span> { initMixin } <span class="hljs-keyword">from</span> <span class="hljs-string">'./mixin'</span>
<span class="hljs-keyword">import</span> { initExtend } <span class="hljs-keyword">from</span> <span class="hljs-string">'./extend'</span>
<span class="hljs-keyword">import</span> { initAssetRegisters } <span class="hljs-keyword">from</span> <span class="hljs-string">'./assets'</span>
<span class="hljs-keyword">import</span> { <span class="hljs-keyword">set</span>, del } <span class="hljs-keyword">from</span> <span class="hljs-string">'../observer/index'</span>
<span class="hljs-keyword">import</span> { ASSET_TYPES } <span class="hljs-keyword">from</span> <span class="hljs-string">'shared/constants'</span>
<span class="hljs-keyword">import</span> builtInComponents <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/index'</span>

<span class="hljs-keyword">import</span> {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/index'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initGlobalAPI</span> (<span class="hljs-params">Vue: GlobalAPI</span>) </span>{
  <span class="hljs-comment">// 重写config,创建了一个configDef对象，最终目的是为了Object.defineProperty(Vue, 'config', configDef)</span>
  <span class="hljs-keyword">const</span> configDef = {}
  configDef.get = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> config
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
    configDef.set = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      warn(
        <span class="hljs-string">'Do not replace the Vue.config object, set individual fields instead.'</span>
      )
    }
  }
  <span class="hljs-built_in">Object</span>.defineProperty(Vue, <span class="hljs-string">'config'</span>, configDef)
  <span class="hljs-comment">// 具体Vue.congfig的具体内容就要看../config文件了</span>

  <span class="hljs-comment">// exposed util methods.</span>
  <span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> these are not considered part of the public API - avoid relying on them unless you are aware of the risk.</span>
  <span class="hljs-comment">// 添加一些方法，但是该方法并不是公共API的一部分。源码中引入了flow.js</span>
  Vue.util = {
    warn, <span class="hljs-comment">// 查看'../util/debug'</span>
    extend,<span class="hljs-comment">//查看'../sharde/util'</span>
    mergeOptions,<span class="hljs-comment">//查看'../util/options'</span>
    defineReactive<span class="hljs-comment">//查看'../observe/index'</span>
  }

  Vue.set = <span class="hljs-keyword">set</span> <span class="hljs-comment">//查看'../observe/index' </span>
  Vue.delete = del<span class="hljs-comment">//查看'../observe/index'</span>
  Vue.nextTick = nextTick<span class="hljs-comment">//查看'../util/next-click'.在callbacks中注册回调函数</span>

  <span class="hljs-comment">// 创建一个纯净的options对象，添加components、directives、filters属性</span>
  Vue.options = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
  ASSET_TYPES.forEach(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> {
    Vue.options[<span class="hljs-keyword">type</span> + <span class="hljs-string">'s'</span>] = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
  })
  

  <span class="hljs-comment">// this is used to identify the "base" constructor to extend all plain-object</span>
  <span class="hljs-comment">// components with in Weex's multi-instance scenarios.</span>
  Vue.options._base = Vue

  <span class="hljs-comment">// ../components/keep-alive.js  拷贝组件对象。该部分最重要的一部分。</span>
  extend(Vue.options.components, builtInComponents)
  <span class="hljs-comment">// Vue.options = {</span>
  <span class="hljs-comment">//   components : {</span>
  <span class="hljs-comment">//     KeepAlive : {</span>
  <span class="hljs-comment">//       name : 'keep-alive',</span>
  <span class="hljs-comment">//       abstract : true,</span>
  <span class="hljs-comment">//       created : function created(){},</span>
  <span class="hljs-comment">//       destoryed : function destoryed(){},</span>
  <span class="hljs-comment">//       props : {</span>
  <span class="hljs-comment">//         exclude : [String, RegExp, Array],</span>
  <span class="hljs-comment">//         includen : [String, RegExp, Array],</span>
  <span class="hljs-comment">//         max : [String, Number]</span>
  <span class="hljs-comment">//       },</span>
  <span class="hljs-comment">//       render : function render(){},</span>
  <span class="hljs-comment">//       watch : {</span>
  <span class="hljs-comment">//         exclude : function exclude(){},</span>
  <span class="hljs-comment">//         includen : function includen(){},</span>
  <span class="hljs-comment">//       }</span>
  <span class="hljs-comment">//     },</span>
  <span class="hljs-comment">//     directives : {},</span>
  <span class="hljs-comment">//     filters : {},</span>
  <span class="hljs-comment">//     _base : Vue</span>
  <span class="hljs-comment">//   }</span>
  <span class="hljs-comment">// }</span>
  <span class="hljs-comment">// 添加Vue.use方法，使用插件，内部维护一个插件列表_installedPlugins，如果插件有install方法就执行自己的install方法，否则如果plugin是一个function就执行这个方法，传参(this, args)</span>
  initUse(Vue)
  <span class="hljs-comment">// ./mixin.js 添加Vue.mixin方法，this.options = mergeOptions(this.options, mixin)，</span>
  initMixin(Vue)
  <span class="hljs-comment">// ./extend.js 添加Vue.cid（每一个够着函数实例都有一个cid，方便缓存），Vue.extend(options)方法</span>
  initExtend(Vue)
  <span class="hljs-comment">// ./assets.js 创建收集方法Vue[type] = function (id: string, definition: Function | Object)，其中type ： component / directive / filter</span>
  initAssetRegisters(Vue)
}
</code></pre>
<p><strong>Vue.util对象的部分解释：</strong></p>
<li><ul><li><p>Vue.util.warn <br>warn(msg, vm) 警告方法代码在util/debug.js，<br>通过var trac = generateComponentTrace(vm)方法vm=vm.$parent递归收集到msg出处。<br>然后判断是否存在console对象，如果有 console.error(<code>[Vue warn]: ${msg}${trace}</code>)。<br>如果config.warnHandle存在config.warnHandler.call(null, msg, vm, trace)</p></li></ul></li>
<ul>
<li>
<p>Vue.util.extend</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    extend (to: Object, _from: ?Object):Object Object类型浅拷贝方法代码在shared/util.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code style="word-break: break-word; white-space: initial;">    extend (<span class="hljs-keyword">to</span>: <span class="hljs-built_in">Object</span>, _from: ?<span class="hljs-built_in">Object</span>):<span class="hljs-built_in">Object</span> <span class="hljs-built_in">Object</span>类型浅拷贝方法代码在<span class="hljs-keyword">shared</span>/util.js</code></pre>
</li>
<li>
<p>Vue.util.mergeOptions</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   合并，vue实例化和实现继承的核心方法，代码在shared/options.js
    mergeOptions (
     parent: Object,
     child: Object,
     vm?: Component
   ) 
   先通过normalizeProps、normalizeInject、normalizeDirectives以Object-base标准化，然后依据strats合并策略进行合并。
   strats是对data、props、watch、methods等实例化参数的合并策略。除此之外还有defaultStrat默认策略。
   后期暴露的mixin和Vue.extend()就是从这里出来的。[官网解释][1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>   合并，vue实例化和实现继承的核心方法，代码在shared/options.js
<span class="hljs-code">    mergeOptions (</span>
<span class="hljs-code">     parent: Object,</span>
<span class="hljs-code">     child: Object,</span>
<span class="hljs-code">     vm?: Component</span>
   ) 
   先通过normalizeProps、normalizeInject、normalizeDirectives以Object-base标准化，然后依据strats合并策略进行合并。
   strats是对data、props、watch、methods等实例化参数的合并策略。除此之外还有defaultStrat默认策略。
   后期暴露的mixin和Vue.extend()就是从这里出来的。[<span class="hljs-string">官网解释</span>][<span class="hljs-symbol">1</span>]</code></pre>
</li>
<li>
<p>Vue.util.defineReactive</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   大家都知道的数据劫持核心方法，代码在shared/util.js
    defineReactive (
     obj: Object,
     key: string,
     val: any,
     customSetter?: ?Function,
     shallow?: boolean
   ) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>   大家都知道的数据劫持核心方法，代码在<span class="hljs-keyword">shared</span>/util.js
    defineReactive (
     obj: <span class="hljs-built_in">Object</span>,
     <span class="hljs-keyword">key</span>: <span class="hljs-built_in">string</span>,
     val: any,
     customSetter?: ?<span class="hljs-keyword">Function</span>,
     shallow?: <span class="hljs-built_in">boolean</span>
   ) 
</code></pre>
</li>
</ul>
<h2 id="articleHeader6">4.<strong>instance/index.js</strong> Vue对象生成文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  // 判断是否是new调用。
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 开始初始化
  this._init(options)
}
// 添加Vue._init(options)内部方法，./init.js
initMixin(Vue)
/**
 * ./state.js
 * 添加属性和方法
 * Vue.prototype.$data 
 * Vue.prototype.$props
 * Vue.prototype.$watch
 * Vue.prototype.$set
 * Vue.prototype.$delete
 */ 
stateMixin(Vue)
/**
 * ./event.js
 * 添加实例事件
 * Vue.prototype.$on
 * Vue.prototype.$once
 * Vue.prototype.$off
 * Vue.prototype.$emit
 */ 
eventsMixin(Vue)
/**
 * ./lifecycle.js
 * 添加实例生命周期方法
 * Vue.prototype._update
 * Vue.prototype.$forceUpdate
 * Vue.prototype.$destroy
 */ 
lifecycleMixin(Vue)
/**
 * ./render.js
 * 添加实例渲染方法
 * 通过执行installRenderHelpers(Vue.prototype);为实例添加很多helper
 * Vue.prototype.$nextTick
 * Vue.prototype._render
 */ 
renderMixin(Vue)

export default Vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { initMixin } <span class="hljs-keyword">from</span> './init'
import { <span class="hljs-keyword">state</span>Mixin } <span class="hljs-keyword">from</span> './<span class="hljs-keyword">state</span>'
import { renderMixin } <span class="hljs-keyword">from</span> './render'
import { eventsMixin } <span class="hljs-keyword">from</span> './events'
import { lifecycleMixin } <span class="hljs-keyword">from</span> './lifecycle'
import { warn } <span class="hljs-keyword">from</span> '../util/index'

function Vue (options) {
  // 判断是否是new调用。
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 开始初始化
  this._init(options)
}
// 添加Vue._init(options)内部方法，./init.js
initMixin(Vue)
/**
 * ./<span class="hljs-keyword">state</span>.js
 * 添加属性和方法
 * Vue.prototype.<span class="hljs-variable">$data</span> 
 * Vue.prototype.<span class="hljs-variable">$props</span>
 * Vue.prototype.<span class="hljs-variable">$watch</span>
 * Vue.prototype.<span class="hljs-variable">$set</span>
 * Vue.prototype.<span class="hljs-variable">$delete</span>
 */ 
<span class="hljs-keyword">state</span>Mixin(Vue)
/**
 * ./event.js
 * 添加实例事件
 * Vue.prototype.<span class="hljs-variable">$on</span>
 * Vue.prototype.<span class="hljs-variable">$once</span>
 * Vue.prototype.<span class="hljs-variable">$off</span>
 * Vue.prototype.<span class="hljs-variable">$emit</span>
 */ 
eventsMixin(Vue)
/**
 * ./lifecycle.js
 * 添加实例生命周期方法
 * Vue.prototype._update
 * Vue.prototype.<span class="hljs-variable">$forceUpdate</span>
 * Vue.prototype.<span class="hljs-variable">$destroy</span>
 */ 
lifecycleMixin(Vue)
/**
 * ./render.js
 * 添加实例渲染方法
 * 通过执行installRenderHelpers(Vue.prototype);为实例添加很多helper
 * Vue.prototype.<span class="hljs-variable">$nextTick</span>
 * Vue.prototype._render
 */ 
renderMixin(Vue)

export <span class="hljs-keyword">default</span> Vue
</code></pre>
<h2 id="articleHeader7">5.<strong>instance/init.js</strong>
</h2>
<p>初始化,完成主组件的所有动作的主线。从这儿出发可以理清observer、watcher、compiler 、render等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options &amp;&amp; options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    /**
    * 添加vm.$createElement vm.$vnode vm.$slots vm.
    * 创建vm.$attrs  /  vm.$listeners 并且转换为getter和setter
    * 
    */
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props vm.$scopedSlots 
    /**
    * 1、创建 vm._watchers = [];
    * 2、执行if (opts.props) { initProps(vm, opts.props); } 验证props后调用defineReactive转化，并且代理数据proxy(vm, &quot;_props&quot;, key);
    * 3、执行if (opts.methods) { initMethods(vm, opts.methods); } 然后vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    * 4、处理data,
    * if (opts.data) {
    *    initData(vm);
    * } else {
    *    observe(vm._data = {}, true /* asRootData */);
    * }
    * 5、执行initData:
    *       （1）先判断data的属性是否有与methods和props值同名
    *       （2）获取vm.data（如果为function，执行getData(data, vm)），代理proxy(vm, &quot;_data&quot;, key);
    *       （3）执行 observe(data, true /* asRootData */);递归观察
    * 6、完成observe，具体看解释
    */
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'../config'</span>
<span class="hljs-keyword">import</span> { initProxy } <span class="hljs-keyword">from</span> <span class="hljs-string">'./proxy'</span>
<span class="hljs-keyword">import</span> { initState } <span class="hljs-keyword">from</span> <span class="hljs-string">'./state'</span>
<span class="hljs-keyword">import</span> { initRender } <span class="hljs-keyword">from</span> <span class="hljs-string">'./render'</span>
<span class="hljs-keyword">import</span> { initEvents } <span class="hljs-keyword">from</span> <span class="hljs-string">'./events'</span>
<span class="hljs-keyword">import</span> { mark, measure } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/perf'</span>
<span class="hljs-keyword">import</span> { initLifecycle, callHook } <span class="hljs-keyword">from</span> <span class="hljs-string">'./lifecycle'</span>
<span class="hljs-keyword">import</span> { initProvide, initInjections } <span class="hljs-keyword">from</span> <span class="hljs-string">'./inject'</span>
<span class="hljs-keyword">import</span> { extend, mergeOptions, formatComponentName } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/index'</span>

<span class="hljs-keyword">let</span> uid = <span class="hljs-number">0</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initMixin</span> (<span class="hljs-params">Vue: Class&lt;Component&gt;</span>) </span>{
  Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options?: Object</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// a uid</span>
    vm._uid = uid++

    <span class="hljs-keyword">let</span> startTag, endTag
    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = <span class="hljs-string">`vue-perf-start:<span class="hljs-subst">${vm._uid}</span>`</span>
      endTag = <span class="hljs-string">`vue-perf-end:<span class="hljs-subst">${vm._uid}</span>`</span>
      mark(startTag)
    }

    <span class="hljs-comment">// a flag to avoid this being observed</span>
    vm._isVue = <span class="hljs-literal">true</span>
    <span class="hljs-comment">// merge options</span>
    <span class="hljs-keyword">if</span> (options &amp;&amp; options._isComponent) {
      <span class="hljs-comment">// optimize internal component instantiation</span>
      <span class="hljs-comment">// since dynamic options merging is pretty slow, and none of the</span>
      <span class="hljs-comment">// internal component options needs special treatment.</span>
      initInternalComponent(vm, options)
    } <span class="hljs-keyword">else</span> {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    <span class="hljs-comment">/* istanbul ignore else */</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      initProxy(vm)
    } <span class="hljs-keyword">else</span> {
      vm._renderProxy = vm
    }
    <span class="hljs-comment">// expose real self</span>
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    <span class="hljs-comment">/**
    * 添加vm.$createElement vm.$vnode vm.$slots vm.
    * 创建vm.$attrs  /  vm.$listeners 并且转换为getter和setter
    * 
    */</span>
    initRender(vm)
    callHook(vm, <span class="hljs-string">'beforeCreate'</span>)
    initInjections(vm) <span class="hljs-comment">// resolve injections before data/props vm.$scopedSlots </span>
    <span class="hljs-comment">/**
    * 1、创建 vm._watchers = [];
    * 2、执行if (opts.props) { initProps(vm, opts.props); } 验证props后调用defineReactive转化，并且代理数据proxy(vm, "_props", key);
    * 3、执行if (opts.methods) { initMethods(vm, opts.methods); } 然后vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    * 4、处理data,
    * if (opts.data) {
    *    initData(vm);
    * } else {
    *    observe(vm._data = {}, true /* asRootData */</span>);
    * }
    * <span class="hljs-number">5</span>、执行initData:
    *       （<span class="hljs-number">1</span>）先判断data的属性是否有与methods和props值同名
    *       （<span class="hljs-number">2</span>）获取vm.data（如果为<span class="hljs-function"><span class="hljs-keyword">function</span>，执行<span class="hljs-title">getData</span>(<span class="hljs-params">data, vm</span>)），代理<span class="hljs-title">proxy</span>(<span class="hljs-params">vm, <span class="hljs-string">"_data"</span>, key</span>);
    *       （3）执行 <span class="hljs-title">observe</span>(<span class="hljs-params">data, true <span class="hljs-regexp">/* asRootData */</span></span>);递归观察
    * 6、完成<span class="hljs-title">observe</span>，具体看解释
    */
    <span class="hljs-title">initState</span>(<span class="hljs-params">vm</span>)
    <span class="hljs-title">initProvide</span>(<span class="hljs-params">vm</span>) // <span class="hljs-title">resolve</span> <span class="hljs-title">provide</span> <span class="hljs-title">after</span> <span class="hljs-title">data</span>/<span class="hljs-title">props</span>
    <span class="hljs-title">callHook</span>(<span class="hljs-params">vm, <span class="hljs-string">'created'</span></span>)

    /* <span class="hljs-title">istanbul</span> <span class="hljs-title">ignore</span> <span class="hljs-title">if</span> */
    <span class="hljs-title">if</span> (<span class="hljs-params">process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark</span>) </span>{
      vm._name = formatComponentName(vm, <span class="hljs-literal">false</span>)
      mark(endTag)
      measure(<span class="hljs-string">`vue <span class="hljs-subst">${vm._name}</span> init`</span>, startTag, endTag)
    }

    <span class="hljs-keyword">if</span> (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}</code></pre>
<h2 id="articleHeader8">二、observe 响应式数据转换</h2>
<h2 id="articleHeader9">1.前置方法 observe(value, asRootData)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function observe (value, asRootData) {
  // 如果value不是是Object 或者是VNode这不用转换
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  // 如果已经转换就复用
  if (hasOwn(value, '__ob__') &amp;&amp; value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    //一堆必要的条件判断
    observerState.shouldConvert &amp;&amp;
    !isServerRendering() &amp;&amp;
    (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
    Object.isExtensible(value) &amp;&amp;
    !value._isVue
  ) {
    //这才是observe主体
    ob = new Observer(value);
  }
  if (asRootData &amp;&amp; ob) {
    ob.vmCount++;
  }
  return ob
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">function</span> observe (<span class="hljs-keyword">value</span>, asRootData) {
  <span class="hljs-comment">// 如果value不是是Object 或者是VNode这不用转换</span>
  <span class="hljs-keyword">if</span> (!isObject(<span class="hljs-keyword">value</span>) || <span class="hljs-keyword">value</span> instanceof VNode) {
    <span class="hljs-keyword">return</span>
  }
  var ob;
  <span class="hljs-comment">// 如果已经转换就复用</span>
  <span class="hljs-keyword">if</span> (hasOwn(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>) &amp;&amp; <span class="hljs-keyword">value</span>.<span class="hljs-number">__</span>ob<span class="hljs-number">__</span> instanceof Observer) {
    ob = <span class="hljs-keyword">value</span>.<span class="hljs-number">__</span>ob<span class="hljs-number">__</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (
    <span class="hljs-comment">//一堆必要的条件判断</span>
    observerState.shouldConvert &amp;&amp;
    !isServerRendering() &amp;&amp;
    (Array.isArray(<span class="hljs-keyword">value</span>) || isPlainObject(<span class="hljs-keyword">value</span>)) &amp;&amp;
    Object.isExtensible(<span class="hljs-keyword">value</span>) &amp;&amp;
    !<span class="hljs-keyword">value</span>.<span class="hljs-number">_</span>isVue
  ) {
    <span class="hljs-comment">//这才是observe主体</span>
    ob = <span class="hljs-keyword">new</span> Observer(<span class="hljs-keyword">value</span>);
  }
  <span class="hljs-keyword">if</span> (asRootData &amp;&amp; ob) {
    ob.vmCount++;
  }
  <span class="hljs-keyword">return</span> ob
}</code></pre>
<h2 id="articleHeader10">2.Observer 类</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Observer = function Observer (value) {
  // 当asRootData = true时，其实可以将value当做vm.$options.data，后面都这样方便理解
  this.value = value;
  /**
  * 为vm.data创建一个dep实例，可以理解为一个专属事件列表维护对象
  * 例如： this.dep = { id : 156, subs : [] }
  * 实例方法： this.dep.__proto__ = { addSub, removeSub, depend, notify, constructor }
  */
  this.dep = new Dep();
  //记录关联的vm实例的数量
  this.vmCount = 0;
  //为vm.data 添加__ob__属性，值为当前observe实例，并且转化为响应式数据。所以看一个value是否为响应式就可以看他有没有__ob__属性
  def(value, '__ob__', this);
  //响应式数据转换分为数组、对象两种。
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    //对象的转换，而且walk是Observer的实例方法，请记住
    this.walk(value);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> Observer = <span class="hljs-function">function <span class="hljs-title">Observer</span> (<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
  <span class="hljs-comment">// 当asRootData = true时，其实可以将value当做vm.$options.data，后面都这样方便理解</span>
  <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
  <span class="hljs-comment">/**
  * 为vm.data创建一个dep实例，可以理解为一个专属事件列表维护对象
  * 例如： this.dep = { id : 156, subs : [] }
  * 实例方法： this.dep.__proto__ = { addSub, removeSub, depend, notify, constructor }
  */</span>
  <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep();
  <span class="hljs-comment">//记录关联的vm实例的数量</span>
  <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>;
  <span class="hljs-comment">//为vm.data 添加__ob__属性，值为当前observe实例，并且转化为响应式数据。所以看一个value是否为响应式就可以看他有没有__ob__属性</span>
  def(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>);
  <span class="hljs-comment">//响应式数据转换分为数组、对象两种。</span>
  <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">value</span>)) {
    <span class="hljs-keyword">var</span> augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(<span class="hljs-keyword">value</span>, arrayMethods, arrayKeys);
    <span class="hljs-keyword">this</span>.observeArray(<span class="hljs-keyword">value</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//对象的转换，而且walk是Observer的实例方法，请记住</span>
    <span class="hljs-keyword">this</span>.walk(<span class="hljs-keyword">value</span>);
  }
};</code></pre>
<h2 id="articleHeader11">3.walk</h2>
<p>该方法要将vm.data的所有属性都转化为getter/setter模式，所以vm.data只能是Object。数组的转换不一样，这里暂不做讲解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Observer.prototype.walk = function walk (obj) {
  // 得到key的列表
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    //核心方法：定义响应式数据的方法  defineReactive(对象, 属性, 值);这样看是不是就很爽了
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Observer.prototype.walk = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">walk</span> (<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// 得到key的列表</span>
  <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(obj);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-comment">//核心方法：定义响应式数据的方法  defineReactive(对象, 属性, 值);这样看是不是就很爽了</span>
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};</code></pre>
<h2 id="articleHeader12">4.defineReactive(obj, key, value)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (
  obj,
  key,
  val,
  customSetter, //自定义setter，为了测试
  shallow //是否只转换这一个属性后代不管控制参数,false ：是，true ： 否
) {
  /**
  * 又是一个dep实例，其实作用与observe中的dep功能一样，不同点：
  *     1.observe实例的dep对象是父级vm.data的订阅者维护对象
  *     2.这个dep是vm.data的属性key的订阅者维护对象，因为val有可能也是对象
  *     3.这里的dep没有写this.dep是因为defineReactive是一个方法，不是构造函数，所以使用闭包锁在内存中
  */
  var dep = new Dep();
  // 获取key的属性描述符
  var property = Object.getOwnPropertyDescriptor(obj, key);
  // 如果key属性不可设置，则退出该函数
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // 为了配合那些已经的定义了getter/setter的情况
  var getter = property &amp;&amp; property.get;
  var setter = property &amp;&amp; property.set;
  
  //递归，因为没有传asRootData为true，所以vm.data的vmCount是部分计数的。因为它还是属于vm的数据
  var childOb = !shallow &amp;&amp; observe(val);
  /**
  * 全部完成后observe也就完成了。但是，每个属性的dep都没启作用。
  * 这就是所谓的依赖收集了，后面继续。
  */
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' &amp;&amp; customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow &amp;&amp; observe(newVal);
      dep.notify();
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> </span>(
  obj,
  key,
  val,
  customSetter, <span class="hljs-comment">//自定义setter，为了测试</span>
  shallow <span class="hljs-comment">//是否只转换这一个属性后代不管控制参数,false ：是，true ： 否</span>
) {
  <span class="hljs-comment">/**
  * 又是一个dep实例，其实作用与observe中的dep功能一样，不同点：
  *     1.observe实例的dep对象是父级vm.data的订阅者维护对象
  *     2.这个dep是vm.data的属性key的订阅者维护对象，因为val有可能也是对象
  *     3.这里的dep没有写this.dep是因为defineReactive是一个方法，不是构造函数，所以使用闭包锁在内存中
  */</span>
  <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> <span class="hljs-type">Dep</span>();
  <span class="hljs-comment">// 获取key的属性描述符</span>
  <span class="hljs-keyword">var</span> property = Object.getOwnPropertyDescriptor(obj, key);
  <span class="hljs-comment">// 如果key属性不可设置，则退出该函数</span>
  <span class="hljs-keyword">if</span> (property &amp;&amp; property.configurable === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// 为了配合那些已经的定义了getter/setter的情况</span>
  <span class="hljs-keyword">var</span> getter = property &amp;&amp; property.<span class="hljs-keyword">get</span>;
  <span class="hljs-keyword">var</span> setter = property &amp;&amp; property.<span class="hljs-keyword">set</span>;
  
  <span class="hljs-comment">//递归，因为没有传asRootData为true，所以vm.data的vmCount是部分计数的。因为它还是属于vm的数据</span>
  <span class="hljs-keyword">var</span> childOb = !shallow &amp;&amp; observe(val);
  <span class="hljs-comment">/**
  * 全部完成后observe也就完成了。但是，每个属性的dep都没启作用。
  * 这就是所谓的依赖收集了，后面继续。
  */</span>
  Object.defineProperty(obj, key, {
    enumerable: <span class="hljs-type">true</span>,
    configurable: <span class="hljs-type">true</span>,
    <span class="hljs-keyword">get</span>: <span class="hljs-type">function reactiveGetter </span>() {
      <span class="hljs-keyword">var</span> value = getter ? getter.call(obj) : <span class="hljs-type">val</span>;
      <span class="hljs-keyword">if</span> (Dep.target) {
        dep.depend();
        <span class="hljs-keyword">if</span> (childOb) {
          childOb.dep.depend();
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">Array</span>.isArray(value)) {
            dependArray(value);
          }
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-type">function reactiveSetter </span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
      <span class="hljs-keyword">var</span> value = getter ? getter.call(obj) : <span class="hljs-type">val</span>;
      <span class="hljs-comment">/* eslint-disable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> === value || (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> !== <span class="hljs-keyword">new</span><span class="hljs-type">Val</span> &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">/* eslint-enable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; customSetter) {
        customSetter();
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
      } <span class="hljs-keyword">else</span> {
        val = <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>;
      }
      childOb = !shallow &amp;&amp; observe(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
      dep.notify();
    }
  });
}</code></pre>
<h2 id="articleHeader13">三、依赖收集</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="一些个人理解：
    1、Watcher 订阅者
        可以将它理解为，要做什么。具体的体现就是Watcher的第二个参数expOrFn。
    2、Observer 观察者
        其实观察的体现就是getter/setter能够观察数据的变化（数组的实现不同）。
    3、dependency collection 依赖收集
        订阅者(Watcher)是干事情的，是一些指令、方法、表达式的执行形式。它运行的过程中肯定离不开数据，所以就成了这些数据的依赖项目。因为离不开^_^数据。
        数据是肯定会变的，那么数据变了就得通知数据的依赖项目(Watcher)让他们再执行一下。
        依赖同一个数据的依赖项目(Watcher)可能会很多，为了保证能够都通知到，所以需要收集一下。
    4、Dep 依赖收集器构造函数
        因为数据是由深度的，在不同的深度有不同的依赖，所以我们需要一个容器来装起来。
        Dep.target的作用是保证数据在收集依赖项(Watcher)时，watcher是对这个数据依赖的，然后一个个去收集的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>一些个人理解：
    <span class="hljs-selector-tag">1</span>、<span class="hljs-selector-tag">Watcher</span> 订阅者
        可以将它理解为，要做什么。具体的体现就是<span class="hljs-selector-tag">Watcher</span>的第二个参数<span class="hljs-selector-tag">expOrFn</span>。
    <span class="hljs-selector-tag">2</span>、<span class="hljs-selector-tag">Observer</span> 观察者
        其实观察的体现就是<span class="hljs-selector-tag">getter</span>/<span class="hljs-selector-tag">setter</span>能够观察数据的变化（数组的实现不同）。
    <span class="hljs-selector-tag">3</span>、<span class="hljs-selector-tag">dependency</span> <span class="hljs-selector-tag">collection</span> 依赖收集
        订阅者(Watcher)是干事情的，是一些指令、方法、表达式的执行形式。它运行的过程中肯定离不开数据，所以就成了这些数据的依赖项目。因为离不开^<span class="hljs-selector-tag">_</span>^数据。
        数据是肯定会变的，那么数据变了就得通知数据的依赖项目(Watcher)让他们再执行一下。
        依赖同一个数据的依赖项目(Watcher)可能会很多，为了保证能够都通知到，所以需要收集一下。
    <span class="hljs-selector-tag">4</span>、<span class="hljs-selector-tag">Dep</span> 依赖收集器构造函数
        因为数据是由深度的，在不同的深度有不同的依赖，所以我们需要一个容器来装起来。
        <span class="hljs-selector-tag">Dep</span><span class="hljs-selector-class">.target</span>的作用是保证数据在收集依赖项(Watcher)时，<span class="hljs-selector-tag">watcher</span>是对这个数据依赖的，然后一个个去收集的。</code></pre>
<h2 id="articleHeader14">1、Watcher</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watcher (vm, expOrFn, cb, options)
参数：
{string | Function} expOrFn
{Function | Object} callback
{Object} [options]
    {boolean} deep
    {boolean} user
    {boolean} lazy
    {boolean} sync
在Vue的整个生命周期当中，会有4类地方会实例化Watcher：
    Vue实例化的过程中有watch选项
    Vue实例化的过程中有computed计算属性选项
    Vue原型上有挂载$watch方法: Vue.prototype.$watch，可以直接通过实例调用this.$watch方法
    Vue生成了render函数，更新视图时
    
    Watcher接收的参数当中expOrFn定义了用以获取watcher的getter函数。expOrFn可以有2种类型：string或function.若为string类型，
首先会通过parsePath方法去对string进行分割(仅支持.号形式的对象访问)。在除了computed选项外，其他几种实例化watcher的方式都
是在实例化过程中完成求值及依赖的收集工作：this.value = this.lazy ? undefined : this.get().在Watcher的get方法中:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>Watcher (vm, expOrFn, cb, options)
参数：
{<span class="hljs-keyword">string</span> | Function} expOrFn
{Function | Object} callback
{Object} [options]
    {<span class="hljs-keyword">boolean</span>} deep
    {<span class="hljs-keyword">boolean</span>} user
    {<span class="hljs-keyword">boolean</span>} lazy
    {<span class="hljs-keyword">boolean</span>} sync
在Vue的整个生命周期当中，会有<span class="hljs-number">4</span>类地方会实例化Watcher：
    Vue实例化的过程中有watch选项
    Vue实例化的过程中有computed计算属性选项
    Vue原型上有挂载$watch方法: Vue.prototype.$watch，可以直接通过实例调用<span class="hljs-keyword">this</span>.$watch方法
    Vue生成了render函数，更新视图时
    
    Watcher接收的参数当中expOrFn定义了用以获取watcher的getter函数。expOrFn可以有<span class="hljs-number">2</span>种类型：<span class="hljs-keyword">string</span>或function.若为<span class="hljs-keyword">string</span>类型，
首先会通过parsePath方法去对<span class="hljs-keyword">string</span>进行分割(仅支持.号形式的对象访问)。在除了computed选项外，其他几种实例化watcher的方式都
是在实例化过程中完成求值及依赖的收集工作：<span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy ? undefined : <span class="hljs-keyword">this</span>.<span class="hljs-built_in">get</span>().在Watcher的<span class="hljs-built_in">get</span>方法中:</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  //相关属性
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  //
  this.deps = [];
  this.newDeps = [];
  //set类型的ids
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  // 表达式
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // 创建一个getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' &amp;&amp; warn(
        &quot;Failed watching path: \&quot;&quot; + expOrFn + &quot;\&quot; &quot; +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();//执行get收集依赖项
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  <span class="hljs-keyword">this</span>.vm = vm;
  vm._watchers.push(<span class="hljs-keyword">this</span>);
  <span class="hljs-comment">// options</span>
  <span class="hljs-keyword">if</span> (options) {
    <span class="hljs-keyword">this</span>.deep = !!options.deep;
    <span class="hljs-keyword">this</span>.user = !!options.user;
    <span class="hljs-keyword">this</span>.lazy = !!options.lazy;
    <span class="hljs-keyword">this</span>.sync = !!options.sync;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.deep = <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">this</span>.lazy = <span class="hljs-keyword">this</span>.sync = <span class="hljs-literal">false</span>;
  }
  <span class="hljs-comment">//相关属性</span>
  <span class="hljs-keyword">this</span>.cb = cb;
  <span class="hljs-keyword">this</span>.id = ++uid$<span class="hljs-number">2</span>; <span class="hljs-comment">// uid for batching</span>
  <span class="hljs-keyword">this</span>.active = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>.dirty = <span class="hljs-keyword">this</span>.lazy; <span class="hljs-comment">// for lazy watchers</span>
  <span class="hljs-comment">//</span>
  <span class="hljs-keyword">this</span>.deps = [];
  <span class="hljs-keyword">this</span>.newDeps = [];
  <span class="hljs-comment">//set类型的ids</span>
  <span class="hljs-keyword">this</span>.depIds = new _Set();
  <span class="hljs-keyword">this</span>.newDepIds = new _Set();
  <span class="hljs-comment">// 表达式</span>
  <span class="hljs-keyword">this</span>.expression = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
    ? expOrFn.toString()
    : <span class="hljs-string">''</span>;
  <span class="hljs-comment">// 创建一个getter</span>
  <span class="hljs-keyword">if</span> (typeof expOrFn === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">this</span>.getter = expOrFn;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.getter = parsePath(expOrFn);
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.getter) {
      <span class="hljs-keyword">this</span>.getter = function () {};
      process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
        <span class="hljs-string">"Failed watching path: \""</span> + expOrFn + <span class="hljs-string">"\" "</span> +
        <span class="hljs-string">'Watcher only accepts simple dot-delimited paths. '</span> +
        <span class="hljs-string">'For full control, use a function instead.'</span>,
        vm
      );
    }
  }
  <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
    ? undefined
    : <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>();<span class="hljs-comment">//执行get收集依赖项</span>
};</code></pre>
<h2 id="articleHeader15">2、Watcher.prototype.get</h2>
<p>通过设置观察值(this.value)调用this.get方法，执行this.getter.call(vm, vm)，这个过程中只要获取了某个响应式数据。那么肯定会触发该数据的getter方法。因为当前的Dep.target = watcher。所以就将该watcher作为了这个响应数据的依赖项。因为watcher在执行过程中的确需要、使用了它、所以依赖它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watcher.prototype.get = function get () {
  //将这个watcher观察者实例添加到Dep.target，表明当前为this.expressoin的依赖收集时间
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    /**
    * 执行this.getter.call(vm, vm):
    *     1、如果是function则相当于vm.expOrFn(vm)，只要在这个方法执行的过程中有从vm上获取属性值的都会触发该属性值的get方法从而完成依赖收集。因为现在Dep.target=this. 
    *     2、如果是字符串（如a.b）,那么this.getter.call(vm, vm)就相当于vm.a.b
    */ 
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, (&quot;getter for watcher \&quot;&quot; + (this.expression) + &quot;\&quot;&quot;));
    } else {
      throw e
    }
  } finally {
    // &quot;touch&quot; every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Watcher.prototype.<span class="hljs-keyword">get</span> = function <span class="hljs-keyword">get</span> () {
  <span class="hljs-comment">//将这个watcher观察者实例添加到Dep.target，表明当前为this.expressoin的依赖收集时间</span>
  pushTarget(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">var</span> value;
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>.vm;
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">/**
    * 执行this.getter.call(vm, vm):
    *     1、如果是function则相当于vm.expOrFn(vm)，只要在这个方法执行的过程中有从vm上获取属性值的都会触发该属性值的get方法从而完成依赖收集。因为现在Dep.target=this. 
    *     2、如果是字符串（如a.b）,那么this.getter.call(vm, vm)就相当于vm.a.b
    */</span> 
    value = <span class="hljs-keyword">this</span>.getter.call(vm, vm);
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
      handleError(e, vm, (<span class="hljs-string">"getter for watcher \""</span> + (<span class="hljs-keyword">this</span>.expression) + <span class="hljs-string">"\""</span>));
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">throw</span> e
    }
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-comment">// "touch" every property so they are all tracked as</span>
    <span class="hljs-comment">// dependencies for deep watching</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.deep) {
      traverse(value);
    }
    popTarget();
    <span class="hljs-keyword">this</span>.cleanupDeps();
  }
  <span class="hljs-keyword">return</span> value
};</code></pre>
<h2 id="articleHeader16">3、getter/setter</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        //依赖收集，这里又饶了一圈，看后面的解释
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' &amp;&amp; customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow &amp;&amp; observe(newVal);
      //数据变动出发所有依赖项
      dep.notify();
    }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Object.defineProperty(obj, key, {
    enumerable: <span class="hljs-type">true</span>,
    configurable: <span class="hljs-type">true</span>,
    <span class="hljs-keyword">get</span>: <span class="hljs-type">function reactiveGetter </span>() {
      <span class="hljs-keyword">var</span> value = getter ? getter.call(obj) : <span class="hljs-type">val</span>;
      <span class="hljs-keyword">if</span> (Dep.target) {
        <span class="hljs-comment">//依赖收集，这里又饶了一圈，看后面的解释</span>
        dep.depend();
        <span class="hljs-keyword">if</span> (childOb) {
          childOb.dep.depend();
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">Array</span>.isArray(value)) {
            dependArray(value);
          }
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-type">function reactiveSetter </span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
      <span class="hljs-keyword">var</span> value = getter ? getter.call(obj) : <span class="hljs-type">val</span>;
      <span class="hljs-comment">/* eslint-disable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> === value || (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> !== <span class="hljs-keyword">new</span><span class="hljs-type">Val</span> &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">/* eslint-enable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; customSetter) {
        customSetter();
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
      } <span class="hljs-keyword">else</span> {
        val = <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>;
      }
      childOb = !shallow &amp;&amp; observe(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
      <span class="hljs-comment">//数据变动出发所有依赖项</span>
      dep.notify();
    }
  });</code></pre>
<p><strong>- 依赖收集具体动作：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//调用的自己dep的实例方法
Dep.prototype.depend = function depend () {
  if (Dep.target) {
    //调用的是当前Watcher实例的addDe方法，并且把dep对象传过去了
    Dep.target.addDep(this);
  }
};

Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    //为这个watcher统计内部依赖了多少个数据，以及其他公用该数据的watcher
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      //继续为数据收集依赖项目的步骤
      dep.addSub(this);
    }
  }
};
Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//调用的自己dep的实例方法</span>
Dep.prototype.depend = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">depend</span> </span>() {
  <span class="hljs-keyword">if</span> (Dep.target) {
    <span class="hljs-comment">//调用的是当前Watcher实例的addDe方法，并且把dep对象传过去了</span>
    Dep.target.addDep(<span class="hljs-built_in">this</span>);
  }
};

Watcher.prototype.addDep = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addDep</span> </span>(dep) {
  <span class="hljs-keyword">var</span> id = dep.id;
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">DepIds</span>.has(id)) {
    <span class="hljs-comment">//为这个watcher统计内部依赖了多少个数据，以及其他公用该数据的watcher</span>
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">DepIds</span>.add(id);
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">Deps</span>.push(dep);
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">this</span>.depIds.has(id)) {
      <span class="hljs-comment">//继续为数据收集依赖项目的步骤</span>
      dep.addSub(<span class="hljs-built_in">this</span>);
    }
  }
};
Dep.prototype.addSub = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addSub</span> </span>(sub) {
  <span class="hljs-built_in">this</span>.subs.push(sub);
};</code></pre>
<p><strong>- 数据变动出发依赖动作：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};
//对当前watcher的处理
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
//把一个观察者推入观察者队列。
//具有重复id的作业将被跳过，除非它是
//当队列被刷新时被推。
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index &amp;&amp; queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notify</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// stabilize the subscriber list first</span>
  <span class="hljs-keyword">var</span> subs = <span class="hljs-keyword">this</span>.subs.slice();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
    subs[i].update();
  }
};
<span class="hljs-comment">//对当前watcher的处理</span>
Watcher.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">/* istanbul ignore else */</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lazy) {
    <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
    <span class="hljs-keyword">this</span>.run();
  } <span class="hljs-keyword">else</span> {
    queueWatcher(<span class="hljs-keyword">this</span>);
  }
};
<span class="hljs-comment">//把一个观察者推入观察者队列。</span>
<span class="hljs-comment">//具有重复id的作业将被跳过，除非它是</span>
<span class="hljs-comment">//当队列被刷新时被推。</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueWatcher</span> (<span class="hljs-params">watcher: Watcher</span>) </span>{
  <span class="hljs-keyword">const</span> id = watcher.id
  <span class="hljs-keyword">if</span> (has[id] == <span class="hljs-literal">null</span>) {
    has[id] = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">if</span> (!flushing) {
      queue.push(watcher)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// if already flushing, splice the watcher based on its id</span>
      <span class="hljs-comment">// if already past its id, it will be run next immediately.</span>
      <span class="hljs-keyword">let</span> i = queue.length - <span class="hljs-number">1</span>
      <span class="hljs-keyword">while</span> (i &gt; index &amp;&amp; queue[i].id &gt; watcher.id) {
        i--
      }
      queue.splice(i + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, watcher)
    }
    <span class="hljs-comment">// queue the flush</span>
    <span class="hljs-keyword">if</span> (!waiting) {
      waiting = <span class="hljs-literal">true</span>
      nextTick(flushSchedulerQueue)
    }
  }
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 源码漫游（一）

## 原文链接
[https://segmentfault.com/a/1190000011945068](https://segmentfault.com/a/1190000011945068)


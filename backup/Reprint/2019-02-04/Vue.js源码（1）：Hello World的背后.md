---
title: 'Vue.js源码（1）：Hello World的背后' 
date: 2019-02-04 2:30:58
hidden: true
slug: h8bmxix5eef
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>下面的代码会在页面上输出Hello World，但是在这个<code>new Vue()</code>到页面渲染之间，到底发生了什么。这篇文章希望通过最简单的例子，去了解Vue源码过程。这里分析的源码版本是<code>Vue.version = '1.0.20'</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;mountNode&quot;>"{{"message"}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"mountNode"</span>&gt;"{{"message"}}"&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el: '#mountNode',
    data: function () {
        return {
            message: 'Hello World'
        };
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#mountNode'</span>,
    data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> {
            message: <span class="hljs-string">'Hello World'</span>
        };
    }
});</code></pre>
<p>这篇文章将要解决几个问题：</p>
<ol>
<li><p>new Vue()的过程中，内部到底有哪些步骤</p></li>
<li><p>如何收集依赖</p></li>
<li><p>如何计算表达式</p></li>
<li><p>如何表达式的值如何反应在DOM上的</p></li>
</ol>
<p>简单来说过程是这样的：</p>
<ol>
<li><p>observe: 把{message: 'Hello World'}变成是reactive的</p></li>
<li><p>compile: compileTextNode ""{{"message"}}""，解析出指令(directive = v-text)和表达式(expression = message)，创建fragment(new TextNode)准备替换</p></li>
<li><p>link：实例化directive，将创建的fragment和directive链接起来，将fragment替换在DOM上</p></li>
<li><p>bind: 通过directive对应的watcher获取依赖(message)的值("Hello World")，v-text去update值到fragment上</p></li>
</ol>
<p>详细过程，接着往下看。</p>
<h1 id="articleHeader0">构造函数</h1>
<p>文件路径：src/instance/vue.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue (options) {
  this._init(options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> <span class="hljs-params">(options)</span> </span>{
  <span class="hljs-keyword">this</span>._init(options)
}</code></pre>
<h1 id="articleHeader1">初始化</h1>
<p>这里只拿对例子理解最关键的步骤分析。<br>文件路径：src/instance/internal/init.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._init = function (options) {
    ...
    // merge options.
    options = this.$options = mergeOptions(
      this.constructor.options,
      options,
      this
    )
    ...
    // initialize data observation and scope inheritance.
    this._initState()
    ...
    // if `el` option is passed, start compilation.
    if (options.el) {
      this.$mount(options.el)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>Vue.prototype._init = function (<span class="hljs-keyword">options</span>) {
    ...
    <span class="hljs-comment">// merge options.</span>
    <span class="hljs-keyword">options</span> = <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span> = mergeOptions(
      <span class="hljs-keyword">this</span>.constructor.<span class="hljs-keyword">options</span>,
      <span class="hljs-keyword">options</span>,
      <span class="hljs-keyword">this</span>
    )
    ...
    <span class="hljs-comment">// initialize data observation and scope inheritance.</span>
    <span class="hljs-keyword">this</span>._initState()
    ...
    <span class="hljs-comment">// if `el` option is passed, start compilation.</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.el) {
      <span class="hljs-keyword">this</span>.$mount(<span class="hljs-keyword">options</span>.el)
    }
}</code></pre>
<h3 id="articleHeader2">merge options</h3>
<p><code>mergeOptions()</code>定义在src/util/options.js文件中，这里主要定义options中各种属性的合并（merge），例如：props, methods, computed, watch等。另外，这里还定义了每种属性merge的默认算法（strategy），这些strategy都可以配置的，参考<a href="http://vuejs.org/guide/mixins.html#Custom-Option-Merge-Strategies" rel="nofollow noreferrer" target="_blank">Custom Option Merge Strategy</a></p>
<p>在本文的例子中，主要是data选项的merge，在merge之后，放到<code>$options.data</code>中，基本相当于下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$options.data = function mergedInstanceDataFn () {
      var parentVal = undefined
      
      // 这里就是在我们定义的options中的data
      var childVal = function () {
          return {
              message: 'Hello World'
          }
      }
      
      // data function绑定vm实例后执行，执行结果: {message: 'Hello World'}
      var instanceData = childVal.call(vm)
      
      // 对象之间的merge，类似$.extend，结果肯定就是：{message: 'Hello World'}
      return mergeData(instanceData, parentVal)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>vm.$options.data = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedInstanceDataFn</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">var</span> parentVal = <span class="hljs-literal">undefined</span>
      
      <span class="hljs-comment">// 这里就是在我们定义的options中的data</span>
      <span class="hljs-keyword">var</span> childVal = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
          <span class="hljs-keyword">return</span> {
              message: <span class="hljs-string">'Hello World'</span>
          }
      }
      
      <span class="hljs-comment">// data function绑定vm实例后执行，执行结果: {message: 'Hello World'}</span>
      <span class="hljs-keyword">var</span> instanceData = childVal.call(vm)
      
      <span class="hljs-comment">// 对象之间的merge，类似$.extend，结果肯定就是：{message: 'Hello World'}</span>
      <span class="hljs-keyword">return</span> mergeData(instanceData, parentVal)
}</code></pre>
<h1 id="articleHeader3">init data</h1>
<p><code>_initData()</code>发生在<code>_initState()</code>中，主要做了两件事：</p>
<ol>
<li><p>代理data中的属性</p></li>
<li><p>observe data</p></li>
</ol>
<p>文件路径：src/instance/internal/state.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._initState = function () {
    this._initProps()
    this._initMeta()
    this._initMethods()
    this._initData() // 这里
    this._initComputed()
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Vue.prototype._initState = function () {
    <span class="hljs-keyword">this</span>._initProps()
    <span class="hljs-keyword">this</span>._initMeta()
    <span class="hljs-keyword">this</span>._initMethods()
    <span class="hljs-keyword">this</span>._initData() <span class="hljs-comment">// 这里</span>
    <span class="hljs-keyword">this</span>._initComputed()
  }
</code></pre>
<h3 id="articleHeader4">属性代理（proxy）</h3>
<p>把data的结果赋值给内部属性：<br>文件路径：src/instance/internal/state.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dataFn = this.$options.data // 上面我们得到的mergedInstanceDataFn函数
var data = this._data = dataFn ? dataFn() : {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> dataFn = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span> <span class="hljs-comment">// 上面我们得到的mergedInstanceDataFn函数</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = dataFn ? dataFn() : {}</code></pre>
<p>代理（proxy）<code>data</code>中的属性到<code>_data</code>，使得<code>vm.message === vm._data.message</code>：<br>文件路径：src/instance/internal/state.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
  * Proxy a property, so that
  * vm.prop === vm._data.prop
  */
Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
      var self = this
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter () {
          return self._data[key]
        },
        set: function proxySetter (val) {
          self._data[key] = val
        }
      })
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
  * Proxy a property, so that
  * vm.prop === vm._data.prop
  */</span>
Vue.prototype._proxy = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(key)</span> </span>{
    <span class="hljs-keyword">if</span> (!isReserved(key)) {
      <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
      Object.defineProperty(<span class="hljs-keyword">self</span>, key, {
        configurable: <span class="hljs-keyword">true</span>,
        enumerable: <span class="hljs-keyword">true</span>,
        get: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span> <span class="hljs-params">()</span> </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>._data[key]
        },
        set: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span> <span class="hljs-params">(val)</span> </span>{
          <span class="hljs-keyword">self</span>._data[key] = val
        }
      })
    }
  }</code></pre>
<h1 id="articleHeader5">observe</h1>
<p>这里是我们的第一个重点，observe过程。在<code>_initData()</code>最后，调用了<code>observe(data, this)</code>对数据进行observe。在hello world例子里，<code>observe()</code>函数主要是针对<code>{message: 'Hello World'}</code>创建了Observer对象。<br>文件路径：src/observer/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ob = new Observer(value) // value = data = {message:'Hello World'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code style="word-break: break-word; white-space: initial;"><span class="hljs-title">var</span> ob = new <span class="hljs-type">Observer</span>(value) // value = <span class="hljs-class"><span class="hljs-keyword">data</span> = {<span class="hljs-title">message</span>:'<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>'}</span></code></pre>
<p>在<code>observe()</code>函数中还做了些能否observe的条件判断，这些条件有：</p>
<ol>
<li><p>没有被observe过（observe过的对象都会被添加<code>__ob__</code>属性）</p></li>
<li><p>只能是plain object（<code>toString.call(ob) === "[object Object]"</code>）或者数组</p></li>
<li><p>不能是Vue实例（<code>obj._isVue !== true</code>）</p></li>
<li><p>object是extensible的（<code>Object.isExtensible(obj) === true</code>）</p></li>
</ol>
<h3 id="articleHeader6">Observer</h3>
<p>官网的<a href="http://vuejs.org/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">Reactivity in Depth</a>上有这么句话：</p>
<blockquote>
<p>When you pass a plain JavaScript object to a Vue instance as its data option, Vue.js will walk through all of its properties and convert them to getter/setters </p>
<p>The getter/setters are invisible to the user, but under the hood they enable Vue.js to perform dependency-tracking and change-notification when properties are accessed or modified</p>
</blockquote>
<p>Observer就是干这个事情的，使data变成“发布者”，watcher是订阅者，订阅data的变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVx1bI" src="https://static.alili.tech/img/bVx1bI" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在例子中，创建observer的过程是：</p>
<ol>
<li><p><code>new Observer({message: 'Hello World'})</code></p></li>
<li><p>实例化一个Dep对象，用来收集依赖</p></li>
<li><p>walk（<code>Observer.prototype.walk()</code>）数据的每一个属性，这里只有message</p></li>
<li><p>将属性变成reactive的(<code>Observer.protoype.convert()</code>)</p></li>
</ol>
<p><code>convert()</code>里调用了<code>defineReactive()</code>，给data的message属性添加reactiveGetter和reactiveSetter<br>文件路径：src/observer/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function defineReactive (obj, key, value) {
    ...
    Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      ...
      if (Dep.target) {
        dep.depend() // 这里是收集依赖
        ...
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      ...
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      ...
      dep.notify() // 这里是notify观察这个数据的依赖（watcher）
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, value</span>) </span>{
    ...
    <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attribute">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      ...
      <span class="hljs-keyword">if</span> (Dep.target) {
        dep.depend() <span class="hljs-comment">// 这里是收集依赖</span>
        ...
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
      ...
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, newVal)
      } <span class="hljs-title">else</span> {
        val = newVal
      }
      ...
      dep.notify() <span class="hljs-comment">// 这里是notify观察这个数据的依赖（watcher）</span>
    }
  })
}</code></pre>
<p>关于依赖收集和notify，主要是<code>Dep</code>类<br>文件路径：src/observer/dep.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function Dep () {
  this.id = uid++
  this.subs = []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.id = uid++
  <span class="hljs-keyword">this</span>.subs = []
}</code></pre>
<p>这里的subs是保存着订阅者（即watcher）的数组，当被观察数据发生变化时，即被调用setter，那么<code>dep.notify()</code>就循环这里的订阅者，分别调用他们的update方法。</p>
<p>但是在getter收集依赖的代码里，并没有看到watcher被添加到subs中，什么时候添加进去的呢？这个问题在讲到Watcher的时候再回答。</p>
<h1 id="articleHeader7">mount node</h1>
<p>按照生命周期图上，observe data和一些init之后，就是<code>$mount</code>了，最主要的就是<code>_compile</code>。<br>文件路径：src/instance/api/lifecycle.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$mount = function (el) {
    ...
    this._compile(el)
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$mount = function (el) {
    ...
    this._compile(el)
    ...
  }</code></pre>
<p><code>_compile</code>里分两步：compile和link</p>
<h3 id="articleHeader8">compile</h3>
<p>compile过程是分析给定元素（el）或者模版（template），提取指令（directive）和创建对应离线的DOM元素（document fragment）。</p>
<p>文件路径：src/instance/internal/lifecycle.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._compile = function (el) {
    ...
    var rootLinker = compileRoot(el, options, contextOptions)
    ...
    var rootUnlinkFn = rootLinker(this, el, this._scope)
    ...
    var contentUnlinkFn = compile(el, options)(this, el)
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Vue.prototype._compile = function (el) {
    ...
    <span class="hljs-keyword">var</span> rootLinker = compileRoot(el, options, contextOptions)
    ...
    <span class="hljs-keyword">var</span> rootUnlinkFn = rootLinker(<span class="hljs-keyword">this</span>, el, <span class="hljs-keyword">this</span>._scope)
    ...
    <span class="hljs-keyword">var</span> contentUnlinkFn = compile(el, options)(<span class="hljs-keyword">this</span>, el)
    ...
}</code></pre>
<p>例子中compile #mountNode元素，大致过程如下：</p>
<ol>
<li><p>compileRoot：由于root node（<code>&lt;div id="mountNode"&gt;&lt;/div&gt;</code>）本身没有任何指令，所以这里compile不出什么东西</p></li>
<li><p>compileChildNode：mountNode的子node，即内容为""{{"message"}}""的TextNode</p></li>
<li><p>compileTextNode：<br>   3.1 parseText：其实就是tokenization（标记化：从字符串中提取符号，语句等有意义的元素），得到的结果是tokens<br>   3.2 processTextToken：从tokens中分析出指令类型，表达式和过滤器，并创建新的空的TextNode<br>   3.3 创建fragment，将新的TextNode append进去</p></li>
</ol>
<p>parseText的时候，通过正则表达式（<code>/\{\{\{(.+?)\}\}\}|\{\{(.+?)\}\}/g</code>）匹配字符串""{{"message"}}""，得出的token包含这些信息：“这是个tag，而且是文本（text）而非<a href="http://vuejs.org/guide/syntax.html#Raw-HTML" rel="nofollow noreferrer" target="_blank">HTML</a>的tag，不是一次性的插值（<a href="http://vuejs.org/guide/syntax.html#Text" rel="nofollow noreferrer" target="_blank">one-time interpolation</a>），tag的内容是"message"”。这里用来做匹配的正则表达式是会根据<a href="http://vuejs.org/api/#delimiters" rel="nofollow noreferrer" target="_blank">delimiters</a>和<a href="http://vuejs.org/api/#unsafeDelimiters" rel="nofollow noreferrer" target="_blank">unsafeDelimiters</a>的配置动态生成的。</p>
<p>processTextToken之后，其实就得到了创建指令需要的所有信息：指令类型v-text，表达式"message"，过滤器无，并且该指令负责跟进的DOM是新创建的TextNode。接下来就是实例化指令了。</p>
<h3 id="articleHeader9">link</h3>
<p>每个compile函数之后都会返回一个link function（linkFn）。linkFn就是去实例化指令，将指令和新建的元素link在一起，然后将元素替换到DOM tree中去。<br>每个linkFn函数都会返回一个unlink function（unlinkFn）。unlinkFn是在vm销毁的时候用的，这里不介绍。</p>
<p>实例化directive：<code>new Directive(description, vm, el)</code></p>
<p><code>description</code>是compile结果token中保存的信息，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="description = {
    name: 'text', // text指令
    expression: 'message',
    filters: undefined,
    def: vTextDefinition
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>description = {
    <span class="hljs-symbol">name:</span> <span class="hljs-string">'text'</span>, <span class="hljs-regexp">//</span> text指令
    <span class="hljs-symbol">expression:</span> <span class="hljs-string">'message'</span>,
    <span class="hljs-symbol">filters:</span> undefined,
    <span class="hljs-function"><span class="hljs-keyword">def</span>: <span class="hljs-title">vTextDefinition</span></span>
}</code></pre>
<p>def属性上的是text指令的定义（definition），和<a href="http://vuejs.org/guide/custom-directive.html" rel="nofollow noreferrer" target="_blank">Custome Directive</a>一样，text指令也有bind和update方法，其定义如下：</p>
<p>文件路径：src/directives/public/text.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {

  bind () {
    this.attr = this.el.nodeType === 3
      ? 'data'
      : 'textContent'
  },

  update (value) {
    this.el[this.attr] = _toString(value)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {

  bind () {
    <span class="hljs-keyword">this</span>.attr = <span class="hljs-keyword">this</span>.el.nodeType === <span class="hljs-number">3</span>
      ? <span class="hljs-string">'data'</span>
      : <span class="hljs-string">'textContent'</span>
  },

  update (value) {
    <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = _toString(value)
  }
}</code></pre>
<p><code>new Directive()</code>构造函数里面只是一些内部属性的赋值，真正的绑定过程还需要调用<code>Directive.prototype._bind</code>，它是在Vue实例方法<code>_bindDir()</code>中被调用的。<br>在_bind里面，会创建watcher，并第一次通过watcher去获得表达式"message"的计算值，更新到之前新建的TextNode中去，完成在页面上渲染"Hello World"。</p>
<h3 id="articleHeader10">watcher</h3>
<blockquote><p>For every directive / data binding in the template, there will be a corresponding watcher object, which records any properties “touched” during its evaluation as dependencies. Later on when a dependency’s setter is called, it triggers the watcher to re-evaluate, and in turn causes its associated directive to perform DOM updates.</p></blockquote>
<p>每个与数据绑定的directive都有一个watcher，帮它监听表达式的值，如果发生变化，则通知它update自己负责的DOM。一直说的dependency collection就在这里发生。</p>
<p>Directive.prototype._bind()里面，会<code>new Watcher(expression, update)</code>，把表达式和directive的update方法传进去。</p>
<p>Watcher会去<code>parseExpression</code>：<br>文件路径：src/parsers/expression.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function parseExpression (exp, needSet) {
  exp = exp.trim()
  // try cache
  var hit = expressionCache.get(exp)
  if (hit) {
    if (needSet &amp;&amp; !hit.set) {
      hit.set = compileSetter(hit.exp)
    }
    return hit
  }
  var res = { exp: exp }
  res.get = isSimplePath(exp) &amp;&amp; exp.indexOf('[') < 0
    // optimized super simple getter
    ? makeGetterFn('scope.' + exp)
    // dynamic getter
    : compileGetter(exp)
  if (needSet) {
    res.set = compileSetter(exp)
  }
  expressionCache.put(exp, res)
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>export <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseExpression</span> <span class="hljs-params">(exp, needSet)</span> {</span>
  <span class="hljs-built_in">exp</span> = <span class="hljs-built_in">exp</span>.trim()
  // <span class="hljs-keyword">try</span> cache
  var hit = expressionCache.<span class="hljs-built_in">get</span>(<span class="hljs-built_in">exp</span>)
  <span class="hljs-keyword">if</span> (hit) {
    <span class="hljs-keyword">if</span> (needSet &amp;&amp; !hit.<span class="hljs-keyword">set</span>) {
      hit.<span class="hljs-keyword">set</span> = compileSetter(hit.<span class="hljs-built_in">exp</span>)
    }
    <span class="hljs-keyword">return</span> hit
  }
  var <span class="hljs-keyword">res</span> = { <span class="hljs-built_in">exp</span>: <span class="hljs-built_in">exp</span> }
  <span class="hljs-keyword">res</span>.<span class="hljs-built_in">get</span> = isSimplePath(<span class="hljs-built_in">exp</span>) &amp;&amp; <span class="hljs-built_in">exp</span>.indexOf(<span class="hljs-string">'['</span>) &lt; <span class="hljs-number">0</span>
    // optimized super simple getter
    ? makeGetterFn(<span class="hljs-string">'scope.'</span> + <span class="hljs-built_in">exp</span>)
    // dynamic getter
    : compileGetter(<span class="hljs-built_in">exp</span>)
  <span class="hljs-keyword">if</span> (needSet) {
    <span class="hljs-keyword">res</span>.<span class="hljs-keyword">set</span> = compileSetter(<span class="hljs-built_in">exp</span>)
  }
  expressionCache.<span class="hljs-keyword">put</span>(<span class="hljs-built_in">exp</span>, <span class="hljs-keyword">res</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">res</span>
}</code></pre>
<p>这里的expression是"message"，单一变量，被认为是简单的数据访问路径（simplePath）。simplePath的值如何计算，怎么通过"message"字符串获得data.message的值呢？<br>获取字符串对应的变量的值，除了用eval，还可以用Function。上面的<code>makeGetterFn('scope.' + exp)</code>返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getter = new Function('scope', 'return ' + body + ';') // new Function('scope', 'return scope.message;')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">var getter = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Function</span>(<span class="hljs-symbol">'scope</span>', <span class="hljs-symbol">'return</span> ' + <span class="hljs-keyword">body</span> + <span class="hljs-string">';'</span>) // <span class="hljs-keyword">new</span> <span class="hljs-keyword">Function</span>(<span class="hljs-symbol">'scope</span>', <span class="hljs-symbol">'return</span> scope.message;')</code></pre>
<p>Watch.prototype.get()获取表达式值的时候，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scope = this.vm
getter.call(scope, scope) // 即执行vm.message" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code>var <span class="hljs-keyword">scope</span> = <span class="hljs-keyword">this</span>.vm
getter.call(<span class="hljs-keyword">scope</span>, <span class="hljs-keyword">scope</span>) <span class="hljs-comment">// 即执行vm.message</span></code></pre>
<p>由于initState时对数据进行了代理（proxy），这里的vm.message即为vm._data.message，即是data选项中定义的"Hello World"。</p>
<p>值拿到了，那什么时候将message设为依赖的呢？这就要结合前面observe data里说到的<code>reactiveGetter</code>了。<br>文件路径：src/watcher.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watcher.prototype.get = function () {
  this.beforeGet()        // -> Dep.target = this
  var scope = this.scope || this.vm
  ...
  var value value = this.getter.call(scope, scope)
  ...
  this.afterGet()         // -> Dep.target = null
  return value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Watcher.prototype.<span class="hljs-keyword">get</span> = function () {
  <span class="hljs-keyword">this</span>.beforeGet()        <span class="hljs-comment">// -&gt; Dep.target = this</span>
  <span class="hljs-keyword">var</span> scope = <span class="hljs-keyword">this</span>.scope || <span class="hljs-keyword">this</span>.vm
  ...
  <span class="hljs-keyword">var</span> value value = <span class="hljs-keyword">this</span>.getter.call(scope, scope)
  ...
  <span class="hljs-keyword">this</span>.afterGet()         <span class="hljs-comment">// -&gt; Dep.target = null</span>
  <span class="hljs-keyword">return</span> value
}</code></pre>
<p>watcher获取表达式的值分三步：</p>
<ol>
<li><p>beforeGet：设置<code>Dep.target = this</code></p></li>
<li><p>调用表达式的getter，读取（getter）vm.message的值，进入了message的reactiveGetter，由于Dep.target有值，因此执行了<code>dep.depend()</code>将target，即当前watcher，收入dep.subs数组里</p></li>
<li><p>afterGet：设置<code>Dep.target = null</code></p></li>
</ol>
<p>这里值得注意的是<code>Dep.target</code>，由于JS的单线程特性，同一时刻只能有一个watcher去get数据的值，所以target在全局下只需要有一个就可以了。<br>文件路径：src/observer/dep.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-comment">// the current target watcher being evaluated.</span>
<span class="hljs-comment">// this is globally unique because there could be only one</span>
<span class="hljs-comment">// watcher being evaluated at any time.</span>
Dep.<span class="hljs-keyword">target</span> = <span class="hljs-keyword">null</span></code></pre>
<p>就这样，指令通过watcher，去touch了表达式中涉及到的数据，同时被该数据（reactive data）保存为其变化的订阅者（subscriber），数据变化时，通过dep.notify() -&gt; watcher.update() -&gt; directive.update() -&gt; textDirective.update()，完成DOM的更新。</p>
<p>到这里，“Hello World”怎么渲染到页面上的过程基本就结束了。这里针对最简单的使用，挑选了最核心的步骤进行分析，更多内部细节，后面慢慢分享。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js源码（1）：Hello World的背后

## 原文链接
[https://segmentfault.com/a/1190000006866881](https://segmentfault.com/a/1190000006866881)


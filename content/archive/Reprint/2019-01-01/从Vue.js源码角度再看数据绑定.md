---
title: '从Vue.js源码角度再看数据绑定' 
date: 2019-01-01 2:30:07
hidden: true
slug: jn993zgejf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>因为对Vue.js很感兴趣，而且平时工作的技术栈也是Vue.js，这几个月花了些时间研究学习了一下Vue.js源码，并做了总结与输出。<br>文章的原地址：<a href="https://github.com/answershuto/learnVue" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue</a>。<br>在学习过程中，为Vue加上了中文的注释<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/tree/master/vue-src</a>，希望可以对其他想学习Vue源码的小伙伴有所帮助。<br>可能会有理解存在偏差的地方，欢迎提issue指出，共同学习，共同进步。</p>
<p>阅读数据绑定源码之前建议先了解一下<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown" rel="nofollow noreferrer" target="_blank">《响应式原理》</a>以及<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown" rel="nofollow noreferrer" target="_blank">《依赖收集》</a>，可以更好地理解Vue.js数据双向绑定的整个过程。</p>
<h2 id="articleHeader1">数据绑定原理</h2>
<p>前面已经讲过Vue数据绑定的原理了，现在从源码来看一下数据绑定在Vue中是如何实现的。</p>
<p>首先看一下Vue.js官网介绍响应式原理的这张图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011017713" src="https://static.alili.tech/img/remote/1460000011017713" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>这张图比较清晰地展示了整个流程，首先通过一次渲染操作触发Data的getter（这里保证只有视图中需要被用到的data才会触发getter）进行依赖收集，这时候其实Watcher与data可以看成一种被绑定的状态（实际上是data的闭包中有一个Deps订阅着，在修改的时候会通知所有的Watcher观察者），在data发生变化的时候会触发它的setter，setter通知Watcher，Watcher进行回调通知组件重新渲染的函数，之后根据diff算法来决定是否发生视图的更新。</p>
<p>Vue在初始化组件数据时，在生命周期的<a href="https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L55" rel="nofollow noreferrer" target="_blank">beforeCreate</a>与<a href="https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L59" rel="nofollow noreferrer" target="_blank">created</a>钩子函数之间实现了对<a href="https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L43" rel="nofollow noreferrer" target="_blank">data、props、computed、methods、events以及watch</a>的处理。</p>
<h2 id="articleHeader2">initData</h2>
<p>这里来讲一下<a href="https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L107" rel="nofollow noreferrer" target="_blank">initData</a>，可以参考源码instance下的state.js文件，下面所有的中文注释都是我加的，英文注释是尤大加的，请不要忽略英文注释，英文注释都讲到了比较关键或者晦涩难懂的点。</p>
<p>加注释版的vue源码也可以直接通过<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" rel="nofollow noreferrer" target="_blank">传送门</a>查看，这些是我在阅读Vue源码过程中加的注释，持续更新中。</p>
<p>initData主要是初始化data中的数据，将数据进行Oberver，监听数据的变化，其他的监视原理一致，这里以data为例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initData (vm: Component) {

  /*得到data数据*/
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

  /*判断是否是对象*/
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' &amp;&amp; warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }

  // proxy data on instance
  /*遍历data对象*/
  const keys = Object.keys(data)
  const props = vm.$options.props
  let i = keys.length

  //遍历data中的数据
  while (i--) {
    /*保证data中的key不与props中的key重复，props优先，如果有冲突会产生warning*/
    if (props &amp;&amp; hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' &amp;&amp; warn(
        `The data property &quot;${keys[i]}&quot; is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(keys[i])) {
      /*判断是否是保留字段*/

      /*这里是我们前面讲过的代理，将data上面的属性代理到了vm实例上*/
      proxy(vm, `_data`, keys[i])
    }
  }

  // observe data
  /*从这里开始我们要observe了，开始对数据进行绑定，这里有尤大大的注释asRootData，这步作为根数据，下面会进行递归observe进行对深层对象的绑定。*/
  observe(data, true /* asRootData */)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initData</span> (<span class="hljs-params">vm: Component</span>) </span>{

  <span class="hljs-comment">/*得到data数据*/</span>
  <span class="hljs-keyword">let</span> data = vm.$options.data
  data = vm._data = <span class="hljs-keyword">typeof</span> data === <span class="hljs-string">'function'</span>
    ? getData(data, vm)
    : data || {}

  <span class="hljs-comment">/*判断是否是对象*/</span>
  <span class="hljs-keyword">if</span> (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
      <span class="hljs-string">'data functions should return an object:\n'</span> +
      <span class="hljs-string">'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function'</span>,
      vm
    )
  }

  <span class="hljs-comment">// proxy data on instance</span>
  <span class="hljs-comment">/*遍历data对象*/</span>
  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(data)
  <span class="hljs-keyword">const</span> props = vm.$options.props
  <span class="hljs-keyword">let</span> i = keys.length

  <span class="hljs-comment">//遍历data中的数据</span>
  <span class="hljs-keyword">while</span> (i--) {
    <span class="hljs-comment">/*保证data中的key不与props中的key重复，props优先，如果有冲突会产生warning*/</span>
    <span class="hljs-keyword">if</span> (props &amp;&amp; hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
        <span class="hljs-string">`The data property "<span class="hljs-subst">${keys[i]}</span>" is already declared as a prop. `</span> +
        <span class="hljs-string">`Use prop default value instead.`</span>,
        vm
      )
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isReserved(keys[i])) {
      <span class="hljs-comment">/*判断是否是保留字段*/</span>

      <span class="hljs-comment">/*这里是我们前面讲过的代理，将data上面的属性代理到了vm实例上*/</span>
      proxy(vm, <span class="hljs-string">`_data`</span>, keys[i])
    }
  }

  <span class="hljs-comment">// observe data</span>
  <span class="hljs-comment">/*从这里开始我们要observe了，开始对数据进行绑定，这里有尤大大的注释asRootData，这步作为根数据，下面会进行递归observe进行对深层对象的绑定。*/</span>
  observe(data, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
}</code></pre>
<p>其实这段代码主要做了两件事，一是将_data上面的数据代理到vm上，另一件事通过observe将所有数据变成observable。</p>
<h2 id="articleHeader3">proxy</h2>
<p>接下来看一下proxy代理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*添加代理*/
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*添加代理*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxy</span> (<span class="hljs-params">target: Object, sourceKey: string, key: string</span>) </span>{
  sharedPropertyDefinition.get = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[sourceKey][key]
  }
  sharedPropertyDefinition.set = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">this</span>[sourceKey][key] = val
  }
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, sharedPropertyDefinition)
}</code></pre>
<p>这里比较好理解，通过proxy函数将data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。</p>
<h2 id="articleHeader4">observe</h2>
<p>接下来是<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L106" rel="nofollow noreferrer" target="_blank">observe</a>，这个函数定义在core文件下oberver的index.js文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
 /*
 尝试创建一个Observer实例（__ob__），如果成功创建Observer实例则返回新的Observer实例，如果已有Observer实例则返回现有的Observer实例。
 */
export function observe (value: any, asRootData: ?boolean): Observer | void {
  /*判断是否是一个对象*/
  if (!isObject(value)) {
    return
  }
  let ob: Observer | void

  /*这里用__ob__这个属性来判断是否已经有Observer实例，如果没有Observer实例则会新建一个Observer实例并赋值给__ob__这个属性，如果已有Observer实例则直接返回该Observer实例*/
  if (hasOwn(value, '__ob__') &amp;&amp; value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (

    /*这里的判断是为了确保value是单纯的对象，而不是函数或者是Regexp等情况。*/
    observerState.shouldConvert &amp;&amp;
    !isServerRendering() &amp;&amp;
    (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
    Object.isExtensible(value) &amp;&amp;
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData &amp;&amp; ob) {

    /*如果是根数据则计数，后面Observer中的observe的asRootData非true*/
    ob.vmCount++
  }
  return ob
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */</span>
 <span class="hljs-comment">/*
 尝试创建一个Observer实例（__ob__），如果成功创建Observer实例则返回新的Observer实例，如果已有Observer实例则返回现有的Observer实例。
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">value: any, asRootData: ?boolean</span>): <span class="hljs-title">Observer</span> | <span class="hljs-title">void</span> </span>{
  <span class="hljs-comment">/*判断是否是一个对象*/</span>
  <span class="hljs-keyword">if</span> (!isObject(value)) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">let</span> ob: Observer | <span class="hljs-keyword">void</span>

  <span class="hljs-comment">/*这里用__ob__这个属性来判断是否已经有Observer实例，如果没有Observer实例则会新建一个Observer实例并赋值给__ob__这个属性，如果已有Observer实例则直接返回该Observer实例*/</span>
  <span class="hljs-keyword">if</span> (hasOwn(value, <span class="hljs-string">'__ob__'</span>) &amp;&amp; value.__ob__ <span class="hljs-keyword">instanceof</span> Observer) {
    ob = value.__ob__
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (

    <span class="hljs-comment">/*这里的判断是为了确保value是单纯的对象，而不是函数或者是Regexp等情况。*/</span>
    observerState.shouldConvert &amp;&amp;
    !isServerRendering() &amp;&amp;
    (<span class="hljs-built_in">Array</span>.isArray(value) || isPlainObject(value)) &amp;&amp;
    <span class="hljs-built_in">Object</span>.isExtensible(value) &amp;&amp;
    !value._isVue
  ) {
    ob = <span class="hljs-keyword">new</span> Observer(value)
  }
  <span class="hljs-keyword">if</span> (asRootData &amp;&amp; ob) {

    <span class="hljs-comment">/*如果是根数据则计数，后面Observer中的observe的asRootData非true*/</span>
    ob.vmCount++
  }
  <span class="hljs-keyword">return</span> ob
}
</code></pre>
<p>Vue的响应式数据都会有一个__ob__的属性作为标记，里面存放了该属性的观察器，也就是Observer的实例，防止重复绑定。</p>
<h2 id="articleHeader5">Observer</h2>
<p>接下来看一下新建的<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L34" rel="nofollow noreferrer" target="_blank">Observer</a>。Observer的作用就是遍历对象的所有属性将其进行双向绑定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
export class  {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0

    /* 
    将Observer实例绑定到data的__ob__属性上面去，之前说过observe的时候会先检测是否已经有__ob__对象存放Observer实例了，def方法定义可以参考https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L16 
    */
    def(value, '__ob__', this)
    if (Array.isArray(value)) {

      /*
          如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
          这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。
      */
      const augment = hasProto
        ? protoAugment  /*直接覆盖原型的方法来修改目标对象*/
        : copyAugment   /*定义（覆盖）目标对象或数组的某一个方法*/
      augment(value, arrayMethods, arrayKeys)

      /*如果是数组则需要遍历数组的每一个成员进行observe*/
      this.observeArray(value)
    } else {

      /*如果是对象则直接walk进行绑定*/
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)

    /*walk方法会遍历对象的每一个属性进行defineReactive绑定*/
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {

    /*数组需要便利每一个成员进行observe*/
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span>  </span>{
  value: any;
  dep: Dep;
  vmCount: number; <span class="hljs-comment">// number of vms that has this object as root $data</span>

  <span class="hljs-keyword">constructor</span> (value: any) {
    <span class="hljs-keyword">this</span>.value = value
    <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
    <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>

    <span class="hljs-comment">/* 
    将Observer实例绑定到data的__ob__属性上面去，之前说过observe的时候会先检测是否已经有__ob__对象存放Observer实例了，def方法定义可以参考https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L16 
    */</span>
    def(value, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {

      <span class="hljs-comment">/*
          如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
          这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。
      */</span>
      <span class="hljs-keyword">const</span> augment = hasProto
        ? protoAugment  <span class="hljs-comment">/*直接覆盖原型的方法来修改目标对象*/</span>
        : copyAugment   <span class="hljs-comment">/*定义（覆盖）目标对象或数组的某一个方法*/</span>
      augment(value, arrayMethods, arrayKeys)

      <span class="hljs-comment">/*如果是数组则需要遍历数组的每一个成员进行observe*/</span>
      <span class="hljs-keyword">this</span>.observeArray(value)
    } <span class="hljs-keyword">else</span> {

      <span class="hljs-comment">/*如果是对象则直接walk进行绑定*/</span>
      <span class="hljs-keyword">this</span>.walk(value)
    }
  }

  <span class="hljs-comment">/**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
  walk (obj: <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(obj)

    <span class="hljs-comment">/*walk方法会遍历对象的每一个属性进行defineReactive绑定*/</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  <span class="hljs-comment">/**
   * Observe a list of Array items.
   */</span>
  observeArray (items: <span class="hljs-built_in">Array</span>&lt;any&gt;) {

    <span class="hljs-comment">/*数组需要便利每一个成员进行observe*/</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
      observe(items[i])
    }
  }
}</code></pre>
<p>Observer为数据加上响应式属性进行双向绑定。如果是对象则进行深度遍历，为每一个子对象都绑定上方法，如果是数组则为每一个成员都绑定上方法。</p>
<p>如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。但这时候出现了一个问题，？如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，更别说pop了，那么我们如何监听数组的这些变化呢？<br>Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个<a href="http://v1-cn.vuejs.org/guide/list.html#" rel="nofollow noreferrer" target="_blank">数组方法</a>。修改数组原型方法的代码可以参考<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js" rel="nofollow noreferrer" target="_blank">observer/array.js</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

/*取得原生数组的原型*/
const arrayProto = Array.prototype
/*创建一个新的数组对象，修改该对象上的数组的七个方法，防止污染原生数组方法*/
export const arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */
 /*这里重写了数组的这些方法，在保证不污染原生数组原型的情况下重写数组的这些方法，截获数组的成员发生的变化，执行原生数组操作的同时dep通知关联的所有观察者进行响应式处理*/
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  /*将数组的原生方法缓存起来，后面要调用*/
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator () {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    let i = arguments.length
    const args = new Array(i)
    while (i--) {
      args[i] = arguments[i]
    }
    /*调用原生的数组方法*/
    const result = original.apply(this, args)

    /*数组新插入的元素需要重新进行observe才能响应式*/
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
      
    // notify change
    /*dep通知所有注册的观察者进行响应式处理*/
    ob.dep.notify()
    return result
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */</span>

<span class="hljs-keyword">import</span> { def } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/index'</span>

<span class="hljs-comment">/*取得原生数组的原型*/</span>
<span class="hljs-keyword">const</span> arrayProto = <span class="hljs-built_in">Array</span>.prototype
<span class="hljs-comment">/*创建一个新的数组对象，修改该对象上的数组的七个方法，防止污染原生数组方法*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> arrayMethods = <span class="hljs-built_in">Object</span>.create(arrayProto)

<span class="hljs-comment">/**
 * Intercept mutating methods and emit events
 */</span>
 <span class="hljs-comment">/*这里重写了数组的这些方法，在保证不污染原生数组原型的情况下重写数组的这些方法，截获数组的成员发生的变化，执行原生数组操作的同时dep通知关联的所有观察者进行响应式处理*/</span>
;[
  <span class="hljs-string">'push'</span>,
  <span class="hljs-string">'pop'</span>,
  <span class="hljs-string">'shift'</span>,
  <span class="hljs-string">'unshift'</span>,
  <span class="hljs-string">'splice'</span>,
  <span class="hljs-string">'sort'</span>,
  <span class="hljs-string">'reverse'</span>
]
.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  <span class="hljs-comment">// cache original method</span>
  <span class="hljs-comment">/*将数组的原生方法缓存起来，后面要调用*/</span>
  <span class="hljs-keyword">const</span> original = arrayProto[method]
  def(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutator</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// avoid leaking arguments:</span>
    <span class="hljs-comment">// http://jsperf.com/closure-with-arguments</span>
    <span class="hljs-keyword">let</span> i = <span class="hljs-built_in">arguments</span>.length
    <span class="hljs-keyword">const</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i)
    <span class="hljs-keyword">while</span> (i--) {
      args[i] = <span class="hljs-built_in">arguments</span>[i]
    }
    <span class="hljs-comment">/*调用原生的数组方法*/</span>
    <span class="hljs-keyword">const</span> result = original.apply(<span class="hljs-keyword">this</span>, args)

    <span class="hljs-comment">/*数组新插入的元素需要重新进行observe才能响应式*/</span>
    <span class="hljs-keyword">const</span> ob = <span class="hljs-keyword">this</span>.__ob__
    <span class="hljs-keyword">let</span> inserted
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'push'</span>:
        inserted = args
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'unshift'</span>:
        inserted = args
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'splice'</span>:
        inserted = args.slice(<span class="hljs-number">2</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> (inserted) ob.observeArray(inserted)
      
    <span class="hljs-comment">// notify change</span>
    <span class="hljs-comment">/*dep通知所有注册的观察者进行响应式处理*/</span>
    ob.dep.notify()
    <span class="hljs-keyword">return</span> result
  })
})
</code></pre>
<p>从数组的原型新建一个Object.create(arrayProto)对象，通过修改此原型可以保证原生数组方法不被污染。如果当前浏览器支持__proto__这个属性的话就可以直接覆盖该属性则使数组对象具有了重写后的数组方法。如果没有该属性的浏览器，则必须通过遍历def所有需要重写的数组方法，这种方法效率较低，所以优先使用第一种。<br>在保证不污染不覆盖数组原生方法添加监听，主要做了两个操作，第一是通知所有注册的观察者进行响应式处理，第二是如果是添加成员的操作，需要对新成员进行observe。<br>但是修改了数组的原生方法以后我们还是没法像原生数组一样直接通过数组的下标或者设置length来修改数组，Vue.js提供了<a href="http://v1-cn.vuejs.org/guide/list.html#" rel="nofollow noreferrer" target="_blank">$set()及$remove()方法</a>。</p>
<h2 id="articleHeader6">Watcher</h2>
<p><a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js#L24" rel="nofollow noreferrer" target="_blank">Watcher</a>是一个观察者对象。依赖收集以后Watcher对象会被保存在Deps中，数据变动的时候会由于Deps通知Watcher实例，然后由Watcher实例回调cb进行实图的更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: ISet;
  newDepIds: ISet;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    this.vm = vm
    /*_watchers存放订阅者实例*/
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    /*把表达式expOrFn解析成getter*/
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function () {}
        process.env.NODE_ENV !== 'production' &amp;&amp; warn(
          `Failed watching path: &quot;${expOrFn}&quot; ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
   /*获得getter的值并且重新进行依赖收集*/
  get () {
    /*将自身watcher观察者实例设置给Dep.target，用以依赖收集。*/
    pushTarget(this)
    let value
    const vm = this.vm

    /*
      执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
      在将Dep.target设置为自生观察者实例以后，执行getter操作。
      譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
      那么在执行getter的时候就会触发a跟c两个数据的getter函数，
      在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
      将该观察者对象放入闭包中的Dep的subs中去。
    */
    if (this.user) {
      try {
        value = this.getter.call(vm, vm)
      } catch (e) {
        handleError(e, vm, `getter for watcher &quot;${this.expression}&quot;`)
      }
    } else {
      value = this.getter.call(vm, vm)
    }
    // &quot;touch&quot; every property so they are all tracked as
    // dependencies for deep watching
    /*如果存在deep，则触发每个深层对象的依赖，追踪其变化*/
    if (this.deep) {
      /*递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系*/
      traverse(value)
    }

    /*将观察者实例从target栈中取出并设置给Dep.target*/
    popTarget()
    this.cleanupDeps()
    return value
  }

  /**
   * Add a dependency to this directive.
   */
   /*添加一个依赖关系到Deps集合中*/
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
   /*清理依赖收集*/
  cleanupDeps () {
    /*移除所有观察者对象*/
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
   /*
      调度者接口，当依赖发生改变的时候进行回调。
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      /*同步则执行run直接渲染视图*/
      this.run()
    } else {
      /*异步推送到观察者队列中，由调度者调用。*/
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
   /*
      调度者工作接口，将被调度者回调。
    */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        /*
            即便值相同，拥有Deep属性的观察者以及在对象／数组上的观察者应该被触发更新，因为它们的值可能发生改变。
        */
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        /*设置新的值*/
        this.value = value

        /*触发回调渲染视图*/
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher &quot;${this.expression}&quot;`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
   /*获取观察者的值*/
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
   /*收集该watcher的所有deps依赖*/
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
   /*将自身从所有依赖收集订阅列表删除*/
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      /*从vm实例的观察者列表中将自身移除，由于该操作比较耗费资源，所以如果vm实例正在被销毁则跳过该步骤。*/
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  vm: Component;
  expression: string;
  cb: <span class="hljs-built_in">Function</span>;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: <span class="hljs-built_in">Array</span>&lt;Dep&gt;;
  newDeps: <span class="hljs-built_in">Array</span>&lt;Dep&gt;;
  depIds: ISet;
  newDepIds: ISet;
  getter: <span class="hljs-built_in">Function</span>;
  value: any;

  <span class="hljs-keyword">constructor</span> (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    <span class="hljs-keyword">this</span>.vm = vm
    <span class="hljs-comment">/*_watchers存放订阅者实例*/</span>
    vm._watchers.push(<span class="hljs-keyword">this</span>)
    <span class="hljs-comment">// options</span>
    <span class="hljs-keyword">if</span> (options) {
      <span class="hljs-keyword">this</span>.deep = !!options.deep
      <span class="hljs-keyword">this</span>.user = !!options.user
      <span class="hljs-keyword">this</span>.lazy = !!options.lazy
      <span class="hljs-keyword">this</span>.sync = !!options.sync
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.deep = <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">this</span>.lazy = <span class="hljs-keyword">this</span>.sync = <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">this</span>.cb = cb
    <span class="hljs-keyword">this</span>.id = ++uid <span class="hljs-comment">// uid for batching</span>
    <span class="hljs-keyword">this</span>.active = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.dirty = <span class="hljs-keyword">this</span>.lazy <span class="hljs-comment">// for lazy watchers</span>
    <span class="hljs-keyword">this</span>.deps = []
    <span class="hljs-keyword">this</span>.newDeps = []
    <span class="hljs-keyword">this</span>.depIds = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()
    <span class="hljs-keyword">this</span>.newDepIds = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()
    <span class="hljs-keyword">this</span>.expression = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
      ? expOrFn.toString()
      : <span class="hljs-string">''</span>
    <span class="hljs-comment">// parse expression for getter</span>
    <span class="hljs-comment">/*把表达式expOrFn解析成getter*/</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> expOrFn === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">this</span>.getter = expOrFn
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.getter = parsePath(expOrFn)
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.getter) {
        <span class="hljs-keyword">this</span>.getter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
        process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
          <span class="hljs-string">`Failed watching path: "<span class="hljs-subst">${expOrFn}</span>" `</span> +
          <span class="hljs-string">'Watcher only accepts simple dot-delimited paths. '</span> +
          <span class="hljs-string">'For full control, use a function instead.'</span>,
          vm
        )
      }
    }
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
      ? <span class="hljs-literal">undefined</span>
      : <span class="hljs-keyword">this</span>.get()
  }

  <span class="hljs-comment">/**
   * Evaluate the getter, and re-collect dependencies.
   */</span>
   <span class="hljs-comment">/*获得getter的值并且重新进行依赖收集*/</span>
  get () {
    <span class="hljs-comment">/*将自身watcher观察者实例设置给Dep.target，用以依赖收集。*/</span>
    pushTarget(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">let</span> value
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">this</span>.vm

    <span class="hljs-comment">/*
      执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
      在将Dep.target设置为自生观察者实例以后，执行getter操作。
      譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
      那么在执行getter的时候就会触发a跟c两个数据的getter函数，
      在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
      将该观察者对象放入闭包中的Dep的subs中去。
    */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
      <span class="hljs-keyword">try</span> {
        value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
      } <span class="hljs-keyword">catch</span> (e) {
        handleError(e, vm, <span class="hljs-string">`getter for watcher "<span class="hljs-subst">${<span class="hljs-keyword">this</span>.expression}</span>"`</span>)
      }
    } <span class="hljs-keyword">else</span> {
      value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
    }
    <span class="hljs-comment">// "touch" every property so they are all tracked as</span>
    <span class="hljs-comment">// dependencies for deep watching</span>
    <span class="hljs-comment">/*如果存在deep，则触发每个深层对象的依赖，追踪其变化*/</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.deep) {
      <span class="hljs-comment">/*递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系*/</span>
      traverse(value)
    }

    <span class="hljs-comment">/*将观察者实例从target栈中取出并设置给Dep.target*/</span>
    popTarget()
    <span class="hljs-keyword">this</span>.cleanupDeps()
    <span class="hljs-keyword">return</span> value
  }

  <span class="hljs-comment">/**
   * Add a dependency to this directive.
   */</span>
   <span class="hljs-comment">/*添加一个依赖关系到Deps集合中*/</span>
  addDep (dep: Dep) {
    <span class="hljs-keyword">const</span> id = dep.id
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.newDepIds.has(id)) {
      <span class="hljs-keyword">this</span>.newDepIds.add(id)
      <span class="hljs-keyword">this</span>.newDeps.push(dep)
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.depIds.has(id)) {
        dep.addSub(<span class="hljs-keyword">this</span>)
      }
    }
  }

  <span class="hljs-comment">/**
   * Clean up for dependency collection.
   */</span>
   <span class="hljs-comment">/*清理依赖收集*/</span>
  cleanupDeps () {
    <span class="hljs-comment">/*移除所有观察者对象*/</span>
    <span class="hljs-keyword">let</span> i = <span class="hljs-keyword">this</span>.deps.length
    <span class="hljs-keyword">while</span> (i--) {
      <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">this</span>.deps[i]
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.newDepIds.has(dep.id)) {
        dep.removeSub(<span class="hljs-keyword">this</span>)
      }
    }
    <span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">this</span>.depIds
    <span class="hljs-keyword">this</span>.depIds = <span class="hljs-keyword">this</span>.newDepIds
    <span class="hljs-keyword">this</span>.newDepIds = tmp
    <span class="hljs-keyword">this</span>.newDepIds.clear()
    tmp = <span class="hljs-keyword">this</span>.deps
    <span class="hljs-keyword">this</span>.deps = <span class="hljs-keyword">this</span>.newDeps
    <span class="hljs-keyword">this</span>.newDeps = tmp
    <span class="hljs-keyword">this</span>.newDeps.length = <span class="hljs-number">0</span>
  }

  <span class="hljs-comment">/**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */</span>
   <span class="hljs-comment">/*
      调度者接口，当依赖发生改变的时候进行回调。
   */</span>
  update () {
    <span class="hljs-comment">/* istanbul ignore else */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lazy) {
      <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
      <span class="hljs-comment">/*同步则执行run直接渲染视图*/</span>
      <span class="hljs-keyword">this</span>.run()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">/*异步推送到观察者队列中，由调度者调用。*/</span>
      queueWatcher(<span class="hljs-keyword">this</span>)
    }
  }

  <span class="hljs-comment">/**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */</span>
   <span class="hljs-comment">/*
      调度者工作接口，将被调度者回调。
    */</span>
  run () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.active) {
      <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.get()
      <span class="hljs-keyword">if</span> (
        value !== <span class="hljs-keyword">this</span>.value ||
        <span class="hljs-comment">// Deep watchers and watchers on Object/Arrays should fire even</span>
        <span class="hljs-comment">// when the value is the same, because the value may</span>
        <span class="hljs-comment">// have mutated.</span>
        <span class="hljs-comment">/*
            即便值相同，拥有Deep属性的观察者以及在对象／数组上的观察者应该被触发更新，因为它们的值可能发生改变。
        */</span>
        isObject(value) ||
        <span class="hljs-keyword">this</span>.deep
      ) {
        <span class="hljs-comment">// set new value</span>
        <span class="hljs-keyword">const</span> oldValue = <span class="hljs-keyword">this</span>.value
        <span class="hljs-comment">/*设置新的值*/</span>
        <span class="hljs-keyword">this</span>.value = value

        <span class="hljs-comment">/*触发回调渲染视图*/</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldValue)
          } <span class="hljs-keyword">catch</span> (e) {
            handleError(e, <span class="hljs-keyword">this</span>.vm, <span class="hljs-string">`callback for watcher "<span class="hljs-subst">${<span class="hljs-keyword">this</span>.expression}</span>"`</span>)
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldValue)
        }
      }
    }
  }

  <span class="hljs-comment">/**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */</span>
   <span class="hljs-comment">/*获取观察者的值*/</span>
  evaluate () {
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get()
    <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">false</span>
  }

  <span class="hljs-comment">/**
   * Depend on all deps collected by this watcher.
   */</span>
   <span class="hljs-comment">/*收集该watcher的所有deps依赖*/</span>
  depend () {
    <span class="hljs-keyword">let</span> i = <span class="hljs-keyword">this</span>.deps.length
    <span class="hljs-keyword">while</span> (i--) {
      <span class="hljs-keyword">this</span>.deps[i].depend()
    }
  }

  <span class="hljs-comment">/**
   * Remove self from all dependencies' subscriber list.
   */</span>
   <span class="hljs-comment">/*将自身从所有依赖收集订阅列表删除*/</span>
  teardown () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.active) {
      <span class="hljs-comment">// remove self from vm's watcher list</span>
      <span class="hljs-comment">// this is a somewhat expensive operation so we skip it</span>
      <span class="hljs-comment">// if the vm is being destroyed.</span>
      <span class="hljs-comment">/*从vm实例的观察者列表中将自身移除，由于该操作比较耗费资源，所以如果vm实例正在被销毁则跳过该步骤。*/</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.vm._isBeingDestroyed) {
        remove(<span class="hljs-keyword">this</span>.vm._watchers, <span class="hljs-keyword">this</span>)
      }
      <span class="hljs-keyword">let</span> i = <span class="hljs-keyword">this</span>.deps.length
      <span class="hljs-keyword">while</span> (i--) {
        <span class="hljs-keyword">this</span>.deps[i].removeSub(<span class="hljs-keyword">this</span>)
      }
      <span class="hljs-keyword">this</span>.active = <span class="hljs-literal">false</span>
    }
  }
}</code></pre>
<h2 id="articleHeader7">Dep</h2>
<p>来看看<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js#L12" rel="nofollow noreferrer" target="_blank">Dep</a>类。其实Dep就是一个发布者，可以订阅多个观察者，依赖收集之后Deps中会存在一个或多个Watcher对象，在数据变更的时候通知所有的Watcher。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  /*添加一个观察者对象*/
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  /*移除一个观察者对象*/
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  /*依赖收集，当存在Dep.target的时候添加观察者对象*/
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  /*通知所有订阅者*/
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">static</span> target: ?Watcher;
  id: number;
  subs: <span class="hljs-built_in">Array</span>&lt;Watcher&gt;;

  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
  }

  <span class="hljs-comment">/*添加一个观察者对象*/</span>
  addSub (sub: Watcher) {
    <span class="hljs-keyword">this</span>.subs.push(sub)
  }

  <span class="hljs-comment">/*移除一个观察者对象*/</span>
  removeSub (sub: Watcher) {
    remove(<span class="hljs-keyword">this</span>.subs, sub)
  }

  <span class="hljs-comment">/*依赖收集，当存在Dep.target的时候添加观察者对象*/</span>
  depend () {
    <span class="hljs-keyword">if</span> (Dep.target) {
      Dep.target.addDep(<span class="hljs-keyword">this</span>)
    }
  }

  <span class="hljs-comment">/*通知所有订阅者*/</span>
  notify () {
    <span class="hljs-comment">// stabilize the subscriber list first</span>
    <span class="hljs-keyword">const</span> subs = <span class="hljs-keyword">this</span>.subs.slice()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}

<span class="hljs-comment">// the current target watcher being evaluated.</span>
<span class="hljs-comment">// this is globally unique because there could be only one</span>
<span class="hljs-comment">// watcher being evaluated at any time.</span>
Dep.target = <span class="hljs-literal">null</span>
<span class="hljs-comment">/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/</span></code></pre>
<h2 id="articleHeader8">defineReactive</h2>
<p>接下来是<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L131" rel="nofollow noreferrer" target="_blank">defineReactive</a>。defineReactive的作用是通过Object.defineProperty为数据定义上gettersetter方法，进行依赖收集后闭包中的Deps会存放Watcher对象。触发setter改变数据的时候会通知Deps订阅者通知所有的Watcher观察者对象进行试图的更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: Function
) {
  /*在闭包中定义一个dep对象*/
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  /*如果之前该对象已经预设了getter以及setter函数则将其取出来，新定义的getter/setter中会将其执行，保证不会覆盖之前已经定义的getter/setter。*/
  // cater for pre-defined getter/setters
  const getter = property &amp;&amp; property.get
  const setter = property &amp;&amp; property.set

  /*对象的子对象递归进行observe并返回子节点的Observer对象*/
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {

      /*如果原本对象拥有getter方法则执行*/
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {

        /*进行依赖收集*/
        dep.depend()
        if (childOb) {

          /*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {

          /*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/
          dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {

      /*通过getter方法获取当前值，与新值进行比较，一致则不需要执行下面的操作*/
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' &amp;&amp; customSetter) {
        customSetter()
      }
      if (setter) {

        /*如果原本对象拥有setter方法则执行setter*/
        setter.call(obj, newVal)
      } else {
        val = newVal
      }

      /*新的值需要重新进行observe，保证数据响应式*/
      childOb = observe(newVal)

      /*dep对象通知所有的观察者*/
      dep.notify()
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Define a reactive property on an Object.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">
  obj: Object,
  key: string,
  val: any,
  customSetter?: Function
</span>) </span>{
  <span class="hljs-comment">/*在闭包中定义一个dep对象*/</span>
  <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()

  <span class="hljs-keyword">const</span> property = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key)
  <span class="hljs-keyword">if</span> (property &amp;&amp; property.configurable === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">/*如果之前该对象已经预设了getter以及setter函数则将其取出来，新定义的getter/setter中会将其执行，保证不会覆盖之前已经定义的getter/setter。*/</span>
  <span class="hljs-comment">// cater for pre-defined getter/setters</span>
  <span class="hljs-keyword">const</span> getter = property &amp;&amp; property.get
  <span class="hljs-keyword">const</span> setter = property &amp;&amp; property.set

  <span class="hljs-comment">/*对象的子对象递归进行observe并返回子节点的Observer对象*/</span>
  <span class="hljs-keyword">let</span> childOb = observe(val)
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{

      <span class="hljs-comment">/*如果原本对象拥有getter方法则执行*/</span>
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
      <span class="hljs-keyword">if</span> (Dep.target) {

        <span class="hljs-comment">/*进行依赖收集*/</span>
        dep.depend()
        <span class="hljs-keyword">if</span> (childOb) {

          <span class="hljs-comment">/*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/</span>
          childOb.dep.depend()
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {

          <span class="hljs-comment">/*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/</span>
          dependArray(value)
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{

      <span class="hljs-comment">/*通过getter方法获取当前值，与新值进行比较，一致则不需要执行下面的操作*/</span>
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
      <span class="hljs-comment">/* eslint-disable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">/* eslint-enable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; customSetter) {
        customSetter()
      }
      <span class="hljs-keyword">if</span> (setter) {

        <span class="hljs-comment">/*如果原本对象拥有setter方法则执行setter*/</span>
        setter.call(obj, newVal)
      } <span class="hljs-keyword">else</span> {
        val = newVal
      }

      <span class="hljs-comment">/*新的值需要重新进行observe，保证数据响应式*/</span>
      childOb = observe(newVal)

      <span class="hljs-comment">/*dep对象通知所有的观察者*/</span>
      dep.notify()
    }
  })
}</code></pre>
<p>现在再来看这张图是不是更清晰了呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011017713" src="https://static.alili.tech/img/remote/1460000011017713" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">关于</h2>
<p>作者：染陌 </p>
<p>Email：answershuto@gmail.com  or  answershuto@126.com</p>
<p>Github:  <a href="https://github.com/answershuto" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto</a></p>
<p>Blog：<a href="http://answershuto.github.io/" rel="nofollow noreferrer" target="_blank">http://answershuto.github.io/</a></p>
<p>知乎专栏：<a href="https://zhuanlan.zhihu.com/ranmo" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/ranmo</a></p>
<p>掘金： <a href="https://juejin.im/user/58f87ae844d9040069ca7507" rel="nofollow noreferrer" target="_blank">https://juejin.im/user/58f87ae844d9040069ca7507</a></p>
<p>osChina：<a href="https://my.oschina.net/u/3161824/blog" rel="nofollow noreferrer" target="_blank">https://my.oschina.net/u/3161824/blog</a></p>
<p>转载请注明出处，谢谢。</p>
<p>欢迎关注我的公众号</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011204170" src="https://static.alili.tech/img/remote/1460000011204170" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从Vue.js源码角度再看数据绑定

## 原文链接
[https://segmentfault.com/a/1190000011017708](https://segmentfault.com/a/1190000011017708)


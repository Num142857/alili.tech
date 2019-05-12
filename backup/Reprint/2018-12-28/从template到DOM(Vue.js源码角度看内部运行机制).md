---
title: '从template到DOM(Vue.js源码角度看内部运行机制)' 
date: 2018-12-28 2:30:11
hidden: true
slug: eg6w59utsdo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>这篇文章算是对最近写的一系列Vue.js源码的文章(<a href="https://github.com/answershuto/learnVue" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue</a>)的总结吧，在阅读源码的过程中也确实受益匪浅，希望自己的这些产出也会对同样想要学习Vue.js源码的小伙伴有所帮助。之前这篇文章同样在我司（大搜车）的技术博客中发表过，欢迎大家关注我司的技术博客，给个传送门<a href="https://blog.souche.com/" rel="nofollow noreferrer" target="_blank">https://blog.souche.com/</a>。</p>
<p>因为对Vue.js很感兴趣，而且平时工作的技术栈也是Vue.js，这几个月花了些时间研究学习了一下Vue.js源码，并做了总结与输出。</p>
<p>文章的原地址：<a href="https://github.com/answershuto/learnVue" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue</a>。</p>
<p>在学习过程中，为Vue加上了中文的注释<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/tree/master/vue-src</a>，希望可以对其他想学习Vue源码的小伙伴有所帮助。</p>
<p>可能会有理解存在偏差的地方，欢迎提issue指出，共同学习，共同进步。</p>
<h2 id="articleHeader1">从new一个Vue对象开始</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let vm = new Vue({
    el: '#app',
    /*some options*/
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">/*some options*/</span>
});</code></pre>
<p>很多同学好奇，在new一个Vue对象的时候，内部究竟发生了什么？</p>
<p>究竟Vue.js是如何将data中的数据渲染到真实的宿主环境环境中的？</p>
<p>又是如何通过“响应式”修改数据的？</p>
<p>template是如何被编译成真实环境中可用的HTML的？</p>
<p>Vue指令又是执行的？</p>
<p>带着这些疑问，我们从Vue的构造类开始看起。</p>
<h2 id="articleHeader2">Vue构造类</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  /*初始化*/
  this._init(options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp;
    !(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Vue)) {
    warn(<span class="hljs-string">'Vue is a constructor and should be called with the `new` keyword'</span>)
  }
  <span class="hljs-comment">/*初始化*/</span>
  <span class="hljs-keyword">this</span>._init(options)
}</code></pre>
<p>Vue的构造类只做了一件事情，就是调用_init函数进行</p>
<p>来看一下init的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = `vue-perf-init:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    /*一个防止vm实例自身被观察的标志位*/
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
    /*初始化生命周期*/
    initLifecycle(vm)
    /*初始化事件*/
    initEvents(vm)
    /*初始化render*/
    initRender(vm)
    /*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    /*初始化props、methods、data、computed与watch*/
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    /*调用created钩子函数并且触发created钩子事件*/
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      /*格式化组件名*/
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      /*挂载组件*/
      vm.$mount(vm.$options.el)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options?: Object</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// a uid</span>
    vm._uid = uid++

    <span class="hljs-keyword">let</span> startTag, endTag
    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = <span class="hljs-string">`vue-perf-init:<span class="hljs-subst">${vm._uid}</span>`</span>
      endTag = <span class="hljs-string">`vue-perf-end:<span class="hljs-subst">${vm._uid}</span>`</span>
      mark(startTag)
    }

    <span class="hljs-comment">// a flag to avoid this being observed</span>
    <span class="hljs-comment">/*一个防止vm实例自身被观察的标志位*/</span>
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
    <span class="hljs-comment">/*初始化生命周期*/</span>
    initLifecycle(vm)
    <span class="hljs-comment">/*初始化事件*/</span>
    initEvents(vm)
    <span class="hljs-comment">/*初始化render*/</span>
    initRender(vm)
    <span class="hljs-comment">/*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/</span>
    callHook(vm, <span class="hljs-string">'beforeCreate'</span>)
    initInjections(vm) <span class="hljs-comment">// resolve injections before data/props</span>
    <span class="hljs-comment">/*初始化props、methods、data、computed与watch*/</span>
    initState(vm)
    initProvide(vm) <span class="hljs-comment">// resolve provide after data/props</span>
    <span class="hljs-comment">/*调用created钩子函数并且触发created钩子事件*/</span>
    callHook(vm, <span class="hljs-string">'created'</span>)

    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
      <span class="hljs-comment">/*格式化组件名*/</span>
      vm._name = formatComponentName(vm, <span class="hljs-literal">false</span>)
      mark(endTag)
      measure(<span class="hljs-string">`<span class="hljs-subst">${vm._name}</span> init`</span>, startTag, endTag)
    }

    <span class="hljs-keyword">if</span> (vm.$options.el) {
      <span class="hljs-comment">/*挂载组件*/</span>
      vm.$mount(vm.$options.el)
    }
  }</code></pre>
<p>_init主要做了这两件事：</p>
<p>1.初始化（包括生命周期、事件、render函数、state等）。</p>
<p>2.$mount组件。</p>
<p>在生命钩子beforeCreate与created之间会初始化state，在此过程中，会依次初始化props、methods、data、computed与watch，这也就是Vue.js对options中的数据进行“响应式化”（即双向绑定）的过程。对于Vue.js响应式原理不了解的同学可以先看一下笔者的另一片文章<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown" rel="nofollow noreferrer" target="_blank">《Vue.js响应式原理》</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*初始化props、methods、data、computed与watch*/
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  /*初始化props*/
  if (opts.props) initProps(vm, opts.props)
  /*初始化方法*/
  if (opts.methods) initMethods(vm, opts.methods)
  /*初始化data*/
  if (opts.data) {
    initData(vm)
  } else {
    /*该组件没有data的时候绑定一个空对象*/
    observe(vm._data = {}, true /* asRootData */)
  }
  /*初始化computed*/
  if (opts.computed) initComputed(vm, opts.computed)
  /*初始化watchers*/
  if (opts.watch) initWatch(vm, opts.watch)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*初始化props、methods、data、computed与watch*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> (<span class="hljs-params">vm: Component</span>) </span>{
  vm._watchers = []
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-comment">/*初始化props*/</span>
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)
  <span class="hljs-comment">/*初始化方法*/</span>
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)
  <span class="hljs-comment">/*初始化data*/</span>
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">/*该组件没有data的时候绑定一个空对象*/</span>
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
  }
  <span class="hljs-comment">/*初始化computed*/</span>
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)
  <span class="hljs-comment">/*初始化watchers*/</span>
  <span class="hljs-keyword">if</span> (opts.watch) initWatch(vm, opts.watch)
}
</code></pre>
<h2 id="articleHeader3">双向绑定</h2>
<p>以initData为例，对option的data的数据进行双向绑定Oberver，其他option参数双向绑定的核心原理是一致的。</p>
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
  /*Github:https://github.com/answershuto*/
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
  <span class="hljs-comment">/*Github:https://github.com/answershuto*/</span>
  <span class="hljs-comment">// observe data</span>
  <span class="hljs-comment">/*从这里开始我们要observe了，开始对数据进行绑定，这里有尤大大的注释asRootData，这步作为根数据，下面会进行递归observe进行对深层对象的绑定。*/</span>
  observe(data, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
}</code></pre>
<p>observe会通过defineReactive对data中的对象进行双向绑定，最终通过Object.defineProperty对对象设置setter以及getter的方法。getter的方法主要用来进行依赖收集，对于依赖收集不了解的同学可以参考笔者的另一篇文章<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown" rel="nofollow noreferrer" target="_blank">《依赖收集》</a>。setter方法会在对象被修改的时候触发（不存在添加属性的情况，添加属性请用Vue.set），这时候setter会通知闭包中的Dep，Dep中有一些订阅了这个对象改变的Watcher观察者对象，Dep会通知Watcher对象更新视图。</p>
<p>如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。但这时候出现了一个问题，？如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，更别说pop了，那么我们如何监听数组的这些变化呢？<br>Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个<a href="http://v1-cn.vuejs.org/guide/list.html#" rel="nofollow noreferrer" target="_blank">数组方法</a>。修改数组原型方法的代码可以参考<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js" rel="nofollow noreferrer" target="_blank">observer/array.js</a>以及<a href="https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L45" rel="nofollow noreferrer" target="_blank">observer/index.js</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    //.......

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
}

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
 /*直接覆盖原型的方法来修改目标对象或数组*/
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
/*定义（覆盖）目标对象或数组的某一个方法*/
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  value: any;
  dep: Dep;
  vmCount: number; <span class="hljs-comment">// number of vms that has this object as root $data</span>

  <span class="hljs-keyword">constructor</span> (value: any) {
    <span class="hljs-comment">//.......</span>

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
}

<span class="hljs-comment">/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */</span>
 <span class="hljs-comment">/*直接覆盖原型的方法来修改目标对象或数组*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">protoAugment</span> (<span class="hljs-params">target, src: Object</span>) </span>{
  <span class="hljs-comment">/* eslint-disable no-proto */</span>
  target.__proto__ = src
  <span class="hljs-comment">/* eslint-enable no-proto */</span>
}

<span class="hljs-comment">/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */</span>
<span class="hljs-comment">/* istanbul ignore next */</span>
<span class="hljs-comment">/*定义（覆盖）目标对象或数组的某一个方法*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyAugment</span> (<span class="hljs-params">target: Object, src: Object, keys: Array&lt;string&gt;</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
    <span class="hljs-keyword">const</span> key = keys[i]
    def(target, key, src[key])
  }
}</code></pre>
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
<p>从数组的原型新建一个Object.create(arrayProto)对象，通过修改此原型可以保证原生数组方法不被污染。如果当前浏览器支持__proto__这个属性的话就可以直接覆盖该属性则使数组对象具有了重写后的数组方法。如果没有该属性的浏览器，则必须通过遍历def所有需要重写的数组方法，这种方法效率较低，所以优先使用第一种。</p>
<p>在保证不污染不覆盖数组原生方法添加监听，主要做了两个操作，第一是通知所有注册的观察者进行响应式处理，第二是如果是添加成员的操作，需要对新成员进行observe。</p>
<p>但是修改了数组的原生方法以后我们还是没法像原生数组一样直接通过数组的下标或者设置length来修改数组，Vue.js提供了<a href="http://v1-cn.vuejs.org/guide/list.html#" rel="nofollow noreferrer" target="_blank">$set()及$remove()方法</a>。</p>
<p>对于更具体的讲解数据双向绑定以及Dep、Watcher的实现可以参考笔者的文章<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown" rel="nofollow noreferrer" target="_blank">《从源码角度再看数据绑定》</a>。</p>
<h2 id="articleHeader4">template编译</h2>
<p>在$mount过程中，如果是独立构建构建，则会在此过程中将template编译成render function。当然，你也可以采用运行时构建。具体参考<a href="https://cn.vuejs.org/v2/guide/installation.html#" rel="nofollow noreferrer" target="_blank">运行时-编译器-vs-只包含运行时</a>。</p>
<p>template是如何被编译成render function的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  /*parse解析得到ast树*/
  const ast = parse(template.trim(), options)
  /*
    将AST树进行优化
    优化的目标：生成模板AST树，检测不需要进行DOM改变的静态子树。
    一旦检测到这些静态树，我们就能做以下这些事情：
    1.把它们变成常数，这样我们就再也不需要每次重新渲染时创建新的节点了。
    2.在patch的过程中直接跳过。
 */
  optimize(ast, options)
  /*根据ast树生成所需的code（内部包含render与staticRenderFns）*/
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baseCompile</span> (<span class="hljs-params">
  template: string,
  options: CompilerOptions
</span>): <span class="hljs-title">CompiledResult</span> </span>{
  <span class="hljs-comment">/*parse解析得到ast树*/</span>
  <span class="hljs-keyword">const</span> ast = parse(template.trim(), options)
  <span class="hljs-comment">/*
    将AST树进行优化
    优化的目标：生成模板AST树，检测不需要进行DOM改变的静态子树。
    一旦检测到这些静态树，我们就能做以下这些事情：
    1.把它们变成常数，这样我们就再也不需要每次重新渲染时创建新的节点了。
    2.在patch的过程中直接跳过。
 */</span>
  optimize(ast, options)
  <span class="hljs-comment">/*根据ast树生成所需的code（内部包含render与staticRenderFns）*/</span>
  <span class="hljs-keyword">const</span> code = generate(ast, options)
  <span class="hljs-keyword">return</span> {
    ast,
    <span class="hljs-attr">render</span>: code.render,
    <span class="hljs-attr">staticRenderFns</span>: code.staticRenderFns
  }
}</code></pre>
<p>baseCompile首先会将模板template进行parse得到一个AST语法树，再通过optimize做一些优化，最后通过generate得到render以及staticRenderFns。</p>
<h3 id="articleHeader5">parse</h3>
<p>parse的源码可以参见<a href="https://github.com/answershuto/learnVue/blob/master/vue-src/compiler/parser/index.js#L53" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/blob/master/vue-src/compiler/parser/index.js#L53</a>。</p>
<p>parse会用正则等方式解析template模板中的指令、class、style等数据，形成AST语法树。</p>
<h3 id="articleHeader6">optimize</h3>
<p>optimize的主要作用是标记static静态节点，这是Vue在编译过程中的一处优化，后面当update更新界面时，会有一个patch的过程，diff算法会直接跳过静态节点，从而减少了比较的过程，优化了patch的性能。</p>
<h3 id="articleHeader7">generate</h3>
<p>generate是将AST语法树转化成render funtion字符串的过程，得到结果是render的字符串以及staticRenderFns字符串。</p>
<p>具体的template编译实现请参考<a href="https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8AVue%E7%9A%84template%E7%BC%96%E8%AF%91.MarkDown" rel="nofollow noreferrer" target="_blank">《聊聊Vue.js的template编译》</a>。</p>
<h2 id="articleHeader8">Watcher到视图</h2>
<p>Watcher对象会通过调用updateComponent方法来达到更新视图的目的。这里提一下，其实Watcher并不是实时更新视图的，Vue.js默认会将Watcher对象存在一个队列中，在下一个tick时更新异步更新视图，完成了性能优化。关于nextTick感兴趣的小伙伴可以参考<a href="https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown" rel="nofollow noreferrer" target="_blank">《Vue.js异步更新DOM策略及nextTick》</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateComponent = () => {
    vm._update(vm._render(), hydrating)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">updateComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    vm._update(vm._render(), hydrating)
}</code></pre>
<p>updateComponent就执行一句话，_render函数会返回一个新的Vnode节点，传入_update中与旧的VNode对象进行对比，经过一个patch的过程得到两个VNode节点的差异，最后将这些差异渲染到真实环境形成视图。</p>
<p>什么是VNode？</p>
<h2 id="articleHeader9">VNode</h2>
<p>在刀耕火种的年代，我们需要在各个事件方法中直接操作DOM来达到修改视图的目的。但是当应用一大就会变得难以维护。</p>
<p>那我们是不是可以把真实DOM树抽象成一棵以JavaScript对象构成的抽象树，在修改抽象树数据后将抽象树转化成真实DOM重绘到页面上呢？于是虚拟DOM出现了，它是真实DOM的一层抽象，用属性描述真实DOM的各个特性。当它发生变化的时候，就会去修改视图。</p>
<p>但是这样的JavaScript操作DOM进行重绘整个视图层是相当消耗性能的，我们是不是可以每次只更新它的修改呢？所以Vue.js将DOM抽象成一个以JavaScript对象为节点的虚拟DOM树，以VNode节点模拟真实DOM，可以对这颗抽象树进行创建节点、删除节点以及修改节点等操作，在这过程中都不需要操作真实DOM，只需要操作JavaScript对象，大大提升了性能。修改以后经过diff算法得出一些需要修改的最小单位，再将这些小单位的视图进行更新。这样做减少了很多不需要的DOM操作，大大提高了性能。</p>
<p>Vue就使用了这样的抽象节点VNode，它是对真实DOM的一层抽象，而不依赖某个平台，它可以是浏览器平台，也可以是weex，甚至是node平台也可以对这样一棵抽象DOM树进行创建删除修改等操作，这也为前后端同构提供了可能。</p>
<p>先来看一下Vue.js源码中对VNode类的定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  functionalContext: Component | void; // only for functional component root nodes
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions
  ) {
    /*当前节点的标签名*/
    this.tag = tag
    /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.data = data
    /*当前节点的子节点，是一个数组*/
    this.children = children
    /*当前节点的文本*/
    this.text = text
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm
    /*当前节点的名字空间*/
    this.ns = undefined
    /*编译作用域*/
    this.context = context
    /*函数化组件作用域*/
    this.functionalContext = undefined
    /*节点的key属性，被当作节点的标志，用以优化*/
    this.key = data &amp;&amp; data.key
    /*组件的option选项*/
    this.componentOptions = componentOptions
    /*当前节点对应的组件的实例*/
    this.componentInstance = undefined
    /*当前节点的父节点*/
    this.parent = undefined
    /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.raw = false
    /*静态节点标志*/
    this.isStatic = false
    /*是否作为跟节点插入*/
    this.isRootInsert = true
    /*是否为注释节点*/
    this.isComment = false
    /*是否为克隆节点*/
    this.isCloned = false
    /*是否有v-once指令*/
    this.isOnce = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VNode</span> </span>{
  tag: string | <span class="hljs-keyword">void</span>;
  data: VNodeData | <span class="hljs-keyword">void</span>;
  children: ?<span class="hljs-built_in">Array</span>&lt;VNode&gt;;
  text: string | <span class="hljs-keyword">void</span>;
  elm: Node | <span class="hljs-keyword">void</span>;
  ns: string | <span class="hljs-keyword">void</span>;
  context: Component | <span class="hljs-keyword">void</span>; <span class="hljs-comment">// rendered in this component's scope</span>
  functionalContext: Component | <span class="hljs-keyword">void</span>; <span class="hljs-comment">// only for functional component root nodes</span>
  key: string | number | <span class="hljs-keyword">void</span>;
  componentOptions: VNodeComponentOptions | <span class="hljs-keyword">void</span>;
  componentInstance: Component | <span class="hljs-keyword">void</span>; <span class="hljs-comment">// component instance</span>
  parent: VNode | <span class="hljs-keyword">void</span>; <span class="hljs-comment">// component placeholder node</span>
  raw: boolean; <span class="hljs-comment">// contains raw HTML? (server only)</span>
  isStatic: boolean; <span class="hljs-comment">// hoisted static node</span>
  isRootInsert: boolean; <span class="hljs-comment">// necessary for enter transition check</span>
  isComment: boolean; <span class="hljs-comment">// empty comment placeholder?</span>
  isCloned: boolean; <span class="hljs-comment">// is a cloned node?</span>
  isOnce: boolean; <span class="hljs-comment">// is a v-once node?</span>

  <span class="hljs-keyword">constructor</span> (
    tag?: string,
    data?: VNodeData,
    children?: ?Array&lt;VNode&gt;,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions
  ) {
    <span class="hljs-comment">/*当前节点的标签名*/</span>
    <span class="hljs-keyword">this</span>.tag = tag
    <span class="hljs-comment">/*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/</span>
    <span class="hljs-keyword">this</span>.data = data
    <span class="hljs-comment">/*当前节点的子节点，是一个数组*/</span>
    <span class="hljs-keyword">this</span>.children = children
    <span class="hljs-comment">/*当前节点的文本*/</span>
    <span class="hljs-keyword">this</span>.text = text
    <span class="hljs-comment">/*当前虚拟节点对应的真实dom节点*/</span>
    <span class="hljs-keyword">this</span>.elm = elm
    <span class="hljs-comment">/*当前节点的名字空间*/</span>
    <span class="hljs-keyword">this</span>.ns = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">/*编译作用域*/</span>
    <span class="hljs-keyword">this</span>.context = context
    <span class="hljs-comment">/*函数化组件作用域*/</span>
    <span class="hljs-keyword">this</span>.functionalContext = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">/*节点的key属性，被当作节点的标志，用以优化*/</span>
    <span class="hljs-keyword">this</span>.key = data &amp;&amp; data.key
    <span class="hljs-comment">/*组件的option选项*/</span>
    <span class="hljs-keyword">this</span>.componentOptions = componentOptions
    <span class="hljs-comment">/*当前节点对应的组件的实例*/</span>
    <span class="hljs-keyword">this</span>.componentInstance = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">/*当前节点的父节点*/</span>
    <span class="hljs-keyword">this</span>.parent = <span class="hljs-literal">undefined</span>
    <span class="hljs-comment">/*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/</span>
    <span class="hljs-keyword">this</span>.raw = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*静态节点标志*/</span>
    <span class="hljs-keyword">this</span>.isStatic = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*是否作为跟节点插入*/</span>
    <span class="hljs-keyword">this</span>.isRootInsert = <span class="hljs-literal">true</span>
    <span class="hljs-comment">/*是否为注释节点*/</span>
    <span class="hljs-keyword">this</span>.isComment = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*是否为克隆节点*/</span>
    <span class="hljs-keyword">this</span>.isCloned = <span class="hljs-literal">false</span>
    <span class="hljs-comment">/*是否有v-once指令*/</span>
    <span class="hljs-keyword">this</span>.isOnce = <span class="hljs-literal">false</span>
  }

  <span class="hljs-comment">// DEPRECATED: alias for componentInstance for backwards compat.</span>
  <span class="hljs-comment">/* istanbul ignore next */</span>
  get child (): Component | <span class="hljs-keyword">void</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.componentInstance
  }
}</code></pre>
<p>这是一个最基础的VNode节点，作为其他派生VNode类的基类，里面定义了下面这些数据。</p>
<p>tag: 当前节点的标签名</p>
<p>data: 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息</p>
<p>children: 当前节点的子节点，是一个数组</p>
<p>text: 当前节点的文本</p>
<p>elm: 当前虚拟节点对应的真实dom节点</p>
<p>ns: 当前节点的名字空间</p>
<p>context: 当前节点的编译作用域</p>
<p>functionalContext: 函数化组件作用域</p>
<p>key: 节点的key属性，被当作节点的标志，用以优化</p>
<p>componentOptions: 组件的option选项</p>
<p>componentInstance: 当前节点对应的组件的实例</p>
<p>parent: 当前节点的父节点</p>
<p>raw: 简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false</p>
<p>isStatic: 是否为静态节点</p>
<p>isRootInsert: 是否作为跟节点插入</p>
<p>isComment: 是否为注释节点</p>
<p>isCloned: 是否为克隆节点</p>
<p>isOnce: 是否有v-once指令</p>
<hr>
<p>打个比方，比如说我现在有这么一个VNode树</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}</code></pre>
<p>渲染之后的结果就是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot;>
    <span class=&quot;demo&quot;>hello,VNode</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo"</span>&gt;</span>hello,VNode<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>更多操作VNode的方法，请参考<a href="https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown" rel="nofollow noreferrer" target="_blank">《VNode节点》</a>。</p>
<h2 id="articleHeader10">patch</h2>
<p>最后_update会将新旧两个VNode进行一次patch的过程，得出两个VNode最小的差异，然后将这些差异渲染到视图上。</p>
<p>首先说一下patch的核心diff算法，diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563756?w=706&amp;h=295" src="https://static.alili.tech/img/remote/1460000011563756?w=706&amp;h=295" alt="img" title="img" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563757?w=628&amp;h=214" src="https://static.alili.tech/img/remote/1460000011563757?w=628&amp;h=214" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>这两张图代表旧的VNode与新VNode进行patch的过程，他们只是在同层级的VNode之间进行比较得到变化（第二张图中相同颜色的方块代表互相进行比较的VNode节点），然后修改变化的视图，所以十分高效。</p>
<p>在patch的过程中，如果两个VNode被认为是同一个VNode（sameVnode），则会进行深度的比较，得出最小差异，否则直接删除旧有DOM节点，创建新的DOM节点。</p>
<p>什么是sameVnode？</p>
<p>我们来看一下sameVnode的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  判断两个VNode节点是否是同一个节点，需要满足以下条件
  key相同
  tag（当前节点的标签名）相同
  isComment（是否为注释节点）相同
  是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
  当标签是<input>的时候，type必须相同
*/
function sameVnode (a, b) {
  return (
    a.key === b.key &amp;&amp;
    a.tag === b.tag &amp;&amp;
    a.isComment === b.isComment &amp;&amp;
    isDef(a.data) === isDef(b.data) &amp;&amp;
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
/*
  判断当标签是<input>的时候，type是否相同
  某些浏览器不支持动态修改<input>类型，所以他们被视为不同类型
*/
function sameInputType (a, b) {
  if (a.tag !== 'input') return true
  let i
  const typeA = isDef(i = a.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  const typeB = isDef(i = b.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  return typeA === typeB
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/*
  判断两个VNode节点是否是同一个节点，需要满足以下条件
  key相同
  tag（当前节点的标签名）相同
  isComment（是否为注释节点）相同
  是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
  当标签是&lt;input&gt;的时候，type必须相同
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameVnode</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> (
    a.key === b.key &amp;&amp;
    a.tag === b.tag &amp;&amp;
    a.isComment === b.isComment &amp;&amp;
    isDef(a.data) === isDef(b.data) &amp;&amp;
    sameInputType(a, b)
  )
}

<span class="hljs-comment">// Some browsers do not support dynamically changing type for &lt;input&gt;</span>
<span class="hljs-comment">// so they need to be treated as different nodes</span>
<span class="hljs-comment">/*
  判断当标签是&lt;input&gt;的时候，type是否相同
  某些浏览器不支持动态修改&lt;input&gt;类型，所以他们被视为不同类型
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameInputType</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">if</span> (a.tag !== <span class="hljs-string">'input'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> i
  <span class="hljs-keyword">const</span> typeA = isDef(i = a.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  <span class="hljs-keyword">const</span> typeB = isDef(i = b.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  <span class="hljs-keyword">return</span> typeA === typeB
}</code></pre>
<p>当两个VNode的tag、key、isComment都相同，并且同时定义或未定义data的时候，且如果标签为input则type必须相同。这时候这两个VNode则算sameVnode，可以直接进行patchVnode操作。</p>
<p>patchVnode的规则是这样的：</p>
<p>1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。</p>
<p>2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。</p>
<p>3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。</p>
<p>4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。</p>
<p>5.当新老节点都无子节点的时候，只是文本的替换。</p>
<h2 id="articleHeader11">updateChildren</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, elmToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    while (oldStartIdx <= oldEndIdx &amp;&amp; newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        /*前四种情况其实是指定key的时候，判定为同一个VNode，则直接patchVnode即可，分别比较oldCh以及newCh的两头节点2*2=4种情况*/
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        /*
          生成一个key与旧VNode的key对应的哈希表（只有第一次进来undefined的时候会生成，也为后面检测重复的key值做铺垫）
          比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}]  beginIdx = 0   endIdx = 2  
          结果生成{key0: 0, key1: 1, key2: 2}
        */
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        /*如果newStartVnode新的VNode节点存在key并且这个key在oldVnode中能找到则返回这个节点的idxInOld（即第几个节点，下标）*/
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
        if (isUndef(idxInOld)) { // New element
          /*newStartVnode没有key或者是该key没有在老节点中找到则创建一个新的节点*/
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } else {
          /*获取同key的老节点*/
          elmToMove = oldCh[idxInOld]
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' &amp;&amp; !elmToMove) {
            /*如果elmToMove不存在说明之前已经有新节点放入过这个key的DOM中，提示可能存在重复的key，确保v-for的时候item有唯一的key值*/
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            )
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            /*Github:https://github.com/answershuto*/
            /*如果新VNode与得到的有相同key的节点是同一个VNode则进行patchVnode*/
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            /*因为已经patchVnode进去了，所以将这个老节点赋值undefined，之后如果还有新节点与该节点key相同可以检测出来提示已有重复的key*/
            oldCh[idxInOld] = undefined
            /*当有标识位canMove实可以直接插入oldStartVnode对应的真实DOM节点前面*/
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } else {
            // same key but different element. treat as new element
            /*当新的VNode与找到的同样key的VNode不是sameVNode的时候（比如说tag不一样或者是有不一样type的input标签），创建一个新的节点*/
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      /*全部比较完成以后，发现oldStartIdx > oldEndIdx的话，说明老节点已经遍历完了，新节点比老节点多，所以这时候多出来的新节点需要一个一个创建出来加入到真实DOM中*/
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      /*如果全部比较完成以后发现newStartIdx > newEndIdx，则说明新节点已经遍历完了，老节点多余新节点，这个时候需要将多余的老节点从真实DOM中移除*/
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span> (<span class="hljs-params">parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly</span>) </span>{
    <span class="hljs-keyword">let</span> oldStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> newStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> oldEndVnode = oldCh[oldEndIdx]
    <span class="hljs-keyword">let</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> newStartVnode = newCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> newEndVnode = newCh[newEndIdx]
    <span class="hljs-keyword">let</span> oldKeyToIdx, idxInOld, elmToMove, refElm

    <span class="hljs-comment">// removeOnly is a special flag used only by &lt;transition-group&gt;</span>
    <span class="hljs-comment">// to ensure removed elements stay in correct relative positions</span>
    <span class="hljs-comment">// during leaving transitions</span>
    <span class="hljs-keyword">const</span> canMove = !removeOnly

    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
      <span class="hljs-keyword">if</span> (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] <span class="hljs-comment">// Vnode has been moved left</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
        <span class="hljs-comment">/*前四种情况其实是指定key的时候，判定为同一个VNode，则直接patchVnode即可，分别比较oldCh以及newCh的两头节点2*2=4种情况*/</span>
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newEndVnode)) { <span class="hljs-comment">// Vnode moved right</span>
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newStartVnode)) { <span class="hljs-comment">// Vnode moved left</span>
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">/*
          生成一个key与旧VNode的key对应的哈希表（只有第一次进来undefined的时候会生成，也为后面检测重复的key值做铺垫）
          比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}]  beginIdx = 0   endIdx = 2  
          结果生成{key0: 0, key1: 1, key2: 2}
        */</span>
        <span class="hljs-keyword">if</span> (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        <span class="hljs-comment">/*如果newStartVnode新的VNode节点存在key并且这个key在oldVnode中能找到则返回这个节点的idxInOld（即第几个节点，下标）*/</span>
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : <span class="hljs-literal">null</span>
        <span class="hljs-keyword">if</span> (isUndef(idxInOld)) { <span class="hljs-comment">// New element</span>
          <span class="hljs-comment">/*newStartVnode没有key或者是该key没有在老节点中找到则创建一个新的节点*/</span>
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">/*获取同key的老节点*/</span>
          elmToMove = oldCh[idxInOld]
          <span class="hljs-comment">/* istanbul ignore if */</span>
          <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !elmToMove) {
            <span class="hljs-comment">/*如果elmToMove不存在说明之前已经有新节点放入过这个key的DOM中，提示可能存在重复的key，确保v-for的时候item有唯一的key值*/</span>
            warn(
              <span class="hljs-string">'It seems there are duplicate keys that is causing an update error. '</span> +
              <span class="hljs-string">'Make sure each v-for item has a unique key.'</span>
            )
          }
          <span class="hljs-keyword">if</span> (sameVnode(elmToMove, newStartVnode)) {
            <span class="hljs-comment">/*Github:https://github.com/answershuto*/</span>
            <span class="hljs-comment">/*如果新VNode与得到的有相同key的节点是同一个VNode则进行patchVnode*/</span>
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            <span class="hljs-comment">/*因为已经patchVnode进去了，所以将这个老节点赋值undefined，之后如果还有新节点与该节点key相同可以检测出来提示已有重复的key*/</span>
            oldCh[idxInOld] = <span class="hljs-literal">undefined</span>
            <span class="hljs-comment">/*当有标识位canMove实可以直接插入oldStartVnode对应的真实DOM节点前面*/</span>
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// same key but different element. treat as new element</span>
            <span class="hljs-comment">/*当新的VNode与找到的同样key的VNode不是sameVNode的时候（比如说tag不一样或者是有不一样type的input标签），创建一个新的节点*/</span>
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {
      <span class="hljs-comment">/*全部比较完成以后，发现oldStartIdx &gt; oldEndIdx的话，说明老节点已经遍历完了，新节点比老节点多，所以这时候多出来的新节点需要一个一个创建出来加入到真实DOM中*/</span>
      refElm = isUndef(newCh[newEndIdx + <span class="hljs-number">1</span>]) ? <span class="hljs-literal">null</span> : newCh[newEndIdx + <span class="hljs-number">1</span>].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) {
      <span class="hljs-comment">/*如果全部比较完成以后发现newStartIdx &gt; newEndIdx，则说明新节点已经遍历完了，老节点多余新节点，这个时候需要将多余的老节点从真实DOM中移除*/</span>
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }</code></pre>
<p>直接看源码可能比较难以捋清其中的关系，我们通过图来看一下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563758?w=885&amp;h=397" src="https://static.alili.tech/img/remote/1460000011563758?w=885&amp;h=397" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>首先，在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx &lt;= oldEndIdx或者newStartIdx &lt;= newEndIdx时结束循环。</p>
<p>索引与VNode节点的对应关系：<br>oldStartIdx =&gt; oldStartVnode<br>oldEndIdx =&gt; oldEndVnode<br>newStartIdx =&gt; newStartVnode<br>newEndIdx =&gt; newEndVnode</p>
<p>在遍历中，如果存在key，并且满足sameVnode，会将该DOM节点进行复用，否则则会创建一个新的DOM节点。</p>
<p>首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两比较一共有2*2=4种比较方法。</p>
<p>当新老VNode节点的start或者end满足sameVnode时，也就是sameVnode(oldStartVnode, newStartVnode)或者sameVnode(oldEndVnode, newEndVnode)，直接将该VNode节点进行patchVnode即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563759?w=618&amp;h=251" src="https://static.alili.tech/img/remote/1460000011563759?w=618&amp;h=251" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>如果oldStartVnode与newEndVnode满足sameVnode，即sameVnode(oldStartVnode, newEndVnode)。</p>
<p>这时候说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563760?w=1540&amp;h=776" src="https://static.alili.tech/img/remote/1460000011563760?w=1540&amp;h=776" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>如果oldEndVnode与newStartVnode满足sameVnode，即sameVnode(oldEndVnode, newStartVnode)。</p>
<p>这说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时真实的DOM节点移动到了oldStartVnode的前面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563761?w=810&amp;h=432" src="https://static.alili.tech/img/remote/1460000011563761?w=810&amp;h=432" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>如果以上情况均不符合，则通过createKeyToOldIdx会得到一个oldKeyToIdx，里面存放了一个key为旧的VNode，value为对应index序列的哈希表。从这个哈希表中可以找到是否有与newStartVnode一致key的旧的VNode节点，如果同时满足sameVnode，patchVnode的同时会将这个真实DOM（elmToMove）移动到oldStartVnode对应的真实DOM的前面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563762?w=750&amp;h=373" src="https://static.alili.tech/img/remote/1460000011563762?w=750&amp;h=373" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>当然也有可能newStartVnode在旧的VNode节点找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563763?w=927&amp;h=462" src="https://static.alili.tech/img/remote/1460000011563763?w=927&amp;h=462" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>到这里循环已经结束了，那么剩下我们还需要处理多余或者不够的真实DOM节点。</p>
<p>1.当结束时oldStartIdx &gt; oldEndIdx，这个时候老的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，也就是比真实DOM多，需要将剩下的（也就是新增的）VNode节点插入到真实DOM节点中去，此时调用addVnodes（批量调用createElm的接口将这些节点加入到真实DOM中去）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563764?w=784&amp;h=373" src="https://static.alili.tech/img/remote/1460000011563764?w=784&amp;h=373" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>2。同理，当newStartIdx &gt; newEndIdx时，新的VNode节点已经遍历完了，但是老的节点还有剩余，说明真实DOM节点多余了，需要从文档中删除，这时候调用removeVnodes将这些多余的真实DOM删除。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563765?w=836&amp;h=367" src="https://static.alili.tech/img/remote/1460000011563765?w=836&amp;h=367" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>更详细的diff实现参考笔者的文章<a href="https://github.com/answershuto/learnVue/blob/master/docs/VirtualDOM%E4%B8%8Ediff(Vue%E5%AE%9E%E7%8E%B0" rel="nofollow noreferrer" target="_blank">VirtualDOM与diff(Vue.js实现)</a>.MarkDown)。</p>
<h2 id="articleHeader12">映射到真实DOM</h2>
<p>由于Vue使用了虚拟DOM，所以虚拟DOM可以在任何支持JavaScript语言的平台上操作，譬如说目前Vue支持的浏览器平台或是weex，在虚拟DOM的实现上是一致的。那么最后虚拟DOM如何映射到真实的DOM节点上呢？</p>
<p>Vue为平台做了一层适配层，浏览器平台见<a href="https://github.com/answershuto/learnVue/blob/master/vue-src/platforms/web/runtime/node-ops.js" rel="nofollow noreferrer" target="_blank">/platforms/web/runtime/node-ops.js</a>以及weex平台见<a href="https://github.com/answershuto/learnVue/blob/master/vue-src/platforms/weex/runtime/node-ops.js" rel="nofollow noreferrer" target="_blank">/platforms/weex/runtime/node-ops.js</a>。不同平台之间通过适配层对外提供相同的接口，虚拟DOM进行操作真实DOM节点的时候，只需要调用这些适配层的接口即可，而内部实现则不需要关心，它会根据平台的改变而改变。</p>
<p>现在又出现了一个问题，我们只是将虚拟DOM映射成了真实的DOM。那如何给这些DOM加入attr、class、style等DOM属性呢？</p>
<p>这要依赖于虚拟DOM的生命钩子。虚拟DOM提供了如下的钩子函数，分别在不同的时期会进行调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

/*构建cbs回调函数，web平台上见/platforms/web/runtime/modules*/
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> hooks = [<span class="hljs-string">'create'</span>, <span class="hljs-string">'activate'</span>, <span class="hljs-string">'update'</span>, <span class="hljs-string">'remove'</span>, <span class="hljs-string">'destroy'</span>]

<span class="hljs-comment">/*构建cbs回调函数，web平台上见/platforms/web/runtime/modules*/</span>
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; hooks.length; ++i) {
    cbs[hooks[i]] = []
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; modules.length; ++j) {
      <span class="hljs-keyword">if</span> (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }</code></pre>
<p>同理，也会根据不同平台有自己不同的实现，我们这里以Web平台为例。Web平台的钩子函数见<a href="https://github.com/answershuto/learnVue/tree/master/vue-src/platforms/web/runtime/modules" rel="nofollow noreferrer" target="_blank">/platforms/web/runtime/modules</a>。里面有对attr、class、props、events、style以及transition（过渡状态）的DOM属性进行操作。</p>
<p>以attr为例，代码很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

import { isIE9 } from 'core/util/env'

import {
  extend,
  isDef,
  isUndef
} from 'shared/util'

import {
  isXlink,
  xlinkNS,
  getXlinkProp,
  isBooleanAttr,
  isEnumeratedAttr,
  isFalsyAttrValue
} from 'web/util/index'

/*更新attr*/
function updateAttrs (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  /*如果旧的以及新的VNode节点均没有attr属性，则直接返回*/
  if (isUndef(oldVnode.data.attrs) &amp;&amp; isUndef(vnode.data.attrs)) {
    return
  }
  let key, cur, old
  /*VNode节点对应的Dom实例*/
  const elm = vnode.elm
  /*旧VNode节点的attr*/
  const oldAttrs = oldVnode.data.attrs || {}
  /*新VNode节点的attr*/
  let attrs: any = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  /*如果新的VNode的attr已经有__ob__（代表已经被Observe处理过了）， 进行深拷贝*/
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  /*遍历attr，不一致则替换*/
  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      setAttr(elm, key, cur)
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 &amp;&amp; attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value)
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key)
      }
    }
  }
}

/*设置attr*/
function setAttr (el: Element, key: string, value: any) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, key)
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true')
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
    } else {
      el.setAttributeNS(xlinkNS, key, value)
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, value)
    }
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> { isIE9 } <span class="hljs-keyword">from</span> <span class="hljs-string">'core/util/env'</span>

<span class="hljs-keyword">import</span> {
  extend,
  isDef,
  isUndef
} <span class="hljs-keyword">from</span> <span class="hljs-string">'shared/util'</span>

<span class="hljs-keyword">import</span> {
  isXlink,
  xlinkNS,
  getXlinkProp,
  isBooleanAttr,
  isEnumeratedAttr,
  isFalsyAttrValue
} <span class="hljs-keyword">from</span> <span class="hljs-string">'web/util/index'</span>

<span class="hljs-comment">/*更新attr*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateAttrs</span> (<span class="hljs-params">oldVnode: VNodeWithData, vnode: VNodeWithData</span>) </span>{
  <span class="hljs-comment">/*如果旧的以及新的VNode节点均没有attr属性，则直接返回*/</span>
  <span class="hljs-keyword">if</span> (isUndef(oldVnode.data.attrs) &amp;&amp; isUndef(vnode.data.attrs)) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">let</span> key, cur, old
  <span class="hljs-comment">/*VNode节点对应的Dom实例*/</span>
  <span class="hljs-keyword">const</span> elm = vnode.elm
  <span class="hljs-comment">/*旧VNode节点的attr*/</span>
  <span class="hljs-keyword">const</span> oldAttrs = oldVnode.data.attrs || {}
  <span class="hljs-comment">/*新VNode节点的attr*/</span>
  <span class="hljs-keyword">let</span> attrs: any = vnode.data.attrs || {}
  <span class="hljs-comment">// clone observed objects, as the user probably wants to mutate it</span>
  <span class="hljs-comment">/*如果新的VNode的attr已经有__ob__（代表已经被Observe处理过了）， 进行深拷贝*/</span>
  <span class="hljs-keyword">if</span> (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  <span class="hljs-comment">/*遍历attr，不一致则替换*/</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    <span class="hljs-keyword">if</span> (old !== cur) {
      setAttr(elm, key, cur)
    }
  }
  <span class="hljs-comment">// #4391: in IE9, setting type can reset value for input[type=radio]</span>
  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-keyword">if</span> (isIE9 &amp;&amp; attrs.value !== oldAttrs.value) {
    setAttr(elm, <span class="hljs-string">'value'</span>, attrs.value)
  }
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> oldAttrs) {
    <span class="hljs-keyword">if</span> (isUndef(attrs[key])) {
      <span class="hljs-keyword">if</span> (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key)
      }
    }
  }
}

<span class="hljs-comment">/*设置attr*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAttr</span> (<span class="hljs-params">el: Element, key: string, value: any</span>) </span>{
  <span class="hljs-keyword">if</span> (isBooleanAttr(key)) {
    <span class="hljs-comment">// set attribute for blank value</span>
    <span class="hljs-comment">// e.g. &lt;option disabled&gt;Select one&lt;/option&gt;</span>
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } <span class="hljs-keyword">else</span> {
      el.setAttribute(key, key)
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === <span class="hljs-string">'false'</span> ? <span class="hljs-string">'false'</span> : <span class="hljs-string">'true'</span>)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isXlink(key)) {
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
    } <span class="hljs-keyword">else</span> {
      el.setAttributeNS(xlinkNS, key, value)
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } <span class="hljs-keyword">else</span> {
      el.setAttribute(key, value)
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">create</span>: updateAttrs,
  <span class="hljs-attr">update</span>: updateAttrs
}
</code></pre>
<p>attr只需要在create以及update钩子被调用时更新DOM的attr属性即可。</p>
<h2 id="articleHeader13">最后</h2>
<p>至此，我们已经从template到真实DOM的整个过程梳理完了。现在再去看这张图，是不是更清晰了呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011563766?w=1200&amp;h=750" src="https://static.alili.tech/img/remote/1460000011563766?w=1200&amp;h=750" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">关于</h2>
<p>作者：染陌 </p>
<p>Email：answershuto@gmail.com  or  answershuto@126.com</p>
<p>Github:  <a href="https://github.com/answershuto" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto</a></p>
<p>Blog：<a href="http://answershuto.github.io/" rel="nofollow noreferrer" target="_blank">http://answershuto.github.io/</a></p>
<p>知乎主页：<a href="https://www.zhihu.com/people/cao-yang-49/activities" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/people/cao-yang-49/activities</a></p>
<p>知乎专栏：<a href="https://zhuanlan.zhihu.com/ranmo" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/ranmo</a></p>
<p>掘金： <a href="https://juejin.im/user/58f87ae844d9040069ca7507" rel="nofollow noreferrer" target="_blank">https://juejin.im/user/58f87ae844d9040069ca7507</a></p>
<p>osChina：<a href="https://my.oschina.net/u/3161824/blog" rel="nofollow noreferrer" target="_blank">https://my.oschina.net/u/3161824/blog</a></p>
<p>转载请注明出处，谢谢。</p>
<p>欢迎关注我的公众号</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011335965" src="https://static.alili.tech/img/remote/1460000011335965" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从template到DOM(Vue.js源码角度看内部运行机制)

## 原文链接
[https://segmentfault.com/a/1190000011563751](https://segmentfault.com/a/1190000011563751)


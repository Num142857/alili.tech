---
title: 'Vue的数据依赖实现原理简析' 
date: 2019-01-10 2:30:08
hidden: true
slug: jokghb33ky
categories: [reprint]
---

{{< raw >}}

                    
<p>首先让我们从最简单的一个实例<code>Vue</code>入手:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const app = new Vue({
        // options  传入一个选项obj.这个obj即对于这个vue实例的初始化
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-comment">// options  传入一个选项obj.这个obj即对于这个vue实例的初始化</span>
    })</code></pre>
<p>通过查阅文档，我们可以知道这个<code>options</code>可以接受:</p>
<ul>
<li>
<p>选项/数据</p>
<ul>
<li><p>data</p></li>
<li><p>props</p></li>
<li><p>propsData(方便测试使用)</p></li>
<li><p>computed</p></li>
<li><p>methods</p></li>
<li><p>watch</p></li>
</ul>
</li>
<li><p>选项 / DOM</p></li>
<li><p>选项 / 生命周期钩子</p></li>
<li><p>选项 / 资源</p></li>
<li><p>选项 / 杂项</p></li>
</ul>
<p>具体未展开的内容请自行查阅相关文档，接下来让我们来看看传入的<code>选项/数据</code>是如何管理数据之间的相互依赖的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const app = new Vue({
        el: '#app',
        props: {
          a: {
            type: Object,
            default () {
              return {
                key1: 'a',
                key2: {
                    a: 'b'
                }
              }
            }
          }
        },
        data: {
          msg1: 'Hello world!',
          arr: {
            arr1: 1
          }
        },
        watch: {
          a (newVal, oldVal) {
            console.log(newVal, oldVal)
          }
        },
        methods: {
          go () {
            console.log('This is simple demo')
          }
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">props</span>: {
          <span class="hljs-attr">a</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
            <span class="hljs-keyword">default</span> () {
              <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">key1</span>: <span class="hljs-string">'a'</span>,
                <span class="hljs-attr">key2</span>: {
                    <span class="hljs-attr">a</span>: <span class="hljs-string">'b'</span>
                }
              }
            }
          }
        },
        <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">msg1</span>: <span class="hljs-string">'Hello world!'</span>,
          <span class="hljs-attr">arr</span>: {
            <span class="hljs-attr">arr1</span>: <span class="hljs-number">1</span>
          }
        },
        <span class="hljs-attr">watch</span>: {
          a (newVal, oldVal) {
            <span class="hljs-built_in">console</span>.log(newVal, oldVal)
          }
        },
        <span class="hljs-attr">methods</span>: {
          go () {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This is simple demo'</span>)
          }
        }
    })</code></pre>
<p>我们使用<code>Vue</code>这个构造函数去实例化了一个<code>vue</code>实例<code>app</code>。传入了<code>props</code>, <code>data</code>, <code>watch</code>, <code>methods</code>等属性。在实例化的过程中，<code>Vue</code>提供的构造函数就使用我们传入的<code>options</code>去完成数据的依赖管理，初始化的过程只有一次，但是在你自己的程序当中，数据的依赖管理的次数不止一次。</p>
<p>那<code>Vue</code>的构造函数到底是怎么实现的呢？<a href="https://github.com/vuejs/vue/blob/v2.1.10/src/core/instance/index.js" rel="nofollow noreferrer" target="_blank">Vue</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 对Vue这个class进行mixin,即在原型上添加方法
// Vue.prototype.* = function () {}
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp;
    !(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Vue)) {
    warn(<span class="hljs-string">'Vue is a constructor and should be called with the `new` keyword'</span>)
  }
  <span class="hljs-keyword">this</span>._init(options)
}

<span class="hljs-comment">// 对Vue这个class进行mixin,即在原型上添加方法</span>
<span class="hljs-comment">// Vue.prototype.* = function () {}</span>
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)</code></pre>
<p>当我们调用<code>new Vue</code>的时候，事实上就调用的<code>Vue</code>原型上的<code>_init</code>方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原型上提供_init方法,新建一个vue实例并传入options参数
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options &amp;&amp; options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // 将传入的这些options选项挂载到vm.$options属性上
      vm.$options = mergeOptions(
        // components/filter/directive
        resolveConstructorOptions(vm.constructor),
        // this._init()传入的options
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
    vm._self = vm     // 自身的实例
    // 接下来所有的操作都是在这个实例上添加方法
    initLifecycle(vm)  // lifecycle初始化
    initEvents(vm)     // events初始化 vm._events, 主要是提供vm实例上的$on/$emit/$off/$off等方法
    initRender(vm)     // 初始化渲染函数,在vm上绑定$createElement方法
    callHook(vm, 'beforeCreate')  // 钩子函数的执行, beforeCreate
    initInjections(vm) // resolve injections before data/props
    initState(vm)      // Observe data添加对data的监听, 将data转化为getters/setters
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created') // 钩子函数的执行, created

    // vm挂载的根元素
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 原型上提供_init方法,新建一个vue实例并传入options参数</span>
  Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options?: Object</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// a uid</span>
    vm._uid = uid++

    <span class="hljs-keyword">let</span> startTag, endTag
    <span class="hljs-comment">// a flag to avoid this being observed</span>
    vm._isVue = <span class="hljs-literal">true</span>
    <span class="hljs-comment">// merge options</span>
    <span class="hljs-keyword">if</span> (options &amp;&amp; options._isComponent) {
      <span class="hljs-comment">// optimize internal component instantiation</span>
      <span class="hljs-comment">// since dynamic options merging is pretty slow, and none of the</span>
      <span class="hljs-comment">// internal component options needs special treatment.</span>
      initInternalComponent(vm, options)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 将传入的这些options选项挂载到vm.$options属性上</span>
      vm.$options = mergeOptions(
        <span class="hljs-comment">// components/filter/directive</span>
        resolveConstructorOptions(vm.constructor),
        <span class="hljs-comment">// this._init()传入的options</span>
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
    vm._self = vm     <span class="hljs-comment">// 自身的实例</span>
    <span class="hljs-comment">// 接下来所有的操作都是在这个实例上添加方法</span>
    initLifecycle(vm)  <span class="hljs-comment">// lifecycle初始化</span>
    initEvents(vm)     <span class="hljs-comment">// events初始化 vm._events, 主要是提供vm实例上的$on/$emit/$off/$off等方法</span>
    initRender(vm)     <span class="hljs-comment">// 初始化渲染函数,在vm上绑定$createElement方法</span>
    callHook(vm, <span class="hljs-string">'beforeCreate'</span>)  <span class="hljs-comment">// 钩子函数的执行, beforeCreate</span>
    initInjections(vm) <span class="hljs-comment">// resolve injections before data/props</span>
    initState(vm)      <span class="hljs-comment">// Observe data添加对data的监听, 将data转化为getters/setters</span>
    initProvide(vm) <span class="hljs-comment">// resolve provide after data/props</span>
    callHook(vm, <span class="hljs-string">'created'</span>) <span class="hljs-comment">// 钩子函数的执行, created</span>

    <span class="hljs-comment">// vm挂载的根元素</span>
    <span class="hljs-keyword">if</span> (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }</code></pre>
<p>其中在<code>this._init()</code>方法中调用<code>initState(vm)</code>,完成对<code>vm</code>这个实例的数据的监听,也是本文所要展开说的具体内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function initState (vm: Component) {
  // 首先在vm上初始化一个_watchers数组，缓存这个vm上的所有watcher
  vm._watchers = []
  // 获取options,包括在new Vue传入的，同时还包括了Vue所继承的options
  const opts = vm.$options
  // 初始化props属性
  if (opts.props) initProps(vm, opts.props)
  // 初始化methods属性
  if (opts.methods) initMethods(vm, opts.methods)
  // 初始化data属性
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // 初始化computed属性
  if (opts.computed) initComputed(vm, opts.computed)
  // 初始化watch属性
  if (opts.watch) initWatch(vm, opts.watch)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> (<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-comment">// 首先在vm上初始化一个_watchers数组，缓存这个vm上的所有watcher</span>
  vm._watchers = []
  <span class="hljs-comment">// 获取options,包括在new Vue传入的，同时还包括了Vue所继承的options</span>
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-comment">// 初始化props属性</span>
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)
  <span class="hljs-comment">// 初始化methods属性</span>
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)
  <span class="hljs-comment">// 初始化data属性</span>
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm)
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
  }
  <span class="hljs-comment">// 初始化computed属性</span>
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)
  <span class="hljs-comment">// 初始化watch属性</span>
  <span class="hljs-keyword">if</span> (opts.watch) initWatch(vm, opts.watch)
}</code></pre>
<h2 id="articleHeader0">initProps</h2>
<p>我们在实例化<code>app</code>的时候，在构造函数里面传入的<code>options</code>中有<code>props</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    props: {
      a: {
        type: Object,
        default () {
          return {
            key1: 'a',
            key2: {
                a: 'b'
            }
          }
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    props: {
      <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-keyword">default</span> () {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">key1</span>: <span class="hljs-string">'a'</span>,
            <span class="hljs-attr">key2</span>: {
                <span class="hljs-attr">a</span>: <span class="hljs-string">'b'</span>
            }
          }
        }
      }
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initProps (vm: Component, propsOptions: Object) {
  // propsData主要是为了方便测试使用
  const propsData = vm.$options.propsData || {}
  // 新建vm._props对象，可以通过app实例去访问
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  // 缓存的prop key
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  observerState.shouldConvert = isRoot
  for (const key in propsOptions) {
    // this._init传入的options中的props属性
    keys.push(key)
    // 注意这个validateProp方法，不仅完成了prop属性类型验证的，同时将prop的值都转化为了getter/setter,并返回一个observer
    const value = validateProp(key, propsOptions, propsData, vm)
   
    // 将这个key对应的值转化为getter/setter
      defineReactive(props, key, value)
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    // 如果在vm这个实例上没有key属性，那么就通过proxy转化为proxyGetter/proxySetter, 并挂载到vm实例上，可以通过app._props[key]这种形式去访问
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  observerState.shouldConvert = true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initProps</span> (<span class="hljs-params">vm: Component, propsOptions: Object</span>) </span>{
  <span class="hljs-comment">// propsData主要是为了方便测试使用</span>
  <span class="hljs-keyword">const</span> propsData = vm.$options.propsData || {}
  <span class="hljs-comment">// 新建vm._props对象，可以通过app实例去访问</span>
  <span class="hljs-keyword">const</span> props = vm._props = {}
  <span class="hljs-comment">// cache prop keys so that future props updates can iterate using Array</span>
  <span class="hljs-comment">// instead of dynamic object key enumeration.</span>
  <span class="hljs-comment">// 缓存的prop key</span>
  <span class="hljs-keyword">const</span> keys = vm.$options._propKeys = []
  <span class="hljs-keyword">const</span> isRoot = !vm.$parent
  <span class="hljs-comment">// root instance props should be converted</span>
  observerState.shouldConvert = isRoot
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> propsOptions) {
    <span class="hljs-comment">// this._init传入的options中的props属性</span>
    keys.push(key)
    <span class="hljs-comment">// 注意这个validateProp方法，不仅完成了prop属性类型验证的，同时将prop的值都转化为了getter/setter,并返回一个observer</span>
    <span class="hljs-keyword">const</span> value = validateProp(key, propsOptions, propsData, vm)
   
    <span class="hljs-comment">// 将这个key对应的值转化为getter/setter</span>
      defineReactive(props, key, value)
    <span class="hljs-comment">// static props are already proxied on the component's prototype</span>
    <span class="hljs-comment">// during Vue.extend(). We only need to proxy props defined at</span>
    <span class="hljs-comment">// instantiation here.</span>
    <span class="hljs-comment">// 如果在vm这个实例上没有key属性，那么就通过proxy转化为proxyGetter/proxySetter, 并挂载到vm实例上，可以通过app._props[key]这种形式去访问</span>
    <span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> vm)) {
      proxy(vm, <span class="hljs-string">`_props`</span>, key)
    }
  }
  observerState.shouldConvert = <span class="hljs-literal">true</span>
}</code></pre>
<p>接下来看下<code>validateProp(key, propsOptions, propsData, vm)</code>方法内部到底发生了什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function validateProp (
  key: string,
  propOptions: Object,    // $options.props属性
  propsData: Object,      // $options.propsData属性
  vm?: Component
): any {
  const prop = propOptions[key]
  // 如果在propsData测试props上没有缓存的key
  const absent = !hasOwn(propsData, key)
  let value = propsData[key]
  // 处理boolean类型的数据
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent &amp;&amp; !hasOwn(prop, 'default')) {
      value = false
    } else if (!isType(String, prop.type) &amp;&amp; (value === '' || value === hyphenate(key))) {
      value = true
    }
  }
  // check default value
  if (value === undefined) {
    // default属性值，是基本类型还是function
    // getPropsDefaultValue见下面第一段代码
    value = getPropDefaultValue(vm, prop, key)
    // since the default value is a fresh copy,
    // make sure to observe it.
    const prevShouldConvert = observerState.shouldConvert
    observerState.shouldConvert = true
    // 将value的所有属性转化为getter/setter形式
    // 并添加value的依赖
    // observe方法的分析见下面第二段代码
    observe(value)
    observerState.shouldConvert = prevShouldConvert
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent)
  }
  return value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validateProp</span> (<span class="hljs-params">
  key: string,
  propOptions: Object,    <span class="hljs-regexp">//</span> $options.props属性
  propsData: Object,      <span class="hljs-regexp">//</span> $options.propsData属性
  vm?: Component
</span>): <span class="hljs-title">any</span> </span>{
  <span class="hljs-keyword">const</span> prop = propOptions[key]
  <span class="hljs-comment">// 如果在propsData测试props上没有缓存的key</span>
  <span class="hljs-keyword">const</span> absent = !hasOwn(propsData, key)
  <span class="hljs-keyword">let</span> value = propsData[key]
  <span class="hljs-comment">// 处理boolean类型的数据</span>
  <span class="hljs-comment">// handle boolean props</span>
  <span class="hljs-keyword">if</span> (isType(<span class="hljs-built_in">Boolean</span>, prop.type)) {
    <span class="hljs-keyword">if</span> (absent &amp;&amp; !hasOwn(prop, <span class="hljs-string">'default'</span>)) {
      value = <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isType(<span class="hljs-built_in">String</span>, prop.type) &amp;&amp; (value === <span class="hljs-string">''</span> || value === hyphenate(key))) {
      value = <span class="hljs-literal">true</span>
    }
  }
  <span class="hljs-comment">// check default value</span>
  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-comment">// default属性值，是基本类型还是function</span>
    <span class="hljs-comment">// getPropsDefaultValue见下面第一段代码</span>
    value = getPropDefaultValue(vm, prop, key)
    <span class="hljs-comment">// since the default value is a fresh copy,</span>
    <span class="hljs-comment">// make sure to observe it.</span>
    <span class="hljs-keyword">const</span> prevShouldConvert = observerState.shouldConvert
    observerState.shouldConvert = <span class="hljs-literal">true</span>
    <span class="hljs-comment">// 将value的所有属性转化为getter/setter形式</span>
    <span class="hljs-comment">// 并添加value的依赖</span>
    <span class="hljs-comment">// observe方法的分析见下面第二段代码</span>
    observe(value)
    observerState.shouldConvert = prevShouldConvert
  }
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
    assertProp(prop, key, value, vm, absent)
  }
  <span class="hljs-keyword">return</span> value
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取prop的默认值
function getPropDefaultValue (vm: ?Component, prop: PropOptions, key: string): any {
  // no default, return undefined
  // 如果没有default属性的话，那么就返回undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  const def = prop.default
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm &amp;&amp; vm.$options.propsData &amp;&amp;
    vm.$options.propsData[key] === undefined &amp;&amp;
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  // 如果是function 则调用def.call(vm)
  // 否则就返回default属性对应的值
  return typeof def === 'function' &amp;&amp; getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取prop的默认值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPropDefaultValue</span> (<span class="hljs-params">vm: ?Component, prop: PropOptions, key: string</span>): <span class="hljs-title">any</span> </span>{
  <span class="hljs-comment">// no default, return undefined</span>
  <span class="hljs-comment">// 如果没有default属性的话，那么就返回undefined</span>
  <span class="hljs-keyword">if</span> (!hasOwn(prop, <span class="hljs-string">'default'</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>
  }
  <span class="hljs-keyword">const</span> def = prop.default
  <span class="hljs-comment">// the raw prop value was also undefined from previous render,</span>
  <span class="hljs-comment">// return previous default value to avoid unnecessary watcher trigger</span>
  <span class="hljs-keyword">if</span> (vm &amp;&amp; vm.$options.propsData &amp;&amp;
    vm.$options.propsData[key] === <span class="hljs-literal">undefined</span> &amp;&amp;
    vm._props[key] !== <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">return</span> vm._props[key]
  }
  <span class="hljs-comment">// call factory function for non-Function types</span>
  <span class="hljs-comment">// a value is Function if its prototype is function even across different execution context</span>
  <span class="hljs-comment">// 如果是function 则调用def.call(vm)</span>
  <span class="hljs-comment">// 否则就返回default属性对应的值</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> def === <span class="hljs-string">'function'</span> &amp;&amp; getType(prop.type) !== <span class="hljs-string">'Function'</span>
    ? def.call(vm)
    : def
}</code></pre>
<p><code>Vue</code>提供了一个<code>observe</code>方法,在其内部实例化了一个<code>Observer</code>类，并返回<code>Observer</code>的实例。每一个<code>Observer</code>实例对应记录了<code>props</code>中这个的<code>default value</code>的所有依赖(仅限<code>object</code>类型)，这个<code>Observer</code>实际上就是一个观察者，它维护了一个数组<code>this.subs = []</code>用以收集相关的<code>subs(订阅者)</code>(即这个观察者的依赖)。通过将<code>default value</code>转化为<code>getter/setter</code>形式，同时添加一个自定义<code>__ob__</code>属性，这个属性就对应<code>Observer</code>实例。</p>
<p>说起来有点绕，还是让我们看看我们给的<code>demo</code>里传入的<code>options</code>配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    props: {
      a: {
        type: Object,
        default () {
          return {
            key1: 'a',
            key2: {
                a: 'b'
            }
          }
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    props: {
      <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-keyword">default</span> () {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">key1</span>: <span class="hljs-string">'a'</span>,
            <span class="hljs-attr">key2</span>: {
                <span class="hljs-attr">a</span>: <span class="hljs-string">'b'</span>
            }
          }
        }
      }
    }</code></pre>
<p>在往上数的第二段代码里面的方法<code>obervse(value)</code>，即对<code>{key1: 'a', key2: {a: 'b'"}}"</code>进行依赖的管理，同时将这个<code>obj</code>所有的属性值都转化为<code>getter/setter</code>形式。此外，<code>Vue</code>还会将<code>props</code>属性都代理到<code>vm</code>实例上，通过<code>vm.key1</code>,<code>vm.key2</code>就可以访问到这个属性。</p>
<p>此外，还需要了解下在<code>Vue</code>中管理依赖的一个非常重要的类: <code>Dep</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Dep { 
  constructor () {
    this.id = uid++
    this.subs = []
  }
  addSub () {...}  // 添加订阅者(依赖)
  removeSub () {...}  // 删除订阅者(依赖)
  depend () {...}  // 检查当前Dep.target是否存在以及判断这个watcher已经被添加到了相应的依赖当中，如果没有则添加订阅者(依赖)，如果已经被添加了那么就不做处理
  notify () {...}  // 通知订阅者(依赖)更新
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{ 
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
  }
  addSub () {...}  <span class="hljs-comment">// 添加订阅者(依赖)</span>
  removeSub () {...}  <span class="hljs-comment">// 删除订阅者(依赖)</span>
  depend () {...}  <span class="hljs-comment">// 检查当前Dep.target是否存在以及判断这个watcher已经被添加到了相应的依赖当中，如果没有则添加订阅者(依赖)，如果已经被添加了那么就不做处理</span>
  notify () {...}  <span class="hljs-comment">// 通知订阅者(依赖)更新</span>
}</code></pre>
<p>在<code>Vue</code>的整个生命周期当中，你所定义的响应式的数据上都会绑定一个<code>Dep</code>实例去管理其依赖。它实际上就是<code>观察者</code>和<code>订阅者</code>联系的一个桥梁。</p>
<p>刚才谈到了对于依赖的管理，它的核心之一就是观察者<code>Observer</code>这个类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    // dep记录了和这个value值的相关依赖
    this.dep = new Dep()
    this.vmCount = 0
    // value其实就是vm._data, 即在vm._data上添加__ob__属性
    def(value, '__ob__', this)
    // 如果是数组
    if (Array.isArray(value)) {
      // 首先判断是否能使用__proto__属性
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      // 遍历数组，并将obj类型的属性改为getter/setter实现
      this.observeArray(value)
    } else {
      // 遍历obj上的属性，将每个属性改为getter/setter实现
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  // 将每个property对应的属性都转化为getter/setters,只能是当这个value的类型为Object时
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  // 监听array中的item
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  value: any;
  dep: Dep;
  vmCount: number; <span class="hljs-comment">// number of vms that has this object as root $data</span>

  <span class="hljs-keyword">constructor</span> (value: any) {
    <span class="hljs-keyword">this</span>.value = value
    <span class="hljs-comment">// dep记录了和这个value值的相关依赖</span>
    <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
    <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>
    <span class="hljs-comment">// value其实就是vm._data, 即在vm._data上添加__ob__属性</span>
    def(value, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>)
    <span class="hljs-comment">// 如果是数组</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
      <span class="hljs-comment">// 首先判断是否能使用__proto__属性</span>
      <span class="hljs-keyword">const</span> augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      <span class="hljs-comment">// 遍历数组，并将obj类型的属性改为getter/setter实现</span>
      <span class="hljs-keyword">this</span>.observeArray(value)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 遍历obj上的属性，将每个属性改为getter/setter实现</span>
      <span class="hljs-keyword">this</span>.walk(value)
    }
  }

  <span class="hljs-comment">/**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
  <span class="hljs-comment">// 将每个property对应的属性都转化为getter/setters,只能是当这个value的类型为Object时</span>
  walk (obj: <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(obj)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  <span class="hljs-comment">/**
   * Observe a list of Array items.
   */</span>
  <span class="hljs-comment">// 监听array中的item</span>
  observeArray (items: <span class="hljs-built_in">Array</span>&lt;any&gt;) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
      observe(items[i])
    }
  }
}</code></pre>
<p><code>walk</code>方法里面调用<code>defineReactive</code>方法：通过遍历这个<code>object</code>的<code>key</code>，并将对应的<code>value</code>转化为<code>getter/setter</code>形式，通过闭包维护一个<code>dep</code>，在<code>getter</code>方法当中定义了这个<code>key</code>是如何进行依赖的收集，在<code>setter</code>方法中定义了当这个<code>key</code>对应的值改变后，如何完成相关依赖数据的更新。但是从源码当中，我们却发现当<code>getter</code>函数被调用的时候并非就一定会完成依赖的收集，其中还有一层判断，就是<code>Dep.target</code>是否存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: Function
) {
  // 每个属性新建一个dep实例，管理这个属性的依赖
  const dep = new Dep()
    
  // 或者属性描述符
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 如果这个属性是不可配的，即无法更改
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property &amp;&amp; property.get
  const setter = property &amp;&amp; property.set

  // 递归去将val转化为getter/setter
  // childOb将子属性也转化为Observer
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 定义getter -->> reactiveGetter
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // 定义相应的依赖
      if (Dep.target) {
        // Dep.target.addDep(this)
        // 即添加watch函数
        // dep.depend()及调用了dep.addSub()只不过中间需要判断是否这个id的dep已经被包含在内了
        dep.depend()
        // childOb也添加依赖
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    },
    // 定义setter -->> reactiveSetter
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 对得到的新值进行observe
      childOb = observe(newVal)
      // 相应的依赖进行更新
      dep.notify()
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">/**
 * Define a reactive property on an Object.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">
  obj: Object,
  key: string,
  val: any,
  customSetter?: Function
</span>) </span>{
  <span class="hljs-comment">// 每个属性新建一个dep实例，管理这个属性的依赖</span>
  <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()
    
  <span class="hljs-comment">// 或者属性描述符</span>
  <span class="hljs-keyword">const</span> property = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key)
  <span class="hljs-comment">// 如果这个属性是不可配的，即无法更改</span>
  <span class="hljs-keyword">if</span> (property &amp;&amp; property.configurable === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// cater for pre-defined getter/setters</span>
  <span class="hljs-keyword">const</span> getter = property &amp;&amp; property.get
  <span class="hljs-keyword">const</span> setter = property &amp;&amp; property.set

  <span class="hljs-comment">// 递归去将val转化为getter/setter</span>
  <span class="hljs-comment">// childOb将子属性也转化为Observer</span>
  <span class="hljs-keyword">let</span> childOb = observe(val)
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 定义getter --&gt;&gt; reactiveGetter</span>
    get: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
      <span class="hljs-comment">// 定义相应的依赖</span>
      <span class="hljs-keyword">if</span> (Dep.target) {
        <span class="hljs-comment">// Dep.target.addDep(this)</span>
        <span class="hljs-comment">// 即添加watch函数</span>
        <span class="hljs-comment">// dep.depend()及调用了dep.addSub()只不过中间需要判断是否这个id的dep已经被包含在内了</span>
        dep.depend()
        <span class="hljs-comment">// childOb也添加依赖</span>
        <span class="hljs-keyword">if</span> (childOb) {
          childOb.dep.depend()
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
          dependArray(value)
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-comment">// 定义setter --&gt;&gt; reactiveSetter</span>
    set: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
      <span class="hljs-comment">/* eslint-disable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, newVal)
      } <span class="hljs-keyword">else</span> {
        val = newVal
      }
      <span class="hljs-comment">// 对得到的新值进行observe</span>
      childOb = observe(newVal)
      <span class="hljs-comment">// 相应的依赖进行更新</span>
      dep.notify()
    }
  })
}</code></pre>
<p>在上文中提到了<code>Dep</code>类是链接<code>观察者</code>和<code>订阅者</code>的桥梁。同时在<code>Dep</code>的实现当中还有一个非常重要的属性就是<code>Dep.target</code>，它事实就上就是一个订阅者，只有当<code>Dep.target</code>(订阅者)存在的时候，调用属性的<code>getter</code>函数的时候才能完成依赖的收集工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dep.target = null
const targetStack = []

export function pushTarget (_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Dep.target = <span class="hljs-literal">null</span>
<span class="hljs-keyword">const</span> targetStack = []

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushTarget</span> (<span class="hljs-params">_target: Watcher</span>) </span>{
  <span class="hljs-keyword">if</span> (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">popTarget</span> (<span class="hljs-params"></span>) </span>{
  Dep.target = targetStack.pop()
}</code></pre>
<p>那么<code>Vue</code>是如何来实现<code>订阅者</code>的呢？<code>Vue</code>里面定义了一个类: <code>Watcher</code>，在<code>Vue</code>的整个生命周期当中，会有4类地方会实例化<code>Watcher</code>：</p>
<ul>
<li><p><code>Vue</code>实例化的过程中有<code>watch</code>选项</p></li>
<li><p><code>Vue</code>实例化的过程中有<code>computed</code>计算属性选项</p></li>
<li><p><code>Vue</code>原型上有挂载<code>$watch</code>方法: Vue.prototype.$watch，可以直接通过实例调用<code>this.$watch</code>方法</p></li>
<li><p><code>Vue</code>生成了<code>render</code>函数，更新视图时</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    // 缓存这个实例vm
    this.vm = vm
    // vm实例中的_watchers中添加这个watcher
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
    ....
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function () {}
      }
    }
    // 通过get方法去获取最新的值
    // 如果lazy为true, 初始化的时候为undefined
    this.value = this.lazy
      ? undefined
      : this.get()
  }
  get () {...}
  addDep () {...}
  update () {...}
  run () {...}
  evaluate () {...}
  run () {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span> (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    <span class="hljs-comment">// 缓存这个实例vm</span>
    <span class="hljs-keyword">this</span>.vm = vm
    <span class="hljs-comment">// vm实例中的_watchers中添加这个watcher</span>
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
    ....
    <span class="hljs-comment">// parse expression for getter</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> expOrFn === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">this</span>.getter = expOrFn
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.getter = parsePath(expOrFn)
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.getter) {
        <span class="hljs-keyword">this</span>.getter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
      }
    }
    <span class="hljs-comment">// 通过get方法去获取最新的值</span>
    <span class="hljs-comment">// 如果lazy为true, 初始化的时候为undefined</span>
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
      ? <span class="hljs-literal">undefined</span>
      : <span class="hljs-keyword">this</span>.get()
  }
  get () {...}
  addDep () {...}
  update () {...}
  run () {...}
  evaluate () {...}
  run () {...}</code></pre>
<p><code>Watcher</code>接收的参数当中<code>expOrFn</code>定义了用以获取<code>watcher</code>的<code>getter</code>函数。<code>expOrFn</code>可以有2种类型：<code>string</code>或<code>function</code>.若为<code>string</code>类型，首先会通过<code>parsePath</code>方法去对<code>string</code>进行分割(仅支持<code>.</code>号形式的对象访问)。在除了<code>computed</code>选项外，其他几种实例化<code>watcher</code>的方式都是在实例化过程中完成求值及依赖的收集工作：<code>this.value = this.lazy ? undefined : this.get()</code>.在<code>Watcher</code>的<code>get</code>方法中:</p>
<p><strong>!!!前方高能</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get () {
 // pushTarget即设置当前的需要被执行的watcher
    pushTarget(this)
    let value
    const vm = this.vm
    if (this.user) {
      try {
        // $watch(function () {})
        // 调用this.getter的时候，触发了属性的getter函数
        // 在getter中进行了依赖的管理
        value = this.getter.call(vm, vm)
        console.log(value)
      } catch (e) {
        handleError(e, vm, `getter for watcher &quot;${this.expression}&quot;`)
      }
    } else {
      // 如果是新建模板函数，则会动态计算模板与data中绑定的变量，这个时候就调用了getter函数，那么就完成了dep的收集
      // 调用getter函数，则同时会调用函数内部的getter的函数，进行dep收集工作
      value = this.getter.call(vm, vm)
    }
    // &quot;touch&quot; every property so they are all tracked as
    // dependencies for deep watching
    // 让每个属性都被作为dependencies而tracked, 这样是为了deep watching
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
    return value    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">get () {
 <span class="hljs-comment">// pushTarget即设置当前的需要被执行的watcher</span>
    pushTarget(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">let</span> value
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">this</span>.vm
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">// $watch(function () {})</span>
        <span class="hljs-comment">// 调用this.getter的时候，触发了属性的getter函数</span>
        <span class="hljs-comment">// 在getter中进行了依赖的管理</span>
        value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
        <span class="hljs-built_in">console</span>.log(value)
      } <span class="hljs-keyword">catch</span> (e) {
        handleError(e, vm, <span class="hljs-string">`getter for watcher "<span class="hljs-subst">${<span class="hljs-keyword">this</span>.expression}</span>"`</span>)
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 如果是新建模板函数，则会动态计算模板与data中绑定的变量，这个时候就调用了getter函数，那么就完成了dep的收集</span>
      <span class="hljs-comment">// 调用getter函数，则同时会调用函数内部的getter的函数，进行dep收集工作</span>
      value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
    }
    <span class="hljs-comment">// "touch" every property so they are all tracked as</span>
    <span class="hljs-comment">// dependencies for deep watching</span>
    <span class="hljs-comment">// 让每个属性都被作为dependencies而tracked, 这样是为了deep watching</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.deep) {
      traverse(value)
    }
    popTarget()
    <span class="hljs-keyword">this</span>.cleanupDeps()
    <span class="hljs-keyword">return</span> value    
}</code></pre>
<p>一进入<code>get</code>方法，首先进行<code>pushTarget(this)</code>的操作，此时<code>Vue</code>当中<code>Dep.target = 当前这个watcher</code>,接下来进行<code>value = this.getter.call(vm, vm)</code>操作，在这个操作中就完成了依赖的收集工作。还是拿文章一开始的<code>demo</code>来说，在<code>vue</code>实例化的时候传入了<code>watch</code>选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    props: {
      a: {
        type: Object,
        default () {
          return {
            key1: 'a',
            key2: {
                a: 'b'
            }
          }
        }
      }
    },
   watch: {
        a (newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    }, " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    props: {
      <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-keyword">default</span> () {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">key1</span>: <span class="hljs-string">'a'</span>,
            <span class="hljs-attr">key2</span>: {
                <span class="hljs-attr">a</span>: <span class="hljs-string">'b'</span>
            }
          }
        }
      }
    },
   <span class="hljs-attr">watch</span>: {
        a (newVal, oldVal) {
            <span class="hljs-built_in">console</span>.log(newVal, oldVal)
        }
    }, </code></pre>
<p>在<code>Vue</code>的<code>initState()</code>开始执行后，首先会初始化<code>props</code>的属性为<code>getter/setter</code>函数，然后在进行<code>initWatch</code>初始化的时候，这个时候初始化<code>watcher</code>实例，并调用<code>get()</code>方法，设置<code>Dep.target = 当前这个watcher实例</code>，进而到<code>value = this.getter.call(vm, vm)</code>的操作。在调用<code>this.getter.call(vm, vm)</code>的方法中，便会访问<code>props</code>选项中的<code>a</code>属性即其<code>getter</code>函数。在<code>a</code>属性的<code>getter</code>函数执行过程中，因为<code>Dep.target</code>已经存在，那么就进入了<code>依赖收集</code>的过程:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (Dep.target) {
    // Dep.target.addDep(this)
    // 即添加watch函数
    // dep.depend()及调用了dep.addSub()只不过中间需要判断是否这个id的dep已经被包含在内了
    dep.depend()
    // childOb也添加依赖
    if (childOb) {
      childOb.dep.depend()
    }
    if (Array.isArray(value)) {
      dependArray(value)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (Dep.target) {
    <span class="hljs-comment">// Dep.target.addDep(this)</span>
    <span class="hljs-comment">// 即添加watch函数</span>
    <span class="hljs-comment">// dep.depend()及调用了dep.addSub()只不过中间需要判断是否这个id的dep已经被包含在内了</span>
    dep.depend()
    <span class="hljs-comment">// childOb也添加依赖</span>
    <span class="hljs-keyword">if</span> (childOb) {
      childOb.dep.depend()
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
      dependArray(value)
    }
  }</code></pre>
<p><code>dep</code>是一开始初始化的过程中，这个属性上的<code>dep</code>属性。调用<code>dep.depend()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  depend () {
    if (Dep.target) {
      // Dep.target为一个watcher
      Dep.target.addDep(this)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  depend () {
    <span class="hljs-keyword">if</span> (Dep.target) {
      <span class="hljs-comment">// Dep.target为一个watcher</span>
      Dep.target.addDep(<span class="hljs-keyword">this</span>)
    }
  }</code></pre>
<p><code>Dep.target</code>也就刚才的那个<code>watcher</code>实例，这里也就相当于调用了<code>watcher</code>实例的<code>addDep</code>方法: <code>watcher.addDep(this)</code>，并将<code>dep</code>观察者传入。在<code>addDep</code>方法中完成依赖收集:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">addDep (dep: Dep) {
    <span class="hljs-keyword">const</span> id = dep.id
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.newDepIds.has(id)) {
      <span class="hljs-keyword">this</span>.newDepIds.add(id)
      <span class="hljs-keyword">this</span>.newDeps.push(dep)
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.depIds.has(id)) {
        dep.addSub(<span class="hljs-keyword">this</span>)
      }
    }
  }</code></pre>
<p>这个时候依赖完成了收集，当你去修改<code>a</code>属性的值时，会调用<code>a</code>属性的<code>setter</code>函数，里面会执行<code>dep.notify()</code>，它会遍历所有的订阅者，然后调用订阅者上的<code>update</code>函数。</p>
<p><code>initData</code>过程和<code>initProps</code>类似，具体可参见源码。</p>
<h2 id="articleHeader1">initComputed</h2>
<p>以上就是在<code>initProps</code>过程中<code>Vue</code>是如何进行依赖收集的，<code>initData</code>的过程和<code>initProps</code>类似，下来再来看看<code>initComputed</code>的过程.<br>在<code>computed</code>属性初始化的过程当中，会为每个属性实例化一个<code>watcher</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // 新建_computedWatchers属性
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    const userDef = computed[key]
    // 如果computed为funtion，即取这个function为getter函数
    // 如果computed为非function.则可以单独为这个属性定义getter/setter属性
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    // create internal watcher for the computed property.
    // lazy属性为true
    // 注意这个地方传入的getter参数
    // 实例化的过程当中不去完成依赖的收集工作
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } 
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> computedWatcherOptions = { <span class="hljs-attr">lazy</span>: <span class="hljs-literal">true</span> }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed</span> (<span class="hljs-params">vm: Component, computed: Object</span>) </span>{
  <span class="hljs-comment">// 新建_computedWatchers属性</span>
  <span class="hljs-keyword">const</span> watchers = vm._computedWatchers = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> computed) {
    <span class="hljs-keyword">const</span> userDef = computed[key]
    <span class="hljs-comment">// 如果computed为funtion，即取这个function为getter函数</span>
    <span class="hljs-comment">// 如果computed为非function.则可以单独为这个属性定义getter/setter属性</span>
    <span class="hljs-keyword">let</span> getter = <span class="hljs-keyword">typeof</span> userDef === <span class="hljs-string">'function'</span> ? userDef : userDef.get
    <span class="hljs-comment">// create internal watcher for the computed property.</span>
    <span class="hljs-comment">// lazy属性为true</span>
    <span class="hljs-comment">// 注意这个地方传入的getter参数</span>
    <span class="hljs-comment">// 实例化的过程当中不去完成依赖的收集工作</span>
    watchers[key] = <span class="hljs-keyword">new</span> Watcher(vm, getter, noop, computedWatcherOptions)

    <span class="hljs-comment">// component-defined computed properties are already defined on the</span>
    <span class="hljs-comment">// component prototype. We only need to define computed properties defined</span>
    <span class="hljs-comment">// at instantiation here.</span>
    <span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> vm)) {
      defineComputed(vm, key, userDef)
    } 
  }
}</code></pre>
<p>但是这个<code>watcher</code>在实例化的过程中，由于传入了<code>{lazy: true}</code>的配置选项，那么一开始是不会进行求值与依赖收集的: <code>this.value = this.lazy ? undefined : this.get()</code>.在<code>initComputed</code>的过程中，<code>Vue</code>会将<code>computed</code>属性定义到<code>vm</code>实例上，同时将这个属性定义为<code>getter/setter</code>。当你访问<code>computed</code>属性的时候调用<code>getter</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
    if (watcher) {
      // 是否需要重新计算
      if (watcher.dirty) {
        watcher.evaluate()
      }
      // 管理依赖
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createComputedGetter</span> (<span class="hljs-params">key</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> watcher = <span class="hljs-keyword">this</span>._computedWatchers &amp;&amp; <span class="hljs-keyword">this</span>._computedWatchers[key]
    <span class="hljs-keyword">if</span> (watcher) {
      <span class="hljs-comment">// 是否需要重新计算</span>
      <span class="hljs-keyword">if</span> (watcher.dirty) {
        watcher.evaluate()
      }
      <span class="hljs-comment">// 管理依赖</span>
      <span class="hljs-keyword">if</span> (Dep.target) {
        watcher.depend()
      }
      <span class="hljs-keyword">return</span> watcher.value
    }
  }
}</code></pre>
<p>在<code>watcher</code>存在的情况下，首先判断<code>watcher.dirty</code>属性，这个属性主要是用于判断这个<code>computed</code>属性是否需要重新求值，因为在上一轮的依赖收集的过程当中，观察者已经将这个<code>watcher</code>添加到依赖数组当中了，如果观察者发生了变化，就会<code>dep.notify()</code>，通知所有的<code>watcher</code>，而对于<code>computed</code>的<code>watcher</code>接收到变化的请求后，会将<code>watcher.dirty = true</code>即表明观察者发生了变化，当再次调用<code>computed</code>属性的<code>getter</code>函数的时候便会重新计算，否则还是使用之前缓存的值。</p>
<h2 id="articleHeader2">initWatch</h2>
<p><code>initWatch</code>的过程中其实就是实例化<code>new Watcher</code>完成观察者的依赖收集的过程，在内部的实现当中是调用了原型上的<code>Vue.prototype.$watch</code>方法。这个方法也适用于<code>vm</code>实例，即在<code>vm</code>实例内部调用<code>this.$watch</code>方法去实例化<code>watcher</code>，完成依赖的收集，同时监听<code>expOrFn</code>的变化。</p>
<p>总结：</p>
<p>以上就是在<code>Vue</code>实例初始化的过程中实现依赖管理的分析。大致的总结下就是：</p>
<ul>
<li><p><code>initState</code>的过程中，将<code>props</code>,<code>computed</code>,<code>data</code>等属性通过<code>Object.defineProperty</code>来改造其<code>getter/setter</code>属性，并为每一个响应式属性实例化一个<code>observer</code>观察者。这个<code>observer</code>内部<code>dep</code>记录了这个响应式属性的所有依赖。</p></li>
<li><p>当响应式属性调用<code>setter</code>函数时，通过<code>dep.notify()</code>方法去遍历所有的依赖，调用<code>watcher.update()</code>去完成数据的动态响应。</p></li>
</ul>
<p>这篇文章主要从初始化的数据层面上分析了<code>Vue</code>是如何管理依赖来到达数据的动态响应。下一篇文章来分析下<code>Vue</code>中模板中的指令和响应式数据是如何关联来实现由数据驱动视图，以及数据是如何响应视图变化的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue的数据依赖实现原理简析

## 原文链接
[https://segmentfault.com/a/1190000010014281](https://segmentfault.com/a/1190000010014281)


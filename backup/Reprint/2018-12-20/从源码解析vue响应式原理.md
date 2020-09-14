---
title: '从源码解析vue响应式原理' 
date: 2018-12-20 2:30:10
hidden: true
slug: 2oe42sxbwzi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p><em>（距离上一次写文章已经过去了四个月，羞愧...）这几个月对vue的使用不少，但是自觉地始终停留在比较粗浅的层面，一直无法提升，所以尝试着开始阅读源码。</em> <strong>文中内容仅代表个人理解，如果错误，欢迎指正</strong>。</p>
<p>Vue中一个显著特性是数据响应式系统：当数据被修改时，视图会相应更新。从而方便的完成状态管理。<a href="https://cn.vuejs.org/v2/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">官方文档</a>中对此进行了简要的描述，本文将结合vuejs的源码，做出进一步的解析。</p>
<h2 id="articleHeader1">基本概念</h2>
<p>首先简单介绍一些在响应式系统中重要的概念。</p>
<h3 id="articleHeader2">data</h3>
<p>vue实例中的数据项</p>
<h3 id="articleHeader3">observer</h3>
<p>数据属性的观察者，监控对象的读写操作。</p>
<h3 id="articleHeader4">dep</h3>
<p>(dependence的缩写)，字面意思是“依赖”，扮演角色是消息订阅器，拥有收集订阅者、发布更新的功能。</p>
<h3 id="articleHeader5">watcher</h3>
<p>消息订阅者，可以订阅dep，之后接受dep发布的更新并执行对应视图或者表达式的更新。</p>
<h3 id="articleHeader6">dep和watcher</h3>
<p><code>dep</code>和<code>watcher</code>的关系，可以理解为：<code>dep</code>是报纸，<code>watcher</code>是订阅了报纸的人，如果他们建立了订阅 的关系，那么每当报纸有更新的时候，就会通知对应的订阅者们。</p>
<h3 id="articleHeader7">view</h3>
<p>暂且认为就是在浏览器中显示的dom（关于virtual dom的内容暂时不在本文讨论）</p>
<h3 id="articleHeader8">收集依赖</h3>
<p>watcher在自身属性中添加dep的行为，后面会详细介绍</p>
<h3 id="articleHeader9">收集订阅者</h3>
<p>dep在自身属性中添加watcher的行为，后面会详细介绍</p>
<h2 id="articleHeader10">流程简介</h2>
<p>首先给出官方文档的流程图<br><span class="img-wrap"><img data-src="/img/remote/1460000010352759" src="https://static.alili.tech/img/remote/1460000010352759" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在此基础上，我们根据源码更细一步划分出watcher和data之间的部分，即<code>Dep</code>和<code>observer</code>。<br><span class="img-wrap"><img data-src="/img/bV04Cl?w=1315&amp;h=668" src="https://static.alili.tech/img/bV04Cl?w=1315&amp;h=668" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>总的来说，vue的数据响应式实现主要分成2个部分：</p>
<ol>
<li>把数据转化为getter和setter</li>
<li>建立watcher并收集依赖</li>
</ol>
<p>第一部分是上图中<code>data</code>、<code>observer</code>、<code>dep</code>之间联系的建立过程，第二部分是<code>watcher</code>、<code>dep</code>的关系建立</p>
<h2 id="articleHeader11">源码解析</h2>
<p>本文中采用的源码是vuejs 2.5.0，<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Git地址</a></p>
<p><em>PS：简单的代码直接添加中文注释，所以在关键代码部分做<code>&lt;数字&gt;</code>标记，在后文详细介绍</em></p>
<p>首先我们在源码中找到vue进行数据处理的方法<code>initData</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /* 源码目录 src/core/instance/state.js */
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' &amp;&amp; warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components. html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods &amp;&amp; hasOwn(methods, key)) {
        warn(
          `Method &quot;${key}&quot; has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props &amp;&amp; hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' &amp;&amp; warn(
        `The data property &quot;${key}&quot; is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      //<1>data属性代理
      proxy(vm, `_data`, key)
    }
  }
  // observe data
   //对data调用observe
  observe(data, true /* asRootData */)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">/* 源码目录 src/core/instance/state.js */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initData</span> (<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-keyword">let</span> data = vm.$options.data
  data = vm._data = <span class="hljs-keyword">typeof</span> data === <span class="hljs-string">'function'</span>
    ? getData(data, vm)
    : data || {}
  <span class="hljs-keyword">if</span> (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
      <span class="hljs-string">'data functions should return an object:\n'</span> +
      <span class="hljs-string">'https://vuejs.org/v2/guide/components. html#data-Must-Be-a-Function'</span>,
      vm
    )
  }
  <span class="hljs-comment">// proxy data on instance</span>
  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(data)
  <span class="hljs-keyword">const</span> props = vm.$options.props
  <span class="hljs-keyword">const</span> methods = vm.$options.methods
  <span class="hljs-keyword">let</span> i = keys.length
  <span class="hljs-keyword">while</span> (i--) {
    <span class="hljs-keyword">const</span> key = keys[i]
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      <span class="hljs-keyword">if</span> (methods &amp;&amp; hasOwn(methods, key)) {
        warn(
          <span class="hljs-string">`Method "<span class="hljs-subst">${key}</span>" has already been defined as a data property.`</span>,
          vm
        )
      }
    }
    <span class="hljs-keyword">if</span> (props &amp;&amp; hasOwn(props, key)) {
      process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
        <span class="hljs-string">`The data property "<span class="hljs-subst">${key}</span>" is already declared as a prop. `</span> +
        <span class="hljs-string">`Use prop default value instead.`</span>,
        vm
      )
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isReserved(key)) {
      <span class="hljs-comment">//&lt;1&gt;data属性代理</span>
      proxy(vm, <span class="hljs-string">`_data`</span>, key)
    }
  }
  <span class="hljs-comment">// observe data</span>
   <span class="hljs-comment">//对data调用observe</span>
  observe(data, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
}</code></pre>
<p>这一段代码主要做2件事：</p>
<ul>
<li>
<code>代码&lt;1&gt;</code>在<code>while</code>循环内调用<code>proxy</code>函数把data的属性代理到vue实例上。完成之后可以通过<code>vm.key</code>直接访问<code>data.key</code>。</li>
<li>
<p>之后对<code>data</code>调用了<code>observe</code>方法，在这里说明一下，如果是在实例化之前添加的数据，因为被<code>observe</code>过，所以会变成响应式数据，而在实例化之后使用<code>vm.newKey = newVal</code>这样设置新属性，是不会自动响应的。解决方法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值
- 使用`vm.$data`等一些api进行数据操作" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> 如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值
</span>-<span class="ruby"> 使用<span class="hljs-string">`vm.$data`</span>等一些api进行数据操作</span></code></pre>
</li>
</ul>
<p>接下来来看对应代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 源码目录 src/core/observer/index.js */
export function observe (value: any, asRootData: ?boolean): Observer | void {
 if (!isObject(value) || value instanceof VNode) {
   return
 }
 let ob: Observer | void
 //检测当前数据是否被observe过,如果是则不必重复绑定
 if (hasOwn(value, '__ob__') &amp;&amp; value.__ob__ instanceof Observer) {
   ob = value.__ob__
 } else if (
   //<1>检测当前的数据是否是对象或者数组，如果是，则生成对应的Observer
   observerState.shouldConvert &amp;&amp;
   !isServerRendering() &amp;&amp;
   (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
   Object.isExtensible(value) &amp;&amp;
   !value._isVue
 ) {
   ob = new Observer(value)
 }
 if (asRootData &amp;&amp; ob) {
   ob.vmCount++
 }
 return ob
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 源码目录 src/core/observer/index.js */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">value: any, asRootData: ?boolean</span>): <span class="hljs-title">Observer</span> | <span class="hljs-title">void</span> </span>{
 <span class="hljs-keyword">if</span> (!isObject(value) || value <span class="hljs-keyword">instanceof</span> VNode) {
   <span class="hljs-keyword">return</span>
 }
 <span class="hljs-keyword">let</span> ob: Observer | <span class="hljs-keyword">void</span>
 <span class="hljs-comment">//检测当前数据是否被observe过,如果是则不必重复绑定</span>
 <span class="hljs-keyword">if</span> (hasOwn(value, <span class="hljs-string">'__ob__'</span>) &amp;&amp; value.__ob__ <span class="hljs-keyword">instanceof</span> Observer) {
   ob = value.__ob__
 } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (
   <span class="hljs-comment">//&lt;1&gt;检测当前的数据是否是对象或者数组，如果是，则生成对应的Observer</span>
   observerState.shouldConvert &amp;&amp;
   !isServerRendering() &amp;&amp;
   (<span class="hljs-built_in">Array</span>.isArray(value) || isPlainObject(value)) &amp;&amp;
   <span class="hljs-built_in">Object</span>.isExtensible(value) &amp;&amp;
   !value._isVue
 ) {
   ob = <span class="hljs-keyword">new</span> Observer(value)
 }
 <span class="hljs-keyword">if</span> (asRootData &amp;&amp; ob) {
   ob.vmCount++
 }
 <span class="hljs-keyword">return</span> ob
}</code></pre>
<ul><li>在本段代码中，<code>代码&lt;1&gt;</code>处，对传入的数据对象进行了判断，<strong>只对对象和数组类型生成<code>Observer</code>实例</strong>,然后看<code>Observer</code>这个类的代码，</li></ul>
<h3 id="articleHeader12">Observer</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    // 生成了一个消息订阅器dep实例 关于dep的结构稍后详细介绍 
    this.dep = new Dep()
    this.vmCount = 0
    //def函数给当前数据添加不可枚举的__ob__属性，表示该数据已经被observe过
    def(value, '__ob__', this)
    //<1>对数组类型的数据 调用observeArray方法；对对象类型的数据，调用walk方法
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
   /* 循环遍历数据对象的每个属性，调用defineReactive方法 只对Object类型数据有效 */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items. 
   */
   /* observe数组类型数据的每个值， */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

/* defineReactive的核心思想改写数据的getter和setter */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  //<2>生成一个dep实例，注意此处的dep和前文Observer类里直接添加的dep的区别
  const dep = new Dep()
    
  //检验该属性是否允许重新定义setter和getter
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  // 获取原有的 getter/setters
  const getter = property &amp;&amp; property.get
  const setter = property &amp;&amp; property.set
  
  //<3>此处对val进行了observe
  let childOb = !shallow &amp;&amp; observe(val)
  
  //<4>下面的代码利用Object.defineProperty函数把数据转化成getter和setter，并且在getter和setter时，进行了一些操作
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        // dep.depend()其实就是dep和watcher进行了互相绑定，而Dep.target表示需要绑定的那个watcher，任何时刻都最多只有一个，后面还会解释
        dep.depend()
        if (childOb) {
          //<5>当前对象的子对象的依赖也要被收集
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
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
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      //<6>观察新的val并通知订阅者们属性有更新
      childOb = !shallow &amp;&amp; observe(newVal)
      dep.notify()
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  value: any;
  dep: Dep;
  vmCount: number; <span class="hljs-comment">// number of vms that has this object as root $data</span>

  <span class="hljs-keyword">constructor</span> (value: any) {
    <span class="hljs-keyword">this</span>.value = value
    <span class="hljs-comment">// 生成了一个消息订阅器dep实例 关于dep的结构稍后详细介绍 </span>
    <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
    <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>
    <span class="hljs-comment">//def函数给当前数据添加不可枚举的__ob__属性，表示该数据已经被observe过</span>
    def(value, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>)
    <span class="hljs-comment">//&lt;1&gt;对数组类型的数据 调用observeArray方法；对对象类型的数据，调用walk方法</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
      <span class="hljs-keyword">const</span> augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      <span class="hljs-keyword">this</span>.observeArray(value)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.walk(value)
    }
  }

  <span class="hljs-comment">/**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
   <span class="hljs-comment">/* 循环遍历数据对象的每个属性，调用defineReactive方法 只对Object类型数据有效 */</span>
  walk (obj: <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(obj)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  <span class="hljs-comment">/**
   * Observe a list of Array items. 
   */</span>
   <span class="hljs-comment">/* observe数组类型数据的每个值， */</span>
  observeArray (items: <span class="hljs-built_in">Array</span>&lt;any&gt;) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
      observe(items[i])
    }
  }
}

<span class="hljs-comment">/* defineReactive的核心思想改写数据的getter和setter */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
</span>) </span>{
  <span class="hljs-comment">//&lt;2&gt;生成一个dep实例，注意此处的dep和前文Observer类里直接添加的dep的区别</span>
  <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()
    
  <span class="hljs-comment">//检验该属性是否允许重新定义setter和getter</span>
  <span class="hljs-keyword">const</span> property = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key)
  <span class="hljs-keyword">if</span> (property &amp;&amp; property.configurable === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// cater for pre-defined getter/setters</span>
  <span class="hljs-comment">// 获取原有的 getter/setters</span>
  <span class="hljs-keyword">const</span> getter = property &amp;&amp; property.get
  <span class="hljs-keyword">const</span> setter = property &amp;&amp; property.set
  
  <span class="hljs-comment">//&lt;3&gt;此处对val进行了observe</span>
  <span class="hljs-keyword">let</span> childOb = !shallow &amp;&amp; observe(val)
  
  <span class="hljs-comment">//&lt;4&gt;下面的代码利用Object.defineProperty函数把数据转化成getter和setter，并且在getter和setter时，进行了一些操作</span>
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
      <span class="hljs-keyword">if</span> (Dep.target) {
        <span class="hljs-comment">// dep.depend()其实就是dep和watcher进行了互相绑定，而Dep.target表示需要绑定的那个watcher，任何时刻都最多只有一个，后面还会解释</span>
        dep.depend()
        <span class="hljs-keyword">if</span> (childOb) {
          <span class="hljs-comment">//&lt;5&gt;当前对象的子对象的依赖也要被收集</span>
          childOb.dep.depend()
          <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
            dependArray(value)
          }
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
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
        setter.call(obj, newVal)
      } <span class="hljs-keyword">else</span> {
        val = newVal
      }
      <span class="hljs-comment">//&lt;6&gt;观察新的val并通知订阅者们属性有更新</span>
      childOb = !shallow &amp;&amp; observe(newVal)
      dep.notify()
    }
  })
}</code></pre>
<ul><li>在Observer类代码中，首先给当前数据<strong>添加了一个dep实例，存放于对象或者数组类型数据的<code>_![图片描述][2]ob_</code>属性上</strong>，然后把<code>_ob_</code>挂在该数据上，它是该数据项被<code>observe</code>的标志，我们可以在控制台看到这个属性，,例如：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子 1
<!DOCTYPE html>
<html>

<head>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
  <title>vue demo</title>
</head>

<body>
  <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
  <div id=&quot;app&quot;>
    <div>obj:"{{" obj"}}"</div>
  </div>
</body>
<script>
  app = new Vue({
    el: '#app',
    data: {
      str: &quot;a&quot;,
      obj: {
        key: &quot;val&quot;
      }
    }
  });
  console.log(app._data)
</script>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//例子 1
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>obj:"{{" obj"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">str</span>: <span class="hljs-string">"a"</span>,
      <span class="hljs-attr">obj</span>: {
        <span class="hljs-attr">key</span>: <span class="hljs-string">"val"</span>
      }
    }
  });
  <span class="hljs-built_in">console</span>.log(app._data)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>在控制台我们可以看到这样的数据<br><span class="img-wrap"><img data-src="/img/bV04Ip?w=1058&amp;h=335" src="https://static.alili.tech/img/bV04Ip?w=1058&amp;h=335" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，首先，data对象上已经有<code>_ob_</code>属性，这是被<code>observe</code>的标志；其次，<code>obj</code>和<code>arr</code>属性上有<code>_ob_</code>属性，而<code>str</code>没有，这个进一步证明了前文提到的：<code>observe</code><strong>只对对象和数组有效</strong></p>
<ul>
<li>随后，对于数组和对象类型的数据做不同处理：对于数组类型<code>observe</code>里面的每个值，对于对象，我们执行<code>walk()</code>方法，而<code>walk()</code>就是对于当前数据对象的每个key，执行<code>defineReactive()</code>方法，所以接下来重点来看<code>defineReactive()</code>。</li>
<li>
<p><code>defineReactive()</code>中，在<code>代码&lt;2&gt;</code>处生成了一个<code>dep</code>实例，并在接下来的代码里，把这个<code>dep</code>对象放在当前数据对象的<code>key</code>(比如上面例子1中的<code>str</code>)的<code>getter</code>里，这个之前<code>Observer</code>中的<code>dep</code>是有区别的:</p>
<ul>
<li>
<code>Observer</code>中的<code>dep</code>挂在<code>Object</code>或者<code>Array</code>类型的数据的<code>dep</code>属性上，可以在控制台直接查看；</li>
<li>此处添加的<code>dep</code>挂在属性的<code>getter/setter上</code>，存在于函数闭包中，不可直接查看</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为什么会有2种`Dep`呢？因为对于`Object`或者`Array`类型的数据，可能会有**添加" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">为什么会有<span class="hljs-number">2</span>种`Dep`呢？因为对于`Object`或者`Array`类型的数据，可能会有**添加</code></pre>
<p>或者删除成员的操作而其他类型的值只有赋值操作，赋值操作可以在<code>getter/setter上</code>中检测到。**，</p>
<ul>
<li>接下来<code>代码&lt;3&gt;</code>处的是为了处理嵌套的数据对象，比如例子1中，<code>data</code>是最顶层的<code>Object</code>,<code>obj</code>就是<code>data</code>下的<code>Object</code>，而<code>obj</code>里面也可以再继续嵌套数据，有了此处的代码之后，就可以对嵌套的每一层都做<code>observe</code>处理。</li>
<li>
<code>代码&lt;4&gt;</code>处是<code>defineReactive()</code>的核心：利用<code>Object.defineProperty()</code>(这个函数建议了解一下<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">mdn地址</a>)</li>
</ul>
<p>在当前属性的getter和setter中插入操作：</p>
<ul>
<li>在当前数据被get时，当前的<code>watcher</code>(也就是<code>Dap.target</code>)和<code>dep</code>之间的绑定，这里有个注意点是在<code>代码&lt;5&gt;</code>处，如果当前数据对象存在子对象，那么子对象的<code>dep</code>也要和当前<code>watcher</code>进行绑定，以此类推。</li>
<li>在setter时，我们重新观测当前<code>val</code>,然后通过<code>dep.notify()</code>来通知当前dep所绑定的订阅者们数据有更新。</li>
</ul>
<h3 id="articleHeader13">Dep</h3>
<p>接下来介绍一下<code>dep</code>。源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 源码目录 src/core/observer/dep.js */
let uid = 0
/**
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
  //添加一个watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
  //移除一个watcher
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
  //让当前watcher收集依赖 同时Dep.target.addDep也会触发当前dep收集watcher
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
 //通知watcher们对应的数据有更新
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 源码目录 src/core/observer/dep.js */</span>
<span class="hljs-keyword">let</span> uid = <span class="hljs-number">0</span>
<span class="hljs-comment">/**
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
  <span class="hljs-comment">//添加一个watcher</span>
  addSub (sub: Watcher) {
    <span class="hljs-keyword">this</span>.subs.push(sub)
  }
  <span class="hljs-comment">//移除一个watcher</span>
  removeSub (sub: Watcher) {
    remove(<span class="hljs-keyword">this</span>.subs, sub)
  }
  <span class="hljs-comment">//让当前watcher收集依赖 同时Dep.target.addDep也会触发当前dep收集watcher</span>
  depend () {
    <span class="hljs-keyword">if</span> (Dep.target) {
      Dep.target.addDep(<span class="hljs-keyword">this</span>)
    }
  }
 <span class="hljs-comment">//通知watcher们对应的数据有更新</span>
  notify () {
    <span class="hljs-comment">// stabilize the subscriber list first</span>
    <span class="hljs-keyword">const</span> subs = <span class="hljs-keyword">this</span>.subs.slice()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}
</code></pre>
<p>这个类相对简单很多，只有2个属性:第一个是<code>id</code>，在每个vue实例中都从0开始计数；另一个是<code>subs</code>数组，用于存放<code>wacther</code>，根绝前文我们知道，一个数据对应一个<code>Dep</code>，所以<code>subs</code>里存放的也就是依赖该数据需要绑定的<code>wacther</code>。</p>
<p>这里有个<code>Dep.target</code>属性是全局共享的，表示<strong>当前在收集依赖的那个Watcher，在每个时刻最多只会有一个</strong>。</p>
<h3 id="articleHeader14">watcher</h3>
<p>接下里看watcher的源码，比较长，但是我们只关注其中的几个属性和方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 源码目录 src/core/observer/watcher.js */
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
 /* watcher用来解析表达式，收集依赖，并且当表达式的值改变时触发回调函数 
 用在$watch() api 和指令中
 */
export default class Watcher {
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
    vm._watchers.push(this)
    // options
    //这里暂时不用关注 
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
    //deps和newDeps表示现有的依赖和新一轮收集的依赖
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    //<1>解析getter的表达式 
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      //<2>获取实际对象的值
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
    //this.lazy为true是计算属性的watcher，另外处理，其他情况调用get
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher &quot;${this.expression}&quot;`)
      } else {
        throw e
      }
    } finally {
      // &quot;touch&quot; every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      //<3>清除先前的依赖
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
   /* 给当前指令添加依赖 */
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
   /* 清除旧依赖 */
  cleanupDeps () {
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
   /* 订阅者的接口 当依赖改变时会触发 */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
   /* 调度接口 调度时会触发 */
  run () {
    if (this.active) {
      //<14>重新收集依赖
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
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
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
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
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 源码目录 src/core/observer/watcher.js */</span>
<span class="hljs-comment">/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */</span>
 <span class="hljs-comment">/* watcher用来解析表达式，收集依赖，并且当表达式的值改变时触发回调函数 
 用在$watch() api 和指令中
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
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
    vm._watchers.push(<span class="hljs-keyword">this</span>)
    <span class="hljs-comment">// options</span>
    <span class="hljs-comment">//这里暂时不用关注 </span>
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
    <span class="hljs-comment">//deps和newDeps表示现有的依赖和新一轮收集的依赖</span>
    <span class="hljs-keyword">this</span>.deps = []
    <span class="hljs-keyword">this</span>.newDeps = []
    <span class="hljs-keyword">this</span>.depIds = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()
    <span class="hljs-keyword">this</span>.newDepIds = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()
    <span class="hljs-keyword">this</span>.expression = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
      ? expOrFn.toString()
      : <span class="hljs-string">''</span>
    <span class="hljs-comment">// parse expression for getter</span>
    <span class="hljs-comment">//&lt;1&gt;解析getter的表达式 </span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> expOrFn === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">this</span>.getter = expOrFn
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//&lt;2&gt;获取实际对象的值</span>
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
    <span class="hljs-comment">//this.lazy为true是计算属性的watcher，另外处理，其他情况调用get</span>
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
      ? <span class="hljs-literal">undefined</span>
      : <span class="hljs-keyword">this</span>.get()
  }

  <span class="hljs-comment">/**
   * Evaluate the getter, and re-collect dependencies.
   */</span>
  get () {
    pushTarget(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">let</span> value
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">this</span>.vm
    <span class="hljs-keyword">try</span> {
      value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
        handleError(e, vm, <span class="hljs-string">`getter for watcher "<span class="hljs-subst">${<span class="hljs-keyword">this</span>.expression}</span>"`</span>)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> e
      }
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-comment">// "touch" every property so they are all tracked as</span>
      <span class="hljs-comment">// dependencies for deep watching</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.deep) {
        traverse(value)
      }
      popTarget()
      <span class="hljs-comment">//&lt;3&gt;清除先前的依赖</span>
      <span class="hljs-keyword">this</span>.cleanupDeps()
    }
    <span class="hljs-keyword">return</span> value
  }

  <span class="hljs-comment">/**
   * Add a dependency to this directive.
   */</span>
   <span class="hljs-comment">/* 给当前指令添加依赖 */</span>
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
   <span class="hljs-comment">/* 清除旧依赖 */</span>
  cleanupDeps () {
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
   <span class="hljs-comment">/* 订阅者的接口 当依赖改变时会触发 */</span>
  update () {
    <span class="hljs-comment">/* istanbul ignore else */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lazy) {
      <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
      <span class="hljs-keyword">this</span>.run()
    } <span class="hljs-keyword">else</span> {
      queueWatcher(<span class="hljs-keyword">this</span>)
    }
  }

  <span class="hljs-comment">/**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */</span>
   <span class="hljs-comment">/* 调度接口 调度时会触发 */</span>
  run () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.active) {
      <span class="hljs-comment">//&lt;14&gt;重新收集依赖</span>
      <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.get()
      <span class="hljs-keyword">if</span> (
        value !== <span class="hljs-keyword">this</span>.value ||
        <span class="hljs-comment">// Deep watchers and watchers on Object/Arrays should fire even</span>
        <span class="hljs-comment">// when the value is the same, because the value may</span>
        <span class="hljs-comment">// have mutated.</span>
        isObject(value) ||
        <span class="hljs-keyword">this</span>.deep
      ) {
        <span class="hljs-comment">// set new value</span>
        <span class="hljs-keyword">const</span> oldValue = <span class="hljs-keyword">this</span>.value
        <span class="hljs-keyword">this</span>.value = value
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
  evaluate () {
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get()
    <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">false</span>
  }

  <span class="hljs-comment">/**
   * Depend on all deps collected by this watcher.
   */</span>
  depend () {
    <span class="hljs-keyword">let</span> i = <span class="hljs-keyword">this</span>.deps.length
    <span class="hljs-keyword">while</span> (i--) {
      <span class="hljs-keyword">this</span>.deps[i].depend()
    }
  }

  <span class="hljs-comment">/**
   * Remove self from all dependencies' subscriber list.
   */</span>
  teardown () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.active) {
      <span class="hljs-comment">// remove self from vm's watcher list</span>
      <span class="hljs-comment">// this is a somewhat expensive operation so we skip it</span>
      <span class="hljs-comment">// if the vm is being destroyed.</span>
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
</code></pre>
<p>首先看官方文档的英文注释可知，watcher用于watcher用来解析表达式，收集依赖，并且当表达式的值改变时触发回调函数，用在<code>$watch()</code>api 和指令之中。</p>
<p>watcher函数主要内容是：</p>
<ul>
<li>初始化属性的值，其中和本文相关的主要是<code>deps</code>、<code>newDeps</code>、<code>depIds</code>、<code>newDepIds</code>,分别表示现有依赖和新一轮收集的依赖，这里的<strong>依赖</strong>就是前文介绍的数据对应的<code>dep</code>。</li>
<li>设置getter属性。<code>&lt;1&gt;</code>判断传入的表达式类型：可能是函数，也可能是表达式。如果是函数，那么直接设置成getter，如果是表达式，由于<code>代码&lt;2&gt;</code>处的<code>expOrFn</code>只是字符串，<strong>比如例子1中的<code>obj.key</code>，在这里仅仅是一个字符串</strong>，所以要用<code>parsePath</code>获取到实际的值</li>
<li>执行get()方法，在这里主要做收集依赖，并且获取数据的值，之后要调用<code>代码&lt;3&gt;</code>`cleanupDeps`清除旧的依赖。这是必须要做的，因为数据更新之后可能有新的数据属性添加进来，前一轮的依赖中没有包含这个新数据，所以要重新收集。</li>
<li>update方法主要内容是里面的触发更新之后会触发run方法（虽然这里分了三种情况，但是最终都是触发run方法），而run方法调用<code>get()</code>首先重新收集依赖，然后使用<code>this.cb.call</code>更新模板或者表达式的值。</li>
</ul>
<h2 id="articleHeader15">总结</h2>
<p>在最后，我们再总结一下这个流程：首先数据从初始化data开始，使用<code>observe</code>监控数据：给每个数据属性添加<code>dep</code>，并且在它的getter过程添加收集依赖操作，在setter过程添加通知更新的操作；在解析指令或者给vue实例设置<code>watch</code>选项或者调用<code>$watch</code>时，生成对应的<code>watcher</code>并收集依赖。之后，如果数据触发更新，会通知<code>watcher</code>，<code>wacther</code>在重新收集依赖之后，触发模板视图更新。这就完成了数据响应式的流程。</p>
<p>本文的流程图根据源码的过程画出，而在官方文档的流程图中，没有单独列出<code>dep</code>和<code>obvserver</code>，因为这个流程最核心的思路就是<strong>将data的属性转化成<code>getter</code>和<code>setter</code>然后和<code>watcher</code>绑定</strong>。</p>
<p>然后依然是惯例：如果这篇文章对你有帮助，希望可以收藏和推荐，以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。<strong>请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从源码解析vue响应式原理

## 原文链接
[https://segmentfault.com/a/1190000012612657](https://segmentfault.com/a/1190000012612657)


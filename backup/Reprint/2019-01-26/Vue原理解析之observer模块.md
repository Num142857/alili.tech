---
title: 'Vue原理解析之observer模块' 
date: 2019-01-26 2:30:18
hidden: true
slug: 6obmw4p013t
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文是针对<code>Vue@2.1.8</code>进行分析</p></blockquote>
<p><code>observer</code>是Vue核心中最重要的一个模块（个人认为），能够实现视图与数据的响应式更新，底层全凭<code>observer</code>的支持。</p>
<p><code>observer</code>模块在Vue项目中的代码位置是<code>src/core/observer</code>，模块共分为这几个部分：</p>
<ul>
<li><p><code>Observer</code>: 数据的观察者，让数据对象的读写操作都处于自己的监管之下</p></li>
<li><p><code>Watcher</code>: 数据的订阅者，数据的变化会通知到<code>Watcher</code>，然后由<code>Watcher</code>进行相应的操作，例如更新视图</p></li>
<li><p><code>Dep</code>: <code>Observer</code>与<code>Watcher</code>的纽带，当数据变化时，会被<code>Observer</code>观察到，然后由<code>Dep</code>通知到<code>Watcher</code></p></li>
</ul>
<p>示意图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVJiAp?w=651&amp;h=327" src="https://static.alili.tech/img/bVJiAp?w=651&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">Observer</h2>
<p><code>Observer</code>类定义在<code>src/core/observer/index.js</code>中，先来看一下<code>Observer</code>的构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (value: any) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
      const augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>constructor (<span class="hljs-keyword">value</span>: any) {
  <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>
  <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
  <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>
  def(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>)
  <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">value</span>)) {
      <span class="hljs-keyword">const</span> augment = hasProto
      ? protoAugment
      : <span class="hljs-function">copyAugment
    <span class="hljs-title">augment</span>(<span class="hljs-params"><span class="hljs-keyword">value</span>, arrayMethods, arrayKeys</span>)
    <span class="hljs-keyword">this</span>.<span class="hljs-title">observeArray</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>)
  } <span class="hljs-keyword">else</span> </span>{
    <span class="hljs-keyword">this</span>.walk(<span class="hljs-keyword">value</span>)
  }
}</code></pre>
<p><code>value</code>是需要被观察的数据对象，在构造函数中，会给<code>value</code>增加<code>__ob__</code>属性，作为数据已经被<code>Observer</code>观察的标志。如果<code>value</code>是数组，就使用<code>observeArray</code>遍历<code>value</code>，对<code>value</code>中每一个元素调用<code>observe</code>分别进行观察。如果<code>value</code>是对象，则使用<code>walk</code>遍历<code>value</code>上每个key，对每个key调用<code>defineReactive</code>来获得该key的<code>set/get</code>控制权。</p>
<p>解释下上面用到的几个函数的功能：</p>
<ul>
<li><p><code>observeArray</code>: 遍历数组，对数组的每个元素调用<code>observe</code></p></li>
<li><p><code>observe</code>: 检查对象上是否有<code>__ob__</code>属性，如果存在，则表明该对象已经处于<code>Observer</code>的观察中，如果不存在，则<code>new Observer</code>来观察对象（其实还有一些判断逻辑，为了便于理解就不赘述了）</p></li>
<li><p><code>walk</code>: 遍历对象的每个key，对对象上每个key的数据调用<code>defineReactive</code></p></li>
<li><p><code>defineReactive</code>: 通过<code>Object.defineProperty</code>设置对象的key属性，使得能够捕获到该属性值的<code>set/get</code>动作。一般是由<code>Watcher</code>的实例对象进行<code>get</code>操作，此时<code>Watcher</code>的实例对象将被自动添加到<code>Dep</code>实例的依赖数组中，在外部操作触发了<code>set</code>时，将通过<code>Dep</code>实例的<code>notify</code>来通知所有依赖的<code>watcher</code>进行更新。</p></li>
</ul>
<p>如果不太理解上面的文字描述可以看一下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVJiJC?w=844&amp;h=337" src="https://static.alili.tech/img/bVJiJC?w=844&amp;h=337" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">Dep</h2>
<p><code>Dep</code>是<code>Observer</code>与<code>Watcher</code>之间的纽带，也可以认为<code>Dep</code>是服务于<code>Observer</code>的订阅系统。<code>Watcher</code>订阅某个<code>Observer</code>的<code>Dep</code>，当<code>Observer</code>观察的数据发生变化时，通过<code>Dep</code>通知各个已经订阅的<code>Watcher</code>。</p>
<p><code>Dep</code>提供了几个接口：</p>
<ul>
<li><p><code>addSub</code>: 接收的参数为<code>Watcher</code>实例，并把<code>Watcher</code>实例存入记录依赖的数组中</p></li>
<li><p><code>removeSub</code>: 与<code>addSub</code>对应，作用是将<code>Watcher</code>实例从记录依赖的数组中移除</p></li>
<li><p><code>depend</code>: <code>Dep.target</code>上存放这当前需要操作的<code>Watcher</code>实例，调用<code>depend</code>会调用该<code>Watcher</code>实例的<code>addDep</code>方法，<code>addDep</code>的功能可以看下面对<code>Watcher</code>的介绍</p></li>
<li><p><code>notify</code>: 通知依赖数组中所有的<code>watcher</code>进行更新操作</p></li>
</ul>
<h2 id="articleHeader2">Watcher</h2>
<p><code>Watcher</code>是用来订阅数据的变化的并执行相应操作（例如更新视图）的。<code>Watcher</code>的构造器函数定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (vm, expOrFn, cb, options) {
  this.vm = vm
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
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">constructor</span> (vm, expOrFn, cb, options) {
  <span class="hljs-keyword">this</span>.vm = vm
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
  <span class="hljs-keyword">this</span>.depIds = new Set()
  <span class="hljs-keyword">this</span>.newDepIds = new Set()
  <span class="hljs-keyword">this</span>.expression = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
    ? expOrFn.toString()
    : <span class="hljs-string">''</span>
  <span class="hljs-keyword">if</span> (typeof expOrFn === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">this</span>.getter = expOrFn
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.getter = parsePath(expOrFn)
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.getter) {
      <span class="hljs-keyword">this</span>.getter = function () {}
      process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
        `Failed watching path: <span class="hljs-string">"<span class="hljs-subst">${expOrFn}</span>"</span> ` +
        <span class="hljs-string">'Watcher only accepts simple dot-delimited paths. '</span> +
        <span class="hljs-string">'For full control, use a function instead.'</span>,
        vm
      )
    }
  }
  <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
    ? undefined
    : <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
}</code></pre>
<p>参数中，<code>vm</code>表示组件实例，<code>expOrFn</code>表示要订阅的数据字段（字符串表示，例如<code>a.b.c</code>）或是一个要执行的函数，<code>cb</code>表示watcher运行后的回调函数，<code>options</code>是选项对象，包含<code>deep</code>、<code>user</code>、<code>lazy</code>等配置。</p>
<p><code>watcher</code>实例上有这些方法：</p>
<ul>
<li><p><code>get</code>: 将<code>Dep.target</code>设置为当前<code>watcher</code>实例，在内部调用<code>this.getter</code>，如果此时某个被<code>Observer</code>观察的数据对象被取值了，那么当前<code>watcher</code>实例将会自动订阅数据对象的<code>Dep</code>实例</p></li>
<li><p><code>addDep</code>: 接收参数<code>dep</code>(Dep实例)，让当前<code>watcher</code>订阅<code>dep</code></p></li>
<li><p><code>cleanupDeps</code>: 清除<code>newDepIds</code>和<code>newDep</code>上记录的对dep的订阅信息</p></li>
<li><p><code>update</code>: 立刻运行<code>watcher</code>或者将<code>watcher</code>加入队列中等待统一flush</p></li>
<li><p><code>run</code>: 运行<code>watcher</code>，调用<code>this.get()</code>求值，然后触发回调</p></li>
<li><p><code>evaluate</code>: 调用<code>this.get()</code>求值</p></li>
<li><p><code>depend</code>: 遍历<code>this.deps</code>，让当前<code>watcher</code>实例订阅所有<code>dep</code></p></li>
<li><p><code>teardown</code>: 去除当前<code>watcher</code>实例所有的订阅</p></li>
</ul>
<h2 id="articleHeader3">Array methods</h2>
<p>在<code>src/core/observer/array.js</code>中，Vue框架对数组的<code>push</code>、<code>pop</code>、<code>shift</code>、<code>unshift</code>、<code>sort</code>、<code>splice</code>、<code>reverse</code>方法进行了改造，在调用数组的这些方法时，自动触发<code>dep.notify()</code>，解决了调用这些函数改变数组后无法触发更新的问题。在Vue的官方文档中对这个也有说明：<a href="http://cn.vuejs.org/v2/guide/list.html#" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/v2/guide/list.html#变异方法</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue原理解析之observer模块

## 原文链接
[https://segmentfault.com/a/1190000008377887](https://segmentfault.com/a/1190000008377887)


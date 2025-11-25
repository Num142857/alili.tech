---
title: 'virtual-dom(Vue实现)简析' 
date: 2019-01-09 2:30:12
hidden: true
slug: a8bj5otplm
categories: [reprint]
---

{{< raw >}}

                    
<p><code>virtual-dom</code>(后文简称<code>vdom</code>)的概念大规模的推广还是得益于<code>react</code>出现，<code>virtual-dom</code>也是<code>react</code>这个框架的非常重要的特性之一。相比于频繁的手动去操作<code>dom</code>而带来性能问题，<code>vdom</code>很好的将<code>dom</code>做了一层映射关系，进而将在我们本需要直接进行<code>dom</code>的一系列操作，映射到了操作<code>vdom</code>，而<code>vdom</code>上定义了关于真实<code>dom</code>的一些关键的信息，<code>vdom</code>完全是用<code>js</code>去实现，和宿主浏览器没有任何联系，此外得益于<code>js</code>的执行速度，将原本需要在真实<code>dom</code>进行的<code>创建节点</code>,<code>删除节点</code>,<code>添加节点</code>等一系列复杂的<code>dom</code>操作全部放到<code>vdom</code>中进行，这样就通过操作<code>vdom</code>来提高直接操作的<code>dom</code>的效率和性能。</p>
<p><code>Vue</code>在<code>2.0</code>版本也引入了<code>vdom</code>。其<code>vdom</code>算法是基于<a href="https://github.com/snabbdom/snabbdom" rel="nofollow noreferrer" target="_blank">snabbdom算法</a>所做的修改。</p>
<p>在<code>Vue</code>的整个应用生命周期当中，每次需要更新视图的时候便会使用<code>vdom</code>。那么在<code>Vue</code>当中，<code>vdom</code>是如何和<code>Vue</code>这个框架融合在一起工作的呢？以及大家常常提到的<code>vdom</code>的<code>diff</code>算法又是怎样的呢？接下来就通过这篇文章简单的向大家介绍下<code>Vue</code>当中的<code>vdom</code>是如何去工作的。</p>
<p>首先，我们还是来看下<code>Vue</code>生命周期当中初始化的最后阶段：将<code>vm</code>实例挂载到<code>dom</code>上，源码在<a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">src/core/instance</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.prototype._init = function () {
        ...
        vm.$mount(vm.$options.el)  // 实际上是调用了mountComponent方法
        ...
    }   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        ...
        vm.$mount(vm.$options.el)  <span class="hljs-comment">// 实际上是调用了mountComponent方法</span>
        ...
    }   </code></pre>
<p><code>mountComponent</code>函数的定义是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // vm.$el为真实的node
  vm.$el = el
  // 如果vm上没有挂载render函数
  if (!vm.$options.render) {
    // 空节点
    vm.$options.render = createEmptyVNode
  }
  // 钩子函数
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
    ...
  } else {
    // updateComponent为监听函数, new Watcher(vm, updateComponent, noop)
    updateComponent = () => {
      // Vue.prototype._render 渲染函数
      // vm._render() 返回一个VNode
      // 更新dom
      // vm._render()调用render函数，会返回一个VNode，在生成VNode的过程中，会动态计算getter,同时推入到dep里面
      vm._update(vm._render(), hydrating)
    }
  }

  // 新建一个_watcher对象
  // vm实例上挂载的_watcher主要是为了更新DOM
  // vm/expression/cb
  vm._watcher = new Watcher(vm, updateComponent, noop)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mountComponent</span> (<span class="hljs-params">
  vm: Component,
  el: ?Element,
  hydrating?: boolean
</span>): <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// vm.$el为真实的node</span>
  vm.$el = el
  <span class="hljs-comment">// 如果vm上没有挂载render函数</span>
  <span class="hljs-keyword">if</span> (!vm.$options.render) {
    <span class="hljs-comment">// 空节点</span>
    vm.$options.render = createEmptyVNode
  }
  <span class="hljs-comment">// 钩子函数</span>
  callHook(vm, <span class="hljs-string">'beforeMount'</span>)

  <span class="hljs-keyword">let</span> updateComponent
  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
    ...
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// updateComponent为监听函数, new Watcher(vm, updateComponent, noop)</span>
    updateComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// Vue.prototype._render 渲染函数</span>
      <span class="hljs-comment">// vm._render() 返回一个VNode</span>
      <span class="hljs-comment">// 更新dom</span>
      <span class="hljs-comment">// vm._render()调用render函数，会返回一个VNode，在生成VNode的过程中，会动态计算getter,同时推入到dep里面</span>
      vm._update(vm._render(), hydrating)
    }
  }

  <span class="hljs-comment">// 新建一个_watcher对象</span>
  <span class="hljs-comment">// vm实例上挂载的_watcher主要是为了更新DOM</span>
  <span class="hljs-comment">// vm/expression/cb</span>
  vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop)
  hydrating = <span class="hljs-literal">false</span>

  <span class="hljs-comment">// manually mounted instance, call mounted on self</span>
  <span class="hljs-comment">// mounted is called for render-created child components in its inserted hook</span>
  <span class="hljs-keyword">if</span> (vm.$vnode == <span class="hljs-literal">null</span>) {
    vm._isMounted = <span class="hljs-literal">true</span>
    callHook(vm, <span class="hljs-string">'mounted'</span>)
  }
  <span class="hljs-keyword">return</span> vm
}</code></pre>
<p>注意上面的代码中定义了一个<code>updateComponent</code>函数，这个函数执行的时候内部会调用<code>vm._update(vm._render(), hyddrating)</code>方法，其中<code>vm._render</code>方法会返回一个新的<code>vnode</code>，(关于<code>vm_render</code>是如何生成<code>vnode</code>的建议大家看看<code>vue</code>的关于<code>compile</code>阶段的代码)，然后传入<code>vm._update</code>方法后，就用这个新的<code>vnode</code>和老的<code>vnode</code>进行<code>diff</code>，最后完成<code>dom</code>的更新工作。那么<code>updateComponent</code>都是在什么时候去进行调用呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm._watcher = new Watcher(vm, updateComponent, noop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop)</code></pre>
<p>实例化一个<code>watcher</code>，在求值的过程中<code>this.value = this.lazy ? undefined : this.get()</code>，会调用<code>this.get()</code>方法，因此在实例化的过程当中<code>Dep.target</code>会被设为这个<code>watcher</code>，通过调用<code>vm._render()</code>方法生成新的<code>Vnode</code>并进行<code>diff</code>的过程中完成了模板当中变量依赖收集工作。即这个<code>watcher</code>被添加到了在模板当中所绑定变量的依赖当中。一旦<code>model</code>中的响应式的数据发生了变化，这些响应式的数据所维护的<code>dep</code>数组便会调用<code>dep.notify()</code>方法完成所有依赖遍历执行的工作，这里面就包括了视图的更新即<code>updateComponent</code>方法的调用。</p>
<p><code>updateComponent</code>方法的定义是：</p>
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
<p>完成视图的更新工作事实上就是调用了<code>vm._update</code>方法，这个方法接收的第一个参数是刚生成的<code>Vnode</code>，调用的<code>vm._update</code>方法的定义是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    // 新的vnode
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    // 如果需要diff的prevVnode不存在，那么就用新的vnode创建一个真实dom节点
    if (!prevVnode) {
      // initial render
      // 第一个参数为真实的node节点
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } else {
      // updates
      // 如果需要diff的prevVnode存在，那么首先对prevVnode和vnode进行diff,并将需要的更新的dom操作已patch的形式打到prevVnode上，并完成真实dom的更新工作
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.prototype._update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">vnode: VNode, hydrating?: boolean</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">if</span> (vm._isMounted) {
      callHook(vm, <span class="hljs-string">'beforeUpdate'</span>)
    }
    <span class="hljs-keyword">const</span> prevEl = vm.$el
    <span class="hljs-keyword">const</span> prevVnode = vm._vnode
    <span class="hljs-keyword">const</span> prevActiveInstance = activeInstance
    activeInstance = vm
    <span class="hljs-comment">// 新的vnode</span>
    vm._vnode = vnode
    <span class="hljs-comment">// Vue.prototype.__patch__ is injected in entry points</span>
    <span class="hljs-comment">// based on the rendering backend used.</span>
    <span class="hljs-comment">// 如果需要diff的prevVnode不存在，那么就用新的vnode创建一个真实dom节点</span>
    <span class="hljs-keyword">if</span> (!prevVnode) {
      <span class="hljs-comment">// initial render</span>
      <span class="hljs-comment">// 第一个参数为真实的node节点</span>
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, <span class="hljs-literal">false</span> <span class="hljs-comment">/* removeOnly */</span>,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// updates</span>
      <span class="hljs-comment">// 如果需要diff的prevVnode存在，那么首先对prevVnode和vnode进行diff,并将需要的更新的dom操作已patch的形式打到prevVnode上，并完成真实dom的更新工作</span>
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    <span class="hljs-comment">// update __vue__ reference</span>
    <span class="hljs-keyword">if</span> (prevEl) {
      prevEl.__vue__ = <span class="hljs-literal">null</span>
    }
    <span class="hljs-keyword">if</span> (vm.$el) {
      vm.$el.__vue__ = vm
    }
    <span class="hljs-comment">// if parent is an HOC, update its $el as well</span>
    <span class="hljs-keyword">if</span> (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
}</code></pre>
<p>在这个方法当中最为关键的就是<code>vm.__patch__</code>方法，这也是整个<code>virtaul-dom</code>当中最为核心的方法，主要完成了<code>prevVnode</code>和<code>vnode</code>的<code>diff</code>过程并根据需要操作的<code>vdom</code>节点打<code>patch</code>，最后生成新的真实<code>dom</code>节点并完成视图的更新工作。</p>
<p>接下来就让我们看下<code>vm.__patch__</code>里面到底发生了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        // 当oldVnode不存在时
        if (isUndef(oldVnode)) {
            // 创建新的节点
            createElm(vnode, insertedVnodeQueue, parentElm, refElm)
        } else {
            const isRealElement = isDef(oldVnode.nodeType)
            if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
            // patch existing root node
            // 对oldVnode和vnode进行diff，并对oldVnode打patch
            patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } 
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">oldVnode, vnode, hydrating, removeOnly, parentElm, refElm</span>) </span>{
        <span class="hljs-comment">// 当oldVnode不存在时</span>
        <span class="hljs-keyword">if</span> (isUndef(oldVnode)) {
            <span class="hljs-comment">// 创建新的节点</span>
            createElm(vnode, insertedVnodeQueue, parentElm, refElm)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">const</span> isRealElement = isDef(oldVnode.nodeType)
            <span class="hljs-keyword">if</span> (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
            <span class="hljs-comment">// patch existing root node</span>
            <span class="hljs-comment">// 对oldVnode和vnode进行diff，并对oldVnode打patch</span>
            patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } 
        }
    }</code></pre>
<p>在对<code>oldVnode</code>和<code>vnode</code>类型判断中有个<code>sameVnode</code>方法，这个方法决定了是否需要对<code>oldVnode</code>和<code>vnode</code>进行<code>diff</code>及<code>patch</code>的过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sameVnode (a, b) {
  return (
    a.key === b.key &amp;&amp;
    a.tag === b.tag &amp;&amp;
    a.isComment === b.isComment &amp;&amp;
    isDef(a.data) === isDef(b.data) &amp;&amp;
    sameInputType(a, b)
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameVnode</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> (
    a.key === b.key &amp;&amp;
    a.tag === b.tag &amp;&amp;
    a.isComment === b.isComment &amp;&amp;
    isDef(a.data) === isDef(b.data) &amp;&amp;
    sameInputType(a, b)
  )
}</code></pre>
<p><strong><code>sameVnode</code>会对传入的2个<code>vnode</code>进行基本属性的比较，只有当基本属性相同的情况下才认为这个2个<code>vnode</code>只是局部发生了更新，然后才会对这2个<code>vnode</code>进行<code>diff</code>，如果2个<code>vnode</code>的基本属性存在不一致的情况，那么就会直接跳过<code>diff</code>的过程，进而依据<code>vnode</code>新建一个真实的dom，同时删除老的<code>dom</code>节点。</strong></p>
<p><code>vnode</code>基本属性的定义可以参见源码:<code>src/vdom/vnode.js</code>里面对于<code>vnode</code>的定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (
    tag?: string,
    data?: VNodeData,         // 关于这个节点的data值，包括attrs,style,hook等
    children?: ?Array<VNode>, // 子vdom节点
    text?: string,        // 文本内容
    elm?: Node,           // 真实的dom节点
    context?: Component,  // 创建这个vdom的上下文
    componentOptions?: VNodeComponentOptions
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.functionalContext = undefined
    this.key = data &amp;&amp; data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span> (
    tag?: string,
    data?: VNodeData,         // 关于这个节点的data值，包括attrs,style,hook等
    children?: ?Array&lt;VNode&gt;, // 子vdom节点
    text?: string,        // 文本内容
    elm?: Node,           // 真实的dom节点
    context?: Component,  // 创建这个vdom的上下文
    componentOptions?: VNodeComponentOptions
  ) {
    <span class="hljs-keyword">this</span>.tag = tag
    <span class="hljs-keyword">this</span>.data = data
    <span class="hljs-keyword">this</span>.children = children
    <span class="hljs-keyword">this</span>.text = text
    <span class="hljs-keyword">this</span>.elm = elm
    <span class="hljs-keyword">this</span>.ns = <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">this</span>.context = context
    <span class="hljs-keyword">this</span>.functionalContext = <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">this</span>.key = data &amp;&amp; data.key
    <span class="hljs-keyword">this</span>.componentOptions = componentOptions
    <span class="hljs-keyword">this</span>.componentInstance = <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">this</span>.parent = <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">this</span>.raw = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.isStatic = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.isRootInsert = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.isComment = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.isCloned = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.isOnce = <span class="hljs-literal">false</span>
  }

  <span class="hljs-comment">// DEPRECATED: alias for componentInstance for backwards compat.</span>
  <span class="hljs-comment">/* istanbul ignore next */</span>
  get child (): Component | <span class="hljs-keyword">void</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.componentInstance
  }
}</code></pre>
<p>每一个<code>vnode</code>都映射到一个真实的<code>dom</code>节点上。其中几个比较重要的属性:</p>
<ul>
<li><p><code>tag</code> 属性即这个<code>vnode</code>的标签属性</p></li>
<li><p><code>data</code> 属性包含了最后渲染成真实<code>dom</code>节点后，节点上的<code>class</code>,<code>attribute</code>,<code>style</code>以及绑定的事件</p></li>
<li><p><code>children</code> 属性是<code>vnode</code>的子节点</p></li>
<li><p><code>text</code> 属性是文本属性</p></li>
<li><p><code>elm</code> 属性为这个<code>vnode</code>对应的真实<code>dom</code>节点</p></li>
<li><p><code>key</code> 属性是<code>vnode</code>的标记，在<code>diff</code>过程中可以提高<code>diff</code>的效率，后文有讲解</p></li>
</ul>
<p>比如，我定义了一个<code>vnode</code>，它的数据结构是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
        tag: 'div'
        data: {
            id: 'app',
            class: 'page-box'
        },
        children: [
            {
                tag: 'p',
                text: 'this is demo'
            }
        ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    {
        <span class="hljs-attr">tag</span>: <span class="hljs-string">'div'</span>
        data: {
            <span class="hljs-attr">id</span>: <span class="hljs-string">'app'</span>,
            <span class="hljs-attr">class</span>: <span class="hljs-string">'page-box'</span>
        },
        <span class="hljs-attr">children</span>: [
            {
                <span class="hljs-attr">tag</span>: <span class="hljs-string">'p'</span>,
                <span class="hljs-attr">text</span>: <span class="hljs-string">'this is demo'</span>
            }
        ]
    }</code></pre>
<p>最后渲染出的实际的<code>dom</code>结构就是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <div id=&quot;app&quot; class=&quot;page-box&quot;>
       <p>this is demo</p>
   </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   &lt;div id=<span class="hljs-string">"app"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"page-box"</span>&gt;
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>this is demo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
   &lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>让我们再回到<code>patch</code>函数当中，<strong>在当<code>oldVnode</code>不存在的时候</strong>，这个时候是<code>root节点</code>初始化的过程，因此调用了<code>createElm(vnode, insertedVnodeQueue, parentElm, refElm)</code>方法去创建一个新的节点。<strong>而当<code>oldVnode</code>是<code>vnode</code>且<code>sameVnode(oldVnode, vnode)</code>2个节点的基本属性相同</strong>，那么就进入了2个节点的<code>diff</code>过程。</p>
<p><code>diff</code>的过程主要是通过调用<code>patchVnode</code>方法进行的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchVnode</span>(<span class="hljs-params">oldVnode, vnode, insertedVnodeQueue, removeOnly</span>) </span>{
    ...
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isDef(data) &amp;&amp; isPatchable(vnode)) {
      // cbs保存了hooks钩子函数: 'create', 'activate', 'update', 'remove', 'destroy'
      // 取出cbs保存的update钩子函数，依次调用，更新attrs/style/class/events/directives/refs等属性
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef(i = data.hook) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (isDef(data) &amp;&amp; isPatchable(vnode)) {
      <span class="hljs-comment">// cbs保存了hooks钩子函数: 'create', 'activate', 'update', 'remove', 'destroy'</span>
      <span class="hljs-comment">// 取出cbs保存的update钩子函数，依次调用，更新attrs/style/class/events/directives/refs等属性</span>
      <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      <span class="hljs-keyword">if</span> (isDef(i = data.hook) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode)
    }</code></pre>
<p>更新真实<code>dom</code>节点的<code>data</code>属性，相当于对<code>dom</code>节点进行了预处理的操作</p>
<p>接下来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    const elm = vnode.elm = oldVnode.elm
    const oldCh = oldVnode.children
    const ch = vnode.children
    // 如果vnode没有文本节点
    if (isUndef(vnode.text)) {
      // 如果oldVnode的children属性存在且vnode的属性也存在
      if (isDef(oldCh) &amp;&amp; isDef(ch)) {
        // updateChildren，对子节点进行diff
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        // 如果oldVnode的text存在，那么首先清空text的内容
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        // 然后将vnode的children添加进去
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        // 删除elm下的oldchildren
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        // oldVnode有子节点，而vnode没有，那么就清空这个节点
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      // 如果oldVnode和vnode文本属性不同，那么直接更新真是dom节点的文本元素
      nodeOps.setTextContent(elm, vnode.text)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    ...
    const elm = vnode.elm = oldVnode.elm
    <span class="hljs-keyword">const</span> oldCh = oldVnode.children
    <span class="hljs-keyword">const</span> ch = vnode.children
    <span class="hljs-comment">// 如果vnode没有文本节点</span>
    <span class="hljs-keyword">if</span> (isUndef(vnode.text)) {
      <span class="hljs-comment">// 如果oldVnode的children属性存在且vnode的属性也存在</span>
      <span class="hljs-keyword">if</span> (isDef(oldCh) &amp;&amp; isDef(ch)) {
        <span class="hljs-comment">// updateChildren，对子节点进行diff</span>
        <span class="hljs-keyword">if</span> (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(ch)) {
        <span class="hljs-comment">// 如果oldVnode的text存在，那么首先清空text的内容</span>
        <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
        <span class="hljs-comment">// 然后将vnode的children添加进去</span>
        addVnodes(elm, <span class="hljs-literal">null</span>, ch, <span class="hljs-number">0</span>, ch.length - <span class="hljs-number">1</span>, insertedVnodeQueue)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldCh)) {
        <span class="hljs-comment">// 删除elm下的oldchildren</span>
        removeVnodes(elm, oldCh, <span class="hljs-number">0</span>, oldCh.length - <span class="hljs-number">1</span>)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) {
        <span class="hljs-comment">// oldVnode有子节点，而vnode没有，那么就清空这个节点</span>
        nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldVnode.text !== vnode.text) {
      <span class="hljs-comment">// 如果oldVnode和vnode文本属性不同，那么直接更新真是dom节点的文本元素</span>
      nodeOps.setTextContent(elm, vnode.text)
    }</code></pre>
<p>这其中的<code>diff</code>过程中又分了好几种情况，<code>oldCh</code>为<code>oldVnode</code>的子节点，<code>ch</code>为<code>Vnode</code>的子节点：</p>
<ol>
<li><p>首先进行文本节点的判断，若<code>oldVnode.text !== vnode.text</code>，那么就会直接进行文本节点的替换；</p></li>
<li><p>在<code>vnode</code>没有文本节点的情况下，进入子节点的<code>diff</code>；</p></li>
<li><p>当<code>oldCh</code>和<code>ch</code>都存在且不相同的情况下，调用<code>updateChildren</code>对子节点进行<code>diff</code>；</p></li>
<li><p>若<code>oldCh</code>不存在，<code>ch</code>存在，首先清空<code>oldVnode</code>的文本节点，同时调用<code>addVnodes</code>方法将<code>ch</code>添加到<code>elm</code>真实<code>dom</code>节点当中；</p></li>
<li><p>若<code>oldCh</code>存在，<code>ch</code>不存在，则删除<code>elm</code>真实节点下的<code>oldCh</code>子节点；</p></li>
<li><p>若<code>oldVnode</code>有文本节点，而<code>vnode</code>没有，那么就清空这个文本节点。</p></li>
</ol>
<p>这里着重分析下<code>updateChildren</code>方法，它也是整个<code>diff</code>过程中最重要的环节:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    // 为oldCh和newCh分别建立索引，为之后遍历的依据
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, elmToMove, refElm
    
    // 直到oldCh或者newCh被遍历完后跳出循环
    while (oldStartIdx <= oldEndIdx &amp;&amp; newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
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
        // 插入到老的开始节点的前面
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        // 如果以上条件都不满足，那么这个时候开始比较key值，首先建立key和index索引的对应关系
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
        // 如果idxInOld不存在
        // 1. newStartVnode上存在这个key,但是oldKeyToIdx中不存在
        // 2. newStartVnode上并没有设置key属性
        if (isUndef(idxInOld)) { // New element
          // 创建新的dom节点
          // 插入到oldStartVnode.elm前面
          // 参见createElm方法
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } else {
          elmToMove = oldCh[idxInOld]
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' &amp;&amp; !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            )
          
          // 将找到的key一致的oldVnode再和newStartVnode进行diff
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined
            // 移动node节点
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } else {
            // same key but different element. treat as new element
            // 创建新的dom节点
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    // 如果最后遍历的oldStartIdx大于oldEndIdx的话
    if (oldStartIdx > oldEndIdx) {        // 如果是老的vdom先被遍历完
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      // 添加newVnode中剩余的节点到parentElm中
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) { // 如果是新的vdom先被遍历完，则删除oldVnode里面所有的节点
      // 删除剩余的节点
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span> (<span class="hljs-params">parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly</span>) </span>{
    <span class="hljs-comment">// 为oldCh和newCh分别建立索引，为之后遍历的依据</span>
    <span class="hljs-keyword">let</span> oldStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> newStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> oldEndVnode = oldCh[oldEndIdx]
    <span class="hljs-keyword">let</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> newStartVnode = newCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> newEndVnode = newCh[newEndIdx]
    <span class="hljs-keyword">let</span> oldKeyToIdx, idxInOld, elmToMove, refElm
    
    <span class="hljs-comment">// 直到oldCh或者newCh被遍历完后跳出循环</span>
    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
      <span class="hljs-keyword">if</span> (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] <span class="hljs-comment">// Vnode has been moved left</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
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
        <span class="hljs-comment">// 插入到老的开始节点的前面</span>
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 如果以上条件都不满足，那么这个时候开始比较key值，首先建立key和index索引的对应关系</span>
        <span class="hljs-keyword">if</span> (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : <span class="hljs-literal">null</span>
        <span class="hljs-comment">// 如果idxInOld不存在</span>
        <span class="hljs-comment">// 1. newStartVnode上存在这个key,但是oldKeyToIdx中不存在</span>
        <span class="hljs-comment">// 2. newStartVnode上并没有设置key属性</span>
        <span class="hljs-keyword">if</span> (isUndef(idxInOld)) { <span class="hljs-comment">// New element</span>
          <span class="hljs-comment">// 创建新的dom节点</span>
          <span class="hljs-comment">// 插入到oldStartVnode.elm前面</span>
          <span class="hljs-comment">// 参见createElm方法</span>
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } <span class="hljs-keyword">else</span> {
          elmToMove = oldCh[idxInOld]
          <span class="hljs-comment">/* istanbul ignore if */</span>
          <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !elmToMove) {
            warn(
              <span class="hljs-string">'It seems there are duplicate keys that is causing an update error. '</span> +
              <span class="hljs-string">'Make sure each v-for item has a unique key.'</span>
            )
          
          <span class="hljs-comment">// 将找到的key一致的oldVnode再和newStartVnode进行diff</span>
          <span class="hljs-keyword">if</span> (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = <span class="hljs-literal">undefined</span>
            <span class="hljs-comment">// 移动node节点</span>
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// same key but different element. treat as new element</span>
            <span class="hljs-comment">// 创建新的dom节点</span>
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    <span class="hljs-comment">// 如果最后遍历的oldStartIdx大于oldEndIdx的话</span>
    <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {        <span class="hljs-comment">// 如果是老的vdom先被遍历完</span>
      refElm = isUndef(newCh[newEndIdx + <span class="hljs-number">1</span>]) ? <span class="hljs-literal">null</span> : newCh[newEndIdx + <span class="hljs-number">1</span>].elm
      <span class="hljs-comment">// 添加newVnode中剩余的节点到parentElm中</span>
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) { <span class="hljs-comment">// 如果是新的vdom先被遍历完，则删除oldVnode里面所有的节点</span>
      <span class="hljs-comment">// 删除剩余的节点</span>
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}</code></pre>
<p>在开始遍历<code>diff</code>前，首先给<code>oldCh</code>和<code>newCh</code>分别分配一个<code>startIndex</code>和<code>endIndex</code>来作为遍历的索引，当<code>oldCh</code>或者<code>newCh</code>遍历完后(遍历完的条件就是<code>oldCh</code>或者<code>newCh</code>的<code>startIndex &gt;= endIndex</code>)，就停止<code>oldCh</code>和<code>newCh</code>的<code>diff</code>过程。接下来通过实例来看下整个<code>diff</code>的过程(节点属性中不带<code>key</code>的情况):</p>
<ol>
<li><p>首先从第一个节点开始比较，不管是<code>oldCh</code>还是<code>newCh</code>的起始或者终止节点都不存在<code>sameVnode</code>，同时节点属性中是不带<code>key</code>标记的，因此第一轮的<code>diff</code>完后，<code>newCh</code>的<code>startVnode</code>被添加到<code>oldStartVnode</code>的前面，同时<code>newStartIndex</code>前移一位；<br><span class="img-wrap"><img data-src="/img/bVQu4K?w=1402&amp;h=752" src="https://static.alili.tech/img/bVQu4K?w=1402&amp;h=752" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>第二轮的<code>diff</code>中，满足<code>sameVnode(oldStartVnode, newStartVnode)</code>，因此对这2个<code>vnode</code>进行<code>diff</code>，最后将<code>patch</code>打到<code>oldStartVnode</code>上，同时<code>oldStartVnode</code>和<code>newStartIndex</code>都向前移动一位<br><span class="img-wrap"><img data-src="/img/bVQu9d?w=1362&amp;h=736" src="https://static.alili.tech/img/bVQu9d?w=1362&amp;h=736" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>第三轮的<code>diff</code>中，满足<code>sameVnode(oldEndVnode, newStartVnode)</code>，那么首先对<code>oldEndVnode</code>和<code>newStartVnode</code>进行<code>diff</code>，并对<code>oldEndVnode</code>进行<code>patch</code>，并完成<code>oldEndVnode</code>移位的操作，最后<code>newStartIndex</code>前移一位，<code>oldStartVnode</code>后移一位；<br><span class="img-wrap"><img data-src="/img/bVQu44?w=1342&amp;h=820" src="https://static.alili.tech/img/bVQu44?w=1342&amp;h=820" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>第四轮的<code>diff</code>中，过程同步骤3；<br><span class="img-wrap"><img data-src="/img/bVQu5b?w=1322&amp;h=1012" src="https://static.alili.tech/img/bVQu5b?w=1322&amp;h=1012" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>第五轮的<code>diff</code>中，同过程1；<br><span class="img-wrap"><img data-src="/img/bVQu5c?w=1336&amp;h=1090" src="https://static.alili.tech/img/bVQu5c?w=1336&amp;h=1090" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>遍历的过程结束后，<code>newStartIdx &gt; newEndIdx</code>，说明此时<code>oldCh</code>存在多余的节点，那么最后就需要将这些多余的节点删除。<br><span class="img-wrap"><img data-src="/img/bVQu9m?w=1344&amp;h=1134" src="https://static.alili.tech/img/bVQu9m?w=1344&amp;h=1134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li>
</ol>
<p>在<code>vnode</code>不带<code>key</code>的情况下，每一轮的<code>diff</code>过程当中都是<code>起始</code>和<code>结束</code>节点进行比较，直到<code>oldCh</code>或者<code>newCh</code>被遍历完。而当为<code>vnode</code>引入<code>key</code>属性后，在每一轮的<code>diff</code>过程中，当<code>起始</code>和<code>结束</code>节点都没有找到<code>sameVnode</code>时，首先对<code>oldCh</code>中进行<code>key</code>值与索引的映射:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : <span class="hljs-literal">null</span></code></pre>
<p><code>createKeyToOldIdx</code>方法，用以将<code>oldCh</code>中的<code>key</code>属性作为<code>键</code>，而对应的节点的索引作为<code>值</code>。然后再判断在<code>newStartVnode</code>的属性中是否有<code>key</code>，且是否在<code>oldKeyToIndx</code>中找到对应的节点。</p>
<ol><li><p>如果不存在这个<code>key</code>，那么就将这个<code>newStartVnode</code>作为新的节点创建且插入到原有的<code>root</code>的子节点中:</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isUndef(idxInOld)) { // New element
    // 创建新的dom节点
    // 插入到oldStartVnode.elm前面
    // 参见createElm方法
    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (isUndef(idxInOld)) { <span class="hljs-comment">// New element</span>
    <span class="hljs-comment">// 创建新的dom节点</span>
    <span class="hljs-comment">// 插入到oldStartVnode.elm前面</span>
    <span class="hljs-comment">// 参见createElm方法</span>
    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } </code></pre>
<ol><li><p>如果存在这个<code>key</code>，那么就取出<code>oldCh</code>中的存在这个<code>key</code>的<code>vnode</code>，然后再进行<code>diff</code>的过程:</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elmToMove = oldCh[idxInOld]
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' &amp;&amp; !elmToMove) {
          
          // 将找到的key一致的oldVnode再和newStartVnode进行diff
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            // 清空这个节点
            oldCh[idxInOld] = undefined
            // 移动node节点
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } else {
            // same key but different element. treat as new element
            // 创建新的dom节点
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">elmToMove = oldCh[idxInOld]
          <span class="hljs-comment">/* istanbul ignore if */</span>
          <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !elmToMove) {
          
          <span class="hljs-comment">// 将找到的key一致的oldVnode再和newStartVnode进行diff</span>
          <span class="hljs-keyword">if</span> (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            <span class="hljs-comment">// 清空这个节点</span>
            oldCh[idxInOld] = <span class="hljs-literal">undefined</span>
            <span class="hljs-comment">// 移动node节点</span>
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// same key but different element. treat as new element</span>
            <span class="hljs-comment">// 创建新的dom节点</span>
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }</code></pre>
<p>通过以上分析，给<code>vdom</code>上添加<code>key</code>属性后，遍历<code>diff</code>的过程中，当<code>起始点</code>, <code>结束点</code>的<code>搜寻</code>及<code>diff</code>出现还是无法匹配的情况下时，就会用<code>key</code>来作为唯一标识，来进行<code>diff</code>，这样就可以提高<code>diff</code>效率。</p>
<p>带有<code>Key</code>属性的<code>vnode</code>的<code>diff</code>过程可见下图：</p>
<p>注意在第一轮的<code>diff</code>过后<code>oldCh</code>上的<code>B节点</code>被删除了，但是<code>newCh</code>上的<code>B节点</code>上<code>elm</code>属性保持对<code>oldCh</code>上<code>B节点</code>的<code>elm</code>引用。<br><span class="img-wrap"><img data-src="/img/bVQu6N?w=1296&amp;h=652" src="https://static.alili.tech/img/bVQu6N?w=1296&amp;h=652" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVQu6Q?w=1348&amp;h=694" src="https://static.alili.tech/img/bVQu6Q?w=1348&amp;h=694" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVQu6U?w=1348&amp;h=800" src="https://static.alili.tech/img/bVQu6U?w=1348&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVQvbx?w=1308&amp;h=1006" src="https://static.alili.tech/img/bVQvbx?w=1308&amp;h=1006" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVQu6Y?w=1272&amp;h=1098" src="https://static.alili.tech/img/bVQu6Y?w=1272&amp;h=1098" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
virtual-dom(Vue实现)简析

## 原文链接
[https://segmentfault.com/a/1190000010090659](https://segmentfault.com/a/1190000010090659)


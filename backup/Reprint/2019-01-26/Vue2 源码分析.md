---
title: 'Vue2 源码分析' 
date: 2019-01-26 2:30:18
hidden: true
slug: cdzt7kpd40l
categories: [reprint]
---

{{< raw >}}

                    
<p>源码版本：<a href="https://github.com/vuejs/vue/tree/v2.1.10" rel="nofollow noreferrer" target="_blank">v2.1.10</a></p>
<h2 id="articleHeader0">分析目标</h2>
<p>通过阅读源码，对 Vue2 的基础运行机制有所了解，主要是：</p>
<ul>
<li><p>Vue2 中数据绑定的实现方式</p></li>
<li><p>Vue2 中对 Virtual DOM 机制的使用方式</p></li>
</ul>
<h2 id="articleHeader1">源码初见</h2>
<p>项目构建配置文件为 <code>build/config.js</code>，定位 vue.js 对应的入口文件为 <code>src/entries/web-runtime-with-compiler.js</code>，基于 <a href="http://rollupjs.org/" rel="nofollow noreferrer" target="_blank">rollup</a> 进行模块打包。</p>
<p>代码中使用 <a href="https://flowtype.org/" rel="nofollow noreferrer" target="_blank">flow</a> 进行接口类型标记和检查，在打包过程中移除这些标记。为了阅读代码方便，在  VS Code 中安装了插件 <a href="https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode" rel="nofollow noreferrer" target="_blank">Flow Language Support</a>，然后关闭工作区 JS 代码检查，这样界面就清爽很多了。</p>
<p>Vue 应用启动一般是通过 <code>new Vue({...})</code>，所以，先从该构造函数着手。</p>
<p>注：本文只关注 Vue 在浏览器端的应用，不涉及服务器端代码。</p>
<h2 id="articleHeader2">Vue 构造函数</h2>
<p>文件：<code>src/core/instance/index.js</code></p>
<p>该文件只是构造函数，Vue 原型对象的声明分散在当前目录的多个文件中：</p>
<ul>
<li><p>init.js：<code>._init()</code></p></li>
<li><p>state.js：<code>.$data</code> <code>.$set()</code> <code>.$delete()</code> <code>.$watch()</code></p></li>
<li><p>render.js：<code>._render()</code> ...</p></li>
<li><p>events.js：<code>.$on()</code> <code>.$once()</code> <code>.$off()</code> <code>.$emit()</code></p></li>
<li><p>lifecycle.js：<code>._mount()</code> <code>._update()</code> <code>.$forceUpdate()</code> <code>.$destroy()</code></p></li>
</ul>
<p>构造函数接收参数 <code>options</code> ，然后调用 <code>this._init(options)</code>。</p>
<p><code>._init()</code> 中进行初始化，其中会依次调用 lifecycle、events、render、state 模块中的初始化函数。</p>
<p>Vue2 中应该是为了代码更易管理，Vue 类的定义分散到了上面的多个文件中。</p>
<p>其中，对于 <code>Vue.prototype</code> 对象的定义，通过 mixin 的方式在入口文件 <code>core/index.js</code> 中依次调用。对于实例对象（代码中通常称为 <code>vm</code>）则通过 init 函数在 <code>vm._init()</code> 中依次调用。</p>
<h2 id="articleHeader3">Vue 公共接口</h2>
<p>文件：<code>src/core/index.js</code></p>
<p>这里调用了 <code>initGlobalAPI()</code> 来初始化 Vue 的公共接口，包括：</p>
<ul>
<li><p>Vue.util</p></li>
<li><p>Vue.set</p></li>
<li><p>Vue.delete</p></li>
<li><p>Vue.nextTick</p></li>
<li><p>Vue.options</p></li>
<li><p>Vue.use</p></li>
<li><p>Vue.mixin</p></li>
<li><p>Vue.extend</p></li>
<li><p>asset相关接口：配置在 <code>src/core/config.js</code> 中</p></li>
</ul>
<h2 id="articleHeader4">Vue 启动过程</h2>
<p>调用 <code>new Vue({...})</code> 后，在内部的 <code>._init()</code> 的最后，是调用 <code>.$mount()</code> 方法来“启动”。</p>
<p>在 <code>web-runtime-with-compiler.js</code> 和 <code>web-runtime.js</code> 中，定义了 <code>Vue.prototype.$mount()</code>。不过两个文件中的 <code>$mount()</code> 最终调用的是 <code>._mount()</code> 内部方法，定义在文件 <code>src/core/instance/lifecycle.js</code> 中。</p>
<p><strong>Vue.prototype._mount(el, hydrating)</strong></p>
<p>简化逻辑后的伪代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm = this
vm._watcher = new Watcher(vm, updateComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vm = <span class="hljs-keyword">this</span>
vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, updateComponent)</code></pre>
<p>接下来看 <code>Watcher</code>。</p>
<h2 id="articleHeader5">Watcher</h2>
<p>文件：<code>src/core/observer/watcher.js</code> </p>
<p>先看构造函数的简化逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：vm, expOrFn, cb, options
this.vm = vm
vm._watchers.push(this)
// 解析 options，略....
// 属性初始化，略....
this.getter = expOrFn // if `function`
this.value = this.lazy ? undefined : this.get()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 参数：vm, expOrFn, cb, options</span>
<span class="hljs-keyword">this</span>.vm = vm
vm._watchers.push(<span class="hljs-keyword">this</span>)
<span class="hljs-comment">// 解析 options，略....</span>
<span class="hljs-comment">// 属性初始化，略....</span>
<span class="hljs-keyword">this</span>.getter = expOrFn <span class="hljs-comment">// if `function`</span>
<span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy ? <span class="hljs-literal">undefined</span> : <span class="hljs-keyword">this</span>.get()</code></pre>
<p>由于缺省的 <code>lazy</code> 属性值为 <code>false</code>，接着看 <code>.get()</code> 的逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pushTarget(this) // !
value = this.getter.call(this.vm, this.vm)
popTarget()
this.cleanupDeps()
return value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pushTarget(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// !</span>
value = <span class="hljs-keyword">this</span>.getter.call(<span class="hljs-keyword">this</span>.vm, <span class="hljs-keyword">this</span>.vm)
popTarget()
<span class="hljs-keyword">this</span>.cleanupDeps()
<span class="hljs-keyword">return</span> value</code></pre>
<p>先看这里对 <code>getter</code> 的调用，返回到 <code>._mount()</code> 中，可以看到，是调用了 <code>vm._update(vm._render(), hydrating)</code>，涉及两个方法：</p>
<ul>
<li><p>vm._render()：返回虚拟节点（VNode）</p></li>
<li><p>vm._update()</p></li>
</ul>
<p>来看 <code>_update()</code> 的逻辑，这里应该是进行 Virtual DOM 的更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：vnode, hydrating
vm = this
prevEl = vm.$el
prevVnode = vm._vnode
prevActiveInstance = activeInstance
activeInstance = vm
vm._vnode = vnode
if (!prevVnode) {
  // 初次加载
  vm.$el = vm.__patch__(vm.$el, vnode, ...)
} else {
  // 更新
  vm.$el = vm.__patch__(prevVnode, vnode)
}
activeInstance = prevActiveInstance
// 后续属性配置，略...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 参数：vnode, hydrating</span>
vm = <span class="hljs-keyword">this</span>
prevEl = vm.$el
prevVnode = vm._vnode
prevActiveInstance = activeInstance
activeInstance = vm
vm._vnode = vnode
<span class="hljs-keyword">if</span> (!prevVnode) {
  <span class="hljs-comment">// 初次加载</span>
  vm.$el = vm.__patch__(vm.$el, vnode, ...)
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// 更新</span>
  vm.$el = vm.__patch__(prevVnode, vnode)
}
activeInstance = prevActiveInstance
<span class="hljs-comment">// 后续属性配置，略....</span></code></pre>
<p>参考 Virtual DOM 的一般逻辑，这里是差不多的处理过程，不再赘述。</p>
<p>综上，这里的 watcher 主要作用应该是在数据发生变更时，触发重新渲染和更新视图的处理：<code>vm._update(vm._render())</code>。</p>
<p>接下来，我们看下 watcher 是如何发挥作用的，参考 Vue 1.0 的经验，下面应该是关于依赖收集、数据绑定方面的细节了，而这一部分，和 Vue 1.0 差别不大。</p>
<h2 id="articleHeader6">数据绑定</h2>
<p><code>watcher.get()</code> 中调用的 <code>pushTarget()</code> 和 <code>popTarget()</code> 来自文件：<code>src/core/observer/dep.js</code>。</p>
<p><code>pushTarget()</code> 和 <code>popTarget()</code> 两个方法，用于处理 <code>Dep.target</code>，显然 <code>Dep.target</code> 在 <code>wather.getter</code> 的调用过程中会用到，调用时会涉及到依赖收集，从而建立起数据绑定的关系。</p>
<p>在 <code>Dep</code> 类的 <code>.dep()</code> 方法中用到了 <code>Dep.target</code>，调用方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dep.target.addDep(this)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Dep.target.addDep(<span class="hljs-keyword">this</span>)</code></pre>
<p>可以想见，在使用数据进行渲染的过程中，会对数据属性进行“读”操作，从而触发 <code>dep.depend()</code>，进而收集到这个依赖关系。下面来找一下这样的调用的位置。</p>
<p>在 <code>state.js</code> 中找到一处，<code>makeComputedGetter()</code> 函数中通过 <code>watcher.depend()</code> 间接调用了 <code>dep.depend()</code>。不过 computedGetter 应该不是最主要的地方，根据 Vue 1.0 的经验，还是要找对数据进行“数据劫持”的地方，应该是<code>defineReactive()</code>。</p>
<p><code>defineReactive()</code> 定义在文件 <code>src/core/observer/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：obj, key, val, customSetter?
dep = new Dep()
childOb = observe(val)
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function () {
    // 略，调用了 dep.depend()
  },
  set: function () {
    // 略，调用 dep.notify()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 参数：obj, key, val, customSetter?</span>
dep = <span class="hljs-keyword">new</span> Dep()
childOb = observe(val)
<span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 略，调用了 dep.depend()</span>
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 略，调用 dep.notify()</span>
  }
})</code></pre>
<p>结合 Vue 1.0 经验，这里应该就是数据劫持的关键了。数据原有的属性被重新定义，属性的 <code>get()</code> 被调用时，会通过 <code>dep.depend()</code> 收集依赖关系，记录到 vm 中；而在 <code>set()</code> 被调用时，则会判断属性值是否发生变更，如果发生变更，则通过 <code>dep.notify()</code> 来通知 vm，从而触发 vm 的更新操作，实现 UI 与数据的同步，这也就是数据绑定后的效果了。</p>
<p>回过头来看 <code>state.js</code>，是在 <code>initProps()</code> 中调用了 <code>defineReactive()</code>。而 <code>initProps()</code> 在 <code>initState()</code> 中调用，后者则是在 <code>Vue.prototype._init()</code> 中被调用。</p>
<p>不过最常用的其实是在 <code>initData()</code> 中，对初始传入的 <code>data</code> 进行劫持，不过里面的过程稍微绕一些，是将这里的 data 赋值到 <code>vm._data</code> 并且代理到了 <code>vm</code> 上，进一步的处理还涉及 <code>observe()</code> 和 <code>Observer</code> 类。这里不展开了。</p>
<p>综上，数据绑定的实现过程为：</p>
<ul>
<li><p>初始化：new Vue() -&gt; vm._init()</p></li>
<li><p>数据劫持：initState(vm) -&gt; initProps(), initData() -&gt; dep.depend()</p></li>
<li><p>依赖收集：vm.$mount() -&gt; vm._mount() -&gt; new Watcher() -&gt; vm._render()</p></li>
</ul>
<h2 id="articleHeader7">渲染</h2>
<p>首先来看 <code>initRender()</code>，这里在 vm 上初始化了两个与创建虚拟元素相关的方法：</p>
<ul>
<li><p>vm._c()</p></li>
<li><p>vm.$createElement()</p></li>
</ul>
<p>其内部实现都是调用 <code>createElement()</code>，来自文件：<code>src/core/vdom/create-element.js</code>。</p>
<p>而在 <code>renderMixin()</code> 中初始化了 <code>Vue.prototype._render()</code> 方法，其中创建 vnode 的逻辑为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render = vm.$options.render
try {
  vnode = render.call(vm._renderProxy, vm.$createElement)
} catch (e) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render = vm.$options.render
<span class="hljs-keyword">try</span> {
  vnode = render.call(vm._renderProxy, vm.$createElement)
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>这里传入 <code>render()</code> 是一个会返回 vnode 的函数。</p>
<p>接下来看 <code>vm._update()</code> 的逻辑，这部分在前面有介绍，初次渲染时是通过调用 <code>vm.__patch__()</code> 来实现。那么 <code>vm.__patch__()</code> 是在哪里实现的呢？在 <code>_update()</code> 代码中有句注释，提到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// Vue.prototype.__patch__ is injected in entry points</span>
    <span class="hljs-comment">// based on the rendering backend used.</span></code></pre>
<p>在文件 <code>web-runtime.js</code> 中，找到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.__patch__ = inBrowser ? patch : noop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Vue.prototype.__patch__ = inBrowser ? patch : noop</code></pre>
<p>显然示在浏览器环境下使用 <code>patch()</code>，来自：<code>src/platforms/web/runtime/patch.js</code>，其实现是通过 <code>createPatchFunction()</code>，来自文件 <code>src/core/vdom/patch</code>。</p>
<p>OK，以上线索都指向了 vdom 相关的模块，也就是说，显然是 vdom 也就是 Virtual DOM 参与了渲染和更新。</p>
<p>不过还有个问题没有解决，那就是原始的字符串模块，是如何转成用于 Virtual DOM 创建的函数调用的呢？这里会有一个解析的过程。</p>
<p>回到入口文件 <code>web-runtime-with-compiler.js</code>，在 <code>Vue.prototype.$mount()</code> 中，有一个关键的调用：<code>compileToFunctions(template, ...)</code>，<code>template</code> 变量值为传入的参数解析得到的模板内容。</p>
<h2 id="articleHeader8">模板解析</h2>
<p>文件：<code>src/platforms/web/compiler/index.js</code></p>
<p>函数 <code>compileToFunctions()</code> 的基本逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：template, options?, vm?
res = {}
compiled = compile(template, options)
res.render = makeFunction(compiled.render)
// 拷贝数组元素：
// res.staticRenderFns <= compiled.staticRenderFns
return res" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 参数：template, options?, vm?</span>
res = {}
compiled = compile(template, options)
res.render = makeFunction(compiled.render)
<span class="hljs-comment">// 拷贝数组元素：</span>
<span class="hljs-comment">// res.staticRenderFns &lt;= compiled.staticRenderFns</span>
<span class="hljs-keyword">return</span> res</code></pre>
<p>这里对模板进行了编译（<code>compile()</code>），最终返回了根据编译结果得到的 <code>render()、staticRenderFns</code>。再看 <code>web-runtime-with-compiler.js</code> 中 <code>Vue.prototype.$mount()</code> 的逻辑，则是将这里得到的结果写入了 <code>vm.$options</code> 中，也就是说，后面 <code>vm._render()</code> 中会使用这里的 <code>render()</code>。</p>
<p>再来看 <code>compile()</code> 函数，这里是实现模板解析的核心，来做文件 <code>src/compiler/index.js</code>，基本逻辑为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：template, options
ast = parse(template.trim(), options)
optimize(ast, options)
code = generate(ast, options)
return {
  ast,
  render: code.render,
  staticRenderFns: code.staticRenderFns
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 参数：template, options</span>
ast = parse(template.trim(), options)
optimize(ast, options)
code = generate(ast, options)
<span class="hljs-keyword">return</span> {
  ast,
  <span class="hljs-attr">render</span>: code.render,
  <span class="hljs-attr">staticRenderFns</span>: code.staticRenderFns
}</code></pre>
<p>逻辑很清晰，首先从模板进行解析得到抽象语法树（ast），进行优化，最后生成结果代码。整个过程中肯定会涉及到 Vue 的语法，包括指令、组件嵌套等等，不仅仅是得到构建 Virtual DOM 的代码。</p>
<p>需要注意的是，编译得到 render 其实是代码文本，通过 <code>new Function(code)</code> 的方式转为函数。</p>
<h2 id="articleHeader9">总结</h2>
<p>Vue2 相比 Vue1 一个主要的区别在于引入了 Virtual DOM，但其 MVVM 的特性还在，也就是说仍有一套数据绑定的机制。</p>
<p>此外，Virtual DOM 的存在，使得原有的视图模板需要转变为函数调用的模式，从而在每次有更新时可以重新调用得到新的 vnode，从而应用 Virtual DOM 的更新机制。为此，Vue2 实现了编译器（compiler），这也意味着 Vue2 的模板可以是纯文本，而不必是 DOM 元素。</p>
<p>Vue2 基本运行机制总结为：</p>
<ul>
<li><p>文本模板，编译得到生成 vnode 的函数（render），该过程中会识别并记录 Vue 的指令和其他语法</p></li>
<li><p>new Vue() 得到 vm 对象，其中传入的数据会进行数据劫持处理，从而可以收集依赖，实现数据绑定</p></li>
<li><p>渲染过程是将所有数据交由渲染函数（render）进行调用得到 vnode，应该 Virtual DOM 的机制实现初始渲染和更新</p></li>
</ul>
<h2 id="articleHeader10">写在最后</h2>
<p>对 Vue2 的源码分析，是基于我之前对 Vue1 的分析和对 Virtual DOM 的了解，见【链接】中之前的文章。</p>
<p>水平有限，错漏难免，欢迎指正。</p>
<p>感谢阅读！</p>
<h2 id="articleHeader11">链接</h2>
<ul>
<li><p><a href="http://www.jianshu.com/p/d3a15a1f94a0" rel="nofollow noreferrer" target="_blank">Vue 双向数据绑定原理分析 - luobotang</a></p></li>
<li><p><a href="http://www.jianshu.com/p/bef1c1ee5a0e" rel="nofollow noreferrer" target="_blank">一起理解 Virtual DOM - luobotang</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 源码分析

## 原文链接
[https://segmentfault.com/a/1190000008488543](https://segmentfault.com/a/1190000008488543)


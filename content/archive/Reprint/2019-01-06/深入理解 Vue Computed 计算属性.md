---
title: '深入理解 Vue Computed 计算属性' 
date: 2019-01-06 2:30:10
hidden: true
slug: 1t2qhj3cuqv
categories: [reprint]
---

{{< raw >}}

                    
<p>Computed 计算属性是 Vue 中常用的一个功能，但你理解它是怎么工作的吗？</p>
<p>拿官网简单的例子来看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
  <p>Original message: &quot;"{{" message "}}"&quot;</p>
  <p>Computed reversed message: &quot;"{{" reversedMessage "}}"&quot;</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Original message: ""{{" message "}}""<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Computed reversed message: ""{{" reversedMessage "}}""<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello'</span>
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-comment">// a computed getter</span>
    reversedMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// `this` points to the vm instance</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
    }
  }
})</code></pre>
<h2 id="articleHeader0">Situation</h2>
<p>Vue 里的 Computed 属性非常频繁的被使用到，但并不是很清楚它的实现原理。比如：计算属性如何与属性建立依赖关系？属性发生变化又如何通知到计算属性重新计算？</p>
<p>关于如何建立依赖关系，我的第一个想到的就是语法解析，但这样太浪费性能，因此排除，第二个想到的就是利用 JavaScript 单线程的原理和 Vue 的 Getter 设计，通过一个简单的发布订阅，就可以在一次计算属性求值的过程中收集到相关依赖。</p>
<p>因此接下来的任务就是从 Vue 源码一步步分析 Computed 的实现原理。</p>
<h2 id="articleHeader1">Task</h2>
<p>分析依赖收集实现原理，分析动态计算实现原理。</p>
<h2 id="articleHeader2">Action</h2>
<p>data 属性初始化 getter setter：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/observer/index.js

// 这里开始转换 data 的 getter setter，原始值已存入到 __ob__ 属性中
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter () {
    const value = getter ? getter.call(obj) : val
    // 判断是否处于依赖收集状态
    if (Dep.target) {
      // 建立依赖关系
      dep.depend()
      ...
    }
    return value
  },
  set: function reactiveSetter (newVal) {
    ...
    // 依赖发生变化，通知到计算属性重新计算
    dep.notify()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/observer/index.js</span>

<span class="hljs-comment">// 这里开始转换 data 的 getter setter，原始值已存入到 __ob__ 属性中</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
    <span class="hljs-comment">// 判断是否处于依赖收集状态</span>
    <span class="hljs-keyword">if</span> (Dep.target) {
      <span class="hljs-comment">// 建立依赖关系</span>
      dep.depend()
      ...
    }
    <span class="hljs-keyword">return</span> value
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
    ...
    <span class="hljs-comment">// 依赖发生变化，通知到计算属性重新计算</span>
    dep.notify()
  }
})</code></pre>
<p>computed 计算属性初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/state.js

// 初始化计算属性
function initComputed (vm: Component, computed: Object) {
  ...
  // 遍历 computed 计算属性
  for (const key in computed) {
    ...
    // 创建 Watcher 实例
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)

    // 创建属性 vm.reversedMessage，并将提供的函数将用作属性 vm.reversedMessage 的 getter，
    // 最终 computed 与 data 会一起混合到 vm 下，所以当 computed 与 data 存在重名属性时会抛出警告
    defineComputed(vm, key, userDef)
    ...
  }
}

export function defineComputed (target: any, key: string, userDef: Object | Function) {
  ...
  // 创建 get set 方法
  sharedPropertyDefinition.get = createComputedGetter(key)
  sharedPropertyDefinition.set = noop
  ...
  // 创建属性 vm.reversedMessage，并初始化 getter setter
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        // watcher 暴露 evaluate 方法用于取值操作
        watcher.evaluate()
      }
      // 同第1步，判断是否处于依赖收集状态
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/state.js</span>

<span class="hljs-comment">// 初始化计算属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed</span> (<span class="hljs-params">vm: Component, computed: Object</span>) </span>{
  ...
  <span class="hljs-comment">// 遍历 computed 计算属性</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> computed) {
    ...
    <span class="hljs-comment">// 创建 Watcher 实例</span>
    <span class="hljs-comment">// create internal watcher for the computed property.</span>
    watchers[key] = <span class="hljs-keyword">new</span> Watcher(vm, getter || noop, noop, computedWatcherOptions)

    <span class="hljs-comment">// 创建属性 vm.reversedMessage，并将提供的函数将用作属性 vm.reversedMessage 的 getter，</span>
    <span class="hljs-comment">// 最终 computed 与 data 会一起混合到 vm 下，所以当 computed 与 data 存在重名属性时会抛出警告</span>
    defineComputed(vm, key, userDef)
    ...
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineComputed</span> (<span class="hljs-params">target: any, key: string, userDef: Object | Function</span>) </span>{
  ...
  <span class="hljs-comment">// 创建 get set 方法</span>
  sharedPropertyDefinition.get = createComputedGetter(key)
  sharedPropertyDefinition.set = noop
  ...
  <span class="hljs-comment">// 创建属性 vm.reversedMessage，并初始化 getter setter</span>
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, sharedPropertyDefinition)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createComputedGetter</span> (<span class="hljs-params">key</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> watcher = <span class="hljs-keyword">this</span>._computedWatchers &amp;&amp; <span class="hljs-keyword">this</span>._computedWatchers[key]
    <span class="hljs-keyword">if</span> (watcher) {
      <span class="hljs-keyword">if</span> (watcher.dirty) {
        <span class="hljs-comment">// watcher 暴露 evaluate 方法用于取值操作</span>
        watcher.evaluate()
      }
      <span class="hljs-comment">// 同第1步，判断是否处于依赖收集状态</span>
      <span class="hljs-keyword">if</span> (Dep.target) {
        watcher.depend()
      }
      <span class="hljs-keyword">return</span> watcher.value
    }
  }
}</code></pre>
<p>无论是属性还是计算属性，都会生成一个对应的 watcher 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/watcher.js

// 当通过 vm.reversedMessage 获取计算属性时，就会进到这个 getter 方法
get () {
  // this 指的是 watcher 实例
  // 将当前 watcher 实例暂存到 Dep.target，这就表示开启了依赖收集任务
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    // 在执行 vm.reversedMessage 的函调函数时，会触发属性（步骤1）和计算属性（步骤2）的 getter
    // 在这个执行过程中，就可以收集到 vm.reversedMessage 的依赖了
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, `getter for watcher &quot;${this.expression}&quot;`)
    } else {
      throw e
    }
  } finally {
    if (this.deep) {
      traverse(value)
    }
    // 结束依赖收集任务
    popTarget()
    this.cleanupDeps()
  }
  return value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/watcher.js</span>

<span class="hljs-comment">// 当通过 vm.reversedMessage 获取计算属性时，就会进到这个 getter 方法</span>
get () {
  <span class="hljs-comment">// this 指的是 watcher 实例</span>
  <span class="hljs-comment">// 将当前 watcher 实例暂存到 Dep.target，这就表示开启了依赖收集任务</span>
  pushTarget(<span class="hljs-keyword">this</span>)
  <span class="hljs-keyword">let</span> value
  <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">this</span>.vm
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 在执行 vm.reversedMessage 的函调函数时，会触发属性（步骤1）和计算属性（步骤2）的 getter</span>
    <span class="hljs-comment">// 在这个执行过程中，就可以收集到 vm.reversedMessage 的依赖了</span>
    value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.user) {
      handleError(e, vm, <span class="hljs-string">`getter for watcher "<span class="hljs-subst">${<span class="hljs-keyword">this</span>.expression}</span>"`</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">throw</span> e
    }
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.deep) {
      traverse(value)
    }
    <span class="hljs-comment">// 结束依赖收集任务</span>
    popTarget()
    <span class="hljs-keyword">this</span>.cleanupDeps()
  }
  <span class="hljs-keyword">return</span> value
}</code></pre>
<p>上面多出提到了 dep.depend, dep.notify, Dep.target，那么 Dep 究竟是什么呢？</p>
<p>Dep 的代码短小精悍，但却承担着非常重要的依赖收集环节。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/dep.js

export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      // 更新 watcher 的值，与 watcher.evaluate() 类似，
      // 但 update 是给依赖变化时使用的，包含对 watch 的处理
      subs[i].update()
    }
  }
}

// 当首次计算 computed 属性的值时，Dep 将会在计算期间对依赖进行收集
Dep.target = null
const targetStack = []

export function pushTarget (_target: Watcher) {
  // 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前 computed 计算属性嵌套其他 computed 计算属性），
  // 那么将会把当前 target 暂存到 targetStack，先进行其他 target 的依赖收集，
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  // 当嵌套的依赖收集任务完成后，将 target 恢复为上一层的 Watcher，并继续做依赖收集
  Dep.target = targetStack.pop()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/dep.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">static</span> target: ?Watcher;
  id: number;
  subs: <span class="hljs-built_in">Array</span>&lt;Watcher&gt;;

  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
  }

  addSub (sub: Watcher) {
    <span class="hljs-keyword">this</span>.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(<span class="hljs-keyword">this</span>.subs, sub)
  }

  depend () {
    <span class="hljs-keyword">if</span> (Dep.target) {
      Dep.target.addDep(<span class="hljs-keyword">this</span>)
    }
  }

  notify () {
    <span class="hljs-keyword">const</span> subs = <span class="hljs-keyword">this</span>.subs.slice()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      <span class="hljs-comment">// 更新 watcher 的值，与 watcher.evaluate() 类似，</span>
      <span class="hljs-comment">// 但 update 是给依赖变化时使用的，包含对 watch 的处理</span>
      subs[i].update()
    }
  }
}

<span class="hljs-comment">// 当首次计算 computed 属性的值时，Dep 将会在计算期间对依赖进行收集</span>
Dep.target = <span class="hljs-literal">null</span>
<span class="hljs-keyword">const</span> targetStack = []

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushTarget</span> (<span class="hljs-params">_target: Watcher</span>) </span>{
  <span class="hljs-comment">// 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前 computed 计算属性嵌套其他 computed 计算属性），</span>
  <span class="hljs-comment">// 那么将会把当前 target 暂存到 targetStack，先进行其他 target 的依赖收集，</span>
  <span class="hljs-keyword">if</span> (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">popTarget</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 当嵌套的依赖收集任务完成后，将 target 恢复为上一层的 Watcher，并继续做依赖收集</span>
  Dep.target = targetStack.pop()
}</code></pre>
<h2 id="articleHeader3">Result</h2>
<p>总结一下依赖收集、动态计算的流程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. data 属性初始化 getter setter
2. computed 计算属性初始化，提供的函数将用作属性 vm.reversedMessage 的 getter
3. 当首次获取 reversedMessage 计算属性的值时，Dep 开始依赖收集
4. 在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定 message 为 reversedMessage 的依赖，并建立依赖关系
5. 当 message 发生变化时，根据依赖关系，触发 reverseMessage 的重新计算" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-number">1</span>. <span class="hljs-meta">data</span> 属性初始化 getter setter
<span class="hljs-number">2</span>. computed 计算属性初始化，提供的函数将用作属性 vm.<span class="hljs-keyword">reversedMessage </span>的 getter
<span class="hljs-number">3</span>. 当首次获取 <span class="hljs-keyword">reversedMessage </span>计算属性的值时，Dep 开始依赖收集
<span class="hljs-number">4</span>. 在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定 message 为 <span class="hljs-keyword">reversedMessage </span>的依赖，并建立依赖关系
<span class="hljs-number">5</span>. 当 message 发生变化时，根据依赖关系，触发 <span class="hljs-keyword">reverseMessage </span>的重新计算</code></pre>
<p>到此，整个 Computed 的工作流程就理清楚了。</p>
<p>Vue 是一个设计非常优美的框架，使用 Getter Setter 设计使依赖关系实现的非常顺其自然，使用计算与渲染分离的设计（优先使用 MutationObserver，降级使用 setTimeout）也非常贴合浏览器计算引擎与排版引擎分离的的设计原理。</p>
<p><strong>如果你想成为一名架构师，不能只停留在框架的 API 使用层面。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Vue Computed 计算属性

## 原文链接
[https://segmentfault.com/a/1190000010408657](https://segmentfault.com/a/1190000010408657)


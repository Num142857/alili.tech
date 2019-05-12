---
title: '人人都能懂的Vue源码系列—06—mergeOptions-下' 
date: 2018-12-02 2:30:15
hidden: true
slug: h0wzwwb5gw
categories: [reprint]
---

{{< raw >}}

                    
<p>上篇文章，我们讲到了mergeOptions的部分实现，今天接着前面的部分讲解，来看代码，如果大家觉得看讲解枯燥可以直接翻到本文的最后看mergeOptions的整个流程图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">const</span> extendsFrom = child.extends
  <span class="hljs-keyword">if</span> (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  <span class="hljs-keyword">if</span> (child.mixins) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = child.mixins.length; i &lt; l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }</code></pre>
<p>这段代码的处理的逻辑是，当传入的options里有mixin或者extends属性时，再次调用mergeOptions方法合并mixins和extends里的内容到实例的构造函数options上（即parent options）比如下面这种情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const childComponent = Vue.component('child', {
      ...
      mixins: [myMixin],
      extends: myComponent
      ...
 })
 const myMixin = {
      created: function () {
        this.hello()
      },
      methods: {
        hello: function () {
          console.log('hello from mixin')
      }
    }
  }
 const myComponent = {
      mounted: function () {
        this.goodbye()
      },
      methods: {
        goodbye: function () {
          console.log('goodbye from mixin')
        }
     }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">const</span> childComponent = Vue.component(<span class="hljs-string">'child'</span>, {
      ...
      mixins: [myMixin],
      <span class="hljs-attr">extends</span>: myComponent
      ...
 })
 <span class="hljs-keyword">const</span> myMixin = {
      <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.hello()
      },
      <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello from mixin'</span>)
      }
    }
  }
 <span class="hljs-keyword">const</span> myComponent = {
      <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.goodbye()
      },
      <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">goodbye</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'goodbye from mixin'</span>)
        }
     }
  }</code></pre>
<p>就会把传入的mounted, created钩子处理函数，还有methods方法提出来去和parent options做合并处理。<br>弄明白了这点我们继续回到mergeOptions的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const options = {}
let key" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> options = {}
<span class="hljs-keyword">let</span> key</code></pre>
<p>变量options存储合并之后的options，变量key存储parent options和child options上的key值。<br>接下来的部分算是mergeOptions方法的核心处理部分了，像炒菜一样，前面的代码相当于把所有的菜都配好了。接下来的部分就是教你怎么去炒菜了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> parent) {
    mergeField(key)
  }
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> child) {
    <span class="hljs-keyword">if</span> (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeField</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">const</span> strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }</code></pre>
<p>前两段for循环代码大同小异，都是遍历options上的key值，然后调用mergeField方法来处理options。mergeField方法中出现了一个变量strats和defaultStrat。这两个变量存储的就是我们的合并策略，也就是炒菜的菜谱，我们先来看看defaultStrat</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> defaultStrat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentVal: any, childVal: any</span>): <span class="hljs-title">any</span> </span>{
  <span class="hljs-keyword">return</span> childVal === <span class="hljs-literal">undefined</span>
    ? parentVal
    : childVal
}</code></pre>
<p>defaultStrat的逻辑是，如果child上该属性值存在时，就取child上的该属性值，如果不存在，则取parent上的该属性值。现在我们知道默认的合并策略是什么了，接下来看其他的合并策略。我们来看看strats里都有哪些属性？<br><span class="img-wrap"><img data-src="/img/bV9VHi?w=898&amp;h=670" src="https://static.alili.tech/img/bV9VHi?w=898&amp;h=670" alt="strats合并策略" title="strats合并策略" style="cursor: pointer; display: inline;"></span><br>上图就是strats中所有的策略了。粗略看起来里面的内容非常的多，如果细细分析会发现，其实总结起来无非就是几种合并策略。下面分别为大家介绍</p>
<h2 id="articleHeader0">钩子函数的策略</h2>
<p>所有关于钩子函数的策略，其实都是调用mergeHook方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">mergeHook</span> (
  parentVal: ?Array&lt;<span class="hljs-keyword">Function</span>&gt;,
  childVal: ?<span class="hljs-keyword">Function</span> <span class="hljs-title">|</span> ?Array&lt;<span class="hljs-keyword">Function</span>&gt;
): ?Array&lt;<span class="hljs-keyword">Function</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-type">childVal</span>
    ? parentVal
      ? parentVal.concat(childVal)
      : <span class="hljs-type">Array.isArray</span>(childVal)
        ? childVal
        : [<span class="hljs-type">childVal</span>]
    : <span class="hljs-type">parentVal</span>
}</code></pre>
<p>mergeHook采用了一个非常骚的嵌套三元表达式来控制最后的返回值。下面我们来解析这段三元表达式<br>(1) child options上不存在该属性，parent options上存在,则返回parent上的属性。</p>
<p><span class="img-wrap"><img data-src="/img/bV9V15?w=810&amp;h=337" src="https://static.alili.tech/img/bV9V15?w=810&amp;h=337" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>（2）child和parent都存在该属性，则返回concat之后的属性</p>
<p><span class="img-wrap"><img data-src="/img/bV9V5s?w=769&amp;h=340" src="https://static.alili.tech/img/bV9V5s?w=769&amp;h=340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>（3）child上存在该属性，parent不存在，且child上的该属性是Array，则直接返回child上的该属性</p>
<p><span class="img-wrap"><img data-src="/img/bV9V81?w=797&amp;h=384" src="https://static.alili.tech/img/bV9V81?w=797&amp;h=384" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>(4) child上存在该属性，parent不存在，且child上的该属性不是Array，则把该属性先转换成Array,再返回。</p>
<p><span class="img-wrap"><img data-src="/img/bV9V8L?w=760&amp;h=365" src="https://static.alili.tech/img/bV9V8L?w=760&amp;h=365" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>上面就是钩子函数合并策略，结合图片看应该会比较清晰。</p>
<h2 id="articleHeader1">props/methods/inject/computed的策略</h2>
<p>介绍完了钩子函数的合并策略，我们接下来看props,methods,inject,computed等属性的合并策略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  if (childVal &amp;&amp; process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal)
  if (childVal) extend(ret, childVal)
  return ret
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">strats.props =
strats.methods =
strats.inject =
strats.computed = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
</span>): ?<span class="hljs-title">Object</span> </span>{
  <span class="hljs-keyword">if</span> (childVal &amp;&amp; process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
    assertObjectType(key, childVal, vm)
  }
  <span class="hljs-keyword">if</span> (!parentVal) <span class="hljs-keyword">return</span> childVal
  <span class="hljs-keyword">const</span> ret = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
  extend(ret, parentVal)
  <span class="hljs-keyword">if</span> (childVal) extend(ret, childVal)
  <span class="hljs-keyword">return</span> ret
}</code></pre>
<p>这个合并方法逻辑很简单，如果child options上这些属性存在，则先判断它们是不是对象。<br>（1）如果parent options上没有该属性，则直接返回child options上的该属性<br>（2）如果parent options和child options都有，则合并parent options和child options并生成一个新的对象。(如果parent和child上有同名属性，合并后的以child options上的为准)</p>
<h2 id="articleHeader2">components/directives/filters的合并策略</h2>
<p>components/directives/filters这几个属性的处理逻辑如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    process.env.NODE_ENV !== 'production' &amp;&amp; assertObjectType(key, childVal, vm)
    return extend(res, childVal)
  } else {
    return res
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeAssets</span> (<span class="hljs-params">
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
</span>): <span class="hljs-title">Object</span> </span>{
  <span class="hljs-keyword">const</span> res = <span class="hljs-built_in">Object</span>.create(parentVal || <span class="hljs-literal">null</span>)
  <span class="hljs-keyword">if</span> (childVal) {
    process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; assertObjectType(key, childVal, vm)
    <span class="hljs-keyword">return</span> extend(res, childVal)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> res
  }
}</code></pre>
<p>这里的处理逻辑和上一种情况的类似，这里不做过多讲解。</p>
<h2 id="articleHeader3">data和provide的策略</h2>
<p>data和provide的策略相对来说复杂一些，我们先来看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function mergeDataOrFn (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal &amp; childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeDataOrFn</span> (<span class="hljs-params">
  parentVal: any,
  childVal: any,
  vm?: Component
</span>): ?<span class="hljs-title">Function</span> </span>{
  <span class="hljs-keyword">if</span> (!vm) {
    <span class="hljs-comment">// in a Vue.extend merge, both should be functions</span>
    <span class="hljs-keyword">if</span> (!childVal) {
      <span class="hljs-keyword">return</span> parentVal
    }
    <span class="hljs-keyword">if</span> (!parentVal) {
      <span class="hljs-keyword">return</span> childVal
    }
    <span class="hljs-comment">// when parentVal &amp; childVal are both present,</span>
    <span class="hljs-comment">// we need to return a function that returns the</span>
    <span class="hljs-comment">// merged result of both functions... no need to</span>
    <span class="hljs-comment">// check if parentVal is a function here because</span>
    <span class="hljs-comment">// it has to be a function to pass previous merges.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedDataFn</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> mergeData(
        <span class="hljs-keyword">typeof</span> childVal === <span class="hljs-string">'function'</span> ? childVal.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>) : childVal,
        <span class="hljs-keyword">typeof</span> parentVal === <span class="hljs-string">'function'</span> ? parentVal.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>) : parentVal
      )
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedInstanceDataFn</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// instance merge</span>
      <span class="hljs-keyword">const</span> instanceData = <span class="hljs-keyword">typeof</span> childVal === <span class="hljs-string">'function'</span>
        ? childVal.call(vm, vm)
        : childVal
      <span class="hljs-keyword">const</span> defaultData = <span class="hljs-keyword">typeof</span> parentVal === <span class="hljs-string">'function'</span>
        ? parentVal.call(vm, vm)
        : parentVal
      <span class="hljs-keyword">if</span> (instanceData) {
        <span class="hljs-keyword">return</span> mergeData(instanceData, defaultData)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> defaultData
      }
    }
  }
}</code></pre>
<p>这个合并策略可以分成两种情况来考虑。<br>第一种情况，当前调用mergeOptions操作的是vm实例（调用new新建vue实例触发mergeOptions方法）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">   <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedInstanceDataFn</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// instance merge</span>
      <span class="hljs-keyword">const</span> instanceData = <span class="hljs-keyword">typeof</span> childVal === <span class="hljs-string">'function'</span>
        ? childVal.call(vm, vm)
        : childVal
      <span class="hljs-keyword">const</span> defaultData = <span class="hljs-keyword">typeof</span> parentVal === <span class="hljs-string">'function'</span>
        ? parentVal.call(vm, vm)
        : parentVal
      <span class="hljs-keyword">if</span> (instanceData) {
        <span class="hljs-keyword">return</span> mergeData(instanceData, defaultData)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> defaultData
      }
    }</code></pre>
<p>如果新建实例时传入的options上有data属性，则调用mergeData方法合并实例上的data属性和其构造函数options上的data属性（如果有的话）<br>第二种情况，当前调用mergeOptions操作的不是vm实例（即通过Vue.extend/Vue.component调用了mergeOptions方法）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal &amp; childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">if</span> (!vm) {
    <span class="hljs-comment">// in a Vue.extend merge, both should be functions</span>
    <span class="hljs-keyword">if</span> (!childVal) {
      <span class="hljs-keyword">return</span> parentVal
    }
    <span class="hljs-keyword">if</span> (!parentVal) {
      <span class="hljs-keyword">return</span> childVal
    }
    <span class="hljs-comment">// when parentVal &amp; childVal are both present,</span>
    <span class="hljs-comment">// we need to return a function that returns the</span>
    <span class="hljs-comment">// merged result of both functions... no need to</span>
    <span class="hljs-comment">// check if parentVal is a function here because</span>
    <span class="hljs-comment">// it has to be a function to pass previous merges.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedDataFn</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> mergeData(
        <span class="hljs-keyword">typeof</span> childVal === <span class="hljs-string">'function'</span> ? childVal.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>) : childVal,
        <span class="hljs-keyword">typeof</span> parentVal === <span class="hljs-string">'function'</span> ? parentVal.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>) : parentVal
      )
    }
  }</code></pre>
<p>在这种情况下，其处理逻辑也是类似的。如果当前实例options或者构造函数options上有一个没有data属性，则返回另一个的data属性，如果两者都有，则同样调用mergeData方法处理合并。<br>既然这两种情况都调用了mergeData方法，那我们就继续来看看mergeData的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (isPlainObject(toVal) &amp;&amp; isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeData</span> (<span class="hljs-params">to: Object, from: ?Object</span>): <span class="hljs-title">Object</span> </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">from</span>) <span class="hljs-keyword">return</span> to
  <span class="hljs-keyword">let</span> key, toVal, fromVal
  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">from</span>)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = <span class="hljs-keyword">from</span>[key]
    <span class="hljs-keyword">if</span> (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isPlainObject(toVal) &amp;&amp; isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  <span class="hljs-keyword">return</span> to
}</code></pre>
<p>mergeData的逻辑是，如果from对象中有to对象里没有的属性，则调用set方法，（这里的set就是Vue.$set，先可以简单理解为对象设置属性。之后会细讲）如果from和to中有相同的key值，且key对应的value是对象，则会递归调用mergeData方法，否则以to的值为准，最后返回to对象。这里我们就讲完了data的合并策略。<br>返回mergeOptions代码里，在经过这几种合并策略合并options后，最终返回options</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return options" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> options</code></pre>
<h2 id="articleHeader4">总结</h2>
<p>讲到这里,整个mergeOptions的流程也讲完了。这个方法牵扯到的内容比较多，流程也比较复杂。为了大家更好的理解和记忆。我画了一张图来表达整个mergeOptions的过程。<br><span class="img-wrap"><img data-src="/img/bV90eb?w=1200&amp;h=1100" src="https://static.alili.tech/img/bV90eb?w=1200&amp;h=1100" alt="mergeoptions的流程图" title="mergeoptions的流程图" style="cursor: pointer; display: inline;"></span><br>如果大家觉得我的文章写的还行，请为我点赞，你们的认可是我最大的动力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
人人都能懂的Vue源码系列—06—mergeOptions-下

## 原文链接
[https://segmentfault.com/a/1190000014738314](https://segmentfault.com/a/1190000014738314)


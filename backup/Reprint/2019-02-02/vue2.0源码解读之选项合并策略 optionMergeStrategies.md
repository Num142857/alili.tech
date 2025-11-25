---
title: 'vue2.0源码解读之选项合并策略 optionMergeStrategies' 
date: 2019-02-02 2:30:11
hidden: true
slug: qkbhncttwlb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>转载请注明出处 <a href="https://segmentfault.com/a/1190000007087912">https://segmentfault.com/a/11...</a></p></blockquote>
<p>差不多看了快三周的 Vue 源码，决定写一些东西，记录一下收获，毕竟时间一长，好久不看总会忘的，今天就看看 <code>optionMergeStrategies</code>。写这篇文章时，Vue 已经发布了2.0.1正式版，但这里讲解的源码是 2.0.0-rc6 ,但基本没什么区别。</p>
<p><code>optionMergeStrategies</code> 主要用于 <code>mixin</code> 以及 <code>Vue.extend()</code> 方法时对于子组件和父组件如果有相同的属性(option)时的合并策略。</p>
<h2 id="articleHeader0">defaultStrat</h2>
<p>这里先看看默认的合并策略，毕竟之后要用到很多次的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> defaultStrat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentVal, childVal</span>) </span>{
  <span class="hljs-keyword">return</span> childVal === <span class="hljs-literal">undefined</span>
    ? parentVal
    : childVal
}</code></pre>
<p>源代码很简单，传入两个参数 <code>parentVal</code>, <code>childVal</code> 分别对应于父组件和子组件的选项，合并的策略就是，子组件的选项不存在，才会使用父组件的选项，如果子组件的选项存在，使用子组件自身的。</p>
<h2 id="articleHeader1">options.el  options.propsData</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option 
 * value into the final value.
 * 
 * config.optionMergeStrategies: Object.create(null)
 */
 
 // config 是一个全局对象，对应于Vue.config
 // config.optionMergeStrategies 初始化时是一个空对象
 // config.optionMergeStrategies = Object.create(null)
var strats = config.optionMergeStrategies 

/**
 * Options with restrictions
 */
if (&quot;development&quot; !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
      // 如果 vm 不存在，报错： key属性用在vm实例上
    if (!vm) {
      warn(
        &quot;option \&quot;&quot; + key + &quot;\&quot; can only be used during instance &quot; +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }

  strats.name = function (parent, child, vm) {
    if (vm &amp;&amp; child) {
      warn(
        'options &quot;name&quot; can only be used as a component definition option, ' +
        'not during instance creation.'
      )
    }
    return defaultStrat(parent, child)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option 
 * value into the final value.
 * 
 * config.optionMergeStrategies: Object.create(null)
 */</span>
 
 <span class="hljs-comment">// config 是一个全局对象，对应于Vue.config</span>
 <span class="hljs-comment">// config.optionMergeStrategies 初始化时是一个空对象</span>
 <span class="hljs-comment">// config.optionMergeStrategies = Object.create(null)</span>
<span class="hljs-keyword">var</span> strats = config.optionMergeStrategies 

<span class="hljs-comment">/**
 * Options with restrictions
 */</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span>) {
  strats.el = strats.propsData = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, child, vm, key</span>) </span>{
      <span class="hljs-comment">// 如果 vm 不存在，报错： key属性用在vm实例上</span>
    <span class="hljs-keyword">if</span> (!vm) {
      warn(
        <span class="hljs-string">"option \""</span> + key + <span class="hljs-string">"\" can only be used during instance "</span> +
        <span class="hljs-string">'creation with the `new` keyword.'</span>
      )
    }
    <span class="hljs-keyword">return</span> defaultStrat(parent, child)
  }

  strats.name = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parent, child, vm</span>) </span>{
    <span class="hljs-keyword">if</span> (vm &amp;&amp; child) {
      warn(
        <span class="hljs-string">'options "name" can only be used as a component definition option, '</span> +
        <span class="hljs-string">'not during instance creation.'</span>
      )
    }
    <span class="hljs-keyword">return</span> defaultStrat(parent, child)
  }
}</code></pre>
<p>上面可以看出，<code>el</code> , <code>propsData</code> 和 <code>name</code> 的合并策略就是默认的合并策略，即以子组件的选项为主，子组件的选项不存在时，才使用父组件的。</p>
<h2 id="articleHeader2">options.hook</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeHook (
  parentVal,
  childVal 
) {
  return childVal
    ? parentVal // 如果 childVal存在
      ? parentVal.concat(childVal) // 如果parentVal存在，直接合并
      : Array.isArray(childVal) // 如果parentVal不存在
        ? childVal  // 如果chilidVal是数组，直接返回
        : [childVal] // 包装成一个数组返回
    : parentVal  // 如果childVal 不存在 直接返回parentVal 
}
// strats中添加属性，属性名为生命周期各个钩子
config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook // 设置每一个钩子函数的合并策略
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code class="javscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeHook</span> <span class="hljs-params">(
  parentVal,
  childVal 
)</span> </span>{
  <span class="hljs-keyword">return</span> childVal
    ? parentVal <span class="hljs-comment">// 如果 childVal存在</span>
      ? parentVal.concat(childVal) <span class="hljs-comment">// 如果parentVal存在，直接合并</span>
      : <span class="hljs-keyword">Array</span>.isArray(childVal) <span class="hljs-comment">// 如果parentVal不存在</span>
        ? childVal  <span class="hljs-comment">// 如果chilidVal是数组，直接返回</span>
        : [childVal] <span class="hljs-comment">// 包装成一个数组返回</span>
    : parentVal  <span class="hljs-comment">// 如果childVal 不存在 直接返回parentVal </span>
}
<span class="hljs-comment">// strats中添加属性，属性名为生命周期各个钩子</span>
config._lifecycleHooks.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(hook)</span> </span>{
  strats[hook] = mergeHook <span class="hljs-comment">// 设置每一个钩子函数的合并策略</span>
})</code></pre>
<p>如果父组件和子组件都设置了钩子函数选项，那么 它们会合并到一个数组里，而且父组件的钩子函数会先执行，最后返回一个合并后的数组。具体见源码里的注释。</p>
<h2 id="articleHeader3">options.components  options.directives  options.filters</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Assets // components,directives,filters
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) { // parentVal: Object childVal: Object
  var res = Object.create(parentVal || null) // 原型委托
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Assets // components,directives,filters
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeAssets</span> (<span class="hljs-params">parentVal, childVal</span>) </span>{ <span class="hljs-comment">// parentVal: Object childVal: Object</span>
  <span class="hljs-keyword">var</span> res = <span class="hljs-built_in">Object</span>.create(parentVal || <span class="hljs-literal">null</span>) <span class="hljs-comment">// 原型委托</span>
  <span class="hljs-keyword">return</span> childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type</span>) </span>{
  strats[type + <span class="hljs-string">'s'</span>] = mergeAssets
})</code></pre>
<p>对于 <code>assets</code> 也就是 <code>components</code>, <code>directives</code>, <code>filters</code> 合并的策略就是返回一个合并后的新对象，新对象的自有属性全部来自 <code>childVal</code>, 但是通过<strong>原型链委托</strong>在了 <code>parentVal</code> 上。</p>
<p>这里顺便提提在一个对象里查找属性的规则。举个例子，当查找一个属性时，如 obj[a] ,如果 obj 没有 a 这个属性，那么将会在 obj 对象的原型里找，如果还没有，在原型的原型上找，直到原型链的尽头，如果还没有找到，返回 undefined。</p>
<p>因此这里同样一个道理，在 res 对象里查找某个 component 或 directive , 首先会找 childVal里的，如果没有，才会沿着原型链向上，找 parentVal中对应的属性。事实上，和 defaultStrat 一个道理。</p>
<h2 id="articleHeader4">options.props  options.methods  options.computed</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) { // parentVal: Object childVal: Object
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  var ret = Object.create(null)
  extend(ret, parentVal)
  extend(ret, childVal)  //  child的会覆盖parent的
  return ret
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">strats.props =
strats.methods =
strats.computed = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentVal, childVal</span>) </span>{ <span class="hljs-comment">// parentVal: Object childVal: Object</span>
  <span class="hljs-keyword">if</span> (!childVal) <span class="hljs-keyword">return</span> parentVal
  <span class="hljs-keyword">if</span> (!parentVal) <span class="hljs-keyword">return</span> childVal
  <span class="hljs-keyword">var</span> ret = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
  extend(ret, parentVal)
  extend(ret, childVal)  <span class="hljs-comment">//  child的会覆盖parent的</span>
  <span class="hljs-keyword">return</span> ret
}</code></pre>
<p>同样来看源码，函数解构同样返回一个新的 res 对象，同样适用了 extend 方法拓展了 res 对象。但是要注意的是，先拓展的是 parentVal 对象，然后再拓展 childVal对象，这就意味着当拓展 chilidVal 对象的时候，如果 childVal中有 parentVal 的同名属性时，将会直接覆盖掉。这里顺便贴一下 extend  方法的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Mix properties into target object.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span> (<span class="hljs-params">to, _from</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> _from) {
    to[key] = _from[key]
  }
  <span class="hljs-keyword">return</span> to 
}</code></pre>
<h2 id="articleHeader5">options.watch</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 * 不应该重写（覆盖）,应该保存在一个数组里
 */
strats.watch = function (parentVal, childVal) { 
  /* istanbul ignore if */
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  var ret = {}
  extend(ret, parentVal) // ret首先获得parentVal的全部属性
  for (var key in childVal) {
    var parent = ret[key] // 子组件的某个watcher在父组件中的值
    var child = childVal[key]
    if (parent &amp;&amp; !Array.isArray(parent)) {
      parent = [parent] // 如果parent不是一个数组，将其包装成一个数组
    }
    ret[key] = parent
      ? parent.concat(child) // parent在前，child在后
      : [child] // 如果在父组件中不存在，以数组的形式存储子组件的watcher
  }
  return ret
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 * 不应该重写（覆盖）,应该保存在一个数组里
 */</span>
strats.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentVal, childVal</span>) </span>{ 
  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-keyword">if</span> (!childVal) <span class="hljs-keyword">return</span> parentVal
  <span class="hljs-keyword">if</span> (!parentVal) <span class="hljs-keyword">return</span> childVal
  <span class="hljs-keyword">var</span> ret = {}
  extend(ret, parentVal) <span class="hljs-comment">// ret首先获得parentVal的全部属性</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> childVal) {
    <span class="hljs-keyword">var</span> parent = ret[key] <span class="hljs-comment">// 子组件的某个watcher在父组件中的值</span>
    <span class="hljs-keyword">var</span> child = childVal[key]
    <span class="hljs-keyword">if</span> (parent &amp;&amp; !<span class="hljs-built_in">Array</span>.isArray(parent)) {
      parent = [parent] <span class="hljs-comment">// 如果parent不是一个数组，将其包装成一个数组</span>
    }
    ret[key] = parent
      ? parent.concat(child) <span class="hljs-comment">// parent在前，child在后</span>
      : [child] <span class="hljs-comment">// 如果在父组件中不存在，以数组的形式存储子组件的watcher</span>
  }
  <span class="hljs-keyword">return</span> ret
}</code></pre>
<p>子组件和父组件的watchers不应该覆盖，而是应该把它们都合并在一个数组里。这里同样是父组件的在前，子组件的在后。</p>
<h2 id="articleHeader6">options.data</h2>
<p>data 是个重头戏，也是整个合并策略中最复杂的，这是因为，在组件中data是以函数的形式存在的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 *
 */
strats.data = function (
  parentVal,
  childVal,
  vm // 如果传入了vm，那么它表示的是组件的根实例
) {
  if (!vm) { // 如果没传入
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {  // 在组件中定义data 必须是一个函数
      &quot;development&quot; !== 'production' &amp;&amp; warn(
        'The &quot;data&quot; option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal // 报完错，返回parentVal的data
    }
    if (!parentVal) {
      return childVal // parentVal不存在，返回 childVal的data
    }
    // when parentVal &amp; childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    // 这里返回的应该是一个函数，函数返回结果是合并后的data对象
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) { // 如果提供了vm实例
    return function mergedInstanceDataFn () { // 同样返回一个函数
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined // 如果parentVal不是函数，则抛弃。
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
      </div><pre class="hljs actionscript"><code class="javacript"><span class="hljs-comment">/*
 *
 */</span>
strats.data = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(
  parentVal,
  childVal,
  vm <span class="hljs-comment">// 如果传入了vm，那么它表示的是组件的根实例</span>
)</span> </span>{
  <span class="hljs-keyword">if</span> (!vm) { <span class="hljs-comment">// 如果没传入</span>
    <span class="hljs-comment">// in a Vue.extend merge, both should be functions</span>
    <span class="hljs-keyword">if</span> (!childVal) {
      <span class="hljs-keyword">return</span> parentVal
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> childVal !== <span class="hljs-string">'function'</span>) {  <span class="hljs-comment">// 在组件中定义data 必须是一个函数</span>
      <span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
        <span class="hljs-string">'The "data" option should be a function '</span> +
        <span class="hljs-string">'that returns a per-instance value in component '</span> +
        <span class="hljs-string">'definitions.'</span>,
        vm
      )
      <span class="hljs-keyword">return</span> parentVal <span class="hljs-comment">// 报完错，返回parentVal的data</span>
    }
    <span class="hljs-keyword">if</span> (!parentVal) {
      <span class="hljs-keyword">return</span> childVal <span class="hljs-comment">// parentVal不存在，返回 childVal的data</span>
    }
    <span class="hljs-comment">// when parentVal &amp; childVal are both present,</span>
    <span class="hljs-comment">// we need to return a function that returns the</span>
    <span class="hljs-comment">// merged result of both functions... no need to</span>
    <span class="hljs-comment">// check if parentVal is a function here because</span>
    <span class="hljs-comment">// it has to be a function to pass previous merges.</span>
    <span class="hljs-comment">// 这里返回的应该是一个函数，函数返回结果是合并后的data对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedDataFn</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> mergeData(
        childVal.call(<span class="hljs-keyword">this</span>),
        parentVal.call(<span class="hljs-keyword">this</span>)
      )
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (parentVal || childVal) { <span class="hljs-comment">// 如果提供了vm实例</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergedInstanceDataFn</span> <span class="hljs-params">()</span> </span>{ <span class="hljs-comment">// 同样返回一个函数</span>
      <span class="hljs-comment">// instance merge</span>
      <span class="hljs-keyword">var</span> instanceData = <span class="hljs-keyword">typeof</span> childVal === <span class="hljs-string">'function'</span>
        ? childVal.call(vm)
        : childVal
      <span class="hljs-keyword">var</span> defaultData = <span class="hljs-keyword">typeof</span> parentVal === <span class="hljs-string">'function'</span>
        ? parentVal.call(vm)
        : <span class="hljs-literal">undefined</span> <span class="hljs-comment">// 如果parentVal不是函数，则抛弃。</span>
      <span class="hljs-keyword">if</span> (instanceData) {
        <span class="hljs-keyword">return</span> mergeData(instanceData, defaultData)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> defaultData
      }
    }
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Helper that recursively merges two data objects together.
 * 合并规则：
 * 1. 如果from中的某个属性to中有，保留to中的，什么都不做。
 * 2. 如果to中没有，赋值。
 * 3. 如果to中和from中的某个属性值都是对象，递归调用。
 */
function mergeData (to, from) { 
  var key, toVal, fromVal
  for (key in from) {
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal) // 设置to[key] = fromVal
    } else if (isObject(toVal) &amp;&amp; isObject(fromVal)) {
      mergeData(toVal, fromVal)  // 如果对应的值都是对象，则递归合并。
    }
  }
  return to
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Helper that recursively merges two data objects together.
 * 合并规则：
 * 1. 如果from中的某个属性to中有，保留to中的，什么都不做。
 * 2. 如果to中没有，赋值。
 * 3. 如果to中和from中的某个属性值都是对象，递归调用。
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeData</span> (<span class="hljs-params">to, from</span>) </span>{ 
  <span class="hljs-keyword">var</span> key, toVal, fromVal
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> <span class="hljs-keyword">from</span>) {
    toVal = to[key]
    fromVal = <span class="hljs-keyword">from</span>[key]
    <span class="hljs-keyword">if</span> (!hasOwn(to, key)) {
      set(to, key, fromVal) <span class="hljs-comment">// 设置to[key] = fromVal</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isObject(toVal) &amp;&amp; isObject(fromVal)) {
      mergeData(toVal, fromVal)  <span class="hljs-comment">// 如果对应的值都是对象，则递归合并。</span>
    }
  }
  <span class="hljs-keyword">return</span> to
}</code></pre>
<p>代码中注释都写得很清楚了，这里就不多说了。 Vue 中对于 data 属性的合并就是执行 parentVal 和 childVal 的函数，然后再合并函数返回的对象。</p>
<h2 id="articleHeader7">自定义合并策略</h2>
<p>以上所说的都是 Vue 自定义的合并的策略，当然你也可以自定义某个选项的合并策略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.config.optionMergeStrategies.myOption = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">toVal, fromVal</span>) </span>{
  <span class="hljs-comment">// return mergedVal</span>
}</code></pre>
<p>比如想要修改 watch的合并策略</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.optionMergeStrategies.watch = function (toVal, fromVal) {
  // return mergedVal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.config.optionMergeStrategies.watch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">toVal, fromVal</span>) </span>{
  <span class="hljs-comment">// return mergedVal</span>
}</code></pre>
<p>至于传入的函数参数，可以参考之前讲解的源码。</p>
<blockquote><p>全文完</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0源码解读之选项合并策略 optionMergeStrategies

## 原文链接
[https://segmentfault.com/a/1190000007087912](https://segmentfault.com/a/1190000007087912)


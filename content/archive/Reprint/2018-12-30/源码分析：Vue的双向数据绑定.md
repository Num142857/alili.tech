---
title: '源码分析：Vue的双向数据绑定' 
date: 2018-12-30 2:30:10
hidden: true
slug: 2a9ostt2ahq
categories: [reprint]
---

{{< raw >}}

                    
<p>虽然工作中一直使用Vue作为基础库，但是对于其实现机理仅限于道听途说，这样对长期的技术发展很不利。所以最近攻读了其源码的一部分，先把双向数据绑定这一块的内容给整理一下，也算是一种学习的反刍。</p>
<p>本篇文章的Vue源码版本为<code>v2.2.0开发版</code>。</p>
<p>Vue源码的整体架构无非是初始化Vue对象，挂载数据<code>data/props</code>等，在不同的时期触发不同的事件钩子，如<code>created() / mounted() / update()</code>等，后面专门整理各个模块的文章。这里先讲双向数据绑定的部分，也是最主要的部分。</p>
<h2 id="articleHeader0">设计思想：观察者模式</h2>
<p>Vue的双向数据绑定的设计思想为<code>观察者模式</code>，为了方便，下文中将被观察的对象称为观察者，将观察者对象触发更新的称为订阅者。主要涉及到的概念有：</p>
<ol>
<li>
<p>Dep对象：Dependency依赖的简写，包含有三个主要属性<code>id, subs, target</code>和四个主要函数<code>addSub, removeSub, depend, notify</code>，是观察者的依赖集合，负责在数据发生改变时，使用<code>notify()</code>触发保存在<code>subs</code>下的订阅列表，依次更新数据和DOM。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="id: 每个观察者(依赖对象)的唯一标识。
subs: 观察者对象的订阅者列表。
target: 全局唯一的订阅者对象，因为只能同时计算和更新一个订阅者的值。
addSub(): 使用`push()`方法添加一个订阅者。
removeSub(): 使用`splice()`方法移除一个订阅者。
depend(): 将自己添加到当前订阅者对象的依赖列表。
notify(): 在数据被更新时，会遍历subs对象，触发每一个订阅者的更新。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>id: 每个观察者(依赖对象)的唯一标识。
subs: 观察者对象的订阅者列表。
target: 全局唯一的订阅者对象，因为只能同时计算和更新一个订阅者的值。
<span class="hljs-function"><span class="hljs-title">addSub</span><span class="hljs-params">()</span></span>: 使用`push()`方法添加一个订阅者。
<span class="hljs-function"><span class="hljs-title">removeSub</span><span class="hljs-params">()</span></span>: 使用`splice()`方法移除一个订阅者。
<span class="hljs-function"><span class="hljs-title">depend</span><span class="hljs-params">()</span></span>: 将自己添加到当前订阅者对象的依赖列表。
<span class="hljs-function"><span class="hljs-title">notify</span><span class="hljs-params">()</span></span>: 在数据被更新时，会遍历subs对象，触发每一个订阅者的更新。</code></pre>
</li>
<li>
<p>Observer对象：即观察者，包含两个主要属性<code>value, dep</code>。做法是使用getter/setter方法覆盖默认的取值和赋值操作，将对象封装为响应式对象，每一次调用时更新依赖列表，更新值时触发订阅者。绑定在对象的<code>__ob__</code>原型链属性上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="value: 原始值。
dep: 依赖列表。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">value:</span> 原始值。
<span class="hljs-symbol">dep:</span> 依赖列表。</code></pre>
</li>
</ol>
<h2 id="articleHeader1">源码实战解析</h2>
<p>有过Vue开发基础的应该都了解其怎么初始化一个Vue对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#container',
    data: {
        count: 100
    },
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#container'</span>,
    <span class="hljs-attribute">data</span>: {
        <span class="hljs-attribute">count</span>: <span class="hljs-number">100</span>
    },
    ...
});</code></pre>
<p>那么我们就从这个count说起，看它是怎么完成双向数据绑定的。</p>
<p>下面的代码片段中英文注释为尤雨溪所写，中文注释为我所写，英文注释更能代表开发者的清晰思路。</p>
<p>首先从全局的初始化函数调用：<code>initMixin(Vue$3);</code>，这里的<code>Vue$3</code>对象就是全局的Vue对象，在此之前已经挂载了Vue的各种基本数据和函数。这个函数体就是初始化我们上面声明Vue语句的过程化逻辑，取主体代码来看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里的options就是上面声明Vue对象的json对象
Vue.prototype._init = function (options) {
    ...
    var vm = this;
    ...
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    // 这里就是我们接下来要跟进的初始化Vue参数
    initState(vm);
    initInjections(vm);
    callHook(vm, 'created');
    ...
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 这里的options就是上面声明Vue对象的json对象</span>
Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    ...
    <span class="hljs-built_in">var</span> vm = <span class="hljs-keyword">this</span>;
    ...
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, <span class="hljs-string">'beforeCreate'</span>);
    <span class="hljs-comment">// 这里就是我们接下来要跟进的初始化Vue参数</span>
    initState(vm);
    initInjections(vm);
    callHook(vm, <span class="hljs-string">'created'</span>);
    ...
  };</code></pre>
<p>这里主要完成了初始化事件、渲染、参数、注入等过程，并不断调用事件钩子的回调函数。下面来到如何初始化参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  // 我们的count在这里初始化
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> <span class="hljs-params">(vm)</span> </span>{
  vm._watchers = [];
  <span class="hljs-keyword">var</span> opts = vm.$options;
  <span class="hljs-keyword">if</span> (opts.props) { initProps(vm, opts.props); }
  <span class="hljs-keyword">if</span> (opts.methods) { initMethods(vm, opts.methods); }
  <span class="hljs-comment">// 我们的count在这里初始化</span>
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm);
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-keyword">true</span> <span class="hljs-comment">/* asRootData */</span>);
  }
  <span class="hljs-keyword">if</span> (opts.computed) { initComputed(vm, opts.computed); }
  <span class="hljs-keyword">if</span> (opts.watch) { initWatch(vm, opts.watch); }
}</code></pre>
<p>这里依次检测参数中包含的<code>props/methods/data/computed/watch</code>并进入不同的函数进行初始化，这里我们只关心initData：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
  }
  ...
  // observe data
  observe(data, true /* asRootData */);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">function</span> initData (vm) {
  var <span class="hljs-class"><span class="hljs-keyword">data</span> = vm.$options.<span class="hljs-keyword">data</span>;</span>
  <span class="hljs-class"><span class="hljs-keyword">data</span> = vm._data = typeof <span class="hljs-keyword">data</span> === 'function'</span>
    ? <span class="hljs-class"><span class="hljs-keyword">data</span>.call(<span class="hljs-title">vm</span>)</span>
    : <span class="hljs-class"><span class="hljs-keyword">data</span> || {};</span>
  <span class="hljs-keyword">if</span> (!isPlainObject(<span class="hljs-class"><span class="hljs-keyword">data</span>)) {
    <span class="hljs-title">data</span> = {};</span>
  }
  ...
  // observe <span class="hljs-class"><span class="hljs-keyword">data</span></span>
  observe(<span class="hljs-class"><span class="hljs-keyword">data</span>, true /* asRootData */);</span></code></pre>
<p>可以看到Vue的<code>data</code>参数支持对象和回调函数，但最终返回的一定是对象，否则使用空对象。接下来就是重头戏了，我们如何将data参数设置为响应式的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') &amp;&amp; value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    /* 为了防止value不是单纯的对象而是Regexp或者函数之类的，或者是vm实例再或者是不可扩展的 */
    observerState.shouldConvert &amp;&amp;
    !isServerRendering() &amp;&amp;
    (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
    Object.isExtensible(value) &amp;&amp;
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData &amp;&amp; ob) {
    ob.vmCount++;
  }
  return ob
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */</span>
<span class="hljs-function">function <span class="hljs-title">observe</span> (<span class="hljs-params"><span class="hljs-keyword">value</span>, asRootData</span>) </span>{
  <span class="hljs-keyword">if</span> (!isObject(<span class="hljs-keyword">value</span>)) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> ob;
  <span class="hljs-keyword">if</span> (hasOwn(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>) &amp;&amp; <span class="hljs-keyword">value</span>.__ob__ instanceof Observer) {
    ob = <span class="hljs-keyword">value</span>.__ob__;
  } <span class="hljs-function"><span class="hljs-keyword">else</span> <span class="hljs-title">if</span> (<span class="hljs-params">
    <span class="hljs-comment">/* 为了防止value不是单纯的对象而是Regexp或者函数之类的，或者是vm实例再或者是不可扩展的 */</span>
    observerState.shouldConvert &amp;&amp;
    !isServerRendering(</span>) &amp;&amp;
    (<span class="hljs-params">Array.isArray(<span class="hljs-keyword">value</span></span>) || <span class="hljs-title">isPlainObject</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>)) &amp;&amp;
    Object.<span class="hljs-title">isExtensible</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) &amp;&amp;
    !<span class="hljs-keyword">value</span>._isVue
  ) </span>{
    ob = <span class="hljs-keyword">new</span> Observer(<span class="hljs-keyword">value</span>);
  }
  <span class="hljs-keyword">if</span> (asRootData &amp;&amp; ob) {
    ob.vmCount++;
  }
  <span class="hljs-keyword">return</span> ob
}</code></pre>
<p>这里的英文注释非常清晰，就是为了给该对象新建一个观察者类，如果存在则返回已存在的（比如互相引用或依赖重复），可以看到这个观察者列表放置在对象的<code>__ob__</code>属性下。下面我们看下这个Observer观察者类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  // def函数是defineProperty的简单封装
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    // 在es5及更低版本的js里，无法完美继承数组，这里检测并选取合适的函数
    // protoAugment函数使用原型链继承，copyAugment函数使用原型链定义（即对每个数组defineProperty）
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */</span>
<span class="hljs-keyword">var</span> Observer = <span class="hljs-function">function <span class="hljs-title">Observer</span> (<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
  <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
  <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep();
  <span class="hljs-keyword">this</span>.vmCount = <span class="hljs-number">0</span>;
  <span class="hljs-comment">// def函数是defineProperty的简单封装</span>
  def(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">value</span>)) {
    <span class="hljs-comment">// 在es5及更低版本的js里，无法完美继承数组，这里检测并选取合适的函数</span>
    <span class="hljs-comment">// protoAugment函数使用原型链继承，copyAugment函数使用原型链定义（即对每个数组defineProperty）</span>
    <span class="hljs-keyword">var</span> augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(<span class="hljs-keyword">value</span>, arrayMethods, arrayKeys);
    <span class="hljs-keyword">this</span>.observeArray(<span class="hljs-keyword">value</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.walk(<span class="hljs-keyword">value</span>);
  }
};</code></pre>
<p>在Observer类的注释里也清楚的说明，它会被关联到每一个被检测的对象，使用<code>getter/setter</code>修改其默认读写，用于收集依赖和发布更新。其中出现了三个我们需要关心的东西<code>Dep类/observeArray/walk</code>，我们先看observeArray的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/**
 * Observe a list of Array items.
 */</span>
Observer.prototype.observeArray = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observeArray</span> <span class="hljs-params">(items)</span> </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
    observe(items[i]);
  }
};</code></pre>
<p>它不过是在Observer类和observe方法中间的一层递归，因为我们观察的只能是对象，而不能是数字、字符串或者数组（数组的观察比较特殊，事实上是重构了方法来触发更新，后面会讲到）。那我们接下来看下Dep类是做什么用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */</span>
<span class="hljs-keyword">var</span> Dep = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.id = uid$<span class="hljs-number">1</span>++;
  <span class="hljs-keyword">this</span>.subs = [];
};</code></pre>
<p>注释里告诉我们Dep类是一个会被多个指令订阅的可被观察的对象，这里的指令就是我们在html代码里书写的东西，如<code>:class={active: hasActive}</code>或<code>"{{" count "}}" "{{" count * price "}}"</code>，而他们就会订阅<code>hasActive/count/price</code>这些对象，而这些订阅他们的对象就会被放置在<code>Dep.subs</code>列表中。每一次新建Dep对象，就会全局uid递增，然后传给该Dep对象，保证唯一性id。<br>我们接着看刚才的walk函数做了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>/**
 * Walk through <span class="hljs-built_in">each</span> property <span class="hljs-built_in">and</span> convert them into
 * getter/setters. This method should only be called when
 * <span class="hljs-built_in">value</span> <span class="hljs-built_in">type</span> is Object.
 */
Observer.prototype.walk = function walk (obj) {
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">keys</span> = Object.<span class="hljs-built_in">keys</span>(obj);
  for (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">keys</span>.length; i++) {
    defineReactive$$<span class="hljs-number">1</span>(obj, <span class="hljs-built_in">keys</span>[i], obj[<span class="hljs-built_in">keys</span>[i]]);
  }
};</code></pre>
<p>看来和名字一样，它只是走了一遍，那我们来看下<code>defineReactive$$1</code>做了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (obj, key, val, customSetter) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property &amp;&amp; property.get;
  var setter = property &amp;&amp; property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      // 脏检查，排除了NaN !== NaN的影响
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * Define a reactive property on an Object.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive$$1</span> (<span class="hljs-params">obj, key, val, customSetter</span>) </span>{
  <span class="hljs-built_in">var</span> dep = <span class="hljs-keyword">new</span> Dep();

  <span class="hljs-built_in">var</span> <span class="hljs-keyword">property</span><span class="hljs-string"> </span>= <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.configurable </span>=== <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// cater for pre-defined getter/setters</span>
  <span class="hljs-built_in">var</span> getter = <span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.get</span>;
  <span class="hljs-built_in">var</span> setter = <span class="hljs-keyword">property</span><span class="hljs-string"> &amp;&amp; property.set</span>;

  <span class="hljs-built_in">var</span> childOb = observe(val);
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attribute">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">var</span> value = getter ? getter.call(obj) : val;
      <span class="hljs-keyword">if</span> (Dep.target) {
        dep.depend();
        <span class="hljs-keyword">if</span> (childOb) {
          childOb.dep.depend();
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value)) {
          dependArray(value);
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
      <span class="hljs-built_in">var</span> value = getter ? getter.call(obj) : val;
      <span class="hljs-comment">// 脏检查，排除了NaN !== NaN的影响</span>
      <span class="hljs-keyword">if</span> (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, newVal);
      } <span class="hljs-title">else</span> {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}</code></pre>
<p>终于找到重头戏了，这里真正使用了<code>getter/setter</code>代理了对象的默认读写。我们首先新建一个Dep对象，利用闭包准备收集依赖，然后我们使用observe观察该对象，注意此时与上面相比少了一个<code>asRootData = true</code>的参数。<br>我们先来看取值的代理get，这里用到了<code>Dep.target属性和depend()方法</code>，我们来看看它是做什么的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// the current target watcher being evaluated.</span>
<span class="hljs-comment">// this is globally unique because there could be only one</span>
<span class="hljs-comment">// watcher being evaluated at any time.</span>
Dep.target = <span class="hljs-literal">null</span>;

Dep.prototype.depend = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">depend</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (Dep.target) {
    Dep.target.addDep(<span class="hljs-keyword">this</span>);
  }
};

Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notify</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// stablize the subscriber list first</span>
  <span class="hljs-keyword">var</span> subs = <span class="hljs-keyword">this</span>.subs.slice();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
    subs[i].update();
  }
};</code></pre>
<p>注释看的出来<code>Dep.target</code>是全局唯一的<code>watcher</code>对象，也就是当前正在指令计算的订阅者，它会在计算时赋值成一个watcher对象，计算完成后赋值为null。而<code>depend</code>是用于对该订阅者添加依赖，告诉它你的值依赖于我，每次更新时应该来找我。另外还有<code>notify()</code>的函数，用于遍历所有的依赖，通知他们更新数据。这里多看一下<code>addDep()</code>的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      // 使用push()方法添加一个订阅者
      dep.addSub(this);
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">/**
 * Add a dependency to this directive.
 */</span>
Watcher.prototype.addDep = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addDep</span> </span>(dep) {
  <span class="hljs-keyword">var</span> id = dep.id;
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">DepIds</span>.has(id)) {
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">DepIds</span>.add(id);
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">Deps</span>.push(dep);
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">this</span>.depIds.has(id)) {
      <span class="hljs-comment">// 使用push()方法添加一个订阅者</span>
      dep.addSub(<span class="hljs-built_in">this</span>);
    }
  }
};</code></pre>
<p>可以看到它有去重的机制，当重复依赖时保证相同ID的依赖只有一个。订阅者包含3个属性<code>newDepIds/newDeps/depIds</code>分别存储依赖信息，如果之前就有了这个依赖，那么反过来将该订阅者加入到这个依赖关系中去。<br>接着看get方法中的<code>dependArray()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e &amp;&amp; e.__ob__ &amp;&amp; e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>/**
 * Collect dependencies on<span class="hljs-built_in"> array </span>elements when the<span class="hljs-built_in"> array </span>is touched, since
 * we cannot intercept<span class="hljs-built_in"> array </span>element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i &lt; l; i++) {
    e = value[i];
    e &amp;&amp; e.__ob__ &amp;&amp; e.__ob__.dep.depend();
   <span class="hljs-built_in"> if </span>(Array.isArray(e)) {
      dependArray(e);
    }
  }
}</code></pre>
<p>可以看到我们不能像对象一样监听数组的变化，所以如果获取一个数组的值，那么就需要将数组中所有的对象的观察者列表都加入到依赖中去。<br>这样get方法读取值就代理完成了，接下来我们看set方法代理赋值的实现，我们先获取原始值，然后与新赋的值进行比较，也叫脏检查，如果数据发生了改变，则对该数据进行重新建立观察者，并通知所有的订阅者更新。<br>接下来我们看下数组的更新检测是如何实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */</span>
<span class="hljs-keyword">var</span> arrayProto = <span class="hljs-built_in">Array</span>.prototype;
<span class="hljs-keyword">var</span> arrayMethods = <span class="hljs-built_in">Object</span>.create(arrayProto);
[<span class="hljs-string">'push'</span>, <span class="hljs-string">'pop'</span>, <span class="hljs-string">'shift'</span>, <span class="hljs-string">'unshift'</span>, <span class="hljs-string">'splice'</span>, <span class="hljs-string">'sort'</span>, <span class="hljs-string">'reverse'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  <span class="hljs-comment">// cache original method</span>
  <span class="hljs-keyword">var</span> original = arrayProto[method];
  def(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutator</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">arguments</span>$<span class="hljs-number">1</span> = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-comment">// avoid leaking arguments:</span>
    <span class="hljs-comment">// http://jsperf.com/closure-with-arguments</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-keyword">var</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i);
    <span class="hljs-keyword">while</span> (i--) {
      args[i] = <span class="hljs-built_in">arguments</span>$<span class="hljs-number">1</span>[i];
    }
    <span class="hljs-keyword">var</span> result = original.apply(<span class="hljs-keyword">this</span>, args);
    <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.__ob__;
    <span class="hljs-keyword">var</span> inserted;
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'push'</span>:
        inserted = args;
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'unshift'</span>:
        inserted = args;
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'splice'</span>:
        inserted = args.slice(<span class="hljs-number">2</span>);
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> (inserted) { ob.observeArray(inserted); }
    <span class="hljs-comment">// notify change</span>
    ob.dep.notify();
    <span class="hljs-keyword">return</span> result
  });
});</code></pre>
<p>看的出来我们模拟了一个数组对象，代理了<code>push/pop/shift/unshift/splice/sort/reverse</code>方法，用于检测数组的变化，并通知所有订阅者更新。如果有新建元素，会补充监听新对象。<br>这就是从代码上解释为什么Vue不支持数组下标修改和长度修改的原因，至于为什么这么设计，我后面会再次更新或再开篇文章，讲一些通用的设计问题以及Js机制和缺陷。</p>
<h2 id="articleHeader2">总结</h2>
<p>从上面的代码中我们可以一步步由深到浅的看到Vue是如何设计出双向数据绑定的，最主要的两点：</p>
<ol>
<li>使用<code>getter/setter</code>代理值的读取和赋值，使得我们可以控制数据的流向。</li>
<li>使用<code>观察者模式</code>设计，实现了指令和数据的依赖关系以及触发更新。</li>
<li>对于数组，<code>代理</code>会修改原数组对象的方法，并触发更新。</li>
</ol>
<p>明白了这些原理，其实你也可以实现一个简单的数据绑定，造一个小轮子，当然，Vue的强大之处不止于此，我们后面再来聊一聊它的组件和渲染，看它是怎么一步一步将我们从DOM对象的魔爪里拯救出来的。</p>
<h2 id="articleHeader3">参考资料</h2>
<ol>
<li>数据的响应化：<a href="https://github.com/Ma63d/vue-analysis/issues/1" rel="nofollow noreferrer" target="_blank">https://github.com/Ma63d/vue-...</a>
</li>
<li>Vue v2.2.0 源代码文件</li>
<li>es6 Proxy: <a href="http://es6.ruanyifeng.com/#docs/proxy" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
源码分析：Vue的双向数据绑定

## 原文链接
[https://segmentfault.com/a/1190000011328301](https://segmentfault.com/a/1190000011328301)


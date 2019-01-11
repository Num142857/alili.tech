---
title: 'vue源码解析－插件入侵机制' 
date: 2019-01-12 2:30:24
hidden: true
slug: j74vj8p3p5g
categories: [reprint]
---

{{< raw >}}

                    
<p>插件：聪明的程序员往往希望能更高(tou)效(lan)的完成指定的工作，插件就是按照一定的封装方式，暴露接口。让我们利用这些接口更快捷的实现功能。升职加薪。每个框架都提供了插件的扩展机制。这是框架可扩展性必不可少的一个部分。插件机制越简单。对于框架的生态的发展大有好处。jquery提供了$.fn.extend,angular有对应的依赖注入，module机制。既然vue那么精美，能迅速火起来。插件这部分的可扩展性必须顶级。这里接下来我们看看vue插件的入侵机制。<br>   说到插件。我们最多使用的一个方法。无非就是 Vue.use(MyPlugin, { someOption: true });<br>这么说的话，这个方法应该是所有插件入侵vue的起点。没错。那么我们来看看这个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return//假如插件已经初始化过就不再继续。避免插件重复入侵
    }
    // additional parameters
    var args = toArray(arguments, 1);//获取插件的配置参数
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);／／调用的是插件的install方法；
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);//若插件本省就是一个函数。则直接调用该函数
    }
    plugin.installed = true;
    return this
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>Vue.<span class="hljs-keyword">use</span> = function (<span class="hljs-keyword">plugin</span>) {
    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">plugin</span>.installed) {
      <span class="hljs-keyword">return</span><span class="hljs-comment">//假如插件已经初始化过就不再继续。避免插件重复入侵</span>
    }
    <span class="hljs-comment">// additional parameters</span>
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">args</span> = toArray(arguments, 1);<span class="hljs-comment">//获取插件的配置参数</span>
    <span class="hljs-keyword">args</span>.unshift(this);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">plugin</span>.install === 'function') {
      <span class="hljs-keyword">plugin</span>.install.apply(<span class="hljs-keyword">plugin</span>, <span class="hljs-keyword">args</span>);／／调用的是插件的install方法；
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">plugin</span> === 'function') {
      <span class="hljs-keyword">plugin</span>.apply(null, <span class="hljs-keyword">args</span>);<span class="hljs-comment">//若插件本省就是一个函数。则直接调用该函数</span>
    }
    <span class="hljs-keyword">plugin</span>.installed = true;
    <span class="hljs-keyword">return</span> this
  };</code></pre>
<p>Vue.use这个方法让我们知道来。插件入侵的起点是调用插件自身的install函数。那么不同的插件入侵的机制有些时候很不一样。我们可以知道。这个不一样肯定发生在install函数中。我们来看看官方的install函数中的一些方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<p>我们按官网推荐的四种例子。来看看每种方法对应的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1:Vue.myGlobalMethod = function () {
    // 逻辑...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-number">1</span>:Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }</code></pre>
<p>类似jquery中的jquery.myGlobalMethod或则$.myGlobalMethod简单来说就是给Vue这个全局对象添加一些工具方法。可以供全局快捷调用。我们这里就略过了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2: // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-number">2</span>: <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })</code></pre>
<p>Vue.directive，Vue.filter，Vue.component等价。当全局使用这些api时。会在vue上把这些指令过滤器组件等放在相应的属性数组里。形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.options = {
    components: {
      
    },
    directives: {},
    filters: {},
    _base: Vue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>Vue.<span class="hljs-keyword">options</span> = {
    component<span class="hljs-variable">s:</span> {
      
    },
    directive<span class="hljs-variable">s:</span> {},
    <span class="hljs-built_in">filter</span><span class="hljs-variable">s:</span> {},
    _base: Vue
}</code></pre>
<p>因为他挂在全局的vue中。在vue初始化。调用init方法时。会执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),//策略合并核心函数。可以仔细去看看
        options || {},
        vm
      );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code> vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),<span class="hljs-regexp">//</span>策略合并核心函数。可以仔细去看看
        options <span class="hljs-params">||</span> {},
        vm
      );</code></pre>
<p>vue在创建实例时。会把vue对象上的options的对象中的属性提取出来和传入的options做合并。这里涉及到合并策略。以后会专门讲一下。这里只要知道。vue每个配置相都有自己的合并规则。mergeOptions会根据合并的类目去选择对应的合并规则。这里的component.directive.filter根据合并规则。Vue对象上的全局的这些属性会被放在实例的__proto__上。<br>同样的。相应的子组件。可以回过头去看一下组件那一章。在render创建子组件的时候。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn((&quot;Invalid Component definition: &quot; + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);//核心：这里会再次合并一下vue上的全局的一些指令或则组件或则过滤器到组件的构造函数上

  data = data || {};

  // transform component v-model data into props &amp; events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props &amp; listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    (&quot;vue-component-&quot; + (Ctor.cid) + (name ? (&quot;-&quot; + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>function createComponent (
  Ctor,
  <span class="hljs-built_in">data</span>,
  context,
  children,
  <span class="hljs-built_in">tag</span>
) {
  <span class="hljs-keyword">if</span> (isUndef(Ctor)) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-built_in">var</span> baseCtor = context.$options._base;

  <span class="hljs-comment">// plain options object: turn it into a constructor</span>
  <span class="hljs-keyword">if</span> (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  <span class="hljs-comment">// if at this stage it's not a constructor or an async component factory,</span>
  <span class="hljs-comment">// reject.</span>
  <span class="hljs-keyword">if</span> (typeof Ctor !== <span class="hljs-string">'function'</span>) {
    {
      warn((<span class="hljs-string">"Invalid Component definition: "</span> + (<span class="hljs-built_in">String</span>(Ctor))), context);
    }
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// async component</span>
  <span class="hljs-keyword">if</span> (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    <span class="hljs-keyword">if</span> (Ctor === undefined) {
      <span class="hljs-comment">// return nothing if this is indeed an async component</span>
      <span class="hljs-comment">// wait for the callback to trigger parent update.</span>
      <span class="hljs-keyword">return</span>
    }
  }

  <span class="hljs-comment">// resolve constructor options in case global mixins are applied after</span>
  <span class="hljs-comment">// component constructor creation</span>
  resolveConstructorOptions(Ctor);<span class="hljs-comment">//核心：这里会再次合并一下vue上的全局的一些指令或则组件或则过滤器到组件的构造函数上</span>

  <span class="hljs-built_in">data</span> = <span class="hljs-built_in">data</span> || {};

  <span class="hljs-comment">// transform component v-model data into props &amp; events</span>
  <span class="hljs-keyword">if</span> (isDef(<span class="hljs-built_in">data</span>.model)) {
    transformModel(Ctor.options, <span class="hljs-built_in">data</span>);
  }

  <span class="hljs-comment">// extract props</span>
  <span class="hljs-built_in">var</span> propsData = extractPropsFromVNodeData(<span class="hljs-built_in">data</span>, Ctor, <span class="hljs-built_in">tag</span>);

  <span class="hljs-comment">// functional component</span>
  <span class="hljs-keyword">if</span> (isTrue(Ctor.options.functional)) {
    <span class="hljs-keyword">return</span> createFunctionalComponent(Ctor, propsData, <span class="hljs-built_in">data</span>, context, children)
  }

  <span class="hljs-comment">// extract listeners, since these needs to be treated as</span>
  <span class="hljs-comment">// child component listeners instead of DOM listeners</span>
  <span class="hljs-built_in">var</span> listeners = <span class="hljs-built_in">data</span>.<span class="hljs-keyword">on</span>;
  <span class="hljs-comment">// replace with listeners with .native modifier</span>
  <span class="hljs-built_in">data</span>.<span class="hljs-keyword">on</span> = <span class="hljs-built_in">data</span>.nativeOn;

  <span class="hljs-keyword">if</span> (isTrue(Ctor.options.abstract)) {
    <span class="hljs-comment">// abstract components do not keep anything</span>
    <span class="hljs-comment">// other than props &amp; listeners</span>
    <span class="hljs-built_in">data</span> = {};
  }

  <span class="hljs-comment">// merge component management hooks onto the placeholder node</span>
  mergeHooks(<span class="hljs-built_in">data</span>);

  <span class="hljs-comment">// return a placeholder vnode</span>
  <span class="hljs-built_in">var</span> name = Ctor.options.name || <span class="hljs-built_in">tag</span>;
  <span class="hljs-built_in">var</span> vnode = <span class="hljs-literal">new</span> VNode(
    (<span class="hljs-string">"vue-component-"</span> + (Ctor.cid) + (name ? (<span class="hljs-string">"-"</span> + name) : <span class="hljs-string">''</span>)),
    <span class="hljs-built_in">data</span>, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, <span class="hljs-built_in">tag</span>: <span class="hljs-built_in">tag</span>, children: children }
  );
  <span class="hljs-keyword">return</span> vnode
}</code></pre>
<p>最后在内部组件初始化时。vue会调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);//这里还是把构造函数的options放在了$options上供后续使用
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>function initInternalComponent (vm, <span class="hljs-keyword">options</span>) {
  var opts = vm.$<span class="hljs-keyword">options</span> = Object.create(vm.constructor.<span class="hljs-keyword">options</span>);<span class="hljs-comment">//这里还是把构造函数的options放在了$options上供后续使用</span>
  <span class="hljs-comment">// doing this because it's faster than dynamic enumeration.</span>
  opts.parent = <span class="hljs-keyword">options</span>.parent;
  opts.propsData = <span class="hljs-keyword">options</span>.propsData;
  opts._parentVnode = <span class="hljs-keyword">options</span>._parentVnode;
  opts._parentListeners = <span class="hljs-keyword">options</span>._parentListeners;
  opts._renderChildren = <span class="hljs-keyword">options</span>._renderChildren;
  opts._componentTag = <span class="hljs-keyword">options</span>._componentTag;
  opts._parentElm = <span class="hljs-keyword">options</span>._parentElm;
  opts._refElm = <span class="hljs-keyword">options</span>._refElm;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.render) {
    opts.render = <span class="hljs-keyword">options</span>.render;
    opts.staticRenderFns = <span class="hljs-keyword">options</span>.staticRenderFns;
  }
}</code></pre>
<p>总的来说。如果是全局的指令过滤器时。vue统一把他放在根构造方法上。根实例初始化时。通过策略合并合并到$options中。而子组件稍微绕了一下。最终也是放在$options的原型上。很连贯啊。这样只要是全局的组件。指令过滤器。每个子组件都可以继承使用。达到了插件的效果。</p>
<p>3:下面来看看mixin方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })


Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };


//这里还是不可避免要看看mergeOptions函数：
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Vue.mixin({
    <span class="hljs-attribute">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })


Vue.mixin = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mixin</span>) </span>{
    <span class="hljs-keyword">this</span>.options = mergeOptions(<span class="hljs-keyword">this</span>.options, mixin);
  };


<span class="hljs-comment">//这里还是不可避免要看看mergeOptions函数：</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeOptions</span> (<span class="hljs-params">
  parent,
  child,
  vm
</span>) </span>{
  {
    checkComponents(child);
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> child === <span class="hljs-string">'function'</span>) {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  <span class="hljs-built_in">var</span> extendsFrom = child.extends;
  <span class="hljs-keyword">if</span> (extendsFrom) {
    <span class="hljs-built_in">parent</span> = mergeOptions(<span class="hljs-built_in">parent</span>, extendsFrom, vm);
  }
  <span class="hljs-keyword">if</span> (child.mixins) {
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, l = child.mixins.length; i &lt; l; i++) {
      <span class="hljs-built_in">parent</span> = mergeOptions(<span class="hljs-built_in">parent</span>, child.mixins[i], vm);
    }
  }
  <span class="hljs-built_in">var</span> options = {};
  <span class="hljs-built_in">var</span> key;
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> <span class="hljs-built_in">parent</span>) {
    mergeField(key);
  }
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> child) {
    <span class="hljs-keyword">if</span> (!hasOwn(<span class="hljs-built_in">parent</span>, key)) {
      mergeField(key);
    }
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeField</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-built_in">var</span> strat = strats[key] || defaultStrat;
    options[key] = strat(<span class="hljs-built_in">parent</span>[key], child[key], vm, key);
  }
  <span class="hljs-keyword">return</span> options
}
</code></pre>
<p>分两种情况吧：</p>
<p>a:全局注册时即vue.mixin时。直接调用合并。直接便利mixin中的项目。分别调用相应合并策略。合并到构造函数的options中。影响后面所有的子组件</p>
<p>b:局部注册时。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">if</span> (child.mixins) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = child.mixins.length; i &lt; l; i++) {
      <span class="hljs-keyword">parent</span> = mergeOptions(<span class="hljs-keyword">parent</span>, child.mixins[i], vm);
    }
  }</code></pre>
<p>则会去递归的调用合并策略把该合并的项目合并结束为止；</p>
<p>vue.mixin就相当于是一个传入的额外的配置项目，会让vue重新按照规则合并一次，成功入侵vue</p>
<p>4:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }</code></pre>
<p>这个方法就很明显了。在vue的原型上挂载方法。vue的实例自然而然就能继承。子组件在创建的时候。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Sub</span>.proto<span class="hljs-keyword">type</span> = <span class="hljs-type">Object</span>.create(<span class="hljs-type">Super</span>.prototype);
    <span class="hljs-type">Sub</span>.proto<span class="hljs-keyword">type</span>.constructor = <span class="hljs-type">Sub</span>;</code></pre>
<p>将原型指向根构造函数Vue的prototype；自然而然就会有Vue的原型上的所有属性和方法。。</p>
<p>以上就是vue比较常用的插件侵入方法。哈哈。下次再说。告辞</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue源码解析－插件入侵机制

## 原文链接
[https://segmentfault.com/a/1190000009811112](https://segmentfault.com/a/1190000009811112)


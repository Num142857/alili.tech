---
title: 'Vue源码解析(一)-模版渲染' 
date: 2018-12-27 2:30:12
hidden: true
slug: 103nrb2vbrvd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue demo</h2>
<p>先给出vue简单的使用demo,通过创建一个Vue的实例，&lt;div id="app"&gt;&lt;/div&gt;将被替换成template模版中的内容，a,b的值也会被换成data属性的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;></div>

var vm = new Vue({
  el: '#app',
  template: 
  `<div>
    <p>"{{"a"}}"</p>
    <p>"{{"b"}}"</p>
    <div :class=&quot;a&quot;>btn1</div>
    <div @click=&quot;plus()&quot;>btn2</div>
    <div>
        <div>
            <div>str1</div>
            <div>str2</div>
        </div>
        <div>str3</div>
     </div>
    </div>`,
  data(){
    return {
      a: 1,
      b: 2
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

var vm = new Vue({
  el: '#app',
  template: 
  `<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"a"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"b"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"a"</span>&gt;</span>btn1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"plus()"</span>&gt;</span>btn2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>str1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>str2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>str3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`,
  data(){
    return {
      a: 1,
      b: 2
    }
  }
})</span></code></pre>
<h2 id="articleHeader1">模版渲染</h2>
<p>以下的分析代码都经过作者简化，只为简单清楚的解析vue的实现逻辑<br>首先根据参数template属性生成render函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  var vm = this;
  //参数el属性存在，就调用mount方法；初始化时也可以不传el属性，后续调用mount方法
  if (vm.$options.el) {
      vm.$mount(vm.$options.el);
  }
}

Vue.prototype.$mount = function () {
  var ref = compileToFunctions(template, {
    shouldDecodeNewlines: shouldDecodeNewlines,
    delimiters: options.delimiters,
    comments: options.comments
  }, this);
  //由template参数得到render方法
  var render = ref.render;   
  //由template参数得到最大静态渲染树
  var staticRenderFns = ref.staticRenderFns;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> <span class="hljs-params">(options)</span> </span>{
  this._init(options);
}

Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> </span>{
  <span class="hljs-keyword">var</span> vm = this;
  <span class="hljs-comment">//参数el属性存在，就调用mount方法；初始化时也可以不传el属性，后续调用mount方法</span>
  <span class="hljs-keyword">if</span> (vm.$options.el) {
      vm.$mount(vm.$options.el);
  }
}

Vue.prototype.$mount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> ref = compileToFunctions(template, {
    shouldDecodeNewlines: shouldDecodeNewlines,
    delimiters: options.delimiters,
    comments: options.comments
  }, this);
  <span class="hljs-comment">//由template参数得到render方法</span>
  <span class="hljs-keyword">var</span> render = ref.render;   
  <span class="hljs-comment">//由template参数得到最大静态渲染树</span>
  <span class="hljs-keyword">var</span> staticRenderFns = ref.staticRenderFns;
};</code></pre>
<p>下面看下compileToFunctions生成render方法的具体实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>  var ast = parse(<span class="hljs-name">template</span>.trim(), options)<span class="hljs-comment">;</span>
  optimize(<span class="hljs-name">ast</span>, options)<span class="hljs-comment">;</span>
  var code = generate(<span class="hljs-name">ast</span>, options)<span class="hljs-comment">;</span></code></pre>
<p>首先根据template字符串生成ast对象，parse函数主要是通过正则表达式将str转换成<br>树结构的对象，ast对象基本结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVXLK9?w=1459&amp;h=288" src="https://static.alili.tech/img/bVXLK9?w=1459&amp;h=288" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>然后对ast对象进行优化，找出ast对象中所有的最大静态子树（可以简单理解为不包含参数data属性的dom节点，每次data数据改变导致页面重新渲染的时候，最大静态子树不需要重新计算生成），基本实现逻辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function optimize (root, options) {
  //将ast对象的所有节点标记为是否静态
  markStatic(root);
  markStaticRoots(root, false);
}
function markStatic (node) {
  //当前节点是否静态
  node.static = isStatic(node);
  //递归标记node的子节点是否静态
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    markStatic(child);
    //只要有一个子节点非静态，父节点也非静态
    if (!child.static) {
      node.static = false;
    }
  }
}
function markStaticRoots (node, isInFor) {
    //将包含至少一个非文本子节点（node.type === 3代表文本节点）的节点标记为最大静态树的根节点
    if (node.static &amp;&amp; node.children.length &amp;&amp; !(
      node.children.length === 1 &amp;&amp;
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    //当前node节点不是静态根节点，递归判断子节点
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">optimize</span> <span class="hljs-params">(root, options)</span> {</span>
  <span class="hljs-comment">//将ast对象的所有节点标记为是否静态</span>
  markStatic(root);
  markStaticRoots(root, <span class="hljs-literal">false</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">markStatic</span> <span class="hljs-params">(node)</span> {</span>
  <span class="hljs-comment">//当前节点是否静态</span>
  node.static = isStatic(node);
  <span class="hljs-comment">//递归标记node的子节点是否静态</span>
  <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>, l = node.<span class="hljs-built_in">children</span>.length; i &lt; l; i++) {
    var child = node.<span class="hljs-built_in">children</span>[i];
    markStatic(child);
    <span class="hljs-comment">//只要有一个子节点非静态，父节点也非静态</span>
    <span class="hljs-keyword">if</span> (!child.static) {
      node.static = <span class="hljs-literal">false</span>;
    }
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">markStaticRoots</span> <span class="hljs-params">(node, isInFor)</span> {</span>
    <span class="hljs-comment">//将包含至少一个非文本子节点（node.type === 3代表文本节点）的节点标记为最大静态树的根节点</span>
    <span class="hljs-keyword">if</span> (node.static &amp;&amp; node.<span class="hljs-built_in">children</span>.length &amp;&amp; !(
      node.<span class="hljs-built_in">children</span>.length === <span class="hljs-number">1</span> &amp;&amp;
      node.<span class="hljs-built_in">children</span>[<span class="hljs-number">0</span>].type === <span class="hljs-number">3</span>
    )) {
      node.staticRoot = <span class="hljs-literal">true</span>;
      return
    } <span class="hljs-keyword">else</span> {
      node.staticRoot = <span class="hljs-literal">false</span>;
    }
    <span class="hljs-comment">//当前node节点不是静态根节点，递归判断子节点</span>
    <span class="hljs-keyword">if</span> (node.<span class="hljs-built_in">children</span>) {
      <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>, l = node.<span class="hljs-built_in">children</span>.length; i &lt; l; i++) {
        markStaticRoots(node.<span class="hljs-built_in">children</span>[i], isInFor || !!node.<span class="hljs-keyword">for</span>);
      }
    }
}</code></pre>
<p>本例中的最大静态树：<br><span class="img-wrap"><img data-src="/img/bVXL11?w=642&amp;h=222" src="https://static.alili.tech/img/bVXL11?w=642&amp;h=222" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>最终生成的渲染函数code如下<br><span class="img-wrap"><img data-src="/img/bVXL33?w=1359&amp;h=52" src="https://static.alili.tech/img/bVXL33?w=1359&amp;h=52" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>其中render是整个模版的渲染函数，staticrenderfns是静态树的渲染函数，staticrenderfns中的函数只会初始化一次，后续不需要再计算<br>render函数中用到的一些方法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  //转换为string对象
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  //生成虚拟文本节点
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}
//生成虚拟dom节点
vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-function">function <span class="hljs-title">installRenderHelpers</span> <span class="hljs-params">(<span class="hljs-keyword">target</span>)</span> </span>{
  <span class="hljs-keyword">target</span>._o = markOnce;
  <span class="hljs-keyword">target</span>._n = toNumber;
  <span class="hljs-comment">//转换为string对象</span>
  <span class="hljs-keyword">target</span>._s = toString;
  <span class="hljs-keyword">target</span>._l = renderList;
  <span class="hljs-keyword">target</span>._t = renderSlot;
  <span class="hljs-keyword">target</span>._q = looseEqual;
  <span class="hljs-keyword">target</span>._i = looseIndexOf;
  <span class="hljs-keyword">target</span>._m = renderStatic;
  <span class="hljs-keyword">target</span>._f = resolveFilter;
  <span class="hljs-keyword">target</span>._k = checkKeyCodes;
  <span class="hljs-keyword">target</span>._b = bindObjectProps;
  <span class="hljs-comment">//生成虚拟文本节点</span>
  <span class="hljs-keyword">target</span>._v = createTextVNode;
  <span class="hljs-keyword">target</span>._e = createEmptyVNode;
  <span class="hljs-keyword">target</span>._u = resolveScopedSlots;
  <span class="hljs-keyword">target</span>._g = bindObjectListeners;
}
<span class="hljs-comment">//生成虚拟dom节点</span>
vm._c = function (a, b, c, d) { <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-title">createElement</span><span class="hljs-params">(vm, a, b, c, d, <span class="hljs-keyword">false</span>)</span></span>; };</code></pre>
<p>得到render函数后会继续调用下面的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mountComponent (
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
    //对vue实例新建一个Watcher监听对象，每当vm.data数据有变化，Watcher监听到后负责调用updateComponent进行dom更新
    vm._watcher = new Watcher(vm, updateComponent, noop);
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>function mountComponent (
    <span class="hljs-name">updateComponent</span> = function () {
      vm._update(<span class="hljs-name">vm</span>._render(), hydrating)<span class="hljs-comment">;</span>
    }<span class="hljs-comment">;</span>
    //对vue实例新建一个Watcher监听对象，每当vm.data数据有变化，Watcher监听到后负责调用updateComponent进行dom更新
    vm._watcher = new Watcher(<span class="hljs-name">vm</span>, updateComponent, noop)<span class="hljs-comment">;</span>
)</code></pre>
<p>render函数调用后(vm._render())会生成vnode对象，也就是大家熟知的虚拟dom树，调用update方法就能根据vonde更新真实的浏览器dom。<br>接下来我们分析下updatecomponents是如何调用的，这就涉及到了vue经典的watch机制（此处先简单介绍，下一篇会有较详细的分析）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//new Watcher时会先调用一次updateComponent，后续会监听vm.data的变化
var Watcher = function Watcher (vm,expOrFn){
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  }
  this.get();
}
Watcher.prototype.get = function get () {
   value = this.getter.call(vm, vm);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//new Watcher时会先调用一次updateComponent，后续会监听vm.data的变化</span>
<span class="hljs-keyword">var</span> Watcher = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span> <span class="hljs-params">(vm,expOrFn)</span></span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> expOrFn === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">this</span>.getter = expOrFn;
  }
  <span class="hljs-keyword">this</span>.get();
}
Watcher.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span> <span class="hljs-params">()</span> </span>{
   value = <span class="hljs-keyword">this</span>.getter.call(vm, vm);
}</code></pre>
<p>最后再讲一下 vm._update方法的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._update = function (vnode, hydrating) {
    var prevVnode = vm._vnode;
    vm._vnode = vnode;
    //判断vnode是否初始化过
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        //  vm.$el是vm对象挂载的节点，本例是<div id=&quot;app&quot;></div>
        //  vm.$options._parentElm是组件挂载的节点（父节点），后面介绍组件时分析
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
}
//vm.__pathch__方法
function function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm）{
    //根据vnode生成element并插入parentElm
    createElm(vnode, insertedVnodeQueue, parentElm, refElm);
}
//下面主要介绍初始化dom的实现
function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    //根据vnode节点生成浏览器Element对象
    vnode.elm = nodeOps.createElement(tag, vnode);
    var children = vnode.children;
    //递归将vnode子节点生成Element对象
    createChildren(vnode, children, insertedVnodeQueue);
    //将生成的vnode.elm插入到浏览器的父节点当中
    insert(parentElm, vnode.elm, refElm);
}

function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    //当vnode是文本节点时停止递归  
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.prototype._update = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(vnode, hydrating)</span> </span>{
    <span class="hljs-keyword">var</span> prevVnode = vm._vnode;
    vm._vnode = vnode;
    <span class="hljs-comment">//判断vnode是否初始化过</span>
    <span class="hljs-keyword">if</span> (!prevVnode) {
      <span class="hljs-comment">// initial render</span>
      vm.$el = vm.__patch__(
        <span class="hljs-comment">//  vm.$el是vm对象挂载的节点，本例是&lt;div id="app"&gt;&lt;/div&gt;</span>
        <span class="hljs-comment">//  vm.$options._parentElm是组件挂载的节点（父节点），后面介绍组件时分析</span>
        vm.$el, vnode, hydrating, <span class="hljs-literal">false</span> <span class="hljs-comment">/* removeOnly */</span>,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// updates</span>
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
}
<span class="hljs-comment">//vm.__pathch__方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">function</span> <span class="hljs-title">patch</span> <span class="hljs-params">(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm）{
    <span class="hljs-comment">//根据vnode生成element并插入parentElm</span>
    createElm(vnode, insertedVnodeQueue, parentElm, refElm)</span></span>;
}
<span class="hljs-comment">//下面主要介绍初始化dom的实现</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElm</span> <span class="hljs-params">(vnode, insertedVnodeQueue, parentElm, refElm, nested)</span> </span>{
    <span class="hljs-comment">//根据vnode节点生成浏览器Element对象</span>
    vnode.elm = nodeOps.createElement(tag, vnode);
    <span class="hljs-keyword">var</span> children = vnode.children;
    <span class="hljs-comment">//递归将vnode子节点生成Element对象</span>
    createChildren(vnode, children, insertedVnodeQueue);
    <span class="hljs-comment">//将生成的vnode.elm插入到浏览器的父节点当中</span>
    insert(parentElm, vnode.elm, refElm);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createChildren</span> <span class="hljs-params">(vnode, children, insertedVnodeQueue)</span> </span>{
    <span class="hljs-keyword">if</span> (Array.isArray(children)) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, <span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
      }
    <span class="hljs-comment">//当vnode是文本节点时停止递归  </span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码解析(一)-模版渲染

## 原文链接
[https://segmentfault.com/a/1190000011816036](https://segmentfault.com/a/1190000011816036)


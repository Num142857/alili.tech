---
title: 'Vue原理解析之Virtual Dom' 
date: 2019-01-27 2:30:59
hidden: true
slug: mgakg6vp2m
categories: [reprint]
---

{{< raw >}}

                    
<p><code>DOM</code>是文档对象模型(<code>Document Object Model</code>)的简写，在浏览器中我们可以通过js来操作<code>DOM</code>，但是这样的操作性能很差，于是<code>Virtual Dom</code>应运而生。我的理解，<code>Virtual Dom</code>就是在js中模拟<code>DOM</code>对象树来优化<code>DOM</code>操作的一种技术或思路。</p>
<p>本文将对于Vue框架2.1.8版本中使用的<code>Virtual Dom</code>进行分析。</p>
<h2 id="articleHeader0">VNode对象</h2>
<p>一个VNode的实例对象包含了以下属性</p>
<ul>
<li><p><code>tag</code>: 当前节点的标签名</p></li>
<li><p><code>data</code>: 当前节点的数据对象，具体包含哪些字段可以参考vue源码<code>types/vnode.d.ts</code>中对<code>VNodeData</code>的定义<br><span class="img-wrap"><img data-src="/img/bVITKL?w=419&amp;h=458" src="https://static.alili.tech/img/bVITKL?w=419&amp;h=458" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p><code>children</code>: 数组类型，包含了当前节点的子节点</p></li>
<li><p><code>text</code>: 当前节点的文本，一般文本节点或注释节点会有该属性</p></li>
<li><p><code>elm</code>: 当前虚拟节点对应的真实的dom节点</p></li>
<li><p><code>ns</code>: 节点的namespace</p></li>
<li><p><code>context</code>: 编译作用域</p></li>
<li><p><code>functionalContext</code>: 函数化组件的作用域</p></li>
<li><p><code>key</code>: 节点的key属性，用于作为节点的标识，有利于patch的优化</p></li>
<li><p><code>componentOptions</code>: 创建组件实例时会用到的选项信息</p></li>
<li><p><code>child</code>: 当前节点对应的组件实例</p></li>
<li><p><code>parent</code>: 组件的占位节点</p></li>
<li><p><code>raw</code>: raw html</p></li>
<li><p><code>isStatic</code>: 静态节点的标识</p></li>
<li><p><code>isRootInsert</code>: 是否作为根节点插入，被<code>&lt;transition&gt;</code>包裹的节点，该属性的值为<code>false</code></p></li>
<li><p><code>isComment</code>: 当前节点是否是注释节点</p></li>
<li><p><code>isCloned</code>: 当前节点是否为克隆节点</p></li>
<li><p><code>isOnce</code>: 当前节点是否有<code>v-once</code>指令</p></li>
</ul>
<h2 id="articleHeader1">VNode分类</h2>
<p><span class="img-wrap"><img data-src="/img/bVITTR?w=495&amp;h=540" src="https://static.alili.tech/img/bVITTR?w=495&amp;h=540" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>VNode</code>可以理解为vue框架的虚拟dom的基类，通过<code>new</code>实例化的<code>VNode</code>大致可以分为几类</p>
<ul>
<li><p><code>EmptyVNode</code>: 没有内容的注释节点</p></li>
<li><p><code>TextVNode</code>: 文本节点</p></li>
<li><p><code>ElementVNode</code>: 普通元素节点</p></li>
<li><p><code>ComponentVNode</code>: 组件节点</p></li>
<li><p><code>CloneVNode</code>: 克隆节点，可以是以上任意类型的节点，唯一的区别在于<code>isCloned</code>属性为<code>true</code></p></li>
<li><p><code>...</code></p></li>
</ul>
<h2 id="articleHeader2">createElement解析</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

function createElement (context, tag, data, children, normalizationType, alwaysNormalize) {
  // 兼容不传data的情况
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  // 如果alwaysNormalize是true
  // 那么normalizationType应该设置为常量ALWAYS_NORMALIZE的值
  if (alwaysNormalize) normalizationType = ALWAYS_NORMALIZE
  // 调用_createElement创建虚拟节点
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (context, tag, data, children, normalizationType) {
  /**
   * 如果存在data.__ob__，说明data是被Observer观察的数据
   * 不能用作虚拟节点的data
   * 需要抛出警告，并返回一个空节点
   * 
   * 被监控的data不能被用作vnode渲染的数据的原因是：
   * data在vnode渲染过程中可能会被改变，这样会触发监控，导致不符合预期的操作
   */
  if (data &amp;&amp; data.__ob__) {
    process.env.NODE_ENV !== 'production' &amp;&amp; warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
  // 当组件的is属性被设置为一个falsy的值
  // Vue将不会知道要把这个组件渲染成什么
  // 所以渲染一个空节点
  if (!tag) {
    return createEmptyVNode()
  }
  // 作用域插槽
  if (Array.isArray(children) &amp;&amp;
      typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  // 根据normalizationType的值，选择不同的处理方法
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  // 如果标签名是字符串类型
  if (typeof tag === 'string') {
    let Ctor
    // 获取标签名的命名空间
    ns = config.getTagNamespace(tag)
    // 判断是否为保留标签
    if (config.isReservedTag(tag)) {
      // 如果是保留标签,就创建一个这样的vnode
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
      // 如果不是保留标签，那么我们将尝试从vm的components上查找是否有这个标签的定义
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // 如果找到了这个标签的定义，就以此创建虚拟组件节点
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // 兜底方案，正常创建一个vnode
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
    // 当tag不是字符串的时候，我们认为tag是组件的构造类
    // 所以直接创建
  } else {
    vnode = createComponent(tag, data, context, children)
  }
  // 如果有vnode
  if (vnode) {
    // 如果有namespace，就应用下namespace，然后返回vnode
    if (ns) applyNS(vnode, ns)
    return vnode
  // 否则，返回一个空节点
  } else {
    return createEmptyVNode()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const SIMPLE_NORMALIZE = <span class="hljs-number">1</span>
const ALWAYS_NORMALIZE = <span class="hljs-number">2</span>

function createElement (context, tag, <span class="hljs-keyword">data</span>, children, normalizationType, alwaysNormalize) {
  <span class="hljs-comment">// 兼容不传data的情况</span>
  <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">data</span>) || isPrimitive(<span class="hljs-keyword">data</span>)) {
    normalizationType = children
    children = <span class="hljs-keyword">data</span>
    <span class="hljs-keyword">data</span> = undefined
  }
  <span class="hljs-comment">// 如果alwaysNormalize是true</span>
  <span class="hljs-comment">// 那么normalizationType应该设置为常量ALWAYS_NORMALIZE的值</span>
  <span class="hljs-keyword">if</span> (alwaysNormalize) normalizationType = ALWAYS_NORMALIZE
  <span class="hljs-comment">// 调用_createElement创建虚拟节点</span>
  <span class="hljs-keyword">return</span> _createElement(context, tag, <span class="hljs-keyword">data</span>, children, normalizationType)
}

function _createElement (context, tag, <span class="hljs-keyword">data</span>, children, normalizationType) {
  <span class="hljs-comment">/**
   * 如果存在data.__ob__，说明data是被Observer观察的数据
   * 不能用作虚拟节点的data
   * 需要抛出警告，并返回一个空节点
   * 
   * 被监控的data不能被用作vnode渲染的数据的原因是：
   * data在vnode渲染过程中可能会被改变，这样会触发监控，导致不符合预期的操作
   */</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span> &amp;&amp; <span class="hljs-keyword">data</span>.__ob__) {
    process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
      `Avoid using observed <span class="hljs-keyword">data</span> <span class="hljs-keyword">object</span> <span class="hljs-keyword">as</span> vnode <span class="hljs-keyword">data</span>: ${JSON.stringify(<span class="hljs-keyword">data</span>)}\n` +
      <span class="hljs-string">'Always create fresh vnode data objects in each render!'</span>,
      context
    )
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
  <span class="hljs-comment">// 当组件的is属性被设置为一个falsy的值</span>
  <span class="hljs-comment">// Vue将不会知道要把这个组件渲染成什么</span>
  <span class="hljs-comment">// 所以渲染一个空节点</span>
  <span class="hljs-keyword">if</span> (!tag) {
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
  <span class="hljs-comment">// 作用域插槽</span>
  <span class="hljs-keyword">if</span> (Array.isArray(children) &amp;&amp;
      typeof children[<span class="hljs-number">0</span>] === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span> || {}
    <span class="hljs-keyword">data</span>.scopedSlots = { <span class="hljs-keyword">default</span>: children[<span class="hljs-number">0</span>] }
    children.length = <span class="hljs-number">0</span>
  }
  <span class="hljs-comment">// 根据normalizationType的值，选择不同的处理方法</span>
  <span class="hljs-keyword">if</span> (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  <span class="hljs-comment">// 如果标签名是字符串类型</span>
  <span class="hljs-keyword">if</span> (typeof tag === <span class="hljs-string">'string'</span>) {
    let Ctor
    <span class="hljs-comment">// 获取标签名的命名空间</span>
    ns = config.getTagNamespace(tag)
    <span class="hljs-comment">// 判断是否为保留标签</span>
    <span class="hljs-keyword">if</span> (config.isReservedTag(tag)) {
      <span class="hljs-comment">// 如果是保留标签,就创建一个这样的vnode</span>
      vnode = new VNode(
        config.parsePlatformTagName(tag), <span class="hljs-keyword">data</span>, children,
        undefined, undefined, context
      )
      <span class="hljs-comment">// 如果不是保留标签，那么我们将尝试从vm的components上查找是否有这个标签的定义</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ((Ctor = resolveAsset(context.$options, <span class="hljs-string">'components'</span>, tag))) {
      <span class="hljs-comment">// 如果找到了这个标签的定义，就以此创建虚拟组件节点</span>
      vnode = createComponent(Ctor, <span class="hljs-keyword">data</span>, context, children, tag)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 兜底方案，正常创建一个vnode</span>
      vnode = new VNode(
        tag, <span class="hljs-keyword">data</span>, children,
        undefined, undefined, context
      )
    }
    <span class="hljs-comment">// 当tag不是字符串的时候，我们认为tag是组件的构造类</span>
    <span class="hljs-comment">// 所以直接创建</span>
  } <span class="hljs-keyword">else</span> {
    vnode = createComponent(tag, <span class="hljs-keyword">data</span>, context, children)
  }
  <span class="hljs-comment">// 如果有vnode</span>
  <span class="hljs-keyword">if</span> (vnode) {
    <span class="hljs-comment">// 如果有namespace，就应用下namespace，然后返回vnode</span>
    <span class="hljs-keyword">if</span> (ns) applyNS(vnode, ns)
    <span class="hljs-keyword">return</span> vnode
  <span class="hljs-comment">// 否则，返回一个空节点</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
}</code></pre>
<p>简单的梳理了一个流程图，可以参考下</p>
<p><span class="img-wrap"><img data-src="/img/bVIT2U?w=609&amp;h=705" src="https://static.alili.tech/img/bVIT2U?w=609&amp;h=705" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">patch原理</h2>
<p><code>patch</code>函数的定义在<code>src/core/vdom/patch.js</code>中，我们先来看下这个函数的逻辑</p>
<p><code>patch</code>函数接收6个参数：</p>
<ul>
<li><p><code>oldVnode</code>: 旧的虚拟节点或旧的真实dom节点</p></li>
<li><p><code>vnode</code>: 新的虚拟节点</p></li>
<li><p><code>hydrating</code>: 是否要跟真是dom混合</p></li>
<li><p><code>removeOnly</code>: 特殊flag，用于<code>&lt;transition-group&gt;</code>组件</p></li>
<li><p><code>parentElm</code>: 父节点</p></li>
<li><p><code>refElm</code>: 新节点将插入到<code>refElm</code>之前</p></li>
</ul>
<p><code>patch</code>的策略是：</p>
<ol>
<li><p>如果<code>vnode</code>不存在但是<code>oldVnode</code>存在，说明意图是要销毁老节点，那么就调用<code>invokeDestroyHook(oldVnode)</code>来进行销毁</p></li>
<li><p>如果<code>oldVnode</code>不存在但是<code>vnode</code>存在，说明意图是要创建新节点，那么就调用<code>createElm</code>来创建新节点</p></li>
<li>
<p>当<code>vnode</code>和<code>oldVnode</code>都存在时</p>
<ul>
<li><p>如果<code>oldVnode</code>和<code>vnode</code>是同一个节点，就调用<code>patchVnode</code>来进行<code>patch</code></p></li>
<li><p>当<code>vnode</code>和<code>oldVnode</code>不是同一个节点时，如果<code>oldVnode</code>是真实dom节点或<code>hydrating</code>设置为<code>true</code>，需要用<code>hydrate</code>函数将虚拟dom和真是dom进行映射，然后将<code>oldVnode</code>设置为对应的虚拟dom，找到<code>oldVnode.elm</code>的父节点，根据vnode创建一个真实dom节点并插入到该父节点中<code>oldVnode.elm</code>的位置</p></li>
</ul>
<p>这里面值得一提的是<code>patchVnode</code>函数，因为真正的patch算法是由它来实现的（patchVnode中更新子节点的算法其实是在<code>updateChildren</code>函数中实现的，为了便于理解，我统一放到<code>patchVnode</code>中来解释）。</p>
</li>
</ol>
<p><code>patchVnode</code>算法是：</p>
<ol>
<li><p>如果<code>oldVnode</code>跟<code>vnode</code>完全一致，那么不需要做任何事情</p></li>
<li><p>如果<code>oldVnode</code>跟<code>vnode</code>都是静态节点，且具有相同的<code>key</code>，当<code>vnode</code>是克隆节点或是<code>v-once</code>指令控制的节点时，只需要把<code>oldVnode.elm</code>和<code>oldVnode.child</code>都复制到<code>vnode</code>上，也不用再有其他操作</p></li>
<li>
<p>否则，如果<code>vnode</code>不是文本节点或注释节点</p>
<ul>
<li>
<p>如果<code>oldVnode</code>和<code>vnode</code>都有子节点，且2方的子节点不完全一致，就执行更新子节点的操作（这一部分其实是在<code>updateChildren</code>函数中实现），算法如下</p>
<ul>
<li><p>分别获取<code>oldVnode</code>和<code>vnode</code>的<code>firstChild</code>、<code>lastChild</code>，赋值给<code>oldStartVnode</code>、<code>oldEndVnode</code>、<code>newStartVnode</code>、<code>newEndVnode</code></p></li>
<li><p>如果<code>oldStartVnode</code>和<code>newStartVnode</code>是同一节点，调用<code>patchVnode</code>进行<code>patch</code>，然后将<code>oldStartVnode</code>和<code>newStartVnode</code>都设置为下一个子节点，重复上述流程<br><span class="img-wrap"><img data-src="/img/bVIVBX?w=667&amp;h=204" src="https://static.alili.tech/img/bVIVBX?w=667&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></li>
<li><p>如果<code>oldEndVnode</code>和<code>newEndVnode</code>是同一节点，调用<code>patchVnode</code>进行<code>patch</code>，然后将<code>oldEndVnode</code>和<code>newEndVnode</code>都设置为上一个子节点，重复上述流程<br><span class="img-wrap"><img data-src="/img/bVIVCG?w=676&amp;h=221" src="https://static.alili.tech/img/bVIVCG?w=676&amp;h=221" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></li>
<li><p>如果<code>oldStartVnode</code>和<code>newEndVnode</code>是同一节点，调用<code>patchVnode</code>进行<code>patch</code>，如果<code>removeOnly</code>是<code>false</code>，那么可以把<code>oldStartVnode.elm</code>移动到<code>oldEndVnode.elm</code>之后，然后把<code>oldStartVnode</code>设置为下一个节点，<code>newEndVnode</code>设置为上一个节点，重复上述流程<br><span class="img-wrap"><img data-src="/img/bVIVEu?w=826&amp;h=224" src="https://static.alili.tech/img/bVIVEu?w=826&amp;h=224" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></li>
<li><p>如果<code>newStartVnode</code>和<code>oldEndVnode</code>是同一节点，调用<code>patchVnode</code>进行<code>patch</code>，如果<code>removeOnly</code>是<code>false</code>，那么可以把<code>oldEndVnode.elm</code>移动到<code>oldStartVnode.elm</code>之前，然后把<code>newStartVnode</code>设置为下一个节点，<code>oldEndVnode</code>设置为上一个节点，重复上述流程<br><span class="img-wrap"><img data-src="/img/bVIVFk?w=864&amp;h=214" src="https://static.alili.tech/img/bVIVFk?w=864&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></li>
<li><p>如果以上都不匹配，就尝试在<code>oldChildren</code>中寻找跟<code>newStartVnode</code>具有相同<code>key</code>的节点，如果找不到相同<code>key</code>的节点，说明<code>newStartVnode</code>是一个新节点，就创建一个，然后把<code>newStartVnode</code>设置为下一个节点</p></li>
<li><p>如果上一步找到了跟<code>newStartVnode</code>相同<code>key</code>的节点，那么通过其他属性的比较来判断这2个节点是否是同一个节点，如果是，就调用<code>patchVnode</code>进行<code>patch</code>，如果<code>removeOnly</code>是<code>false</code>，就把<code>newStartVnode.elm</code>插入到<code>oldStartVnode.elm</code>之前，把<code>newStartVnode</code>设置为下一个节点，重复上述流程<br><span class="img-wrap"><img data-src="/img/bVIVJb?w=869&amp;h=227" src="https://static.alili.tech/img/bVIVJb?w=869&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>如果在<code>oldChildren</code>中没有寻找到<code>newStartVnode</code>的同一节点，那就创建一个新节点，把<code>newStartVnode</code>设置为下一个节点，重复上述流程</p></li>
<li><p>如果<code>oldStartVnode</code>跟<code>oldEndVnode</code>重合了，并且<code>newStartVnode</code>跟<code>newEndVnode</code>也重合了，这个循环就结束了</p></li>
</ul>
</li>
<li><p>如果只有<code>oldVnode</code>有子节点，那就把这些节点都删除</p></li>
<li><p>如果只有<code>vnode</code>有子节点，那就创建这些子节点</p></li>
<li><p>如果<code>oldVnode</code>和<code>vnode</code>都没有子节点，但是<code>oldVnode</code>是文本节点或注释节点，就把<code>vnode.elm</code>的文本设置为空字符串</p></li>
</ul>
</li>
<li><p>如果<code>vnode</code>是文本节点或注释节点，但是<code>vnode.text != oldVnode.text</code>时，只需要更新<code>vnode.elm</code>的文本内容就可以</p></li>
</ol>
<h2 id="articleHeader4">生命周期</h2>
<p><code>patch</code>提供了5个生命周期钩子，分别是</p>
<ul>
<li><p><code>create</code>: 创建patch时</p></li>
<li><p><code>activate</code>: 激活组件时</p></li>
<li><p><code>update</code>: 更新节点时</p></li>
<li><p><code>remove</code>: 移除节点时</p></li>
<li><p><code>destroy</code>: 销毁节点时</p></li>
</ul>
<p>这些钩子是提供给Vue内部的<code>directives</code>/<code>ref</code>/<code>attrs</code>/<code>style</code>等模块使用的，方便这些模块在patch的不同阶段进行相应的操作，这里模块定义在<code>src/core/vdom/modules</code>和<code>src/platforms/web/runtime/modules</code>2个目录中</p>
<p><code>vnode</code>也提供了生命周期钩子，分别是</p>
<ul>
<li><p><code>init</code>: vdom初始化时</p></li>
<li><p><code>create</code>: vdom创建时</p></li>
<li><p><code>prepatch</code>: patch之前</p></li>
<li><p><code>insert</code>: vdom插入后</p></li>
<li><p><code>update</code>: vdom更新前</p></li>
<li><p><code>postpatch</code>: patch之后</p></li>
<li><p><code>remove</code>: vdom移除时</p></li>
<li><p><code>destroy</code>: vdom销毁时</p></li>
</ul>
<p>vue组件的生命周期底层其实就依赖于vnode的生命周期，在<code>src/core/vdom/create-component.js</code>中我们可以看到，vue为自己的组件vnode已经写好了默认的<code>init</code>/<code>prepatch</code>/<code>insert</code>/<code>destroy</code>，而vue组件的<code>mounted</code>/<code>activated</code>就是在<code>insert</code>中触发的，<code>deactivated</code>就是在<code>destroy</code>中触发的</p>
<h2 id="articleHeader5">实践</h2>
<p>在Vue里面，<code>Vue.prototype.$createElement</code>对应vdom的<code>createElement</code>方法，<code>Vue.prototype.__patch__</code>对应<code>patch</code>方法，我写了个简单的demo来验证下功能</p>
<p>&lt;p data-height="265" data-theme-id="0" data-slug-hash="rjZKZz" data-default-tab="html,result" data-user="JoeRay" data-embed-version="2" data-pen-title="Vue Virtual Dom" class="codepen"&gt;See the Pen <a href="http://codepen.io/JoeRay/pen/rjZKZz/" rel="nofollow noreferrer" target="_blank">Vue Virtual Dom</a><button class="btn btn-xs btn-default ml10 preview" data-url="JoeRay/pen/rjZKZz/" data-typeid="3">点击预览</button> by zhulei (<a href="http://codepen.io/JoeRay" rel="nofollow noreferrer" target="_blank">@JoeRay</a><button class="btn btn-xs btn-default ml10 preview" data-url="JoeRay" data-typeid="3">点击预览</button>) on <a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src="<a href="https://production-assets.codepen.io/assets/embed/ei.js%22&gt;&lt;/script&gt;" rel="nofollow noreferrer" target="_blank">https://production-assets.cod...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue原理解析之Virtual Dom

## 原文链接
[https://segmentfault.com/a/1190000008291645](https://segmentfault.com/a/1190000008291645)


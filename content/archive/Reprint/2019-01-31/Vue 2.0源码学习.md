---
title: 'Vue 2.0源码学习' 
date: 2019-01-31 2:31:16
hidden: true
slug: 3v2of4ensgc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue2.0介绍</h1>
<p>从去年9月份了解到Vue后，就被他简洁的API所吸引。1.0版本正式发布后，就在业务中开始使用，将原先jQuery的功能逐步的进行迁移。   <br>今年的10月1日，Vue的2.0版本正式发布了，其中核心代码都进行了重写，于是就专门花时间，对Vue 2.0的源码进行了学习。本篇文章就是2.0源码学习的总结。    </p>
<p>先对Vue 2.0的新特性做一个简单的介绍：</p>
<ul>
<li><p><strong>大小 &amp; 性能</strong>。Vue 2.0的线上包gzip后只有12Kb，而1.0需要22Kb，react需要44Kb。而且，Vue 2.0的性能在react等几个框架中，性能是最快的。</p></li>
<li><p><strong>VDOM</strong>。实现了Virtual DOM, 并且将静态子树进行了提取，减少界面重绘时的对比。与1.0对比性能有明显提升。</p></li>
<li><p><strong>template &amp; JSX</strong>。众所周知，Vue 1.0使用的是template来实现模板，而React使用了JSX实现模板。关于template和JSX的争论也很多，很多人不使用React就是因为没有支持template写法。Vue 2.0对template和JSX写法都做了支持。使用时，可以根据具体业务细节进行选择，可以很好的发挥两者的优势。就这一点，Vue已经超过React了。</p></li>
<li><p><strong>Server Render</strong>。2.0还对了Server Render做了支持。这一点并没有在业务中使用，不做评价。</p></li>
</ul>
<p>Vue的最新源码可以去 <a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue</a> 获得。本文讲的是 2.0.3版本，2.0.3可以去 <a href="https://github.com/vuejs/vue/tree/v2.0.3" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a> 这里获得。   </p>
<p>下面开始进入正题。首先从生命周期开始。</p>
<h1 id="articleHeader1">生命周期</h1>
<p><span class="img-wrap"><img data-src="/img/bVEs9r" src="https://static.alili.tech/img/bVEs9r" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图就是官方给出的Vue 2.0的生命周期图，其中包含了Vue对象生命周期过程中的几个核心步骤。了解了这几个过程，可以很好的帮助我们理解Vue的创建与销毁过程。<br>从图中我们可以看出，生命周期主要分为4个过程：</p>
<ul>
<li><p><strong>create</strong>。<code>new Vue</code>时，会先进行create，创建出Vue对象。</p></li>
<li><p><strong>mount</strong>。根据el, template, render方法等属性，会生成DOM，并添加到对应位置。</p></li>
<li><p><strong>update</strong>。当数据发生变化后，会重新渲染DOM，并进行替换。</p></li>
<li><p><strong>destory</strong>。销毁时运行。</p></li>
</ul>
<p>那么这4个过程在源码中是怎么实现的呢？我们从<code>new Vue</code>开始。</p>
<h1 id="articleHeader2">new Vue</h1>
<p>为了更好的理解new的过程，我整理了一个序列图：    </p>
<p><span class="img-wrap"><img data-src="http://img.alicdn.com/tps/TB1KBdBOXXXXXcFXFXXXXXXXXXX-559-668.jpg" src="https://static.alili.techhttp://img.alicdn.com/tps/TB1KBdBOXXXXXcFXFXXXXXXXXXX-559-668.jpg" alt="new Vue序列图" title="new Vue序列图" style="cursor: pointer; display: inline;"></span></p>
<p>new Vue的过程主要涉及到三个对象：vm、compiler、watcher。其中，vm表示Vue的具体对象；compiler负责将template解析为AST render方法；watcher用于观察数据变化，以实现数据变化后进行re-render。    </p>
<p>下面来分析下具体的过程和代码：   <br>首先，运行<code>new Vue()</code>的时候，会进入代码<code>src/core/instance/index.js</code>的Vue构造方法中，并执行<code>this._init()</code>方法。在<code>_init</code>中，会对各个功能进行初始化，并执行<code>beforeCreate</code>和<code>created</code>两个生命周期方法。核心代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initLifecycle(vm)
initEvents(vm)
callHook(vm, 'beforeCreate')
initState(vm)
callHook(vm, 'created')
initRender(vm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">initLifecycle(vm)
initEvents(vm)
callHook(vm, <span class="hljs-string">'beforeCreate'</span>)
initState(vm)
callHook(vm, <span class="hljs-string">'created'</span>)
initRender(vm)</code></pre>
<blockquote><p>这个过程有一点需要注意：   <br>beforeCreate和created之间只有initState，和官方给出的生命周期图并不完全一样。这里的initState是用于初始化data,props等的监听的。</p></blockquote>
<p>在<code>_init</code>的最后，会运行<code>initRender</code>方法。在该方法中，会运行<code>vm.$mount</code>方法，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (vm.$options.el) {
  vm.$mount(vm.$options.el)
}</code></pre>
<blockquote><p>这里的<code>vm.$mount</code>可以在业务代码中调用，这样，new 过程和 mount过程就可以根据业务情况进行分离。</p></blockquote>
<p>这里的<code>$mount</code>在<code>src/entries/web-runtime-with-compiler.js</code>中，主要逻辑是根据el, template, render三个属性来获得AST render方法。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!options.render) {   // 如果有render方法，直接运行mount
  let template = options.template
  if (template) {  // 如果有template， 获取template参数对于的HTML作为模板
    if (typeof template === 'string') {
      if (template.charAt(0) === '#') {
        template = idToTemplate(template)
      }
    } else if (template.nodeType) {
      template = template.innerHTML
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn('invalid template option:' + template, this)
      }
      return this
    }
  } else if (el) {  // 如果没有template, 且存在el，则获取el的outerHTML作为模板
    template = getOuterHTML(el)
  }
  if (template) { // 如果获取到了模板，则将模板转化为render方法
    const { render, staticRenderFns } = compileToFunctions(template, {
      warn,
      shouldDecodeNewlines,
      delimiters: options.delimiters
    }, this)
    options.render = render
    options.staticRenderFns = staticRenderFns
  }
}
return mount.call(this, el, hydrating)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!options.render) {   <span class="hljs-comment">// 如果有render方法，直接运行mount</span>
  <span class="hljs-keyword">let</span> template = options.template
  <span class="hljs-keyword">if</span> (template) {  <span class="hljs-comment">// 如果有template， 获取template参数对于的HTML作为模板</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> template === <span class="hljs-string">'string'</span>) {
      <span class="hljs-keyword">if</span> (template.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">'#'</span>) {
        template = idToTemplate(template)
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (template.nodeType) {
      template = template.innerHTML
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        warn(<span class="hljs-string">'invalid template option:'</span> + template, <span class="hljs-keyword">this</span>)
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (el) {  <span class="hljs-comment">// 如果没有template, 且存在el，则获取el的outerHTML作为模板</span>
    template = getOuterHTML(el)
  }
  <span class="hljs-keyword">if</span> (template) { <span class="hljs-comment">// 如果获取到了模板，则将模板转化为render方法</span>
    <span class="hljs-keyword">const</span> { render, staticRenderFns } = compileToFunctions(template, {
      warn,
      shouldDecodeNewlines,
      <span class="hljs-attr">delimiters</span>: options.delimiters
    }, <span class="hljs-keyword">this</span>)
    options.render = render
    options.staticRenderFns = staticRenderFns
  }
}
<span class="hljs-keyword">return</span> mount.call(<span class="hljs-keyword">this</span>, el, hydrating)</code></pre>
<blockquote><p>这个过程有三点需要注意：   <br>compile时，将最大静态子树提取出来作为单独的AST渲染方法，以提升后面vNode对比时的性能。所以，当存在多个连续的静态标签时，可以在外边添加一个静态父节点，这样，staticRenderFns数目可以减少，从而提升性能。   <br>Vue 2.0中的模板有三种引用写法：el, template, render(JSX)。其中的优先级是render &gt; template &gt; el。   <br>el, template两种写法，最后都会通过compiler转化为render(JSX)来运行，也就是说，直接写成render(JSX)是性能最优的。当然，如果使用了构建工具，最终生成的包就是使用的render(JSX)。这样子，在源码上就可以不用过多考虑这一块的性能了，直接用可维护性最好的方式就行。</p></blockquote>
<p>将模板转化为render，用到了<code>compileToFunctions方法</code>，该方法最后会通过<code>src/compiler/index.js</code>文件中的<code>compile</code>方法，将模板转化为AST语法结构的render方法，并对静态子树进行分离。   </p>
<p>完成render方法的生成后，会进入<code>_mount</code>（src/core/instance.lifecycle.js）中进行DOM更新。该方法的核心逻辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm._watcher = new Watcher(vm, () => {
  vm._update(vm._render(), hydrating)
}, noop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, () =&gt; {
  vm._update(vm._render(), hydrating)
}, noop)</code></pre>
<p>首先会new一个watcher对象，在watcher对象创建后，会运行传入的方法<code>vm._update(vm._render(), hydrating)</code>（watcher的逻辑在下面的watcher小节中细讲）。其中的<code>vm._render()</code>主要作用就是运行前面compiler生成的render方法，并返回一个vNode对象。这里的vNode就是一个虚拟的DOM节点。</p>
<p>拿到vNode后，传入<code>vm._update()</code>方法，进行DOM更新。</p>
<h1 id="articleHeader3">VDOM</h1>
<p>上面已经讲完了<code>new Vue</code>过程中的主要步骤，其中涉及到template如何转化为DOM的过程，这里单独拿出来讲下。先上序列图：</p>
<p><span class="img-wrap"><img data-src="http://img.alicdn.com/tps/TB1XVxdOXXXXXXsaFXXXXXXXXXX-630-646.jpg" src="https://static.alili.techhttp://img.alicdn.com/tps/TB1XVxdOXXXXXXsaFXXXXXXXXXX-630-646.jpg" alt="virtual DOM" title="virtual DOM" style="cursor: pointer;"></span></p>
<p>从图中可以看出，从template到DOM，有三个过程：</p>
<ul>
<li><p><strong>template -&gt; AST render</strong> （compiler解析template）</p></li>
<li><p><strong>AST render -&gt; vNode</strong> (render方法运行)</p></li>
<li><p><strong>vNode -&gt; DOM</strong> (vdom.patch)</p></li>
</ul>
<p>首先是template在compiler中解析为AST render方法的过程。上一节中有说到，<code>initRender</code>后，会调用到<code>src/entries/web-runtime-with-compiler.js</code>中的<code>Vue.prototype.$mount</code>方法。在<code>$mount</code>中，会获取template，然后调用<code>src/platforms/web/compiler/index.js</code>的<code>compileToFunctions</code>方法。在该方法中，会运行<code>compile</code>将template解析为多个render方法，也就是AST render。这里的<code>compile</code>在文件<code>src/compiler/index.js</code>中，代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ast = parse(template.trim(), options)   // 解析template为AST
optimize(ast, options)  // 提取static tree
const code = generate(ast, options)  // 生成render 方法
return {
  ast,
  render: code.render,
  staticRenderFns: code.staticRenderFns
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ast = parse(template.trim(), options)   <span class="hljs-comment">// 解析template为AST</span>
optimize(ast, options)  <span class="hljs-comment">// 提取static tree</span>
<span class="hljs-keyword">const</span> code = generate(ast, options)  <span class="hljs-comment">// 生成render 方法</span>
<span class="hljs-keyword">return</span> {
  ast,
  <span class="hljs-attr">render</span>: code.render,
  <span class="hljs-attr">staticRenderFns</span>: code.staticRenderFns
}</code></pre>
<p>可以看出，<code>compile</code>方法就是将template以AST的方式进行解析，并转化为render方法进行返回。</p>
<p>再看第二个过程：AST render -&gt; vNode。这个过程很简单，就是将AST render方法进行运行，获得返回的vNode对象。   </p>
<p>最后一步，vNode -&gt; DOM。该过程中，存在vNode的对比以及DOM的添加修改操作。   <br>在上一节中，有讲到<code>vm._update()</code>方法中对DOM进行更新。<code>_update</code>的主要代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/lifecycle.js
if (!prevVnode) {
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  vm.$el = vm.__patch__(vm.$el, vnode, hydrating)  // 首次添加
} else {
  vm.$el = vm.__patch__(prevVnode, vnode)  // 数据变化后触发的DOM更新
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/core/instance/lifecycle.js</span>
<span class="hljs-keyword">if</span> (!prevVnode) {
  <span class="hljs-comment">// Vue.prototype.__patch__ is injected in entry points</span>
  <span class="hljs-comment">// based on the rendering backend used.</span>
  vm.$el = vm.__patch__(vm.$el, vnode, hydrating)  <span class="hljs-comment">// 首次添加</span>
} <span class="hljs-keyword">else</span> {
  vm.$el = vm.__patch__(prevVnode, vnode)  <span class="hljs-comment">// 数据变化后触发的DOM更新</span>
}</code></pre>
<p>可以看出，无论是首次添加还是后期的update，都是通过<code>__patch__</code>来更新的。这里的<code>__patch__</code>核心步骤是在<code>src/core/vdom/patch.js</code>中的<code>patch</code>方法进行实现，源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (!oldVnode) {
      ...
    } else {
      ...
      if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)  // diff并更新DOM。
      } else {
        elm = oldVnode.elm
        parent = nodeOps.parentNode(elm)
        ...
        if (parent !== null) {
          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm))  // 添加element到DOM。
          removeVnodes(parent, [oldVnode], 0, 0)
        }
        ...
      }
    }
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">oldVnode, vnode, hydrating, removeOnly</span>) </span>{
    <span class="hljs-keyword">if</span> (!oldVnode) {
      ...
    } <span class="hljs-keyword">else</span> {
      ...
      if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)  <span class="hljs-comment">// diff并更新DOM。</span>
      } <span class="hljs-keyword">else</span> {
        elm = oldVnode.elm
        parent = nodeOps.parentNode(elm)
        ...
        if (parent !== <span class="hljs-literal">null</span>) {
          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm))  <span class="hljs-comment">// 添加element到DOM。</span>
          removeVnodes(parent, [oldVnode], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
        }
        ...
      }
    }
    ...
  }</code></pre>
<p>首次添加很简单，就是通过insertBefore将转化好的element添加到DOM中。如果是update，则会调动<code>patchVnode()</code>。最后来看下<code>patchVnode</code>的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  ...
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children
  ...
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) &amp;&amp; isDef(ch)) {  // 当都存在时，更新Children
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {  // 只存在新节点时，即添加节点
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {  // 只存在老节点时，即删除节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {  // 删除了textContent
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) { // 修改了textContent
    nodeOps.setTextContent(elm, vnode.text)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchVnode</span> (<span class="hljs-params">oldVnode, vnode, insertedVnodeQueue, removeOnly</span>) </span>{
  ...
  const elm = vnode.elm = oldVnode.elm
  <span class="hljs-keyword">const</span> oldCh = oldVnode.children
  <span class="hljs-keyword">const</span> ch = vnode.children
  ...
  if (isUndef(vnode.text)) {
    <span class="hljs-keyword">if</span> (isDef(oldCh) &amp;&amp; isDef(ch)) {  <span class="hljs-comment">// 当都存在时，更新Children</span>
      <span class="hljs-keyword">if</span> (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(ch)) {  <span class="hljs-comment">// 只存在新节点时，即添加节点</span>
      <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
      addVnodes(elm, <span class="hljs-literal">null</span>, ch, <span class="hljs-number">0</span>, ch.length - <span class="hljs-number">1</span>, insertedVnodeQueue)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldCh)) {  <span class="hljs-comment">// 只存在老节点时，即删除节点</span>
      removeVnodes(elm, oldCh, <span class="hljs-number">0</span>, oldCh.length - <span class="hljs-number">1</span>)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) {  <span class="hljs-comment">// 删除了textContent</span>
      nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldVnode.text !== vnode.text) { <span class="hljs-comment">// 修改了textContent</span>
    nodeOps.setTextContent(elm, vnode.text)
  }
}</code></pre>
<p>其中有调用了<code>updateChildren</code>来更新子节点，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  ...
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
      canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      ...
    }
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span> (<span class="hljs-params">parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly</span>) </span>{
  ...
  while (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
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
      canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } <span class="hljs-keyword">else</span> {
      ...
    }
  }
  ...
}</code></pre>
<p>可以看到<code>updateChildren</code>中，又通过<code>patchVnode</code>来更新当前节点。梳理一下，<code>patch</code>通过<code>patchVnode</code>来更新根节点，然后通过<code>updateChildren</code>来更新子节点，具体子节点，又通过<code>patchVnode</code>来更新，通过一个类似于递归的方式逐个节点的完成对比和更新。</p>
<blockquote><p>Vue 2.0中对如何去实现VDOM的思路是否清晰，通过4层结构，很好的实现了可维护性，也为实现server render, weex等功能提供了可能。拿server render举例，只需要将最后的<code>vNode -&gt; DOM</code> 改成 <code>vNode -&gt; String</code> 或者 <code>vNode -&gt; Stream</code>， 就可以实现server render。剩下的compiler和Vue的核心逻辑都不需要改。</p></blockquote>
<h1 id="articleHeader4">Watcher</h1>
<p>我们都知道MVVM框架的特征就是当数据发生变化后，会自动更新对应的DOM节点。使用MVVM之后，业务代码中就可以完全不写DOM操作代码，不仅可以将业务代码聚焦在业务逻辑上，还可以提高业务代码的可维护性和可测试性。那么Vue 2.0中是怎么实现对数据变化的监听的呢？照例，先看序列图：<br><span class="img-wrap"><img data-src="http://img.alicdn.com/tps/TB1oYxwOXXXXXbvXFXXXXXXXXXX-659-737.jpg" src="https://static.alili.techhttp://img.alicdn.com/tps/TB1oYxwOXXXXXbvXFXXXXXXXXXX-659-737.jpg" alt="watcher" title="watcher" style="cursor: pointer; display: inline;"></span></p>
<p>可以看出，整个Watcher的过程可以分为三个过程。</p>
<ul>
<li><p>对state设置setter/getter</p></li>
<li><p>对vm设置好Watcher，添加好state 触发 setter时的执行方法</p></li>
<li><p>state变化触发执行</p></li>
</ul>
<p>前面有说过，在生命周期函数<code>beforeCreate</code>和<code>created</code>直接，会运行方法<code>initState()</code>。在<code>initState</code>中，会对Props, Data, Computed等属性添加Setter/Getter。拿Data举例，设置setter/getter的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initData (vm: Component) {
  let data = vm.$options.data
  ...
  // proxy data on instance
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    ...
    proxy(vm, keys[i])   // 设置vm._data为代理
  }
  // observe data
  observe(data)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initData</span> (<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-keyword">let</span> data = vm.$options.data
  ...
  <span class="hljs-comment">// proxy data on instance</span>
  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(data)
  <span class="hljs-keyword">let</span> i = keys.length
  <span class="hljs-keyword">while</span> (i--) {
    ...
    proxy(vm, keys[i])   <span class="hljs-comment">// 设置vm._data为代理</span>
  }
  <span class="hljs-comment">// observe data</span>
  observe(data)
}</code></pre>
<p>通过调用<code>observe</code>方法，会对data添加好观察者，核心代码为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter () {
    const value = getter ? getter.call(obj) : val
    if (Dep.target) {
      dep.depend()  // 处理好依赖watcher
      ...
    }
    return value
  },
  set: function reactiveSetter (newVal) {
    ...
    childOb = observe(newVal)  // 对新数据重新observe
    dep.notify()  // 通知到dep进行数据更新
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val
    <span class="hljs-keyword">if</span> (Dep.target) {
      dep.depend()  <span class="hljs-comment">// 处理好依赖watcher</span>
      ...
    }
    <span class="hljs-keyword">return</span> value
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
    ...
    childOb = observe(newVal)  <span class="hljs-comment">// 对新数据重新observe</span>
    dep.notify()  <span class="hljs-comment">// 通知到dep进行数据更新</span>
  }
})</code></pre>
<p>这个时候，对data的监听已经完成。可以看到，当data发生变化的时候，会运行<code>dep.notify()</code>。在<code>notify</code>方法中，会去运行watcher的<code>update</code>方法，内容如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update () {
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
run () {
  if (this.active) {
    const value = this.get()
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">update () {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lazy) {
    <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
    <span class="hljs-keyword">this</span>.run()
  } <span class="hljs-keyword">else</span> {
    queueWatcher(<span class="hljs-keyword">this</span>)
  }
}
run () {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.active) {
    <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.get()
  }
  ...
}</code></pre>
<p><code>update</code>方法中，queueWatcher方法的目的是通过<code>nextTicker</code>来执行<code>run</code>方法，属于支线逻辑，就不分析了，这里直接看<code>run</code>的实现。<code>run</code>方法其实很简单，就是调用<code>get</code>方法，而<code>get</code>方法会通过执行<code>this.getter()</code>来更新DOM。   </p>
<p>那么<code>this.getter</code>是什么呢？本文最开始分析<code>new Vue</code>过程时，有讲到运行<code>_mount</code>方法时，会运行如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm._watcher = new Watcher(vm, () => {
  vm._update(vm._render(), hydrating)
}, noop)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, () =&gt; {
  vm._update(vm._render(), hydrating)
}, noop)</code></pre>
<p>那么<code>this.getter</code>就是这里Watcher方法的第二个参数。来看下<code>new Watcher</code>的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object = {}
  ) {
    ...
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    ...
    this.value = this.lazy
      ? undefined
      : this.get()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  <span class="hljs-keyword">constructor</span> (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object = {}
  ) {
    ...
    if (<span class="hljs-keyword">typeof</span> expOrFn === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">this</span>.getter = expOrFn
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.getter = parsePath(expOrFn)
    }
    ...
    this.value = <span class="hljs-keyword">this</span>.lazy
      ? <span class="hljs-literal">undefined</span>
      : <span class="hljs-keyword">this</span>.get()
  }
}</code></pre>
<p>可以看出，在<code>new Vue</code>过程中，Watcher会在构造完成后主动调用<code>this.get()</code>来触发<code>this.getter()</code>方法的运行，以达到更新DOM节点。</p>
<p>总结一下这个过程：首先<code>_init</code>时，会对Data设置好setter方法，setter方法中会调用<code>dep.notify()</code>，以便数据变化时通知DOM进行更新。然后<code>new Watcher</code>时，会将更新DOM的方法进行设置，也就是<code>Watcher.getter</code>方法。最后，当Data发生变化的时候，<code>dep.notify()</code>运行，运行到<code>watcher.getter()</code>时，就会去运行render和update逻辑，最终达到DOM更新的目的。</p>
<h1 id="articleHeader5">总结与收获</h1>
<p>刚开始觉得看源码，是因为希望能了解下Vue 2.0的实现，看看能不能得到一些从文档中无法知道的细节，用于提升运行效率。把主要流程理清楚后，的确了解到一些，这里做个整理：</p>
<ul>
<li><p>el属性传入的如果不是element，最后会通过<code>document.querySelector</code>来获取的，这个接口性能较差，所以，el传入一个element性能会更好。</p></li>
<li><p><code>$mount</code>方法中对<code>html</code>，<code>body</code>标签做了过滤，这两个不能用来作为渲染的根节点。</p></li>
<li><p>每一个组件都会从<code>_init</code>开始重新运行，所以，当存在一个长列表时，将子节点作为一个组件，性能会较差。</p></li>
<li><p><code>*.vue</code>文件会在构建时转化为<code>render</code>方法，而<code>render</code>方法的性能比指定<code>template</code>更好。所以，源码使用<code>*.vue</code>的方式，性能更好。</p></li>
<li><p>如果需要自定义<code>delimiters</code>，每一个组件都需要单独指定。</p></li>
<li><p>如果是<code>*.vue</code>文件，指定<code>delimiters</code>是失效的，因为<code>vue-loader</code>对<code>*.vue</code>文件进行解析时，并没有将<code>delimiters</code>传递到<code>compiler.compile()</code>中。（这一点不确定是bug还是故意这样设计的）。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0源码学习

## 原文链接
[https://segmentfault.com/a/1190000007484936](https://segmentfault.com/a/1190000007484936)


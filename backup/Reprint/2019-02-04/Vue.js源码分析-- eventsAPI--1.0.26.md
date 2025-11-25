---
title: 'Vue.js源码分析-- eventsAPI--1.0.26' 
date: 2019-02-04 2:30:58
hidden: true
slug: ofu9567aws
categories: [reprint]
---

{{< raw >}}

                    
<p>近期开发的项目中前端使用的是Vue框架，很轻量，也很好用。不过，因为用的是别人家开发的框架，代码执行的情况是否跟我们意料的一致值得思考。调试代码或者利用测试框架测试input/ouput挺好，不过我更倾向于看源码。能够被大众所广泛使用的框架的源码非常值得一看，好处就不多说了，因人而异。</p>
<p>这次我看的是vue源码里的eventsAPI部分，包括$emit/$broadcast/$dispatch等。</p>
<p>注：由于目前看到的只是冰山一角，所以牵连到其他部分的语句会暂时忽略，所以也有可能理解起来会有断章取义的可能，如果有理解错的还望指出，互相学习。在后续的源码阅读中，一有新的认识会立即更新。</p>
<p>eventsAPI源码位置：src/instance/api/events.js</p>
<h2 id="articleHeader0">私有函数 modifyListenerCount</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hookRE = /^hook:/
function modifyListenerCount (vm, event, count) {
  var parent = vm.$parent
  // hooks do not get broadcasted so no need
  // to do bookkeeping for them
  if (!parent || !count || hookRE.test(event)) return
  while (parent) {
    parent._eventsCount[event] =
      (parent._eventsCount[event] || 0) + count
    parent = parent.$parent
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> hookRE = <span class="hljs-regexp">/^hook:/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">modifyListenerCount</span> (<span class="hljs-params">vm, event, count</span>) </span>{
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">parent</span> = vm.$<span class="hljs-built_in">parent</span>
  <span class="hljs-comment">// hooks do not get broadcasted so no need</span>
  <span class="hljs-comment">// to do bookkeeping for them</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">parent</span> || !count || hookRE.test(event)) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">parent</span>) {
    <span class="hljs-built_in">parent</span>._eventsCount[event] =
      (<span class="hljs-built_in">parent</span>._eventsCount[event] || <span class="hljs-number">0</span>) + count
    <span class="hljs-built_in">parent</span> = <span class="hljs-built_in">parent</span>.$<span class="hljs-built_in">parent</span>
  }
}</code></pre>
<p>在events.js里边多次调用到该函数，用于向上遍历父组件，更新事件计数器。</p>
<ul>
<li><p>组件的_events属性，记录着每个event绑定的回调函数(数组)，比如_events[event] = [func1, func2, ...].</p></li>
<li><p>组件的_eventsCount属性，记录着自己以及子组件对每个event绑定的回调函数的总数目。每当子组件对event事件绑定了n个回调，那父组件（一直向上遍历到根）的_eventsCount[event]会+n。目前发现，_eventsCount在$broadcast会使用到。</p></li>
</ul>
<h2 id="articleHeader1">Vue.prototype.$on</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$on = function (event, fn) {
  (this._events[event] || (this._events[event] = []))
    .push(fn)
  modifyListenerCount(this, event, 1)
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>Vue.prototype.$<span class="hljs-keyword">on</span> = function (<span class="hljs-keyword">event</span>, fn) {
  (<span class="hljs-keyword">this</span>._events[<span class="hljs-keyword">event</span>] || (<span class="hljs-keyword">this</span>._events[<span class="hljs-keyword">event</span>] = []))
    .push(fn)
  modifyListenerCount(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">event</span>, <span class="hljs-number">1</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>基础函数，<strong>事件监听绑定</strong>。组件将回调函数fn保存在_events[event]中，对同一event可以绑定多个回调函数，同时，通过modifyListenerCount更新所有父组件的_eventsCount[event]。</p>
<h2 id="articleHeader2">Vue.prototype.$once</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$once = function (event, fn) {
  var self = this
  function on () {
    self.$off(event, on)
    fn.apply(this, arguments)
  }
  on.fn = fn
  this.$on(event, on)
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Vue.prototype.$once = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, fn</span>) </span>{
  <span class="hljs-built_in">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">on</span> (<span class="hljs-params"></span>) </span>{
    self.$off(event, <span class="hljs-keyword">on</span>)
    fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
  }
  <span class="hljs-keyword">on</span>.fn = fn
  <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">on</span>(event, <span class="hljs-keyword">on</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>$once：当event事件发生时，fn只会被调用一次，调用完成后通过$off解除绑定。</p>
<h2 id="articleHeader3">Vue.prototype.$off</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$off = function (event, fn) {
  var cbs
  // all
  if (!arguments.length) {
    if (this.$parent) {
      for (event in this._events) {
        cbs = this._events[event]
        if (cbs) {
          modifyListenerCount(this, event, -cbs.length)
        }
      }
    }
    this._events = {}
    return this
  }
  // specific event
  cbs = this._events[event]
  if (!cbs) {
    return this
  }
  if (arguments.length === 1) {
    modifyListenerCount(this, event, -cbs.length)
    this._events[event] = null
    return this
  }
  // specific handler
  var cb
  var i = cbs.length
  while (i--) {
    cb = cbs[i]
    if (cb === fn || cb.fn === fn) {
      modifyListenerCount(this, event, -1)
      cbs.splice(i, 1)
      break
    }
  }
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Vue.prototype.$off = function (event, fn) {
  <span class="hljs-keyword">var</span> cbs
  <span class="hljs-comment">// all</span>
  <span class="hljs-keyword">if</span> (!arguments.length) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$parent) {
      <span class="hljs-keyword">for</span> (event <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>._events) {
        cbs = <span class="hljs-keyword">this</span>._events[event]
        <span class="hljs-keyword">if</span> (cbs) {
          modifyListenerCount(<span class="hljs-keyword">this</span>, event, -cbs.length)
        }
      }
    }
    <span class="hljs-keyword">this</span>._events = {}
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
  <span class="hljs-comment">// specific event</span>
  cbs = <span class="hljs-keyword">this</span>._events[event]
  <span class="hljs-keyword">if</span> (!cbs) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
  <span class="hljs-keyword">if</span> (arguments.length === <span class="hljs-number">1</span>) {
    modifyListenerCount(<span class="hljs-keyword">this</span>, event, -cbs.length)
    <span class="hljs-keyword">this</span>._events[event] = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
  <span class="hljs-comment">// specific handler</span>
  <span class="hljs-keyword">var</span> cb
  <span class="hljs-keyword">var</span> i = cbs.length
  <span class="hljs-keyword">while</span> (i--) {
    cb = cbs[i]
    <span class="hljs-keyword">if</span> (cb === fn || cb.fn === fn) {
      modifyListenerCount(<span class="hljs-keyword">this</span>, event, <span class="hljs-number">-1</span>)
      cbs.splice(i, <span class="hljs-number">1</span>)
      <span class="hljs-keyword">break</span>
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>$off：<strong>解除事件绑定</strong>，源码可以看出它的三个调用方式：</p>
<ul>
<li><p>vm.$off()<br> 不带参数：将删除组件所有绑定的事件(this._events = {})，在此之前，会遍历更新父组件的计数器。</p></li>
<li><p>vm.$off(event)<br> 只带参数event：将删除组件对event绑定的所有事件，同样会遍历更新父组件的计数器。</p></li>
<li><p>vm.$off(event, fn)<br> 带齐参数event和fn：将删除组件对event事件绑定的fn回调，同样会遍历更新父组件的计数器。</p></li>
</ul>
<h2 id="articleHeader4">Vue.prototype.$emit</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$emit = function (event) {
  var isSource = typeof event === 'string'
  event = isSource
    ? event
    : event.name
  var cbs = this._events[event]
  var shouldPropagate = isSource || !cbs
  if (cbs) {
    cbs = cbs.length > 1
      ? toArray(cbs)
      : cbs
    // 这里的特殊处理暂且忽略，还得从其他源码推敲
    // this is a somewhat hacky solution to the question raised
    // in #2102: for an inline component listener like <comp @test=&quot;doThis&quot;>,
    // the propagation handling is somewhat broken. Therefore we
    // need to treat these inline callbacks differently.
    var hasParentCbs = isSource &amp;&amp; cbs.some(function (cb) {
      return cb._fromParent
    })
    if (hasParentCbs) {
      shouldPropagate = false
    }
    var args = toArray(arguments, 1)
    for (var i = 0, l = cbs.length; i < l; i++) {
      var cb = cbs[i]
      var res = cb.apply(this, args)
      if (res === true &amp;&amp; (!hasParentCbs || cb._fromParent)) {
        shouldPropagate = true
      }
    }
  }
  return shouldPropagate
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.prototype.$emit = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">var</span> isSource = <span class="hljs-keyword">typeof</span> event === <span class="hljs-string">'string'</span>
  event = isSource
    ? event
    : event.name
  <span class="hljs-keyword">var</span> cbs = <span class="hljs-keyword">this</span>._events[event]
  <span class="hljs-keyword">var</span> shouldPropagate = isSource || !cbs
  <span class="hljs-keyword">if</span> (cbs) {
    cbs = cbs.length &gt; <span class="hljs-number">1</span>
      ? toArray(cbs)
      : cbs
    <span class="hljs-comment">// 这里的特殊处理暂且忽略，还得从其他源码推敲</span>
    <span class="hljs-comment">// this is a somewhat hacky solution to the question raised</span>
    <span class="hljs-comment">// in #2102: for an inline component listener like &lt;comp @test="doThis"&gt;,</span>
    <span class="hljs-comment">// the propagation handling is somewhat broken. Therefore we</span>
    <span class="hljs-comment">// need to treat these inline callbacks differently.</span>
    <span class="hljs-keyword">var</span> hasParentCbs = isSource &amp;&amp; cbs.some(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb</span>) </span>{
      <span class="hljs-keyword">return</span> cb._fromParent
    })
    <span class="hljs-keyword">if</span> (hasParentCbs) {
      shouldPropagate = <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">var</span> args = toArray(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = cbs.length; i &lt; l; i++) {
      <span class="hljs-keyword">var</span> cb = cbs[i]
      <span class="hljs-keyword">var</span> res = cb.apply(<span class="hljs-keyword">this</span>, args)
      <span class="hljs-keyword">if</span> (res === <span class="hljs-literal">true</span> &amp;&amp; (!hasParentCbs || cb._fromParent)) {
        shouldPropagate = <span class="hljs-literal">true</span>
      }
    }
  }
  <span class="hljs-keyword">return</span> shouldPropagate
}</code></pre>
<p>$emit：用于调用自身对event绑定的回调函数。该函数会被$broadcast和$dispatch调用，所以对参数的event进行了适配。部分变量备注：</p>
<ul>
<li><p>isSource：是否是源组件发出的$emit事件。也就是说，只有直接调用vm.$emit事件或者$dispatch率先触发自己绑定的回调（$dispatch源码第一行）的时候，参数是event字符串，此时isScource才为true。其他情况，如$broadcast内部调用$emit，其参数会是一个非字符串，在下面的$broadcast和$dispatch可以看到，此时的参数会是{ name: event, source: this }。</p></li>
<li><p>event：由isSource可以得到：event即事件(字符串)。</p></li>
<li><p>shouldPropagate：是否需要继续传播事件触发。源码中，遍历了event绑定的事件，除开(!hasParentCbs || cb._fromParent)这个不说，只要执行的绑定事件明确return true，shouldPropagate才会置为true。对于$progress，如果shouldPropagate为true，会触发继续向下传播事件。</p></li>
</ul>
<h2 id="articleHeader5">Vue.prototype.$broadcast</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$broadcast = function (event) {
  var isSource = typeof event === 'string'
  event = isSource
    ? event
    : event.name
  // if no child has registered for this event,
  // then there's no need to broadcast.
  if (!this._eventsCount[event]) return
  var children = this.$children
  var args = toArray(arguments)
  if (isSource) {
    // use object event to indicate non-source emit
    // on children
    args[0] = { name: event, source: this }
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i]
    var shouldPropagate = child.$emit.apply(child, args)
    if (shouldPropagate) {
      child.$broadcast.apply(child, args)
    }
  }
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>Vue.prototype.$broadcast = function (<span class="hljs-keyword">event</span>) {
  <span class="hljs-keyword">var</span> isSource = <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">event</span> === <span class="hljs-string">'string'</span>
  <span class="hljs-keyword">event</span> = isSource
    ? <span class="hljs-keyword">event</span>
    : <span class="hljs-keyword">event</span>.name
  <span class="hljs-comment">// if no child has registered for this event,</span>
  <span class="hljs-comment">// then there's no need to broadcast.</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._eventsCount[<span class="hljs-keyword">event</span>]) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">var</span> children = <span class="hljs-keyword">this</span>.$children
  <span class="hljs-keyword">var</span> args = toArray(arguments)
  <span class="hljs-keyword">if</span> (isSource) {
    <span class="hljs-comment">// use object event to indicate non-source emit</span>
    <span class="hljs-comment">// on children</span>
    args[<span class="hljs-number">0</span>] = { name: <span class="hljs-keyword">event</span>, source: <span class="hljs-keyword">this</span> }
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = children.length; i &lt; l; i++) {
    <span class="hljs-keyword">var</span> child = children[i]
    <span class="hljs-keyword">var</span> shouldPropagate = child.$emit.apply(child, args)
    <span class="hljs-keyword">if</span> (shouldPropagate) {
      child.$broadcast.apply(child, args)
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>此处isSource的理解跟$emit的理解差不多，指代是否最开始调用$broadcast。</p>
<p>这里vm._eventsCount[event]起到作用了，如果该计数为0，说明其所有子组件包括递归下去的子组件都没有对event绑定回调。</p>
<p>从for循环的写法可以看出，这里何时停止事件传播使用的方法类似于深度优先搜索（DFS）如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVC1En?w=382&amp;h=292" src="https://static.alili.tech/img/bVC1En?w=382&amp;h=292" alt="深搜" title="深搜" style="cursor: pointer; display: inline;"></span></p>
<p>A组件发出$broadcast，自身不会调用监听event的事件，而是传递给子组件，子组件B1率先执行监听event的事件，其中有一个绑定事件return true，那么该B1继续传播事件，C1率先执行，C1所有监听event的回调事件都没有return true，所以C1不会往它的子组件传播事件。</p>
<p>到此，只是遍历完最左侧的线，接下来轮到C2执行，C2执行后再决定是否需要传递给其子组件，接下来C3....执行完B1的子组件，接下来就B2，然后...</p>
<p>从这里可以看出，如果某一层一个组件return true，那么会继续遍历新一层子组件，有点雪崩式的爆发，return true或许会导致性能下降，这种事件通知的机制或许需要改善改善，因为假设我只要通知B1和C1，结果还是会遍历B层其他组件还有C层其他组件，这样会消耗多余的资源，且注意，这里是同步。</p>
<h2 id="articleHeader6">Vue.prototype.$dispatch</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$dispatch = function (event) {
  var shouldPropagate = this.$emit.apply(this, arguments)
  if (!shouldPropagate) return
  var parent = this.$parent
  var args = toArray(arguments)
  // use object event to indicate non-source emit
  // on parents
  args[0] = { name: event, source: this }
  while (parent) {
    shouldPropagate = parent.$emit.apply(parent, args)
    parent = shouldPropagate
      ? parent.$parent
      : null
  }
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Vue.prototype.$dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-built_in">var</span> shouldPropagate = <span class="hljs-keyword">this</span>.$emit.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
  <span class="hljs-keyword">if</span> (!shouldPropagate) <span class="hljs-keyword">return</span>
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">parent</span> = <span class="hljs-keyword">this</span>.$<span class="hljs-built_in">parent</span>
  <span class="hljs-built_in">var</span> args = toArray(<span class="hljs-built_in">arguments</span>)
  <span class="hljs-comment">// use object event to indicate non-source emit</span>
  <span class="hljs-comment">// on parents</span>
  args[<span class="hljs-number">0</span>] = { <span class="hljs-attribute">name</span>: event, <span class="hljs-attribute">source</span>: <span class="hljs-keyword">this</span> }
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">parent</span>) {
    shouldPropagate = <span class="hljs-built_in">parent</span>.$emit.apply(<span class="hljs-built_in">parent</span>, args)
    <span class="hljs-built_in">parent</span> = shouldPropagate
      ? <span class="hljs-built_in">parent</span>.$<span class="hljs-attribute">parent</span>
      : <span class="hljs-literal">null</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p>$dispatch相对简单，先触发自身对event绑定的回调，如果自己没有监听event的回调，则会继续调用父组件触发相应绑定的事件。如果有回调，还需要判断_fromParent这个属性，<em>这个不知何物，待发掘。</em></p>
<p>假设A-&gt;B-&gt;C三层，B发出$dispatch('e')，想要B和A执行，那么B需要return true; C发出$dispatch('e')，想要C和B执行，那么C需要return true。但此时B也return true了，所以A也会触发。所以如果遇到这种情况，可以修改dispatch的事件名字，比如C换成$dispatch('f')；或者通过传递其他参数来判断是否需要return true。（推荐前者，比较干净）</p>
<h2 id="articleHeader7">总结</h2>
<p>Vue的eventsAPI是比较好理解的模块，在看源码以前，原以为$broadcast和$dispatch是在$nextTick实现，现在才意识到是一调用便执行。所以如果有多个地方会return true,还是需要考虑下用其他方法，不然会阻塞挺久的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js源码分析-- eventsAPI--1.0.26

## 原文链接
[https://segmentfault.com/a/1190000006879124](https://segmentfault.com/a/1190000006879124)


---
title: 'Vue.js源码（2）：初探List Rendering' 
date: 2019-02-03 2:30:40
hidden: true
slug: 4ntdhjv8fe2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>下面例子来自官网，虽然看上去就比Hello World多了一个v-for，但是内部多了好多的处理过程。但是这就是框架，只给你留下最美妙的东西，让生活变得简单。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;mountNode&quot;>
    <ul>
        <li v-for=&quot;todo in todos&quot;>
          "{{" todo.text "}}"
        </li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mountNode"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
          </span><span class="hljs-template-variable">"{{" todo.text "}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el: '#mountNode',
        data: {
           todos: [
               { text: 'Learn JavaScript' },
               { text: 'Learn Vue.js' },
               { text: 'Build Something Awesome' }
           ]
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#mountNode'</span>,
        dat<span class="hljs-variable">a:</span> {
           todo<span class="hljs-variable">s:</span> [
               { tex<span class="hljs-variable">t:</span> <span class="hljs-string">'Learn JavaScript'</span> },
               { tex<span class="hljs-variable">t:</span> <span class="hljs-string">'Learn Vue.js'</span> },
               { tex<span class="hljs-variable">t:</span> <span class="hljs-string">'Build Something Awesome'</span> }
           ]
        }
    })</code></pre>
<p>这篇文章将要一起分析：</p>
<ul>
<li><p>observe array</p></li>
<li><p>terminal directive</p></li>
<li><p>v-for指令过程</p></li>
</ul>
<h2 id="articleHeader0">recap</h2>
<p>这里先用几张图片回顾和整理下上一篇<a href="https://segmentfault.com/a/1190000006866881">Vue.js源码（1）：Hello World的背后</a>的内容，这将对本篇的compile，link和bind过程的理解有帮助：</p>
<p>copmile阶段：主要是得到指令的descriptor<br><span class="img-wrap"><img data-src="/img/bVDg0k?w=823&amp;h=404" src="https://static.alili.tech/img/bVDg0k?w=823&amp;h=404" alt="Hello World compile phase" title="Hello World compile phase" style="cursor: pointer; display: inline;"></span></p>
<p>link阶段：实例化指令，替换DOM<br><span class="img-wrap"><img data-src="/img/bVDg0t?w=647&amp;h=240" src="https://static.alili.tech/img/bVDg0t?w=647&amp;h=240" alt="Hello World link phase" title="Hello World link phase" style="cursor: pointer; display: inline;"></span></p>
<p>bind阶段：调用指令的bind函数，创建watcher<br><span class="img-wrap"><img data-src="/img/bVDg0F?w=978&amp;h=302" src="https://static.alili.tech/img/bVDg0F?w=978&amp;h=302" alt="Hello World bind phase" title="Hello World bind phase" style="cursor: pointer; display: inline;"></span></p>
<p>用一张图表示即为：<br><span class="img-wrap"><img data-src="/img/bVC9jR?w=1268&amp;h=456" src="https://static.alili.tech/img/bVC9jR?w=1268&amp;h=456" alt="Hello World complete process" title="Hello World complete process" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">observe array</h2>
<p>初始化中的merge options，proxy过程和Hello World的过程基本一样，所以这里直接从observe开始分析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: src/observer/index.js
var ob = new Observer(value) // value = data = {todos: [{message: 'Learn JavaScript'}, ...]}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// file path: src/observer/index.js</span>
<span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">new</span> Observer(<span class="hljs-keyword">value</span>) <span class="hljs-comment">// value = data = {todos: [{message: 'Learn JavaScript'}, ...]}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: src/observer/index.js
export function Observer (value) {
  this.value = value
  this.dep = new Dep()
  def(value, '__ob__', this)
  if (isArray(value)) {     // 数组分支
    var augment = hasProto
      ? protoAugment
      : copyAugment         // 选择增强方法
    augment(value, arrayMethods, arrayKeys)     // 增强数组
    this.observeArray(value)
  } else {                  // plain object分支
    this.walk(value)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// file path: src/observer/index.js</span>
<span class="hljs-function">export function <span class="hljs-title">Observer</span> (<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
  <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>
  <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
  def(<span class="hljs-keyword">value</span>, <span class="hljs-string">'__ob__'</span>, <span class="hljs-keyword">this</span>)
  <span class="hljs-keyword">if</span> (isArray(<span class="hljs-keyword">value</span>)) {     <span class="hljs-comment">// 数组分支</span>
    <span class="hljs-keyword">var</span> augment = hasProto
      ? protoAugment
      : copyAugment         <span class="hljs-comment">// 选择增强方法</span>
    augment(<span class="hljs-keyword">value</span>, arrayMethods, arrayKeys)     <span class="hljs-comment">// 增强数组</span>
    <span class="hljs-keyword">this</span>.observeArray(<span class="hljs-keyword">value</span>)
  } <span class="hljs-keyword">else</span> {                  <span class="hljs-comment">// plain object分支</span>
    <span class="hljs-keyword">this</span>.walk(<span class="hljs-keyword">value</span>)
  }
}</code></pre>
<h3 id="articleHeader2">增强数组</h3>
<p>增强（augment）数组，即对数组进行扩展，使其能detect change。这里面有两个内容，一个是拦截数组的<a href="http://vuejs.org/guide/list.html#Mutation-Methods" rel="nofollow noreferrer" target="_blank">mutation methods</a>（导致数组本身发生变化的方法），一个是提供两个<a href="http://vuejs.org/guide/list.html#Caveats" rel="nofollow noreferrer" target="_blank">便利的方法</a><code>$set</code>和<code>$remove</code>。</p>
<p>拦截有两个方法，如果浏览器实现<code>__proto__</code>那么就使用protoAugment，否则就使用copyAugment。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: src/util/evn.js
export const hasProto = '__proto__' in {}

// file path: src/observer/index.js
// 截取原型链
function protoAugment (target, src) {
  target.__proto__ = src
}

// file path: src/observer/index.js
// 定义属性
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    def(target, key, src[key])
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// file path: src/util/evn.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> hasProto = <span class="hljs-string">'__proto__'</span> <span class="hljs-keyword">in</span> {}

<span class="hljs-comment">// file path: src/observer/index.js</span>
<span class="hljs-comment">// 截取原型链</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">protoAugment</span> (<span class="hljs-params">target, src</span>) </span>{
  target.__proto__ = src
}

<span class="hljs-comment">// file path: src/observer/index.js</span>
<span class="hljs-comment">// 定义属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyAugment</span> (<span class="hljs-params">target, src, keys</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
    <span class="hljs-keyword">var</span> key = keys[i]
    def(target, key, src[key])
  }
}</code></pre>
<p>为了更直观，请看下面的示意图：</p>
<p>增强之前：<br><span class="img-wrap"><img data-src="/img/bVDg8Z?w=829&amp;h=217" src="https://static.alili.tech/img/bVDg8Z?w=829&amp;h=217" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过原型链拦截：<br><span class="img-wrap"><img data-src="/img/bVDg86?w=819&amp;h=339" src="https://static.alili.tech/img/bVDg86?w=819&amp;h=339" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过定义属性拦截：<br><span class="img-wrap"><img data-src="/img/bVDg88?w=826&amp;h=341" src="https://static.alili.tech/img/bVDg88?w=826&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在拦截器<code>arrayMethods</code>里面，就是对这些mutation methods进行包装：</p>
<ol>
<li><p>调用原生的Array.prototype中的方法</p></li>
<li><p>检查是否有新的值被插入（主要是push, unshift和splice方法）</p></li>
<li><p>如果有新值插入，observe它们</p></li>
<li><p>最后就是notify change：调用observer的dep.notify()</p></li>
</ol>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: src/observer/array.js
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method]
  def(arrayMethods, method, function mutator () {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length
    var args = new Array(i)
    while (i--) {
      args[i] = arguments[i]
    }
    var result = original.apply(this, args)
    var ob = this.__ob__
    var inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// file path: src/observer/array.js</span>
;[
  <span class="hljs-string">'push'</span>,
  <span class="hljs-string">'pop'</span>,
  <span class="hljs-string">'shift'</span>,
  <span class="hljs-string">'unshift'</span>,
  <span class="hljs-string">'splice'</span>,
  <span class="hljs-string">'sort'</span>,
  <span class="hljs-string">'reverse'</span>
]
.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  <span class="hljs-comment">// cache original method</span>
  <span class="hljs-keyword">var</span> original = arrayProto[method]
  def(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutator</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// avoid leaking arguments:</span>
    <span class="hljs-comment">// http://jsperf.com/closure-with-arguments</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">arguments</span>.length
    <span class="hljs-keyword">var</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i)
    <span class="hljs-keyword">while</span> (i--) {
      args[i] = <span class="hljs-built_in">arguments</span>[i]
    }
    <span class="hljs-keyword">var</span> result = original.apply(<span class="hljs-keyword">this</span>, args)
    <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.__ob__
    <span class="hljs-keyword">var</span> inserted
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'push'</span>:
        inserted = args
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'unshift'</span>:
        inserted = args
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'splice'</span>:
        inserted = args.slice(<span class="hljs-number">2</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> (inserted) ob.observeArray(inserted)
    <span class="hljs-comment">// notify change</span>
    ob.dep.notify()
    <span class="hljs-keyword">return</span> result
  })
})</code></pre>
<h3 id="articleHeader3">observeArray()</h3>
<p>知道上一篇的observe()，这里的<code>observeArray()</code>就很简单了，即对数组对象都observe一遍，为各自对象生成Observer实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: src/observer/index.js
Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// file path: src/observer/index.js</span>
Observer.prototype.observeArray = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(items)</span> </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
    observe(items[i])
  }
}</code></pre>
<h2 id="articleHeader4">compile</h2>
<p>在介绍v-for的compile之前，有必要回顾一下compile过程：compile是一个递归遍历DOM tree的过程，这个过程对每个node进行指令类型，指令参数，表达式，过滤器等的解析。</p>
<p>递归过程大致如下：</p>
<ol>
<li><p>compile当前node</p></li>
<li><p>如果当前node没有terminal directive，则遍历child node，分别对其compile node</p></li>
<li><p>如果当前node有terminal directive，则跳过其child node</p></li>
</ol>
<p>这里有个terminal directive的概念，这个概念在<a href="http://vuejs.org/guide/custom-directive.html#Element-Directives" rel="nofollow noreferrer" target="_blank">Element Directive</a>中提到过：</p>
<blockquote><p>A big difference from normal directives is that element directives are terminal, which means once Vue encounters an element directive, it will completely skip that element</p></blockquote>
<p>实际上自带的directive中也有两个terminal的directive，v-for和v-if（v-else）。</p>
<h3 id="articleHeader5">terminal directive</h3>
<p>在源码中找到：</p>
<blockquote><p>terminal directive will have a terminal link function, which build a node link function for a terminal directive. A terminal link function terminates the current compilation recursion and handles compilation of the subtree in the directive.</p></blockquote>
<p>也就是上面递归过程中描述的，有terminal directive的node在compile时，会跳过其child node的compile过程。而这些child node将由这个directive单独compile（partial compile）。</p>
<p>以图为例，红色节点有terminal directive，compile时（绿线）将其子节点跳过：</p>
<p><span class="img-wrap"><img data-src="/img/bVC74Y?w=1317&amp;h=551" src="https://static.alili.tech/img/bVC74Y?w=1317&amp;h=551" alt="compile terminal" title="compile terminal" style="cursor: pointer;"></span></p>
<p>为什么是v-for和v-if？因为它们会带来节点的增加或者删除。</p>
<p>Compile的中间产物是directive的descriptor，也可能会创建directive来管理的document fragment。这些产物是在link阶段时需要用来实例化directive的。从racap中的图可以清楚的看到，compile过程产出了和link过程怎么使用的它们。那么现在看看v-for的情况：</p>
<p><span class="img-wrap"><img data-src="/img/bVC8kp?w=1038&amp;h=524" src="https://static.alili.tech/img/bVC8kp?w=1038&amp;h=524" alt="List Rendering compile phase" title="List Rendering compile phase" style="cursor: pointer;"></span></p>
<p>compile之后，只得到了v-for的descriptor，link时将用它实例化v-for指令。</p>
<p>v-for descriptor:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="descriptor = {
    name: 'for',
    attrName: 'v-for',
    expression: 'todo in todos',
    raw: 'todo in todos',
    def: vForDefinition
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>descriptor = {
    name: <span class="hljs-symbol">'for'</span>,
    attrName: <span class="hljs-symbol">'v</span>-for',
    expression: <span class="hljs-symbol">'todo</span> <span class="hljs-keyword">in</span> todos',
    raw: <span class="hljs-symbol">'todo</span> <span class="hljs-keyword">in</span> todos',
    def: vForDefinition
}</code></pre>
<h2 id="articleHeader6">link</h2>
<p>Hello World中，link会实例化指令，并将其与compile阶段创建好的fragment（TextNode）进行绑定。但是本文例子中，可以看到compile过程没有创建fragment。这里的link过程只实例化指令，其他过程将发生在v-for指令内部。</p>
<p><span class="img-wrap"><img data-src="/img/bVDgY2?w=778&amp;h=453" src="https://static.alili.tech/img/bVDgY2?w=778&amp;h=453" alt="List Rendering link phase" title="List Rendering link phase" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">bind</h2>
<p>主要的list rendering的魔法都在v-for里面，这里有FragmentFactory，partial compile还有diff算法（diff算法会在单独的文章介绍）。</p>
<p>在v-for的bind()里面，做了三件事：</p>
<ol>
<li><p>重新赋值expression，找出alias："todo in todos"里面，<code>todo</code>是alias，<code>todos</code>才是真正的需要监听的表达式</p></li>
<li><p>移除&lt;li v-for="todo in todos"&gt;"{{"todo.text"}}"&lt;/li&gt;元素，替换上start和end锚点（anchor）。锚点用来帮助插入最终的li节点</p></li>
<li><p>创建FragmentFactory：factory会compile被移除的li节点，得到并缓存linker，后面会用linker创建Fragment</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: /src/directives/public/for.js
bind () {
    // 找出alias，赋值expression = &quot;todos&quot;
    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/)
    if (inMatch) {
      var itMatch = inMatch[1].match(/\((.*),(.*)\)/)
      if (itMatch) {
        this.iterator = itMatch[1].trim()
        this.alias = itMatch[2].trim()
      } else {
        this.alias = inMatch[1].trim()
      }
      this.expression = inMatch[2]
    }
    
    ...
    
    // 创建锚点，移除LI元素
    this.start = createAnchor('v-for-start')
    this.end = createAnchor('v-for-end')
    replace(this.el, this.end)
    before(this.start, this.end)

    ...

    // 创建FragmentFactory
    this.factory = new FragmentFactory(this.vm, this.el)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// file path: /src/directives/public/for.js</span>
bind () {
    <span class="hljs-comment">// 找出alias，赋值expression = "todos"</span>
    <span class="hljs-keyword">var</span> inMatch = <span class="hljs-keyword">this</span>.expression.match(/(.*) (?:<span class="hljs-keyword">in</span>|of) (.*)/)
    <span class="hljs-keyword">if</span> (inMatch) {
      <span class="hljs-keyword">var</span> itMatch = inMatch[<span class="hljs-number">1</span>].match(/\((.*),(.*)\)/)
      <span class="hljs-keyword">if</span> (itMatch) {
        <span class="hljs-keyword">this</span>.iterator = itMatch[<span class="hljs-number">1</span>].trim()
        <span class="hljs-keyword">this</span>.alias = itMatch[<span class="hljs-number">2</span>].trim()
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.alias = inMatch[<span class="hljs-number">1</span>].trim()
      }
      <span class="hljs-keyword">this</span>.expression = inMatch[<span class="hljs-number">2</span>]
    }
    
    ...
    
    <span class="hljs-comment">// 创建锚点，移除LI元素</span>
    <span class="hljs-keyword">this</span>.start = createAnchor(<span class="hljs-string">'v-for-start'</span>)
    <span class="hljs-keyword">this</span>.end = createAnchor(<span class="hljs-string">'v-for-end'</span>)
    replace(<span class="hljs-keyword">this</span>.el, <span class="hljs-keyword">this</span>.end)
    before(<span class="hljs-keyword">this</span>.start, <span class="hljs-keyword">this</span>.end)

    ...

    <span class="hljs-comment">// 创建FragmentFactory</span>
    <span class="hljs-keyword">this</span>.factory = new FragmentFactory(<span class="hljs-keyword">this</span>.vm, <span class="hljs-keyword">this</span>.el)
  }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVDgUp?w=1448&amp;h=499" src="https://static.alili.tech/img/bVDgUp?w=1448&amp;h=499" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="http://demo.jackyang.me/vue-src-pic/list_rendering_partial_compile.png" rel="nofollow noreferrer" target="_blank">大图链接</a></p>
<h3 id="articleHeader8">Fragment &amp; FragmentFactory</h3>
<p>这里的Fragment，指的不是DocumentFragment，而是Vue内部实现的一个类，源码注释解释为：</p>
<blockquote><p>Abstraction for a partially-compiled fragment. Can optionally compile content with a child scope.</p></blockquote>
<p>FragmentFactory会compile<code>&lt;li&gt;"{{"todo.text"}}"&lt;/li&gt;</code>，并保存返回的linker。在v-for中，数组发生变化时，将创建scope，克隆template，即<code>&lt;li&gt;"{{"todo.text"}}"&lt;/li&gt;</code>，使用linker，实例化Fragment，然后挂在end锚点上。</p>
<p>在Fragment中调用linker时，就是link和bind<code>&lt;li&gt;"{{"todo.text"}}"&lt;/li&gt;</code>，和Hello World中一样，创建v-text实例，创建watcher。</p>
<p><span class="img-wrap"><img data-src="/img/bVDgUt?w=1552&amp;h=808" src="https://static.alili.tech/img/bVDgUt?w=1552&amp;h=808" alt="List Rendering bind phase" title="List Rendering bind phase" style="cursor: pointer;"></span></p>
<p><a href="http://demo.jackyang.me/vue-src-pic/list_rendering_complete.png" rel="nofollow noreferrer" target="_blank">大图链接</a></p>
<h3 id="articleHeader9">scope</h3>
<p>为什么在v-for指令里面可以通过别名（alias）<code>todo</code>访问循环变量？为什么有<code>$index</code>和<code>$key</code>这样的特殊变量？因为使用了child scope。</p>
<p>还记得Hello World中watcher是怎么识别simplePath的吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getter = new Function('scope', 'return scope.message;')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> getter = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">'scope'</span>, <span class="hljs-string">'return scope.message;'</span>)</span></span></code></pre>
<p>在这里，说白了就是访问<code>scope</code>对象的todo，$index或者$key属性。在v-for指令里，会扩展其父作用域，本例中父作用域对象就是vm本身。在调用factory创建每一个fragment时，都会以下面方式创建合适的child scope给其使用：</p>
<p><span class="img-wrap"><img data-src="/img/bVDfsX?w=452&amp;h=205" src="https://static.alili.tech/img/bVDfsX?w=452&amp;h=205" alt="child scope" title="child scope" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file path: /src/directives/public/for.js
create (value, alias, index, key) {
    // index是遍历数组时的下标
    // value是对应下标的数组元素
    // alias = 'todo'
    // key是遍历对象时的属性名称
    ...
    var parentScope = this._scope || this.vm
    var scope = Object.create(parentScope) // 以parent scope为原型链创建child scope
    ...
    withoutConversion(() => {
      defineReactive(scope, alias, value) // 添加alias到child scope
    })
    defineReactive(scope, '$index', index) // 添加$index到child scope
    ...
    var frag = this.factory.create(host, scope, this._frag)
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// file path: /src/directives/public/for.js
<span class="hljs-keyword">create</span> (<span class="hljs-keyword">value</span>, <span class="hljs-keyword">alias</span>, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">key</span>) {
    // <span class="hljs-keyword">index</span>是遍历数组时的下标
    // <span class="hljs-keyword">value</span>是对应下标的数组元素
    // <span class="hljs-keyword">alias</span> = <span class="hljs-string">'todo'</span>
    // <span class="hljs-keyword">key</span>是遍历对象时的属性名称
    ...
    <span class="hljs-keyword">var</span> parentScope = this._scope || this.vm
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">scope</span> = Object.create(parentScope) // 以<span class="hljs-keyword">parent</span> <span class="hljs-keyword">scope</span>为原型链创建<span class="hljs-keyword">child</span> <span class="hljs-keyword">scope</span>
    ...
    withoutConversion(() =&gt; {
      defineReactive(<span class="hljs-keyword">scope</span>, <span class="hljs-keyword">alias</span>, <span class="hljs-keyword">value</span>) // 添加<span class="hljs-keyword">alias</span>到<span class="hljs-keyword">child</span> <span class="hljs-keyword">scope</span>
    })
    defineReactive(<span class="hljs-keyword">scope</span>, <span class="hljs-string">'$index'</span>, <span class="hljs-keyword">index</span>) // 添加$<span class="hljs-keyword">index</span>到<span class="hljs-keyword">child</span> <span class="hljs-keyword">scope</span>
    ...
    <span class="hljs-keyword">var</span> frag = this.factory.create(host, <span class="hljs-keyword">scope</span>, this._frag)
    ...
  }</code></pre>
<h1 id="articleHeader10">detect change</h1>
<p>到这里，基本上“初探”了一下List Rendering的过程，里面有很多概念没有深入，打算放在后面结合其他使用这些概念的地方一起在分析，应该能体会到其巧妙的设计。</p>
<p>最后举两个例子，回顾上面的内容</p>
<p>例一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.todos[0].text = 'Learn JAVASCRIPT';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">vm.todos[<span class="hljs-number">0</span>].<span class="hljs-built_in">text</span> = <span class="hljs-string">'Learn JAVASCRIPT'</span>;</code></pre>
<p>改变的是数组元素中text属性，由于factory创建的fragment的v-text指令observe todo.text，因此这里直接由v-text指令更新对应li元素的TextNode内容。</p>
<p>例二：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.todos.push({text: 'Learn Vue Source Code'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">vm</span><span class="hljs-selector-class">.todos</span><span class="hljs-selector-class">.push</span>({<span class="hljs-attribute">text</span>: <span class="hljs-string">'Learn Vue Source Code'</span>});</code></pre>
<p>增加了数组元素，v-for指令的watcher通知其做update，diff算法判断新增了一个元素，于是创建scope，factory克隆template，创建新的fragment，append在#end-anchor的前面，fragment中的v-text指令observe新增元素的text属性，将值更新到TextNode上。</p>
<p>更多数组操作放在diff算法中再看。</p>
<p>到这里，应该对官网上的这句话有更深的理解了：</p>
<blockquote><p>Instead of a Virtual DOM, Vue.js uses the actual DOM as the template and keeps references to actual nodes for data bindings.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js源码（2）：初探List Rendering

## 原文链接
[https://segmentfault.com/a/1190000006938217](https://segmentfault.com/a/1190000006938217)


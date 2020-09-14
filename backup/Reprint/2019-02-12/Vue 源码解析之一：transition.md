---
title: 'Vue 源码解析之一：transition' 
date: 2019-02-12 2:30:12
hidden: true
slug: d5my6x5axii
categories: [reprint]
---

{{< raw >}}

                    
<p>最近公司的项目选型使用了vue，所以用vue开发了一个项目，期间在处理一些动画的时候，发现vue-transition虽然用起来简单，但是局限性很大，比如无法处理一个组件中父子元素的联动动画。这就极大得限制了我们的发挥，你只能进行单层次的动画，类似modal这种两种动画联动的就很难做，你很可能需要分成两个组件来做，这就不符合组件化的原则。</p>
<p>所以打算研读一下源码，然后研究一下如何解决这个问题。</p>
<p>既然是看transition，那么首先就得狙击<code>transition</code>指令，然后<code>transition</code>指令代码如此简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// (/src/directives/internal/transition.js)

export default {

  priority: TRANSITION,

  update (id, oldId) {
    var el = this.el
    // resolve on owner vm
    var hooks = resolveAsset(this.vm.$options, 'transitions', id)
    id = id || 'v'
    // apply on closest vm
    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm)
    if (oldId) {
      removeClass(el, oldId + '-transition')
    }
    addClass(el, id + '-transition')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="javscript">// (/src/directives/internal/transition.js)

export default {

  priority: TRANSITION,

  <span class="hljs-keyword">update</span> (id, oldId) {
    var <span class="hljs-keyword">el</span> = this.<span class="hljs-keyword">el</span>
    // <span class="hljs-built_in">resolve</span> <span class="hljs-keyword">on</span> owner <span class="hljs-keyword">vm</span>
    var hooks = resolveAsset(this.<span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">options</span>, <span class="hljs-string">'transitions'</span>, id)
    id = id || <span class="hljs-string">'v'</span>
    // apply <span class="hljs-keyword">on</span> closest <span class="hljs-keyword">vm</span>
    <span class="hljs-keyword">el</span>.__v_trans = <span class="hljs-keyword">new</span> Transition(<span class="hljs-keyword">el</span>, id, hooks, this.<span class="hljs-keyword">el</span>.__vue__ || this.<span class="hljs-keyword">vm</span>)
    <span class="hljs-keyword">if</span> (oldId) {
      removeClass(<span class="hljs-keyword">el</span>, oldId + <span class="hljs-string">'-transition'</span>)
    }
    addClass(<span class="hljs-keyword">el</span>, id + <span class="hljs-string">'-transition'</span>)
  }
}</code></pre>
<p>在这里我们指令在<code>el</code>上加上了一个<code>__v_trans</code>属性，这个属性是一个<code>Transition</code>的实例，所以我们去看看这个实例干了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// (/src/transition/transition.js)

export default function Transition (el, id, hooks, vm) {
    ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// (/src/transition/transition.js)</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Transition</span> (<span class="hljs-params">el, id, hooks, vm</span>) </span>{
    ...
}
</code></pre>
<p>这就是一个保存这个过渡动画应该包含的一些属性和钩子，我们还是不知道什么时候通过什么方法调用了动画</p>
<p>这时候我回头去看了vue的文档，在transition的介绍里有这么一句：</p>
<blockquote>
<p>transition 特性可以与下面资源一起用：</p>
<p>v-if<br>v-show<br>v-for （只为插入和删除触发）<br>动态组件 （介绍见组件）<br>在组件的根节点上，并且被 Vue 实例 DOM 方法（如 vm.$appendTo(el)）触发。</p>
</blockquote>
<p>这时候我就怀疑只有特定的场景才能触发transition，而触发的关键就在这些指令里面，于是我就去看<code>v-if</code>指令，然后在他插入节点的时候发现了这一句代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.frag = this.factory.create(this._host, this._scope, this._frag)
this.frag.before(this.anchor)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.frag = <span class="hljs-keyword">this</span>.factory.create(<span class="hljs-keyword">this</span>._host, <span class="hljs-keyword">this</span>._scope, <span class="hljs-keyword">this</span>._frag)
<span class="hljs-keyword">this</span>.frag.before(<span class="hljs-keyword">this</span>.anchor)</code></pre>
<p>这个<code>factory</code>是什么？，接着找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.elseFactory = new FragmentFactory(this.vm, next)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.elseFactory = <span class="hljs-keyword">new</span> FragmentFactory(<span class="hljs-keyword">this</span>.vm, <span class="hljs-keyword">next</span>)</code></pre>
<p>他是一个<code>FragmentFactory</code>，在这个<code>FragmentFactory</code>里面我看到了这一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function singleBefore (target, withTransition) {
  this.inserted = true
  var method = withTransition !== false
    ? beforeWithTransition
    : before
  method(this.node, target, this.vm)
  if (inDoc(this.node)) {
    this.callHook(attach)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-function">function <span class="hljs-title">singleBefore</span> <span class="hljs-params">(<span class="hljs-keyword">target</span>, withTransition)</span> </span>{
  <span class="hljs-keyword">this</span>.inserted = <span class="hljs-keyword">true</span>
  var method = withTransition !== <span class="hljs-keyword">false</span>
    ? beforeWithTransition
    : before
  method(<span class="hljs-keyword">this</span>.node, <span class="hljs-keyword">target</span>, <span class="hljs-keyword">this</span>.vm)
  <span class="hljs-keyword">if</span> (inDoc(<span class="hljs-keyword">this</span>.node)) {
    <span class="hljs-keyword">this</span>.callHook(attach)
  }
}</code></pre>
<p>貌似看到了一些曙光，我们终于看到跟transition有关的东西，这里我们继续找到<code>beforeWithTransition</code>这个方法，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function beforeWithTransition (el, target, vm, cb) {
  applyTransition(el, 1, function () {
    before(el, target)
  }, vm, cb)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>export <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeWithTransition</span> <span class="hljs-params">(el, target, vm, cb)</span> {</span>
  applyTransition(<span class="hljs-keyword">el</span>, <span class="hljs-number">1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    before(<span class="hljs-keyword">el</span>, target)
  }, <span class="hljs-keyword">vm</span>, <span class="hljs-keyword">cb</span>)
}</code></pre>
<p>这里调用了applyTransition，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function applyTransition (el, direction, op, vm, cb) {
  var transition = el.__v_trans
  if (
    !transition ||
    // skip if there are no js hooks and CSS transition is
    // not supported
    (!transition.hooks &amp;&amp; !transitionEndEvent) ||
    // skip transitions for initial compile
    !vm._isCompiled ||
    // if the vm is being manipulated by a parent directive
    // during the parent's compilation phase, skip the
    // animation.
    (vm.$parent &amp;&amp; !vm.$parent._isCompiled)
  ) {
    op()
    if (cb) cb()
    return
  }
  var action = direction > 0 ? 'enter' : 'leave'
  transition[action](op, cb)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyTransition</span> (<span class="hljs-params">el, direction, op, vm, cb</span>) </span>{
  <span class="hljs-built_in">var</span> transition = el.__v_trans
  <span class="hljs-keyword">if</span> (
    !transition ||
    <span class="hljs-comment">// skip if there are no js hooks and CSS transition is</span>
    <span class="hljs-comment">// not supported</span>
    (!transition.hooks &amp;&amp; !transitionEndEvent) ||
    <span class="hljs-comment">// skip transitions for initial compile</span>
    !vm._isCompiled ||
    <span class="hljs-comment">// if the vm is being manipulated by a parent directive</span>
    <span class="hljs-comment">// during the parent's compilation phase, skip the</span>
    <span class="hljs-comment">// animation.</span>
    (vm.$<span class="hljs-built_in">parent</span> &amp;&amp; !vm.$<span class="hljs-built_in">parent</span>._isCompiled)
  ) {
    op()
    <span class="hljs-keyword">if</span> (cb) cb()
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-built_in">var</span> action = direction &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'enter'</span> : <span class="hljs-string">'leave'</span>
  transition[action](op, cb)
}</code></pre>
<p>在这里我们终于看到了<code>el.__v_trans</code>这个属性，那么这个回路基本就算走完了。</p>
<p>然后我去看了一下<code>v-show</code>指令，于是发现，还有更简单的方法。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apply (el, value) {
    if (inDoc(el)) {
      applyTransition(el, value ? 1 : -1, toggle, this.vm)
    } else {
      toggle()
    }
    function toggle () {
      el.style.display = value ? '' : 'none'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>apply (<span class="hljs-keyword">el</span>, value) {
    <span class="hljs-keyword">if</span> (inDoc(<span class="hljs-keyword">el</span>)) {
      applyTransition(<span class="hljs-keyword">el</span>, value ? <span class="hljs-number">1</span> : -<span class="hljs-number">1</span>, toggle, this.<span class="hljs-keyword">vm</span>)
    } <span class="hljs-keyword">else</span> {
      toggle()
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toggle</span> <span class="hljs-params">()</span> {</span>
      <span class="hljs-keyword">el</span>.style.<span class="hljs-keyword">display</span> = value ? <span class="hljs-string">''</span> : <span class="hljs-string">'none'</span>
    }
}</code></pre>
<p>直接<code>applyTransition</code>就可以调用了</p>
<p>现在我们知道为什么<code>v-transition</code>是只能单点的了，因为本质上他只能作用于特定指令所影响的特定元素，他的实现方式并不是类似于react的<code>TransitionGroup</code>这样通过给子组件增加生命周期在通过子组件在生命周期自定义动画的方式，vue的局限性表露无遗，让我觉得很奇怪作者为什么选择这种方式，难道真的只是为了降低使用难度？</p>
<p><strong>问题提出来了，就得想办法了</strong></p>
<p>我得想想。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 源码解析之一：transition

## 原文链接
[https://segmentfault.com/a/1190000004670036](https://segmentfault.com/a/1190000004670036)


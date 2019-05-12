---
title: 'React-Redux源码剖析' 
date: 2019-02-06 2:30:08
hidden: true
slug: 9kqf8zupdac
categories: [reprint]
---

{{< raw >}}

                    
<p>React-Redux是用在连接React和Redux上的。如果你想同时用这两个框架，那么React-Redux基本就是必须的了。为了能够更好的使用这个工具，今天就对它进行一下源码剖析。</p>
<h2 id="articleHeader0">Provider</h2>
<p>一个React组件，一般你的rootApp要放倒这个组件内部渲染。它很简单，最关键的作用就是在context中放入Redux的store，方便子组件获取。关键代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getChildContext() {
    return { store: this.store }
}

Provider.childContextTypes = {
   store: storeShape.isRequired
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">getChildContext</span><span class="hljs-params">()</span></span> {
    return { store: this<span class="hljs-selector-class">.store</span> }
}

Provider<span class="hljs-selector-class">.childContextTypes</span> = {
   store: storeShape<span class="hljs-selector-class">.isRequired</span>
}
</code></pre>
<p>这样connect的组件就可以获取store，使用store的方法。</p>
<h2 id="articleHeader1">connect</h2>
<p>首选connect是个可以执行两次的柯里化函数，第一次传入的参数相当于一系列的定制化东西，第二次传入的是你要连接的React组件，然后返回一个新的React组件。<br>第一次执行时传入的参数是mapStateToProps, mapDispatchToProps, mergeProps, options这四个。首先会对这几个参数进行处理，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//决定组件会不会因state改变而更新
const shouldSubscribe = Boolean(mapStateToProps)
//如果不传递这个参数使用默认state => ({})
const mapState = mapStateToProps || defaultMapStateToProps

//mapDispatchToProps的处理，最后的情况实际是使用bindActionCreators处理
let mapDispatch
if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
} else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
} else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
}

//不传递就使用默认值
const finalMergeProps = mergeProps || defaultMergeProps
const { pure = true, withRef = false } = options
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//决定组件会不会因state改变而更新</span>
<span class="hljs-keyword">const</span> shouldSubscribe = <span class="hljs-built_in">Boolean</span>(mapStateToProps)
<span class="hljs-comment">//如果不传递这个参数使用默认state =&gt; ({})</span>
<span class="hljs-keyword">const</span> mapState = mapStateToProps || defaultMapStateToProps

<span class="hljs-comment">//mapDispatchToProps的处理，最后的情况实际是使用bindActionCreators处理</span>
<span class="hljs-keyword">let</span> mapDispatch
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> mapDispatchToProps === <span class="hljs-string">'function'</span>) {
    mapDispatch = mapDispatchToProps
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
} <span class="hljs-keyword">else</span> {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
}

<span class="hljs-comment">//不传递就使用默认值</span>
<span class="hljs-keyword">const</span> finalMergeProps = mergeProps || defaultMergeProps
<span class="hljs-keyword">const</span> { pure = <span class="hljs-literal">true</span>, withRef = <span class="hljs-literal">false</span> } = options
</code></pre>
<p>第二次执行函数接收的参数是个React组件：WrappedComponent，之后返回一个新的React组件Connect。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return hoistStatics(Connect, WrappedComponent)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">return</span> hoistStatics(Connect, WrappedComponent)
</code></pre>
<p>把WrappedComponent的非React属性拷贝到Connect上。下面详细说下Connect。</p>
<h2 id="articleHeader2">Connect</h2>
<p>一个React组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Connect.contextTypes = {
    store: storeShape
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Connect<span class="hljs-selector-class">.contextTypes</span> = {
    store: storeShape
}
</code></pre>
<p>所以它可以从context中获取Provider放的store。</p>
<h4>constructor</h4>
<p>在constructor中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取store
this.store = props.store || context.store
const storeState = this.store.getState()
//把store的state作为组件的state，后面通过更新state更新组件
this.state = { storeState }
//清除组件的状态，内部是一系列的标示还原
this.clearCache()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//获取store
this.store = props.store || context.store
const storeState = this.store.getState()
//把store的<span class="hljs-keyword">state</span>作为组件的<span class="hljs-keyword">state</span>，后面通过更新<span class="hljs-keyword">state</span>更新组件
this.<span class="hljs-keyword">state</span> = { storeState }
//清除组件的状态，内部是一系列的标示还原
this.clearCache()
</code></pre>
<h4>render</h4>
<p>然后是render方法，在挂载的时候，会经过一系列的判断和计算，比如使用mapState计算nextStateProps，并和this.stateProps对比是否发生改变，如果发生改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nextDispatchProps ＝ mapState(store.getState(), [props])
this.stateProps = nextDispatchProps
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>nextDispatchProps ＝ mapState(store.getState(), [props])
this.<span class="hljs-keyword">state</span>Props = nextDispatchProps
</code></pre>
<p>使用mapDispatch计算nextDispatchProps，并和this.dispatchProps对比是否发生改变，如果发生改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nextMergedProps ＝ mapDispatch(dispatch, [props])
this.dispatchProps = nextMergedProps
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>nextMergedProps ＝ mapDispatch(dispatch, [props])
<span class="hljs-keyword">this</span>.dispatchProps = nextMergedProps
</code></pre>
<p>如果上面的两个对比有一个发生改变，就会继续使用finalMergeProps来计算最终的数据合并结果nextMergedProps，并和this.mergedProps对比是否发生改变，如果发生改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nextMergedProps ＝ finalMergeProps(this.stateProps, this.dispatchProps, this.props)
this.mergedProps ＝ nextMergedProps
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>nextMergedProps ＝ finalMergeProps(<span class="hljs-keyword">this</span>.stateProps, <span class="hljs-keyword">this</span>.dispatchProps, <span class="hljs-keyword">this</span>.props)
<span class="hljs-keyword">this</span>.mergedProps ＝ nextMergedProps
</code></pre>
<p>如果上面的对比确定发生改变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (withRef) {
  this.renderedElement = createElement(WrappedComponent, {
      ...this.mergedProps,
      ref: 'wrappedInstance'
  })
 } else {
  this.renderedElement = createElement(WrappedComponent,
      this.mergedProps
  )
 }
  return this.renderedElement
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (withRef) {
  <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent, {
      ...<span class="hljs-keyword">this</span>.mergedProps,
      ref: <span class="hljs-string">'wrappedInstance'</span>
  })
 } <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent,
      <span class="hljs-keyword">this</span>.mergedProps
  )
 }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.renderedElement
</code></pre>
<p>如果withRef等于true就会增加ref属性，然后可以通过getWrappedInstance方法获取DOM。如果前面说的这些对比的结果都是false，就会直接返回this.renderedElement，组件不进行任何更新。当然组件挂载的时候前面的对比都会返回true。</p>
<h4>componentDidMount</h4>
<p>它内部的关键代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (shouldSubscribe &amp;&amp; !this.unsubscribe) {
    this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
    this.handleChange()
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (shouldSubscribe &amp;&amp; !<span class="hljs-keyword">this</span>.unsubscribe) {
    <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-keyword">this</span>.store.subscribe(<span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>))
    <span class="hljs-keyword">this</span>.handleChange()
}
</code></pre>
<p>在不指定mapStateToProps的时候shouldSubscribe等于false，这就意味着React-Redux的源码剖析到此结束，谢谢观看！当然如果指定了mapStateToProps剖析就还得继续。看到代码没有，竟然使用subscribe，意味着只要执行dispatch，handleChange就会执行。至此组件已经挂载完毕，后面的代码执行需要有外界因素了，比如父组件传递新的props、执行dispatch。</p>
<h4>componentWillReceiveProps</h4>
<p>组件还实现了componentWillReceiveProps这个React生命周期中的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps) {
    if (!pure || !shallowEqual(nextProps, this.props)) {
        this.haveOwnPropsChanged = true
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (!pure || !shallowEqual(nextProps, <span class="hljs-keyword">this</span>.props)) {
        <span class="hljs-keyword">this</span>.haveOwnPropsChanged = <span class="hljs-literal">true</span>
    }
}
</code></pre>
<p>看到pure的重要性了吧，如果pure被设置为false就意味着不管属性是否浅相等this.haveOwnPropsChanged总是会被设置为true，而这会导致后面一系列的为了更新而进行的计算，所以pure为true是可以给你的性能带来帮助的，不过它默认就是true。这里设置this.haveOwnPropsChanged等于true是给通过直接通过父组件传递props更新组件带来可能，当然需要配合mapStateToProps, mapDispatchToProps, mergeProps这三个函数，如果它们都没有利用ownProps，最终组件还是不能通过这种方式更新。</p>
<h4>handleChange</h4>
<p>下面假定触发了一次dispatch，这个时候handleChange就会执行，如果state没有发生改变，并且pure为true，就什么都不做直接返回，pure又在性能上立功了。如果state发生了改变会再做一些计算对比，比如计算this.stateProps。最后是在要更新的时候会：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.hasStoreStateChanged = true
this.setState({ storeState })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.hasStoreStateChanged = <span class="hljs-literal">true</span>
<span class="hljs-keyword">this</span>.setState({ storeState })
</code></pre>
<p>调用setState来触发组件更新。这里其实意味着只要store的state发生改变，所有的mapStateToProps、 mapDispatchToProps、mergeProps都会执行。</p>
<h4>shouldComponentUpdate</h4>
<p>这个时候会调用它内部实现的shouldComponentUpdate，用来提高性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate() {
    return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>shouldComponentUpdate() {
    <span class="hljs-keyword">return</span> !pure || <span class="hljs-keyword">this</span>.haveOwnPropsChanged || <span class="hljs-keyword">this</span>.hasStoreStateChanged
}
</code></pre>
<p>但是怎么感觉这个并没有什么用呢？可能是我理解不深，因为无论是父组件更新props还是state改变这里总是返回true，而不管改变的是不是这个组件关心的数据。没办法又进入了render方法。</p>
<p>好了，源码剖析到此结束，谢谢观看！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Redux源码剖析

## 原文链接
[https://segmentfault.com/a/1190000006196949](https://segmentfault.com/a/1190000006196949)


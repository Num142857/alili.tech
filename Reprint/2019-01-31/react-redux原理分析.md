---
title: 'react-redux原理分析' 
date: 2019-01-31 2:31:16
hidden: true
slug: dw38usex45b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>
<p><code>react</code>和<code>redux</code>并没有什么直接的联系. <code>redux</code>作为一个通用模块, 主要还是用来处理应用中的state的变更, 而展示层不一定是<code>react</code>.</p>
<p>但当我们希望在React + Redux的项目中将两者结合的更好，可以通过<code>react-redux</code>做连接。</p>
</blockquote>
<p>本文结合react-redux的使用，分析其实现原理。</p>
<h2 id="articleHeader1">react-redux</h2>
<p><code>react-redux</code>是一个轻量级的封装库，核心方法只有两个：</p>
<ul>
<li><p>Provider</p></li>
<li><p>connect</p></li>
</ul>
<p>下面我们来逐个分析其作用</p>
<h2 id="articleHeader2">Provider</h2>
<p><a href="https://github.com/reactjs/react-redux/blob/master/src/components/Provider.js" rel="nofollow noreferrer" target="_blank">完整源码请戳这里</a></p>
<p>Provider模块的功能并不复杂, 主要分为以下两点:</p>
<ul>
<li><p>在原应用组件上包裹一层，使原来整个应用成为Provider的子组件</p></li>
<li><p>接收Redux的store作为props，通过context对象传递给子孙组件上的connect</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { storeShape, subscriptionShape } from '../utils/PropTypes'
import warning from '../utils/warning'

let didWarnAboutReceivingStore = false
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return
  }
  didWarnAboutReceivingStore = true
}

export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    if (process.env.NODE_ENV !== 'production') {
      Provider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this[storeKey] !== nextProps.store) {
          warnAboutReceivingStore()
        }
      }
    }

    return Provider
}

export default createProvider()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Component, Children } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>
<span class="hljs-keyword">import</span> { storeShape, subscriptionShape } <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/PropTypes'</span>
<span class="hljs-keyword">import</span> warning <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/warning'</span>

<span class="hljs-keyword">let</span> didWarnAboutReceivingStore = <span class="hljs-literal">false</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">warnAboutReceivingStore</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (didWarnAboutReceivingStore) {
    <span class="hljs-keyword">return</span>
  }
  didWarnAboutReceivingStore = <span class="hljs-literal">true</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createProvider</span>(<span class="hljs-params">storeKey = <span class="hljs-string">'store'</span>, subKey</span>) </span>{
    <span class="hljs-keyword">const</span> subscriptionKey = subKey || <span class="hljs-string">`<span class="hljs-subst">${storeKey}</span>Subscription`</span>

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Provider</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        getChildContext() {
          <span class="hljs-keyword">return</span> { [storeKey]: <span class="hljs-keyword">this</span>[storeKey], [subscriptionKey]: <span class="hljs-literal">null</span> }
        }

        <span class="hljs-keyword">constructor</span>(props, context) {
          <span class="hljs-keyword">super</span>(props, context)
          <span class="hljs-keyword">this</span>[storeKey] = props.store;
        }

        render() {
          <span class="hljs-keyword">return</span> Children.only(<span class="hljs-keyword">this</span>.props.children)
        }
    }

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      Provider.prototype.componentWillReceiveProps = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nextProps</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>[storeKey] !== nextProps.store) {
          warnAboutReceivingStore()
        }
      }
    }

    <span class="hljs-keyword">return</span> Provider
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createProvider()</code></pre>
<h3 id="articleHeader3">1.1 封装原应用</h3>
<blockquote><p><strong>render</strong>方法中, 渲染了其子级元素, 使整个应用成为Provider的子组件.</p></blockquote>
<ol>
<li><p><code>this.props.children</code>是react内置在<code>this.props</code>上的对象, 用于获取当前组件的所有子组件.</p></li>
<li><p><code>Children</code>为react内部定义的顶级对象, 该对象封装了一些方便操作字组件的方法. <code>Children.only</code>用于获取仅有的一个子组件,<br>   没有或者超过一个均会报错. <strong>所以注意: 确保Provider组件的直接子级为单个封闭元素，切勿多个组件平行放置</strong></p></li>
</ol>
<h3 id="articleHeader4">1.2 传递<code>store</code>
</h3>
<ol>
<li><p><strong>constructor</strong>方法: Provider初始化时, 获取到props中的store对象;</p></li>
<li><p><strong>getChildContext</strong>方法: 将外部的<code>store</code>对象放入<code>context</code>对象中，使子孙组件上的<code>connect</code>可以直接访问到<code>context</code>对象中的store。</p></li>
</ol>
<blockquote><p><code>context</code>可以使子孙组件直接获取父级组件中的数据或方法，而无需一层一层通过props向下传递。<code>context</code>对象相当于一个独立的空间，父组件通过getChildContext()向该空间内写值；定义了<code>contextTypes</code>验证的子孙组件可以通过<code>this.context.xxx</code>，从<code>context</code>对象中读取<code>xxx</code>字段的值</p></blockquote>
<h3 id="articleHeader5">1.3 小结</h3>
<p>总而言之，<code>Provider</code>模块的功能很简单，从最外部封装了整个应用，并向<code>connect</code>模块传递<code>store</code>。<br>而最核心的功能在<code>connect</code>模块中。</p>
<h2 id="articleHeader6">connect</h2>
<blockquote>
<p>正如这个模块的命名，<code>connect</code>模块才是真正连接了<code>React</code>和<code>Redux</code>。</p>
<p>现在，我们可以先回想一下Redux是怎样运作的：首先需要注册一个全局唯一的store对象，用来维护整个应用的state；当要变更state时，我们会dispatch一个action，reducer根据action更新相应的state。</p>
</blockquote>
<p>下面我们再考虑一下使用react-redux时，我们做了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import React from &quot;react&quot;
    import ReactDOM from &quot;react-dom&quot;
    import { bindActionCreators } from &quot;redux&quot;
    import {connect} from &quot;react-redux&quot;
    
    class xxxComponent extends React.Component{
        constructor(props){
            super(props)
        }
        componentDidMount(){
            this.props.aActions.xxx1();
        }
        render (
            <div>
                {this.props.$$aProps}
            </div>
        )
    }
    
    export default connect(
        state => ({
            $$aProps: state.$$aProps,
            $$bProps: state.$$bProps,
            // ...
        }),
        dispatch => ({
            aActions: bindActionCreators(AActions,dispatch),
            bActions: bindActionCreators(BActions,dispatch),
            // ...
        })
    )(xxxComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>
    <span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>
    <span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">"redux"</span>
    <span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">"react-redux"</span>
    
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">xxxComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
        <span class="hljs-keyword">constructor</span>(props){
            <span class="hljs-keyword">super</span>(props)
        }
        componentDidMount(){
            <span class="hljs-keyword">this</span>.props.aActions.xxx1();
        }
        render (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {this.props.$$aProps}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(
        <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
            <span class="hljs-attr">$$aProps</span>: state.$$aProps,
            <span class="hljs-attr">$$bProps</span>: state.$$bProps,
            <span class="hljs-comment">// ...</span>
        }),
        dispatch =&gt; ({
            <span class="hljs-attr">aActions</span>: bindActionCreators(AActions,dispatch),
            <span class="hljs-attr">bActions</span>: bindActionCreators(BActions,dispatch),
            <span class="hljs-comment">// ...</span>
        })
    )(xxxComponent)</code></pre>
<p>由export的component对象进行如下猜想:<br>1、使用了<code>react-redux</code>的<code>connect</code>后，我们导出的对象不再是原先定义的<code>xxx Component</code>，而是通过<code>connect</code>包裹后的新<code>React.Component</code>对象。<br><code>connect</code>执行后返回一个函数（wrapWithConnect），那么其内部势必形成了闭包。而<code>wrapWithConnect</code>执行后，必须要返回一个<code>ReactComponent</code>对象，才能保证原代码逻辑可以正常运行，而这个<code>ReactComponent</code>对象通过<code>render</code>原组件，形成对原组件的封装。<br>2、渲染页面需要<code>store tree</code>中的<code>state</code>片段，变更<code>state</code>需要<code>dispatch</code>一个<code>action</code>，而这两部分，都是从<code>this.props</code>获取。故在我们调用<code>connect</code>时，作为参数传入的<code>state</code>和<code>action</code>，便在<code>connect</code>内部进行合并，通过props的方式传递给包裹后的<code>ReactComponent</code>。<br>好了, 以上只是我们的猜测, 下面看具体实现, 完整代码<a href="https://github.com/reactjs/react-redux/blob/master/src/connect/connect.js" rel="nofollow noreferrer" target="_blank">请戳这里</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect(
    mapStateToProps(state, ownProps) => stateProps: object,
    mapDispatchToProps(dispatch, ownProps) => dispatchProps: object,
    mergeProps(stateProps, dispatchProps, ownProps) => props: Object,
    options: object
) => (
    component
) => component" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>connect(
    mapStateToProps(<span class="hljs-keyword">state</span>, ownProps) =&gt; <span class="hljs-keyword">state</span>Props: object,
    mapDispatchToProps(dispatch, ownProps) =&gt; dispatchProps: object,
    mergeProps(<span class="hljs-keyword">state</span>Props, dispatchProps, ownProps) =&gt; props: Object,
    options: object
) =&gt; (
    component
) =&gt; component</code></pre>
<p>再来看下connect函数体结构, 我们摘取核心步骤进行描述:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
    // 参数处理
    // ...
    return function wrapWithConnect(WrappedComponent) {
        
        class Connect extends Component {
            constructor(props, context) {
                super(props, context)
                this.store = props.store || context.store;
                const storeState = this.store.getState()
                this.state = { storeState }
            }
            // 周期方法及操作方法
            // ...
            render(){
                this.renderedElement = createElement(WrappedComponent,
                    this.mergedProps //mearge stateProps, dispatchProps, props
                )
                return this.renderedElement;
            }
        }
        return hoistStatics(Connect, WrappedComponent);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">mapStateToProps, mapDispatchToProps, mergeProps, options = {}</span>) </span>{
    <span class="hljs-comment">// 参数处理</span>
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapWithConnect</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
        
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
            <span class="hljs-keyword">constructor</span>(props, context) {
                <span class="hljs-keyword">super</span>(props, context)
                <span class="hljs-keyword">this</span>.store = props.store || context.store;
                <span class="hljs-keyword">const</span> storeState = <span class="hljs-keyword">this</span>.store.getState()
                <span class="hljs-keyword">this</span>.state = { storeState }
            }
            <span class="hljs-comment">// 周期方法及操作方法</span>
            <span class="hljs-comment">// ...</span>
            render(){
                <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent,
                    <span class="hljs-keyword">this</span>.mergedProps <span class="hljs-comment">//mearge stateProps, dispatchProps, props</span>
                )
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.renderedElement;
            }
        }
        <span class="hljs-keyword">return</span> hoistStatics(Connect, WrappedComponent);
    }
}</code></pre>
<p>其实已经基本印证了我们的猜测：<br>1、<code>connect</code>通过<code>context</code>获取<code>Provider</code>中的<code>store</code>，通过<code>store.getState()</code>获取整个<code>store tree</code> 上所有<code>state</code>。<br>2、<code>connect</code>模块的返回值<code>wrapWithConnect</code>为<code>function</code>。<br>3、<code>wrapWithConnect</code>返回一个<code>ReactComponent</code>对象<code>Connect</code>，<code>Connect</code>重新<code>render</code>外部传入的原组件<code>WrappedComponent</code>，并把<code>connect</code>中传入的<code>mapStateToProps</code>, <code>mapDispatchToProps</code>与组件上原有的<code>props</code>合并后，通过属性的方式传给<code>WrappedComponent</code>。<br>下面我们结合代码进行分析一下每个函数的意义。</p>
<h3 id="articleHeader7">mapStateToProps</h3>
<p><code>mapStateToProps(state, props)</code>必须是一个函数.<br>参数<code>state</code>为<code>store tree</code>中所有state, 参数<code>props</code>为通过组件<code>Connect</code>传入的<code>props</code>.<br>返回值表示需要<code>merge</code>进<code>props</code>中的<code>state</code>.</p>
<h3 id="articleHeader8">mapDispatchToProps</h3>
<p><code>mapDispatchToProps(dispatch, props)</code>可以是一个函数, 也可以是一个对象.<br>参数<code>dispatch</code>为<code>store.dispatch</code>函数, 参数<code>props</code>为通过组件<code>Connect</code>传入的<code>props</code>.<br>返回值表示需要<code>merge</code>进<code>props</code>中的<code>action</code>.</p>
<h3 id="articleHeader9">mergeProps(一般不用)</h3>
<p><code>mergeProps</code>是一个函数，定义了<code>mapState</code>, <code>mapDispatch</code>及<code>this.props</code>的合并规则.</p>
<h3 id="articleHeader10">options(一般不用)</h3>
<p><code>options</code>是一个对象，包含<code>pure</code>和<code>withRef</code>两个属性<br><code>pure</code>: 表示是否开启<code>pure</code>优化，默认值为true.<br><code>withRef</code>: <code>withRef</code>用来给包装在里面的组件一个<code>ref</code>，可以通过<code>getWrappedInstance</code>方法来获取这个ref，默认为false。</p>
<h2 id="articleHeader11">React如何响应Store变化</h2>
<p>文章一开始我们也提到React其实跟Redux没有直接联系, 也就是说, Redux中dispatch触发store中state变化, 并不会导致React重新渲染. react-redux才是真正触发React重新渲染的模块, 那么这一过程怎样实现的呢?<br>刚刚提到connect模块返回一个wrapConnect函数, 此函数中又返回了一个Connect组件. Connect组件的功能有以下两点:</p>
<ul>
<li><p>包装组件, 将state和action通过props的方式传入到原组件内部</p></li>
<li><p>监听store tree变化, 使其包装的原组件可以响应state变化<br>下面我们主要分析下第二点</p></li>
</ul>
<h3 id="articleHeader12">如何注册监听</h3>
<p>在redux中, 可以通过store.subscribe(listener)注册一个监听器.listener会在store tree更新后执行.以下代码为Connect组件内部，向store tree注册listener的过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        ? this.parentSub.addNestedSub(this.onStateChange)
        : this.store.subscribe(this.onStateChange)
 
      this.listeners = createListenerCollection()
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  trySubscribe() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.unsubscribe) {
      <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-keyword">this</span>.parentSub
        ? <span class="hljs-keyword">this</span>.parentSub.addNestedSub(<span class="hljs-keyword">this</span>.onStateChange)
        : <span class="hljs-keyword">this</span>.store.subscribe(<span class="hljs-keyword">this</span>.onStateChange)
 
      <span class="hljs-keyword">this</span>.listeners = createListenerCollection()
    }
  }</code></pre>
<h3 id="articleHeader13">何时注册</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    componentDidMount() {
        ...
        this.subscription.trySubscribe()
        ...
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    componentDidMount() {
        ...
        this<span class="hljs-selector-class">.subscription</span><span class="hljs-selector-class">.trySubscribe</span>()
        ...
    }</code></pre>
<p>可以看到，当Connect组件加载到页面后，当前组件开始监听store tree变化</p>
<h3 id="articleHeader14">何时注销</h3>
<p>当前Connect组件销毁后，我们希望其中注册的listener也一并销毁，避免性能问题。此时可以在Connect的componentWillUnmount周期函数中执行这一过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      componentWillUnmount() {
          if (this.subscription) this.subscription.tryUnsubscribe()
          ...
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>      componentWillUnmount() {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.subscription) <span class="hljs-keyword">this</span>.subscription.tryUnsubscribe()
          ...
      }</code></pre>
<h3 id="articleHeader15">变更处理逻辑</h3>
<p>有了触发组件更新的时机，我们下面主要看下，组件是通过何种方式触发重新渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      onStateChange() {
        ...
        if (!this.selector.shouldComponentUpdate) {
          ...
        } else {
          ...
          this.setState(dummyState) // dummyState = {}, 仅仅是为了触发更新
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>      onStateChange() {
        ...
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.selector.shouldComponentUpdate) {
          ...
        } <span class="hljs-keyword">else</span> {
          ...
          <span class="hljs-keyword">this</span>.setState(dummyState) <span class="hljs-comment">// dummyState = {}, 仅仅是为了触发更新</span>
        }
      }</code></pre>
<h3 id="articleHeader16">小结</h3>
<p>可以看到，react-redux的核心功能都在connect模块中，理解好这个模块，有助于我们更好的使用react-redux处理业务问题，优化代码性能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-redux原理分析

## 原文链接
[https://segmentfault.com/a/1190000007589792](https://segmentfault.com/a/1190000007589792)


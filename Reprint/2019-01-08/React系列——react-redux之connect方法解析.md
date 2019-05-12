---
title: 'React系列——react-redux之connect方法解析' 
date: 2019-01-08 2:30:11
hidden: true
slug: frayg2h5coq
categories: [reprint]
---

{{< raw >}}

                    
<h4>connect简介</h4>
<p><strong>前方高能预警，有耐心才能看完文章！！</strong></p>
<p>react-redux仅有2个API，Provider和connect，Provider提供的是一个顶层容器的作用，实现store的上下文传递。</p>
<p>connect方法比较复杂，虽然代码只有368行，但是为redux中常用的功能实现了和react连接的建立。</p>
<p><strong>一个基础的connect方法如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">connect</span><span class="hljs-params">(mapStateToProps, mapDispatchToProps, mergeProps, options = {})</span></span> 
</code></pre>
<h4>为什么我们需要react-redux？</h4>
<p>熟悉redux的人可能知道，redux是数据存储和管理的工具，但是想要在react中使用redux，并不能直接将store、action和react组件建立连接，所以就需要react-redux来结合react和redux。</p>
<p>react-redux文件体积非常小，你完全不需要担心给你的项目带来太多的垃圾代码。</p>
<h4>从何处开始解析react-redux源码？</h4>
<p>1、在JavaScript中，读懂别人的代码文件，你首先应该看的是函数的入口。</p>
<p>2、找到函数入口，然后看有哪些参数。</p>
<p>3、看看导入了哪些额外的插件，每个插件的作用大概预测一下。</p>
<p>4、进入函数体进行解读。在react插件中解读函数有一个好处，就是react插件大部分都是采用了react组件的写法，你可以在react插件中看到很多react组件的影子。而不是像jQuery那样到处都是扩展性的方法，每个方法都有自己的设计模式，没有统一的规律可循。</p>
<h4>react-redux使用场景</h4>
<p>下面这个官方例子展示了mapStateToProps和mapDispatchToProps的使用方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> todoActionCreators <span class="hljs-keyword">from</span> <span class="hljs-string">'./todoActionCreators'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> counterActionCreators <span class="hljs-keyword">from</span> <span class="hljs-string">'./counterActionCreators'</span>
<span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">todos</span>: state.todos }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapDispatchToProps</span>(<span class="hljs-params">dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">todoActions</span>: bindActionCreators(todoActionCreators, dispatch),
    <span class="hljs-attr">counterActions</span>: bindActionCreators(counterActionCreators, dispatch)
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(TodoApp)
</code></pre>
<p>mergeProps的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  })
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import * as actionCreators <span class="hljs-keyword">from</span> './actionCreators'

function mapStateToProps(<span class="hljs-keyword">state</span>) {
  return { todos: <span class="hljs-keyword">state</span>.todos }
}

function mergeProps(<span class="hljs-keyword">state</span>Props, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: <span class="hljs-keyword">state</span>Props.todos[ownProps.<span class="hljs-keyword">user</span>Id],
    addTodo: (text) =&gt; dispatchProps.addTodo(ownProps.<span class="hljs-keyword">user</span>Id, text)
  })
}

export <span class="hljs-keyword">default</span> connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
</code></pre>
<h4>connect源码解析</h4>
<p><strong>源码有点长，你可以选择性的查看：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, createElement } from 'react'
import storeShape from '../utils/storeShape'
import shallowEqual from '../utils/shallowEqual'
import wrapActionCreators from '../utils/wrapActionCreators'
import warning from '../utils/warning'
import isPlainObject from 'lodash/isPlainObject'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

let errorObject = { value: null }
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx)
  } catch (e) {
    errorObject.value = e
    return errorObject
  }
}

// Helps track hot reloading.
let nextVersion = 0

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  const finalMergeProps = mergeProps || defaultMergeProps
  const { pure = true, withRef = false } = options
  const checkMergedEquals = pure &amp;&amp; finalMergeProps !== defaultMergeProps

  // Helps track hot reloading.
  const version = nextVersion++

  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    function checkStateShape(props, methodName) {
      if (!isPlainObject(props)) {
        warning(
          `${methodName}() in ${connectDisplayName} must return a plain object. ` +
          `Instead received ${props}.`
        )
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps')
      }
      return mergedProps
    }

    class Connect extends Component {
      shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      constructor(props, context) {
        super(props, context)
        this.version = version
        this.store = props.store || context.store

        invariant(this.store,
          `Could not find &quot;store&quot; in either the context or ` +
          `props of &quot;${connectDisplayName}&quot;. ` +
          `Either wrap the root component in a <Provider>, ` +
          `or explicitly pass &quot;store&quot; as a prop to &quot;${connectDisplayName}&quot;.`
        )

        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }

      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }

        const state = store.getState()
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'

        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1

        if (isFactory) {
          return this.computeStateProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }

      computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props)
        }

        const { dispatch } = store
        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?
          this.finalMapDispatchToProps(dispatch, props) :
          this.finalMapDispatchToProps(dispatch)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps')
        }
        return dispatchProps
      }

      configureFinalMapDispatch(store, props) {
        const mappedDispatch = mapDispatch(store.dispatch, props)
        const isFactory = typeof mappedDispatch === 'function'

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1

        if (isFactory) {
          return this.computeDispatchProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps')
        }
        return mappedDispatch
      }

      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props)
        if (this.stateProps &amp;&amp; shallowEqual(nextStateProps, this.stateProps)) {
          return false
        }

        this.stateProps = nextStateProps
        return true
      }

      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)
        if (this.dispatchProps &amp;&amp; shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false
        }

        this.dispatchProps = nextDispatchProps
        return true
      }

      updateMergedPropsIfNeeded() {
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps &amp;&amp; checkMergedEquals &amp;&amp; shallowEqual(nextMergedProps, this.mergedProps)) {
          return false
        }

        this.mergedProps = nextMergedProps
        return true
      }

      isSubscribed() {
        return typeof this.unsubscribe === 'function'
      }

      trySubscribe() {
        if (shouldSubscribe &amp;&amp; !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

      componentDidMount() {
        this.trySubscribe()
      }

      componentWillReceiveProps(nextProps) {
        if (!pure || !shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      clearCache() {
        this.dispatchProps = null
        this.stateProps = null
        this.mergedProps = null
        this.haveOwnPropsChanged = true
        this.hasStoreStateChanged = true
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null
        this.renderedElement = null
        this.finalMapDispatchToProps = null
        this.finalMapStateToProps = null
      }

      handleChange() {
        if (!this.unsubscribe) {
          return
        }

        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        if (pure &amp;&amp; prevStoreState === storeState) {
          return
        }

        if (pure &amp;&amp; !this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
          if (!haveStatePropsChanged) {
            return
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value
          }
          this.haveStatePropsBeenPrecalculated = true
        }

        this.hasStoreStateChanged = true
        this.setState({ storeState })
      }

      getWrappedInstance() {
        invariant(withRef,
          `To access the wrapped instance, you need to specify ` +
          `{ withRef: true } as the fourth argument of the connect() call.`
        )

        return this.refs.wrappedInstance
      }

      render() {
        const {
          haveOwnPropsChanged,
          hasStoreStateChanged,
          haveStatePropsBeenPrecalculated,
          statePropsPrecalculationError,
          renderedElement
        } = this

        this.haveOwnPropsChanged = false
        this.hasStoreStateChanged = false
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError
        }

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure &amp;&amp; renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
        }

        let haveStatePropsChanged = false
        let haveDispatchPropsChanged = false
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded()
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
        }

        let haveMergedPropsChanged = true
        if (
          haveStatePropsChanged ||
          haveDispatchPropsChanged ||
          haveOwnPropsChanged
        ) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
        } else {
          haveMergedPropsChanged = false
        }

        if (!haveMergedPropsChanged &amp;&amp; renderedElement) {
          return renderedElement
        }

        if (withRef) {
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
      }
    }

    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: storeShape
    }
    Connect.propTypes = {
      store: storeShape
    }

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return
        }

        // We are hot reloading!
        this.version = version
        this.trySubscribe()
        this.clearCache()
      }
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>import { Component, createElement } from 'react'
import storeShape from '../utils/storeShape'
import shallowEqual from '../utils/shallowEqual'
import wrapActionCreators from '../utils/wrapActionCreators'
import warning from '../utils/warning'
import isPlainObject from 'lodash/isPlainObject'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'

const defaultMapStateToProps = state =&gt; ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch =&gt; ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) =&gt; ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

let errorObject = { value: null }
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx)
  } catch (e) {
    errorObject.value = e
    return errorObject
  }
}

// Helps track hot reloading.
let nextVersion = 0

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  const finalMergeProps = mergeProps || defaultMergeProps
  const { pure = true, withRef = false } = options
  const checkMergedEquals = pure &amp;&amp; finalMergeProps !== defaultMergeProps

  // Helps track hot reloading.
  const version = nextVersion++

  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    function checkStateShape(props, methodName) {
      if (!isPlainObject(props)) {
        warning(
          `${methodName}() in ${connectDisplayName} must return a plain object. ` +
          `Instead received ${props}.`
        )
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps')
      }
      return mergedProps
    }

    class Connect extends Component {
      shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      constructor(props, context) {
        super(props, context)
        this.version = version
        this.store = props.store || context.store

        invariant(this.store,
          `Could not find "store" in either the context or ` +
          `props of "${connectDisplayName}". ` +
          `Either wrap the root component in a &lt;Provider&gt;, ` +
          `or explicitly pass "store" as a prop to "${connectDisplayName}".`
        )

        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }

      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }

        const state = store.getState()
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'

        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1

        if (isFactory) {
          return this.computeStateProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }

      computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props)
        }

        const { dispatch } = store
        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?
          this.finalMapDispatchToProps(dispatch, props) :
          this.finalMapDispatchToProps(dispatch)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps')
        }
        return dispatchProps
      }

      configureFinalMapDispatch(store, props) {
        const mappedDispatch = mapDispatch(store.dispatch, props)
        const isFactory = typeof mappedDispatch === 'function'

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1

        if (isFactory) {
          return this.computeDispatchProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps')
        }
        return mappedDispatch
      }

      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props)
        if (this.stateProps &amp;&amp; shallowEqual(nextStateProps, this.stateProps)) {
          return false
        }

        this.stateProps = nextStateProps
        return true
      }

      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)
        if (this.dispatchProps &amp;&amp; shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false
        }

        this.dispatchProps = nextDispatchProps
        return true
      }

      updateMergedPropsIfNeeded() {
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps &amp;&amp; checkMergedEquals &amp;&amp; shallowEqual(nextMergedProps, this.mergedProps)) {
          return false
        }

        this.mergedProps = nextMergedProps
        return true
      }

      isSubscribed() {
        return typeof this.unsubscribe === 'function'
      }

      trySubscribe() {
        if (shouldSubscribe &amp;&amp; !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

      componentDidMount() {
        this.trySubscribe()
      }

      componentWillReceiveProps(nextProps) {
        if (!pure || !shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      clearCache() {
        this.dispatchProps = null
        this.stateProps = null
        this.mergedProps = null
        this.haveOwnPropsChanged = true
        this.hasStoreStateChanged = true
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null
        this.renderedElement = null
        this.finalMapDispatchToProps = null
        this.finalMapStateToProps = null
      }

      handleChange() {
        if (!this.unsubscribe) {
          return
        }

        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        if (pure &amp;&amp; prevStoreState === storeState) {
          return
        }

        if (pure &amp;&amp; !this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
          if (!haveStatePropsChanged) {
            return
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value
          }
          this.haveStatePropsBeenPrecalculated = true
        }

        this.hasStoreStateChanged = true
        this.setState({ storeState })
      }

      getWrappedInstance() {
        invariant(withRef,
          `To access the wrapped instance, you need to specify ` +
          `{ withRef: true } as the fourth argument of the connect() call.`
        )

        return this.refs.wrappedInstance
      }

      render() {
        const {
          haveOwnPropsChanged,
          hasStoreStateChanged,
          haveStatePropsBeenPrecalculated,
          statePropsPrecalculationError,
          renderedElement
        } = this

        this.haveOwnPropsChanged = false
        this.hasStoreStateChanged = false
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError
        }

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure &amp;&amp; renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
        }

        let haveStatePropsChanged = false
        let haveDispatchPropsChanged = false
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded()
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
        }

        let haveMergedPropsChanged = true
        if (
          haveStatePropsChanged ||
          haveDispatchPropsChanged ||
          haveOwnPropsChanged
        ) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
        } else {
          haveMergedPropsChanged = false
        }

        if (!haveMergedPropsChanged &amp;&amp; renderedElement) {
          return renderedElement
        }

        if (withRef) {
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
      }
    }

    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: storeShape
    }
    Connect.propTypes = {
      store: storeShape
    }

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return
        }

        // We are hot reloading!
        this.version = version
        this.trySubscribe()
        this.clearCache()
      }
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}
</code></pre>
<p>我们按照上面介绍的解析步骤来一步步有序的分析源码。</p>
<p><strong>1、查看函数入口，以及需要传入的参数。</strong></p>
<p>如果只是看这样一个函数体，我们无法得知每个参数到底是什么？有什么作用？但是，我们可以先结合使用的demo初步了解各个参数的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params">mapStateToProps, mapDispatchToProps, mergeProps, options = {}</span>) </span>{}
</code></pre>
<p><strong>mapStateToProps</strong>：传入所有state，返回指定的state数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapStateToProps(state) {
      return { todos: state.todos }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function mapStateToProps(<span class="hljs-keyword">state</span>) {
      return { todos: <span class="hljs-keyword">state</span>.todos }
    }
</code></pre>
<p><strong>mapDispatchToProps</strong>：传入dispatch，返回使用bindActionCreators()绑定的action方法。我们不再这里讨论bindActionCreators的用法，这个知识将会放到redux解析的文章中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">mapDispatchToProps</span>(dispatch) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">bindActionCreators(Object.assign({},</span> todoActionCreators, counterActionCreators), dispatch)
}
</code></pre>
<p><strong>mergeProps</strong>：mergeProps如果不指定，则默认返回 Object.assign({}, ownProps, stateProps, dispatchProps)，顾名思义，mergeProps是合并的意思，将state合并后传递给组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function mergeProps(<span class="hljs-keyword">state</span>Props, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: <span class="hljs-keyword">state</span>Props.todos[ownProps.<span class="hljs-keyword">user</span>Id],
    addTodo: (text) =&gt; dispatchProps.addTodo(ownProps.<span class="hljs-keyword">user</span>Id, text)
  })
}
</code></pre>
<p><strong>options</strong>：通过配置项可以更加详细的定义connect的行为，通常只需要执行默认值。</p>
<p><strong>2、查看导入了哪些插件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, createElement } from 'react'
import storeShape from '../utils/storeShape'
import shallowEqual from '../utils/shallowEqual'
import wrapActionCreators from '../utils/wrapActionCreators'
import warning from '../utils/warning'
import isPlainObject from 'lodash/isPlainObject'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { Component, createElement } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> storeShape <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/storeShape'</span>
<span class="hljs-keyword">import</span> shallowEqual <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/shallowEqual'</span>
<span class="hljs-keyword">import</span> wrapActionCreators <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/wrapActionCreators'</span>
<span class="hljs-keyword">import</span> warning <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/warning'</span>
<span class="hljs-keyword">import</span> isPlainObject <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/isPlainObject'</span>
<span class="hljs-keyword">import</span> hoistStatics <span class="hljs-keyword">from</span> <span class="hljs-string">'hoist-non-react-statics'</span>
<span class="hljs-keyword">import</span> invariant <span class="hljs-keyword">from</span> <span class="hljs-string">'invariant'</span>
</code></pre>
<p><strong>react</strong>：使用到了react组件，那么我们可以猜测connect和Provider类似，需要创建一个Connect组件。</p>
<p><strong>storeShape</strong>：通过了redux常用API的类型验证。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import PropTypes from 'prop-types'
export default PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import PropTypes from <span class="hljs-string">'prop-types'</span>
export default PropTypes.shape({
  subscribe: PropTypes<span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>,
  dispatch: PropTypes<span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>,
  getState: PropTypes<span class="hljs-selector-class">.func</span><span class="hljs-selector-class">.isRequired</span>
})
</code></pre>
<p><strong>shallowEqual</strong>：这个文件的作用是传入2个对象，首先比较对象是否一致，如果一致，则返回true，如果不一致，则获取2个对象的key数组，判断2个对象key数组的长度是否相等，如果不相等，返回false，如果相等，最后用for循环遍历A对象的key，如果当前的遍历值不存在于B的key中或者A对象的当前key的value不等于B对象的当前key的value，则返回false，如果不属于上面的任何情况，则返回true。（如果认为我这段讲的迷迷糊糊，你也可以自己理解下面的代码。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  // 测试A对象的key和B对象的key不一致
  const hasOwn = Object.prototype.hasOwnProperty
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }
  return true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowEqual</span>(<span class="hljs-params">objA, objB</span>) </span>{
  <span class="hljs-keyword">if</span> (objA === objB) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">const</span> keysA = <span class="hljs-built_in">Object</span>.keys(objA)
  <span class="hljs-keyword">const</span> keysB = <span class="hljs-built_in">Object</span>.keys(objB)
  <span class="hljs-keyword">if</span> (keysA.length !== keysB.length) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  <span class="hljs-comment">// 测试A对象的key和B对象的key不一致</span>
  <span class="hljs-keyword">const</span> hasOwn = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keysA.length; i++) {
    <span class="hljs-keyword">if</span> (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
}
</code></pre>
<p>hasOwn的作用是判断对象里面是否包含某个属性。这段代码的实际用途是判断下一个props和当前的props是否一致。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shallowEqual(nextStateProps, this.stateProps)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>shallowEqual(nextStateProps, this.<span class="hljs-keyword">state</span>Props)
</code></pre>
<p><strong>wrapActionCreators</strong>：实现了bindActionCreators方法绑定action到组件的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { bindActionCreators } from 'redux'

export default function wrapActionCreators(actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapActionCreators</span>(<span class="hljs-params">actionCreators</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> bindActionCreators(actionCreators, dispatch)
}
</code></pre>
<p>函数使用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wrapActionCreators(mapDispatchToProps)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">wrapActionCreators</span><span class="hljs-params">(mapDispatchToProps)</span></span>
</code></pre>
<p><strong>warning</strong>：在控制台打印warning信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function warning(message) {
  if (typeof console !== 'undefined' &amp;&amp; typeof console.error === 'function') {
    console.error(message)
  }
  try {
    throw new Error(message)
  } catch (e) {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">warning</span>(<span class="hljs-params">message</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span>.error === <span class="hljs-string">'function'</span>) {
    <span class="hljs-built_in">console</span>.error(message)
  }
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message)
  } <span class="hljs-keyword">catch</span> (e) {}
}
</code></pre>
<p><strong>lodash/isPlainObject</strong>：检查传入的值是不是纯对象，如果是，返回true，否则返回false。方法详情查看 <a href="http://lodashjs.com/docs/#_isplainobjectvalue" rel="nofollow noreferrer" target="_blank">lodash之isPlainObject</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') &amp;&amp; proto.constructor;
  return typeof Ctor == 'function' &amp;&amp; Ctor instanceof Ctor &amp;&amp;
    funcToString.call(Ctor) == objectCtorString;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">function <span class="hljs-title">isPlainObject</span>(<span class="hljs-params"><span class="hljs-keyword">value</span></span>) </span>{
  <span class="hljs-keyword">if</span> (!isObjectLike(<span class="hljs-keyword">value</span>) || baseGetTag(<span class="hljs-keyword">value</span>) != objectTag) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">var</span> proto = getPrototype(<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">if</span> (proto === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">var</span> Ctor = hasOwnProperty.call(proto, <span class="hljs-string">'constructor'</span>) &amp;&amp; proto.constructor;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> Ctor == <span class="hljs-string">'function'</span> &amp;&amp; Ctor instanceof Ctor &amp;&amp;
    funcToString.call(Ctor) == objectCtorString;
}
</code></pre>
<p><strong>hoist-non-react-statics</strong>：这段代码有点神奇，<strong>REACT_STATICS</strong>是一堆react的常用方法，<strong>KNOWN_STATICS</strong>是函数的一些属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};
var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] &amp;&amp; !KNOWN_STATICS[keys[i]] &amp;&amp; (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">REACT_STATICS</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    childContextTypes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    contextTypes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    defaultProps:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    displayName:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    getDefaultProps:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    mixins:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    propTypes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    type:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">};</span>
<span class="hljs-string">var</span> <span class="hljs-string">KNOWN_STATICS</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    length:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    prototype:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    caller:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arguments:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    arity:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">};</span>
<span class="hljs-string">var</span> <span class="hljs-string">isGetOwnPropertySymbolsAvailable</span> <span class="hljs-string">=</span> <span class="hljs-string">typeof</span> <span class="hljs-string">Object.getOwnPropertySymbols</span> <span class="hljs-string">===</span> <span class="hljs-string">'function'</span><span class="hljs-string">;</span>

<span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">function</span> <span class="hljs-string">hoistNonReactStatics(targetComponent,</span> <span class="hljs-string">sourceComponent,</span> <span class="hljs-string">customStatics)</span> <span class="hljs-string">{</span>
    <span class="hljs-string">if</span> <span class="hljs-string">(typeof</span> <span class="hljs-string">sourceComponent</span> <span class="hljs-string">!==</span> <span class="hljs-string">'string'</span><span class="hljs-string">)</span> <span class="hljs-string">{</span> <span class="hljs-string">//</span> <span class="hljs-string">don't</span> <span class="hljs-string">hoist</span> <span class="hljs-string">over</span> <span class="hljs-string">string</span> <span class="hljs-string">(html)</span> <span class="hljs-string">components</span>
        <span class="hljs-string">var</span> <span class="hljs-string">keys</span> <span class="hljs-string">=</span> <span class="hljs-string">Object.getOwnPropertyNames(sourceComponent);</span>
        <span class="hljs-string">if</span> <span class="hljs-string">(isGetOwnPropertySymbolsAvailable)</span> <span class="hljs-string">{</span>
            <span class="hljs-string">keys</span> <span class="hljs-string">=</span> <span class="hljs-string">keys.concat(Object.getOwnPropertySymbols(sourceComponent));</span>
        <span class="hljs-string">}</span>

        <span class="hljs-string">for</span> <span class="hljs-string">(var</span> <span class="hljs-string">i</span> <span class="hljs-string">=</span> <span class="hljs-number">0</span><span class="hljs-string">;</span> <span class="hljs-string">i</span> <span class="hljs-string">&lt;</span> <span class="hljs-string">keys.length;</span> <span class="hljs-string">++i)</span> <span class="hljs-string">{</span>
            <span class="hljs-string">if</span> <span class="hljs-string">(!REACT_STATICS[keys[i]]</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">!KNOWN_STATICS[keys[i]]</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">(!customStatics</span> <span class="hljs-string">||</span> <span class="hljs-string">!customStatics[keys[i]]))</span> <span class="hljs-string">{</span>
                <span class="hljs-string">try</span> <span class="hljs-string">{</span>
                    <span class="hljs-string">targetComponent[keys[i]]</span> <span class="hljs-string">=</span> <span class="hljs-string">sourceComponent[keys[i]];</span>
                <span class="hljs-string">}</span> <span class="hljs-string">catch</span> <span class="hljs-string">(error)</span> <span class="hljs-string">{</span>

                <span class="hljs-string">}</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>

    <span class="hljs-string">return</span> <span class="hljs-string">targetComponent;</span>
<span class="hljs-string">};</span>
</code></pre>
<p>我们首先从函数入口解读，入口传入了3个参数，<strong>targetComponent</strong>, <strong>sourceComponent</strong>, <strong>customStatics</strong>，首先判断sourceComponent的类型不是一个字符串，然后使用getOwnPropertyNames获取sourceComponent对象的key，返回值是key组成的数组keys。接着判断isGetOwnPropertySymbolsAvailable（肯定是true），如果为true，执行下面的语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-attribute">keys</span> = keys.concat(Object.getOwnPropertySymbols(sourceComponent))<span class="hljs-comment">;</span>
</code></pre>
<p>getOwnPropertySymbols和getOwnPropertyNames作用类似，但是<strong>getOwnPropertyNames只是返回字符串类型的key</strong>，而<strong>getOwnPropertySymbols可以返回Symbol类型的key</strong>。然后我们再把2种情况下的key拼接到一个数组里面返回新的keys。</p>
<p>然后执行for语句，遍历keys，如果不包含REACT_STATICS中的react的静态方法，同时不包含KNOWN_STATICS中的属性，同时不存在customStatics（传入函数的第三个参数不存在）或者存在但没有sourceComponent的key，就执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//将sourceComponent的方法写入targetComponent中
targetComponent[keys[i]] = sourceComponent[keys[i]];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code>//将sourceComponent的方法写入targetComponent中
targetComponent<span class="hljs-comment">[keys<span class="hljs-comment">[i]</span>]</span> = sourceComponent<span class="hljs-comment">[keys<span class="hljs-comment">[i]</span>]</span>;
</code></pre>
<p>最后返回targetComponent：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return targetComponent
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">return</span> targetComponent
</code></pre>
<p>该方法在connect中的实际作用是：将WrappedComponent内的react静态方法绑定到Connect组件上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hoistStatics(Connect, WrappedComponent)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">hoistStatics</span><span class="hljs-params">(Connect, WrappedComponent)</span></span>
</code></pre>
<p><strong>invariant</strong>：我们看到invariant传入了好几个参数，第一个if语句表示如果不是生产环境，并且format没有定义，就抛出异常。第二个if表示如果condition未定义，同时format未定义，就抛出error，如果condition不存在但format存在，抛出另外的错误。（总结就是一个错误检查机制）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }

};

module.exports = invariant;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> NODE_ENV = process.env.NODE_ENV;

<span class="hljs-keyword">var</span> invariant = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">condition, format, a, b, c, d, e, f</span>) </span>{
  <span class="hljs-keyword">if</span> (NODE_ENV !== <span class="hljs-string">'production'</span>) {
    <span class="hljs-keyword">if</span> (format === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'invariant requires an error message argument'</span>);
    }
  }

  <span class="hljs-keyword">if</span> (!condition) {
    <span class="hljs-keyword">var</span> error;
    <span class="hljs-keyword">if</span> (format === <span class="hljs-literal">undefined</span>) {
      error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">'Minified exception occurred; use the non-minified dev environment '</span> +
        <span class="hljs-string">'for the full error message and additional helpful warnings.'</span>
      );
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> args = [a, b, c, d, e, f];
      <span class="hljs-keyword">var</span> argIndex = <span class="hljs-number">0</span>;
      error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        format.replace(<span class="hljs-regexp">/%s/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> args[argIndex++]; })
      );
      error.name = <span class="hljs-string">'Invariant Violation'</span>;
    }

    error.framesToPop = <span class="hljs-number">1</span>; <span class="hljs-comment">// we don't care about invariant's own frame</span>
    <span class="hljs-keyword">throw</span> error;
  }

};

<span class="hljs-built_in">module</span>.exports = invariant;
</code></pre>
<p>该方法实际用途：检查store是否存在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="invariant(this.store,
          `Could not find &quot;store&quot; in either the context or ` +
          `props of &quot;${connectDisplayName}&quot;. ` +
          `Either wrap the root component in a <Provider>, ` +
          `or explicitly pass &quot;store&quot; as a prop to &quot;${connectDisplayName}&quot;.`
        )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>invariant(this.store,
          `Could <span class="hljs-keyword">not</span> find <span class="hljs-string">"store"</span> <span class="hljs-keyword">in</span> either <span class="hljs-keyword">the</span> context <span class="hljs-keyword">or</span> ` +
          `props <span class="hljs-keyword">of</span> <span class="hljs-string">"${connectDisplayName}"</span>. ` +
          `Either <span class="hljs-keyword">wrap</span> <span class="hljs-keyword">the</span> root component <span class="hljs-keyword">in</span> <span class="hljs-keyword">a</span> &lt;Provider&gt;, ` +
          `<span class="hljs-keyword">or</span> explicitly pass <span class="hljs-string">"store"</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">a</span> prop <span class="hljs-built_in">to</span> <span class="hljs-string">"${connectDisplayName}"</span>.`
        )
</code></pre>
<p><strong>3、定义几个参数默认值常量</strong></p>
<p>当你没有给组件绑定state和dispatch的时候，就执行默认的配置。</p>
<p><strong>defaultMapStateToProps</strong>：传入state，返回空对象</p>
<p><strong>defaultMapDispatchToProps</strong>： 传入dispatch，返回dispatch对象</p>
<p><strong>defaultMergeProps</strong>：传入stateProps, dispatchProps, parentProps，返回当前传入的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultMapStateToProps = state => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">default</span>MapStateToProps = <span class="hljs-keyword">state</span> =&gt; ({})
const <span class="hljs-keyword">default</span>MapDispatchToProps = dispatch =&gt; ({ dispatch })
const <span class="hljs-keyword">default</span>MergeProps = (<span class="hljs-keyword">state</span>Props, dispatchProps, parentProps) =&gt; ({
  ...parentProps,
  ...<span class="hljs-keyword">state</span>Props,
  ...dispatchProps
})
</code></pre>
<p><strong>4、getDisplayName方法</strong></p>
<p>返回当前传入的组件名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">getDisplayName</span>(WrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">WrappedComponent.displayName</span> || WrappedComponent.name || <span class="hljs-symbol">'Component</span>'
}
</code></pre>
<p><strong>5、tryCatch方法</strong><br>给fn函数指定上下文。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let errorObject = { value: null }
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx)
  } catch (e) {
    errorObject.value = e
    return errorObject
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">let</span> errorObject = { <span class="hljs-keyword">value</span>: <span class="hljs-literal">null</span> }
<span class="hljs-function">function <span class="hljs-title">tryCatch</span>(<span class="hljs-params">fn, ctx</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">return</span> fn.apply(ctx)
  } <span class="hljs-keyword">catch</span> (e) {
    errorObject.<span class="hljs-keyword">value</span> = e
    <span class="hljs-keyword">return</span> errorObject
  }
}
</code></pre>
<p>使用场景：在connect内调用tryCatch给updateStatePropsIfNeeded方法指定当前的上下文</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tryCatch(this.updateStatePropsIfNeeded, this)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>tryCatch(<span class="hljs-keyword">this</span>.updateStatePropsIfNeeded, <span class="hljs-keyword">this</span>)
</code></pre>
<p>如果你不明白上面的代码，可以看下面比较简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let b = {
  a: 1,
  e: function() {
    console.log(this.a)
  },
  c: function() {
    tryCatch(this.e, this)
  }
}

b.c() // 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> b = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">e</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
  },
  <span class="hljs-attr">c</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    tryCatch(<span class="hljs-keyword">this</span>.e, <span class="hljs-keyword">this</span>)
  }
}

b.c() <span class="hljs-comment">// 1</span>
</code></pre>
<p><strong>6、connect函数解析思路</strong><br>connect函数是核心，我们需要大概了解函数做的事情，才能更好的读懂源码。<br>既然是函数，那就有返回值，connect()返回值是Connect组件（请注意大小写的区别）。</p>
<p>通俗点理解，使用connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据。<br>常看到下面这种写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default connect(mapStateToProps)(TodoApp)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">export</span> <span class="hljs-keyword">default</span> connect(<span class="hljs-title">mapStateToProps</span>)(<span class="hljs-type">TodoApp</span>)
</code></pre>
<p>我把connect的核心实现简化提取出来，是下面这种形式：WrappedComponent参数对应的就是TodoApp。函数最终返回的是将state和dispatch绑定到Connect之后的新组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funtion connect(mapStateToProps) {
    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
        
        }
        return hoistStatics(Connect, WrappedComponent)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>funtion connect(mapStateToProps) {
    <span class="hljs-keyword">return</span> function wrapWithConnect(<span class="hljs-type">WrappedComponent</span>) {
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Connect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        
        }
        <span class="hljs-keyword">return</span> hoistStatics(<span class="hljs-type">Connect</span>, <span class="hljs-type">WrappedComponent</span>)
    }
}
</code></pre>
<p><strong>7、Connect组件执行</strong></p>
<p>既然已经知道connect函数返回的是Connect组件，而Connect组件继承于react，我们就可以按照react的生命周期来阅读代码。</p>
<p><strong>Connect组件方法组成：</strong>方法虽然很多，但是我们只需要紧跟react生命周期函数去了解代码，而其他方法都是在生命周期函数中调用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Connect extends Component {
      shouldComponentUpdate() {}
      constructor(props, context) {}    
      computeStateProps(store, props) {}    
      configureFinalMapState(store, props) {}    
      computeDispatchProps(store, props) {}    
      configureFinalMapDispatch(store, props) {}    
      updateStatePropsIfNeeded() {}
      updateDispatchPropsIfNeeded() {}    
      updateMergedPropsIfNeeded() {}    
      isSubscribed() {}    
      trySubscribe() {}    
      tryUnsubscribe() {}    
      componentDidMount() {}    
      componentWillReceiveProps(nextProps) {}    
      componentWillUnmount() {}    
      clearCache() {}    
      handleChange() {}    
      getWrappedInstance() {}
      render() {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">class</span> Connect extends Component <span class="hljs-comment">{
      shouldComponentUpdate() {}</span>
      <span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props, context)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">computeStateProps</span><span class="hljs-params">(store, props)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">configureFinalMapState</span><span class="hljs-params">(store, props)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">computeDispatchProps</span><span class="hljs-params">(store, props)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">configureFinalMapDispatch</span><span class="hljs-params">(store, props)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">updateStatePropsIfNeeded</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>
      <span class="hljs-title">updateDispatchPropsIfNeeded</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">updateMergedPropsIfNeeded</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">isSubscribed</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">trySubscribe</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">tryUnsubscribe</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">componentWillReceiveProps</span><span class="hljs-params">(nextProps)</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">componentWillUnmount</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">clearCache</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">handleChange</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>    
      <span class="hljs-title">getWrappedInstance</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>
      <span class="hljs-title">render</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>
}
</span></code></pre>
<p>简单了解react生命周期的函数执行顺序：</p>
<p><strong>初次渲染</strong>：render =&gt; componentDidMount</p>
<p><strong>当state更新时</strong>：componentWillReceiveProps =&gt; shouldComponentUpdate =&gt; render</p>
<p><strong>render：</strong>进入Connect组件执行的时候，先进入render方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
        const {haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement} = this

        this.haveOwnPropsChanged = false
        this.hasStoreStateChanged = false
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError
        }

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure &amp;&amp; renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
        }

        let haveStatePropsChanged = false
        let haveDispatchPropsChanged = false
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded()
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
        }

        let haveMergedPropsChanged = true
        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
        } else {
          haveMergedPropsChanged = false
        }

        if (!haveMergedPropsChanged &amp;&amp; renderedElement) {
          return renderedElement
        }

        if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>render() {
        const {haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement} = <span class="hljs-keyword">this</span>

        <span class="hljs-keyword">this</span>.haveOwnPropsChanged = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.hasStoreStateChanged = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.haveStatePropsBeenPrecalculated = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.statePropsPrecalculationError = <span class="hljs-literal">null</span>

        <span class="hljs-keyword">if</span> (statePropsPrecalculationError) {
          <span class="hljs-keyword">throw</span> statePropsPrecalculationError
        }

        let shouldUpdateStateProps = <span class="hljs-literal">true</span>
        let shouldUpdateDispatchProps = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">if</span> (pure &amp;&amp; renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged &amp;&amp; <span class="hljs-keyword">this</span>.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged &amp;&amp; <span class="hljs-keyword">this</span>.doDispatchPropsDependOnOwnProps
        }

        let haveStatePropsChanged = <span class="hljs-literal">false</span>
        let haveDispatchPropsChanged = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">if</span> (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = <span class="hljs-literal">true</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (shouldUpdateStateProps) {
          haveStatePropsChanged = <span class="hljs-keyword">this</span>.updateStatePropsIfNeeded()
        }
        <span class="hljs-keyword">if</span> (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = <span class="hljs-keyword">this</span>.updateDispatchPropsIfNeeded()
        }

        let haveMergedPropsChanged = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">if</span> (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
          haveMergedPropsChanged = <span class="hljs-keyword">this</span>.updateMergedPropsIfNeeded()
        } <span class="hljs-keyword">else</span> {
          haveMergedPropsChanged = <span class="hljs-literal">false</span>
        }

        <span class="hljs-keyword">if</span> (!haveMergedPropsChanged &amp;&amp; renderedElement) {
          <span class="hljs-keyword">return</span> renderedElement
        }

        <span class="hljs-keyword">if</span> (withRef) {
          <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent, {
            ...<span class="hljs-keyword">this</span>.mergedProps,
            ref: <span class="hljs-string">'wrappedInstance'</span>
          })
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.renderedElement = createElement(WrappedComponent,
            <span class="hljs-keyword">this</span>.mergedProps
          )
        }
</code></pre>
<p><strong>a、首先定义了5个成员变量，在Connect组件内部的任意函数位置可以访问到this定义的成员变量。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement} = this

//上面的代码等于下面的写法，this指当前的组件对象。

//判断新传入的props和当前的是否相等，是bool值
var haveOwnPropsChanged = this.haveOwnPropsChanged; 
//当state更新时，改变hasStoreStateChanged的状态，是bool值
var hasStoreStateChanged = this.hasStoreStateChanged;
//表示state和props已经提前计算改变，也是bool值
var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
//如果state和props更新时出现错误，则抛出statePropsPrecalculationError异常
var statePropsPrecalculationError = this.statePropsPrecalculationError;
//将要渲染的react组件
var renderedElement = this.renderedElement;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const {haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, <span class="hljs-keyword">state</span>PropsPrecalculationError, renderedElement} = this

//上面的代码等于下面的写法，this指当前的组件对象。

//判断新传入的props和当前的是否相等，是bool值
var haveOwnPropsChanged = this.haveOwnPropsChanged; 
//当<span class="hljs-keyword">state</span>更新时，改变hasStoreStateChanged的状态，是bool值
var hasStoreStateChanged = this.hasStoreStateChanged;
//表示<span class="hljs-keyword">state</span>和props已经提前计算改变，也是bool值
var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
//如果<span class="hljs-keyword">state</span>和props更新时出现错误，则抛出<span class="hljs-keyword">state</span>PropsPrecalculationError异常
var <span class="hljs-keyword">state</span>PropsPrecalculationError = this.<span class="hljs-keyword">state</span>PropsPrecalculationError;
//将要渲染的react组件
var renderedElement = this.renderedElement;
</code></pre>
<p><strong>b、给成员变量设置默认值。</strong>默认值要么是false，要么是null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.haveOwnPropsChanged = false
this.hasStoreStateChanged = false
this.haveStatePropsBeenPrecalculated = false
this.statePropsPrecalculationError = null
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.haveOwnPropsChanged = <span class="hljs-literal">false</span>
<span class="hljs-keyword">this</span>.hasStoreStateChanged = <span class="hljs-literal">false</span>
<span class="hljs-keyword">this</span>.haveStatePropsBeenPrecalculated = <span class="hljs-literal">false</span>
<span class="hljs-keyword">this</span>.statePropsPrecalculationError = <span class="hljs-literal">null</span>
</code></pre>
<p><strong>c、抛出异常</strong>：初次渲染时，statePropsPrecalculationError为null，不会抛出异常，当执行state和props更新出现异常时，会抛出错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (statePropsPrecalculationError) {
      throw statePropsPrecalculationError
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>if (<span class="hljs-keyword">state</span>PropsPrecalculationError) {
      throw <span class="hljs-keyword">state</span>PropsPrecalculationError
}</code></pre>
<p>我们追踪到statePropsPrecalculationError的赋值是在handleChange()里面执行的，受到haveStatePropsChanged的结果影响。当haveStatePropsChanged出现错误时，就把报错内容赋值给statePropsPrecalculationError。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (haveStatePropsChanged === errorObject) {
      this.statePropsPrecalculationError = errorObject.value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>if (haveStatePropsChanged === errorObject) {
      this.<span class="hljs-keyword">state</span>PropsPrecalculationError = errorObject.value
}</code></pre>
<p><strong>d、定义shouldUpdateStateProps和shouldUpdateDispatchProps</strong>：默认为true前者表示默认允许更新state和props，后者表示默认允许更新dispatch。<br>pure：options的配置项，初始值为true。<br>shouldUpdateStateProps：我们看到 || 符号，只要左右2边满足一个为true，则返回true，如果2个都是false，则返回false。<br>shouldUpdateDispatchProps：同时满足haveOwnPropsChanged、doDispatchPropsDependOnOwnProps为true，则返回true，否则返回false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let shouldUpdateStateProps = true
    let shouldUpdateDispatchProps = true
    if (pure &amp;&amp; renderedElement) {
        shouldUpdateStateProps = hasStoreStateChanged ||
 (haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps)
        shouldUpdateDispatchProps = haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
     }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>    <span class="hljs-keyword">let</span> <span class="hljs-attr">shouldUpdateStateProps</span> = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">shouldUpdateDispatchProps</span> = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">if</span> (pure &amp;&amp; renderedElement) {
        <span class="hljs-attr">shouldUpdateStateProps</span> = hasStoreStateChanged ||
 (haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps)
        <span class="hljs-attr">shouldUpdateDispatchProps</span> = haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
     }
</code></pre>
<p><strong>e、上面几个步骤都是定义state和props的各种状态的变量，目的是为了判断render方法返回怎样的renderedElement。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//如果haveMergedPropsChanged为false，并且renderedElement不为null，则返回renderedElement
//这段代码在初次渲染是不会执行，只有在更新state和props的时候执行
if (!haveMergedPropsChanged &amp;&amp; renderedElement) {
    return renderedElement
}

//haveMergedPropsChanged由updateMergedPropsIfNeeded方法的返回值控制，如果mergedProps等于nextMergedProps，返回false，不相等则返回true，表示应该更新state和props
updateMergedPropsIfNeeded() {
    const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
    if (this.mergedProps &amp;&amp; checkMergedEquals &amp;&amp; shallowEqual(nextMergedProps, this.mergedProps)) {
      return false
    }

    this.mergedProps = nextMergedProps
    return true
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//如果haveMergedPropsChanged为false，并且renderedElement不为null，则返回renderedElement</span>
<span class="hljs-comment">//这段代码在初次渲染是不会执行，只有在更新state和props的时候执行</span>
<span class="hljs-keyword">if</span> (!haveMergedPropsChanged &amp;&amp; renderedElement) {
    <span class="hljs-keyword">return</span> renderedElement
}

<span class="hljs-comment">//haveMergedPropsChanged由updateMergedPropsIfNeeded方法的返回值控制，如果mergedProps等于nextMergedProps，返回false，不相等则返回true，表示应该更新state和props</span>
updateMergedPropsIfNeeded() {
    const nextMergedProps = computeMergedProps(<span class="hljs-keyword">this</span>.stateProps, <span class="hljs-keyword">this</span>.dispatchProps, <span class="hljs-keyword">this</span>.props)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.mergedProps &amp;&amp; checkMergedEquals &amp;&amp; shallowEqual(nextMergedProps, <span class="hljs-keyword">this</span>.mergedProps)) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">this</span>.mergedProps = nextMergedProps
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
</code></pre>
<p>初次进入组件最先渲染的返回值是下面这段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-keyword">if</span> (withRef) {
          this<span class="hljs-selector-class">.renderedElement</span> = createElement(WrappedComponent, {
            ..<span class="hljs-selector-class">.this</span><span class="hljs-selector-class">.mergedProps</span>,
            ref: <span class="hljs-string">'wrappedInstance'</span>
          })
        } <span class="hljs-keyword">else</span> {
          this<span class="hljs-selector-class">.renderedElement</span> = createElement(WrappedComponent,
            this<span class="hljs-selector-class">.mergedProps</span>
          )
        }</code></pre>
<p><strong>connect渲染结果</strong>：在你绑定的组件外层包裹了Connect组件，看下面的图你应该能更加清晰的了解connect做的事情。</p>
<p><span class="img-wrap"><img data-src="/img/bVQXkk?w=1744&amp;h=706" src="https://static.alili.tech/img/bVQXkk?w=1744&amp;h=706" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>componentWillReceiveProps</strong>：组件接收到新的state。如果pure为false，并且nextProps和this.props不相等，则设置this.haveOwnPropsChanged为true。</p>
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
<p><strong>shouldComponentUpdate()</strong>：判断组件是否允许更新。</p>
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
<p><strong>componentDidMount()：</strong>组件初次渲染完成，执行订阅更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
        this.trySubscribe()
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span></span> {
        this.trySubscribe()
      }
</code></pre>
<p><strong>componentWillUnmount()：</strong>组件卸载时恢复状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      clearCache() {
        this.dispatchProps = null
        this.stateProps = null
        this.mergedProps = null
        this.haveOwnPropsChanged = true
        this.hasStoreStateChanged = true
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null
        this.renderedElement = null
        this.finalMapDispatchToProps = null
        this.finalMapStateToProps = null
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    componentWillUnmount() {
        <span class="hljs-keyword">this</span>.tryUnsubscribe()
        <span class="hljs-keyword">this</span>.clearCache()
      }

      clearCache() {
        <span class="hljs-keyword">this</span>.dispatchProps = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.stateProps = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.mergedProps = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.haveOwnPropsChanged = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">this</span>.hasStoreStateChanged = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">this</span>.haveStatePropsBeenPrecalculated = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.statePropsPrecalculationError = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.renderedElement = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.finalMapDispatchToProps = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.finalMapStateToProps = <span class="hljs-literal">null</span>
      }
</code></pre>
<p><strong>8、总结</strong><br>如果看到这里，你还没有理清思路，那么可以看完总结再回过头去理解源码。</p>
<p>connect方法做的事情是将state和dispatch绑定到Connect组件的参数上，然后Connect组件将你当前的App组件封装起来，使得App组件可以通过props获取到父组件Connect传递的state和props。</p>
<p>这也就是为什么你可以在自己写的组件上面直接通过this.props访问到state和action。有的人是通过store去读取state和dispatch action，也是一样的道理。</p>
<p>从connect方法的实现，我们看到了非常多react组件的影子，生命周期，props传递，context上下文。</p>
<p><strong>对比Provider组件：</strong></p>
<p>Provider是顶层组件的作用，将store作为上下文提供给全局共享，而Connect组件是局部组件，将某个react组件包装起来，传递指定的state和props给该组件访问。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——react-redux之connect方法解析

## 原文链接
[https://segmentfault.com/a/1190000010188279](https://segmentfault.com/a/1190000010188279)


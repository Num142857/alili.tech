---
title: 'redux源码分析之一：createStore.js' 
date: 2018-12-29 2:30:10
hidden: true
slug: knqloqjypt
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎关注redux源码分析系列文章：<br><a href="https://segmentfault.com/a/1190000011468226">redux源码分析之一：createStore.js</a><br><a href="https://segmentfault.com/a/1190000011555477">redux源码分析之二：combineReducers.js</a><br><a href="https://segmentfault.com/a/1190000012169115">redux源码分析之三：bindActionCreators.js</a><br><a href="https://segmentfault.com/a/1190000016295375">redux源码分析之四：compose.js</a><br><a href="https://segmentfault.com/a/1190000016296209">redux源码分析之五：applyMiddleware</a></p>
<p>createStore.js是redux的核心文件，暴露了一个函数createStore，函数执行后返回一个对象，该对象包含了4个关键的方法：dispatch, subscribe, getState, replaceReducer，代码如下。</p>
<pre><code>export default function createStore(reducer, preloadedState, enhancer) {
    //中间代码略
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
      }
}</code></pre>
<h1>一、createStore函数的参数：</h1>
<ol>
<li>reducer：reducer是一个函数，该函数会返回一个全新的state，而state则保存了所有的数据</li>
<li>preloadedState：初始state</li>
<li>enhancer：这个参数特别有意思，如果该enhancer参数存在的话，会将当前的createStore函数作为参数传入enhancer函数，并且，enhancer执行之后得到一个新函数，该新函数其实就是一个加强版的createStore函数，新的函数会把之前的reducer和preloadeState作为参数传入并执行。这个enhancer参数为redux中间件提供了入口。</li>
</ol>
<h1>二、参数检查代码及异常处理：</h1>
<pre><code>//如果preloadedState没有传，但是enhancer参数传了，重置一下变量
if (typeof preloadedState === 'function' &amp;&amp; typeof enhancer === 'undefined')          
  {
    enhancer = preloadedState
    preloadedState = undefined
  }
//如果enhancer传了，但是不是函数，则报错提示，否则执行enhancer函数，
//并继续执行enhancer函数返回的加强版的createStore函数，
//参数reducer以及preloadeState和原createStore函数保持一致
if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }
//如果reducer不是函数，则报错
if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
}</code></pre>
<h1>三、定义的几个局部变量：</h1>
<pre><code>let currentReducer = reducer //保存了当前的reducer函数，该reducer函数可以被动态替换掉
let currentState = preloadedState //保存了当前的state数据
let currentListeners = [] //保存了当前注册的函数列表
let nextListeners = currentListeners
let isDispatching = false  //是否正在dispatch一个action</code></pre>
<p>最关键的是currentState变量，调用createStore之后，currentState变量保存了当前状态的所有数据</p>
<h1>四、定义了几个函数：</h1>
<pre><code>//确保nextListeners和currentListeners不是同一个引用
function ensureCanMutateNextListeners() {
  if (nextListeners === currentListeners) {
    //如果是同一个引用，则浅拷贝currentListeners到nextListeners
    nextListeners = currentListeners.slice()
  }
}</code></pre>
<pre><code>//getState函数，返回局部变量currentState，以获取当前状态
function getState() {
  return currentState
}</code></pre>
<pre><code>  //注册一个函数，将注册函数放入局部变量nextListeners数组里面
  //注册函数的返回值是一个注销函数，注销函数执行可以将刚刚添加进nextListeners的listener函数又删除掉。这里很有意思，外部必须在调用subscribe执行现场保存好unsubscribe函数，否则将无法注销一个函数
  function subscribe(listener) {
    //如果listener不是函数，直接报错
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true
    //确保nextListeners不是currentListeners，以保证修改的是nextListeners，而不是currentListeners
    ensureCanMutateNextListeners()
    //将监听函数放入监听函数列表尾部
    nextListeners.push(listener)

    //返回一个函数，该函数可以从监听函数列表中删除刚刚注册的监听函数
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }</code></pre>
<pre><code>  //触发action的函数：每次触发一个action，currentListeners中的所有函数都要执行一遍
  function dispatch(action) {
    //如果action不是普通的对象，直接报错
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    //如果action没有type属性，直接报错：说明action对象必须要包含type字段
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    //如果当前正在触发另外一个action，直接报错
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      //先将标志位置为true
      isDispatching = true
      //执行传入的reducer函数，该函数返回一个新的state对象，并赋值给currentState变量
      currentState = currentReducer(currentState, action)
    } finally {
      //reducer函数执行完成后，将isDispatching恢复成false，方便下次action的触发
      isDispatching = false
    }

    //每一次触发一个action，所有的监听函数都要全部重新执行一遍，
    //并且把上次得到的新的监听函数列表赋值成为当前的监听函数列表。这是一个懒操作，并不是在subscribe的时候就操作了，而是在dispatch的时候才操作
    const listeners = currentListeners = nextListeners
    for (let i = 0; i &lt; listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    //该dispatch函数的返回值是原来的action
    return action
  }</code></pre>
<pre><code>  //替换reducer函数：这个函数允许运行时动态替换最开始调用createStore函数时传入的reducer，并且替换掉reducer之后，重新dispatch一个action，得到全新的currentState对象
  function replaceReducer(nextReducer) {
    //如果nextReducer不是函数，直接报错
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    //把新的reducer赋值给当前的currentReducer变量，得到一个全新的currentReducer
    currentReducer = nextReducer
    // 触发一个初始action：
    // 1.这样就可以完成一次监听函数列表的全部调用
    // 2.可以得到一个全新的currentState；
    dispatch({type: ActionTypes.INIT})
  }</code></pre>
<pre><code>function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return {unsubscribe}
      },

      [$$observable]() {
        return this
      }
    }
  }</code></pre>
<h1>五、初始化:</h1>
<p>初始化很简单，一句代码，直接调用一次dispatch，就会执行所有的注册函数，并且执行reducer函数，生成初始化的state</p>
<pre><code>//马上内部调用一次初始化的操作，根据传入的reducer函数，preloadedState生成一个全新的currentState和全新的reducer
  dispatch({type: ActionTypes.INIT})</code></pre>
<p>总结一下就是：</p>
<ol>
<li>createStore函数定义了几个局部变量用于记录状态，主要包括currentState记录数据状态，currentListeners记录注册函数列表，currentReducer记录当前的reducer函数。</li>
<li>定义了几个函数用于修改上面的几个局部变量：主要包括getState函数用于获取currentState；replaceReducer用于替换currentReducer；subscribe用于修改currentListeners列表；dispatch用于触发currentReducer执行，生成新的currentState，并且，执行currentListeners列表中的每一个函数；</li>
</ol>
<p>完整解析请参考我的github：<a href="https://github.com/abczhijia/redux" rel="nofollow noreferrer">https://github.com/abczhijia/...</a>，如果对您有帮助，欢迎star，有任何问题也请指正。</p>
<p>（完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux源码分析之一：createStore.js

## 原文链接
[https://segmentfault.com/a/1190000011468226](https://segmentfault.com/a/1190000011468226)


---
title: '浅析Redux 的 store enhancer' 
date: 2018-12-19 2:30:07
hidden: true
slug: 1wyqsuqs5tvh
categories: [reprint]
---

{{< raw >}}

                    
<p>相信大家都知道Redux的middleware（中间件）的概念，Redux通过middleware可以完成发送异步action（网络请求）、打印action的日志等功能。相对而言，Redux的store enhancer的概念，很多人并不是很清楚。</p>
<h3 id="articleHeader0">1. 基本概念及使用</h3>
<p>Redux通过API createStore创建store，createStore的函数签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createStore(reducer, [preloadedState], [enhancer])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">createStore</span><span class="hljs-params">(reducer, [preloadedState], [enhancer])</span></span></code></pre>
<p>其中，第3个可选参数enhancer，就是指的store enhancer。</p>
<p>store enhancer，可以翻译成store的增强器，顾名思义，就是增强store的功能。一个store enhancer，实际上就是一个高阶函数，它的参数是创建store的函数（store creator），返回值是一个可以创建功能更加强大的store的函数(enhanced store creator)，这和React中的高阶组件的概念很相似。</p>
<p>store enhancer 函数的结构一般如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function enhancerCreator() {
  return createStore => (...args) => {
    // do something based old store
    // return a new enhanced store
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enhancerCreator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">createStore</span> =&gt;</span> (...args) =&gt; {
    <span class="hljs-comment">// do something based old store</span>
    <span class="hljs-comment">// return a new enhanced store</span>
  }
}</code></pre>
<p>注意，enhancerCreator是用于创建store enhancer 的函数，也就是说enhancerCreator的执行结果才是一个store enhancer。（…args） 参数代表创建store所需的参数，也就是createStore接收的参数，实际上就是（reducer, [preloadedState], [enhancer]）。</p>
<p>现在，我们来创建一个store enhancer，用于输出发送的action的信息和state的变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// autoLogger.js
// store enhancer
export default function autoLogger() {
  return createStore => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer)
    function dispatch(action) {
      console.log(`dispatch an action: ${JSON.stringify(action)}`);
      const res = store.dispatch(action);
      const newState = store.getState();
      console.log(`current state: ${JSON.stringify(newState)}`);
      return res;
    }
    return {...store, dispatch}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// autoLogger.js</span>
<span class="hljs-comment">// store enhancer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autoLogger</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">createStore</span> =&gt;</span> (reducer, initialState, enhancer) =&gt; {
    <span class="hljs-keyword">const</span> store = createStore(reducer, initialState, enhancer)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`dispatch an action: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(action)}</span>`</span>);
      <span class="hljs-keyword">const</span> res = store.dispatch(action);
      <span class="hljs-keyword">const</span> newState = store.getState();
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`current state: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(newState)}</span>`</span>);
      <span class="hljs-keyword">return</span> res;
    }
    <span class="hljs-keyword">return</span> {...store, dispatch}
  }
}</code></pre>
<p>autoLogger() 改变了store dispatch的默认行为，在每次发送action前后，都会输出日志信息。然后在创建store上，使用autoLogger()这个store enhancer:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// configureStore.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'path/to/reducers';
import autLogger from 'path/to/autoLogger';

const store = createStore(
  reducer，
  autoLogger()
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// configureStore.js</span>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/reducers'</span>;
<span class="hljs-keyword">import</span> autLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/autoLogger'</span>;

<span class="hljs-keyword">const</span> store = createStore(
  reducer，
  autoLogger()
);</code></pre>
<h3 id="articleHeader1">2. 与middleware （中间件）的关系</h3>
<p>如果你了解redux-logger这个redux middleware，是不是感觉autoLogger()的作用和它很相似呢？难道store enhancer 和 middleware 可以实现相同的功能？确实如此。实际上，middleware的实现函数applyMiddleware本身就是一个store enhancer，applyMiddleware源码示意如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 省略
    return {
      ...store,
      dispatch
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span><span class="hljs-params">(<span class="hljs-rest_arg">...middlewares</span>)</span> </span>{
  <span class="hljs-keyword">return</span> createStore =&gt; (...args) =&gt; {
    <span class="hljs-comment">// 省略</span>
    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    }
  }
}</code></pre>
<p>applyMiddleware的结构和前面提到的store enhancer的结构完全相同，applyMiddleware(...middlewares)的执行结果就是一个store enhancer。所以，可以用middleware实现的功能，当然也可以使用store enhancer 来实现了。从applyMiddleware(...middlewares)最终的返回结构{...store, dispatch}还可以推测出，applyMiddleware(...middlewares)这个store enhancer 主要用来修改store的dispatch方法，这也确实是middleware的作用：增强store的dispatch功能。middleware实际上是在applyMiddleware(...middlewares) 这个store enhancer之上的一层抽象，applyMiddleware(...middlewares) 传递给每一个middleware参数{getState, dispatch}，middleware对dispatch方法进行加强。</p>
<p>当同时使用applyMiddleware(...middlewares)和其他store enhancer时，往往可以先使用redux提供的compose函数，将这些store enhancer组合成一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// configureStore.js
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'path/to/reducers';
import autLogger from 'path/to/autoLogger';

const enhancer = compose(
  applyMiddleware(...middlewares),
  autLogger()
);

const store = createStore(
  reducer，
  enhancer
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// configureStore.js</span>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware, compose } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/reducers'</span>;
<span class="hljs-keyword">import</span> autLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/autoLogger'</span>;

<span class="hljs-keyword">const</span> enhancer = compose(
  applyMiddleware(...middlewares),
  autLogger()
);

<span class="hljs-keyword">const</span> store = createStore(
  reducer，
  enhancer
);</code></pre>
<p>经过compose组合后，所有的store enhancer会形成一个洋葱模型，compose中的第一个enhancer处于洋葱模型的最外层，最后一个enhancer处于洋葱模型的最内层，每当发送一个action，都会经过洋葱模型从外到内的每一层enhancer的处理，如下图所示。因为一般我们通过middleware处理异步action，为保证其他enhancer接收到的都是普通action，所以需要将applyMiddleware(...middlewares)作为第一个store enhancer 传给 compose，让所有的action先经过applyMiddleware(...middlewares)的处理。</p>
<p><span class="img-wrap"><img data-src="/img/bV1fYi?w=470&amp;h=449" src="https://static.alili.tech/img/bV1fYi?w=470&amp;h=449" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>​                                                    <br>applyMiddleware(…middlewares)将middleware限制为只可以增强store dispatch的功能，但这只是它自身的规范限制，对于其他store enhancer，你可以增强store中包含的任意方法的功能，如dispatch、subscribe、getState、replaceReducer等。毕竟，store只是一个包含一些函数的普通JavaScript对象，可以很容易的复制其中的方法，并增加新的功能。</p>
<p>我们再来看一个例子，<a href="https://github.com/elgerlambert/redux-localstorage" rel="nofollow noreferrer" target="_blank">redux-localstorage</a>， 这个store enhancer 用来自动将store中的state持久化到localStorage中。它的主要代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store enhancer
export default function persistState(paths, config) {
  // 一些功能选项配置

  return next => (reducer, initialState, enhancer) => {
    let persistedState
    let finalInitialState

    try {
      persistedState = deserialize(localStorage.getItem(key))
      finalInitialState = merge(initialState, persistedState)
    } catch (e) {
      console.warn('Failed to retrieve initialize state from localStorage:', e)
    }

    const store = next(reducer, finalInitialState, enhancer)
    const slicerFn = slicer(paths)
    
    // 主要代码
    store.subscribe(function () {
      const state = store.getState()
      const subset = slicerFn(state)

      try {
        localStorage.setItem(key, serialize(subset))
      } catch (e) {
        console.warn('Unable to persist state to localStorage:', e)
      }
    })

    return store
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// store enhancer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">persistState</span>(<span class="hljs-params">paths, config</span>) </span>{
  <span class="hljs-comment">// 一些功能选项配置</span>

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> (reducer, initialState, enhancer) =&gt; {
    <span class="hljs-keyword">let</span> persistedState
    <span class="hljs-keyword">let</span> finalInitialState

    <span class="hljs-keyword">try</span> {
      persistedState = deserialize(localStorage.getItem(key))
      finalInitialState = merge(initialState, persistedState)
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'Failed to retrieve initialize state from localStorage:'</span>, e)
    }

    <span class="hljs-keyword">const</span> store = next(reducer, finalInitialState, enhancer)
    <span class="hljs-keyword">const</span> slicerFn = slicer(paths)
    
    <span class="hljs-comment">// 主要代码</span>
    store.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">const</span> state = store.getState()
      <span class="hljs-keyword">const</span> subset = slicerFn(state)

      <span class="hljs-keyword">try</span> {
        localStorage.setItem(key, serialize(subset))
      } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'Unable to persist state to localStorage:'</span>, e)
      }
    })

    <span class="hljs-keyword">return</span> store
  }
}</code></pre>
<p>这个enhancer做的事情其实很简单，只是在创建store后，立即订阅了store的变化，当store中的state发生变化时，将state持久化到localStorage。</p>
<h3 id="articleHeader2">3. 破坏性enhancer</h3>
<p>因为store enhancer中，我们可以任意复制、改变store中的方法，所以在自定义store enhancer时，有可能会因为破坏了Redux的正常工作流，导致整个应用无法正常工作。下面就是一个破坏性enhancer的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function breakingEnhancer() {
  return createStore => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer)
    function dispatch(action) {
      console.log(`dispatch an action: ${JSON.stringify(action)}`);
      console.log(`current state: ${JSON.stringify(newState)}`);
      return res;
    }
    return {...store, dispatch}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">breakingEnhancer</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">createStore</span> =&gt;</span> (reducer, initialState, enhancer) =&gt; {
    <span class="hljs-keyword">const</span> store = createStore(reducer, initialState, enhancer)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`dispatch an action: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(action)}</span>`</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`current state: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(newState)}</span>`</span>);
      <span class="hljs-keyword">return</span> res;
    }
    <span class="hljs-keyword">return</span> {...store, dispatch}
  }
}</code></pre>
<p>这个例子重新创建了一个dispatch方法，但在新的dispatch方法中，并没有调用老的dispatch方法，将action发送出去，导致action无法正常发送，整个应用自然也就无法工作。所以，自定义store enhancer时，一定要注意，不要破坏了Redux的原有工作流。</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析Redux 的 store enhancer

## 原文链接
[https://segmentfault.com/a/1190000012653724](https://segmentfault.com/a/1190000012653724)


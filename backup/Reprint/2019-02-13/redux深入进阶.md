---
title: 'redux深入进阶' 
date: 2019-02-13 2:31:22
hidden: true
slug: 7xcqe6fv0ok
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>上一篇文章讲解了redux如何使用，本篇文章将进一步深入，从redux的源码入手，深入学习redux的中间件机制。<br>在这里我们会以一个<code>redux-thunk</code>中间件为例，逐步分解redux的中间机制如何操作，如何执行。</p></blockquote>
<p>闲话不多说，上代码。</p>
<h3 id="articleHeader0">如何加载中间件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(rootReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;

<span class="hljs-comment">// create a store that has redux-thunk middleware enabled</span>
<span class="hljs-keyword">const</span> createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

<span class="hljs-keyword">const</span> store = createStoreWithMiddleware(rootReducer);</code></pre>
<p>这里需要用到<code>redux</code>中提供的一个工具方法，叫做<code>applyMiddleware</code>,向该方法传入你想要使用的中间件，完了之后再传入<code>createStore</code>方法，<br>最终形成新的创建store的方法。</p>
<p>这显然是一个<strong>装饰器模式</strong>，通过不同的中间件对<code>createStore</code>方法进行修饰，最后形成新的<code>createStore</code>方法，那么创建的store就具有这些中间件的特性，<br>非常出色的设计，惊喜不仅在这，看了之后的代码你就更不得不佩服作者的代码设计能力。</p>
<p>瞬间觉得别人都是码神，而我就是码农有木有/(ㄒoㄒ)/~~</p>
<h3 id="articleHeader1">中间件加载机制的实现</h3>
<p>先来看<code>applyMiddleware</code>方法的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import compose from './compose';

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> compose <span class="hljs-keyword">from</span> <span class="hljs-string">'./compose'</span>;

<span class="hljs-comment">/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> (reducer, initialState) =&gt; {
    <span class="hljs-keyword">var</span> store = next(reducer, initialState);
    <span class="hljs-keyword">var</span> dispatch = store.dispatch;
    <span class="hljs-keyword">var</span> chain = [];

    <span class="hljs-keyword">var</span> middlewareAPI = {
      <span class="hljs-attr">getState</span>: store.getState,
      <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
    };
    chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    };
  };
}</code></pre>
<p>这就是redux里面这个方法的源码，其中还一半是注释有木有。。。本来以为肯定有百来行代码的<br>当然这里不得不说es6的特性提供了非常多的帮助，所以为了省力吧es6玩透还是灰常有必要的（更别说为了装X了(<em>^__^</em>) ）</p>
<p>从这里开始代码就有点绕了，我们逐行分析</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (next) => (reducer, initialState) => {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">next</span>) =&gt;</span> (reducer, initialState) =&gt; {...}</code></pre>
<p>整个<code>applyMiddleware</code>方法就是返回了一个方法，根据<code>applyMiddleware</code>方法的使用，我们可以知道<code>next</code>就是<code>createStore</code>方法，<br>因为最终我们要返回的是一个装饰过的<code>createStore</code>方法，那么接收的参数肯定是不会变，所以最终我们调用<code>createStoreWithMiddleware</code>方法其实就是调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (reducer, initialState) {
    var store = next(reducer, initialState); // next即为最初的createStore方法
    // ...以下省略
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reducer, initialState</span>) </span>{
    <span class="hljs-keyword">var</span> store = next(reducer, initialState); <span class="hljs-comment">// next即为最初的createStore方法</span>
    <span class="hljs-comment">// ...以下省略</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var store = next(reducer, initialState);
var dispatch = store.dispatch;
var chain = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> store = next(reducer, initialState);
<span class="hljs-keyword">var</span> dispatch = store.dispatch;
<span class="hljs-keyword">var</span> chain = [];</code></pre>
<p>这里没什么好讲的，首先创建了一个store，这个store就是最原始的通过<code>createStore</code>创建的store，后两行只是变量赋值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var middlewareAPI = {
  getState: store.getState,
  dispatch: (action) => dispatch(action)
};
chain = middlewares.map(middleware => middleware(middlewareAPI));
dispatch = compose(...chain)(store.dispatch);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> middlewareAPI = {
  <span class="hljs-attr">getState</span>: store.getState,
  <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
};
chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));
dispatch = compose(...chain)(store.dispatch);</code></pre>
<p>这里是关键，必须详细进行讲解。</p>
<p>首先，这边声明了一个<code>middlewareAPI</code>对象，这个对象包含两个方法：</p>
<ol>
<li><p>getState：store中的getState方法的引用</p></li>
<li><p>dispatch：对本身的dispatch方法进行一次封装</p></li>
</ol>
<p>然后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain = middlewares.map(middleware => middleware(middlewareAPI));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));</code></pre>
<p>我们来仔细看看这行代码，首先我们对所有的中间件进行一个map，map结果就是调用中间件方法，将<code>middlewareAPI</code>作为参数传入,<br>这里我们拿<code>redux-thunk</code>中间件举例，来看看一个中间件是长什么样子的，传入的参数又是用来干嘛的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkMiddleware</span>(<span class="hljs-params">{ dispatch, getState }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt;
    <span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span> ?
      action(dispatch, getState) :
      next(action);
}</code></pre>
<p><code>redux-thunk</code>的功能是让action支持异步，让我们可以在action中跟服务器进行交互等操作，而他的实现。。。(⊙﹏⊙)b是的，又是这么几行代码。</p>
<p>我们回顾之前的代码，在map所有中间件的时候我们调用了<code>thunkMiddleware</code>方法，传入两个方法<code>dispatch</code>和<code>getState</code>，然后返回了一个方法，<br>我们大致抽象一下，应该如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (next) {
  
  return function (action) {
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
  }
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
  
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span> ?
      action(dispatch, getState) :
      next(action)
  }
  
}</code></pre>
<p>于是我们接下去分析<code>applyMiddleware</code>里面的代码，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chain = middlewares.map(middleware => middleware(middlewareAPI));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> middleware(middlewareAPI));</code></pre>
<p>现在我们知道chain是一个数组，每一项是调用每个中间件之后的返回函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch = compose(...chain)(store.dispatch);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dispatch = compose(...chain)(store.dispatch);</code></pre>
<p>compose是redux里面的一个帮助函数，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">...funcs</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arg</span> =&gt;</span> funcs.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), arg);
}</code></pre>
<p><del>~~(&gt;_&lt;)</del>~~我已经不想再吐槽什么了，</p>
<p>我们看到这边先调用了<code>compose</code>函数，传入了结构后的<code>chain</code>数组，然后<code>compose</code>函数返回的也是一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (arg) {
  return funcs.reduceRight((composed, f) => f(composed), arg);
  // funcs就是中间件数组
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arg</span>) </span>{
  <span class="hljs-keyword">return</span> funcs.reduceRight(<span class="hljs-function">(<span class="hljs-params">composed, f</span>) =&gt;</span> f(composed), arg);
  <span class="hljs-comment">// funcs就是中间件数组</span>
}</code></pre>
<p>然后我们把<code>store.dispatch</code>函数作为<code>arg</code>传入这个结果，这里reduceRight可以参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight" rel="nofollow noreferrer" target="_blank">这里</a><br>。那么这边得到的结果是什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设中间件数组是[A, B, C]
// 那么结果就是A(B(C(store.dispatch)))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 假设中间件数组是[A, B, C]</span>
<span class="hljs-comment">// 那么结果就是A(B(C(store.dispatch)))</span></code></pre>
<p>再次结合<code>redux-thunk</code>来看，我们假设只有一个中间件，那么最终的<code>dispatch</code>方法就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (action) {
  typeof action === 'function' ?
    action(dispatch, getState) :
    next(action)
}
// 这里的next方法，就是真正的store.dispatch方法
// 这里的dispatch是(action) => store.dispatch(action)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
  <span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span> ?
    action(dispatch, getState) :
    next(action)
}
<span class="hljs-comment">// 这里的next方法，就是真正的store.dispatch方法</span>
<span class="hljs-comment">// 这里的dispatch是(action) =&gt; store.dispatch(action)</span></code></pre>
<p>我们再结合<code>redux-thunk</code>的使用方法来分析一下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementAsync</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-comment">// Yay! Can invoke sync or async actions with `dispatch`</span>
      dispatch(increment());
    }, <span class="hljs-number">1000</span>);
  };
}</code></pre>
<p>这是使用<code>redux-thunk</code>时可以定义的异步action，我们触发action的时候调用的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(incrementAsync())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dispatch(incrementAsync())</code></pre>
<p><code>incrementAsync</code>返回的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (dispatch) {
  setTimeout(() => {
    // Yay! Can invoke sync or async actions with `dispatch`
    dispatch(increment());
  }, 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// Yay! Can invoke sync or async actions with `dispatch`</span>
    dispatch(increment());
  }, <span class="hljs-number">1000</span>);
}</code></pre>
<p>这个时候我们回想经过中间件加工的<code>dispatch</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (action) {
  typeof action === 'function' ?
    action(dispatch, getState) :
    next(action)
}
// 这里的next方法，就是真正的store.dispatch方法
// 这里的dispatch是(action) => store.dispatch(action)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
  <span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span> ?
    action(dispatch, getState) :
    next(action)
}
<span class="hljs-comment">// 这里的next方法，就是真正的store.dispatch方法</span>
<span class="hljs-comment">// 这里的dispatch是(action) =&gt; store.dispatch(action)</span></code></pre>
<p>action是一个函数，所以<code>action === 'function' ?</code>成立，那么就执行action， 并把中间件接收到的dispatch方法（<code>(action) =&gt; store.dispatch(action)</code>）方法作为参数传入，在异步方法执行完之后再次触发真正的action。如果action不是异步的，那么久直接返回一个对象，这个时候<code>action === 'function' ?</code>不成立，就直接调用<code>next</code>，也就是原始的<code>store.dispatch</code>方法。</p>
<p>我们再接着想，如果我们有许多个中间件，那么没一个中间件的<code>next</code>就是下一个中间件直到最后一个中间件调用<code>store.dispatch</code>为止。</p>
<p>以上的代码非常绕，建议去专研一下源码。这么精简的代码包含了非常多的函数式编程的思想，也用到了装饰器模式的原理，不得不说：</p>
<blockquote><p><strong>太烧脑啦/(ㄒoㄒ)/~~</strong></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux深入进阶

## 原文链接
[https://segmentfault.com/a/1190000004612224](https://segmentfault.com/a/1190000004612224)


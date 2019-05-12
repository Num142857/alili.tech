---
title: '精益 React 学习指南 （Lean React）- 3.4 掌控 redux 异步' 
date: 2019-02-08 2:30:41
hidden: true
slug: h6dbr4yrxkl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">3.4 redux 异步</h1>
<p><span class="img-wrap"><img data-src="/img/bVyou8" src="https://static.alili.tech/img/bVyou8" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在大多数的前端业务场景中，需要和后端产生异步交互，在本节中，将详细讲解 redux 中的异步方案以及一些异步第三方组件，内容有：</p>
<ul>
<li><p>redux 异步流</p></li>
<li><p>redux-thunk</p></li>
<li><p>redux-promise</p></li>
<li><p>redux-saga</p></li>
</ul>
<h2 id="articleHeader1">3.4.1 redux 异步流</h2>
<p>前面讲的 redux 中的数据流都是同步的，流程如下：</p>
<p><code>view -&gt; actionCreator -&gt; action -&gt; reducer -&gt; newState -&gt; container component</code> <br>但同步数据不能满足真实业务开发，真实业务中异步才是主角，那如何将异步处理结合到上边的流程中呢？</p>
<h2 id="articleHeader2">3.4.2 实现异步的方式</h2>
<p>其实 redux 并未有和异步相关的概念，我们可以用任何原来实现异步的方式应用到 redux 数据流中，最简单的方式就是延迟 dispatch action，以 setTimeout 为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dispatch({ type: 'SYNC_SOME_ACTION'})
window.setTimeout(() => {
  this.dispatch({ type: 'ASYNC_SOME_ACTION' })
}, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.dispatch({ <span class="hljs-attr">type</span>: <span class="hljs-string">'SYNC_SOME_ACTION'</span>})
<span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">this</span>.dispatch({ <span class="hljs-attr">type</span>: <span class="hljs-string">'ASYNC_SOME_ACTION'</span> })
}, <span class="hljs-number">1000</span>)</code></pre>
<p>这种方式最简单直接，但是有如下问题：</p>
<ol>
<li><p>如果有多个类似的 action 触发场景，异步逻辑不能重用</p></li>
<li><p>异步处理代码不能统一处理，最简单的例子就是节流</p></li>
</ol>
<p>解决上面两个问题的办法很简单，把异步的代码剥离出来：</p>
<p>someAction.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dispatchSomeAction(dispatch, payload) {
    // ..调用控制逻辑...
    dispatch({ type: 'SYNC_SOME_ACTION'})
    window.setTimeout(() => {
      dispatch({ type: 'ASYNC_SOME_ACTION' })
    }, 1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchSomeAction</span>(<span class="hljs-params">dispatch, payload</span>) </span>{
    <span class="hljs-comment">// ..调用控制逻辑...</span>
    dispatch({ <span class="hljs-attr">type</span>: <span class="hljs-string">'SYNC_SOME_ACTION'</span>})
    <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      dispatch({ <span class="hljs-attr">type</span>: <span class="hljs-string">'ASYNC_SOME_ACTION'</span> })
    }, <span class="hljs-number">1000</span>)
}</code></pre>
<p>然后组件只需要调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {dispatchSomeAction} from 'someAction.js'

dispatchSomeAction(dispatch, payload);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {dispatchSomeAction} <span class="hljs-keyword">from</span> <span class="hljs-string">'someAction.js'</span>

dispatchSomeAction(dispatch, payload);</code></pre>
<p>基于这种方式上面的流程就改为了：</p>
<p><code>view -&gt; asyncActionDispatcher -&gt; wait -&gt; action -&gt; reducer -&gt; newState -&gt; container component</code></p>
<p>asyncActionDispatcher 和 actionCreator 是十分类似的, 所以简单而言就可以把它理解为 asyncActionCreator , 所以新的流程为：</p>
<p><code>view -&gt; asyncActionCreator -&gt; wait -&gt; action -&gt; reducer -&gt; newState -&gt; container component</code></p>
<p>但是上面的方法有一些缺点</p>
<p>同步调用和异步调用的方式不相同:</p>
<ul>
<li><p>同步的情况: <code>store.dispatch(actionCreator(payload))</code></p></li>
<li><p>异步的情况: <code>asyncActionCreator(store.dispatch, payload)</code></p></li>
</ul>
<p>幸运的是在 redux 中通过 middleware 机制可以很容易的解决上面的问题</p>
<h3 id="articleHeader3">通过 middleware 实现异步</h3>
<p>我们已经很清楚一个 middleware 的结构 ，其核心的部分为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(action) {
    // 调用后面的 middleware
    next(action)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-comment">// 调用后面的 middleware</span>
    next(action)
}</code></pre>
<p>middleware 完全掌控了 reducer 的触发时机， 也就是 action 到了这里完全由中间件控制，不乐意就不给其他中间件处理的机会，而且还可以控制调用其他中间件的时机。 </p>
<p>举例来说一个异步的 ajax 请求场景，可以如下实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (action) {
    // async call 
    fetch('....')
      .then(
          function resolver(ret) {
            newAction = createNewAction(ret, action)
            next(newAction)
          },
          function rejector(err) {
            rejectAction = createRejectAction(err, action)
            next(rejectAction)
          })
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
    <span class="hljs-comment">// async call </span>
    fetch(<span class="hljs-string">'....'</span>)
      .then(
          <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolver</span>(<span class="hljs-params">ret</span>) </span>{
            newAction = createNewAction(ret, action)
            next(newAction)
          },
          <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rejector</span>(<span class="hljs-params">err</span>) </span>{
            rejectAction = createRejectAction(err, action)
            next(rejectAction)
          })
    });
}</code></pre>
<p>任何异步的 javascript 逻辑都可以，如： ajax callback, Promise, setTimeout 等等, 也可以使用 es7 的 async 和 await。</p>
<h3 id="articleHeader4">第三方异步组件</h3>
<p>上面的实现方案只是针对具体的场景设计的，那如果是如何解决通用场景下的问题呢，其实目前已经有很多第三方 redux 组件支持异步 action，其中如：</p>
<ul>
<li><p><a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a></p></li>
<li><p><a href="https://github.com/acdlite/redux-promise" rel="nofollow noreferrer" target="_blank">redux-promise</a></p></li>
<li><p><a href="http://yelouafi.github.io/redux-saga/" rel="nofollow noreferrer" target="_blank">redux-saga</a></p></li>
</ul>
<p>这些组件都有很好的扩展性，完全能满足我们开发异步流程的场景，下面来一一介绍</p>
<h2 id="articleHeader5">3.4.3 redux-thunk</h2>
<h3 id="articleHeader6">redux-thunk 介绍</h3>
<p>redux-thunk 是 redux 官方文档中用到的异步组件，实质就是一个 redux 中间件，thunk 听起来是一个很陌生的词语，先来认识一下什么叫 thunk</p>
<blockquote><p>A thunk is a function that wraps an expression to delay its evaluation.</p></blockquote>
<p>简单来说一个 thunk 就是一个封装表达式的函数，封装的目的是延迟执行表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1 + 2 立即被计算 = 3
let x = 1 + 2;

// 1 + 2 被封装在了 foo 函数内
// foo 可以被延迟执行
// foo 就是一个 thunk 
let foo = () => 1 + 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1 + 2 立即被计算 = 3</span>
<span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;

<span class="hljs-comment">// 1 + 2 被封装在了 foo 函数内</span>
<span class="hljs-comment">// foo 可以被延迟执行</span>
<span class="hljs-comment">// foo 就是一个 thunk </span>
<span class="hljs-keyword">let</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">1</span> + <span class="hljs-number">2</span>;</code></pre>
<p>redux-thunk 是一个通用的解决方案，其核心思想是让 action 可以变为一个 thunk ，这样的话:</p>
<ol>
<li><p>同步情况：dispatch(action)</p></li>
<li><p>异步情况：dispatch(thunk)</p></li>
</ol>
<p>我们已经知道了 thunk 本质上就是一个函数，函数的参数为 dispatch, 所以一个简单的 thunk 异步代码就是如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dispatch(function (dispatch){
    setTimeout(() => {
       dispatch({type: 'THUNK_ACTION'}) 
    }, 1000)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.dispatch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>)</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'THUNK_ACTION'</span>}) 
    }, <span class="hljs-number">1000</span>)
})</code></pre>
<p>之前已经讲过，这样的设计会导致异步逻辑放在了组件中，解决办法为抽象出一个 asyncActionCreator, 这里也一样，我们就叫 thunkActionCreator 吧，上面的例子可以改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//actions/someThunkAction.js
export function createThunkAction(payload) {
    return function(dispatch) {
        setTimeout(() => {
           dispatch({type: 'THUNK_ACTION', payload: payload}) 
        }, 1000)
    }
}

// someComponent.js
this.dispatch(createThunkAction(payload))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//actions/someThunkAction.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkAction</span>(<span class="hljs-params">payload</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
           dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'THUNK_ACTION'</span>, <span class="hljs-attr">payload</span>: payload}) 
        }, <span class="hljs-number">1000</span>)
    }
}

<span class="hljs-comment">// someComponent.js</span>
<span class="hljs-keyword">this</span>.dispatch(createThunkAction(payload))</code></pre>
<h3 id="articleHeader7">安装和使用</h3>
<p>第一步：安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install redux-thunk" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> redux-thunk</code></pre>
<p>第二步: 添加 thunk 中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;

<span class="hljs-keyword">const</span> store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);</code></pre>
<p>第三步：实现一个 thunkActionCreator</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//actions/someThunkAction.js
export function createThunkAction(payload) {
    return function(dispatch) {
        setTimeout(() => {
           dispatch({type: 'THUNK_ACTION', payload: payload}) 
        }, 1000)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//actions/someThunkAction.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkAction</span>(<span class="hljs-params">payload</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch</span>) </span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
           dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'THUNK_ACTION'</span>, <span class="hljs-attr">payload</span>: payload}) 
        }, <span class="hljs-number">1000</span>)
    }
}</code></pre>
<p>第三步：组件中 dispatch thunk</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dispatch(createThunkAction(payload));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.dispatch(createThunkAction(payload));</code></pre>
<blockquote><p>拥有 dispatch 方法的组件为 redux 中的 container component</p></blockquote>
<h3 id="articleHeader8">thunk 源码</h3>
<p>说了这么多，redux-thunk 是不是做了很多工作，实现起来很复杂，那我们来看看 thunk 中间件的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;</code></pre>
<p>就这么简单，只有 14 行源码，但是这简短的实现却能完成复杂的异步处理，怎么做到的，我们来分析一下：</p>
<ol>
<li>
<p>判断如果 action 是 function 那么执行 action(dispatch, getState, ...)</p>
<ol>
<li><p>action 也就是一个 thunk</p></li>
<li>
<p>执行 action 相当于执行了异步逻辑</p>
<ol>
<li><p>action 中执行 dispatch</p></li>
<li><p>开始新的 redux 数据流，重新回到最开始的逻辑（thunk 可以嵌套的原因）</p></li>
</ol>
</li>
<li><p>把执行的结果作为返回值直接返回</p></li>
<li><p>直接返回并没有调用其他中间件，也就意味着中间件的执行在这里停止了</p></li>
<li><p>可以对返回值做处理（后面会讲如果返回值是 Promise 的情况）</p></li>
</ol>
</li>
<li><p>如果不是函数直接调用其他中间件并返回</p></li>
</ol>
<p>理解了这个过后是不是对 redux-thunk 的使用思路变得清晰了</p>
<h3 id="articleHeader9">thunk 的组合</h3>
<p>根据 redux-thunk 的特性，可以做出很有意思的事情</p>
<ol>
<li><p>可以递归的 dispatch(thunk) =&gt; 实现 thunk 的组合；</p></li>
<li><p>thunk 运行结果会作为 dispatch返回值 =&gt; 利用返回值为 Promise 可以实现多个 thunk 的编排;</p></li>
</ol>
<p>thunk 组合例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function thunkC() {
    return function(dispatch) {
        dispatch(thunkB())
    }
}
function thunkB() {
    return function (dispatch) {
        dispatch(thunkA())
    }
}
function thunkA() {
    return function (dispatch) {
        dispatch({type: 'THUNK_ACTION'})
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkC</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch</span>) </span>{
        dispatch(thunkB())
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        dispatch(thunkA())
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'THUNK_ACTION'</span>})
    }
}</code></pre>
<p>Promise 例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxCall() {
    return fetch(...);
}

function thunkC() {
    return function(dispatch) {
        dispatch(thunkB(...))
        .then(
            data => dispatch(thunkA(data)),
            err  => dispatch(thunkA(err))
        )
    }
}
function thunkB() {
    return function (dispatch) {
        return ajaxCall(...)
    }
}

function thunkA() {
    return function (dispatch) {
        dispatch({type: 'THUNK_ACTION'})
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxCall</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> fetch(...);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkC</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch</span>) </span>{
        dispatch(thunkB(...))
        .then(
            <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> dispatch(thunkA(data)),
            err  =&gt; dispatch(thunkA(err))
        )
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        <span class="hljs-keyword">return</span> ajaxCall(...)
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thunkA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
        dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'THUNK_ACTION'</span>})
    }
}</code></pre>
<h2 id="articleHeader10">3.4.4 redux-promise</h2>
<p>另外一个 redux 文档中提到的异步组件为 redux-promise, 我们直接分析一下其源码吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { isFSA } from 'flux-standard-action';

function isPromise(val) {
  return val &amp;&amp; typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { isFSA } <span class="hljs-keyword">from</span> <span class="hljs-string">'flux-standard-action'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span>(<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">return</span> val &amp;&amp; <span class="hljs-keyword">typeof</span> val.then === <span class="hljs-string">'function'</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseMiddleware</span>(<span class="hljs-params">{ dispatch }</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
    <span class="hljs-keyword">if</span> (!isFSA(action)) {
      <span class="hljs-keyword">return</span> isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    <span class="hljs-keyword">return</span> isPromise(action.payload)
      ? action.payload.then(
          <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> dispatch({ ...action, <span class="hljs-attr">payload</span>: result }),
          error =&gt; {
            dispatch({ ...action, <span class="hljs-attr">payload</span>: error, <span class="hljs-attr">error</span>: <span class="hljs-literal">true</span> });
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
          }
        )
      : next(action);
  };
}</code></pre>
<p>大概的逻辑就是：</p>
<ol>
<li><p>如果不是标准的 flux action，那么判断是否是 promise, 是执行 action.then(dispatch)，否执行 next(action)</p></li>
<li><p>如果是标准的 flux action, 判断 payload 是否是 promise，是的话 payload.then 获取数据，然后把数据作为 payload 重新 dispatch({ ...action, payload: result}) , 否执行 next(action)</p></li>
</ol>
<p>结合 redux-promise 可以利用 es7 的 async 和 await 语法，简化异步的 promiseActionCreator 的设计， eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default async (payload) => {
  const result = await somePromise;
  return {
    type: &quot;PROMISE_ACTION&quot;,
    payload: result.someValue;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> (payload) =&gt; {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> somePromise;
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"PROMISE_ACTION"</span>,
    <span class="hljs-attr">payload</span>: result.someValue;
  }
}</code></pre>
<p>如果对 es7 async 语法不是很熟悉可以看下面两个例子：</p>
<ol><li><p>async 关键字可以总是返回一个 Promise 的 resolve 结果或者 reject 结果</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function foo() {
    if(true)
        return 'Success!';
    else
        throw 'Failure!';
}

// 等价于
 
function foo() {
    if(true)
        return Promise.resolve('Success!');
    else
        return Promise.reject('Failure!');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Success!'</span>;
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">throw</span> <span class="hljs-string">'Failure!'</span>;
}

<span class="hljs-comment">// 等价于</span>
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'Success!'</span>);
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'Failure!'</span>);
}
</code></pre>
<ol><li><p>在 async 关键字中可以使用 await 关键字，其目的是 await 一个 promise， 等待 promise resolve 和 reject</p></li></ol>
<p>eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function foo(aPromise) {
    const a = await new Promise(function(resolve, reject) {
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    resolve({a: 12});
                }, 1000);
        })
    console.log(a.a)
    return  a.a
}

// in console
> foo() 
> Promise {_c: Array[0], _a: undefined, _s: 0, _d: false, _v: undefined…}
> 12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">aPromise</span>) </span>{
    <span class="hljs-keyword">const</span> a = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
            <span class="hljs-comment">// This is only an example to create asynchronism</span>
            <span class="hljs-built_in">window</span>.setTimeout(
                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    resolve({<span class="hljs-attr">a</span>: <span class="hljs-number">12</span>});
                }, <span class="hljs-number">1000</span>);
        })
    <span class="hljs-built_in">console</span>.log(a.a)
    <span class="hljs-keyword">return</span>  a.a
}

<span class="hljs-comment">// in console</span>
&gt; foo() 
&gt; <span class="hljs-built_in">Promise</span> {<span class="hljs-attr">_c</span>: <span class="hljs-built_in">Array</span>[<span class="hljs-number">0</span>], <span class="hljs-attr">_a</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">_s</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">_d</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">_v</span>: <span class="hljs-literal">undefined</span>…}
&gt; <span class="hljs-number">12</span></code></pre>
<p>可以看到在控制台中，先返回了一个 promise，然后输出了 12</p>
<p>async 关键字可以极大的简化异步流程的设计，避免 callback 和 thennable 的调用，看起来和同步代码一致。</p>
<h2 id="articleHeader11">3.4.5 redux-saga</h2>
<h3 id="articleHeader12">redux-saga 介绍</h3>
<p>redux-saga 也是解决 redux 异步 action 的一个中间件，不过和之前的设计有本质的不同</p>
<ol>
<li><p>redux-saga 完全基于 Es6 的 Generator Function</p></li>
<li><p>不使用 actionCreator 策略，而是通过监控 action, 然后在自动做处理</p></li>
<li><p>所有带副作用的操作（异步代码，不确定的代码）都被放到 saga 中</p></li>
</ol>
<h3 id="articleHeader13">那到底什么是 saga</h3>
<p>redux-saga 实际也没有解释什么叫 saga ，通过引用的参考：</p>
<blockquote><p>The term saga is commonly used in discussions of CQRS to refer to a piece of code that coordinates and routes messages between bounded contexts and aggregates.</p></blockquote>
<p>这个定义的核心就是 <strong>CQRS-查询与责任分离</strong> ，对应到 redux-sage 就是 action 与 处理函数的分离。 实际上在 redux-saga 中，一个 saga 就是一个 Generator 函数。</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Api from '...'

/*
 * 一个 saga 就是一个 Generator Function 
 *
 * 每当 store.dispatch `USER_FETCH_REQUESTED` action 的时候都会调用 fetchUser.
 */
function* mySaga() {
  yield* takeEvery(&quot;USER_FETCH_REQUESTED&quot;, fetchUser);
}

/**
 * worker saga： 真正处理 action 的 saga
 *  
 * USER_FETCH_REQUESTED action 触发时被调用
 * @param {[type]} action  [description]
 * @yield {[type]} [description]
 */
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: &quot;USER_FETCH_SUCCEEDED&quot;, user: user});
   } catch (e) {
      yield put({type: &quot;USER_FETCH_FAILED&quot;, message: e.message});
   }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { takeEvery, takeLatest } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga'</span>
<span class="hljs-keyword">import</span> { call, put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>
<span class="hljs-keyword">import</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">'...'</span>

<span class="hljs-comment">/*
 * 一个 saga 就是一个 Generator Function 
 *
 * 每当 store.dispatch `USER_FETCH_REQUESTED` action 的时候都会调用 fetchUser.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">mySaga</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span>* takeEvery(<span class="hljs-string">"USER_FETCH_REQUESTED"</span>, fetchUser);
}

<span class="hljs-comment">/**
 * worker saga： 真正处理 action 的 saga
 *  
 * USER_FETCH_REQUESTED action 触发时被调用
 * @param {[type]} action  [description]
 * @yield {[type]} [description]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchUser</span>(<span class="hljs-params">action</span>) </span>{
   <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">yield</span> call(Api.fetchUser, action.payload.userId);
      <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">"USER_FETCH_SUCCEEDED"</span>, <span class="hljs-attr">user</span>: user});
   } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">yield</span> put({<span class="hljs-attr">type</span>: <span class="hljs-string">"USER_FETCH_FAILED"</span>, <span class="hljs-attr">message</span>: e.message});
   }
}
</code></pre>
<h3 id="articleHeader14">一些基本概念</h3>
<p><strong>watcher saga</strong></p>
<p>负责编排和派发任务的 saga</p>
<p><strong>worker saga</strong></p>
<p>真正负责处理 action 的函数</p>
<p><strong>saga helper</strong></p>
<p>如上面例子中的 takeEvery，简单理解就是用于监控 action 并派发 action 到 worker saga 的辅助函数 </p>
<p><strong>Effect</strong></p>
<p>redux-saga 完全基于 Generator 构建，saga 逻辑的表达是通过 yield javascript 对象来实现，这些对象就是Effects。</p>
<p>这些对象相当于描述任务的规范化数据（任务如执行异步函数，dispatch action 到一个 store），这些数据被发送到 redux-saga 中间件中执行，如：</p>
<ol>
<li><p><code>put({type: "USER_FETCH_SUCCEEDED", user: user})</code> 表示要执行 <code>dispatch("{{"type: "USER_FETCH_SUCCEEDED", user: user"}}")</code> 任务</p></li>
<li><p><code>call(fetch, url)</code> 表示要执行 <code>fetch(url)</code></p></li>
</ol>
<p>通过这种 effect 的抽象，可以避免 call 和 dispatch 的立即执行，而是描述要执行什么任务，这样的话就很容易对 saga 进行测试，saga 所做的事情就是将这些 effect 编排起来用于描述任务，真正的执行都会放在 middleware 中执行。</p>
<h3 id="articleHeader15">安装和使用</h3>
<p>第一步：安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save redux-saga" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save redux-saga</span></code></pre>
<p>第二步：添加 saga 中间件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()

// 添加到中间件中
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// 立即运行 saga ，让监控器开始监控
sagaMiddleware.run(mySaga)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> createSagaMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga'</span>

<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">import</span> mySaga <span class="hljs-keyword">from</span> <span class="hljs-string">'./sagas'</span>

<span class="hljs-comment">// 创建 saga 中间件</span>
<span class="hljs-keyword">const</span> sagaMiddleware = createSagaMiddleware()

<span class="hljs-comment">// 添加到中间件中</span>
<span class="hljs-keyword">const</span> store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

<span class="hljs-comment">// 立即运行 saga ，让监控器开始监控</span>
sagaMiddleware.run(mySaga)
</code></pre>
<p>第三步：定义 sagas/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// 将异步执行 increment 任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export default function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { takeEvery } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga'</span>
<span class="hljs-keyword">import</span> { put } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-saga/effects'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> delay = <span class="hljs-function"><span class="hljs-params">ms</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, ms))

<span class="hljs-comment">// 将异步执行 increment 任务</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">incrementAsync</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> delay(<span class="hljs-number">1000</span>)
  <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT'</span> })
}

<span class="hljs-comment">// 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchIncrementAsync</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span>* takeEvery(<span class="hljs-string">'INCREMENT_ASYNC'</span>, incrementAsync)
}</code></pre>
<p>第四步：组件中调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.dispatch({type: 'INCREMENT_ASYNC'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT_ASYNC'</span>})</code></pre>
<p>redux-saga 基于 Generator 有很多高级的特性， 如：</p>
<ol>
<li><p>基于 take Effect 实现更自由的任务编排</p></li>
<li><p>fork 和 cancel 实现非阻塞任务</p></li>
<li><p>并行任何和 race 任务</p></li>
<li><p>saga 组合 ，yield* saga</p></li>
</ol>
<blockquote><p>因篇幅有限，这部分内容在下一篇讲解</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 3.4 掌控 redux 异步

## 原文链接
[https://segmentfault.com/a/1190000005773725](https://segmentfault.com/a/1190000005773725)


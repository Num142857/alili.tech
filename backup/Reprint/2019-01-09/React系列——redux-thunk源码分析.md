---
title: 'React系列——redux-thunk源码分析' 
date: 2019-01-09 2:30:11
hidden: true
slug: e856bke1ub4
categories: [reprint]
---

{{< raw >}}

                    
<p>在react开发中，一部分人使用redux-thunk，一部分人使用redux-saga，彼此各有优点。</p>
<p>今天我们来研究一下redux-thunk的源码，看看它到底做了什么事情。</p>
<h4>使用场景</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
//注册thunk到applyMiddleware
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

//action方法
function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}
//执行一个异步的dispatch
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
}
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers/index'</span>;
<span class="hljs-comment">//注册thunk到applyMiddleware</span>
<span class="hljs-keyword">const</span> createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

<span class="hljs-keyword">const</span> store = createStoreWithMiddleware(rootReducer);

<span class="hljs-comment">//action方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: INCREMENT_COUNTER
  };
}
<span class="hljs-comment">//执行一个异步的dispatch</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementAsync</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      dispatch(increment());
    }, <span class="hljs-number">1000</span>);
  };
}
    
</code></pre>
<p>主要代码：</p>
<p><strong>1、导入thunk</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import thunk from 'redux-thunk';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
</code></pre>
<p><strong>2、添加到applyMiddleware()</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const createStoreWithMiddleware = applyMiddleware(
  <span class="hljs-name">thunk</span>
)(<span class="hljs-name">createStore</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>我们可以猜测thunk是一个object。</p>
<h4>redux-thunk源码</h4>
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

export default thunk;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;
</code></pre>
<p>一共11行，简洁，超简洁，5K+ star。</p>
<h4>源码分析</h4>
<p><strong>1、定义了createThunkMiddleware()方法，可以传入参数extraArgument。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument){}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span><span class="hljs-params">(extraArgument)</span></span>{}
</code></pre>
<p><strong>2、该方法返回的是一个action对象。</strong></p>
<p>我们知道action本身是一个object，带有type和arguments。我们将<strong>dispatch</strong>和<strong>getState</strong>传入action，next()和action()是redux提供的方法。接着做判断，如果action是一个function，就返回action(dispatch, getState, extraArgument)，否则返回next(action)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
</code></pre>
<p><strong>3、执行createThunkMiddleware()</strong></p>
<p>这一步的常量thunk是一个对象，类似{type: "", arg1, arg2, ...}</p>
<p>const thunk = createThunkMiddleware();</p>
<p>4、给thunk设置一个变量withExtraArgument，并且将createThunkMiddleware整个函数赋给它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="thunk.withExtraArgument = createThunkMiddleware;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>thunk.withExtraArgument = createThunkMiddleware<span class="hljs-comment">;</span>
</code></pre>
<p><strong>5、最后导出thunk。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default thunk;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;
</code></pre>
<h4>总结</h4>
<p>什么是thunk？thunk是一个中间函数，它的返回值是一个表达式。action里面可能传递多个参数，我们不可能再专门替每个action写一个传递方法。那么就有了thunk的出现，thunk可以将多个参数的函数作为一个参数传递。</p>
<p>例如有这样一个action，带有多个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test(arg1, arg2, ...) {
    return {
        type: &quot;TEST&quot;,
        arg1,
        arg2,
        ...
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">(arg1, arg2, <span class="hljs-rest_arg">...) {
    return</span> {
        type: <span class="hljs-string">"TEST"</span>,
        arg1,
        arg2,
        <span class="hljs-rest_arg">...
    }
}
</span></span></span></code></pre>
<p>然后我们执行dispatch()方法，我们需要把test()函数作为一个参数传递。这样就解决了多参数传递的问题，这个test()就成了一个thunk。</p>
<p>如果你对redux-thunk还有疑问，可以查看这个解释：<a href="https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559" rel="nofollow noreferrer" target="_blank">redux-thunk of stackoverflow</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——redux-thunk源码分析

## 原文链接
[https://segmentfault.com/a/1190000010154828](https://segmentfault.com/a/1190000010154828)


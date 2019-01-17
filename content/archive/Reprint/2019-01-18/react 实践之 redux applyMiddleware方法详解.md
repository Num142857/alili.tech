---
title: 'react 实践之 redux applyMiddleware方法详解' 
date: 2019-01-18 2:30:34
hidden: true
slug: c1cg8i8smq9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>使用方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = applyMiddleware(...middlewares)(createStore)(reducer, initialState)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const store = applyMiddleware(...middlewares)(<span class="hljs-name">createStore</span>)(<span class="hljs-name">reducer</span>, initialState)
</code></pre>
<p>源码 版本 0.14.0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function applyMiddleware() {
    //1
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  //2
  return function (createStore) {
      //3
    return function (reducer, preloadedState, enhancer) {
      //4
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];
      //5
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      //6
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//1</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> _len = <span class="hljs-built_in">arguments</span>.length, middlewares = <span class="hljs-built_in">Array</span>(_len), _key = <span class="hljs-number">0</span>; _key &lt; _len; _key++) {
    middlewares[_key] = <span class="hljs-built_in">arguments</span>[_key];
  }
  <span class="hljs-comment">//2</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">createStore</span>) </span>{
      <span class="hljs-comment">//3</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reducer, preloadedState, enhancer</span>) </span>{
      <span class="hljs-comment">//4</span>
      <span class="hljs-keyword">var</span> store = createStore(reducer, preloadedState, enhancer);
      <span class="hljs-keyword">var</span> _dispatch = store.dispatch;
      <span class="hljs-keyword">var</span> chain = [];
      <span class="hljs-comment">//5</span>
      <span class="hljs-keyword">var</span> middlewareAPI = {
        <span class="hljs-attr">getState</span>: store.getState,
        <span class="hljs-attr">dispatch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
          <span class="hljs-keyword">return</span> _dispatch(action);
        }
      };
      chain = middlewares.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">middleware</span>) </span>{
        <span class="hljs-keyword">return</span> middleware(middlewareAPI);
      });
      <span class="hljs-comment">//6</span>
      _dispatch = _compose2[<span class="hljs-string">'default'</span>].apply(<span class="hljs-literal">undefined</span>, chain)(store.dispatch);

      <span class="hljs-keyword">return</span> _extends({}, store, {
        <span class="hljs-attr">dispatch</span>: _dispatch
      });
    };
  };
}
</code></pre>
<p><strong>applyMiddleware方法主要是对redux的dispacth方法进行封装</strong></p>
<p><strong>原理</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _dispatch = store.dispatch;
store.dispatch = function (action) {
  console.log('增强功能');
  _dispatch(action);
  console.log('增强功能');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> _dispatch = store.dispatch;
store.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'增强功能'</span>);
  _dispatch(action);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'增强功能'</span>);
}
</code></pre>
<p>原理很简单就是将store的dispatch进行替换，换成一个功能增强了但是具有dispach功能的新函数请输入代码<br>原理和java设计模式中的 装饰者模式很像，旨在增强功能，但不改变接口</p>
<p>接下来具体分析 applyMiddleware 函数</p>
<p><strong>1. 代码//1</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">for</span> (var <span class="hljs-variable">_len</span> = arguments.length, middlewares = Array(<span class="hljs-variable">_len</span>), <span class="hljs-variable">_key</span> = <span class="hljs-number">0</span>; <span class="hljs-variable">_key</span> &lt; <span class="hljs-variable">_len</span>; <span class="hljs-variable">_key</span>++) {
    middlewares[<span class="hljs-variable">_key</span>] = arguments[<span class="hljs-variable">_key</span>];
}
</code></pre>
<p>由于第一个框号(...middlewares)里面的参数可以是多个中间件(m1,m2,m3)这种类型，或者是一个中间件数组<br>所以这里通过 遍历 js函数的 arguments 属性将所有的参数取出放到 middlewares 数组中</p>
<p><strong>2. 代码//2 //3</strong></p>
<p>applyMiddleware 这个函数其实是一个 柯里化 的函数，<br><strong>柯里化</strong>（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，<br>并且返回接受余下的参数且返回结果的新函数的技术</p>
<p>这里有几个关键字 <strong>多个参数</strong> <strong>单一参数</strong> <strong>返回接受余下参数的函数</strong> <strong>返回结果</strong><br>//举例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function count(a,b,c) {
    return a+b+c;
}
count(1,2,3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">count</span>(a,b,c) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">a+b+c</span>;
}
count(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>);
</code></pre>
<p>我们看到 count接受多个参数，这里是三个，最后返回了计算结果，接下来把它柯里化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function count(a) {
    return function(b) {
        return function(c) {
            return a+b+c;
        }
    }
}
count(1)(2)(3);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> <span class="hljs-built_in">count</span>(a) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(b)</span></span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(c)</span></span> {
            <span class="hljs-keyword">return</span> a+b+c;
        }
    }
}
<span class="hljs-built_in">count</span>(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>);
</code></pre>
<p>我们看到区别在于 柯里化 后函数只接受一个参数，返回了接受剩余参数的函数，所以要分多次调用</p>
<p><strong>3. //代码4</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var store = createStore(reducer, preloadedState, enhancer);
var _dispatch = store.dispatch;
var chain = [];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> store = createStore(reducer, preloadedState, enhancer);
<span class="hljs-keyword">var</span> _dispatch = store.dispatch;
<span class="hljs-keyword">var</span> chain = [];
</code></pre>
<p>这里做了三件事情，<strong>1</strong> 用reducer创建了一个 store，<strong>2</strong> var _dispatch = store.dispatch; 将原来的<br>dispatch方法保存了起来，因为后我们要覆盖 dispach 但又要用到原始的dispatch的功能，所以保存<br><strong>3</strong> var chain = [];我们的中间件也是一个 柯里化 的函数，这个数组用来保存中间件接受第一个参数<br>后返回的函数</p>
<p><strong>4. //代码5</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var middlewareAPI = {
    getState: store.getState,
    dispatch: function dispatch(action) {
      return _dispatch(action);
    }
};
chain = middlewares.map(function (middleware) {
    return middleware(middlewareAPI);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>var middlewareAPI = {
    getState: store.getState,
    dispatch: <span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(action) {
      <span class="hljs-keyword">return</span> <span class="hljs-type">_dispatch(action)</span>;
    }
};
chain = middlewares.map(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(middleware) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">middleware(middlewareAPI)</span>;
});
</code></pre>
<p>middlewareAPI 对象有两个成员 getState和dispatch，由于这两个成员我们会在中间件里面用到<br>所以我们要将它们传递给中间件 调用 middlewares.map 方法，middlewares是一个数组，map方法<br>接受一个函数，这个函数的第一个参数就是 middlewares 数组的成员，我们调用map方法会遍历<br>middlewares数组，将它的每一个成员传递给 成员处理函数，最终返回了一个由 处理函数返回值<br>组成的数组，通过以上代码我们就可以在中间件中使用getState，和dispatch这两个方法了</p>
<p><strong>5. //代码6</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
return _extends({}, store, {
        dispatch: _dispatch
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-variable">_dispatch</span> = <span class="hljs-variable">_compose2</span>[<span class="hljs-string">'default'</span>].<span class="hljs-built_in">apply</span>(undefined, chain)(store.dispatch);
return <span class="hljs-variable">_extends</span>({}, store, {
        dispatch: <span class="hljs-variable">_dispatch</span>
});
</code></pre>
<p>这里做的事情就是我们开始的原理中做的事情 将 disatch 增强并且替换掉store中的dispatch，<br>替换后的dispach中会调用中间件，我们看到返回值_extends 是一个函数，接收store，和增强后<br>的_dispatch，用来替换自己的 dispatch方法</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react 实践之 redux applyMiddleware方法详解

## 原文链接
[https://segmentfault.com/a/1190000008754562](https://segmentfault.com/a/1190000008754562)


---
title: '浅谈Redux（之一)：Middleware原理' 
date: 2019-02-06 2:30:09
hidden: true
slug: 2evyxtqqvce
categories: [reprint]
---

{{< raw >}}

                    
<p>Redux作为目前最火的<code>Flux</code>模式实现之一，它有很多的点值得研究。今天我们首先来看看它的Middleware。</p>
<p>熟悉<code>Express</code>或者<code>koa</code>的朋友对Middleware的概念一定不陌生。例如Express中是这样使用一个中间件的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = express();

app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'%s %s'</span>, req.method, req.url);
  next();
});
</code></pre>
<p><code>app.use</code>中的方法，可以在其后面的<code>http VERB</code>调用之前，对<code>request</code>对象和<code>response</code>对象进行处理，然后通过调用<code>next</code>方法将处理过程转发到下一中间件或者通过返回响应来结束处理过程。（之后有机会的话再写一写<code>Node</code>和<code>Express</code>）。</p>
<p>我理解的所谓中间件其实就是，通过类似装饰者模式的形式，用代码预处理的方式，保证原本处理问题的函数（或方法）调用不变。</p>
<p>Redux中的中间件可以使得在用户调用<code>store.dispatch</code>之后，先对参数<code>state</code>和<code>actions</code>进行预处理，再让真正的<code>store.dispatch</code>调用，以确保<code>reducer</code>的<em>纯度</em>（函数式编程的概念）不变。</p>
<p>Redux中提供了<code>applyMiddleware</code>方法，它的源码只有十几行，真的是非常精妙。</p>
<p>下面我们就研究一下它的源代码。</p>
<p>&lt;!--more--&gt;</p>
<h2 id="articleHeader0">applyMiddleware方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="applyMiddleware(...middlewares){
    
    return next => (reducer, initialState){
       
        var store = next(reducer, initialState),
            dispatch = store.dispatch,
            chain = [],
            middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            };
            
            chain = middlewares.map(middleware =>
                middleware(middlewareAPI));
            
            dispatch = compose(...chain, store.dispatch);
            
            return {
                ...store,
                dispatch
            }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>applyMiddleware(...middlewares){
    
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> (reducer, initialState){
       
        <span class="hljs-keyword">var</span> store = next(reducer, initialState),
            dispatch = store.dispatch,
            chain = [],
            middlewareAPI = {
                <span class="hljs-attr">getState</span>: store.getState,
                <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> dispatch(action)
            };
            
            chain = middlewares.map(<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span>
                middleware(middlewareAPI));
            
            dispatch = compose(...chain, store.dispatch);
            
            <span class="hljs-keyword">return</span> {
                ...store,
                dispatch
            }
    }
}
</code></pre>
<p>这段代码的意思就是，<code>appleMiddleware</code>方法接收一个<code>Middleware</code>列表，以<code>applyMiddleware(middleware1, middleware2, middleware3)</code>的形式调用(参见ES6的rest参数语法)，然后再将创建store的方法传入（我想这个原因是Redux不仅仅可以在React中使用，也可以适用于任何Flux模式的框架和库），然后就会发生神奇的事情。</p>
<p>这两次调用(假设：<code>var newCreateSore = applyMiddleware(middleware1, middleware2)(createStore)</code>）会产生一个新的创建Store的方法，但是它改造了原本Store的<code>dispatch</code>方法，让这个<code>dispatch</code>可以做原生<code>dispatch</code>不能做的事情，这样我们就可以订制<code>dispatch</code>的行为，从而实现了<em>中间件</em>的概念。</p>
<p>故而，<code>newCreateStore</code>将作为<code>createStore</code>的替代方法，使用<code>newCreateStore</code>会产生带有中间件的store。</p>
<p>在最内层是如何实现中间件的调用的呢？让我们继续研究。</p>
<p>首先我们用传入的<code>next</code>（一个可以创建Store的函数），创建一个原始的store，并且取出其原生的<code>store.dispatch</code>方法和<code>store.getState</code>方法成为一个对象，作为参数传入<em>中间件</em>函数中，让其第一次包装这个类似store的对象，并返回新的函数。</p>
<p>然后我们使用<code>compose</code>函数，将这些包装过后的返回的函数一个接一个的嵌套调用。</p>
<p>这里补充一下compose的概念：</p>
<blockquote><p>假设有若干函数f1, f2, f3...,compose指的是类似f1(f2(f3(x)))的调用方式，这在函数式编程中很常见。</p></blockquote>
<p>（这里的<code>compose</code>函数是redux中的一个方法，这里我们不上它的源码，有兴趣的朋友可以直接看源码。）</p>
<p>被嵌套在compose最内层的是原生的<code>store.dispatch</code>方法，这里我们就一层层的将其包装，在中间件函数中，我们可以利用store的其他方法，比如<code>store.dispatch</code>和<code>store.getState</code>，做一些有意思的事情，比如实现一个记录<code>state</code>改变的日志中间件。</p>
<h2 id="articleHeader1">中间件函数</h2>
<p>从上面的分析中，我们不难写一个符合要求的中间件函数。</p>
<p>首先中间件函数需要接受一个<code>middlewareAPI</code>，如果使用ES6的语法，这里可以看成是接收一个<code>{dispatch, getState}</code>的形式的参数，这样我们就能在内层使用这两个方法。</p>
<p>接收<code>middlewareAPI</code>参数之后，中间件函数返回另一个函数（为方便后面解释，假设返回的函数为<code>dispatch n</code>）。这个函数既然要用于compose，也就是说它接收一个形式为<code>dispatch</code>的函数，对其一层层嵌套（形式为<code>dispatch1(dispatch2(dispatch3(dispatch)))</code>）。在其内部我们可以在之前的<code>dispatch</code>调用之前和之后，进行一些逻辑的处理。</p>
<p>写一个简单的记录state日志的中间件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var middlewareLogger = ({getState}) => next => action => {
    console.log(getState());
    next(action);
    console.log(getState());
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> middlewareLogger = <span class="hljs-function">(<span class="hljs-params">{getState}</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(getState());
    next(action);
    <span class="hljs-built_in">console</span>.log(getState());
}
</code></pre>
<p>怎么样，是不是特别简单？</p>
<p>再写一个异步操作的中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }

  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> readyStatePromise = <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (!action.promise) {
    <span class="hljs-keyword">return</span> next(action)
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAction</span>(<span class="hljs-params">ready, data</span>) </span>{
    <span class="hljs-keyword">let</span> newAction = <span class="hljs-built_in">Object</span>.assign({}, action, { ready }, data)
    <span class="hljs-keyword">delete</span> newAction.promise
    <span class="hljs-keyword">return</span> newAction
  }

  next(makeAction(<span class="hljs-literal">false</span>))
  <span class="hljs-keyword">return</span> action.promise.then(
    <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> next(makeAction(<span class="hljs-literal">true</span>, { result })),
    <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> next(makeAction(<span class="hljs-literal">true</span>, { error }))
  )
}
</code></pre>
<p>这个中间件让你可以发起带有一个 { promise } 属性的特殊 action。这个 middleware 会在开始时发起一个 action，并在这个 <code>promise</code> resolve 时发起另一个成功（或失败）的 action。为了方便起见，<code>dispatch</code> 会返回这个 promise 让调用者可以等待。</p>
<h2 id="articleHeader2">结束</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈Redux（之一)：Middleware原理

## 原文链接
[https://segmentfault.com/a/1190000006149647](https://segmentfault.com/a/1190000006149647)


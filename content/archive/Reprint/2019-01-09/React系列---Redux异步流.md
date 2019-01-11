---
title: 'React系列---Redux异步流' 
date: 2019-01-09 2:30:12
hidden: true
slug: vybp597kqhk
categories: [reprint]
---

{{< raw >}}

                    
<p>使用Redux访问服务器，同样要要解决异步问题。</p>
<p>Redux单向数据流，由action对象开始驱动，每个action对象被派发到Store之后，被分配给reducer函数，reducer完成数据操作后立刻返回，reducer返回的结果又被拿去更新Store上的状态数据，更新状态数据的操作立刻会被同步给监听Store状态改变的函数，从而引发React视图组件的更新过程。</p>
<p><span class="img-wrap"><img data-src="/img/bVQA9v?w=800&amp;h=242" src="https://static.alili.tech/img/bVQA9v?w=800&amp;h=242" alt="Redux单向数据流" title="Redux单向数据流" style="cursor: pointer; display: inline;"></span></p>
<p>整个过程都是马不停蹄一路同步执行，根本没有异步操作的机会，那应该在 哪里插入访问服务器的异步操作呢？</p>
<h1 id="articleHeader0">redux-thunk中间件</h1>
<p>redux-thunk中间件就是解决redux异步操作的标准方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux-thunk --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> redux-thunk <span class="hljs-comment">--save</span></code></pre>
<h2 id="articleHeader1">异步actoin对象</h2>
<p>Redux单向数据流的驱动起点是action对象，Redux异步操作也避免不了从派发一个action对象开始。但是这个action对象比较特殊，我们叫它“异步action对象”。</p>
<p>与普通action对象（包含若干字段，其中type必不可少）不同的是，“异步action对象”不是一个普通的JavaScript对象，而是一个函数。</p>
<p>这样一个函数类型的action对象派发出去，由于没有type字段，就没有下一步的reducer什么事了。但reducer又不得不按redux数据流的步骤自动介入进来。所以中间件在此时机站出来，认定这件事非他管不可的话，reducer就得一边凉快去。</p>
<p>所以，redux-thunk的工作就是检查action对象是不是函数，如果不是就撤退。而如果是的话，就执行这个函数，并把Store的dispatch函数和getState函数作为参数传递进去。</p>
<p>寥寥几行的redux-thunk源代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if(typeof action == 'function') {
            return action(dispatch, getState, extraArgument);
        }
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> action == <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
        }
    };
}</code></pre>
<p>可以很清楚地看到，当actoin为函数时，并没有调用next或dispatch方法，而是返回action函数的调用。</p>
<p>了解到redux-thunk的原理后，我们模拟一个天气的异步请求。action creator通常可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getWeather(url, params) {
    return (dispatch, getState) => { // 由中间件负责调用，dispatch和getState也由中间件负责传入
        fetch(url, params)
            .then(result => {
                dispatch({
                    type: 'GET_WEATHER_SUCCESS',
                    payload: result
                });
            })
            .catch(err => {
                dispatch({
                    type: 'GET_WEATHER_ERROR',
                    error: err
                });
            });
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWeather</span>(<span class="hljs-params">url, params</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> { <span class="hljs-comment">// 由中间件负责调用，dispatch和getState也由中间件负责传入</span>
        fetch(url, params)
            .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
                dispatch({
                    <span class="hljs-keyword">type</span>: <span class="hljs-string">'GET_WEATHER_SUCCESS'</span>,
                    payload: result
                });
            })
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                dispatch({
                    <span class="hljs-keyword">type</span>: <span class="hljs-string">'GET_WEATHER_ERROR'</span>,
                    error: err
                });
            });
    };
}</code></pre>
<p>异步action函数的代码基本都是这样的套路：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const sampleAsyncAction = () => {
    return (dispatch, getState) => {
        // 在这个函数里可以调用异步函数, 自行决定再合适的时机通过dispatch参数派发新的action对象
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> sampleAsyncAction = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> {
        <span class="hljs-comment">// 在这个函数里可以调用异步函数, 自行决定再合适的时机通过dispatch参数派发新的action对象</span>
    }
};</code></pre>
<p>这就是异步action的工作机理，异步action最终还是要产生同步actoin的派发，才能触达视图的响应。redux-thunk要做的工作也就不过如此，但因为引入了一次函数执行，而这个函数还能访问到dispatch和getState，就给异步操作带来了可能。</p>
<p>异步action函数中，可以通过ajax发起对服务器的异步请求，当得到结果之后，通过参数dispatch，把成功或失败的结果当做actoin对象再派发出去。这一次派发的是普通action对象，就不会被redux-thunk截获，直接到达reducer，最终驱动Store上状态的改变。</p>
<h1 id="articleHeader2">redux-promise中间件</h1>
<p>我们发现，异步请求其实都是利用promise来完成的，那么为什么不直接通过抽象promise来解决异步流问题呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux-promise --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> redux-promise <span class="hljs-comment">--save</span></code></pre>
<p>通过源码分析一下它是怎么做的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { isFSA } from 'flux-standard-action';

function isPromise(val) {
    return val &amp;&amp; typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
    return next => action => {
        if(!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : next(action);
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { isFSA } <span class="hljs-keyword">from</span> <span class="hljs-string">'flux-standard-action'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span>(<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">return</span> val &amp;&amp; <span class="hljs-keyword">typeof</span> val.then === <span class="hljs-string">'function'</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseMiddleware</span>(<span class="hljs-params">{ dispatch }</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
        <span class="hljs-keyword">if</span>(!isFSA(action)) {
            <span class="hljs-keyword">return</span> isPromise(action) ? action.then(dispatch) : next(action);
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
<p>redux-promise兼容了<a href="https://segmentfault.com/a/1190000010113847">FSA标准</a>，也就是说将返回的结果保存在payload中。实现过程非常容易理解，即判断action或action.payload是否为promise，如果是，就执行then，返回的结果再发送一次dispatch。</p>
<p>我们利用ES7的async和await语法，可以简化上述获取天气的异步过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchData = (url, params) => fetch(url, params);

async function getWeather(url, params) {
    const result = await fetchData(url, params);
    
    if(result.error) {
        return {
            type: 'GET_WEATHER_ERROR',
            error: result.error
        };
    }
    
    return {
        type: 'GET_WEATHER_SUCCESS',
        payload: result
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> fetchData = (<span class="hljs-built_in">url</span>, params) =&gt; fetch(<span class="hljs-built_in">url</span>, params);

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWeather</span>(<span class="hljs-params">url, params</span>) </span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> fetchData(<span class="hljs-built_in">url</span>, params);
    
    <span class="hljs-keyword">if</span>(result.error) {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attribute">type</span>: <span class="hljs-string">'GET_WEATHER_ERROR'</span>,
            <span class="hljs-attribute">error</span>: result.error
        };
    }
    
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'GET_WEATHER_SUCCESS'</span>,
        <span class="hljs-attribute">payload</span>: result
    };
}</code></pre>
<h1 id="articleHeader3">redux-composable-fetch</h1>
<p>在实际中，我们还需要加上loading状态。结合上述讨论的两个开源middleware，我们完全可以自己实现一个贴合工程需要的middleware，这里将其命名为redux-composable-fetch。</p>
<p>在理想的情况下，我们不希望通过复杂的方法去请求数据，而希望通过如下形式一并完成在异步请求过程中的不同状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    url: '/api/weather.json',
    params: {
        city: encodeURI(city)
    },
    types: ['GET_WEATHER', 'GET_WEATHER_SUCCESS', 'GET_WEATHER_ERROR']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">url</span>: <span class="hljs-string">'/api/weather.json'</span>,
    params: {
        city: <span class="hljs-built_in">encodeURI</span>(city)
    },
    <span class="hljs-selector-tag">types</span>: <span class="hljs-selector-attr">['GET_WEATHER', 'GET_WEATHER_SUCCESS', 'GET_WEATHER_ERROR']</span>
}</code></pre>
<p>可以看到，异步请求的action格式有别于FSA。它并没有使用type属性，而使用了types属性。types其实是三个普通action type的集合，分别代表请求中、请求成功和请求失败。</p>
<p>在请求middleware中，会对action进行格式检查，若存在url和types属性，则说明这个action是一个用于发送异步请求的action。此外，并不是所有请求都能携带参数，因此params是可选的。</p>
<p>当请求middleware识别到这是一个用于发送请求的action后，首先会分发一个新的action，这个action的type就是原action里types数组中的第一个元素，即请求中。分发这个新action的目的在于让store能够同步当前请求的状态，如将loading状态置为true，这样在对应的界面上可以展示一个友好的加载中动画。</p>
<p>然后请求middleware会根据action中的url、params、method等参数发送一个异步请求，并在请求响应后根据结果的成功或失败分别分发请求成功和请求失败的新action。</p>
<p>请求middleware的简化实现如下，我们可以根据具体的场景对此进行改造：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchMiddleware = store => next => action => {
    if(!action.url || !Array.isArray(action.types)) {
        return next(action);
    }
    
    const [LOADING, SUCCESS, ERROR] = action.types;
    
    next({
        type: LOADING,
        loading: true,
        ...action
    });
    
    fetch(action.url, { params: action.params })
        .then(result => {
            next({
                type: SUCCESS,
                loading: false,
                payload: result
            });
        })
        .catch(err => {
            next({
                type: ERROR,
                loading: false,
                error: err
            });
        });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>const fetchMiddleware = store =&gt; next =&gt; <span class="hljs-built_in">action</span> =&gt; {
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">action</span>.url || !Array.<span class="hljs-built_in">isArray</span>(<span class="hljs-built_in">action</span>.types)) {
        return next(<span class="hljs-built_in">action</span>);
    }
    
    const [LOADING, SUCCESS, ERROR] = <span class="hljs-built_in">action</span>.types;
    
    next({
        <span class="hljs-built_in">type</span>: LOADING,
        loading: <span class="hljs-literal">true</span>,
        ...<span class="hljs-built_in">action</span>
    });
    
    fetch(<span class="hljs-built_in">action</span>.url, { <span class="hljs-built_in">params</span>: <span class="hljs-built_in">action</span>.<span class="hljs-built_in">params</span> })
        .<span class="hljs-keyword">then</span>(result =&gt; {
            next({
                <span class="hljs-built_in">type</span>: SUCCESS,
                loading: <span class="hljs-literal">false</span>,
                payload: result
            });
        })
        .<span class="hljs-keyword">catch</span>(err =&gt; {
            next({
                <span class="hljs-built_in">type</span>: ERROR,
                loading: <span class="hljs-literal">false</span>,
                error: err
            });
        });
};</code></pre>
<p>这样我们一步就完成了异步请求的action。</p>
<h1 id="articleHeader4">redux-observable</h1>
<p>在Redux中，处理异步action的方法非常多，最标准的做法是使用redux-thunk中间件，经过thunk中间件的处理，一个action被dispatch后可以返回一个函数，这个函数可以用来做其他的事：发起异步请求和dispatch另外更多的action。使用redux-promise比redux-thunk更加易用，复杂度也不高，创建的异步action对象符合FSA标准。</p>
<p>在Redux社区中，负有盛名的还有redux-sage、redux-observable等。</p>
<p>redux-observable，是通过创建epics中间件，为每一个dispatch添加相应的附加效果。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---Redux异步流

## 原文链接
[https://segmentfault.com/a/1190000010112836](https://segmentfault.com/a/1190000010112836)


---
title: '给 axios 和 redux-axios-middleware 添加finally方法 的使用心得' 
date: 2019-01-27 2:31:00
hidden: true
slug: 0skcvoxz0cqg
categories: [reprint]
---

{{< raw >}}

                    
<p>最近公司让用react写一个钉钉的微应用APP 然后就只能去学了react, 之前一直用angular和vue, 所以异步请求用的都是jquery和axios, 想转来转去麻烦 就直接用了axios, 然后网上找了一下 居然有axios的redux中间件</p>
<h1 id="articleHeader0">axios 实现finally方法</h1>
<h2 id="articleHeader1">实现方式1 - q.js</h2>
<p>一开始使用axios, 因为没有finally方法,写起来总是有点别扭 所以引入了<a href="https://github.com/kriskowal/q" rel="nofollow noreferrer" target="_blank">q.js</a> 需要把请求都用Q.Promise封装一遍，像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义
export function getUserInfo() {
    return Q.Promise((success, error) => {
        axios.post('[url]').then(function (data) {
            if (data.code == 200) {
                success(data.data)
            } else {
                error()
            }
        }).catch(function (err) {
            error()
        });
    })
}

//使用
getUserInfo()
    .then(()=>{
    })
    .catch(()=>{
    })
    .finally(()=>{
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> Q.Promise(<span class="hljs-function">(<span class="hljs-params">success, error</span>) =&gt;</span> {
        axios.post(<span class="hljs-string">'[url]'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
            <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">200</span>) {
                success(data.data)
            } <span class="hljs-keyword">else</span> {
                error()
            }
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            error()
        });
    })
}

<span class="hljs-comment">//使用</span>
getUserInfo()
    .then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    })
    .catch(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    })
    .finally(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    })</code></pre>
<h2 id="articleHeader2">实现方式2 - promise.prototype.finally</h2>
<p>最后在看 axios的<a href="https://github.com/mzabriskie/axios/issues/457" rel="nofollow noreferrer" target="_blank">issues</a>的时候无意间看到有人提问 可以用这个库 实现对es6promise的扩展 之后就很简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//只要引入这个模块 使用下这个方法就搞定了
require('promise.prototype.finally').shim() 


//使用
axios.post('[url]')
    .then((data)=> {
    })
    .catch((err)=> {
    })
    .finally(()=> {
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>只要引入这个模块 使用下这个方法就搞定了
<span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>).shim() 


<span class="hljs-regexp">//</span>使用
axios.post(<span class="hljs-string">'[url]'</span>)
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span> {
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span> {
    })
    .<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    })</code></pre>
<h1 id="articleHeader3">redux-axios-middleware 实现finally方法</h1>
<p>我们做业务的时候肯定会有 loading 这个变量，在请求前需要让加载框出现，在完成后需要隐藏<br>不对redux-axios-middleware进行配置的话是这样的,可以看到 写了2遍<code>state.setIn(['obj', 'loading'], false);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case 'GET_CATEGORY_LIST':
    return state.setIn(['obj', 'loading'], true);
    break;
case 'GET_CATEGORY_LIST_SUCCESS':
    state = state.setIn(['obj', 'list'], fromJS(aciton.payload.data))
    return state.setIn(['obj', 'loading'], false);
    break;
case 'GET_CATEGORY_LIST_FAIL':
    return state.setIn(['obj', 'loading'], false);
    break;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>case 'GET_CATEGORY_LIST':
    return <span class="hljs-keyword">state</span>.<span class="hljs-built_in">set</span>In(['obj', 'loading'], true);
    break;
case 'GET_CATEGORY_LIST_SUCCESS':
    <span class="hljs-keyword">state</span> = <span class="hljs-keyword">state</span>.<span class="hljs-built_in">set</span>In(['obj', 'list'], <span class="hljs-keyword">from</span>JS(aciton.payload.data))
    return <span class="hljs-keyword">state</span>.<span class="hljs-built_in">set</span>In(['obj', 'loading'], false);
    break;
case 'GET_CATEGORY_LIST_FAIL':
    return <span class="hljs-keyword">state</span>.<span class="hljs-built_in">set</span>In(['obj', 'loading'], false);
    break;</code></pre>
<h3 id="articleHeader4">对redux-axios-middleware进行配置</h3>
<p>看了下源码 他是有一个<code>onComplete</code> 方法可以定义的，方式如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#axiosMiddlewareOptions.js
import { getActionTypes } from 'redux-axios-middleware/lib/getActionTypes'

export const returnRejectedPromiseOnError = true;

export const onComplete = ( { action, next, getState, dispatch }, actionOptions) => {
    const previousAction = action.meta.previousAction;
    const nextAction = {
        type: getActionTypes(previousAction, actionOptions)[0]+'_COMPLETE',
        meta: {
            previousAction: previousAction
        }
    };
    next(nextAction);
    return nextAction;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>#axiosMiddlewareOptions.js
<span class="hljs-keyword">import</span> { getActionTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-axios-middleware/lib/getActionTypes'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> returnRejectedPromiseOnError = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onComplete = <span class="hljs-function">(<span class="hljs-params"> { action, next, getState, dispatch }, actionOptions</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> previousAction = action.meta.previousAction;
    <span class="hljs-keyword">const</span> nextAction = {
        <span class="hljs-keyword">type</span>: getActionTypes(previousAction, actionOptions)[<span class="hljs-number">0</span>]+<span class="hljs-string">'_COMPLETE'</span>,
        meta: {
            previousAction: previousAction
        }
    };
    next(nextAction);
    <span class="hljs-keyword">return</span> nextAction;
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#store.js
import { createStore, compose, applyMiddleware } from 'redux'

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import * as axiosMiddlewareOptions from './common/axiosMiddlewareOptions'

const enhancers = compose(
    applyMiddleware(
        axiosMiddleware(axios, {...axiosMiddlewareOptions}), //axios 中间件
    ),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>#store.js
<span class="hljs-keyword">import</span> { createStore, compose, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> axiosMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-axios-middleware'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> axiosMiddlewareOptions <span class="hljs-keyword">from</span> <span class="hljs-string">'./common/axiosMiddlewareOptions'</span>

<span class="hljs-keyword">const</span> enhancers = compose(
    applyMiddleware(
        axiosMiddleware(axios, {...axiosMiddlewareOptions}), <span class="hljs-comment">//axios 中间件</span>
    ),
    <span class="hljs-built_in">window</span>.devToolsExtension ? <span class="hljs-built_in">window</span>.devToolsExtension() : <span class="hljs-function"><span class="hljs-params">f</span>=&gt;</span>f
);</code></pre>
<p>这样配置完之后，axios中间件每次请求完 都会执行一个<code>[type]_COMPLETE</code>的action,上面的reducer可以优化为(如果为错误不处理的话，一般都会在axios的interceptors里做)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="case 'GET_CATEGORY_LIST':
    return state.setIn(['obj', 'loading'], true);
    break;
case 'GET_CATEGORY_LIST_SUCCESS':
    return state.setIn(['obj', 'list'], fromJS(aciton.payload.data))
    break;
case 'GET_CATEGORY_LIST_COMPLETE':
    return state.setIn(['obj', 'loading'], false);
    break;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>case <span class="hljs-string">'GET_CATEGORY_LIST'</span>:
    <span class="hljs-keyword">return</span> state.setIn([<span class="hljs-string">'obj'</span>, <span class="hljs-string">'loading'</span>], <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">break</span>;
case <span class="hljs-string">'GET_CATEGORY_LIST_SUCCESS'</span>:
    <span class="hljs-keyword">return</span> state.setIn([<span class="hljs-string">'obj'</span>, <span class="hljs-string">'list'</span>], fromJS(aciton.payload.<span class="hljs-keyword">data</span>))
    <span class="hljs-keyword">break</span>;
case <span class="hljs-string">'GET_CATEGORY_LIST_COMPLETE'</span>:
    <span class="hljs-keyword">return</span> state.setIn([<span class="hljs-string">'obj'</span>, <span class="hljs-string">'loading'</span>], <span class="hljs-literal">false</span>);
    <span class="hljs-keyword">break</span>;</code></pre>
<p>上面还有一个配置<code>export const returnRejectedPromiseOnError = true;</code>他的作用是让axios中间件请求出错的时候走catch方法，可以是代码结构更清晰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#redux-axios-middleware 源码
return actionOptions.returnRejectedPromiseOnError ? Promise.reject(newAction) : newAction;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-meta">#redux-axios-middleware 源码</span>
<span class="hljs-keyword">return</span> actionOptions.returnRejectedPromiseOnError ? Promise.reject(<span class="hljs-keyword">new</span><span class="hljs-type">Action</span>) : <span class="hljs-type">newAction</span>;</code></pre>
<p>然后就可以使用axios中间件请求更爽的写业务代码啦,上面说的是在 redux 中的数据，下面这个是如何更好控制在state中的数据，下面的3个方法其实是axios.request()的方法,由于我们使用第2种方法给promise添加了finally方法,所以现在可以这样使用它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ refreshing: true });
this.props.userHome()
    .then(()=>{
        
    })
    .catch(()=>{
    })
    .finally(()=>{
        this.setState({ refreshing: false });
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.setState({ refreshing: <span class="hljs-literal">true</span> });
<span class="hljs-keyword">this</span>.props.userHome()
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    })
    .<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.setState({ refreshing: <span class="hljs-literal">false</span> });
    })</code></pre>
<p>ok 搞完了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给 axios 和 redux-axios-middleware 添加finally方法 的使用心得

## 原文链接
[https://segmentfault.com/a/1190000008179784](https://segmentfault.com/a/1190000008179784)


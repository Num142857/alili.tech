---
title: 'React系列——10分钟学会react-redux异步' 
date: 2019-01-28 2:30:09
hidden: true
slug: gw471pgi2y6
categories: [reprint]
---

{{< raw >}}

                    
<p>你可以结合这份redux官方的异步源码来看：<a href="https://github.com/reactjs/redux/tree/master/examples/async" rel="nofollow noreferrer" target="_blank">Redux Async Example</a></p>
<p>一、选择一种你喜欢的异步方案，fetch，jQuery，或者是我正在使用的<a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer" target="_blank">axios</a><br>1、安装axios插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> axios</code></pre>
<p>2、新建一个fetchData.js文件，封装基本的post和get接口。axios官方还提供了很多配置选项，比如超时配置等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量
axios.defaults.baseURL = BASE_URL;
/*
如果没有安装webpack，就使用下面这种写法
axios.defaults.baseURL = http://ip:端口
*/

export const getData = (url, param) => {
    return (
        axios.get(`${url}`)
    )
}

export const postData = (url, param) => {
    return (
        axios.post(`${url}`, param)
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-comment">//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量</span>
axios.defaults.baseURL = BASE_URL;
<span class="hljs-comment">/*
如果没有安装webpack，就使用下面这种写法
axios.defaults.baseURL = http://ip:端口
*/</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getData = <span class="hljs-function">(<span class="hljs-params">url, param</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
        axios.get(<span class="hljs-string">`<span class="hljs-subst">${url}</span>`</span>)
    )
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postData = <span class="hljs-function">(<span class="hljs-params">url, param</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
        axios.post(<span class="hljs-string">`<span class="hljs-subst">${url}</span>`</span>, param)
    )
}</code></pre>
<p>3、你的异步代码将写在action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//导入fetchData文件
import { getData, postData } from './fetchData'

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const saveReducer = (data) => ({
    type: 'SAVE_REDUCER',
    data
})

//get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。
export const getTest = (id) => async (dispatch, getState) => {
    try {
        let response = await getData(`/test/${id}`)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}

/*
post接口测试，params参数格式
let params = {
    id: 23
}
*/
export const postTest = (params) => async (dispatch, getState) => {
    try {
        let response = await postData(`/test`, params)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//导入fetchData文件</span>
<span class="hljs-keyword">import</span> { getData, postData } <span class="hljs-keyword">from</span> <span class="hljs-string">'./fetchData'</span>

<span class="hljs-comment">//返回一个action对象，用来关联对应的reducer，将data保存到store。</span>
<span class="hljs-keyword">const</span> saveReducer = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'SAVE_REDUCER'</span>,
    data
})

<span class="hljs-comment">//get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getTest = <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch, getState) =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> getData(<span class="hljs-string">`/test/<span class="hljs-subst">${id}</span>`</span>)
        <span class="hljs-keyword">await</span> dispatch(saveReducer(response.data))
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error: '</span>, error)
    }
}

<span class="hljs-comment">/*
post接口测试，params参数格式
let params = {
    id: 23
}
*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postTest = <span class="hljs-function">(<span class="hljs-params">params</span>) =&gt;</span> <span class="hljs-keyword">async</span> (dispatch, getState) =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> postData(<span class="hljs-string">`/test`</span>, params)
        <span class="hljs-keyword">await</span> dispatch(saveReducer(response.data))
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error: '</span>, error)
    }
}</code></pre>
<p>4、在reducer中定义action type保存data。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注意，这里不需要再import action了。
//定义一个初始化状态的state，假设现在有一个空数组testData
let initState = {
    testData: []
}

//定义一个叫做test的reducer，更新state。
export function test(state = initState, action) {
    switch (action.type) {
        case 'SAVE_REDUCER':
            return {
                ...state,
                testData: action.data
            }

        default:
            return state;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//注意，这里不需要再import action了。
//定义一个初始化状态的<span class="hljs-keyword">state</span>，假设现在有一个空数组testData
let initState = {
    testData: []
}

//定义一个叫做test的reducer，更新<span class="hljs-keyword">state</span>。
export function test(<span class="hljs-keyword">state</span> = initState, action) {
    switch (action.type) {
        case 'SAVE_REDUCER':
            return {
                ...<span class="hljs-keyword">state</span>,
                testData: action.data
            }

        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
}</code></pre>
<p>5、现在你还需要定义一个store的配置文件，把reducer合并成store，并且关联action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

let createStoreWithMiddleware;
// store负责管理所有reducer，module.hot.accept表示支持热更新
const logger = createLogger({ collapsed: true });
createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>;
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-logger'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>;

<span class="hljs-keyword">let</span> createStoreWithMiddleware;
<span class="hljs-comment">// store负责管理所有reducer，module.hot.accept表示支持热更新</span>
<span class="hljs-keyword">const</span> logger = createLogger({ collapsed: <span class="hljs-literal">true</span> });
createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">configureStore</span>(<span class="hljs-params">initialState</span>) </span>{
  <span class="hljs-keyword">const</span> store = createStoreWithMiddleware(rootReducer, initialState);
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">'./reducers'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> nextRootReducer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./reducers/index'</span>);
      store.replaceReducer(nextRootReducer);
    });
  }
  <span class="hljs-keyword">return</span> store;
}</code></pre>
<p>6、单向数据流部分现在已经完成了，接着就在组件触发action去异步请求服务器的数据，返回给前端，然后action会自动把数据保存到内存store中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*actions*/
import * as testActions from 'action/test';

//让组件关联state和action
@connect(
    state => state,
    dispatch => bindActionCreators({testActions}, dispatch)
)
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let params = {
            id: 23
        }
        this.props.postTest(params) //发送post请求
        
        let id = 23
        this.props.getTest(id) //发送get请求
    }

    render() {
        return(
            <div>
                {/*你的dom*/}
            </div>
        );
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;

<span class="hljs-comment">/*actions*/</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> testActions <span class="hljs-keyword">from</span> <span class="hljs-string">'action/test'</span>;

<span class="hljs-comment">//让组件关联state和action</span>
@connect(
    <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state,
    dispatch =&gt; bindActionCreators({testActions}, dispatch)
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }

    componentWillMount() {
        <span class="hljs-keyword">let</span> params = {
            <span class="hljs-attr">id</span>: <span class="hljs-number">23</span>
        }
        <span class="hljs-keyword">this</span>.props.postTest(params) <span class="hljs-comment">//发送post请求</span>
        
        <span class="hljs-keyword">let</span> id = <span class="hljs-number">23</span>
        <span class="hljs-keyword">this</span>.props.getTest(id) <span class="hljs-comment">//发送get请求</span>
    }

    render() {
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {/*你的dom*/}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}
</code></pre>
<p>7、如果你的异步是click或者hover之类的事件触发的，则只需要通过事件绑定来发送action就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div onClick={() => this.props.getTest(id)}>

</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> onClick={() =&gt; this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.getTest</span>(id)}&gt;

&lt;/div&gt;</code></pre>
<p>还有更多需求 ，可以看看 <a href="https://github.com/hyy1115/react-redux-webpack2" rel="nofollow noreferrer" target="_blank">react-redux-webpack架构</a></p>
<p>提问环节：</p>
<p>小白：你骗人，你就是个骗子，我看完这篇文章花了11分钟，为什么要写10分钟学会？</p>
<p>。。。</p>
<p>我：。。。下课。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——10分钟学会react-redux异步

## 原文链接
[https://segmentfault.com/a/1190000008063435](https://segmentfault.com/a/1190000008063435)


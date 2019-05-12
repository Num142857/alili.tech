---
title: 'React-Redux 入门教程' 
date: 2019-01-03 2:30:10
hidden: true
slug: 4ndfffsgc6j
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>项目目录</strong></h1>
<p><span class="img-wrap"><img data-src="/img/bVTGs8?w=214&amp;h=571" src="https://static.alili.tech/img/bVTGs8?w=214&amp;h=571" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="整个项目目录分为图中所示：
Redux分为{Action,Reducer,Store}
入口文件为App.jsx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">整个项目目录分为图中所示：
Redux分为</span><span class="hljs-template-variable">{Action,Reducer,Store}</span><span class="xml">
入口文件为App.jsx</span></code></pre>
<h1 id="articleHeader1"><strong>项目效果</strong></h1>
<p><span class="img-wrap"><img data-src="/img/bVTGwz?w=413&amp;h=253" src="https://static.alili.tech/img/bVTGwz?w=413&amp;h=253" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="从图中可以看出整个组件可以分为3个组件，内部Counter组件，计算Count的Summary的组件，以及整个容器组件ControlPanel
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>从图中可以看出整个组件可以分为<span class="hljs-number">3</span>个组件，内部Counter组件，计算<span class="hljs-built_in">Count</span>的Summary的组件，以及整个容器组件ControlPanel
</code></pre>
<h1 id="articleHeader2">Content</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
React Redux 事实上是两个独立的产品， 应用可以使用 React 而不使用
Redux ，也可以使用 Redux 而不使用 React ，但是，如果两者结合使用，没有理由不使用
一个名叫 react-redux 的库这个库能够大大简化代码的书写;

react-redux 的两个最主要功能：
connect ：连接数据处理组件和内部UI组件；
Provider ：提供包含 store的context；
通过Content实现传递Store的目的
首先定义好
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
React Redux 事实上是两个独立的产品， 应用可以使用 React 而不使用
Redux ，也可以使用 Redux 而不使用 React ，但是，如果两者结合使用，没有理由不使用
一个名叫 react-redux 的库这个库能够大大简化代码的书写<span class="hljs-comment">;</span>

react-redux 的两个最主要功能：
connect ：连接数据处理组件和内部UI组件；
Provider ：提供包含 store的<span class="hljs-built_in">context</span>；
通过Content实现传递Store的目的
首先定义好
</code></pre>
<p>Action/index.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const Increment='increment'
export const Decrement='decrement'

export const increment=(counterCaption)=>({
    type:Increment,
    counterCaption
  }
)
export const decrement=(counterCaption)=>({
    type:Decrement,
    counterCaption
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Increment=<span class="hljs-string">'increment'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Decrement=<span class="hljs-string">'decrement'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increment=<span class="hljs-function">(<span class="hljs-params">counterCaption</span>)=&gt;</span>({
    <span class="hljs-keyword">type</span>:Increment,
    counterCaption
  }
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decrement=<span class="hljs-function">(<span class="hljs-params">counterCaption</span>)=&gt;</span>({
    <span class="hljs-keyword">type</span>:Decrement,
    counterCaption
})</code></pre>
<p>Reducer/index.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Increment,Decrement} from '../Action'
export default(state,action)=>{
    const {counterCaption}=action
    switch (action.type){
        case Increment:
        return {...state,[counterCaption]:state[counterCaption]+1}
        case Decrement:
        return {...state,[counterCaption]:state[counterCaption]-1}
        default:
        return state
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import {Increment,Decrement} <span class="hljs-keyword">from</span> '../Action'
export <span class="hljs-keyword">default</span>(<span class="hljs-keyword">state</span>,action)=&gt;{
    const {counterCaption}=action
    switch (action.type){
        case Increment:
        return {...<span class="hljs-keyword">state</span>,[counterCaption]:<span class="hljs-keyword">state</span>[counterCaption]+<span class="hljs-number">1</span>}
        case Decrement:
        return {...<span class="hljs-keyword">state</span>,[counterCaption]:<span class="hljs-keyword">state</span>[counterCaption]-<span class="hljs-number">1</span>}
        <span class="hljs-keyword">default</span>:
        return <span class="hljs-keyword">state</span>
    }
}</code></pre>
<p>Store/store.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore} from 'redux'
import reducer from '../Reducer' 
const initValue={
    'First':0,
    'Second':10,
    'Third':20
}
const store=createStore(reducer,initValue)
export default store" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../Reducer'</span> 
<span class="hljs-keyword">const</span> initValue={
    <span class="hljs-string">'First'</span>:<span class="hljs-number">0</span>,
    <span class="hljs-string">'Second'</span>:<span class="hljs-number">10</span>,
    <span class="hljs-string">'Third'</span>:<span class="hljs-number">20</span>
}
<span class="hljs-keyword">const</span> store=createStore(reducer,initValue)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在action中我们会发现定义了两个常量，一个控制增加，一个控制减少，然后暴露出增加减少的函数。这两个函
数可以在Couter组件中调用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>在<span class="hljs-keyword">action</span>中我们会发现定义了两个常量，一个控制增加，一个控制减少，然后暴露出增加减少的函数。这两个函
数可以在Couter组件中调用
</code></pre>
<p>Counter.jsx</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import {increment,decrement} from '../Redux/Action'
import {connect} from 'react-redux';
const buttonStyle = {
margin: &quot;20px&quot;
}

function Counter({caption, Increment, Decrement, value}){
return (
        <div>
            <button style={buttonStyle} onClick={Increment}>+</button>
            <button style={buttonStyle} onClick={Decrement}>-</button>
            <span>{caption} count :{value}</span>
        </div>
    )
}
function mapState(state,ownProps){
return{
    value:state[ownProps.caption]
}
}
function mapDispatch(dispatch,ownProps){
return {
    Increment:()=>{
        dispatch(increment(ownProps.caption))
    },
    Decrement:()=>{
        dispatch(decrement(ownProps.caption))
    }

}
}

export default connect(mapState,mapDispatch)(Counter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {increment,decrement} <span class="hljs-keyword">from</span> <span class="hljs-string">'../Redux/Action'</span>
<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">const</span> buttonStyle = {
<span class="hljs-attr">margin</span>: <span class="hljs-string">"20px"</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Counter</span>(<span class="hljs-params">{caption, Increment, Decrement, value}</span>)</span>{
<span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{buttonStyle}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{Increment}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{buttonStyle}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{Decrement}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{caption} count :{value}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapState</span>(<span class="hljs-params">state,ownProps</span>)</span>{
<span class="hljs-keyword">return</span>{
    <span class="hljs-attr">value</span>:state[ownProps.caption]
}
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapDispatch</span>(<span class="hljs-params">dispatch,ownProps</span>)</span>{
<span class="hljs-keyword">return</span> {
    <span class="hljs-attr">Increment</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        dispatch(increment(ownProps.caption))
    },
    <span class="hljs-attr">Decrement</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        dispatch(decrement(ownProps.caption))
    }

}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapState,mapDispatch)(Counter)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.在counter组件中我们会发现引入了增加和减少这两个函数，然后在mapDispatch函数中进行调用，暴露出增               
  加和减少合并的一个对象，然后通过解构在Counter函数组件中获得传递过来的经过mapDispath包装过后的增
  加和减少组件。mapDispatch函数的作用就是把内层函数组件的增加和减少的动作派发给Store

然后我们转过来看Reducer/index.jsx
  reducer是专门处理数据逻辑的，通过传入（state,action），针对不同的action返回一个不同的store对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-number">1</span>.在counter组件中我们会发现引入了增加和减少这两个函数，然后在mapDispatch函数中进行调用，暴露出增               
  加和减少合并的一个对象，然后通过解构在Counter函数组件中获得传递过来的经过mapDispath包装过后的增
  加和减少组件。mapDispatch函数的作用就是把内层函数组件的增加和减少的动作派发给Store

然后我们转过来看Reducer/index.jsx
  reducer是专门处理数据逻辑的，通过传入（<span class="hljs-keyword">state</span>,action），针对不同的action返回一个不同的store对象</code></pre>
<p>Store/store.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 是专门对store进行的一个封装，通过createStore方法传入reducer和初始化state（initValue）来暴露        
 store对象，此对象非原始的store对象，该对象是对原始store进行注册，增加了若干方法。具体了解此方法可以**请戳这里**" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> 是专门对store进行的一个封装，通过createStore方法传入reducer和初始化<span class="hljs-keyword">state</span>（initValue）来暴露        
 store对象，此对象非原始的store对象，该对象是对原始store进行注册，增加了若干方法。具体了解此方法可以**请戳这里**</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[https://github.com/reactjs/redux/blob/master/src/createStore.js][1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">https://github.com/reactjs/redux/blob/master/src/createStore.js</span>][<span class="hljs-symbol">1</span>]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="最后把store对象暴露给App.jsx在主入口进行调用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>最后把<span class="hljs-selector-tag">store</span>对象暴露给<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.jsx</span>在主入口进行调用
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import store from './Redux/Store/Store.jsx'
import {Provider} from 'react-redux';
import ControlPanel from './Component/ControlPanel.jsx'
import './style/common.less'
render(
    <Provider store={store}>
    <ControlPanel />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, {Component, PropTypes} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM, {render} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./Redux/Store/Store.jsx'</span>
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> ControlPanel <span class="hljs-keyword">from</span> <span class="hljs-string">'./Component/ControlPanel.jsx'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./style/common.less'</span>
render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ControlPanel</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>))
);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我们通过react-redux提供的顶层组件Provider传入store然后把要展示的ControlPanel写入顶层组件就行了，        
Provider提供了整个全局的store供所有的子组件进行调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>我们通过react-redux提供的顶层组件Provider传入<span class="hljs-keyword">store</span>然后把要展示的ControlPanel写入顶层组件就行了，        
Provider提供了整个全局的<span class="hljs-keyword">store</span>供所有的子组件进行调用</code></pre>
<p>具体代码实现请git clone <br><em><a href="https://github.com/jeromehan/react-redux-test.git" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/jeromehan/react-redux-test.git" rel="nofollow noreferrer" target="_blank">https://github.com/jeromehan/...</a></em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Redux 入门教程

## 原文链接
[https://segmentfault.com/a/1190000010851224](https://segmentfault.com/a/1190000010851224)


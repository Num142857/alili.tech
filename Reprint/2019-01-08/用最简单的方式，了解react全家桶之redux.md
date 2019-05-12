---
title: '用最简单的方式，了解react全家桶之redux' 
date: 2019-01-08 2:30:11
hidden: true
slug: 66c8aevovy
categories: [reprint]
---

{{< raw >}}

                    
<p>本文以create-react-app项目作为开端，从最基础代码成长为一个实际项目的过程。<br>注意：本文没有大部分理论，只有代码，会逐步延伸。</p>
<p><span class="img-wrap"><img data-src="/img/bVQ3ZG?w=432&amp;h=440" src="https://static.alili.tech/img/bVQ3ZG?w=432&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">redux组成部分</h3>
<p><strong>createStore.js</strong>  <br><strong>reducer.js</strong> <br><strong>action.js</strong>  </p>
<p>1.我们来说说第一个，createStore.js</p>
<p>先看看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux'
import reducer from ‘./reducer’
export default () => {
    let store = createStore(reducer)
    return store
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> ‘./reducer’
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; {
    <span class="hljs-keyword">let</span> store = createStore(reducer)
    <span class="hljs-keyword">return</span> store
}</code></pre>
<p>是不是炒鸡简单？<br>从redux里获取创建的方法，然后创建store的目的是干什么？当然是修改reducer，我们把reducer当作一个参数传入。</p>
<p>2.接着，我们看看我们的reducer是干什么的，看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function counter(state = {value : 0}, action) {
  switch (action.type) {
    case 'INCREASE':
      return Object.assign({}, state, {
        value: state.value + 1
      })
    case 'DECREASE':
        return Object.assign({}, state, {
        value: state.value - 1
      })
    default:
      return state
  }
}

export default counter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function counter(<span class="hljs-keyword">state</span> = {value : <span class="hljs-number">0</span>}, action) {
  switch (action.type) {
    case 'INCREASE':
      return Object.assign({}, <span class="hljs-keyword">state</span>, {
        value: <span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span>
      })
    case 'DECREASE':
        return Object.assign({}, <span class="hljs-keyword">state</span>, {
        value: <span class="hljs-keyword">state</span>.value - <span class="hljs-number">1</span>
      })
    <span class="hljs-keyword">default</span>:
      return <span class="hljs-keyword">state</span>
  }
}

export <span class="hljs-keyword">default</span> counter</code></pre>
<p>是不是也炒鸡简单，无非就是修改一个state的value参数！这个state是带默认值。</p>
<p>那我们要怎么触发修改呢？</p>
<p>没错，那就是发起action。</p>
<p>3.action.js到底干了些什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { bindActionCreators } from 'redux'

export const INCREASE = 'INCREASE'
export const increase = () => ({ type: INCREASE})

export const DECREASE = 'DECREASE'
export const decrease = () => ({ type: DECREASE})

export const containerActions = dispatch => bindActionCreators({
  increase,
  decrease
}, dispatch)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREASE = <span class="hljs-string">'INCREASE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increase = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-keyword">type</span>: INCREASE})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DECREASE = <span class="hljs-string">'DECREASE'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decrease = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-keyword">type</span>: DECREASE})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> containerActions = <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> bindActionCreators({
  increase,
  decrease
}, dispatch)</code></pre>
<p>bindActionCreators: 是由redux提供的辅助函数<br>参数由{x,y}:action，dispatch：store实例提供</p>
<p>好了好了，到此，我们就把一个完整的redux流程写完了。<br>就这么简单，现在我们来看看把这坨代码扔到create-react-app初始化完的代码里，是不是能运行起来。</p>
<p>App.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { containerActions } from './action'

class App extends Component {
  render() {
    return (
      <div className=&quot;App&quot;>
        <div className=&quot;App-header&quot;>
          <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
          <h2>Welcome to React</h2>
        </div>
        <p className=&quot;App-intro&quot;>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ this.props.increase }>INCREASE</button><br/>
        <button onClick={ this.props.decrease }>DECREASE</button><br/>
        <p>VALUE: {this.props.value}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.value
  }
}
//connect是由react-redux提供的辅助函数，作用是将store state里的值，映射到this.props
//containerActions是把action里的方法绑定到当前组件，也就是App的this.props
export default connect(mapStateToProps, containerActions)(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { containerActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'./action'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome to React<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-intro"</span>&gt;</span>
          To get started, edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">this.props.increase</span> }&gt;</span>INCREASE<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">this.props.decrease</span> }&gt;</span>DECREASE<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>VALUE: {this.props.value}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

const mapStateToProps = (state) =&gt; {
  return {
    value: state.value
  }
}
//connect是由react-redux提供的辅助函数，作用是将store state里的值，映射到this.props
//containerActions是把action里的方法绑定到当前组件，也就是App的this.props
export default connect(mapStateToProps, containerActions)(App);</span></code></pre>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import createStore from './createStore'

let store = createStore()
//通过Provider把store传递到react
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> registerServiceWorker <span class="hljs-keyword">from</span> <span class="hljs-string">'./registerServiceWorker'</span>;
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> createStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./createStore'</span>

<span class="hljs-keyword">let</span> store = createStore()
<span class="hljs-comment">//通过Provider把store传递到react</span>
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>, 
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));
registerServiceWorker();</code></pre>
<p>完美运行。<br>github:<a href="https://github.com/NatPagle/my-create-react-app" rel="nofollow noreferrer" target="_blank">https://github.com/NatPagle/m...</a><br>欢迎同学们跟我一起讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用最简单的方式，了解react全家桶之redux

## 原文链接
[https://segmentfault.com/a/1190000010224521](https://segmentfault.com/a/1190000010224521)


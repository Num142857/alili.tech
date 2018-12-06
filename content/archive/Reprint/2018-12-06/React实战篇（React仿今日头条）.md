---
title: 'React实战篇（React仿今日头条）' 
date: 2018-12-06 2:30:09
hidden: true
slug: xf2q612nkxo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上次初学用 <code>react</code> 写了个<a href="http://dzblog.cn/article/5aa7ef0e4f85ad06d2346688" rel="nofollow noreferrer" target="_blank">后台管理</a>，这次便寻思写个移动端的项目。便有了这次的这个项目。</p>
<p>这个项目以前写了个 <code>vue</code> 的版本。有兴趣的可以 <a href="http://dzblog.cn/article/5a78609ec153997e3417a6d4" rel="nofollow noreferrer" target="_blank">点击进入</a> </p>
<p>模拟数据用的是 <a href="https://easy-mock.com/" rel="nofollow noreferrer" target="_blank">Easy Mock</a> <br>用的是我以前写 <a href="http://dzblog.cn/article/5a78609ec153997e3417a6d4" rel="nofollow noreferrer" target="_blank">vue-toutiao</a> 用到的数据</p>
<p>账号: vue-toutiao<br>  密码： 123456</p>
<h2 id="articleHeader1">技术栈</h2>
<p><code>react</code> + <code>react-redux</code> + <code>react-router</code> + <code>webpack</code></p>
<h2 id="articleHeader2">结构：</h2>
<ul>
<li>build: webpack配置</li>
<li>config: 项目配置参数</li>
<li>src<br><code>actions</code>: 存放 action 方法<br><code>assets</code>: 静态资源文件，存放图片啥的<br><code>components</code>: 常用组件<br><code>reducers</code>: 存放 reducer<br><code>router</code>: 路由管理<br><code>store</code>: 状态管理 redux<br><code>styles</code>: 样式文件<br><code>utils</code>: 常用封装<br><code>views</code>: 视图页面</li>
<li>static: 静态文件： 存放 favicon.ico 等等</li>
</ul>
<h2 id="articleHeader3">效果演示</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014246724" src="https://static.alili.tech/img/remote/1460000014246724" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014246725" src="https://static.alili.tech/img/remote/1460000014246725" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">知识点</h2>
<h3 id="articleHeader5">按需加载</h3>
<p>通过 <code>import()</code> 方法加载组件， 在通过高阶组件处理 <code>import</code> 返回的 <code>Promise</code> 结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// asyncComponent.js
import React from 'react'

export default loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }
        async componentDidMount() {
            if (this.state.Component !== null) return
            try {
                const {default: Component} = await loadComponent()
                this.setState({ Component })
            }catch (err) {
                console.error(`Cannot load component in <AsyncComponent />`);
                throw err
            }
        }

        render() {
            const { Component } = this.state
            return (Component) ? <Component {...this.props} /> : null
        }
    }
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// asyncComponent.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'

export <span class="hljs-keyword">default</span> loadComponent =&gt; (
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        state = {
            <span class="hljs-type">Component</span>: <span class="hljs-literal">null</span>,
        }
        async componentDidMount() {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.<span class="hljs-type">Component</span> !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>
            <span class="hljs-keyword">try</span> {
                const {<span class="hljs-keyword">default</span>: <span class="hljs-type">Component</span>} = await loadComponent()
                <span class="hljs-keyword">this</span>.setState({ <span class="hljs-type">Component</span> })
            }<span class="hljs-keyword">catch</span> (err) {
                console.error(`<span class="hljs-type">Cannot</span> load component in &lt;<span class="hljs-type">AsyncComponent</span> /&gt;`);
                <span class="hljs-keyword">throw</span> err
            }
        }

        render() {
            const { <span class="hljs-type">Component</span> } = <span class="hljs-keyword">this</span>.state
            <span class="hljs-keyword">return</span> (<span class="hljs-type">Component</span>) ? &lt;<span class="hljs-type">Component</span> {...<span class="hljs-keyword">this</span>.props} /&gt; : <span class="hljs-literal">null</span>
        }
    }
)
</code></pre>
<p>如下使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import asyncComponent from './asyncComponent'
const Demo = asyncComponent(() => import(`views/demo.js`))
<Route path=&quot;/demo&quot; component={Demo}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./asyncComponent'</span>
const Demo = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(`<span class="javascript">views/demo.js</span>`))
&lt;Route path=<span class="hljs-string">"/demo"</span> component={Demo}/&gt;</code></pre>
<h3 id="articleHeader6">路由设置</h3>
<p>统一配置路由，及路由状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import asyncComponent from './asyncComponent'
const _import_views = file => asyncComponent(() => import(`views/${file}`))
export const loyoutRouterMap = [
    { 
        path: '/', 
        name: '首页', 
        exact: true,
        component: _import_views('Home')
    },
    { 
        path: '/video', 
        name: '视频',
        component: _import_views('Video')
    },
    { 
        path: '/headline', 
        name: '微头条',
        component: _import_views('Headline')
    },
    { 
        path: '/system', 
        name: '系统设置',
        auth: true, 
        component: _import_views('System')
    }
] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./asyncComponent'</span>
<span class="hljs-keyword">const</span> _import_views = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">`views/<span class="hljs-subst">${file}</span>`</span>))
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loyoutRouterMap = [
    { 
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, 
        <span class="hljs-attr">name</span>: <span class="hljs-string">'首页'</span>, 
        <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">component</span>: _import_views(<span class="hljs-string">'Home'</span>)
    },
    { 
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/video'</span>, 
        <span class="hljs-attr">name</span>: <span class="hljs-string">'视频'</span>,
        <span class="hljs-attr">component</span>: _import_views(<span class="hljs-string">'Video'</span>)
    },
    { 
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/headline'</span>, 
        <span class="hljs-attr">name</span>: <span class="hljs-string">'微头条'</span>,
        <span class="hljs-attr">component</span>: _import_views(<span class="hljs-string">'Headline'</span>)
    },
    { 
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/system'</span>, 
        <span class="hljs-attr">name</span>: <span class="hljs-string">'系统设置'</span>,
        <span class="hljs-attr">auth</span>: <span class="hljs-literal">true</span>, 
        <span class="hljs-attr">component</span>: _import_views(<span class="hljs-string">'System'</span>)
    }
] </code></pre>
<h3 id="articleHeader7">登录拦截</h3>
<p>通过路由配置中 <code>auth</code> 属性来判断是否需要登录 <br>如以下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
    path: '/system', 
    name: '系统设置',
    auth: true, 
    component: _import_views('System')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ 
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/system'</span>, 
    name: <span class="hljs-string">'系统设置'</span>,
    auth: true, 
    component: <span class="hljs-built_in">_import_views</span>(<span class="hljs-string">'System'</span>)
}</code></pre>
<p>登陆配置及判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// authRoute.js
import React from 'react'
import store from '../store'
import { Route, Redirect } from 'react-router-dom'

export default class extends React.Component {
    render () {
        let {component: Component, ...rest} = this.props
        // 是否登录
        if (!store.getState().user.user.name) {
            return <Redirect to='/login' />
        }
        return <Route {...rest}  component={Component}/>
    }
}


// 生成route
const renderRouteComponent = routes => routes.map( (route, index) => {
    if (route.auth) { // 需要权限登录
        return <AuthRoute key={index} {...route}/>
    }
    return <Route key={index} {...route}/>
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// authRoute.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store'</span>
<span class="hljs-keyword">import</span> { Route, Redirect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> React.Component {
    render () {
        <span class="hljs-keyword">let</span> {component: Component, ...rest} = <span class="hljs-keyword">this</span>.props
        <span class="hljs-comment">// 是否登录</span>
        <span class="hljs-keyword">if</span> (!store.getState().user.user.name) {
            <span class="hljs-keyword">return</span> &lt;Redirect to=<span class="hljs-string">'/login'</span> /&gt;
        }
        <span class="hljs-keyword">return</span> &lt;Route {...rest}  component={Component}/&gt;
    }
}


<span class="hljs-comment">// 生成route</span>
<span class="hljs-keyword">const</span> renderRouteComponent = <span class="hljs-function"><span class="hljs-params">routes</span> =&gt;</span> routes.map( <span class="hljs-function">(<span class="hljs-params">route, index</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (route.auth) { <span class="hljs-comment">// 需要权限登录</span>
        <span class="hljs-keyword">return</span> &lt;AuthRoute key={index} {...route}/&gt;
    }
    <span class="hljs-keyword">return</span> &lt;Route key={index} {...route}/&gt;
})</code></pre>
<h3 id="articleHeader8">路由动画</h3>
<p>通过 <a href="https://www.npmjs.com/package/react-router-transition" rel="nofollow noreferrer" target="_blank"><code>react-router-transition</code></a> 做的切换动画。</p>
<p>然后通过 history.slideStatus 来判断如何动画 </p>
<p><a href="https://maisano.github.io/react-router-transition/animated-switch" rel="nofollow noreferrer" target="_blank">react-router-transition 具体API</a></p>
<h3 id="articleHeader9">redux-thunk处理action异步</h3>
<p>用 <code>redux-actions</code> 来书写 action 跟 reducer</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// action.js
import { createAction } from 'redux-actions'
import axios from 'utils/axios'
export const getHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get('headline/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_HEADLINE_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// reducer.js
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
const state = {
    headlineList: []
}
const headline = handleActions({
    GET_HEADLINE_LIST: (state, action) => {
        let list = action.payload
        state.headlineList = state.headlineList.concat(list)
        return {...state}
    }
}, state)
export default combineReducers({
    headline
})

// store.js  
// redux-thunk配置
import { createStore, compose, applyMiddleware  } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
const configureStore => createStore(
    reducer,
    compose(
        applyMiddleware(thunk)
    ) 
)
export default configureStore()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// action.js</span>
<span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'utils/axios'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getHeadlineList = <span class="hljs-function">(<span class="hljs-params">params</span>) =&gt;</span> dispatch =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.get(<span class="hljs-string">'headline/list'</span>, params)
            .then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                <span class="hljs-keyword">const</span> list = res.data.list
                dispatch(createAction(<span class="hljs-string">'GET_HEADLINE_LIST'</span>)(list))
                resolve(list)
            }).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                reject(err)
            })
    })
}

<span class="hljs-comment">// reducer.js</span>
<span class="hljs-keyword">import</span> { handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">headlineList</span>: []
}
<span class="hljs-keyword">const</span> headline = handleActions({
    <span class="hljs-attr">GET_HEADLINE_LIST</span>: <span class="hljs-function">(<span class="hljs-params">state, action</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> list = action.payload
        state.headlineList = state.headlineList.concat(list)
        <span class="hljs-keyword">return</span> {...state}
    }
}, state)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
    headline
})

<span class="hljs-comment">// store.js  </span>
<span class="hljs-comment">// redux-thunk配置</span>
<span class="hljs-keyword">import</span> { createStore, compose, applyMiddleware  } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../reducers'</span>
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>
<span class="hljs-keyword">const</span> configureStore =&gt; createStore(
    reducer,
    compose(
        applyMiddleware(thunk)
    ) 
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> configureStore()
</code></pre>
<blockquote>还有一些零零散散的知识点，就不介绍了，具体可以到 <a href="https://github.com/cd-dongzi/react-toutiao" rel="nofollow noreferrer" target="_blank">github</a> 上查看。</blockquote>
<blockquote>
<a href="https://github.com/cd-dongzi/react-toutiao" rel="nofollow noreferrer" target="_blank">github</a><br><a href="http://dzblog.cn/article/5aca31ccd0597d4709f5337a" rel="nofollow noreferrer" target="_blank">个人博客</a><br><a href="http://dzblog.cn/cases/react-toutiao/index.html" rel="nofollow noreferrer" target="_blank">在线观看地址</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React实战篇（React仿今日头条）

## 原文链接
[https://segmentfault.com/a/1190000014246719](https://segmentfault.com/a/1190000014246719)


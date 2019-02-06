---
title: 'Redux 状态管理方法与实例' 
date: 2019-02-07 2:30:15
hidden: true
slug: y89j6qezpo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>状态管理是目前构建单页应用中不可或缺的一环，也是值得花时间学习的知识点。React官方推荐我们使用Redux来管理我们的React应用，同时也提供了Redux的文档来供我们学习，中文版地址为<a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/index.html</a></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>虽然官方文档上说只需几分钟就能上手 Redux，但是我个人认为即便你看个两三天也可能上手不了，因为文档里面的知识点不仅数量较多，而且还艰涩难懂，不结合一些实例来看很难用于实际项目中去。</p>
<p>但是不要担心自己学不会，这不我就给大家带来了这篇干货，也是我学习Redux的心得体验。</p>
<p>如果你对如何构建React单页应用还不了解的可以先移步我的上一篇文章<a href="https://segmentfault.com/a/1190000005703694">《React 构建单页应用方法与实例》</a>。</p>
<p>那么下面我就将介绍如何利用Redux来管理你的React项目了，而这里我主要教你构建的是基于<strong>React + Redux + React-Router</strong>的方法，这也是官方文档里介绍的比较少但是项目中却必备的知识点。</p>
<h2 id="articleHeader1">项目目录</h2>
<p>首先，一个基于React + Redux + React-Router的项目目录可以按照我下方的图片来构建：</p>
<p><span class="img-wrap"><img data-src="/img/bVy2Or" src="https://static.alili.tech/img/bVy2Or" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其中assets目录用于存放项目的静态资源，如css/图片等，src目录则用于存放React的组件资源。</p>
<h2 id="articleHeader2">入口文件配置</h2>
<p>在webpack的配置项中，我们需要一个或多个入口文件，这里我就不展示关于package.json及webpack.config.js的文件配置，最后我会提供整个项目的下载链接供大家参考。这里我主要介绍下入口文件index.js的配置说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'  // 引入React
import { render } from 'react-dom' // 引入render方法
import { Provider } from 'react-redux' // 利用Provider可以使我们的 store 能为下面的组件所用
import { Router, browserHistory } from 'react-router' // Browser history 是由 React Router 创建浏览器应用推荐的 history
import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件

import finalCreateStore from './src/store/configureStore'  //引入增强后的store
import DevTools from './src/containers/DevTools'  // 引入Redux调试工具DevTools
import reducer from './src/reducers'  // 引入reducers集合
import routes from './src/routes'   // 引入路由配置

import './assets/css/bootstrap.min.css'  // 引入样式文件

// 给增强后的store传入reducer
const store = finalCreateStore(reducer)

// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(browserHistory, store)

render(
    {/* 利用Provider包裹页面 */}
    <Provider store={store}>
        <div>
            {/* 渲染根路由 */}
            <Router history={history} routes={routes} />
            {/* 渲染调试组件 */}
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('mount')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>  <span class="hljs-comment">// 引入React</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span> <span class="hljs-comment">// 引入render方法</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span> <span class="hljs-comment">// 利用Provider可以使我们的 store 能为下面的组件所用</span>
<span class="hljs-keyword">import</span> { Router, browserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span> <span class="hljs-comment">// Browser history 是由 React Router 创建浏览器应用推荐的 history</span>
<span class="hljs-keyword">import</span> { syncHistoryWithStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span> <span class="hljs-comment">// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件</span>

<span class="hljs-keyword">import</span> finalCreateStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/store/configureStore'</span>  <span class="hljs-comment">//引入增强后的store</span>
<span class="hljs-keyword">import</span> DevTools <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/containers/DevTools'</span>  <span class="hljs-comment">// 引入Redux调试工具DevTools</span>
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/reducers'</span>  <span class="hljs-comment">// 引入reducers集合</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/routes'</span>   <span class="hljs-comment">// 引入路由配置</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/css/bootstrap.min.css'</span>  <span class="hljs-comment">// 引入样式文件</span>

<span class="hljs-comment">// 给增强后的store传入reducer</span>
<span class="hljs-keyword">const</span> store = finalCreateStore(reducer)

<span class="hljs-comment">// 创建一个增强版的history来结合store同步导航事件</span>
<span class="hljs-keyword">const</span> history = syncHistoryWithStore(browserHistory, store)

render(
    {<span class="hljs-comment">/* 利用Provider包裹页面 */</span>}
    &lt;Provider store={store}&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            {/* 渲染根路由 */}
            <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span> <span class="hljs-attr">routes</span>=<span class="hljs-string">{routes}</span> /&gt;</span>
            {/* 渲染调试组件 */}
            <span class="hljs-tag">&lt;<span class="hljs-name">DevTools</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mount'</span>)
)</code></pre>
<p>在入口文件中我们尽量只需要保留基本的东西，其余的配置代码我们可以放到相应的配置文件中去，比如路由、reducers及store的配置等。这里我都把它们放置到了独立的js中，只在入口文件中通过import引入，这样管理和维护起来会非常方便，但也会相应增加理解的难度，然而一旦上手就会很容易。那么接下来我们再来看下store配置吧。</p>
<h2 id="articleHeader3">store配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import thunk from 'redux-thunk' // redux-thunk 支持 dispatch function，并且可以异步调用它
import createLogger from 'redux-logger' // 利用redux-logger打印日志
import { createStore, applyMiddleware, compose } from 'redux' // 引入redux createStore、中间件及compose 
import DevTools from '../containers/DevTools' // 引入DevTools调试组件

// 调用日志打印方法
const loggerMiddleware = createLogger()

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware]

// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
)(createStore)

export default finalCreateStore
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span> <span class="hljs-comment">// redux-thunk 支持 dispatch function，并且可以异步调用它</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-logger'</span> <span class="hljs-comment">// 利用redux-logger打印日志</span>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware, compose } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span> <span class="hljs-comment">// 引入redux createStore、中间件及compose </span>
<span class="hljs-keyword">import</span> DevTools <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/DevTools'</span> <span class="hljs-comment">// 引入DevTools调试组件</span>

<span class="hljs-comment">// 调用日志打印方法</span>
<span class="hljs-keyword">const</span> loggerMiddleware = createLogger()

<span class="hljs-comment">// 创建一个中间件集合</span>
<span class="hljs-keyword">const</span> middleware = [thunk, loggerMiddleware]

<span class="hljs-comment">// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用</span>
<span class="hljs-keyword">const</span> finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
)(createStore)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> finalCreateStore
</code></pre>
<p>这里我们需要了解中间件（Middleware）的概念。middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码，你可以在一个项目中使用多个独立的第三方 middleware，如上面的redux-thunk和redux-logger。详细资料请参考官方文档：<a href="http://cn.redux.js.org/docs/advanced/Middleware.html" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/docs/advanced/Middleware.html</a>。</p>
<h2 id="articleHeader4">路由配置</h2>
<p>上面的入口文件配置中我们把路由配置部分单独放到了routes.js的文件中，这里我们就来看下其配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react' // 引入react
import { Route, IndexRoute } from 'react-router' // 引入react路由
import { App, Home, Foo, Bar, Antd } from './containers' // 引入各容器组件

export default (
    <Route path=&quot;/&quot; component={App}>
        <IndexRoute component={Home}/>
        <Route path=&quot;index&quot; component={Home}/>
        <Route path=&quot;foo&quot; component={Foo}/>
        <Route path=&quot;bar&quot; component={Bar}/>
        <Route path=&quot;antd&quot; component={Antd}/>
    </Route>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import React from 'react' // 引入react
import </span><span class="hljs-template-variable">{ Route, IndexRoute }</span><span class="xml"> from 'react-router' // 引入react路由
import </span><span class="hljs-template-variable">{ App, Home, Foo, Bar, Antd }</span><span class="xml"> from './containers' // 引入各容器组件

export default (
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{App}</span><span class="xml"><span class="hljs-tag">&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"foo"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Foo}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"bar"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Bar}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"antd"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Antd}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
)</span></code></pre>
<p>这里的路由配置和不使用redux时候是一样的，唯一需要了解的是<strong>容器组件</strong>和<strong>展示组件</strong>的概念。上面配置文件中的路由加载的组件都可以认为是容器组件。</p>
<ol>
<li><p>顾名思义，展示组件包含在容器组件中，只用作页面展示，不会定义数据如何读取如何改变，只通过this.props接受数据和回调函数；</p></li>
<li><p>而容器组件中包含各展示组件的数据，即Props，它们为展示组件或其他组件提供数据和方法。</p></li>
</ol>
<p>我们应该把它们放在不同的文件夹中，以示区别，如上面“项目目录”中的containers和components文件夹分别存放容器组件和展示组件。具体说明可以参考文章：<a href="http://www.jianshu.com/p/6fa2b21f5df3" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/6fa2b21f5df3</a>。</p>
<h2 id="articleHeader5">根组件配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react' // 引入React
import { Link } from 'react-router' // 引入Link处理导航跳转

export default class App extends Component {
    render() {
        return(
            <div>
                <nav className=&quot;navbar navbar-default&quot;>
                    <div className=&quot;container-fluid&quot;>
                        <div className=&quot;navbar-header&quot;>
                            <span className=&quot;navbar-brand&quot; href=&quot;#&quot;>
                                <Link to=&quot;/&quot;>Redux</Link>
                            </span>
                        </div>
                        <ul className=&quot;nav navbar-nav&quot;>
                            <li>
                                <Link to=&quot;/index&quot; activeStyle="{{"color: '#555', backgroundColor: '#e7e7e7'"}}">计数器</Link>
                            </li>
                            <li>
                                <Link to=&quot;/foo&quot; activeStyle="{{"color: '#555', backgroundColor: '#e7e7e7'"}}">静态数据</Link>
                            </li>
                            <li>
                                <Link to=&quot;/bar&quot; activeStyle="{{"color: '#555', backgroundColor: '#e7e7e7'"}}">动态数据</Link>
                            </li>
                            <li>
                                <Link to=&quot;/antd&quot; activeStyle="{{"color: '#555', backgroundColor: '#e7e7e7'"}}">结合antd</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className=&quot;panel panel-default&quot;>
                    <div className=&quot;panel-body&quot;>
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span> <span class="hljs-comment">// 引入React</span>
<span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span> <span class="hljs-comment">// 引入Link处理导航跳转</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"navbar navbar-default"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container-fluid"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"navbar-header"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"navbar-brand"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Redux<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"nav navbar-nav"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"color:</span> '#<span class="hljs-attr">555</span>', <span class="hljs-attr">backgroundColor:</span> '#<span class="hljs-attr">e7e7e7</span>'"}}"&gt;</span>计数器<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/foo"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"color:</span> '#<span class="hljs-attr">555</span>', <span class="hljs-attr">backgroundColor:</span> '#<span class="hljs-attr">e7e7e7</span>'"}}"&gt;</span>静态数据<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/bar"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"color:</span> '#<span class="hljs-attr">555</span>', <span class="hljs-attr">backgroundColor:</span> '#<span class="hljs-attr">e7e7e7</span>'"}}"&gt;</span>动态数据<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/antd"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"color:</span> '#<span class="hljs-attr">555</span>', <span class="hljs-attr">backgroundColor:</span> '#<span class="hljs-attr">e7e7e7</span>'"}}"&gt;</span>结合antd<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"panel panel-default"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"panel-body"</span>&gt;</span>
                        { this.props.children }
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>整个根组件App.js主要渲染了整个应用的导航和可变区域，这其实和Redux没有关系。需要注意的是to中的URL地址需要和routes.js中的path地址名称一致。</p>
<p>写到这里还没有介绍Redux中的Action及Reducer的配置，那么接下来就来介绍下。</p>
<h2 id="articleHeader6">Action配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } from '../constants'  // 引入action类型名常量
import 'whatwg-fetch'  // 可以引入fetch来进行Ajax

// 这里的方法返回一个action对象
export const increase = n => {
    return {
        type: INCREASE,
        amount: n
    }
}

export const decrease = n => {
    return {
        type: DECREASE,
        amount: n
    }
}

export const refreshData = () => {
    return {
        type: REFRESHDATA
    }
}

export const getSuccess = (json) => {
    return {
        type: GETSUCCESS,
        json
    }
}

function fetchPosts() {
    return dispatch => {
        return fetch('data.json')
            .then((res) => { console.log(res.status); return res.json() })
            .then((data) => {
                dispatch(getSuccess(data))
            })
            .catch((e) => { console.log(e.message) })
        }
}

// 这里的方法返回一个函数进行异步操作
export function fetchPostsIfNeeded() {

    // 注意这个函数也接收了 getState() 方法
    // 它让你选择接下来 dispatch 什么
    return (dispatch, getState) => {
        return dispatch(fetchPosts())
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } <span class="hljs-keyword">from</span> <span class="hljs-string">'../constants'</span>  <span class="hljs-comment">// 引入action类型名常量</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'whatwg-fetch'</span>  <span class="hljs-comment">// 可以引入fetch来进行Ajax</span>

<span class="hljs-comment">// 这里的方法返回一个action对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increase = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: INCREASE,
        amount: n
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decrease = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: DECREASE,
        amount: n
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> refreshData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: REFRESHDATA
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getSuccess = <span class="hljs-function">(<span class="hljs-params">json</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">type</span>: GETSUCCESS,
        json
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchPosts</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'data.json'</span>)
            .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> { <span class="hljs-built_in">console</span>.log(res.status); <span class="hljs-keyword">return</span> res.json() })
            .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
                dispatch(getSuccess(data))
            })
            .catch(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> { <span class="hljs-built_in">console</span>.log(e.message) })
        }
}

<span class="hljs-comment">// 这里的方法返回一个函数进行异步操作</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchPostsIfNeeded</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">// 注意这个函数也接收了 getState() 方法</span>
    <span class="hljs-comment">// 它让你选择接下来 dispatch 什么</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> dispatch(fetchPosts())
    }
}</code></pre>
<p>上面返回一个action对象的方法叫做“<strong>action 创建函数</strong>”，它就是生成action的方法，也是store数据的唯一来源。</p>
<p>上面返回一个函数的方法叫做“<strong>异步action</strong>”，这里使用的是Redux Thunk middleware，要引入redux-thunk这个专门的库才能使用，这样我们就可以实现异步Ajax请求改变状态等功能了。</p>
<h2 id="articleHeader7">Reducer配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducers/count.js
import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } from '../constants' // 引入action类型常量名

// 初始化state数据
const initialState = {
    number: 1,
    lists: [
        {text: '整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。'}, 
        {text: '惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。'},
        {text: '为了描述 action 如何改变 state tree ，你需要编写 reducers。'},
        {text: '就是这样，现在你应该明白 Redux 是怎么回事了。'}
    ],
    data: []
}

// 通过dispatch action进入
export default function update(state = initialState, action) {

    // 根据不同的action type进行state的更新
    switch(action.type) {
        case INCREASE:
            return Object.assign({}, state, { number: state.number + action.amount })
            break
        case DECREASE:
            return Object.assign({}, state, { number: state.number - action.amount })
            break
        case GETSUCCESS:
            return Object.assign({}, state, { data: action.json })
        case REFRESHDATA:
            return Object.assign({}, state, { data: [] })
        default:
            return state
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// reducers/count.js
import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } <span class="hljs-keyword">from</span> '../constants' // 引入action类型常量名

// 初始化<span class="hljs-keyword">state</span>数据
const initialState = {
    number: <span class="hljs-number">1</span>,
    lists: [
        {text: '整个应用的 <span class="hljs-keyword">state</span> 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。'}, 
        {text: '惟一改变 <span class="hljs-keyword">state</span> 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。'},
        {text: '为了描述 action 如何改变 <span class="hljs-keyword">state</span> tree ，你需要编写 reducers。'},
        {text: '就是这样，现在你应该明白 Redux 是怎么回事了。'}
    ],
    data: []
}

// 通过dispatch action进入
export <span class="hljs-keyword">default</span> function update(<span class="hljs-keyword">state</span> = initialState, action) {

    // 根据不同的action type进行<span class="hljs-keyword">state</span>的更新
    switch(action.type) {
        case INCREASE:
            return Object.assign({}, <span class="hljs-keyword">state</span>, { number: <span class="hljs-keyword">state</span>.number + action.amount })
            break
        case DECREASE:
            return Object.assign({}, <span class="hljs-keyword">state</span>, { number: <span class="hljs-keyword">state</span>.number - action.amount })
            break
        case GETSUCCESS:
            return Object.assign({}, <span class="hljs-keyword">state</span>, { data: action.json })
        case REFRESHDATA:
            return Object.assign({}, <span class="hljs-keyword">state</span>, { data: [] })
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import update from './count' // 引入update这个reducer

export default combineReducers({
    update,
    routing: routerReducer
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// reducers/index.js</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span> <span class="hljs-comment">// 利用combineReducers 合并reducers</span>
<span class="hljs-keyword">import</span> { routerReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span> <span class="hljs-comment">// 将routerReducer一起合并管理</span>
<span class="hljs-keyword">import</span> update <span class="hljs-keyword">from</span> <span class="hljs-string">'./count'</span> <span class="hljs-comment">// 引入update这个reducer</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
    update,
    <span class="hljs-attr">routing</span>: routerReducer
})</code></pre>
<p>这里我们主要需要了解如何通过combineReducers来合并reducers，同时在进入reducer方法后我们必须返回一个state的处理结果来更新state状态，否则会报错。还需注意的是在合并reducers的时候，需要加上routerReducer这个由“react-router-redux”提供的reducer来管理路由的状态更新。</p>
<h2 id="articleHeader8">容器组件</h2>
<p>上文提到了容器组件和展示组件的区别和含义，这里我们需要在容器组件使用connect来搭配Redux来进行状态管理，这是很关键的一步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react' // 引入React
import { connect } from 'react-redux' // 引入connect 
import List from '../components/List'  // 引入展示组件List

export default class Foo extends Component {
    render() {
    
        // 通过this.props获取到lists的值
        const { lists } = this.props

        return(
            <div>
                <ul className=&quot;list-group&quot;>
                    {将值传入展示组件}
                    { lists.map((e, index) => 
                        <List text={e.text} key={index}></List>
                    )}
                </ul>
            </div>
        )
    }
}

// 验证组件中的参数类型
Foo.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
}

// 获取state中的lists值
const getList = state => {
    return {
        lists: state.update.lists
    }
}

// 利用connect将组件与Redux绑定起来
export default connect(getList)(Foo)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component, PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span> <span class="hljs-comment">// 引入React</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span> <span class="hljs-comment">// 引入connect </span>
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/List'</span>  <span class="hljs-comment">// 引入展示组件List</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
    
        <span class="hljs-comment">// 通过this.props获取到lists的值</span>
        <span class="hljs-keyword">const</span> { lists } = <span class="hljs-keyword">this</span>.props

        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
                    {将值传入展示组件}
                    { lists.map((e, index) =&gt; 
                        <span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">text</span>=<span class="hljs-string">{e.text}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span>
                    )}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-comment">// 验证组件中的参数类型</span>
Foo.propTypes = {
    <span class="hljs-attr">lists</span>: PropTypes.arrayOf(PropTypes.shape({
        <span class="hljs-attr">text</span>: PropTypes.string.isRequired
    }).isRequired).isRequired
}

<span class="hljs-comment">// 获取state中的lists值</span>
<span class="hljs-keyword">const</span> getList = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">lists</span>: state.update.lists
    }
}

<span class="hljs-comment">// 利用connect将组件与Redux绑定起来</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(getList)(Foo)</code></pre>
<p>在容器组件中我们需要获取state中的初始状态的时候，我们需要使用connect。任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。详资料请参考文档：<a href="http://cn.redux.js.org/docs/basics/UsageWithReact.html" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/docs/basics/UsageWithReact.html</a>。</p>
<h2 id="articleHeader9">展示组件</h2>
<p>上面的容器组件中引入了一个展示组件List，我们来看下它的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component, PropTypes } from 'react'

export default class List extends Component {
    render() {
        return(
            <li className=&quot;list-group-item&quot;>{this.props.text}</li>
        )
    }
}

List.propTypes = {
    text: PropTypes.string.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span>, <span class="hljs-type">PropTypes</span> } from <span class="hljs-symbol">'reac</span>t'

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span>(
            &lt;li className=<span class="hljs-string">"list-group-item"</span>&gt;{<span class="hljs-keyword">this</span>.props.text}&lt;/li&gt;
        )
    }
}

<span class="hljs-type">List</span>.propTypes = {
    text: <span class="hljs-type">PropTypes</span>.string.isRequired
}</code></pre>
<p>从中我们可以发现，展示组件没有connect的方法，数据是通过this.props来获取的，这样的方式能够是数据的变化清晰可查，便于管理和维护。</p>
<h2 id="articleHeader10">demo演示</h2>
<p>最后我们来看下这个demo：</p>
<p><span class="img-wrap"><img data-src="/img/bVy3Du" src="https://static.alili.tech/img/bVy3Du" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>整个demo的代码我都上传到了我的github，需要的童鞋可以访问：<a href="https://github.com/luozhihao/redux-basic-example" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/redux-basic-example</a>下载。</p>
<h2 id="articleHeader11">总结</h2>
<blockquote><p>Redux的知识点繁多，这里只做了大概的介绍，剩下的还需要自己不断的摸索和实践。希望本文能够帮助你了解利用redux构建项目的大体流程。</p></blockquote>
<p>此致敬礼</p>
<p>本文地址：<a href="https://segmentfault.com/a/1190000005933397">https://segmentfault.com/a/1190000005933397</a><br>博客园：<a href="http://www.cnblogs.com/luozhihao/p/5660496.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/luozhihao/p/5660496.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux 状态管理方法与实例

## 原文链接
[https://segmentfault.com/a/1190000005933397](https://segmentfault.com/a/1190000005933397)


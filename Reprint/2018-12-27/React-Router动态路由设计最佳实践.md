---
title: 'React-Router动态路由设计最佳实践' 
date: 2018-12-27 2:30:12
hidden: true
slug: mqaao4jxq69
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<blockquote><p>随着单页应用（SPA）概念的日趋火热，React框架在设计和实践中同样也围绕着SPA的概念来打造自己的技术栈体系，其中路由模块便是非常重要的一个组成部分。它承载着应用功能分区，复杂模块组织，数据传递，应用状态维护等诸多功能，如何结合好React框架的技术栈特性来进行路由模块设计就显得尤为重要，本文则以探索React动态路由设计最佳实践作为切入点，分享下在实际项目开发中的心得与体会。</p></blockquote>
<h2 id="articleHeader1">为什么需要做动态路由</h2>
<blockquote><p>动态路由：对于大型应用来说，一个首当其冲的问题就是所需加载的 JavaScript 的大小。程序应当只加载当前渲染页所需的 JavaScript。有些开发者将这种方式称之为 "代码分拆(code-splitting)" — 将所有的代码分拆成多个小包，在用户浏览过程中按需加载。</p></blockquote>
<h3 id="articleHeader2">1. 首屏加载效率</h3>
<p>随着项目的业务需求持续添加，react中的代码复杂度将面临着持续上升的问题，同时由于react中的jsx和es6语法的文件在实际生产环境中，也会被babel-js重新编译成浏览器所支持的基于ES5的语法模块，各个模块打体积将会变得非常的臃肿不堪，直接影响到页面加载的等待时常。以下图为例，如果不做处理，我们的业务模块通常体积会达到兆级，这对首屏加载速率和用户体验的影响无疑是巨大的。</p>
<p><span class="img-wrap"><img data-src="/img/bVXwOt?w=1510&amp;h=676" src="https://static.alili.tech/img/bVXwOt?w=1510&amp;h=676" alt="all_chunk" title="all_chunk" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">2. 降低模块间的功能影响</h3>
<p>react中的jsx无疑是一个很方便的设计，能让开发者像写html一样来书写虚拟dom，但是它同样也贯彻执行着"all in js"的理念，最终构建完成后所有的业务代码都将打包到1-2个bundle文件中，这就等于将所有的功能模块都集中到了一个物理文件中，如果遇到业务处理的复杂性，接口层变更，异常处理出错等诸多代码健壮性问题时，一个子模块出现了错误，就很有可能导致用户界面整体性出错从而无法使用的风险。此外，如果业务模块需要分功能上线的时候，降低彼此之间的影响也是必须要考虑的。</p>
<h3 id="articleHeader4">3. 符合二八定律</h3>
<p>通常在一个应用中，最重要和高频访的功能模块只占其中一小部分，约20%，其余80%尽管是多数，却是次要的。以后台系统为例，普通业务人员通常使用的高频模块只有3-5个，但是业务系统通常会有各式各样的权限设计，不同的权限映射着能访问的路由模块也不尽相同，虽然我们可以在用户的数据访问和路由地址上做拦截限制，但是同样也需要对其能访问的模块资源进行限制，才能做到真正的按需加载，随取随用。</p>
<h3 id="articleHeader5">4. 工具体系支撑</h3>
<p>无论是react-router还是对应搭配的构建工具webpack，其中都有针对动态路由部分的设计与优化，使用好了往往能起到事半功倍的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVXAnW?w=1728&amp;h=680" src="https://static.alili.tech/img/bVXAnW?w=1728&amp;h=680" alt="chunk_split2" title="chunk_split2" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">简化版实现：bundle-loader</h2>
<p><a href="https://webpack.js.org/loaders/bundle-loader/" rel="nofollow noreferrer" target="_blank">bundle-loader</a>是webpack官方出品与维护的一个loader，主要用来处理异步模块的加载，将简单的页面模块转成异步模块，非常方便。</p>
<h3 id="articleHeader7">1. 改造前页面</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import {Route, Router} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import './app.less'

import ReactChildrenMap from './containers/Commons/ReactChildrenMap'
import Home from './containers/Home/Home'
import Search from './containers/Search/Search'
import BookList from './containers/BookList/BookList'
import BookDetail from './containers/BookDetail/bookDetail.bundle.js'

const history = createHistory()

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route render={({location}) => {
          return (
            <ReactChildrenMap key={location.pathname}>
              <Route location={location} exact path=&quot;/&quot; component={Home}/>
              <Route location={location} path=&quot;/search&quot; component={Search}/>
              <Route location={location} path=&quot;/detail&quot; component={BookDetail}/>
              <Route location={location} path=&quot;/bookList/:bookId&quot; component={BookList}/>
            </ReactChildrenMap>
          )
        "}}"/>
      </Router>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {Route, Router} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createHashHistory'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./app.less'</span>

<span class="hljs-keyword">import</span> ReactChildrenMap <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Commons/ReactChildrenMap'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Home/Home'</span>
<span class="hljs-keyword">import</span> Search <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Search/Search'</span>
<span class="hljs-keyword">import</span> BookList <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookList/BookList'</span>
<span class="hljs-keyword">import</span> BookDetail <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookDetail/bookDetail.bundle.js'</span>

<span class="hljs-keyword">const</span> history = createHistory()

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;Router history={history}&gt;
        &lt;Route render={({location}) =&gt; {
          return (
            &lt;ReactChildrenMap key={location.pathname}&gt;
              &lt;Route location={location} exact path="/" component={Home}/&gt;
              &lt;Route location={location} path="/search" component={Search}/&gt;
              &lt;Route location={location} path="/detail" component={BookDetail}/&gt;
              &lt;Route location={location} path="/bookList/:bookId" component={BookList}/&gt;
            &lt;/ReactChildrenMap&gt;
          )
        "}}"/&gt;
      &lt;/Router&gt;
    );
  }
}</code></pre>
<h3 id="articleHeader8">2. 在webpack.config.js中增加rules</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm install bundle-loader -D
// 如果不想通过配置调用，也可以写成: import file from &quot;bundle-loader?lazy&amp;name=my-chunk!./file.js&quot;的内嵌写法

module.exports = {
  module: {
    rules: [
      {
        test: /\.bundle\.js$/, // 通过文件名后缀自动处理需要转成bundle的文件
        include: /src/,
        exclude: /node_modules/,
        use: [{
          loader: 'bundle-loader',
          options: {
            name: 'app-[name]',
            lazy: true
          }
        }, {
          loader: 'babel-loader',
        }]
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// npm install bundle-loader -D</span>
<span class="hljs-comment">// 如果不想通过配置调用，也可以写成: import file from "bundle-loader?lazy&amp;name=my-chunk!./file.js"的内嵌写法</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.bundle\.js$/</span>, <span class="hljs-comment">// 通过文件名后缀自动处理需要转成bundle的文件</span>
        include: <span class="hljs-regexp">/src/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'bundle-loader'</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'app-[name]'</span>,
            <span class="hljs-attr">lazy</span>: <span class="hljs-literal">true</span>
          }
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        }]
      }
    ]
  }
}</code></pre>
<h3 id="articleHeader9">3. 在工程中使用带 xxx.bunlde.js结尾的类型文件时，就会被bundle-loader识别并做编译处理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bundle-loader处理前
import BookDetail from './containers/BookDetail/bookDetail.bundle.js'

// bundle-loader处理后
module.exports = function(cb) {
  // 自动会被bundle-loader处理成异步加载的写法
  require.ensure([], function(require) {
    cb(require(&quot;!!../../../node_modules/babel-loader/lib/index.js!./bookDetail.bundle.js&quot;));
  }, &quot;app-bookDetail.bundle&quot;);
}
// WEBPACK FOOTER //
// ./containers/BookDetail/bookDetail.bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bundle-loader处理前</span>
<span class="hljs-keyword">import</span> BookDetail <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookDetail/bookDetail.bundle.js'</span>

<span class="hljs-comment">// bundle-loader处理后</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
  <span class="hljs-comment">// 自动会被bundle-loader处理成异步加载的写法</span>
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    cb(<span class="hljs-built_in">require</span>(<span class="hljs-string">"!!../../../node_modules/babel-loader/lib/index.js!./bookDetail.bundle.js"</span>));
  }, <span class="hljs-string">"app-bookDetail.bundle"</span>);
}
<span class="hljs-comment">// WEBPACK FOOTER //</span>
<span class="hljs-comment">// ./containers/BookDetail/bookDetail.bundle.js</span></code></pre>
<h3 id="articleHeader10">4. 创建LazyBundle.js文件，这个文件会用来调用被bundle-loader处理后的组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// LazyBundle.js
import React, { Component } from 'react'

export default class LazyBundle extends React.Component {

  state = {
    // short for &quot;module&quot; but that's a keyword in js, so &quot;mod&quot;
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    if (!this.state.mod) {
      return false
    }
    return this.props.children(this.state.mod)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// LazyBundle.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LazyBundle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  state = {
    <span class="hljs-comment">// short for "module" but that's a keyword in js, so "mod"</span>
    mod: <span class="hljs-literal">null</span>
  }

  componentWillMount() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.props)
  }

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (nextProps.load !== <span class="hljs-keyword">this</span>.props.load) {
      <span class="hljs-keyword">this</span>.load(nextProps)
    }
  }

  load(props) {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">mod</span>: <span class="hljs-literal">null</span>
    })
    
    props.load(<span class="hljs-function">(<span class="hljs-params">mod</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-comment">// handle both es imports and cjs</span>
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.state.mod) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.mod)
  }
}</code></pre>
<h3 id="articleHeader11">5. 对我们需要异步加载的组件函数进行二次封装</h3>
<blockquote><p>注：react-router3和4由于是不兼容升级，所以处理动态路由的方法也略有不同，在此列出了两种版本下的处理方式可供参考</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import LazyBundle from './LazyBundle'
import BookDetail from './containers/BookDetail/bookDetail.bundle.js'

/* use for react-router4
 * component={lazyLoadComponent(BookDetail)}
 */
const lazyLoadComponent = (comp) => (props) => (
  <LazyBundle load={comp}>
    {(Container) => <Container {...props}/>}
  </LazyBundle>
)

/* use for react-router3
 * getComponent={lazyLoadComponentOld(BookDetail)}
 */
function lazyLoadComponentOld(comp) {
  return (location, cb) => {
    comp(module => cb(null, module.default));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> LazyBundle <span class="hljs-keyword">from</span> <span class="hljs-string">'./LazyBundle'</span>
<span class="hljs-keyword">import</span> BookDetail <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookDetail/bookDetail.bundle.js'</span>

<span class="hljs-comment">/* use for react-router4
 * component={lazyLoadComponent(BookDetail)}
 */</span>
<span class="hljs-keyword">const</span> lazyLoadComponent = <span class="hljs-function">(<span class="hljs-params">comp</span>) =&gt;</span> (props) =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">LazyBundle</span> <span class="hljs-attr">load</span>=<span class="hljs-string">{comp}</span>&gt;</span>
    {(Container) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Container</span> {<span class="hljs-attr">...props</span>}/&gt;</span>}
  <span class="hljs-tag">&lt;/<span class="hljs-name">LazyBundle</span>&gt;</span>
)

/* use for react-router3
 * getComponent={lazyLoadComponentOld(BookDetail)}
 */
function lazyLoadComponentOld(comp) {
  return (location, cb) =&gt; {
    comp(module =&gt; cb(null, module.default));
  }
}</span></code></pre>
<h3 id="articleHeader12">6. 改造后页面</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import {Route, Router} from 'react-router-dom'
import createHistory from 'history/createHashHistory'

const history = createHistory()

import './app.less'

import Home from 'containers/Home/Home'
import ReactChildrenMap from './containers/Commons/ReactChildrenMap'
import Search from './containers/Search/Search'
import BookList from './containers/BookList/BookList'
import LazyBundle from './LazyBundle'
import BookDetail from './containers/BookDetail/bookDetail.bundle.js'

/* use for react-router4
 * component={lazyLoadComponent(BookDetail)}
 */
const lazyLoadComponent = (comp) => (props) => (
  <LazyBundle load={comp}>
    {(Container) => <Container {...props}/>}
  </LazyBundle>
)

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route render={({location}) => {
          return (
            <ReactChildrenMap key={location.pathname}>
              <Route location={location} exact path=&quot;/&quot; component={Home}/>
              <Route location={location} path=&quot;/search&quot; component={Search}/>
              <Route location={location} path=&quot;/detail&quot; component={lazyLoadComponent(BookDetail)} />
              <Route location={location} path=&quot;/bookList/:bookId&quot; component={BookList}/>
            </ReactChildrenMap>
          )
        "}}"/>
      </Router>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {Route, Router} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createHashHistory'</span>

<span class="hljs-keyword">const</span> history = createHistory()

<span class="hljs-keyword">import</span> <span class="hljs-string">'./app.less'</span>

<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'containers/Home/Home'</span>
<span class="hljs-keyword">import</span> ReactChildrenMap <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Commons/ReactChildrenMap'</span>
<span class="hljs-keyword">import</span> Search <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Search/Search'</span>
<span class="hljs-keyword">import</span> BookList <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookList/BookList'</span>
<span class="hljs-keyword">import</span> LazyBundle <span class="hljs-keyword">from</span> <span class="hljs-string">'./LazyBundle'</span>
<span class="hljs-keyword">import</span> BookDetail <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/BookDetail/bookDetail.bundle.js'</span>

<span class="hljs-comment">/* use for react-router4
 * component={lazyLoadComponent(BookDetail)}
 */</span>
<span class="hljs-keyword">const</span> lazyLoadComponent = <span class="hljs-function">(<span class="hljs-params">comp</span>) =&gt;</span> (props) =&gt; (
  &lt;LazyBundle load={comp}&gt;
    {(Container) =&gt; &lt;Container {...props}/&gt;}
  &lt;/LazyBundle&gt;
)

export default class App extends React.Component {
  render() {
    return (
      &lt;Router history={history}&gt;
        &lt;Route render={({location}) =&gt; {
          return (
            &lt;ReactChildrenMap key={location.pathname}&gt;
              &lt;Route location={location} exact path="/" component={Home}/&gt;
              &lt;Route location={location} path="/search" component={Search}/&gt;
              &lt;Route location={location} path="/detail" component={lazyLoadComponent(BookDetail)} /&gt;
              &lt;Route location={location} path="/bookList/:bookId" component={BookList}/&gt;
            &lt;/ReactChildrenMap&gt;
          )
        "}}"/&gt;
      &lt;/Router&gt;
    );
  }
}</code></pre>
<p>完成构建后我们就可以从浏览器中看到，我们定制后的模块已经被能被支持异步加载了<br><span class="img-wrap"><img data-src="/img/bVXAn8?w=1782&amp;h=796" src="https://static.alili.tech/img/bVXAn8?w=1782&amp;h=796" alt="bundle_chunk" title="bundle_chunk" style="cursor: pointer;"></span></p>
<p>同时在webpack构建中也能清晰地看到多了一个chunk：</p>
<p><span class="img-wrap"><img data-src="/img/bVXAog?w=1700&amp;h=498" src="https://static.alili.tech/img/bVXAog?w=1700&amp;h=498" alt="bundle_name" title="bundle_name" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">高阶版实现：dynamic-imports</h2>
<p><a href="https://webpack.js.org/guides/code-splitting/#dynamic-imports" rel="nofollow noreferrer" target="_blank">dynamic-imports</a>是webpack在升级到2版本以后，对js的模块处理进行了增强的，其中就有对require.ensure的改进，基于原生的Promise对象进行了重新实现，采用了import()作为资源加载方法，将其看做一个分割点并将其请求的module打包为一个独立的chunk。import()以模块名称作为参数并且返回一个Promise对象，具体介绍可以参考笔者之前写过的翻译文章<a href="https://segmentfault.com/a/1190000008181955#articleHeader25">Webpack2 升级指南和特性摘要</a>，具体使用比对如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// require.ensure
module.exports = function (cb) {
  require.ensure([], function(require) {
    var app = require('./file.js');
    cb(app);
  }, &quot;custom-chunk-name&quot;);
};

// import()
import(&quot;./module&quot;).then(module => {
    return module.default;
}).catch(err => {
    console.log(&quot;Chunk loading failed&quot;);
});
// This creates a separate chunk for each possible route
​````" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// require.ensure</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb</span>) </span>{
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./file.js'</span>);
    cb(app);
  }, <span class="hljs-string">"custom-chunk-name"</span>);
};

<span class="hljs-comment">// import()</span>
<span class="hljs-keyword">import</span>(<span class="hljs-string">"./module"</span>).then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.default;
}).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Chunk loading failed"</span>);
});
<span class="hljs-comment">// This creates a separate chunk for each possible route</span>
​<span class="hljs-string">``</span><span class="hljs-string">``</span></code></pre>
<p>结合import的高级特性，我们就可以省去bundle-loader的处理方式，直接在原生模块上进行动态路由处理，具体设计实现如下：</p>
<h3 id="articleHeader14">1.封装一个高阶组件，用来实现将普通的组件转换成动态组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

const AsyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({Component});
        })
        .catch((err) => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const {Component} = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);

export default AsyncComponent;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">const</span> AsyncComponent = <span class="hljs-function"><span class="hljs-params">loadComponent</span> =&gt;</span> (
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    state = {
      <span class="hljs-attr">Component</span>: <span class="hljs-literal">null</span>,
    }

    componentWillMount() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hasLoadedComponent()) {
        <span class="hljs-keyword">return</span>;
      }

      loadComponent()
        .then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> <span class="hljs-built_in">module</span>.default)
        .then(<span class="hljs-function">(<span class="hljs-params">Component</span>) =&gt;</span> {
          <span class="hljs-keyword">this</span>.setState({Component});
        })
        .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`Cannot load component in &lt;AsyncComponent /&gt;`</span>);
          <span class="hljs-keyword">throw</span> err;
        });
    }

    hasLoadedComponent() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.Component !== <span class="hljs-literal">null</span>;
    }

    render() {
      <span class="hljs-keyword">const</span> {Component} = <span class="hljs-keyword">this</span>.state;
      <span class="hljs-keyword">return</span> (Component) ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span> : null;
    }
  }
);

export default AsyncComponent;</span></code></pre>
<h3 id="articleHeader15">2.对我们需要用到的普通组件进行引入和包装处理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 组件增强
const Search = AsyncComponent(() => import(&quot;./containers/Search/Search&quot;))

// 路由调用
<Route location={location} path=&quot;/list&quot; component={BookList} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 组件增强</span>
<span class="hljs-keyword">const</span> Search = AsyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./containers/Search/Search"</span>))

<span class="hljs-comment">// 路由调用</span>
&lt;Route location={location} path=<span class="hljs-string">"/list"</span> component={BookList} /&gt;</code></pre>
<p><strong>利用weback3中的Magic Comments对生成的chunk指定chunkName</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BookList = AsyncComponent(() => 
  import(/* webpackChunkName: &quot;bookList&quot; */ &quot;./containers/BookList/BookList&quot;)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> BookList = AsyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> 
  <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "bookList" */</span> <span class="hljs-string">"./containers/BookList/BookList"</span>)
)</code></pre>
<p>完成构建后我们就可以从浏览器中看到，我们定制后的模块也和之前一样，被能被支持异步加载了<br><span class="img-wrap"><img data-src="/img/bVXAov?w=2100&amp;h=646" src="https://static.alili.tech/img/bVXAov?w=2100&amp;h=646" alt="async_component" title="async_component" style="cursor: pointer;"></span></p>
<p>同时在webpack构建界面中的能看到多了一个chunk，并且chunkName就是我们自定义的名称，对于定位分析一些模块问题时会非常管用。<br><span class="img-wrap"><img data-src="/img/bVXAoK?w=1712&amp;h=644" src="https://static.alili.tech/img/bVXAoK?w=1712&amp;h=644" alt="bundle_name_comment" title="bundle_name_comment" style="cursor: pointer;"></span></p>
<p>从中我们也不难发现，相对于bundle-loader，dynamic-imports + AsyncComponent高阶组件的方式更为简单灵活，同时对于现有的代码改动也较小，故作为在实际开发中的首选方案使用，同时我们也推荐一个非常不错的webpack的chunk分析工具<a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a>，方便查看每个异步路由中的构建的具体模块内容。</p>
<h2 id="articleHeader16">One more thing：路由模块的组织</h2>
<p>react-router功能强大，上手简单，作为官方唯一指定的路由框架已经成为了react应用开发中必备的部分，但是由于react天生组件化的原因，意味着react-router的配置文件中在实际使用中，会难免出现如下不佳场景：</p>
<h3 id="articleHeader17">1、路由配置入口文件持续臃肿，文件越引越多</h3>
<p><span class="img-wrap"><img data-src="/img/bVXAo6?w=1442&amp;h=934" src="https://static.alili.tech/img/bVXAo6?w=1442&amp;h=934" alt="components" title="components" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">2、路由配置会随着业务嵌套越来越深，团队协作开发时极易产生冲突</h3>
<p><span class="img-wrap"><img data-src="/img/bVXApa?w=1788&amp;h=1336" src="https://static.alili.tech/img/bVXApa?w=1788&amp;h=1336" alt="route-config" title="route-config" style="cursor: pointer;"></span></p>
<h3 id="articleHeader19">3、非jsx写法，模块清晰简单，但是会导致路由模块和业务模块耦合，不利于集中管理，同时无法明确表达出母子路由的嵌套关系，参见<a href="https://github.com/ReactTraining/react-router/blob/v3.0.5/examples/huge-apps/app.js" rel="nofollow noreferrer" target="_blank">huge-apps</a>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVXApn?w=1072&amp;h=1146" src="https://static.alili.tech/img/bVXApn?w=1072&amp;h=1146" alt="js-route" title="js-route" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>问题来了：如何既保证路由模块的清晰简单，又能集中管理维护，还能支持嵌套定义和动态加载？</p></blockquote>
<h2 id="articleHeader20">借鉴python flask中的<a href="http://flask.pocoo.org/docs/0.10/blueprints/" rel="nofollow noreferrer" target="_blank">blueprint</a>设计思路，重新实现路由模块的划分</h2>
<p>经过前面的分析，我们不难发现react-router的路由配置模块会随着业务的深入变得越来越臃肿，其根本原因在于我们将所有的资源和配置信息都写在了一个文件中，这和软件设计中提倡的清晰单一，低耦合高内聚等指导原则是背道而驰的，为此我们针对路由模块的划分这块进行了重构，改进方式如下：</p>
<h3 id="articleHeader21">1.拆分routes.js入口文件</h3>
<p>将路由模块的整体由一个routes.js文件拆成若干个彼此间互相独立的子路由模块文件模块的拆分原则可以和业务功能划分一一对应，逐步减少主配置中的内容耦合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes
├── asyncComponent.js
├── callManage.js
├── index.js
├── opportunity.js
├── osManage.js
├── salesKit.js
├── salesManage.js
├── system.js
├── uploadOppor.js
└── workBoard.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">routes
├── asyncComponent.js
├── callManage.js
├── index.js
├── opportunity.js
├── osManage.js
├── salesKit.js
├── salesManage.js
├── system.js
├── uploadOppor.js
└── workBoard.js</code></pre>
<h3 id="articleHeader22">2.在模块的入口文件index.js中完成对各个子模块的引入，如下所示：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import NotFound from '../components/NotFound';
import Layout from '../containers/Main';
import Opportunity from './opportunity';
import OsManage from './osManage';
import SalesKit from './salesKit';
import System from './system';
import CallManage from './callManage';
import SalesManage from './salesManage';
import WorkBoard from './workBoard';
import UploadOppor from './uploadOppor';

const routeList = [
  Opportunity,
  UploadOppor,
  OsManage,
  SalesKit,
  System,
  CallManage,
  SalesManage,
  WorkBoard
];

export default (
  <Route path='/' component={Layout} >
    {routeList}
    <Route path='*' component={NotFound} />
  </Route>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Route, IndexRedirect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/NotFound'</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/Main'</span>;
<span class="hljs-keyword">import</span> Opportunity <span class="hljs-keyword">from</span> <span class="hljs-string">'./opportunity'</span>;
<span class="hljs-keyword">import</span> OsManage <span class="hljs-keyword">from</span> <span class="hljs-string">'./osManage'</span>;
<span class="hljs-keyword">import</span> SalesKit <span class="hljs-keyword">from</span> <span class="hljs-string">'./salesKit'</span>;
<span class="hljs-keyword">import</span> System <span class="hljs-keyword">from</span> <span class="hljs-string">'./system'</span>;
<span class="hljs-keyword">import</span> CallManage <span class="hljs-keyword">from</span> <span class="hljs-string">'./callManage'</span>;
<span class="hljs-keyword">import</span> SalesManage <span class="hljs-keyword">from</span> <span class="hljs-string">'./salesManage'</span>;
<span class="hljs-keyword">import</span> WorkBoard <span class="hljs-keyword">from</span> <span class="hljs-string">'./workBoard'</span>;
<span class="hljs-keyword">import</span> UploadOppor <span class="hljs-keyword">from</span> <span class="hljs-string">'./uploadOppor'</span>;

<span class="hljs-keyword">const</span> routeList = [
  Opportunity,
  UploadOppor,
  OsManage,
  SalesKit,
  System,
  CallManage,
  SalesManage,
  WorkBoard
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Layout}</span> &gt;</span>
    {routeList}
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'*'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{NotFound}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
);</span></code></pre>
<h3 id="articleHeader23">3.在子路由模块中完成对应具体业务模块的加载，支持同时混合使用同步和异步组件的管理方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { Route } from 'react-router';
import UploadOpportunities from '../containers/opportunity/UploadOpportunities'
import UploadVisitOpportunity from '../containers/UploadVisitOpportunity'
import asyncComponent from './asyncComponent'

// upload_frozen_phone
const UploadFrozenPhone = asyncComponent(
  () => import(/* webpackChunkName: &quot;upload_frozen_phone&quot; */'../components/uploadFrozenPhone/UploadFrozenPhone')
);

// upload_phone_state
const UploadPhoneState = asyncComponent(
  () => import(/* webpackChunkName: &quot;upload_phone_state&quot; */'../components/uploadPhoneState/UploadPhoneState')
);

export default (
  <Route key='uploadOpportunities'>
    <Route path='upload_opportunity/:type' component={UploadOpportunities} />
    <Route path='upload_visit_opportunity' component={UploadVisitOpportunity} />
    <Route path='frozen_phone' component={UploadFrozenPhone} />
    <Route path='phone_state' component={UploadPhoneState} />
  </Route>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> UploadOpportunities <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/opportunity/UploadOpportunities'</span>
<span class="hljs-keyword">import</span> UploadVisitOpportunity <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/UploadVisitOpportunity'</span>
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./asyncComponent'</span>

<span class="hljs-comment">// upload_frozen_phone</span>
<span class="hljs-keyword">const</span> UploadFrozenPhone = asyncComponent(
  <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "upload_frozen_phone" */</span><span class="hljs-string">'../components/uploadFrozenPhone/UploadFrozenPhone'</span>)
);

<span class="hljs-comment">// upload_phone_state</span>
<span class="hljs-keyword">const</span> UploadPhoneState = asyncComponent(
  <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "upload_phone_state" */</span><span class="hljs-string">'../components/uploadPhoneState/UploadPhoneState'</span>)
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (
  &lt;Route key='uploadOpportunities'&gt;
    &lt;Route path='upload_opportunity/:type' component={UploadOpportunities} /&gt;
    &lt;Route path='upload_visit_opportunity' component={UploadVisitOpportunity} /&gt;
    &lt;Route path='frozen_phone' component={UploadFrozenPhone} /&gt;
    &lt;Route path='phone_state' component={UploadPhoneState} /&gt;
  &lt;/Route&gt;
);</code></pre>
<h3 id="articleHeader24">4. 优势小结：</h3>
<p>这样重构的好处是即使未来随着业务的深入，对应的开发人员也只需要维护自身负责的子路由模块，再在根路由下进行注册即可使用，并且由于子路由模块都从物理文件上进行了隔离，也能最大程度地减少协作冲突，同时，因为维持了jsx的描述型结构，路由的嵌套关系和集中维护等优点依旧能沿用。</p>
<h2 id="articleHeader25">总结</h2>
<blockquote><p>本文从react-router的动态路由实践着手，整合了webpack的bundle-loader，dynamic-imports和高阶组件等实践的明细介绍，附带介绍了改进路由模块的组织方式，以此作为react-router深入实践的经验总结，希望能对各位读者在实际项目开发中有所帮助。</p></blockquote>
<h2 id="articleHeader26">参考文献</h2>
<ul>
<li><a href="https://webpack.js.org/guides/code-splitting/" rel="nofollow noreferrer" target="_blank">Webpack3官方文档</a></li>
<li><a href="http://react-guide.github.io/react-router-cn/docs/API.html" rel="nofollow noreferrer" target="_blank">React-Router官方文档</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/24595585" rel="nofollow noreferrer" target="_blank">基于Webpack 2的React组件懒加载</a></li>
<li><a href="https://segmentfault.com/a/1190000009539836">React-router 4 按需加载的实现方式及原理</a></li>
<li><a href="https://segmentfault.com/a/1190000006063554" target="_blank">React Router最新指南与异步加载实践</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Router动态路由设计最佳实践

## 原文链接
[https://segmentfault.com/a/1190000011765141](https://segmentfault.com/a/1190000011765141)


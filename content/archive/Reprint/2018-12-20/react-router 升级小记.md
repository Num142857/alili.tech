---
title: 'react-router 升级小记' 
date: 2018-12-20 2:30:10
hidden: true
slug: lwt87tgsga
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近将公司项目的 react-router 从 v3 版本升到了 v4 版本，react-router v4 跟 v3 完全不兼容，是一次彻底的重写。这也给升级造成了极大的困难，与其说升级不如说是对 router 层重写。之前我也将项目的 react 从 v15 版本升级到了 v16 版本，相较而言升级 react-router 比升级 react 困难多了。升级过程中踩了不少的坑，也有一些值得分享的点。写成一篇小文，供大家参考。</p>
<h2 id="articleHeader1">依赖升级</h2>
<p>react-router v4 跟 react 一样拆成了两部分，核心的 react-router 和依运行环境而定的 react-router-dom 或 react-router-native（跟 react-dom 和 react-native 一样）。本文要说的是浏览器环境，也就是 react-router + react-router-dom</p>
<p>先安装依赖（推荐使用 yarn）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react-router react-router-dom history" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> react-router react-router-dom <span class="hljs-built_in">history</span></span></code></pre>
<p>为什么要安装 history 后面会解释。</p>
<h2 id="articleHeader2">组件外导航与 react-router-redux</h2>
<p>之前我们项目中使用了 <a href="https://github.com/reactjs/react-router-redux" rel="nofollow noreferrer" target="_blank">react-router-redux</a> 你有<a href="https://reacttraining.com/react-router/core/guides/redux-integration/deep-integration" rel="nofollow noreferrer" target="_blank">很多理由</a>使用它，但对于我们来说唯一的理由或者用处就是用于在页面组件之外导航，react-router-redux 让你可以在任何地方通过 dispatch 处理页面跳转，如：store.dispatch(push('/'))。因为这个我们就必须使用 react-router-redux 吗？当然不需要，有更简单的办法实现这个需求。所以这次升级我移除了react-router-redux， 写作此文时支持 react-router v4 的 react-router-redux 还处于 v5.0.0-alpha.7 也是原因之一。</p>
<p>还记得之前安装的 <a href="https://github.com/ReactTraining/history" rel="nofollow noreferrer" target="_blank">history</a> 吗？history 是 react-router 唯二的主要依赖之一，之所以要显式安装，是因为我们要使用它来实现页面组件外导航。以下以 browser history 为例（hash history 和 memory history 都是一样的）：</p>
<p>我们不使用 react-router-dom 提供的 BrowserRouter 而是自己实现一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// history.js
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default history;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// history.js</span>
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>;

<span class="hljs-keyword">const</span> history = createHistory();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> history;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import history from './history';
import App from './app';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('app')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> history <span class="hljs-keyword">from</span> <span class="hljs-string">'./history'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
);</code></pre>
<p>搞定！就这么简单，这样在任何地方只要引用 history 就可以使用它进行导航操作，如 history.push('/')，更多使用方式请参考 history <a href="https://github.com/ReactTraining/history" rel="nofollow noreferrer" target="_blank">文档</a>。其实 react-router-dom 的 BrowserRouter 跟我们做了同样的事，区别在于我们这么做能把 history 暴露出来。这个 history 就是页面组件 props 里面的 history 自然也就能做同样的事情。</p>
<h2 id="articleHeader3">静态配置</h2>
<p>react-router v3 是面向配置的，组件写法只是一种语法糖。而 react-router v4 是完全面向组件的，提供的 Route Switch 等都是真正的组件。这也就导致只能按组件的方式写路由，不能写配置。但是 v3 那样的配置确实有一些方便之处，如统一管理、使用方便等。</p>
<p>多亏 JSX 灵活的语法，我们依然有办法按配置的方式写 react-router v4 的路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// routes.js
import Home from './home';
import About from './about';
import Help from './help';

export default [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/about',
  component: About
}, {
  path: '/help',
  component: Help
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// routes.js</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./home'</span>;
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'./about'</span>;
<span class="hljs-keyword">import</span> Help <span class="hljs-keyword">from</span> <span class="hljs-string">'./help'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [{
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">component</span>: Home
}, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>,
  <span class="hljs-attr">component</span>: About
}, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/help'</span>,
  <span class="hljs-attr">component</span>: Help
}];</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './routes';
import NotFound from './not-found';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map((route, i) => <Route key={i} exact={!!route.exact} path={route.path} component={route.component} />)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> app.js
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Switch, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'./not-found'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> {</span>
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;Switch&gt;
        {routes.map(<span class="hljs-function"><span class="hljs-params">(route, i)</span> =&gt;</span> &lt;Route key={i} exact={!!route.exact} path={route.path} component={route.component} /&gt;)}
        &lt;Route component={NotFound} /&gt;
      &lt;/Switch&gt;
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre>
<p>这样我们就用配置的方式写出了面向组件的路由，兼顾两者的优点。如果有嵌套路由需求，可以参考<a href="https://reacttraining.com/react-router/web/example/static-router" rel="nofollow noreferrer" target="_blank">官方示例</a>。官方也提供了一个 <a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config" rel="nofollow noreferrer" target="_blank">react-router-config</a>， 不过我没有使用，一来觉得没必要，二来写作此文时它还处于 v1.0.0-beta.4 版本。</p>
<h2 id="articleHeader4">异步组件与 Code Splitting</h2>
<p>Web 应用最大的一个优势就是不必下载整个应用，只用下载需要的部分就可以使用。要达到这样的目标，就需要对代码进行分片，异步加载组件。可惜 react-router v4 没有像 v3 一样提供加载异步组件的接口。这部分工作就需要我们自己来处理。</p>
<p>我们可以创建一个高阶组件 Bundle，专门用来加载异步组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bundle.js
import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: null };
    props.load().then(Component => this.setState({ Component: Component.default }));
  }
  render() {
    const { load, ...props } = this.props;
    const Component = this.state.Component;
    return Component ? <Component {...props} /> : null;
  }
}

export default Bundle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// bundle.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bundle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-type">Component</span>: <span class="hljs-literal">null</span> };
    props.load().then(<span class="hljs-type">Component</span> =&gt; <span class="hljs-keyword">this</span>.setState({ <span class="hljs-type">Component</span>: <span class="hljs-type">Component</span>.<span class="hljs-keyword">default</span> }));
  }
  render() {
    const { load, ...props } = <span class="hljs-keyword">this</span>.props;
    const <span class="hljs-type">Component</span> = <span class="hljs-keyword">this</span>.state.<span class="hljs-type">Component</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-type">Component</span> ? &lt;<span class="hljs-type">Component</span> {...props} /&gt; : <span class="hljs-literal">null</span>;
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Bundle</span>;</code></pre>
<p>然后修改一下 routes.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// routes.js
import React from 'react';
import Bundle from './bundle';

export default [{
  path: '/',
  exact: true,
  component(props) {
    // 这里的 component 函数也是一个高阶组件
    return <Bundle {...props} load={() => import('./home')} />;
  }
}, {
  path: '/about',
  component(props) {
    return <Bundle {...props} load={() => import('./about')} />;
  }
}, {
  path: '/help',
  component(props) {
    return <Bundle {...props} load={() => import('./help')} />;
  }
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// routes.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Bundle <span class="hljs-keyword">from</span> <span class="hljs-string">'./bundle'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [{
  path: <span class="hljs-string">'/'</span>,
  exact: <span class="hljs-literal">true</span>,
  component(props) {
    <span class="hljs-comment">// 这里的 component 函数也是一个高阶组件</span>
    <span class="hljs-keyword">return</span> &lt;Bundle {...props} load={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./home'</span>)} /&gt;;
  }
}, {
  path: <span class="hljs-string">'/about'</span>,
  component(props) {
    <span class="hljs-keyword">return</span> &lt;Bundle {...props} load={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./about'</span>)} /&gt;;
  }
}, {
  path: <span class="hljs-string">'/help'</span>,
  component(props) {
    <span class="hljs-keyword">return</span> &lt;Bundle {...props} load={<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./help'</span>)} /&gt;;
  }
}];</code></pre>
<p>这样每个页面都会打包成单独的 JS，访问相应页面才会去异步加载对应的组件。这样也可以做精细化缓存控制。<br>需要注意的是 import() 语法在写作本文时还处于 Stage 2 的状态，需给 Babel 添加 <a href="https://babeljs.io/docs/plugins/syntax-dynamic-import/" rel="nofollow noreferrer" target="_blank">syntax-dynamic-import</a> 插件才能正常工作，另外需 webpack 2 及以上才支持。</p>
<h2 id="articleHeader5">查询参数</h2>
<p>因为<a href="https://github.com/ReactTraining/react-router/issues/4410" rel="nofollow noreferrer" target="_blank">各种原因</a> react-router v4 不再解析 ?key=value 这样的 URL 的查询参数，页面组件 props.location 中只有 search 字符串。这跟 v3 不兼容，而且很不方便。我们有办法兼容一下吗？当然有，这时候之前写的 histroy.js 又有新的用处了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// history.js
import qs from 'qs';
import createHistory from 'history/createBrowserHistory';

function addQuery(history) {
  const location = history.location;
  history.location = { ...location, query: qs.parse(location.search, { ignoreQueryPrefix: true }) };
}

const history = createHistory();

addQuery(history);

export const unlisten = history.listen(() => {
  // 每次页面跳转都会执行
  addQuery(history);
});

export default history;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// history.js</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
<span class="hljs-keyword">import</span> createHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createBrowserHistory'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addQuery</span>(<span class="hljs-params">history</span>) </span>{
  <span class="hljs-keyword">const</span> location = history.location;
  history.location = { ...location, <span class="hljs-attr">query</span>: qs.parse(location.search, { <span class="hljs-attr">ignoreQueryPrefix</span>: <span class="hljs-literal">true</span> }) };
}

<span class="hljs-keyword">const</span> history = createHistory();

addQuery(history);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> unlisten = history.listen(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 每次页面跳转都会执行</span>
  addQuery(history);
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> history;</code></pre>
<p>这样我们就能在页面组件 props.location.query 拿到解析好的 URL 查询参数了，跟 v3 完美兼容。还有个额外的好处是在任何地方引用 history 都可以拿到解析好的 URL 查询参数。需要注意的是，在 <a href="https://github.com/ReactTraining/history" rel="nofollow noreferrer" target="_blank">history</a> 的设计中，history 对象是 Mutable 的，所以我们可以直接修改 history。但是 history.location 是 Immutable 的，所以我们要确保每一个 location 对象都是全新的。</p>
<h2 id="articleHeader6">搭配 Redux</h2>
<p>react-router v4 跟 redux 搭配有一个大坑（mobx 应该也有同样的问题），详情请看<a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md" rel="nofollow noreferrer" target="_blank">这篇文章</a>，这里就不再赘述。简单来说，如果一个组件用 redux 的 connect 包装过，又️不是 Route 的子组件，那么 history 的变更就不会触发这个组件的更新，它的子组件自然也不会更新。比如应用的根组件（上文的 App）。</p>
<p>解决方案也很简单，可以用 react-router v4 提供的 withRouter 再包装一遍：withRouter(connect(...)(App))，或者让 App 做为 Router 的子组件，原理都一样。我采用的后者。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import routes from './routes';
import NotFound from './not-found';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map((route, i) => <Route key={i} exact={!!route.exact} path={route.path} component={route.component} />)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    someState: state.someState
  };
}

export default connect(mapStateToProps)(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> app.js
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> { Switch, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'./not-found'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> {</span>
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;Switch&gt;
        {routes.map(<span class="hljs-function"><span class="hljs-params">(route, i)</span> =&gt;</span> &lt;Route key={i} exact={!!route.exact} path={route.path} component={route.component} /&gt;)}
        &lt;Route component={NotFound} /&gt;
      &lt;/Switch&gt;
    );
  }
}

function mapStateToProps(state) {
  <span class="hljs-keyword">return</span> {
    someState: state.someState
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(App);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store from './store';
import history from './history';
import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} /> {/* 没有 path 就会匹配所有路由 */}
    </Router>
  </Provider>,
  document.getElementById('app')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> { Router, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>;
<span class="hljs-keyword">import</span> history <span class="hljs-keyword">from</span> <span class="hljs-string">'./history'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span> /&gt;</span> {/* 没有 path 就会匹配所有路由 */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>,
  document.getElementById('app')
);</span></code></pre>
<h2 id="articleHeader7">最后</h2>
<p>不得不说升级 react-router 很困难，坑也很多。但是把坑一个个填完，最终完美升级也是一件很有意思，很有成就感的事。希望这篇文章能对你有所帮助。</p>
<p>另外完整的 Demo 请戳我的 <a href="https://github.com/yangmingshan/react-demo" rel="nofollow noreferrer" target="_blank">GitHub</a>，喜欢的话点个 Star 吧 :P</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-router 升级小记

## 原文链接
[https://segmentfault.com/a/1190000012641219](https://segmentfault.com/a/1190000012641219)


---
title: 'React Router v4 之代码分割：从放弃到入门' 
date: 2018-12-29 2:30:10
hidden: true
slug: 250rayg7guu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景介绍</h2>
<p>React Router v4 推出已有六个月了，网络上因版本升级带来的哀嚎仿佛就在半年前。我在使用这个版本的 React Router 时，也遇到了一些问题，比如这里所说的代码分割，所以写了这篇博客作为总结，希望能对他人有所帮助。</p>
<h2 id="articleHeader1">什么是代码分割（code splitting）</h2>
<p>在用户浏览我们的网站时，一种方案是一次性地将所有的 JavaScript 代码都下载下来，可想而知，代码体积会很可观，同时这些代码中的一部分可能是用户此时并不需要的。另一种方案是按需加载，将 JavaScript 代码分成多个块（chunk），用户只需下载当前浏览所需的代码即可，用户进入到其它页面或需要渲染其它部分时，才加载更多的代码。这后一种方案中用到的就是所谓的<strong>代码分割（code splitting）</strong>了。</p>
<p>当然为了实现代码分割，仍然需要和 webpack 搭配使用，先来看看 webpack 的文档中是如何介绍的。</p>
<p><a href="https://webpack.js.org/guides/code-splitting/" rel="nofollow noreferrer" target="_blank">Webpack 文档的 code splitting 页面</a>中介绍了三种方法：</p>
<ol>
<li>利用 webpack 中的 <code>entry</code> 配置项来进行手动分割</li>
<li>利用 <code>CommonsChunkPlugin</code> 插件来提取重复 chunk</li>
<li>动态引入（Dynamic Imports）</li>
</ol>
<p>你可以读一下此篇文档，从而对 webpack 是如何进行代码分割的有个基本的认识。本文后面将提到的方案就是基于上述的第三种方法。</p>
<h2 id="articleHeader2">React Router 中如何进行代码分割</h2>
<p>在 v4 之前的版本中，一般是利用 <code>require.ensure()</code> 来实现代码分割的，而在 v4 中又是如何处理的呢？</p>
<h3 id="articleHeader3">使用 bundle-loader 的方案</h3>
<p>在 React Router v4 官方给出的<a href="https://reacttraining.com/react-router/web/guides/code-splitting" rel="nofollow noreferrer" target="_blank">文档</a>中，使用了名为 <a href="https://github.com/webpack-contrib/bundle-loader" rel="nofollow noreferrer" target="_blank"><code>bundle-loader</code></a> 的工具来实现这一功能。</p>
<p>其主要实现思路为创建一个名为 <code>&lt;Bundle&gt;</code> 的组件，当应用匹配到了对应的路径时，该组件会动态地引入所需模块并将自身渲染出来。</p>
<p>示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import loadSomething from 'bundle-loader?lazy!./Something'

<Bundle load={loadSomething}>
  {(mod) => (
    // do something w/ the module
  )}
</Bundle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> loadSomething <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy!./Something'</span>

&lt;Bundle load={loadSomething}&gt;
  {(mod) =&gt; (
    <span class="hljs-comment">// do something w/ the module</span>
  )}
&lt;<span class="hljs-regexp">/Bundle&gt;</span></code></pre>
<p>更多关于 <code>&lt;Bundle&gt;</code> 组件的实现可参见上面给出的文档地址。</p>
<h3 id="articleHeader4">使用 bundle-loader 方法存在的不足之处</h3>
<p>这里提到的两个缺点我们在实际开发工作中遇到的，与我们的项目特定结构相关，所以你可能并不会遇上。</p>
<p>一、 代码丑陋</p>
<p>由于我们的项目是从 React Router v2, v3 升级过来的，在之前的版本中对于异步加载的实现采用了集中配置的方案，即项目中存在一个 <code>Routes.js</code> 文件，整个项目的路径设置都放在了该文件中，这样方便集中管理。</p>
<p>但是在 React Router v4 版本中，由于使用了 <code>bundle-loader</code> 来实现代码分割，必须使用以下写法来引入组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import loadSomething from 'bundle-loader?lazy!./Something'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> loadSomething <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy!./Something'</span></code></pre>
<p>而我们的 <code>reducer</code> 和 <code>saga</code> 文件也需要使用此种方法引入，导致 <code>Routes.js</code> 文件顶端将会出现一长串及其冗长的组件引入代码，不易维护。如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVV6vU?w=1294&amp;h=177" src="https://static.alili.tech/img/bVV6vU?w=1294&amp;h=177" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当用这种方法引入的模块数量过多时，文件将会不忍直视。</p>
<p>二、 存在莫名的组件生命周期Bug</p>
<p>在使用了这种方案后，在某些页面中会出现这样的一个Bug：应用中进行页面跳转时，上一个页面的组件会在 <code>unmount</code> 之后重新创建一次。表现为已经到了下一页面，但是会调用存在于跳转前页面中的组件的 <code>componentDidMount</code> 方法。</p>
<p>当然，这个Bug只与我自己的特定项目有关，错误原因可能与 <code>bundle-loader</code> 并无太大关联。不过因为一直无法解决这一问题，所以决定换一个方案来代替 <code>bundle-loader</code>。</p>
<h2 id="articleHeader5">使用 import() 的新方案</h2>
<p>Dan Abramov 在这个 create-react-app 的 issue 中给出了 <code>bundle-loader</code> 的替代方案的链接：<a href="http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html" rel="nofollow noreferrer" target="_blank">Code Splitting in Create React App</a>，可以参考该篇文章来实现我们项目中的代码分割功能。</p>
<h3 id="articleHeader6">代码分割和 React Router v4</h3>
<p>一个常规的 React Router 项目结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 代码出处：
// http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

/* Import the components */
import Home from './containers/Home';
import Posts from './containers/Posts';
import NotFound from './containers/NotFound';

/* Use components to define routes */
export default () => (
  <Switch>
    <Route path=&quot;/&quot; exact component={Home} />
    <Route path=&quot;/posts/:id&quot; exact component={Posts} />
    <Route component={NotFound} />
  </Switch>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 代码出处：</span>
<span class="hljs-comment">// http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html</span>

<span class="hljs-comment">/* Import the components */</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Home'</span>;
<span class="hljs-keyword">import</span> Posts <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Posts'</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/NotFound'</span>;

<span class="hljs-comment">/* Use components to define routes */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  &lt;Switch&gt;
    &lt;Route path="/" exact component={Home} /&gt;
    &lt;Route path="/posts/:id" exact component={Posts} /&gt;
    &lt;Route component={NotFound} /&gt;
  &lt;/Switch&gt;
);</code></pre>
<p>首先根据我们的 route 引入相应的组件，然后将其用于定义相应的 <code>&lt;Route&gt;</code>。</p>
<p>但是，不管匹配到了哪一个 route，我们这里都一次性地引入所有的组件。而我们想要的效果是当匹配了一个 route，则只引入与其对应的组件，这就需要实现代码分割了。</p>
<h3 id="articleHeader7">创建一个异步组件（Async Component）</h3>
<p>异步组件，即只有在需要的时候才会引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : null;
    }

  }

  return AsyncComponent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncComponent</span>(<span class="hljs-params">importComponent</span>) </span>{

  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);

      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">component</span>: <span class="hljs-literal">null</span>,
      };
    }

    <span class="hljs-keyword">async</span> componentDidMount() {
      <span class="hljs-keyword">const</span> { <span class="hljs-attr">default</span>: component } = <span class="hljs-keyword">await</span> importComponent();

      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">component</span>: component
      });
    }

    render() {
      <span class="hljs-keyword">const</span> C = <span class="hljs-keyword">this</span>.state.component;

      <span class="hljs-keyword">return</span> C
        ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">C</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
        : null;
    }

  }

  return AsyncComponent;
}</span></code></pre>
<p><code>asyncComponent</code> 接收一个 <code>importComponent</code> 函数作为参数，<code>importComponent()</code> 在被调用时会动态引入给定的组件。</p>
<p>在 <code>componentDidMount()</code>中，调用传入的 <code>importComponent()</code>，并将动态引入的组件保存在 state 中。</p>
<h3 id="articleHeader8">使用异步组件（Async Component）</h3>
<p>不再使用如下静态引入组件的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from './containers/Home';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Home'</span>;</code></pre>
<p>而是使用 <code>asyncComponent</code> 方法来动态引入组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AsyncHome = asyncComponent(() => import('./containers/Home'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> AsyncHome = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Home'</span>));</code></pre>
<p>此处的 <code>import()</code> 来自于新的 ES 提案，其结果是一个 Promise，这是一种动态引入模块的方法，即上文 webpack 文档中提到的第三种方法。更多关于 <code>import()</code> 的信息可以查看这篇文章：<a href="http://2ality.com/2017/01/import-operator.html" rel="nofollow noreferrer" target="_blank">ES proposal: import() – dynamically importing ES modules</a>。</p>
<p>注意这里并没有进行组件的引入，而是传给了 <code>asyncComponent</code> 一个函数，它将在 <code>AsyncHome</code> 组件被创建时进行动态引入。同时，这种传入一个函数作为参数，而非直接传入一个字符串的写法能够让 webpack 意识到此处需要进行代码分割。</p>
<p>最后如下使用这个 <code>AsyncHome</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; exact component={AsyncHome} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;Route path=<span class="hljs-string">"/"</span> exact component={AsyncHome} /&gt;</code></pre>
<h3 id="articleHeader9">对于 reducer 和 saga 文件的异步加载</h3>
<p>在上面的这篇文章中，只给出了对于组件的异步引入的解决方案，而在我们的项目中还存在将 <code>reducer</code> 和 <code>saga</code> 文件异步引入的需求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="processReducer(reducer) {
    if (Array.isArray(reducer)) {
        return Promise.all(reducer.map(r => this.processReducer(r)));
    } else if (typeof reducer === 'object') {
        const key = Object.keys(reducer)[0];
        return reducer[key]().then(x => {
            injectAsyncReducer(key, x.default);
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">processReducer(reducer) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(reducer)) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(reducer.map(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-keyword">this</span>.processReducer(r)));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducer === <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">const</span> key = <span class="hljs-built_in">Object</span>.keys(reducer)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">return</span> reducer[key]().then(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
            injectAsyncReducer(key, x.default);
        });
    }
}</code></pre>
<p>将需要异步引入的 reducer 作为参数传入，利用 Promise 来对其进行异步处理。在 <code>componentDidMount</code> 方法中等待 reducer 处理完毕后在将组件保存在 state 中，对于 saga 文件同理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// componentDidMount 中做如下修改
async componentDidMount() {
    const { default: component } = await importComponent();

    Promise.all([this.processReducer(reducers),
            this.processSaga(sagas)]).then(() => {
        this.setState({
            component
        });
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// componentDidMount 中做如下修改</span>
<span class="hljs-keyword">async</span> componentDidMount() {
    <span class="hljs-keyword">const</span> { <span class="hljs-attr">default</span>: component } = <span class="hljs-keyword">await</span> importComponent();

    <span class="hljs-built_in">Promise</span>.all([<span class="hljs-keyword">this</span>.processReducer(reducers),
            <span class="hljs-keyword">this</span>.processSaga(sagas)]).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            component
        });
    });
}</code></pre>
<p>在上面对 <code>reducer</code> 文件进行处理时，使用了这样的一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="injectAsyncReducer(key, x.default);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">injectAsyncReducer(key, x.default);</code></pre>
<p>其作用是利用 Redux 中的 <code>replaceReducer()</code> 方法来修改 reducer，具体代码见下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducerList 是你当前的 reducer 列表
function createReducer(asyncReducers) {
    asyncReducers
    &amp;&amp; !reducersList[Object.keys(asyncReducers)[0]]
    &amp;&amp; (reducersList = Object.assign({}, reducersList, asyncReducers));
    return combineReducers(reducersList);
}

function injectAsyncReducer(name, asyncReducer) {
    store.replaceReducer(createReducer({ [name]: asyncReducer }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// reducerList 是你当前的 reducer 列表</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createReducer</span>(<span class="hljs-params">asyncReducers</span>) </span>{
    asyncReducers
    &amp;&amp; !reducersList[<span class="hljs-built_in">Object</span>.keys(asyncReducers)[<span class="hljs-number">0</span>]]
    &amp;&amp; (reducersList = <span class="hljs-built_in">Object</span>.assign({}, reducersList, asyncReducers));
    <span class="hljs-keyword">return</span> combineReducers(reducersList);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">injectAsyncReducer</span>(<span class="hljs-params">name, asyncReducer</span>) </span>{
    store.replaceReducer(createReducer({ [name]: asyncReducer }));
}</code></pre>
<p>完整的 asyncComponent 代码可见<a href="https://gist.github.com/noiron/7f774dea55bcc52921e5bc5a50c2aa10#file-asynccomponent-js" rel="nofollow noreferrer" target="_blank">此处 gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="noiron/7f774dea55bcc52921e5bc5a50c2aa10" data-typeid="1">点击预览</button>，注意一点，为了能够灵活地使用不同的 <code>injectAsyncReducer</code>, <code>injectAsyncSaga</code> 函数，代码中使用了高阶组件的写法，你可以直接使用内层的 <code>asyncComponent</code> 函数。</p>
<h2 id="articleHeader10">asyncComponent 方法与 React Router v4 的结合使用</h2>
<h3 id="articleHeader11">组件、reducer、saga 的异步引入</h3>
<p>考虑到代码可读性，可在你的 <code>route</code> 目录下新建一个 <code>asyncImport.js</code> 文件，将需要异步引入的模块写在该文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入前面所写的异步加载函数
import asyncComponent from 'route/AsyncComponent';

// 只传入第一个参数，只需要组件
export const AsyncHomePage = asyncComponent(() => import('./homepage/Homepage'));

// 传入三个参数，分别为 component, reducer, saga
// 注意这里的第二个参数 reducer 是一个对象，其键值对应于redux store中存放的键值
export const AsyncArticle = asyncComponent(
    () => import('./market/Common/js/Container'),
    { market: () => import('./market/Common/js/reducer') },
    () => import('./market/Saga/watcher')
);

// reducer 和 saga 参数可以传入数组
// 当只有 saga，而无 reducer 参数时，第二项参数传入空数组 []
const UserContainer = () => import('./user/Common/js/Container');
const userReducer = { userInfo: () => import('./user/Common/js/userInfoReducer') };
const userSaga = () => import('./user/Saga/watcher');
export const AsyncUserContainer = asyncComponent(
    UserContainer,
    [userReducer, createReducer],
    [userSaga, createSaga]
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入前面所写的异步加载函数</span>
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'route/AsyncComponent'</span>;

<span class="hljs-comment">// 只传入第一个参数，只需要组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AsyncHomePage = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./homepage/Homepage'</span>));

<span class="hljs-comment">// 传入三个参数，分别为 component, reducer, saga</span>
<span class="hljs-comment">// 注意这里的第二个参数 reducer 是一个对象，其键值对应于redux store中存放的键值</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AsyncArticle = asyncComponent(
    <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./market/Common/js/Container'</span>),
    { <span class="hljs-attr">market</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./market/Common/js/reducer'</span>) },
    () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'./market/Saga/watcher'</span>)
);

<span class="hljs-comment">// reducer 和 saga 参数可以传入数组</span>
<span class="hljs-comment">// 当只有 saga，而无 reducer 参数时，第二项参数传入空数组 []</span>
<span class="hljs-keyword">const</span> UserContainer = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./user/Common/js/Container'</span>);
<span class="hljs-keyword">const</span> userReducer = { <span class="hljs-attr">userInfo</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./user/Common/js/userInfoReducer'</span>) };
<span class="hljs-keyword">const</span> userSaga = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./user/Saga/watcher'</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AsyncUserContainer = asyncComponent(
    UserContainer,
    [userReducer, createReducer],
    [userSaga, createSaga]
);</code></pre>
<p>然后在项目的 <code>Router</code> 组件中引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// route/index.jsx
<Route path=&quot;/user&quot; component={AsyncArticle} />
<Route path=&quot;/user/:userId&quot; component={AsyncUserContainer} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// route/index.jsx</span>
&lt;Route path=<span class="hljs-string">"/user"</span> component={AsyncArticle} /&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/user/:userId"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncUserContainer}</span> /&gt;</span></span></code></pre>
<p>根据 React Router v4 的哲学，React Router 中的一切皆为组件，所以不必在一个单独的文件中统一配置所有的路由信息。建议在你最外层的容器组件，比如我的 <code>route/index.jsx</code> 文件中只写入<strong>对应一个单独页面的容器组件</strong>，而页面中的子组件在该容器组件中异步引入并使用。</p>
<p><del>在 React Router v5 发布之前完成了本文，可喜可贺?</del></p>
<h2 id="articleHeader12">参考资料</h2>
<blockquote><p><a href="http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html" rel="nofollow noreferrer" target="_blank">Code Splitting in Create React App</a><br><a href="http://2ality.com/2017/01/import-operator.html" rel="nofollow noreferrer" target="_blank">ES proposal: import() – dynamically importing ES modules</a></p></blockquote>
<hr>
<p>本文在我博客上的原地址：<a href="http://www.wukai.me/2017/09/25/react-router-v4-code-splitting/" rel="nofollow noreferrer" target="_blank">React Router v4 之代码分割：从放弃到入门</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router v4 之代码分割：从放弃到入门

## 原文链接
[https://segmentfault.com/a/1190000011426329](https://segmentfault.com/a/1190000011426329)


---
title: '【翻译】基于 Create React App路由4.0的异步组件加载（Code Splitting）' 
date: 2019-01-09 2:30:12
hidden: true
slug: rfso55pdh1c
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">基于 Create React App路由4.0的异步组件加载</h3>
<p>本文章是一个额外的篇章，它可以在你的<code>React app</code>中，帮助加快初始的加载组件时间。当然这个操作不是完全必要的，但如果你好奇的话，请随意跟随这篇文章一起用<code>Create React App</code>和 <code>react路由4.0</code>的异步加载方式来帮助<code>react.js</code>构建大型应用。</p>
<h3 id="articleHeader1">代码分割（Code Splitting）</h3>
<p>当我们用<code>react.js</code>写我们的单页应用程序时候，这个应用会变得越来越大，一个应用（或者路由页面）可能会引入大量的组件，可是有些组件是第一次加载的时候是不必要的，这些不必要的组件会浪费很多的加载时间。</p>
<p>你可能会注意到<code> Create React App </code>在打包完毕之后会生成一个很大的<code>.js</code>文件，这包含了我们应用程序需要的所有<code>JavaScript</code>。但是，如果用户只是加载登录页面去登录网站，我们加载应用程序的其余部分是没有意义的。在我们的应用程序还很小的时候，这并不是一个问题，但是它却是我们程序猿优化的一个东西。为了解决这个问题，<code>Create React App</code>有一个非常简单的代码分割的的方案。</p>
<h3 id="articleHeader2">代码分割和 react-router</h3>
<p>在我们 <code>react app </code>中，常见的路由配置可能是像下面一样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Import the components */
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
      </div><pre class="hljs livescript"><code><span class="hljs-comment">/* Import the components */</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Home'</span>;
<span class="hljs-keyword">import</span> Posts <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Posts'</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/NotFound'</span>;


<span class="hljs-comment">/* Use components to define routes */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  &lt;Switch&gt;
    &lt;Route path=<span class="hljs-string">"/"</span> exact component={Home} /&gt;
    &lt;Route path=<span class="hljs-string">"/posts/:id"</span> exact component={Posts} /&gt;
    &lt;Route component={NotFound} /&gt;
  &lt;/Switch&gt;
);</code></pre>
<p>我们一开始引入这些组件，然后定义好的路径，会根据我们的路由去匹配这些组件。</p>
<p>但是，我们静态地在顶部导入路由中的所有组件。这意味着，不管哪个路由匹配，所有这些组件都被加载。我们只想加载对匹配路由的时候才加载响应的组件。下面我们一步步来完成这个使命。</p>
<h3 id="articleHeader3">创建一个异步组件</h3>
<p>创建一个js 文件，如：<code>src/components/AsyncComponent.js</code>，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
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

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-string">"react"</span>;

export <span class="hljs-keyword">default</span> function asyncComponent(importComponent) {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);

      <span class="hljs-keyword">this</span>.state = {
        component: <span class="hljs-literal">null</span>
      };
    }

    async componentDidMount() {
      const { <span class="hljs-keyword">default</span>: component } = await importComponent();

      <span class="hljs-keyword">this</span>.setState({
        component: component
      });
    }

    render() {
      const <span class="hljs-type">C</span> = <span class="hljs-keyword">this</span>.state.component;

      <span class="hljs-keyword">return</span> <span class="hljs-type">C</span> ? &lt;<span class="hljs-type">C</span> {...<span class="hljs-keyword">this</span>.props} /&gt; : <span class="hljs-literal">null</span>;
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-type">AsyncComponent</span>;
}</code></pre>
<p>我们在这里做了一些事情：</p>
<ol>
<li><p>这个<code>asyncComponent </code>函数接受一个<code>importComponent </code>的参数，<code>importComponent </code>调用时候将动态引入给定的组件。</p></li>
<li><p>在<code>componentDidMount </code>我们只是简单地调用<code>importComponent </code>函数，并将动态加载的组件保存在状态中。</p></li>
<li><p>最后，如果完成渲染，我们有条件地提供组件。在这里我们如果不写<code>null</code>的话，也可提供一个菊花图，代表着组件正在渲染。</p></li>
</ol>
<h3 id="articleHeader4">使用异步组件</h3>
<p>现在让我们使用我们的异步组件，而不是像开始的静态去引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from './containers/Home';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Home'</span>;</code></pre>
<p>我们要用<code>asyncComponent</code>组件来动态引入我们需要的组件。</p>
<blockquote><p>tip： 别忘记 先 <code>import asyncComponent from './AsyncComponent</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AsyncHome = asyncComponent(() => import('./containers/Home'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">const AsyncHome = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Home'</span>));</code></pre>
<p>我们将要使用 <code>AsyncHome </code>这个组件在我们的路由里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; exact component={AsyncHome} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncHome}</span> /&gt;</span></code></pre>
<p>现在让我们回到<a href="https://github.com/AnomalyInnovations/serverless-stack-demo-client" rel="nofollow noreferrer" target="_blank">Notes项目</a>并应用这些更改。</p>
<blockquote><p>src/Routes.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const AsyncHome     = asyncComponent(() => import('./containers/Home'));
const AsyncLogin    = asyncComponent(() => import('./containers/Login'));
const AsyncNotes    = asyncComponent(() => import('./containers/Notes'));
const AsyncSignup   = asyncComponent(() => import('./containers/Signup'));
const AsyncNewNote  = asyncComponent(() => import('./containers/NewNote'));
const AsyncNotFound = asyncComponent(() => import('./containers/NotFound'));

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path=&quot;/&quot; exact component={AsyncHome} props={childProps} />
    <UnauthenticatedRoute path=&quot;/login&quot; exact component={AsyncLogin} props={childProps} />
    <UnauthenticatedRoute path=&quot;/signup&quot; exact component={AsyncSignup} props={childProps} />
    <AuthenticatedRoute path=&quot;/notes/new&quot; exact component={AsyncNewNote} props={childProps} />
    <AuthenticatedRoute path=&quot;/notes/:id&quot; exact component={AsyncNotes} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={AsyncNotFound} />
  </Switch>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/AsyncComponent'</span>;
<span class="hljs-keyword">import</span> AppliedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/AppliedRoute'</span>;
<span class="hljs-keyword">import</span> AuthenticatedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/AuthenticatedRoute'</span>;
<span class="hljs-keyword">import</span> UnauthenticatedRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/UnauthenticatedRoute'</span>;

<span class="hljs-keyword">const</span> AsyncHome     = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Home'</span>));
<span class="hljs-keyword">const</span> AsyncLogin    = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Login'</span>));
<span class="hljs-keyword">const</span> AsyncNotes    = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Notes'</span>));
<span class="hljs-keyword">const</span> AsyncSignup   = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Signup'</span>));
<span class="hljs-keyword">const</span> AsyncNewNote  = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/NewNote'</span>));
<span class="hljs-keyword">const</span> AsyncNotFound = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/NotFound'</span>));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({ childProps }) =&gt; (
  &lt;Switch&gt;
    &lt;AppliedRoute path="/" exact component={AsyncHome} props={childProps} /&gt;
    &lt;UnauthenticatedRoute path="/login" exact component={AsyncLogin} props={childProps} /&gt;
    &lt;UnauthenticatedRoute path="/signup" exact component={AsyncSignup} props={childProps} /&gt;
    &lt;AuthenticatedRoute path="/notes/new" exact component={AsyncNewNote} props={childProps} /&gt;
    &lt;AuthenticatedRoute path="/notes/:id" exact component={AsyncNotes} props={childProps} /&gt;
    { /* Finally, catch all unmatched routes */ }
    &lt;Route component={AsyncNotFound} /&gt;
  &lt;/Switch&gt;
);</code></pre>
<p>只需几次更改就相当酷了。我们的app都是设置了代码分割而的。也没有增加太多的复杂性。<br>这里我们看看之前的这个<code>src/Routes.js</code>路由文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

import Home from './containers/Home';
import Login from './containers/Login';
import Notes from './containers/Notes';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path=&quot;/&quot; exact component={Home} props={childProps} />
    <UnauthenticatedRoute path=&quot;/login&quot; exact component={Login} props={childProps} />
    <UnauthenticatedRoute path=&quot;/signup&quot; exact component={Signup} props={childProps} />
    <AuthenticatedRoute path=&quot;/notes/new&quot; exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path=&quot;/notes/:id&quot; exact component={Notes} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> React from <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Route, Switch } from <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> AppliedRoute from <span class="hljs-string">'./components/AppliedRoute'</span>;
<span class="hljs-keyword">import</span> AuthenticatedRoute from <span class="hljs-string">'./components/AuthenticatedRoute'</span>;
<span class="hljs-keyword">import</span> UnauthenticatedRoute from <span class="hljs-string">'./components/UnauthenticatedRoute'</span>;

<span class="hljs-keyword">import</span> Home from <span class="hljs-string">'./containers/Home'</span>;
<span class="hljs-keyword">import</span> Login from <span class="hljs-string">'./containers/Login'</span>;
<span class="hljs-keyword">import</span> Notes from <span class="hljs-string">'./containers/Notes'</span>;
<span class="hljs-keyword">import</span> Signup from <span class="hljs-string">'./containers/Signup'</span>;
<span class="hljs-keyword">import</span> NewNote from <span class="hljs-string">'./containers/NewNote'</span>;
<span class="hljs-keyword">import</span> NotFound from <span class="hljs-string">'./containers/NotFound'</span>;

export <span class="hljs-keyword">default</span> ({ childProps }) =&gt; (
  &lt;Switch&gt;
    &lt;AppliedRoute path=<span class="hljs-string">"/"</span> exact component={Home} props={childProps} /&gt;
    &lt;UnauthenticatedRoute path=<span class="hljs-string">"/login"</span> exact component={Login} props={childProps} /&gt;
    &lt;UnauthenticatedRoute path=<span class="hljs-string">"/signup"</span> exact component={Signup} props={childProps} /&gt;
    &lt;AuthenticatedRoute path=<span class="hljs-string">"/notes/new"</span> exact component={NewNote} props={childProps} /&gt;
    &lt;AuthenticatedRoute path=<span class="hljs-string">"/notes/:id"</span> exact component={Notes} props={childProps} /&gt;
    { /* Finally, catch all unmatched routes */ }
    &lt;Route component={NotFound} /&gt;
  &lt;/Switch&gt;
);</code></pre>
<p>注意，不要在顶部的引入所有的组件。我们正在创建这些代码分割的功能，以便在必要时为我们进行动态导入。</p>
<p>现在你运行<code>npm run build</code> 您将看到代码已经被分割成一个个小文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQpcm?w=1504&amp;h=1098" src="https://static.alili.tech/img/bVQpcm?w=1504&amp;h=1098" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>下面是部署好的在网站的真实截图</p>
<p><span class="img-wrap"><img data-src="/img/bVQpcz?w=2782&amp;h=1770" src="https://static.alili.tech/img/bVQpcz?w=2782&amp;h=1770" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>每个<code>.chunk.js</code>都是需要的时候才加载的。当然我们的程序是相当小的，并且分离在各个部分的小组件，是不需要这样子按需加载的。还是看你项目的需求。</p>
<p>原文地址：<a href="http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html" rel="nofollow noreferrer" target="_blank">http://serverless-stack.com/c...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【翻译】基于 Create React App路由4.0的异步组件加载（Code Splitting）

## 原文链接
[https://segmentfault.com/a/1190000010067597](https://segmentfault.com/a/1190000010067597)


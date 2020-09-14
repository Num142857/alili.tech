---
title: 'React Router最新指南与异步加载实践' 
date: 2019-02-06 2:30:09
hidden: true
slug: paxgwd3ar39
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文从属于笔者的<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook#react" rel="nofollow noreferrer" target="_blank">React入门与最佳实践</a>系列</p></blockquote>
<h1 id="articleHeader0">Introduction</h1>
<p><a href="https://github.com/reactjs/react-router" rel="nofollow noreferrer" target="_blank">React Router</a>是基于React的同时支持服务端路由与客户端路由的强大易用的路由框架，可以允许开发者方便地添加新页面到应用中，保证页面内容与页面路由的一致性以及在页面之间进行方便地参数传递。之前React Router作者没有积极地开发与审核Pull Request，结果有个<a href="https://github.com/taion/rrtr" rel="nofollow noreferrer" target="_blank">rrtr</a>一怒之下要建个独立的分支，不过后来好像又回归到了React Router上。 目前React-Router的官方版本已经达到了2.6.0，其API也一直在发生变化，笔者在本文中所述内容也是基于2.6.0的官方文档以及自己的实践整理而来。同时，随着React Router项目的更新本文文档也会随之更新，有需要的建议关注本项目。如果你是初学者希望快速搭建React的基本开发环境，那么笔者建议参考<a href="https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate" rel="nofollow noreferrer" target="_blank">Webpack-React-Redux-Boilerplate</a>来迅速构建可应用于生产环境的自动化开发配置。首先，基本的React的路由配置如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="


<Router history={appHistory}>
    <Route path = &quot;/&quot; component = {withRouter(App)}> //在2.4.0之后建议默认使用withRouter进行包裹
      <IndexRoute component = {withRouter(ClusterTabPane)} /> //默认路由
      <Route path = &quot;cluster&quot; component = {withRouter(ClusterTabPane)} />
    </Route>
    <Route path=&quot;*&quot; component={withRouter(ErrorPage)}/> //默认错误路由
  </Router>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{appHistory}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span> = <span class="hljs-string">"/"</span> <span class="hljs-attr">component</span> = <span class="hljs-string">{withRouter(App)}</span>&gt;</span> //在2.4.0之后建议默认使用withRouter进行包裹
      <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span> = <span class="hljs-string">{withRouter(ClusterTabPane)}</span> /&gt;</span> //默认路由
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span> = <span class="hljs-string">"cluster"</span> <span class="hljs-attr">component</span> = <span class="hljs-string">{withRouter(ClusterTabPane)}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"*"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{withRouter(ErrorPage)}/</span>&gt;</span> //默认错误路由
  <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
</span></code></pre>
<p>不过React-Router因为其与React的强绑定性也不可避免的带来了一些缺陷，譬如在目前情况下因为React存在的性能问题(笔者觉得在React-Fiber正式发布之后能得到有效解决)，如果笔者打算使用<a href="https://github.com/trueadm/inferno" rel="nofollow noreferrer" target="_blank">Inferno</a>来替换部分对性能要求较大的页面，也是会存在问题。如果有兴趣的话也可以参考下<a href="https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d#.hzfajjq3t" rel="nofollow noreferrer" target="_blank">你不一定需要React-Router这篇文章</a>。</p>
<h2 id="articleHeader1">Why React-Router</h2>
<h3 id="articleHeader2">Without React-Router</h3>
<p>React-Router的核心原理是将子组件根据选择注入到<code>{this.props.children}</code>中。在一个多页面的应用程序中，如果我们不使用React-Router，那么整体的代码可能如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import React from 'react'

import { render } from 'react-dom'



const About = React.createClass({/*...*/})

const Inbox = React.createClass({/*...*/})

const Home = React.createClass({/*...*/})



const App = React.createClass({

  getInitialState() {

    return {

      route: window.location.hash.substr(1)

    }

  },



  componentDidMount() {

    window.addEventListener('hashchange', () => {

      this.setState({

        route: window.location.hash.substr(1)

      })

    })

  },



  render() {

    let Child

    switch (this.state.route) {

      case '/about': Child = About; break;

      case '/inbox': Child = Inbox; break;

      default:      Child = Home;

    }



    return (

      <div>

        <h1>App</h1>

        <ul>

          <li><a href=&quot;#/about&quot;>About</a></li>

          <li><a href=&quot;#/inbox&quot;>Inbox</a></li>

        </ul>

        <Child/>

      </div>

    )

  }

})



render(<App />, document.body)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>



<span class="hljs-keyword">const</span> About = React.createClass({<span class="hljs-comment">/*...*/</span>})

<span class="hljs-keyword">const</span> Inbox = React.createClass({<span class="hljs-comment">/*...*/</span>})

<span class="hljs-keyword">const</span> Home = React.createClass({<span class="hljs-comment">/*...*/</span>})



<span class="hljs-keyword">const</span> App = React.createClass({

  getInitialState() {

    <span class="hljs-keyword">return</span> {

      <span class="hljs-attr">route</span>: <span class="hljs-built_in">window</span>.location.hash.substr(<span class="hljs-number">1</span>)

    }

  },



  componentDidMount() {

    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, () =&gt; {

      <span class="hljs-keyword">this</span>.setState({

        <span class="hljs-attr">route</span>: <span class="hljs-built_in">window</span>.location.hash.substr(<span class="hljs-number">1</span>)

      })

    })

  },



  render() {

    <span class="hljs-keyword">let</span> Child

    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.state.route) {

      <span class="hljs-keyword">case</span> <span class="hljs-string">'/about'</span>: Child = About; <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">'/inbox'</span>: Child = Inbox; <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">default</span>:      Child = Home;

    }



    <span class="hljs-keyword">return</span> (

      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/inbox"</span>&gt;</span>Inbox<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Child</span>/&gt;</span>

      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    )

  }

})



render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.body)
</span></code></pre>
<p>可以看出，在原始的多页面程序配置下，我们需要在<code>render</code>函数中手动地根据传入的Props来决定应该填充哪个组件，这样就导致了父子页面之间的耦合度过高，并且这种命令式的方式可维护性也比较差，也不是很直观。</p>
<h3 id="articleHeader3">With React-Router</h3>
<p>在React-Router的协助下，我们的路由配置可能如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import React from 'react'

import { render } from 'react-dom'



// First we import some modules...

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'



// Then we delete a bunch of code from App and

// add some <Link> elements...

const App = React.createClass({

  render() {

    return (

      <div>

        <h1>App</h1>

        {/* change the <a>s to <Link>s */}

        <ul>

          <li><Link to=&quot;/about&quot;>About</Link></li>

          <li><Link to=&quot;/inbox&quot;>Inbox</Link></li>

        </ul>



        {/*

          next we replace `<Child>` with `this.props.children`

          the router will figure out the children for us

        */}

        {this.props.children}

      </div>

    )

  }

})



// Finally, we render a <Router> with some <Route>s.

// It does all the fancy routing stuff for us.

render((

  <Router history={hashHistory}>

    <Route path=&quot;/&quot; component={App}>

      <IndexRoute component={Home} />

      <Route path=&quot;about&quot; component={About} />

      <Route path=&quot;inbox&quot; component={Inbox} />

    </Route>

  </Router>

), document.body)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
import React from 'react'

import { render } from 'react-dom'



// First we import some modules...

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'



// Then we delete a bunch of code from App and

// add some <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>&gt;</span> elements...

const App = React.createClass({

  render() {

    return (

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

        {/* change the <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>s to <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>&gt;</span>s */}

        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/inbox"</span>&gt;</span>Inbox<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>



        {/*

          next we replace `<span class="hljs-tag">&lt;<span class="hljs-name">Child</span>&gt;</span>` with `this.props.children`

          the router will figure out the children for us

        */}

        {this.props.children}

      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    )

  }

})



// Finally, we render a <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span> with some <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>&gt;</span>s.

// It does all the fancy routing stuff for us.

render((

  <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{hashHistory}</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"about"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"inbox"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Inbox}</span> /&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>

), document.body)
</code></pre>
<p>React Router提供了统一的声明式全局路由配置方案，使我们在父组件内部不需要再去关系应该如何选择子组件、应该如何控制组件间的跳转等等。而如果你希望将路由配置独立于应用程序，你也可以使用简单的JavaScript Object来进行配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const routes = {

  path: '/',

  component: App,

  indexRoute: { component: Home },

  childRoutes: [

    { path: 'about', component: About },

    { path: 'inbox', component: Inbox },

  ]

}



render(<Router history={history} routes={routes} />, document.body)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>
const routes = {

  path: <span class="hljs-string">'/'</span>,

  componen<span class="hljs-variable">t:</span> App,

  indexRoute: { componen<span class="hljs-variable">t:</span> Home },

  childRoute<span class="hljs-variable">s:</span> [

    { path: <span class="hljs-string">'about'</span>, componen<span class="hljs-variable">t:</span> About },

    { path: <span class="hljs-string">'inbox'</span>, componen<span class="hljs-variable">t:</span> Inbox },

  ]

}



render(&lt;Router <span class="hljs-keyword">history</span>={<span class="hljs-keyword">history</span>} routes={routes} /&gt;, document.body)
</code></pre>
<h2 id="articleHeader4">Reference</h2>
<h3 id="articleHeader5">Tutorials &amp; Docs</h3>
<ul>
<li><p><a href="https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.ccpvbjkxi" rel="nofollow noreferrer" target="_blank">Beginner’s Guide to React Router</a></p></li>
<li><p><a href="https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d#.hzfajjq3t" rel="nofollow noreferrer" target="_blank">you-might-not-need-react-router</a></p></li>
<li><p><a href="http://react-guide.github.io/react-router-cn/index.html" rel="nofollow noreferrer" target="_blank">React Router 中文文档</a></p></li>
</ul>
<h1 id="articleHeader6">Route Configuration:路由配置</h1>
<p>在将React Router集成到项目中之后，我们会使用<code>Router</code>对象作为根容器包裹数个Route配置，而Route也就意味着一系列用于指示Router应该如何匹配URL的规则。以简单的TodoAPP为例，其路由配置如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to=&quot;/about&quot;>About</Link></li>
          <li><Link to=&quot;/inbox&quot;>Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || &quot;Welcome to your Inbox&quot;}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

render((
  <Router>
    <Route path=&quot;/&quot; component={App}>
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;inbox&quot; component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> { Router, Route, Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

<span class="hljs-keyword">const</span> App = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/inbox"</span>&gt;</span>Inbox<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
})

<span class="hljs-keyword">const</span> About = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
  }
})

<span class="hljs-keyword">const</span> Inbox = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Inbox<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        {this.props.children || "Welcome to your Inbox"}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
})

<span class="hljs-keyword">const</span> Message = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Message {this.props.params.id}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
  }
})

render((
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      &lt;Route path="about" component={About} /&gt;
      &lt;Route path="inbox" component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.body)</code></pre>
<p>根据以上的配置，Router能够智能地处理以下几个路由跳转:</p>
<table>
<thead><tr>
<th>URL</th>
<th>Components</th>
</tr></thead>
<tbody>
<tr>
<td><code>/</code></td>
<td><code>App</code></td>
</tr>
<tr>
<td><code>/about</code></td>
<td><code>App -&gt; About</code></td>
</tr>
<tr>
<td><code>/inbox</code></td>
<td><code>App -&gt; Inbox</code></td>
</tr>
<tr>
<td><code>/inbox/messages/:id</code></td>
<td><code>App -&gt; Inbox -&gt; Message</code></td>
</tr>
</tbody>
</table>
<h3 id="articleHeader7">添加默认路由</h3>
<p>在上面的配置中，如果我们默认访问的<code>/</code>地址，那么根据React Router的原理此时并没有选定任何的子组件进行注入，即此时的<code>this.props.children</code>值为<code>undefined</code>。而React Router允许我们使用<a href="/docs/API.md#indexroute"><code>&lt;IndexRoute&gt;</code></a> 来配置默认路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { IndexRoute } from 'react-router'

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

render((
  <Router>
    <Route path=&quot;/&quot; component={App}>
      {/* Show the dashboard at / */}
      <IndexRoute component={Dashboard} />
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;inbox&quot; component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { IndexRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

<span class="hljs-keyword">const</span> Dashboard = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome to the app!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
})

render((
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      {/* Show the dashboard at / */}
      &lt;IndexRoute component={Dashboard} /&gt;
      &lt;Route path="about" component={About} /&gt;
      &lt;Route path="inbox" component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.body)</code></pre>
<p>此时整体路由的配置为:</p>
<table>
<thead><tr>
<th>URL</th>
<th>Components</th>
</tr></thead>
<tbody>
<tr>
<td><code>/</code></td>
<td><code>App -&gt; Dashboard</code></td>
</tr>
<tr>
<td><code>/about</code></td>
<td><code>App -&gt; About</code></td>
</tr>
<tr>
<td><code>/inbox</code></td>
<td><code>App -&gt; Inbox</code></td>
</tr>
<tr>
<td><code>/inbox/messages/:id</code></td>
<td><code>App -&gt; Inbox -&gt; Message</code></td>
</tr>
</tbody>
</table>
<h3 id="articleHeader8">将UI与URL解耦</h3>
<p>在上面的配置中，Message组件是Inbox的子组件，因此每次访问Message组件都需要在路由上添加<code>/inbox</code>，这样会导致随着应用层次的加深而部分路由过于冗长，因此React Router还允许将UI与URL的配置解耦，譬如对上述配置的重构方式就是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render((
  <Router>
    <Route path=&quot;/&quot; component={App}>
      <IndexRoute component={Dashboard} />
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;inbox&quot; component={Inbox} />

      {/* Use /messages/:id instead of /inbox/messages/:id */}
      <Route component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">render((
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      &lt;IndexRoute component={Dashboard} /&gt;
      &lt;Route path="about" component={About} /&gt;
      &lt;Route path="inbox" component={Inbox} /&gt;

      {/* Use /messages/:id instead of /inbox/messages/:id */}
      &lt;Route component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.body)</code></pre>
<p>这样近似于绝对路径访问的方式能够提高整体路由配置的可读性，我们不需要在URL中添加更多的Segments来访问内部的组件，此时的整体路由配置为:</p>
<table>
<thead><tr>
<th>URL</th>
<th>Components</th>
</tr></thead>
<tbody>
<tr>
<td><code>/</code></td>
<td><code>App -&gt; Dashboard</code></td>
</tr>
<tr>
<td><code>/about</code></td>
<td><code>App -&gt; About</code></td>
</tr>
<tr>
<td><code>/inbox</code></td>
<td><code>App -&gt; Inbox</code></td>
</tr>
<tr>
<td><code>/messages/:id</code></td>
<td><code>App -&gt; Inbox -&gt; Message</code></td>
</tr>
</tbody>
</table>
<blockquote><p>注意，绝对路径可能无法使用在动态路由中。</p></blockquote>
<h3 id="articleHeader9">重定向路由</h3>
<p>React Router提供了<a href="/docs/API.md#redirect"><code>&lt;Redirect&gt;</code></a>来允许我们将某个路由重定向到其他路由，譬如对于上面的配置中，当我们将Message组件设置为绝对路径访问而部分开发者仍然使用<code>/inbox/message/:id</code>方式进行访问时:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Redirect } from 'react-router'

render((
  <Router>
    <Route path=&quot;/&quot; component={App}>
      <IndexRoute component={Dashboard} />
      <Route path=&quot;about&quot; component={About} />

      <Route path=&quot;inbox&quot; component={Inbox}>
        {/* Redirect /inbox/messages/:id to /messages/:id */}
        <Redirect from=&quot;messages/:id&quot; to=&quot;/messages/:id&quot; />
      </Route>

      <Route component={Inbox}>
        <Route path=&quot;messages/:id&quot; component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { Redirect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

render((
  &lt;Router&gt;
    &lt;Route path="/" component={App}&gt;
      &lt;IndexRoute component={Dashboard} /&gt;
      &lt;Route path="about" component={About} /&gt;

      &lt;Route path="inbox" component={Inbox}&gt;
        {/* Redirect /inbox/messages/:id to /messages/:id */}
        &lt;Redirect from="messages/:id" to="/messages/:id" /&gt;
      &lt;/Route&gt;

      &lt;Route component={Inbox}&gt;
        &lt;Route path="messages/:id" component={Message} /&gt;
      &lt;/Route&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.body)</code></pre>
<p>此时对于 <code>/inbox/messages/5</code>会被自动重定向到<code>/messages/5</code>。</p>
<h3 id="articleHeader10">非JSX方式配置</h3>
<p>当我们使用JSX方式进行配置时，其嵌入式的层次结构有助于提高路由的可读性，不同组件之间的关系也能较好地表现出来。不过很多时候我们仍然希望使用单纯的JS对象进行配置而避免使用JSX语法。注意，如果使用单纯的JS对象进行配置的时候，我们无法再使用 <code>&lt;Redirect&gt;</code>，因此你只能够在<code>onEnter</code>钩子中配置重定向。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    {
      path: 'inbox',
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id',
        onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
      }]
    },
    {
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id', component: Message
      }]
    }
  ]
}

render(<Router routes={routes} />, document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routes = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">component</span>: App,
  <span class="hljs-attr">indexRoute</span>: { <span class="hljs-attr">component</span>: Dashboard },
  <span class="hljs-attr">childRoutes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'about'</span>, <span class="hljs-attr">component</span>: About },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'inbox'</span>,
      <span class="hljs-attr">component</span>: Inbox,
      <span class="hljs-attr">childRoutes</span>: [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'messages/:id'</span>,
        <span class="hljs-attr">onEnter</span>: <span class="hljs-function">(<span class="hljs-params">{ params }, replace</span>) =&gt;</span> replace(<span class="hljs-string">`/messages/<span class="hljs-subst">${params.id}</span>`</span>)
      }]
    },
    {
      <span class="hljs-attr">component</span>: Inbox,
      <span class="hljs-attr">childRoutes</span>: [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'messages/:id'</span>, <span class="hljs-attr">component</span>: Message
      }]
    }
  ]
}

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">routes</span>=<span class="hljs-string">{routes}</span> /&gt;</span>, document.body)</span></code></pre>
<h1 id="articleHeader11">Route Matching:路由匹配</h1>
<p>路由主要依靠三个属性来判断其是否与某个URL相匹配:</p>
<ol>
<li><p>嵌套的层级</p></li>
<li><p>路径</p></li>
<li><p>优先级</p></li>
</ol>
<h3 id="articleHeader12">Nesting</h3>
<p>React Router提供了嵌套式的路由声明方案来表述组件之间的从属关系，嵌套式的路由就好像树形结构一样，而React Router来对某个URL进行匹配的时候也会按照深度优先的搜索方案进行匹配搜索。</p>
<h3 id="articleHeader13">Path Syntax:路径表达式</h3>
<p>一个典型的路由路径由以下几个部分组成:</p>
<ul>
<li><p><code>:paramName</code> – 匹配参数直到 <code>/</code>, <code>?</code>, or <code>#</code>.</p></li>
<li><p><code>()</code> – 匹配可选的路径</p></li>
<li><p><code>*</code> – 非贪婪匹配所有的路径</p></li>
<li><p><code>**</code> - 贪婪匹配所有字符直到 <code>/</code>, <code>?</code>, or <code>#</code></p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/hello/:name&quot;>         // 匹配 /hello/michael and /hello/ryan
<Route path=&quot;/hello(/:name)&quot;>       // 匹配 /hello, /hello/michael, and /hello/ryan
<Route path=&quot;/files/*.*&quot;>           // 匹配 /files/hello.jpg and /files/hello.html
<Route path=&quot;/**/*.jpg&quot;>            // 匹配 /files/hello.jpg and /files/path/to/file.jpg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"/hello/:name"</span>&gt;         <span class="hljs-comment">// 匹配 /hello/michael and /hello/ryan</span>
&lt;Route path=<span class="hljs-string">"/hello(/:name)"</span>&gt;       <span class="hljs-comment">// 匹配 /hello, /hello/michael, and /hello/ryan</span>
&lt;Route path=<span class="hljs-string">"/files/*.*"</span>&gt;           <span class="hljs-comment">// 匹配 /files/hello.jpg and /files/hello.html</span>
&lt;Route path=<span class="hljs-string">"/**/*.jpg"</span>&gt;            <span class="hljs-comment">// 匹配 /files/hello.jpg and /files/path/to/file.jpg</span></code></pre>
<h3 id="articleHeader14">Precedence:优先级</h3>
<p>路由算法自动根据路由的定义顺序来决定其优先级，因此你在定义路由的时候需要注意前一个路由定义不能完全覆盖下一个路由的全部跳转情况:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/comments&quot; ... />
<Redirect from=&quot;/comments&quot; ... />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"/comments"</span> ... /&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">"/comments"</span> <span class="hljs-attr">...</span> /&gt;</span></span></code></pre>
<h1 id="articleHeader15">History</h1>
<blockquote><ul><li><p><a href="https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md" rel="nofollow noreferrer" target="_blank">Histories官方文档</a></p></li></ul></blockquote>
<p>React Router 是建立在 <a href="https://github.com/rackt/history" rel="nofollow noreferrer" target="_blank">history</a> 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 <code>location</code> 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。常用的 history 有三种形式， 但是你也可以使用 React Router 实现自定义的 history。</p>
<ul>
<li><p><a href="http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#createhashhistory" rel="nofollow noreferrer" target="_blank"><code>hashHistory</code></a></p></li>
<li><p><a href="http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#createbrowserhistory" rel="nofollow noreferrer" target="_blank"><code>browserHistory</code></a></p></li>
<li><p><a href="http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#creatememoryhistory" rel="nofollow noreferrer" target="_blank"><code>createMemoryHistory</code></a></p></li>
</ul>
<p>从 React Router 库中获取它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JavaScript module import
import { browserHistory } from 'react-router'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> JavaScript <span class="hljs-built_in">module</span> <span class="hljs-keyword">import</span>
<span class="hljs-keyword">import</span> { browserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
</code></pre>
<p>然后可以传入到<code>&lt;Router&gt;</code>的配置中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>render(
  <span class="hljs-name">&lt;Router</span> history={browserHistory} routes={routes} /&gt;,
  document.getElementById('app')
)</code></pre>
<h2 id="articleHeader16">
<code>createHashHistory</code>:用于客户端跳转</h2>
<p>这是一个你会获取到的默认 history ，如果你不指定某个 history （即 <code>{/* your routes */}</code>）。它用到的是 URL 中的 hash（<code>#</code>）部分去创建形如 <code>example.com/#/some/path</code> 的路由。</p>
<h4>我应该使用 <code>createHashHistory</code>吗？</h4>
<p>Hash history 是默认的，因为它可以在服务器中不作任何配置就可以运行，并且它在全部常用的浏览器包括 IE8+ 都可以用。但是我们不推荐在实际生产中用到它，因为每一个 web 应用都应该有目的地去使用<code>createBrowserHistory</code>。</p>
<h4>像这样 <code>?_k=ckuvup</code> 没用的在 URL 中是什么？</h4>
<p>当一个 history 通过应用程序的 <code>pushState</code> 或 <code>replaceState</code> 跳转时，它可以在新的 location 中存储 “location state” 而不显示在 URL 中，这就像是在一个 HTML 中 post 的表单数据。在 DOM API 中，这些 hash history 通过 <code>window.location.hash = newHash</code> 很简单地被用于跳转，且不用存储它们的location state。但我们想全部的 history 都能够使用location state，因此我们要为每一个 location 创建一个唯一的 key，并把它们的状态存储在 session storage 中。当访客点击“后退”和“前进”时，我们就会有一个机制去恢复这些 location state。你也可以不使用这个特性 (更多内容点击<a href="http://rackt.org/history/stable/HashHistoryCaveats.html" rel="nofollow noreferrer" target="_blank">这里</a>):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 选择退出连续的 state， 不推荐使用
let history = createHistory({
  queryKey: false
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 选择退出连续的 <span class="hljs-keyword">state</span>， 不推荐使用
let history = createHistory({
  queryKey: false
});
</code></pre>
<h3 id="articleHeader17">
<code>createBrowserHistory</code>:用于服务端跳转</h3>
<p>Browser history 是由 React Router 创建浏览器应用推荐的 history。它使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/History" rel="nofollow noreferrer" target="_blank">History</a> API 在浏览器中被创建用于处理 URL，新建一个像这样真实的 URL <code>example.com/some/path</code>。</p>
<h4>服务器配置</h4>
<p>首先服务器应该能够处理 URL 请求。处理应用启动最初的 <code>/</code> 这样的请求应该没问题，但当用户来回跳转并在 <code>/accounts/123</code> 刷新时，服务器就会收到来自 <code>/accounts/123</code> 的请求，这时你需要处理这个 URL 并在响应中包含 JavaScript 程序代码。</p>
<p>一个 express 的应用可能看起来像这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

// 通常用于加载静态资源
app.use(express.static(__dirname + '/public'))

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log(&quot;server started on port &quot; + port)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> port = process.env.PORT || <span class="hljs-number">8080</span>
<span class="hljs-keyword">const</span> app = express()

<span class="hljs-comment">// 通常用于加载静态资源</span>
app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(__dirname + <span class="hljs-string">'/public'</span>))

<span class="hljs-comment">// 在你应用 JavaScript 文件中包含了一个 script 标签</span>
<span class="hljs-comment">// 的 index.html 中处理任何一个 route</span>
app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(request, response)</span></span>{
  response.sendFile(path.resolve(__dirname, <span class="hljs-string">'public'</span>, <span class="hljs-string">'index.html'</span>))
})

app.listen(port)
console.log(<span class="hljs-string">"server started on port "</span> + port)
</code></pre>
<p>如果你的服务器是 nginx，请使用 <a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#try_files" rel="nofollow noreferrer" target="_blank"><code>try_files</code> directive</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
  ...
  location / {
    try_files $uri /index.html
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>server {
  ...
  <span class="hljs-keyword">location</span> <span class="hljs-title">/ {
    try_files</span> $uri /index.html
  }
}
</code></pre>
<p>当在服务器上找不到其他文件时，这就会让 nginx 服务器生成静态文件和操作 <code>index.html</code> 文件。</p>
<h4>IE8, IE9 支持情况</h4>
<p>如果我们能使用浏览器自带的 <code>window.history</code> API，那么我们的特性就可以被浏览器所检测到。如果不能，那么任何调用跳转的应用就会导致 <strong>全页面刷新</strong>，它允许在构建应用和更新浏览器时会有一个更好的用户体验，但仍然支持的是旧版的。</p>
<p>你可能会想为什么我们不后退到 hash history，问题是这些 URL 是不确定的。如果一个访客在 hash history 和 browser history 上共享一个 URL，然后他们也共享同一个后退功能，最后我们会以产生笛卡尔积数量级的、无限多的 URL 而崩溃。</p>
<h3 id="articleHeader18">
<code>createMemoryHistory</code>:非地址栏呈现</h3>
<p>Memory history 不会在地址栏被操作或读取。这就解释了我们是如何实现服务器渲染的。同时它也非常适合测试和其他的渲染环境（像 React Native ）。</p>
<h2 id="articleHeader19">实现示例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import About from '../components/About'
import Features from '../components/Features'

React.render(
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='features' component={Features} />
    </Route>
  </Router>,
  document.getElementById('app')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> createBrowserHistory <span class="hljs-keyword">from</span> <span class="hljs-string">'history/lib/createBrowserHistory'</span>
<span class="hljs-keyword">import</span> { Router, Route, IndexRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/App'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Home'</span>
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/About'</span>
<span class="hljs-keyword">import</span> Features <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Features'</span>

React.render(
  &lt;Router history={createBrowserHistory()}&gt;
    &lt;Route path=<span class="hljs-string">'/'</span> component={App}&gt;
      &lt;IndexRoute component={Home} /&gt;
      &lt;Route path=<span class="hljs-string">'about'</span> component={About} /&gt;
      &lt;Route path=<span class="hljs-string">'features'</span> component={Features} /&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
)</code></pre>
<h1 id="articleHeader20">Router Control:路由控制</h1>
<h2 id="articleHeader21">Manual Navigation:手动导航</h2>
<p>在2.4.0版本之前，<code>router</code>对象通过<code>this.context</code>进行传递，不过这种方式往往会引起莫名的错误。因此在2.4.0版本之后推荐的是采取所谓的HOC模式进行router对象的访问，React Router也提供了一个<code>withRouter</code>函数来方便进行封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { withRouter } from 'react-router'

const Page = React.createClass({
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.unsaved)
        return 'You have unsaved information, are you sure you want to leave this page?'
    })
  },

  render() {
    return <div>Stuff</div>
  }
})

export default withRouter(Page)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

<span class="hljs-keyword">const</span> Page = React.createClass({
  componentDidMount() {
    <span class="hljs-keyword">this</span>.props.router.setRouteLeaveHook(<span class="hljs-keyword">this</span>.props.route, () =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.unsaved)
        <span class="hljs-keyword">return</span> <span class="hljs-string">'You have unsaved information, are you sure you want to leave this page?'</span>
    })
  },

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Stuff<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRouter(Page)</code></pre>
<p>然后在某个具体的组件内部，可以使用<code>this.props.router</code>来获取<code>router</code>对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push('/users/12')

// or with a location descriptor object
router.push({
  pathname: '/users/12',
  query: { modal: true },
  state: { fromDashboard: true }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">'/users/12'</span>)

<span class="hljs-comment">// or with a location descriptor object</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({
  <span class="hljs-attribute">pathname</span>: <span class="hljs-string">'/users/12'</span>,
  <span class="hljs-attribute">query</span>: { <span class="hljs-attribute">modal</span>: true },
  <span class="hljs-attribute">state</span>: { <span class="hljs-attribute">fromDashboard</span>: true }
})</code></pre>
<p>router对象的常见方法有:</p>
<ul>
<li><p>replace(pathOrLoc):Identical to push except replaces the current history entry with a new one.</p></li>
<li><p>go(n):Go forward or backward in the history by n or -n.</p></li>
<li><p>goBack():Go back one entry in the history.</p></li>
<li><p>goForward():Go forward one entry in the history.</p></li>
</ul>
<h2 id="articleHeader22">Confirming Navigation:跳转前确认</h2>
<p>React Router提供了钩子函数以方便我们在正式执行跳转前进行确认:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Home = withRouter(
  React.createClass({

    componentDidMount() {
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    },

    routerWillLeave(nextLocation) {
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?'
    },

    // ...

  })
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>const Home = withRouter(
  React.createClass({

    componentDidMount() {
      <span class="hljs-keyword">this</span>.props.router.setRouteLeaveHook(<span class="hljs-keyword">this</span>.props.route, <span class="hljs-keyword">this</span>.routerWillLeave)
    },

    routerWillLeave(nextLocation) {
      <span class="hljs-comment">// return false to prevent a transition w/o prompting the user,</span>
      <span class="hljs-comment">// or return a string to allow the user to decide:</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.state.isSaved)
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Your work is not saved! Are you sure you want to leave?'</span>
    },

    <span class="hljs-comment">// ...</span>

  })
)</code></pre>
<h3 id="articleHeader23">Enter and Leave Hooks</h3>
<p>除了跳转确认之外，<a href="/docs/Glossary.md#route">Route</a>也提供了钩子函数以通知我们当路由发生时的情况，可以有助于我们进行譬如页面权限认证等等操作:</p>
<ul>
<li><p><code>onLeave</code> : 当我们离开某个路由时</p></li>
<li><p><code>onEnter</code> : 当我们进入某个路由时</p></li>
</ul>
<h2 id="articleHeader24">Navigating Outside Of Components:组件外路由</h2>
<p>如果我们在React Component组件外，譬如Reducer或者Service中需要进行路由跳转的时候，我们可以直接使用<code>history</code>对象进行手动跳转:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// your main file that renders a Router
import { Router, browserHistory } from 'react-router'
import routes from './app/routes'
render(<Router history={browserHistory} routes={routes}/>, el)
// somewhere like a redux/flux action file:
import { browserHistory } from 'react-router'
browserHistory.push('/some/path')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// your main file that renders a Router</span>
<span class="hljs-keyword">import</span> { Router, browserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./app/routes'</span>
render(&lt;Router history={browserHistory} routes={routes}/&gt;, el)
<span class="hljs-comment">// somewhere like a redux/flux action file:</span>
<span class="hljs-keyword">import</span> { browserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
browserHistory.push(<span class="hljs-string">'/some/path'</span>)</code></pre>
<h1 id="articleHeader25">Async:异步路由加载</h1>
<blockquote><p><a href="http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/" rel="nofollow noreferrer" target="_blank">implicit-code-splitting-with-react-router-and-webpack</a></p></blockquote>
<h2 id="articleHeader26">Dynamic Routing Configuration:动态的路由配置</h2>
<p>在介绍对于组件的异步加载之前，React Router也是支持对于路由配置文件的异步加载的。可以参考<a href="https://github.com/reactjs/react-router/tree/master/examples/huge-apps" rel="nofollow noreferrer" target="_blank">huge apps</a>以获得更详细的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CourseRoute = {
  path: 'course/:courseId',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./routes/Announcements'),
        require('./routes/Assignments'),
        require('./routes/Grades'),
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./components/Index'),
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Course'))
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> CourseRoute = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'course/:courseId'</span>,

  getChildRoutes(partialNextState, callback) {
    <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
      callback(<span class="hljs-literal">null</span>, [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/Announcements'</span>),
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/Assignments'</span>),
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/Grades'</span>),
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
      callback(<span class="hljs-literal">null</span>, {
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/Index'</span>),
      })
    })
  },

  getComponents(nextState, callback) {
    <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
      callback(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/Course'</span>))
    })
  }
}</code></pre>
<h2 id="articleHeader27">Lazy Bundle Loading:块/组件的懒加载</h2>
<p>React Router在其官方的<a href="https://github.com/reactjs/react-router/tree/master/examples/huge-apps" rel="nofollow noreferrer" target="_blank">huge apps</a>介绍了一种基于Webpack的异步加载方案，不过其实完全直接使用了Webpack的<code>require.ensure</code>函数，这样导致了大量的冗余代码，并且导致了路由的逻辑被分散到了多个子文件夹中，其样例项目中的文件结构为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── components
├── routes
│   ├── Calendar
│   │   ├── components
│   │   │   └── Calendar.js
│   │   └── index.js
│   ├── Course
│   │   ├── components
│   │   │   ├── Course.js
│   │   │   ├── Dashboard.js
│   │   │   └── Nav.js
│   │   └── routes
│   │       ├── Announcements
│   │       │   ├── components
│   │       │   │   ├── Announcements.js
│   │       │   │   ├── Sidebar.js
│   │       │   ├── routes
│   │       │   │   └── Announcement
│   │       │   │       ├── components
│   │       │   │       │   └── Announcement
│   │       │   │       └── index.js
│   │       │   └── index.js
│   │       ├── Assignments
│   │       │   ├── components
│   │       │   │   ├── Assignments.js
│   │       │   │   ├── Sidebar.js
│   │       │   ├── routes
│   │       │   │   └── Assignment
│   │       │   │       ├── components
│   │       │   │       │   └── Assignment
│   │       │   │       └── index.js
│   │       │   └── index.js
│   │       └── Grades
│   │           ├── components
│   │           │   └── Grades.js
│   │           └── index.js
│   ├── Grades
│   │   ├── components
│   │   │   └── Grades.js
│   │   └── index.js
│   ├── Messages
│   │   ├── components
│   │   │   └── Messages.js
│   │   └── index.js
│   └── Profile
│       ├── components
│       │   └── Profile.js
│       └── index.js
├── stubs
└── app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── components
├── routes
│   ├── Calendar
│   │   ├── components
│   │   │   └── Calendar<span class="hljs-selector-class">.js</span>
│   │   └── index<span class="hljs-selector-class">.js</span>
│   ├── Course
│   │   ├── components
│   │   │   ├── Course<span class="hljs-selector-class">.js</span>
│   │   │   ├── Dashboard<span class="hljs-selector-class">.js</span>
│   │   │   └── Nav<span class="hljs-selector-class">.js</span>
│   │   └── routes
│   │       ├── Announcements
│   │       │   ├── components
│   │       │   │   ├── Announcements<span class="hljs-selector-class">.js</span>
│   │       │   │   ├── Sidebar<span class="hljs-selector-class">.js</span>
│   │       │   ├── routes
│   │       │   │   └── Announcement
│   │       │   │       ├── components
│   │       │   │       │   └── Announcement
│   │       │   │       └── index<span class="hljs-selector-class">.js</span>
│   │       │   └── index<span class="hljs-selector-class">.js</span>
│   │       ├── Assignments
│   │       │   ├── components
│   │       │   │   ├── Assignments<span class="hljs-selector-class">.js</span>
│   │       │   │   ├── Sidebar<span class="hljs-selector-class">.js</span>
│   │       │   ├── routes
│   │       │   │   └── Assignment
│   │       │   │       ├── components
│   │       │   │       │   └── Assignment
│   │       │   │       └── index<span class="hljs-selector-class">.js</span>
│   │       │   └── index<span class="hljs-selector-class">.js</span>
│   │       └── Grades
│   │           ├── components
│   │           │   └── Grades<span class="hljs-selector-class">.js</span>
│   │           └── index<span class="hljs-selector-class">.js</span>
│   ├── Grades
│   │   ├── components
│   │   │   └── Grades<span class="hljs-selector-class">.js</span>
│   │   └── index<span class="hljs-selector-class">.js</span>
│   ├── Messages
│   │   ├── components
│   │   │   └── Messages<span class="hljs-selector-class">.js</span>
│   │   └── index<span class="hljs-selector-class">.js</span>
│   └── Profile
│       ├── components
│       │   └── Profile<span class="hljs-selector-class">.js</span>
│       └── index<span class="hljs-selector-class">.js</span>
├── stubs
└── app.js</code></pre>
<p>这种结构下需要为每个组件写一个单独的index.js加载文件，毫无疑问会加大项目的冗余度。笔者建议是使用<code>bundle-loader</code>来替代<code>require.ensure</code>，这样可以大大简化目前的代码。<code>bundle-loader</code>是对于<code>require.ensuire</code>的抽象，并且能够大大屏蔽底层的实现。如果某个模块选择使用Bundle Loader进行打包，那么其会被打包到一个单独的Chunk中，并且Webpack会自动地为我们生成一个加载函数，从而使得在需要时以异步请求方式进行加载。我们可以选择删除所有子目录下的<code>index.js</code>文件，并且将文件结构进行扁平化处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── components
├── routes
│   ├── Calendar.js
│   ├── Course
│   │   ├── components
│   │   │   ├── Dashboard.js
│   │   │   └── Nav.js
│   │   ├── routes
│   │   │   ├── Announcements
│   │   │   │   ├── routes
│   │   │   │   │   └── Announcement.js
│   │   │   │   ├── Announcements.js
│   │   │   │   └── Sidebar.js
│   │   │   ├── Assignments
│   │   │   │   ├── routes
│   │   │   │   │   └── Assignment.js
│   │   │   │   ├── Assignments.js
│   │   │   │   └── Sidebar.js
│   │   │   └── Grades.js
│   │   └── Course.js
│   ├── Grades.js
│   ├── Messages.js
│   └── Profile.js
├── stubs
└── app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── components
├── routes
│   ├── Calendar<span class="hljs-selector-class">.js</span>
│   ├── Course
│   │   ├── components
│   │   │   ├── Dashboard<span class="hljs-selector-class">.js</span>
│   │   │   └── Nav<span class="hljs-selector-class">.js</span>
│   │   ├── routes
│   │   │   ├── Announcements
│   │   │   │   ├── routes
│   │   │   │   │   └── Announcement<span class="hljs-selector-class">.js</span>
│   │   │   │   ├── Announcements<span class="hljs-selector-class">.js</span>
│   │   │   │   └── Sidebar<span class="hljs-selector-class">.js</span>
│   │   │   ├── Assignments
│   │   │   │   ├── routes
│   │   │   │   │   └── Assignment<span class="hljs-selector-class">.js</span>
│   │   │   │   ├── Assignments<span class="hljs-selector-class">.js</span>
│   │   │   │   └── Sidebar<span class="hljs-selector-class">.js</span>
│   │   │   └── Grades<span class="hljs-selector-class">.js</span>
│   │   └── Course<span class="hljs-selector-class">.js</span>
│   ├── Grades<span class="hljs-selector-class">.js</span>
│   ├── Messages<span class="hljs-selector-class">.js</span>
│   └── Profile<span class="hljs-selector-class">.js</span>
├── stubs
└── app.js</code></pre>
<p>然后我们需要在我们的Webpack中配置如下专门的加载器:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// NOTE: this assumes you're on a Unix system. You will
// need to update this regex and possibly some other config
// to get this working on Windows (but it can still work!)
var routeComponentRegex = /routes\/([^\/]+\/?[^\/]+).js$/  


module.exports = {  
  // ...rest of config...
  modules: {
    loaders: [
      // make sure to exclude route components here
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: routeComponentRegex,
        loader: 'babel'
      },
      // run route components through bundle-loader
      {
        test: routeComponentRegex,
        include: path.resolve(__dirname, 'src'),
        loaders: ['bundle?lazy', 'babel']
      }
    ]
  }
  // ...rest of config...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// NOTE: this assumes you're on a Unix system. You will
// need to <span class="hljs-keyword">update</span> this regex <span class="hljs-keyword">and</span> possibly <span class="hljs-keyword">some</span> other config
// <span class="hljs-keyword">to</span> <span class="hljs-keyword">get</span> this working <span class="hljs-keyword">on</span> Windows (but it can still <span class="hljs-keyword">work</span>!)
<span class="hljs-keyword">var</span> routeComponentRegex = /routes\/([^\/]+\/?[^\/]+).js$/  


module.exports = {  
  // ...rest <span class="hljs-keyword">of</span> config...
  modules: {
    loaders: [
      // make sure <span class="hljs-keyword">to</span> <span class="hljs-keyword">exclude</span> route components here
      {
        <span class="hljs-keyword">test</span>: /\.js$/,
        <span class="hljs-keyword">include</span>: path.resolve(__dirname, <span class="hljs-string">'src'</span>),
        <span class="hljs-keyword">exclude</span>: routeComponentRegex,
        loader: <span class="hljs-string">'babel'</span>
      },
      // run route components <span class="hljs-keyword">through</span> bundle-loader
      {
        <span class="hljs-keyword">test</span>: routeComponentRegex,
        <span class="hljs-keyword">include</span>: path.resolve(__dirname, <span class="hljs-string">'src'</span>),
        loaders: [<span class="hljs-string">'bundle?lazy'</span>, <span class="hljs-string">'babel'</span>]
      }
    ]
  }
  // ...rest <span class="hljs-keyword">of</span> config...
}
</code></pre>
<p>上述配置中是会将<code>routes</code>目录下的所有文件都进行异步打包加载，即将其从主Chunk中移除，而如果你需要指定某个单独的部分进行单独的打包，建议是如下配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
...module: {  loaders: [{
    // use `test` to split a single file
    // or `include` to split a whole folder    test: /.*/,
    include: [path.resolve(__dirname, 'pages/admin')],
    loader: 'bundle?lazy&amp;name=admin'
   }]
  
}
...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
...module: {  loader<span class="hljs-variable">s:</span> [{
    // use `test` <span class="hljs-keyword">to</span> <span class="hljs-keyword">split</span> <span class="hljs-keyword">a</span> single <span class="hljs-keyword">file</span>
    // <span class="hljs-built_in">or</span> `include` <span class="hljs-keyword">to</span> <span class="hljs-keyword">split</span> <span class="hljs-keyword">a</span> whole folder    tes<span class="hljs-variable">t:</span> /.*/,
    include: [path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'pages/admin'</span>)],
    loader: <span class="hljs-string">'bundle?lazy&amp;name=admin'</span>
   }]
  
}
...
}</code></pre>
<p>而后在<code>app.js</code>中，我们只需要用正常的ES6的语法引入组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Webpack is configured to create ajax wrappers around each of these modules.
// Webpack will create a separate chunk for each of these imports (including
// any dependencies)
import Course from './routes/Course/Course'  
import AnnouncementsSidebar from './routes/Course/routes/Announcements/Sidebar'  
import Announcements from './routes/Course/routes/Announcements/Announcements'  
import Announcement from './routes/Course/routes/Announcements/routes/Announcement'  
import AssignmentsSidebar from './routes/Course/routes/Assignments/Sidebar'  
import Assignments from './routes/Course/routes/Assignments/Assignments'  
import Assignment from './routes/Course/routes/Assignments/routes/Assignment'  
import CourseGrades from './routes/Course/routes/Grades'  
import Calendar from './routes/Calendar'  
import Grades from './routes/Grades'  
import Messages from './routes/Messages'  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// Webpack is configured to <span class="hljs-keyword">create</span> ajax wrappers around <span class="hljs-keyword">each</span> <span class="hljs-keyword">of</span> these modules.
// Webpack will <span class="hljs-keyword">create</span> a separate <span class="hljs-keyword">chunk</span> <span class="hljs-keyword">for</span> <span class="hljs-keyword">each</span> <span class="hljs-keyword">of</span> these imports (<span class="hljs-keyword">including</span>
// <span class="hljs-keyword">any</span> dependencies)
<span class="hljs-keyword">import</span> Course <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/Course'</span>  
<span class="hljs-keyword">import</span> AnnouncementsSidebar <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Announcements/Sidebar'</span>  
<span class="hljs-keyword">import</span> Announcements <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Announcements/Announcements'</span>  
<span class="hljs-keyword">import</span> Announcement <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Announcements/routes/Announcement'</span>  
<span class="hljs-keyword">import</span> AssignmentsSidebar <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Assignments/Sidebar'</span>  
<span class="hljs-keyword">import</span> Assignments <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Assignments/Assignments'</span>  
<span class="hljs-keyword">import</span> Assignment <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Assignments/routes/Assignment'</span>  
<span class="hljs-keyword">import</span> CourseGrades <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Course/routes/Grades'</span>  
<span class="hljs-keyword">import</span> Calendar <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Calendar'</span>  
<span class="hljs-keyword">import</span> Grades <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Grades'</span>  
<span class="hljs-keyword">import</span> Messages <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Messages'</span>  
</code></pre>
<p>需要注意的是，这里引入的对象并不是组件本身，而是Webpack为我们提供的一些封装函数，当你真实地需要调用这些组件时，这些组件才会被异步加载进来。而我们在React Router中需要调用<code>route.getComponent</code>函数来异步加载这些组件，我们需要自定义封装一个加载函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function lazyLoadComponents(lazyModules) {  
  return (location, cb) => {
    const moduleKeys = Object.keys(lazyModules);
    const promises = moduleKeys.map(key =>
      new Promise(resolve => lazyModules[key](resolve))
    )

    Promise.all(promises).then(modules => {
      cb(null, modules.reduce((obj, module, i) => {
        obj[moduleKeys[i]] = module;
        return obj;
      }, {}))
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lazyLoadComponents</span>(<span class="hljs-params">lazyModules</span>) </span>{  
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">location, cb</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> moduleKeys = <span class="hljs-built_in">Object</span>.keys(lazyModules);
    <span class="hljs-keyword">const</span> promises = moduleKeys.map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> lazyModules[key](resolve))
    )

    <span class="hljs-built_in">Promise</span>.all(promises).then(<span class="hljs-function"><span class="hljs-params">modules</span> =&gt;</span> {
      cb(<span class="hljs-literal">null</span>, modules.reduce(<span class="hljs-function">(<span class="hljs-params">obj, <span class="hljs-built_in">module</span>, i</span>) =&gt;</span> {
        obj[moduleKeys[i]] = <span class="hljs-built_in">module</span>;
        <span class="hljs-keyword">return</span> obj;
      }, {}))
    })
  }
}</code></pre>
<p>而最后的路由配置方案如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
render(  
  <Router history={ browserHistory }>
    <Route path=&quot;/&quot; component={ App }>
      <Route path=&quot;calendar&quot; getComponent={ lazyLoadComponent(Calendar) } />
      <Route path=&quot;course/:courseId&quot; getComponent={ lazyLoadComponent(Course) }>
        <Route path=&quot;announcements&quot; getComponents={ lazyLoadComponents({
          sidebar: AnnouncementsSidebar,
          main: Announcements
        }) }>
          <Route path=&quot;:announcementId&quot; getComponent={ lazyLoadComponent(Announcement) } />
        </Route>
        <Route path=&quot;assignments&quot; getComponents={ lazyLoadComponents({
          sidebar: AssignmentsSidebar,
          main: Assignments
        }) }>
          <Route path=&quot;:assignmentId&quot; getComponent={ lazyLoadComponent(Assignment) } />
        </Route>
        <Route path=&quot;grades&quot; getComponent={ lazyLoadComponent(CourseGrades) } />
      </Route>
      <Route path=&quot;grades&quot; getComponent={ lazyLoadComponent(Grades) } />
      <Route path=&quot;messages&quot; getComponent={ lazyLoadComponent(Messages) } />
      <Route path=&quot;profile&quot; getComponent={ lazyLoadComponent(Calendar) } />
    </Route>
  </Router>,
  document.getElementById('example')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
render(  
  <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{</span> <span class="hljs-attr">browserHistory</span> }&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{</span> <span class="hljs-attr">App</span> }&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"calendar"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Calendar</span>) } /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"course/:courseId"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Course</span>) }&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"announcements"</span> <span class="hljs-attr">getComponents</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponents</span>({
          <span class="hljs-attr">sidebar:</span> <span class="hljs-attr">AnnouncementsSidebar</span>,
          <span class="hljs-attr">main:</span> <span class="hljs-attr">Announcements</span>
        }) }&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">":announcementId"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Announcement</span>) } /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"assignments"</span> <span class="hljs-attr">getComponents</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponents</span>({
          <span class="hljs-attr">sidebar:</span> <span class="hljs-attr">AssignmentsSidebar</span>,
          <span class="hljs-attr">main:</span> <span class="hljs-attr">Assignments</span>
        }) }&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">":assignmentId"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Assignment</span>) } /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"grades"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">CourseGrades</span>) } /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"grades"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Grades</span>) } /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"messages"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Messages</span>) } /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"profile"</span> <span class="hljs-attr">getComponent</span>=<span class="hljs-string">{</span> <span class="hljs-attr">lazyLoadComponent</span>(<span class="hljs-attr">Calendar</span>) } /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>,
  document.getElementById('example')
)</code></pre>
<p>如果你需要支持服务端渲染，那么需要进行下判断:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function loadComponent(module) {  
  return __CLIENT__
    ? lazyLoadComponent(module)
    : (location, cb) => cb(null, module);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadComponent</span>(<span class="hljs-params">module</span>) </span>{  
  <span class="hljs-keyword">return</span> __CLIENT__
    ? lazyLoadComponent(<span class="hljs-built_in">module</span>)
    : <span class="hljs-function">(<span class="hljs-params">location, cb</span>) =&gt;</span> cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">module</span>);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006767239" src="https://static.alili.tech/img/remote/1460000006767239" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router最新指南与异步加载实践

## 原文链接
[https://segmentfault.com/a/1190000006063554](https://segmentfault.com/a/1190000006063554)


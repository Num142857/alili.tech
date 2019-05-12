---
title: 'react搭建后台管理（react初窥）' 
date: 2018-12-10 2:30:07
hidden: true
slug: 21dgtr3wspz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>以前一直是用vue进行的开发, 于是决定年后弄一弄react, 所以年后这段时间也就一直瞎弄react, 可算是看到成果了</p>
<p>本来是想写一个 类似 <a href="http://dzblog.cn/article/5a78609ec153997e3417a6d4" rel="nofollow noreferrer" target="_blank">Vue仿今日头条</a> 那样的项目来入手, 后来又寻思还不如写个后台管理呢。<br>于是乎便开始捣鼓起来了。</p>
<h4>用到react相关的生态链模块:</h4>
<ul>
<li><code>react</code></li>
<li><code>react-dom</code></li>
<li>
<code>react-router-dom</code>: react-router4以后 好像都是用这个东西了</li>
<li>
<code>react-transition-group</code>: 用来做动画的</li>
<li>
<code>redux</code>: 用来管理全局状态</li>
<li>
<code>react-redux</code>: 用来管理全局状态</li>
<li>
<code>redux-actions</code>: 用来创建action的，而且生成相关reducers的时候也不要写 switch/case 或 if/else 了，主要是方便。</li>
<li>
<code>redux-thunk</code>: <code>redux</code>的中间件， 用来处理我们异步action</li>
<li>
<code>antd</code>: 随便找的一个比较常用的react-UI库</li>
</ul>
<p>跟react相关的主要就是这个几个了<br> 至于webpack 配置，基本跟以前配置vue的基本没多大区别。</p>
<h4>文件目录讲解：</h4>
<p><span class="img-wrap"><img data-src="/img/bV5HyK?w=370&amp;h=512" src="https://static.alili.tech/img/bV5HyK?w=370&amp;h=512" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul>
<li>
<code>build</code>: 用来放置关于webpack的配置</li>
<li>
<code>config</code>: 项目配置</li>
<li>
<code>src</code>: 源码</li>
<li>
<code>static</code>: 静态资源</li>
<li>
<code>.babelrc</code>: babel配置</li>
<li>
<code>postcss.config.js</code>: css配置</li>
</ul>
<h4>别的目录就不说了，主要介绍一个<code>src</code>下的目录结构</h4>
<p><span class="img-wrap"><img data-src="/img/bV5HyN?w=352&amp;h=558" src="https://static.alili.tech/img/bV5HyN?w=352&amp;h=558" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<code>actions</code>: 放redux中action相关的地方</li>
<li>
<code>reducers</code>: 放redux中reducer相关的地方</li>
<li>
<code>assets</code>: 项目静态资源</li>
<li>
<code>components</code>: 常用的公共组件</li>
<li>
<code>router</code>: 路由相关的配置</li>
<li>
<code>store</code>: redux的配置</li>
<li>
<code>styles</code>: 公共样式文件</li>
<li>
<code>utils</code>: 工具类的封装</li>
<li>
<code>view</code>: 所有页面的主体结构</li>
<li>
<code>main.js</code>: 项目入口文件</li>
<li>
<code>config.js</code>: 公共属性配置</li>
</ul>
<h3 id="articleHeader1">1. react 的 几种书写方式</h3>
<ul><li>React.createClass</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
const MyComponent = React.createClass({
   render () {
       return (
           <h2>我是React.createClass生成的组件</h2>
       )
   }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">const</span> MyComponent = React.createClass({
   render () {
       <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是React.createClass生成的组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
       )
   }
})</code></pre>
<ol>
<li>React.createClass会自绑定函数方法（不像React.Component只绑定需要关心的函数）导致不必要的性能开销，增加代码过时的可能性</li>
<li>React.createClass的mixins不够自然、直观；</li>
</ol>
<hr>
<ul><li>React.Component</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
class MyComponent from React.Component {
    render () {
        return (
            <h2>我是React.Component生成的组件</h2>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-title">from</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render () {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是React.Component生成的组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
        )
    }
}</code></pre>
<ol>
<li>需要手动绑定this指向</li>
<li>React.Component形式非常适合高阶组件（Higher Order Components--HOC）,它以更直观的形式展示了比mixins更强大的功能，并且HOC是纯净的JavaScript，不用担心他们会被废弃</li>
</ol>
<hr>
<ul><li>无状态函数式组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
 const MyComponent = (props) => (
     <h2>我是无状态函数式组件</h2>
 )
 ReactDOM.render(<MyComponent name=&quot;Sebastian&quot; />, mountNode)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
 <span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是无状态函数式组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
 )
 ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Sebastian"</span> /&gt;</span>, mountNode)</span></code></pre>
<ol>
<li>无状态组件的创建形式使代码的可读性更好，并且减少了大量冗余的代码，精简至只有一个render方法，大大的增强了编写一个组件的便利</li>
<li>组件不会被实例化，整体渲染性能得到提升</li>
<li>组件不能访问this对象</li>
<li>组件无法访问生命周期的方法</li>
<li>无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用</li>
</ol>
<h3 id="articleHeader2">2. 路由拦截</h3>
<p>路由拦截这块费了挺长时间，本来是想找个类似vue的beforeRouter这个种钩子函数，发现没有。</p>
<p>然后后面找到<code>history</code>模块，发现有个这东西有个监听路由的方法，最开始就用这它，但是我突然切成hash模式进行开发的时候，发现通过<code>history.push(path, [state])</code>设置state属性的时候出了问题，这东西好像只能给history模式设置state属性，但是我有部分东西是通过设置state属性来进来的，于是便放弃了这个方法寻找新的方法。</p>
<p>后面发现可以通过监听根路径的 <code>componentWillReceiveProps</code> 钩子函数 便可以达到监听的效果。</p>
<p>这钩子函数只要props改变便会触发，因为每次切换路由 <code>location</code> 的<code>pathname</code>总是不同的，所有只要切换路径便会触发这个这个钩子函数。这东西容易触发死循环，所以记得做好判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MainComponents extends React.Component {
    componentWillMount () { // 第一次进来触发
        this.dataInit(this.props)
    }
    componentWillReceiveProps(nextProps){ // 以后每次变化props都会触发
        // 如果死循环了 可能是某个属性设置会更新props上属性，所以导致一直循环，这个时候记得做好判断
        this.dataInit(nextProps)
    }
    render () {
        // 404
        if (!isExistPath(allRoutes, pathname)) return <Redirect to='/error/404'/>
        
        //当前路径路由信息
        let currRoute = getRoute(allRoutes, pathname)

        // 非白名单验证
        if (!whiteList.some(path => path === pathname)) {

            // 登录验证
            if (!Cookie.get('Auth_Token')) {
                return <Redirect to="{{" pathname: '/login' "}}" />
            }
            
            // 获取用户信息
            if (!user) {
                this.getUserInfo(() => {
                    this.setRoutesByRole(this.props.user.roles)
                })
            }
        }
        // 401
        if (user &amp;&amp; currRoute) {
            if (!isAuth(currRoute.role, user)) return <Redirect to='/error/401'/>
        }

        // 网页title
        document.title = currRoute.name
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainComponents</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentWillMount () { <span class="hljs-comment">// 第一次进来触发</span>
        <span class="hljs-keyword">this</span>.dataInit(<span class="hljs-keyword">this</span>.props)
    }
    componentWillReceiveProps(nextProps){ <span class="hljs-comment">// 以后每次变化props都会触发</span>
        <span class="hljs-comment">// 如果死循环了 可能是某个属性设置会更新props上属性，所以导致一直循环，这个时候记得做好判断</span>
        <span class="hljs-keyword">this</span>.dataInit(nextProps)
    }
    render () {
        <span class="hljs-comment">// 404</span>
        <span class="hljs-keyword">if</span> (!isExistPath(allRoutes, pathname)) <span class="hljs-keyword">return</span> &lt;Redirect to=<span class="hljs-string">'/error/404'</span>/&gt;
        
        <span class="hljs-comment">//当前路径路由信息</span>
        let currRoute = getRoute(allRoutes, pathname)

        <span class="hljs-comment">// 非白名单验证</span>
        <span class="hljs-keyword">if</span> (!whiteList.some(path =&gt; path === pathname)) {

            <span class="hljs-comment">// 登录验证</span>
            <span class="hljs-keyword">if</span> (!Cookie.<span class="hljs-keyword">get</span>(<span class="hljs-string">'Auth_Token'</span>)) {
                <span class="hljs-keyword">return</span> &lt;Redirect to="{{" pathname: <span class="hljs-string">'/login'</span> "}}" /&gt;
            }
            
            <span class="hljs-comment">// 获取用户信息</span>
            <span class="hljs-keyword">if</span> (!user) {
                <span class="hljs-keyword">this</span>.getUserInfo(() =&gt; {
                    <span class="hljs-keyword">this</span>.setRoutesByRole(<span class="hljs-keyword">this</span>.props.user.roles)
                })
            }
        }
        <span class="hljs-comment">// 401</span>
        <span class="hljs-keyword">if</span> (user &amp;&amp; currRoute) {
            <span class="hljs-keyword">if</span> (!isAuth(currRoute.role, user)) <span class="hljs-keyword">return</span> &lt;Redirect to=<span class="hljs-string">'/error/401'</span>/&gt;
        }

        <span class="hljs-comment">// 网页title</span>
        document.title = currRoute.name
    }
}
</code></pre>
<h3 id="articleHeader3">3. 路由集中设置</h3>
<p>用过vue的都知道我们一般都是通过<code>new Router({routes})</code> 来集中管理路由表。但是react-router好像不能这么设置。最新的版本好像连嵌套都不行。<br>  于是乎自己便着手简单的搭建了一个集中设置的版本 。不过后面我看到个插件好像是可以管理的 <a href="https://www.npmjs.com/package/react-router-config" rel="nofollow noreferrer" target="_blank">react-router-config</a>,不过我也还没试过，也不知道可不可行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 路由表
const allRoutes = [
  {
    path: '/auth',
    login: true,
    layout: true,
    icon: 'user',
    name: '权限管理',
    role: ['admin'],
    component: _import_views('Auth')
  },
  {
    path: '/error',
    login: true,
    layout: true,
    icon: 'user',
    name: 'ErrorPage',
    redirect: '/error/404',
    children: [
        { path: '/error/404', component: _import_views('Error/NotFound'), name: '404'},
        { path: '/error/401', component: _import_views('Error/NotAuth'), name: '401'}
    ]
  }
  ...
]


// 根目录
<BrowserRouter>
    <Route path=&quot;/&quot; component={MainComponents}/>
</BrowserRouter>

// MainComponents
class MainComponents extends React.Component {
  render () {
    return (
      <Switch>
          {renderRouteComponent(allRoutes.filter(route => !route.layout))} //不需要侧边栏等公共部分的路由页面
          <Route path=&quot;/&quot; component={ComponentByLayout}/>
      </Switch>
    )
  }
}

// ComponentByLayout
const ComponentByLayout = ({history}) => (
  <Layout history={history}>
      <Switch>
          {renderRouteComponent(allRoutes.filter(route => route.layout))}
      </Switch>
  </Layout>   
)


// 路由渲染
const RouteComponent = route => <Route key={route.path} exact={route.exact || false} path={route.path} component={route.component} /> 
const renderRouteComponent = routes => routes.map((route, index) => {
    return route.children ? route.children.map(route => RouteComponent(route)) : RouteComponent(route)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 路由表</span>
<span class="hljs-keyword">const</span> allRoutes = [
  {
    path: <span class="hljs-string">'/auth'</span>,
    login: <span class="hljs-keyword">true</span>,
    layout: <span class="hljs-keyword">true</span>,
    icon: <span class="hljs-string">'user'</span>,
    name: <span class="hljs-string">'权限管理'</span>,
    role: [<span class="hljs-string">'admin'</span>],
    component: _import_views(<span class="hljs-string">'Auth'</span>)
  },
  {
    path: <span class="hljs-string">'/error'</span>,
    login: <span class="hljs-keyword">true</span>,
    layout: <span class="hljs-keyword">true</span>,
    icon: <span class="hljs-string">'user'</span>,
    name: <span class="hljs-string">'ErrorPage'</span>,
    redirect: <span class="hljs-string">'/error/404'</span>,
    children: [
        { path: <span class="hljs-string">'/error/404'</span>, component: _import_views(<span class="hljs-string">'Error/NotFound'</span>), name: <span class="hljs-string">'404'</span>},
        { path: <span class="hljs-string">'/error/401'</span>, component: _import_views(<span class="hljs-string">'Error/NotAuth'</span>), name: <span class="hljs-string">'401'</span>}
    ]
  }
  ...
]


<span class="hljs-comment">// 根目录</span>
&lt;BrowserRouter&gt;
    &lt;Route path=<span class="hljs-string">"/"</span> component={MainComponents}/&gt;
&lt;/BrowserRouter&gt;

<span class="hljs-comment">// MainComponents</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainComponents</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-keyword">Switch</span>&gt;
          {renderRouteComponent(allRoutes.filter(route =&gt; !route.layout))} <span class="hljs-comment">//不需要侧边栏等公共部分的路由页面</span>
          &lt;Route path=<span class="hljs-string">"/"</span> component={ComponentByLayout}/&gt;
      &lt;/<span class="hljs-keyword">Switch</span>&gt;
    )
  }
}

<span class="hljs-comment">// ComponentByLayout</span>
<span class="hljs-keyword">const</span> ComponentByLayout = ({history}) =&gt; (
  &lt;Layout history={history}&gt;
      &lt;<span class="hljs-keyword">Switch</span>&gt;
          {renderRouteComponent(allRoutes.filter(route =&gt; route.layout))}
      &lt;/<span class="hljs-keyword">Switch</span>&gt;
  &lt;/Layout&gt;   
)


<span class="hljs-comment">// 路由渲染</span>
<span class="hljs-keyword">const</span> RouteComponent = route =&gt; &lt;Route key={route.path} exact={route.exact || <span class="hljs-keyword">false</span>} path={route.path} component={route.component} /&gt; 
<span class="hljs-keyword">const</span> renderRouteComponent = routes =&gt; routes.map((route, index) =&gt; {
    <span class="hljs-keyword">return</span> route.children ? route.children.map(route =&gt; RouteComponent(route)) : RouteComponent(route)
})</code></pre>
<h3 id="articleHeader4">4. 根据用户权限动态生成路由</h3>
<p>我想根据用户不同的权限生成不同的侧边栏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: '/auth',
  login: true,
  layout: true,
  icon: 'user',
  name: '权限管理',
  role: ['admin'],
  component: _import_views('Auth')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">path</span>: <span class="hljs-string">'/auth'</span>,
  login: true,
  layout: true,
  icon: <span class="hljs-string">'user'</span>,
  name: <span class="hljs-string">'权限管理'</span>,
  role: [<span class="hljs-string">'admin'</span>],
  component: <span class="hljs-built_in">_import_views</span>(<span class="hljs-string">'Auth'</span>)
}</code></pre>
<p>根据这个路由role信息 跟用户的role信息匹配进行显示跟隐藏</p>
<p>这样来筛选出符合这个用户的路由表以及侧边栏（侧边栏根据路由表生成）</p>
<p>但是有个问题，因为我们是需要登录才能得知用户的权限信息，所以我们得那个时候才能确定路由是哪些。</p>
<p>但是那个时候路由已经设置完毕了。<code>vue</code>里面的提供了 <code>router.addRoutes</code>这个方法来供我们动态设置路由，<code>react</code>里面我也没找到关于这个api的，于是我便采取所有的路由都注册一遍，但是这样便产生一个问题。</p>
<p>以 <code>/auth</code> 为例，我本身是没有访问<code>/auth</code>的权限，所以我侧边栏不会生成 <code>/auth</code>这个列表选项。但是我们在地址栏里面 访问 <code>/auth</code> 是能进入这个页面的的 (最好的办法就是压根就不生成这个路由)。所以这个设置其实是有问题，目前我也没知道怎么动态生成路由的办法，暂时也只是在<code>根目录</code> 做了权限处理</p>
<h3 id="articleHeader5">5. 按需加载</h3>
<p>按需加载的方法也不少，目前只尝试了第一种，因为我写Vue也是用import实现按需加载的，所以也就没去折腾了。</p>
<h4>1. <strong>import方法</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//asyncComponent.js
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
                console.error('Cannot load component in <AsyncComponent />');
                throw err
            }
        }

        render() {
            const { Component } = this.state
            return (Component) ? <Component {...this.props} /> : null
        }
    }
)


// index.js
import asyncComponent from './asyncComponent.js'
const _import_ = file => asyncComponent(() => import(file))
_import_('components/Home/index.js')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//asyncComponent.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> loadComponent =&gt; (
    <span class="hljs-keyword">class</span> AsyncComponent <span class="hljs-keyword">extends</span> React.Component {
        state = {
            Component: <span class="hljs-literal">null</span>,
        }
        <span class="hljs-keyword">async</span> componentDidMount() {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.Component !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>

            <span class="hljs-keyword">try</span> {
                <span class="hljs-keyword">const</span> {<span class="hljs-keyword">default</span>: Component} = <span class="hljs-keyword">await</span> loadComponent()
                <span class="hljs-keyword">this</span>.setState({ Component })
            }<span class="hljs-keyword">catch</span> (err) {
                <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Cannot load component in &lt;AsyncComponent /&gt;'</span>);
                <span class="hljs-keyword">throw</span> err
            }
        }

        render() {
            <span class="hljs-keyword">const</span> { Component } = <span class="hljs-keyword">this</span>.state
            <span class="hljs-keyword">return</span> (Component) ? &lt;Component {...this.props} /&gt; : <span class="hljs-literal">null</span>
        }
    }
)


<span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./asyncComponent.js'</span>
<span class="hljs-keyword">const</span> _import_ = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(file))
_import_(<span class="hljs-string">'components/Home/index.js'</span>)</code></pre>
<p>原理很简单:</p>
<ul>
<li>import()接受相应的模块然后返回Promise对象</li>
<li>asyncComponent 接收一个函数，且这个函数返回promise对象</li>
<li>在componentDidMount钩子函数通过 async/await 执行接受进来的loadComponent方法，得到import返回的结果，赋值给state.Component,</li>
<li>因为我们import的是一个React组件，所以我们得到的也是React组件，到时候只需要把该组件 render出去就行了</li>
</ul>
<h4>2. <a href="https://www.jianshu.com/p/547aa7b92d8c" rel="nofollow noreferrer" target="_blank"><strong>Bundle组件 + import（跟第一种感觉差不多）</strong></a>
</h4>
<h4>3. <a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md" rel="nofollow noreferrer" target="_blank"><strong>react-loadable</strong></a>
</h4>
<h4>4. <a href="https://segmentfault.com/a/1190000009539836"><strong>bundle-loader</strong></a>
</h4>
<h3 id="articleHeader6">6. request</h3>
<p>我这里用到的是<code>axios</code>, 用<code>axios</code>做了个简单的拦截器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import qs from 'qs'


axios.defaults.withCredentials = true 

// 发送时
axios.interceptors.request.use(config => {
    // 发起请求,可以进行动画啥的
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) { 
    // 得到返回结果,结束动画啥的
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}


// 检查CODE值
function checkCode(res) {
    if (res.code === 0) {
        throw new Error(res.msg)
    }
    
    return res
}

export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>


axios.defaults.withCredentials = <span class="hljs-literal">true</span> 

<span class="hljs-comment">// 发送时</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-comment">// 发起请求,可以进行动画啥的</span>
    <span class="hljs-keyword">return</span> config
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
})

<span class="hljs-comment">// 响应时</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve(err.response))

<span class="hljs-comment">// 检查状态码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">res</span>) </span>{ 
    <span class="hljs-comment">// 得到返回结果,结束动画啥的</span>
    <span class="hljs-keyword">if</span> (res.status === <span class="hljs-number">200</span> || res.status === <span class="hljs-number">304</span>) {
        <span class="hljs-keyword">return</span> res.data
    }
    <span class="hljs-keyword">return</span> {
        code: <span class="hljs-number">0</span>,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    <span class="hljs-keyword">return</span> res
}


<span class="hljs-comment">// 检查CODE值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkCode</span>(<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(res.msg)
    }
    
    <span class="hljs-keyword">return</span> res
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">get</span>(url, params) {
        <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">return</span> axios({
            method: <span class="hljs-string">'get'</span>,
            url: url,
            params,
            timeout: <span class="hljs-number">30000</span>
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">return</span> axios({
            method: <span class="hljs-string">'post'</span>,
            url: url,
            data: qs.stringify(data),
            timeout: <span class="hljs-number">30000</span>
        }).then(checkStatus).then(checkCode)
    }
}
</code></pre>
<h3 id="articleHeader7">7. redux</h3>
<p>这里主要用了 <a href="https://www.npmjs.com/package/redux-actions" rel="nofollow noreferrer" target="_blank"><code>redux-actions</code></a> 来创建action的 ， <br><strong>原生写法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// action
const addTodo = text => ({
    type: 'ADD_TODO',
    payload: {
      text,
      completed: false
    }
})

// reducer
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.payload]
        ...
        default:
            return state
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// action</span>
<span class="hljs-keyword">const</span> addTodo = <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'ADD_TODO'</span>,
    payload: {
      text,
      completed: <span class="hljs-literal">false</span>
    }
})

<span class="hljs-comment">// reducer</span>
<span class="hljs-keyword">const</span> todos = <span class="hljs-function">(<span class="hljs-params">state = [], action</span>) =&gt;</span> {
    <span class="hljs-keyword">switch</span>(action.type) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'ADD_TODO'</span>:
            <span class="hljs-keyword">return</span> [...state, action.payload]
        ...
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> state
    }
}</code></pre>
<p>用了 <code>redux-actions</code>的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction, handleActions } from 'redux-actions'

// action
const addTodo = createAction('ADD_TODO')

// reducer
const todos = handleActions({
    ADD_TODO: (state, action) => {
        return [...state, action.payload]
    }
    ...
}, [])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createAction, handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>

<span class="hljs-comment">// action</span>
<span class="hljs-keyword">const</span> addTodo = createAction(<span class="hljs-string">'ADD_TODO'</span>)

<span class="hljs-comment">// reducer</span>
<span class="hljs-keyword">const</span> todos = handleActions({
    <span class="hljs-attr">ADD_TODO</span>: <span class="hljs-function">(<span class="hljs-params">state, action</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> [...state, action.payload]
    }
    ...
}, [])</code></pre>
<p>// 用<code>redux-actions</code>简单明了</p>
<h3 id="articleHeader8">8. connect</h3>
<p>用了redux,这东西基本就不能少了, <code>connect</code>主要是用来 连接 <code>组件</code> 跟 <code>redux store</code>的, 就是让组件能获取redux store里面的 <code>值</code> 和 <code>方法</code><br><code>connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])</code></p>
<p>一般只用到前两个参数</p>
<ul>
<li>
<code>mapStateToProps(state, ownProps)</code>: 获取store里面state指定数据,然后传递到指定组件, ownProps 组件本身的 props</li>
<li>
<code>mapDispatchToProps</code>: 这个是获取store里面的action方法, 然后传入指定组件</li>
</ul>
<p><strong>用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import toggleTodo from 'actions/todo'
const mapStateToProps = state => ({
    active: state.active
})
const mapDispatchToProps = {
    onTodoClick: toggleTodo
}
connect(mapStateToProps, mapDispatchToProps)(Component)
// 在Component组件中, 便能在 props 里面获取到 active 数据, 跟 onTodoClick 这个方法了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import toggleTodo <span class="hljs-keyword">from</span> 'actions/todo'
const mapStateToProps = <span class="hljs-keyword">state</span> =&gt; ({
    active: <span class="hljs-keyword">state</span>.active
})
const mapDispatchToProps = {
    <span class="hljs-keyword">on</span>TodoClick: toggleTodo
}
connect(mapStateToProps, mapDispatchToProps)(Component)
// 在Component组件中, 便能在 props 里面获取到 active 数据, 跟 <span class="hljs-keyword">on</span>TodoClick 这个方法了</code></pre>
<p><code>connect</code>很多地方基本都要用到<br>所以也进行了封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// connect.js
import actions from 'src/actions' // 所有action
import {connect} from 'react-redux' 
import {bindActionCreators} from 'redux'
export default connect(
    state => ({state}), // 偷懒了, 每次把state里面所有的数据都返回了
    dispatch => bindActionCreators(actions, dispatch) //合并所有action,并且传入dispatch, 那样我们在组件里面调用action,就不在需要dispatch了
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// connect.js
import actions <span class="hljs-keyword">from</span> 'src/actions' // 所有action
import {connect} <span class="hljs-keyword">from</span> 'react-redux' 
import {bindActionCreators} <span class="hljs-keyword">from</span> 'redux'
export <span class="hljs-keyword">default</span> connect(
    <span class="hljs-keyword">state</span> =&gt; ({<span class="hljs-keyword">state</span>}), // 偷懒了, 每次把<span class="hljs-keyword">state</span>里面所有的数据都返回了
    dispatch =&gt; bindActionCreators(actions, dispatch) //合并所有action,并且传入dispatch, 那样我们在组件里面调用action,就不在需要dispatch了
)</code></pre>
<p><a href="https://www.kancloud.cn/allanyu/redux-in-chinese/82434" rel="nofollow noreferrer" target="_blank">bindActionCreators</a></p>
<p>然后我们把 <code>connect.js</code> 文件通过 <code>webpack</code> 的alias属性来进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//配置别名映射
alias: {
    'src': resolve('src'),
    'connect': resolve('src/utils/connect')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//配置别名映射
alia<span class="hljs-variable">s:</span> {
    <span class="hljs-string">'src'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
    <span class="hljs-string">'connect'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/utils/connect'</span>)
}</code></pre>
<p>然后我们就可以在文件中如下引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import connect from 'connect'

@connect // 通过装饰器调用
class Component extends React.Component {
  componentWillMount () {
    const {state, onTodoClick} = this.props
    console.log(state, onTodoClick)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> connect from <span class="hljs-symbol">'connec</span>t'

<span class="hljs-meta">@connect</span> <span class="hljs-comment">// 通过装饰器调用</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentWillMount () {
    const {state, onTodoClick} = <span class="hljs-keyword">this</span>.props
    console.log(state, onTodoClick)
  }
}</code></pre>
<p>为了省事，我把<code>store</code>里面所有的数据 和 <code>action</code>都返回了。</p>
<h3 id="articleHeader9">9. cssModules</h3>
<p>在 <code>vue</code> 中 我们一般都是通过设置 style标签的 <code>scoped</code> 属性来做到css模块化<br>但是在 <code>react</code> 中，我采用的 <code>cssModules</code> 来做css模块化</p>
<ol><li>通过<code>webpack</code>设置 <code>css-loader</code> 的<code>modules</code>来开启css的模块化</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    loader: 'css-loader',
    options: {
      modules: true, //是否开启
      localIdentName: '[name]__[local]___[hash:base64:5]'  // 转化出来的class名字结构
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
    <span class="hljs-attribute">loader</span>: <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-attribute">options</span>: {
      <span class="hljs-attribute">modules</span>: true, <span class="hljs-comment">//是否开启</span>
      <span class="hljs-attribute">localIdentName</span>: <span class="hljs-string">'[name]__[local]___[hash:base64:5]'</span>  <span class="hljs-comment">// 转化出来的class名字结构</span>
    }
},</code></pre>
<ol><li>引入css, 并通过对象的赋值方式添加className</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import styles from './styles.css'

export default () => (
  <div className={styles.a}></div>
)

//styles.css
.a {
    color: #ff4747;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import styles from <span class="hljs-string">'./styles.css'</span>

export default () =&gt; (
  &lt;<span class="hljs-selector-tag">div</span> className={styles.a}&gt;&lt;/div&gt;
)

<span class="hljs-comment">//styles.css</span>
<span class="hljs-selector-class">.a</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff4747</span>;
}
</code></pre>
<p>或者可以通过 <a href="https://www.npmjs.com/package/react-css-modules" rel="nofollow noreferrer" target="_blank"><code>react-css-modules</code></a> 来更方便的控制<code>class</code>类名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import styles from './styles.css'
import CSSModules from 'react-css-modules'

class Component extends React.Component {
  render () {
    return (
      <div styleName='a b'></div>
    )
  }
}
export default CSSModules(Component, styles, {
    allowMultiple: true //允许多个class一起使用
})


//styles.css
.a {
    color: #ff4747;
}
.b {
  background: #f00;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> styles from './styles.css'
<span class="hljs-keyword">import</span> <span class="hljs-type">CSSModules</span> from <span class="hljs-symbol">'react</span>-css-modules'

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div styleName=<span class="hljs-symbol">'a</span> b'&gt;&lt;/div&gt;
    )
  }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">CSSModules</span>(<span class="hljs-type">Component</span>, styles, {
    allowMultiple: <span class="hljs-literal">true</span> <span class="hljs-comment">//允许多个class一起使用</span>
})


<span class="hljs-comment">//styles.css</span>
.a {
    color: #ff4747;
}
.b {
  background: #f00;
}</code></pre>
<p>这样我们就可以通过字符串的方式传入 <code>class</code>类名. 注意: 我们添加时 不再使用 <code>className</code> 了, 而是使用 <code>styleName</code>了</p>
<h3 id="articleHeader10">10. 双向绑定的实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Bingding extends React.Component {
  state = {
    value: ''
  }
  handleInput = value => {
    this.setState({
      value
    })
  }
  render () {
    return (
      <input type=&quot;text&quot; value={this.state.value} onChange={e => {this.handleInput(e.target.value)"}}"/>
      <div>{this.state.value}</div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bingding</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    value: ''
  }
  handleInput = value =&gt; {
    <span class="hljs-keyword">this</span>.setState({
      value
    })
  }
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> value={<span class="hljs-keyword">this</span>.state.value} onChange={e =&gt; {<span class="hljs-keyword">this</span>.handleInput(e.target.value)"}}"/&gt;
      &lt;div&gt;{<span class="hljs-keyword">this</span>.state.value}&lt;/div&gt;
    )
  }
}</code></pre>
<p>就是通过 <code>onChange</code> 事件 来触发 <code>this.setState</code> 重新渲染 render 方法</p>
<p>还有一些知识点<br>包括 <a href="https://reactcommunity.org/react-transition-group/" rel="nofollow noreferrer" target="_blank"><code>动画</code></a>，<a href="https://zhuanlan.zhihu.com/p/24926575" rel="nofollow noreferrer" target="_blank"><code>生命周期</code></a> 等等<br>就不过多介绍了。这些项目中基本多多少少都参和了一点。<br>开发中遇到的问题挺多的，最主要是<code>react-router</code>配置的问题，怎么配置都感觉不太好。<br>也同时希望有人推荐几个全面的尤其是最新版本的<code>react</code>开源项目。</p>
<p>项目启动步骤</p>
<ol>
<li>npm/yarn run dll (DllPlugin打包,只需打包一次就够了)</li>
<li>npm/yarn run dev (开发模式)</li>
<li>npm/yarn run build (生产模式)</li>
</ol>
<h2 id="articleHeader11">小结</h2>
<p>国内比较火的两个框架，也勉强算是都接触了下，<code>vue</code>我是一直在用的，<code>react</code>算是年后刚接触的。<br>  从我目前来看，<code>vue</code>比<code>react</code>开发起来确实要方便很多(可能用的比较多吧)。<br>  因为<code>vue</code>很多常用的都是内置的。而<code>react</code>基本都要自己去寻找对应的模块。本身就只提供UI， 其他基本得自力更生。<br>  主要是你经常一找能找着多个模块，你就不知道用哪个，还得一个个试水。当然，<code>react</code>的社区强大，这么都不是什么大问题。</p>
<p><a href="http://dzblog.cn/cases/react-admin/index.html" rel="nofollow noreferrer" target="_blank">在线观看地址</a></p>
<p><a href="http://dzblog.cn/article/5aa7ef0e4f85ad06d2346688" rel="nofollow noreferrer" target="_blank">博客地址</a></p>
<p><a href="https://github.com/cd-dongzi/react-admin" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react搭建后台管理（react初窥）

## 原文链接
[https://segmentfault.com/a/1190000013713078](https://segmentfault.com/a/1190000013713078)


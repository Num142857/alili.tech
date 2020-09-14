---
title: 'Redux中利用函数式组件替代onEnter进行登录状态验证的实践' 
date: 2019-02-09 2:30:59
hidden: true
slug: labbulbd27r
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近使用React和Redux构建一个后台项目，在做登录系统的时候，看了网上很多资料，一般都是使用sessionStorage(包括Cookie，下略)或者localStorage保存从服务器获取的token，然后使用react-router中<strong>onEnter</strong>这个方法依据sessionStorage或者localStorage中是否存在相应的token来判定登录状态。</p></blockquote>
<p>Cookie, LocalStorage 与 SessionStorage的详解可以参考：<a href="https://segmentfault.com/a/1190000002723469">详说 Cookie, LocalStorage 与 SessionStorage</a>一文。</p>
<p>react-router的onEnter方法使用可以参考react-router官方的用例：auth-flow。<br>仓库地址：<a href="https://github.com/reactjs/react-router/tree/master/examples/auth-flow" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/reactjs/react-router/tree/master/examples/auth-flow" rel="nofollow noreferrer" target="_blank">https://github.com/reactjs/re...</a></p>
<p>auth-flow这个用例使用localStorage来保存token，react-router的onEnter调用requireAuth方法来判断auth.loggedIn()是否能正确返回localStorage.token,来维持登录状态，这也是目前常用的做法。</p>
<p><strong>app.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from './auth'

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to=&quot;/logout&quot;>Log out</Link>
            ) : (
              <Link to=&quot;/login&quot;>Sign in</Link>
            )}
          </li>
          <li><Link to=&quot;/about&quot;>About</Link></li>
          <li><Link to=&quot;/dashboard&quot;>Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn &amp;&amp; 'not'} logged in.</p>}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

const Login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props

        if (location.state &amp;&amp; location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      })
    },

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref=&quot;email&quot; placeholder=&quot;email&quot; defaultValue=&quot;joe@example.com&quot; /></label>
          <label><input ref=&quot;pass&quot; placeholder=&quot;password&quot; /></label> (hint: password1)<br />
          <button type=&quot;submit&quot;>login</button>
          {this.state.error &amp;&amp; (
            <p>Bad login information</p>
          )}
        </form>
      )
    }
  })
)

const About = React.createClass({
  render() {
    return <h1>About</h1>
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path=&quot;/&quot; component={App}>
      <Route path=&quot;login&quot; component={Login} />
      <Route path=&quot;logout&quot; component={Logout} />
      <Route path=&quot;about&quot; component={About} />
      <Route path=&quot;dashboard&quot; component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('example'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { render } from <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> { browserHistory, Router, Route, Link, withRouter } from <span class="hljs-string">'react-router'</span>
<span class="hljs-keyword">import</span> auth from <span class="hljs-string">'./auth'</span>

const App = React.createClass({
  getInitialState() {
    <span class="hljs-keyword">return</span> {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    <span class="hljs-keyword">this</span>.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = <span class="hljs-keyword">this</span>.updateAuth
    auth.login()
  },

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;ul&gt;
          &lt;li&gt;
            {<span class="hljs-keyword">this</span>.state.loggedIn ? (
              &lt;Link to=<span class="hljs-string">"/logout"</span>&gt;Log <span class="hljs-keyword">out</span>&lt;/Link&gt;
            ) : (
              &lt;Link to=<span class="hljs-string">"/login"</span>&gt;Sign <span class="hljs-keyword">in</span>&lt;/Link&gt;
            )}
          &lt;/li&gt;
          &lt;li&gt;&lt;Link to=<span class="hljs-string">"/about"</span>&gt;About&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link to=<span class="hljs-string">"/dashboard"</span>&gt;Dashboard&lt;/Link&gt; (authenticated)&lt;/li&gt;
        &lt;/ul&gt;
        {<span class="hljs-keyword">this</span>.props.children || &lt;p&gt;You are {!<span class="hljs-keyword">this</span>.state.loggedIn &amp;&amp; <span class="hljs-string">'not'</span>} logged <span class="hljs-keyword">in</span>.&lt;/p&gt;}
      &lt;/div&gt;
    )
  }
})

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;Dashboard&lt;/h1&gt;
        &lt;p&gt;You made it!&lt;/p&gt;
        &lt;p&gt;{token}&lt;/p&gt;
      &lt;/div&gt;
    )
  }
})

const Login = withRouter(
  React.createClass({

    getInitialState() {
      <span class="hljs-keyword">return</span> {
        error: <span class="hljs-literal">false</span>
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = <span class="hljs-keyword">this</span>.refs.email.value
      const pass = <span class="hljs-keyword">this</span>.refs.pass.value

      auth.login(email, pass, (loggedIn) =&gt; {
        <span class="hljs-keyword">if</span> (!loggedIn)
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.setState({ error: <span class="hljs-literal">true</span> })

        const { location } = <span class="hljs-keyword">this</span>.props

        <span class="hljs-keyword">if</span> (location.state &amp;&amp; location.state.nextPathname) {
          <span class="hljs-keyword">this</span>.props.router.replace(location.state.nextPathname)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.props.router.replace(<span class="hljs-string">'/'</span>)
        }
      })
    },

    render() {
      <span class="hljs-keyword">return</span> (
        &lt;form onSubmit={<span class="hljs-keyword">this</span>.handleSubmit}&gt;
          &lt;label&gt;&lt;input ref=<span class="hljs-string">"email"</span> placeholder=<span class="hljs-string">"email"</span> defaultValue=<span class="hljs-string">"joe@example.com"</span> /&gt;&lt;/label&gt;
          &lt;label&gt;&lt;input ref=<span class="hljs-string">"pass"</span> placeholder=<span class="hljs-string">"password"</span> /&gt;&lt;/label&gt; (hint: password1)&lt;br /&gt;
          &lt;button type=<span class="hljs-string">"submit"</span>&gt;login&lt;/button&gt;
          {<span class="hljs-keyword">this</span>.state.error &amp;&amp; (
            &lt;p&gt;Bad login information&lt;/p&gt;
          )}
        &lt;/form&gt;
      )
    }
  })
)

const About = React.createClass({
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;About&lt;/h1&gt;
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    <span class="hljs-keyword">return</span> &lt;p&gt;You are now logged <span class="hljs-keyword">out</span>&lt;/p&gt;
  }
})

function requireAuth(nextState, replace) {
  <span class="hljs-keyword">if</span> (!auth.loggedIn()) {
    replace({
      pathname: <span class="hljs-string">'/login'</span>,
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  &lt;Router history={browserHistory}&gt;
    &lt;Route path=<span class="hljs-string">"/"</span> component={App}&gt;
      &lt;Route path=<span class="hljs-string">"login"</span> component={Login} /&gt;
      &lt;Route path=<span class="hljs-string">"logout"</span> component={Logout} /&gt;
      &lt;Route path=<span class="hljs-string">"about"</span> component={About} /&gt;
      &lt;Route path=<span class="hljs-string">"dashboard"</span> component={Dashboard} onEnter={requireAuth} /&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.getElementById(<span class="hljs-string">'example'</span>))</code></pre>
<p><strong>auth.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' &amp;&amp; pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  login(email, pass, cb) {
    cb = <span class="hljs-built_in">arguments</span>[<span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">if</span> (localStorage.token) {
      <span class="hljs-keyword">if</span> (cb) cb(<span class="hljs-literal">true</span>)
      <span class="hljs-keyword">this</span>.onChange(<span class="hljs-literal">true</span>)
      <span class="hljs-keyword">return</span>
    }
    pretendRequest(email, pass, <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (res.authenticated) {
        localStorage.token = res.token
        <span class="hljs-keyword">if</span> (cb) cb(<span class="hljs-literal">true</span>)
        <span class="hljs-keyword">this</span>.onChange(<span class="hljs-literal">true</span>)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (cb) cb(<span class="hljs-literal">false</span>)
        <span class="hljs-keyword">this</span>.onChange(<span class="hljs-literal">false</span>)
      }
    })
  },

  getToken() {
    <span class="hljs-keyword">return</span> localStorage.token
  },

  logout(cb) {
    <span class="hljs-keyword">delete</span> localStorage.token
    <span class="hljs-keyword">if</span> (cb) cb()
    <span class="hljs-keyword">this</span>.onChange(<span class="hljs-literal">false</span>)
  },

  loggedIn() {
    <span class="hljs-keyword">return</span> !!localStorage.token
  },

  onChange() {}
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pretendRequest</span>(<span class="hljs-params">email, pass, cb</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (email === <span class="hljs-string">'joe@example.com'</span> &amp;&amp; pass === <span class="hljs-string">'password1'</span>) {
      cb({
        authenticated: <span class="hljs-literal">true</span>,
        token: <span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substring(<span class="hljs-number">7</span>)
      })
    } <span class="hljs-keyword">else</span> {
      cb({ authenticated: <span class="hljs-literal">false</span> })
    }
  }, <span class="hljs-number">0</span>)
}</code></pre>
<p>localStorage等本地存储容器保存一些用户信息，多少可能会有潜在的风险，那么可不可以不使用这些本地存储来维持用户状态呢？</p>
<p>于是我尝试用redux结合react-router来保持用户的登录状态，最开始的思路是用onEnter调用一个方法来获取store里的登录状态信息，但是发现react-router的路由声明中并不能从store中拿到props，只有路由的history等信息。可能水平有限，只能到处翻文档，无意间在Github中发现一个用例：<a href="https://github.com/joshgeller/react-redux-jwt-auth-example" rel="nofollow noreferrer" target="_blank">react-redux-jwt-auth-example</a></p>
<p>这个用例使用了一个高级函数(high-order function，用例中为requireAuthentication)来包装需要登录权限的Compenent(用例中为ProtectedView)，这个Compenent位于所有需要登录权限的顶层：</p>
<p><strong>routers.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {HomeView, LoginView, ProtectedView, AView, BView } from '../views';
import {requireAuthentication} from '../components/AuthenticatedComponent';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path=&quot;login&quot; component={LoginView}/>
        <Route path=&quot;protected&quot; component={requireAuthentication(ProtectedView)}
            <Route path=&quot;a&quot; component={AView}/>
            <Route path=&quot;b&quot; component={BVieew}/>
        </Route>
    </Route>
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{HomeView, LoginView, ProtectedView, AView, BView }</span><span class="xml"> from '../views';
import </span><span class="hljs-template-variable">{requireAuthentication}</span><span class="xml"> from '../components/AuthenticatedComponent';

export default(
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{App}</span><span class="xml"><span class="hljs-tag">&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{HomeView}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"login"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{LoginView}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"protected"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{requireAuthentication(ProtectedView)}</span><span class="xml"><span class="hljs-tag">
            &lt;<span class="hljs-attr">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"a"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{AView}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"b"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BVieew}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
);
</span></code></pre>
<p>利用requireAuthentication()这个高阶函数将ProtectedView这个Compenent作为参数传人，requireAuthentication()中生成一个Compenent，然后调用react-redux中的connect结合mapStateToProps就能将store中的登录状态，token等信息塞入Props中，当前这个requireAuthentication中的Compenent根据Props中的状态信息来决定是否继续渲染ProtectedView Compenent，或者在用户进行页面跳转，检测到登录状态为false时，就会重定向到登录页面。</p>
<p><strong>AuthenticatedComponent.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> {connect} from <span class="hljs-symbol">'react</span>-redux';
<span class="hljs-keyword">import</span> {pushState} from <span class="hljs-symbol">'redux</span>-router';

export function requireAuthentication(<span class="hljs-type">Component</span>) {

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AuthenticatedComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

        componentWillMount() {
            <span class="hljs-keyword">this</span>.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            <span class="hljs-keyword">this</span>.checkAuth();
        }

        checkAuth() {
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.props.isAuthenticated) {
                let redirectAfterLogin = <span class="hljs-keyword">this</span>.props.location.pathname;
                <span class="hljs-keyword">this</span>.props.dispatch(pushState(<span class="hljs-literal">null</span>, `/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            <span class="hljs-keyword">return</span> (
                &lt;div&gt;
                    {<span class="hljs-keyword">this</span>.props.isAuthenticated === <span class="hljs-literal">true</span>
                        ? &lt;<span class="hljs-type">Component</span> {...<span class="hljs-keyword">this</span>.props}/&gt;
                        : <span class="hljs-literal">null</span>
                    }
                &lt;/div&gt;
            )

        }
    }

    const mapStateToProps = (state) =&gt; ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    <span class="hljs-keyword">return</span> connect(mapStateToProps)(<span class="hljs-type">AuthenticatedComponent</span>);

}</code></pre>
<p>上面是作者给的用法，其中需要注意的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {pushState} from 'redux-router';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {pushState} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-router'</span>;</code></pre>
<p>由于<a href="https://segmentfault.com/q/1010000004959826">几个react-router的区别</a>这个问题，打包编译后可能报错，我项目中使用的是react-router-redux。</p>
<p>参考<a href="https://github.com/reactjs/react-router-redux" rel="nofollow noreferrer" target="_blank">react-router-redux</a>文档中<strong>What if I want to issue navigation events via Redux actions?</strong></p>
<p>使用方法是在AuthenticatedComponent中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {push} react-router-redux" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {push} react-router-redux</code></pre>
<p>也就是push代替了原例子中的pushState，作用都差不多。</p>
<p>然后就是加一个中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { routerMiddleware, push } from 'react-router-redux'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(middleware)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { routerMiddleware, push } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span>

<span class="hljs-comment">// Apply the middleware to the store</span>
<span class="hljs-keyword">const</span> middleware = routerMiddleware(browserHistory)
<span class="hljs-keyword">const</span> store = createStore(
  reducers,
  applyMiddleware(middleware)
)</code></pre>
<p>这样就可以在AuthenticatedComponent中愉快地重定向了。</p>
<p>以上利用react-redux，redux-router || react-router-redux基于redux来保持登录状态和进行登录权限验证，可以避免使用Cookie&amp;localStroge等来保存登录信息，其中的缺点就是，用户刷新页面或关闭浏览器后，登录状态就被销毁了，如果有记住用户名等需求，可能依然会用到本地存储容器。</p>
<p>翻阅这个用例最后还发现作者已经写了一个登录权限验证的library：<br><a href="https://github.com/mjrussell/redux-auth-wrapper" rel="nofollow noreferrer" target="_blank">redux-auth-wrapper</a></p>
<p>不想搬运代码的兄弟可以参考文档直接拿来用~</p>
<p>第一次写文章，如果有概念错误的地方，请多多指正！！感谢！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux中利用函数式组件替代onEnter进行登录状态验证的实践

## 原文链接
[https://segmentfault.com/a/1190000005607817](https://segmentfault.com/a/1190000005607817)


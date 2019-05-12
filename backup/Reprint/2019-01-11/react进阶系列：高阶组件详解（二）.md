---
title: 'react进阶系列：高阶组件详解（二）' 
date: 2019-01-11 2:30:07
hidden: true
slug: 8e1l5a5tyto
categories: [reprint]
---

{{< raw >}}

                    
<p>高阶组件可以封装公共逻辑，给当前组件传递方法属性，添加生命周期钩子等。</p>
<p>案例：</p>
<p>一个项目中有的页面需要判断所处环境，如果在移动端则正常显示页面，并向用户提示当前页面所处的移动端环境，如果不在移动端则显示提示让其在移动端打开。但是有的页面又不需要这个判断。</p>
<p>如果在每个页面都写一段判断逻辑未免麻烦，因此可以借助高阶组件来处理这部分逻辑。</p>
<p>先创建一个高阶组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/container/withEnvironment/index.jsx
import React from 'react';

const envs = {
    weixin: '微信',
    qq: 'QQ',
    baiduboxapp: '手机百度',
    weibo: '微博',
    other: '移动端'
}

function withEnvironment(BasicComponent) {
    const ua = navigator.userAgent;
    const isMobile = 'ontouchstart' in document;
    let env = 'other';

    if (ua.match(/MicroMessenger/i)) {
        env = 'weixin';
    }
    if (ua.match(/weibo/i)) {
        env = 'weibo';
    }
    if (ua.match(/qq/i)) {
        env = 'qq';
    }
    if (ua.match(/baiduboxapp/i)) {
        env = 'baiduboxapp'
    }

    // 不同逻辑下返回不同的中间组件
    if (!isMobile) {
        return function () {
            return (
                <div>
                    <div>该页面只能在移动端查看，请扫描下方二维码打开。</div>
                    <div>假设这里有张二维码</div>
                </div>
            )    
        }
    }

    // 通过定义的中间组件将页面所处环境通过props传递给基础组件
    const C = props => (
        <BasicComponent {...props} env={env} envdesc={envs[env]} />
    )

    return C;
}


export default withEnvironment;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// src/container/withEnvironment/index.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> envs = {
    <span class="hljs-attr">weixin</span>: <span class="hljs-string">'微信'</span>,
    <span class="hljs-attr">qq</span>: <span class="hljs-string">'QQ'</span>,
    <span class="hljs-attr">baiduboxapp</span>: <span class="hljs-string">'手机百度'</span>,
    <span class="hljs-attr">weibo</span>: <span class="hljs-string">'微博'</span>,
    <span class="hljs-attr">other</span>: <span class="hljs-string">'移动端'</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withEnvironment</span>(<span class="hljs-params">BasicComponent</span>) </span>{
    <span class="hljs-keyword">const</span> ua = navigator.userAgent;
    <span class="hljs-keyword">const</span> isMobile = <span class="hljs-string">'ontouchstart'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span>;
    <span class="hljs-keyword">let</span> env = <span class="hljs-string">'other'</span>;

    <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>)) {
        env = <span class="hljs-string">'weixin'</span>;
    }
    <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/weibo/i</span>)) {
        env = <span class="hljs-string">'weibo'</span>;
    }
    <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/qq/i</span>)) {
        env = <span class="hljs-string">'qq'</span>;
    }
    <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/baiduboxapp/i</span>)) {
        env = <span class="hljs-string">'baiduboxapp'</span>
    }

    <span class="hljs-comment">// 不同逻辑下返回不同的中间组件</span>
    <span class="hljs-keyword">if</span> (!isMobile) {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>该页面只能在移动端查看，请扫描下方二维码打开。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>假设这里有张二维码<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            )    
        }
    }

    <span class="hljs-comment">// 通过定义的中间组件将页面所处环境通过props传递给基础组件</span>
    <span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BasicComponent</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">env</span>=<span class="hljs-string">{env}</span> <span class="hljs-attr">envdesc</span>=<span class="hljs-string">{envs[env]}</span> /&gt;</span>
    )

    return C;
}


export default withEnvironment;</span></code></pre>
<p>然后在基础组件中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/pages/Demo01/index.jsx
import React from 'react';
import withEnvironment from '../../container/withEnvironment';

function Demo01(props) {
    return (
        <div>你现在正在{props.envdesc}中访问该页面</div>
    )
}

export default withEnvironment(Demo01);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// src/pages/Demo01/index.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> withEnvironment <span class="hljs-keyword">from</span> <span class="hljs-string">'../../container/withEnvironment'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Demo01</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>你现在正在{props.envdesc}中访问该页面<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withEnvironment(Demo01);
</code></pre>
<p>最后将基础组件渲染出来即可查看到效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index.js
import React from 'react';
import { render } from 'react-dom';
import Demo01 from './pages/Demo01';

const root = document.querySelector('#root');
render(<Demo01 />, root);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/index.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> Demo01 <span class="hljs-keyword">from</span> <span class="hljs-string">'./pages/Demo01'</span>;

<span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#root'</span>);
render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Demo01</span> /&gt;</span>, root);</span></code></pre>
<p>在上面这个例子中，我们将环境判断的逻辑放在了高阶组件中处理，以后只要需要判断环境的页面只需要在基础组件中这样执行即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default withEnvironment(Demo01);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code style="word-break: break-word; white-space: initial;"><span class="hljs-title">export</span> <span class="hljs-keyword">default</span> withEnvironment(<span class="hljs-type">Demo01</span>);</code></pre>
<p>除此之外，我们在实际开发中还会遇到一个非常常见的需求，那就是在进入一个页面时需要判断登录状态，登录状态与非登录状态的不同显示，登录状态之后角色的不同显示都可以通过高阶组件统一来处理这个逻辑，然后将登录状态，角色信息等传递给基础组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 大概的处理逻辑
import React from 'react';
import $ from 'jquery';

// 假设已经封装了一个叫做getCookie的方法获取cookie
import { getCookie } from 'cookie';

function withRule(BasicComponent) {

    return class C extends React.Component {
        state = {
            islogin: false,
            rule: -1,
            loading: true,
            error: null
        }

        componentDidMount() {
            // 如果能直接在cookie中找到uid，说明已经登录过并保存了相关信息
            if (getCookie('uid')) {
                this.setState({
                    islogin: true,
                    rule: getCookie('rule') || 0,
                    loading: false
                })
            } else {
                // 如果找不到uid，则尝试自动登录，先从kookie中查找是否保存了登录账号与密码
                const userinfo = getCookie('userinfo');
                if (userinfo) {
                    // 调用登录接口
                    $.post('/api/login', {
                        username: userinfo.username,
                        password: userinfo.password
                    }).then(resp => {
                        this.setState({
                            islogin: true,
                            rule: resp.rule,
                            islogin: false
                        })
                    }).catch(err => this.setState({ error: err.message }))
                } else {
                    // 当无法自动登录时，你可以选择在这里弹出登录框，或者直接显示未登录页面的样式等都可以
                }
            }
        }

        render() {
            const { islogin, rule, loading, error } = this.state;

            if (error) {
                return (
                    <div>登录接口请求失败！错误信息为：{error}</div>
                )
            }

            if (loading) {
                return (
                    <div>页面加载中, 请稍后...</div>
                )
            }

            return (
                <BasicComponent {...props} islogin={islogin} rule={rule} />
            )
        }
    }
}

export default withRule;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 大概的处理逻辑</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;

<span class="hljs-comment">// 假设已经封装了一个叫做getCookie的方法获取cookie</span>
<span class="hljs-keyword">import</span> { getCookie } <span class="hljs-keyword">from</span> <span class="hljs-string">'cookie'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withRule</span>(<span class="hljs-params">BasicComponent</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        state = {
            <span class="hljs-attr">islogin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">rule</span>: <span class="hljs-number">-1</span>,
            <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
        }

        componentDidMount() {
            <span class="hljs-comment">// 如果能直接在cookie中找到uid，说明已经登录过并保存了相关信息</span>
            <span class="hljs-keyword">if</span> (getCookie(<span class="hljs-string">'uid'</span>)) {
                <span class="hljs-keyword">this</span>.setState({
                    <span class="hljs-attr">islogin</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">rule</span>: getCookie(<span class="hljs-string">'rule'</span>) || <span class="hljs-number">0</span>,
                    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>
                })
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 如果找不到uid，则尝试自动登录，先从kookie中查找是否保存了登录账号与密码</span>
                <span class="hljs-keyword">const</span> userinfo = getCookie(<span class="hljs-string">'userinfo'</span>);
                <span class="hljs-keyword">if</span> (userinfo) {
                    <span class="hljs-comment">// 调用登录接口</span>
                    $.post(<span class="hljs-string">'/api/login'</span>, {
                        <span class="hljs-attr">username</span>: userinfo.username,
                        <span class="hljs-attr">password</span>: userinfo.password
                    }).then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
                        <span class="hljs-keyword">this</span>.setState({
                            <span class="hljs-attr">islogin</span>: <span class="hljs-literal">true</span>,
                            <span class="hljs-attr">rule</span>: resp.rule,
                            <span class="hljs-attr">islogin</span>: <span class="hljs-literal">false</span>
                        })
                    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">error</span>: err.message }))
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 当无法自动登录时，你可以选择在这里弹出登录框，或者直接显示未登录页面的样式等都可以</span>
                }
            }
        }

        render() {
            <span class="hljs-keyword">const</span> { islogin, rule, loading, error } = <span class="hljs-keyword">this</span>.state;

            <span class="hljs-keyword">if</span> (error) {
                <span class="hljs-keyword">return</span> (
                    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>登录接口请求失败！错误信息为：{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                )
            }

            <span class="hljs-keyword">if</span> (loading) {
                <span class="hljs-keyword">return</span> (
                    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>页面加载中, 请稍后...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                )
            }

            <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BasicComponent</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">islogin</span>=<span class="hljs-string">{islogin}</span> <span class="hljs-attr">rule</span>=<span class="hljs-string">{rule}</span> /&gt;</span>
            )
        }
    }
}

export default withRule;
</span></code></pre>
<p>与第一个例子相比，这个例子更加接近实际应用并且逻辑也更更加复杂。因此涉及到了异步数据，因此最好的方式是在中间组件的<code>componentDidMount</code>中来处理逻辑。并在<code>render</code>中根据不同的状态决定不同的渲染结果。</p>
<p>我们需要根据实际情况合理的使用react创建组件的两种方式。这一点至关重要。上面两个例子个人认为还是比较典型的能代表大多数情况。</p>
<h4>react-router中的高阶组件</h4>
<p>我们在学习react的过程中，会逐渐的与高阶组件打交道，<code>react-router 中的 withRouter</code>应该算是会最早接触到的高阶组件。我们在使用的时候就知道，通过<code>withRouter</code>包装的组件，我们可以在props中访问到<code>location, router</code>等对象，这正是<code>withRouter</code>通过高阶组件的方式传递过来的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Home extends Component {
    componentDidMount() {
        const { router } = this.props;

        router.push('/');
    }
    render() {
        return (
            <div className=&quot;my-home&quot;>...</div>
        )
    }
}
export default withRouter(Home);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentDidMount() {
        <span class="hljs-keyword">const</span> { router } = <span class="hljs-keyword">this</span>.props;

        router.push(<span class="hljs-string">'/'</span>);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"my-home"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRouter(Home);</code></pre>
<p>我们可以来看看在<code>react-router v4</code>中<code>withRouter</code>的源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import Route from './Route';

// 传入基础组件作为参数
const withRouter = (Component) => {

    // 创建中间组件
    const C = (props) => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (
            <Route render={routeComponentProps => (
                // wrappedComponentRef 用来解决高阶组件无法正确获取到ref的问题
                <Component {...remainingProps} {...routeComponentProps} ref={wrappedComponentRef}/>
            )}/>
        )
    }

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;
    C.propTypes = {
        wrappedComponentRef: PropTypes.func
    }

    // hoistStatics类似于Object.assign，用于解决基础组件因为高阶组件的包裹而丢失静态方法的问题
    return hoistStatics(C, Component);
}

export default withRouter;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;
<span class="hljs-keyword">import</span> hoistStatics <span class="hljs-keyword">from</span> <span class="hljs-string">'hoist-non-react-statics'</span>;
<span class="hljs-keyword">import</span> Route <span class="hljs-keyword">from</span> <span class="hljs-string">'./Route'</span>;

<span class="hljs-comment">// 传入基础组件作为参数</span>
<span class="hljs-keyword">const</span> withRouter = <span class="hljs-function">(<span class="hljs-params">Component</span>) =&gt;</span> {

    <span class="hljs-comment">// 创建中间组件</span>
    <span class="hljs-keyword">const</span> C = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> { wrappedComponentRef, ...remainingProps } = props;
        <span class="hljs-keyword">return</span> (
            &lt;Route render={routeComponentProps =&gt; (
                // wrappedComponentRef 用来解决高阶组件无法正确获取到ref的问题
                &lt;Component {...remainingProps} {...routeComponentProps} ref={wrappedComponentRef}/&gt;
            )}/&gt;
        )
    }

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;
    C.propTypes = {
        wrappedComponentRef: PropTypes.func
    }

    // hoistStatics类似于Object.assign，用于解决基础组件因为高阶组件的包裹而丢失静态方法的问题
    return hoistStatics(C, Component);
}

export default withRouter;
</code></pre>
<p>如果对于高阶组件的例子你已经熟知，那么<code>withRouter</code>的源码其实很容易理解。它做所的工作就仅仅只是把<code>routeComponentProps</code>传入基础组件而已。</p>
<p>另外还需要注意点是在该源码中，解决了两个因为高阶组件带来的问题，一个是经过高阶组件包裹的组件在使用时无法通过ref正确获取到对应的值。二是基础组件的静态方法也会因为高阶组件的包裹会丢失。不过好在这段源码已经给我们提供了对应的解决方案。因此如果我们在使用中需要处理这2点的话，按照这里的方式来做就可以了。</p>
<p>但是通常情况下，我们也很少会在自定义的组件中添加静态方法和使用ref。如果在开发中确实遇到了必须使用它们，就一定要注意高阶组件的这2个问题并认真解决。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react进阶系列：高阶组件详解（二）

## 原文链接
[https://segmentfault.com/a/1190000009948787](https://segmentfault.com/a/1190000009948787)


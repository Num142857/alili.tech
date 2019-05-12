---
title: 'vue、react等单页面项目应该这样子部署到服务器' 
date: 2018-12-19 2:30:07
hidden: true
slug: rdsg2l2ltkq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>服务端渲染：<a href="https://segmentfault.com/a/1190000012774650">next.js、nuxt.js等服务端渲染框架构建的项目部署到服务器，并用PM2守护程序</a>
</blockquote>
<p>最近好多伙伴说，我用vue做的项目本地是可以的，但部署到服务器遇到好多问题：<code>资源找不到</code>，<code>直接访问index.html页面空白</code>，<code>刷新当前路由404</code>。。。用react做的项目也同样遇到类似问题。现在我们一起讨论下单页面如何部署到服务器？</p>
<p><strong>由于前端路由缘故，单页面应用应该放到nginx或者apache、tomcat等web代理服务器中，千万不要直接访问index.html，同时要根据自己服务器的项目路径更改react或vue的路由地址。</strong></p>
<p>如果说项目是直接跟在域名后面的，比如:<a href="http://www.sosout.com" rel="nofollow noreferrer" target="_blank">http://www.sosout.com</a> ，根路由就是 '/'。<br>如果说项目是直接跟在域名后面的一个子目录中的，比如:<a href="http://www.sosout.com/children" rel="nofollow noreferrer" target="_blank">http://www.sosout.com/children</a> ，根路由就是 '/children '，不能直接访问index.html。</p>
<p>以配置Nginx为例，配置过程大致如下：（假设：<br>1、项目文件目录： <strong>/mnt/html/spa（spa目录下的文件就是执行了npm run dist 后生成的dist目录下的文件）</strong><br>2、访问域名：<strong>spa.sosout.com</strong>） <br>进入nginx.conf新增如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name  spa.sosout.com;
    root /mnt/html/spa;
    index index.html;
    location ~ ^/favicon\.ico$ {
        root /mnt/html/spa;
    }

    location / {
        try_files $uri $uri/ /index.html;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto  $scheme;
    }
    access_log  /mnt/logs/nginx/access.log  main;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span>  spa.sosout.com;
    <span class="hljs-attribute">root</span> /mnt/html/spa;
    <span class="hljs-attribute">index</span> index.html;
    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ ^/favicon\.ico$</span> {
        <span class="hljs-attribute">root</span> /mnt/html/spa;
    }

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
        <span class="hljs-attribute">proxy_set_header</span>   Host             <span class="hljs-variable">$host</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Real-IP        <span class="hljs-variable">$remote_addr</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-Proto  <span class="hljs-variable">$scheme</span>;
    }
    <span class="hljs-attribute">access_log</span>  /mnt/logs/nginx/access.log  main;
}</code></pre>
<p>注意事项：<br><code>1、配置域名的话，需要80端口，成功后，只要访问域名即可访问的项目</code><br><code>2、如果你使用了react-router的 browserHistory 模式或 vue-router的 history 模式，在nginx配置还需要重写路由：</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name  spa.sosout.com;
    root /mnt/html/spa;
    index index.html;
    location ~ ^/favicon\.ico$ {
        root /mnt/html/spa;
    }

    location / {
        try_files $uri $uri/ @fallback;
        index index.html;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto  $scheme;
    }
    location @fallback {
        rewrite ^.*$ /index.html break;
    }
    access_log  /mnt/logs/nginx/access.log  main;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span>  spa.sosout.com;
    <span class="hljs-attribute">root</span> /mnt/html/spa;
    <span class="hljs-attribute">index</span> index.html;
    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ ^/favicon\.ico$</span> {
        <span class="hljs-attribute">root</span> /mnt/html/spa;
    }

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ <span class="hljs-variable">@fallback</span>;
        <span class="hljs-attribute">index</span> index.html;
        <span class="hljs-attribute">proxy_set_header</span>   Host             <span class="hljs-variable">$host</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Real-IP        <span class="hljs-variable">$remote_addr</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-Proto  <span class="hljs-variable">$scheme</span>;
    }
    <span class="hljs-attribute">location</span> <span class="hljs-variable">@fallback</span> {
        <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^.*$</span> /index.html <span class="hljs-literal">break</span>;
    }
    <span class="hljs-attribute">access_log</span>  /mnt/logs/nginx/access.log  main;
}</code></pre>
<p>为什么要重写路由？<code>因为我们的项目只有一个根入口，当输入类似/home的url时，如果找不到对应的页面，nginx会尝试加载index.html，这是通过react-router或vue-router就能正确的匹配我们输入的/home路由，从而显示正确的home页面，如果browserHistory模式或history模式的项目没有配置上述内容，会出现404的情况。</code></p>
<p>简单举两个例子，一个vue项目一个react项目：</p>
<p><strong>vue项目：</strong></p>
<p>域名：<a href="http://tb.sosout.com" rel="nofollow noreferrer" target="_blank">http://tb.sosout.com</a></p>
<p><span class="img-wrap"><img data-src="/img/bV1lw0?w=1524&amp;h=982" src="https://static.alili.tech/img/bV1lw0?w=1524&amp;h=982" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from '../App'

// 首页
const home = r => require.ensure([], () => r(require('../page/home/index')), 'home')

// 物流
const logistics = r => require.ensure([], () => r(require('../page/logistics/index')), 'logistics')

// 购物车
const cart = r => require.ensure([], () => r(require('../page/cart/index')), 'cart')

// 我的
const profile = r => require.ensure([], () => r(require('../page/profile/index')), 'profile')

// 登录界面
const login = r => require.ensure([], () => r(require('../page/user/login')), 'login')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [{
    path: '/home', // 首页
    component: home
  }, {
    path: '/logistics', // 物流
    component: logistics,
    meta: {
      login: true
    }
  }, {
    path: '/cart', // 购物车
    component: cart,
    meta: {
      login: true
    }
  }, {
    path: '/profile', // 我的
    component: profile
  }, {
    path: '/login', // 登录界面
    component: login
  }, {
    path: '*',
    redirect: '/home'
  }]
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../App'</span>

<span class="hljs-comment">// 首页</span>
<span class="hljs-keyword">const</span> home = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../page/home/index'</span>)), <span class="hljs-string">'home'</span>)

<span class="hljs-comment">// 物流</span>
<span class="hljs-keyword">const</span> logistics = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../page/logistics/index'</span>)), <span class="hljs-string">'logistics'</span>)

<span class="hljs-comment">// 购物车</span>
<span class="hljs-keyword">const</span> cart = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../page/cart/index'</span>)), <span class="hljs-string">'cart'</span>)

<span class="hljs-comment">// 我的</span>
<span class="hljs-keyword">const</span> profile = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../page/profile/index'</span>)), <span class="hljs-string">'profile'</span>)

<span class="hljs-comment">// 登录界面</span>
<span class="hljs-keyword">const</span> login = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../page/user/login'</span>)), <span class="hljs-string">'login'</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [{
  path: <span class="hljs-string">'/'</span>,
  component: App, <span class="hljs-comment">// 顶层路由，对应index.html</span>
  children: [{
    path: <span class="hljs-string">'/home'</span>, <span class="hljs-comment">// 首页</span>
    component: home
  }, {
    path: <span class="hljs-string">'/logistics'</span>, <span class="hljs-comment">// 物流</span>
    component: logistics,
    meta: {
      login: <span class="hljs-literal">true</span>
    }
  }, {
    path: <span class="hljs-string">'/cart'</span>, <span class="hljs-comment">// 购物车</span>
    component: cart,
    meta: {
      login: <span class="hljs-literal">true</span>
    }
  }, {
    path: <span class="hljs-string">'/profile'</span>, <span class="hljs-comment">// 我的</span>
    component: profile
  }, {
    path: <span class="hljs-string">'/login'</span>, <span class="hljs-comment">// 登录界面</span>
    component: login
  }, {
    path: <span class="hljs-string">'*'</span>,
    redirect: <span class="hljs-string">'/home'</span>
  }]
}]</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1lxg?w=1486&amp;h=1366" src="https://static.alili.tech/img/bV1lxg?w=1486&amp;h=1366" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="############
# 其他配置
############

http {
    ############
    # 其他配置
    ############
    server {
        listen 80;
        server_name  tb.sosout.com;
        root /mnt/html/tb;
        index index.html;
        location ~ ^/favicon\.ico$ {
            root /mnt/html/tb;
        }
    
        location / {
            try_files $uri $uri/ @fallback;
            index index.html;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto  $scheme;
        }
        location @fallback {
            rewrite ^.*$ /index.html break;
        }
        access_log  /mnt/logs/nginx/access.log  main;
    }
    ############
    # 其他配置
    ############   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>############
# 其他配置
############

http {
    ############
    # 其他配置
    ############
    server {
        listen <span class="hljs-number">80</span>;
        server_name  tb.sosout.com;
        root /mnt/html/tb;
        index index.html;
        location ~ ^/favicon\.ico$ {
            root /mnt/html/tb;
        }
    
        location / {
            try_files $uri $uri/ @fallback;
            index index.html;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto  $scheme;
        }
        location @fallback {
            rewrite ^.*$ /index.html break;
        }
        access_log  /mnt/logs/nginx/access.log  main;
    }
    ############
    # 其他配置
    ############   
}</code></pre>
<p><strong>react项目：</strong></p>
<p>域名：<a href="http://antd.sosout.com" rel="nofollow noreferrer" target="_blank">http://antd.sosout.com</a></p>
<p><span class="img-wrap"><img data-src="/img/bV1lx7?w=1440&amp;h=1342" src="https://static.alili.tech/img/bV1lx7?w=1440&amp;h=1342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* 疑惑一：
* React createClass 和 extends React.Component 有什么区别?
* 之前写法：
* let app = React.createClass({
*      getInitialState: function(){
*        // some thing
*      }
*  })
* ES6写法(通过es6类的继承实现时state的初始化要在constructor中声明)：
* class exampleComponent extends React.Component {
*    constructor(props) {
*        super(props);
*        this.state = {example: 'example'}
*    }
* }
*/

import React, {Component, PropTypes} from 'react'; // react核心
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router'; // 创建route所需
import Config from '../config/index';
import layout from '../component/layout/layout'; // 布局界面

import login from '../containers/login/login'; // 登录界面

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
        return (
            <div>{this.props.children}</div>
        );
    }
}

// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// 快速入门
const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/homeIndex').default)
    }, 'home');
}

// 百度图表-折线图
const chartLine = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/charts/lines').default)
    }, 'chartLine');
}

// 基础组件-按钮
const button = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/general/buttonIndex').default)
    }, 'button');
}

// 基础组件-图标
const icon = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/general/iconIndex').default)
    }, 'icon');
}

// 用户管理
const user = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/userIndex').default)
    }, 'user');
}

// 系统设置
const setting = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/setting/settingIndex').default)
    }, 'setting');
}

// 广告管理
const adver = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/adver/adverIndex').default)
    }, 'adver');
}

// 组件一
const oneui = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ui/oneIndex').default)
    }, 'oneui');
}

// 组件二
const twoui = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ui/twoIndex').default)
    }, 'twoui');
}

// 登录验证
const requireAuth = (nextState, replace) => {
    let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
    if(token > 7200000) { // 模拟Token保存2个小时
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

const RouteConfig = (
    <Router history={browserHistory}>
        <Route path=&quot;/home&quot; component={layout} onEnter={requireAuth}>
            <IndexRoute getComponent={home} onEnter={requireAuth} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
            <Route path=&quot;/home&quot; getComponent={home} onEnter={requireAuth} />
            <Route path=&quot;/chart/line&quot; getComponent={chartLine} onEnter={requireAuth} />
            <Route path=&quot;/general/button&quot; getComponent={button} onEnter={requireAuth} />
            <Route path=&quot;/general/icon&quot; getComponent={icon} onEnter={requireAuth} />
            <Route path=&quot;/user&quot; getComponent={user} onEnter={requireAuth} />
            <Route path=&quot;/setting&quot; getComponent={setting} onEnter={requireAuth} />
            <Route path=&quot;/adver&quot; getComponent={adver} onEnter={requireAuth} />
            <Route path=&quot;/ui/oneui&quot; getComponent={oneui} onEnter={requireAuth} />
            <Route path=&quot;/ui/twoui&quot; getComponent={twoui} onEnter={requireAuth} />
        </Route>
        <Route path=&quot;/login&quot; component={Roots}> // 所有的访问，都跳转到Roots
            <IndexRoute component={login} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
        </Route>
        <Redirect from=&quot;*&quot; to=&quot;/home&quot; />
    </Router>
);

export default RouteConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-comment">/**
* 疑惑一：
* React createClass 和 extends React.Component 有什么区别?
* 之前写法：
* let app = React.createClass({
*      getInitialState: function(){
*        // some thing
*      }
*  })
* ES6写法(通过es6类的继承实现时state的初始化要在constructor中声明)：
* class exampleComponent extends React.Component {
*    constructor(props) {
*        super(props);
*        this.state = {example: 'example'}
*    }
* }
*/</span>

import React, {Component, PropTypes} from <span class="hljs-string">'react'</span>; <span class="hljs-comment">// react核心</span>
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from <span class="hljs-string">'react-router'</span>; <span class="hljs-comment">// 创建route所需</span>
import Config from <span class="hljs-string">'../config/index'</span>;
import layout from <span class="hljs-string">'../component/layout/layout'</span>; <span class="hljs-comment">// 布局界面</span>

import login from <span class="hljs-string">'../containers/login/login'</span>; <span class="hljs-comment">// 登录界面</span>

<span class="hljs-comment">/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * <span class="hljs-doctag">@class</span> Roots
 * <span class="hljs-doctag">@extends</span> {Component}
 */</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Roots</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-comment">// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下</span>
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;{this.props.children}&lt;/div&gt;
        );
    }
}

<span class="hljs-comment">// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;</span>

<span class="hljs-comment">// 快速入门</span>
<span class="hljs-keyword">const</span> home = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/home/homeIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'home'</span>);
}

<span class="hljs-comment">// 百度图表-折线图</span>
<span class="hljs-keyword">const</span> chartLine = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/charts/lines'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'chartLine'</span>);
}

<span class="hljs-comment">// 基础组件-按钮</span>
<span class="hljs-keyword">const</span> button = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/general/buttonIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'button'</span>);
}

<span class="hljs-comment">// 基础组件-图标</span>
<span class="hljs-keyword">const</span> icon = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/general/iconIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'icon'</span>);
}

<span class="hljs-comment">// 用户管理</span>
<span class="hljs-keyword">const</span> user = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/user/userIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'user'</span>);
}

<span class="hljs-comment">// 系统设置</span>
<span class="hljs-keyword">const</span> setting = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/setting/settingIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'setting'</span>);
}

<span class="hljs-comment">// 广告管理</span>
<span class="hljs-keyword">const</span> adver = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/adver/adverIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'adver'</span>);
}

<span class="hljs-comment">// 组件一</span>
<span class="hljs-keyword">const</span> oneui = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/ui/oneIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'oneui'</span>);
}

<span class="hljs-comment">// 组件二</span>
<span class="hljs-keyword">const</span> twoui = (location, cb) =&gt; {
    <span class="hljs-keyword">require</span>.ensure([], <span class="hljs-keyword">require</span> =&gt; {
        cb(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">'../containers/ui/twoIndex'</span>).<span class="hljs-keyword">default</span>)
    }, <span class="hljs-string">'twoui'</span>);
}

<span class="hljs-comment">// 登录验证</span>
<span class="hljs-keyword">const</span> requireAuth = (nextState, replace) =&gt; {
    <span class="hljs-keyword">let</span> token = (<span class="hljs-keyword">new</span> Date()).getTime() - Config.localItem(<span class="hljs-string">'USER_AUTHORIZATION'</span>);
    <span class="hljs-keyword">if</span>(token &gt; <span class="hljs-number">7200000</span>) { <span class="hljs-comment">// 模拟Token保存2个小时</span>
        replace({
            pathname: <span class="hljs-string">'/login'</span>,
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

<span class="hljs-keyword">const</span> RouteConfig = (
    &lt;Router history={browserHistory}&gt;
        &lt;Route path=<span class="hljs-string">"/home"</span> component={layout} onEnter={requireAuth}&gt;
            &lt;IndexRoute getComponent={home} onEnter={requireAuth} /&gt; <span class="hljs-comment">// 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home</span>
            &lt;Route path=<span class="hljs-string">"/home"</span> getComponent={home} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/chart/line"</span> getComponent={chartLine} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/general/button"</span> getComponent={button} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/general/icon"</span> getComponent={icon} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/user"</span> getComponent={user} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/setting"</span> getComponent={setting} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/adver"</span> getComponent={adver} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/ui/oneui"</span> getComponent={oneui} onEnter={requireAuth} /&gt;
            &lt;Route path=<span class="hljs-string">"/ui/twoui"</span> getComponent={twoui} onEnter={requireAuth} /&gt;
        &lt;/Route&gt;
        &lt;Route path=<span class="hljs-string">"/login"</span> component={Roots}&gt; <span class="hljs-comment">// 所有的访问，都跳转到Roots</span>
            &lt;IndexRoute component={login} /&gt; <span class="hljs-comment">// 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home</span>
        &lt;/Route&gt;
        &lt;Redirect from=<span class="hljs-string">"*"</span> to=<span class="hljs-string">"/home"</span> /&gt;
    &lt;/Router&gt;
);

export <span class="hljs-keyword">default</span> RouteConfig;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1lye?w=1980&amp;h=1276" src="https://static.alili.tech/img/bV1lye?w=1980&amp;h=1276" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="############
# 其他配置
############

http {
    ############
    # 其他配置
    ############
    server {
        listen 80;
        server_name  antd.sosout.com;
        root /mnt/html/reactAntd;
        index index.html;
        location ~ ^/favicon\.ico$ {
            root /mnt/html/reactAntd;
        }

        location / {
            try_files $uri $uri/ @router;
            index index.html;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto  $scheme;
        }
        location @router {
            rewrite ^.*$ /index.html break;
        }
        access_log  /mnt/logs/nginx/access.log  main;
    }

    ############
    # 其他配置
    ############   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>############
# 其他配置
############

http {
    ############
    # 其他配置
    ############
    server {
        listen <span class="hljs-number">80</span>;
        server_name  antd.sosout.com;
        root /mnt/html/reactAntd;
        index index.html;
        location ~ ^/favicon\.ico$ {
            root /mnt/html/reactAntd;
        }

        location / {
            try_files $uri $uri/ @router;
            index index.html;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto  $scheme;
        }
        location @router {
            rewrite ^.*$ /index.html break;
        }
        access_log  /mnt/logs/nginx/access.log  main;
    }

    ############
    # 其他配置
    ############   
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue、react等单页面项目应该这样子部署到服务器

## 原文链接
[https://segmentfault.com/a/1190000012675012](https://segmentfault.com/a/1190000012675012)


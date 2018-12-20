---
title: 'React+Redux开发实录（一）搭建工程脚手架' 
date: 2018-12-21 2:30:11
hidden: true
slug: wwqjdfttw1
categories: [reprint]
---

{{< raw >}}

                    
<p>React+Redux开发实录（一）搭建工程脚手架<br><a href="https://segmentfault.com/a/1190000009879742">React+Redux开发实录（二）React技术栈一览</a></p>
<h1 id="articleHeader0">搭建工程脚手架</h1>
<h2 id="articleHeader1">准备工作</h2>
<ul>
<li>安装node</li>
<li>安装git</li>
<li>安装一款前端IDE<br>推荐VSCode，最火的前端IDE，比sublime开源，比WebStrom轻，比XCode快。人性化，配色也很舒服，用来开发很惬意。</li>
</ul>
<h2 id="articleHeader2">create-react-app基础脚手架</h2>
<p>借助React官方的create-react-app工具，开发人员可以从配置工作中解脱出来，无需过早关注React技术栈，通过创建一个已经完成基本配置的应用，让开发者快速开始React应用的开发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g create-react-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">create</span>-react-app</code></pre>
<p>安装结束后，就可以在终端用create-react-app命令创建工程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create-react-app react-redux-app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">react-redux-</span><span class="hljs-string">app</span></code></pre>
<p>react-redux-app工程集成了react应用框架，在此基础上进行React应用开发，就避免了繁琐的初始配置工作。</p>
<p>进入工程目录，启动工程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd react-redux-app
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">cd</span> react-redux-app
npm <span class="hljs-built_in">start</span></code></pre>
<p>启动了一个开发模式的服务器，指向本机<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/，显示如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV0DoV?w=606&amp;h=241" src="https://static.alili.tech/img/bV0DoV?w=606&amp;h=241" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">弹出webpack配置</h2>
<p>实际开发中，通常要定制webpack的配置，因此我们弹出应用的webpack配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> eject</span></code></pre>
<p>执行完以上命令，react-redux-app下多了config和scrips目录，分别对应webpack配置和npm脚本。</p>
<h2 id="articleHeader4">安装redux相关库</h2>
<p>安装redux核心库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> redux <span class="hljs-comment">--save</span></code></pre>
<p>直接使用redux的API会比较繁琐。react官方提供的react-redux库，可以更方便的使用redux：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-redux --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> react-redux <span class="hljs-comment">--save</span></code></pre>
<p>安装babel插件transform-decorators-legacy，可以使用@connect更方便的连接UI组件与容器组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-transform-decorators-legacy --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-transform-decorators-legacy <span class="hljs-comment">--save-dev</span></code></pre>
<p>安装transform-decorators-legacy插件后，需在package.json配置该插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel&quot;: {
  &quot;plugins&quot;: [
    &quot;transform-decorators-legacy&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"babel"</span>: {
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"transform-decorators-legacy"</span>
  ]
}</code></pre>
<p>安装下redux异步调用的库redux-thunk：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux-thunk --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> redux-thunk <span class="hljs-comment">--save</span></code></pre>
<h2 id="articleHeader5">其他配套库</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 路由库react-router4
npm install react-router-dom --save
# ajax库
npm install axios --save
# 组件属性校验库
npm install prop-types --save
# cookie操纵库
npm install browser-cookies --save
# socket.io客户端
npm install socket.io-client --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment"># 路由库react-router4</span>
npm install react-router-dom <span class="hljs-comment">--save</span>
<span class="hljs-comment"># ajax库</span>
npm install axios <span class="hljs-comment">--save</span>
<span class="hljs-comment"># 组件属性校验库</span>
npm install <span class="hljs-keyword">prop</span>-types <span class="hljs-comment">--save</span>
<span class="hljs-comment"># cookie操纵库</span>
npm install browser-cookies <span class="hljs-comment">--save</span>
<span class="hljs-comment"># socket.io客户端</span>
npm install socket.io-client <span class="hljs-comment">--save</span></code></pre>
<h2 id="articleHeader6">配置下代理</h2>
<p>开发中，前端工程与后端API不在一个域名，为避免跨域限制，方便接口调试，需在package.json中配下代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 比如，任何ajax请求，都代理到localhost:9093域
&quot;proxy&quot;: &quot;http://localhost:9093&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 比如，任何ajax请求，都代理到localhost:9093域</span>
<span class="hljs-string">"proxy"</span>: <span class="hljs-string">"http://localhost:9093"</span></code></pre>
<h2 id="articleHeader7">来一款CSS预处理器</h2>
<p>less、sass或stylus都行，这里我安装less。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less-loader less --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-keyword">less</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>分别修改/config/webpack.config.dev.js和/config/webpack.config.prod.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(css|less)$/, //  这里加上less
  use: [
    ...
    {
      loader: require.resolve('less-loader') // 配置less-loader
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /\.(css|less)$/, //  这里加上less
  use: [
    ...
    {
      loader: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'less-loader'</span>) // 配置less-loader
    }
  ]
}</code></pre>
<h2 id="articleHeader8">配合一款UI框架</h2>
<p>React开发，国内首选蚂蚁金服的antd设计，移动端的话，安装antd-mobile：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install antd-mobile --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install antd-mobile --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>最好配置antd组件样式的按需加载，借助babel的import插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-import --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">import</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>package.json中，记得配置上该插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel&quot;: {
  &quot;plugins&quot;: [
    &quot;transform-decorators-legacy&quot;,
    [&quot;import&quot;, { &quot;libraryName&quot;: &quot;antd-mobile&quot;, &quot;style&quot;: &quot;css&quot; }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"babel"</span>: {
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"transform-decorators-legacy"</span>,
    [<span class="hljs-string">"import"</span>, { <span class="hljs-string">"libraryName"</span>: <span class="hljs-string">"antd-mobile"</span>, <span class="hljs-string">"style"</span>: <span class="hljs-string">"css"</span> }]
  ]
}</code></pre>
<h2 id="articleHeader9">初始目录文件</h2>
<p>创建一些初始目录和文件，在入口处完成redux和router的一些基础工作：</p>
<p>创建目录/src/component</p>
<p>创建目录/src/container</p>
<p>创建目录/src/redux</p>
<p>创建/src/container/login/index.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

class Login extends React.Component {
    render() {
        return <h2>登录页</h2>
    }
}

export default Login
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;h2&gt;登录页&lt;/h2&gt;
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Login</span>
</code></pre>
<p>创建/src/container/register/index.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

class Register extends React.Component {
    render() {
        return <h2>注册页</h2>
    }
}

export default Register" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Register</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;h2&gt;注册页&lt;/h2&gt;
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Register</span></code></pre>
<p>创建/src/config.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config) {
    Toast.loading('加载中', 0)
    return config
})

axios.interceptors.response.use(function(config) {
    Toast.hide()
    return config
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd-mobile'</span>

axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
    Toast.loading(<span class="hljs-string">'加载中'</span>, <span class="hljs-number">0</span>)
    <span class="hljs-keyword">return</span> config
})

axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
    Toast.hide()
    <span class="hljs-keyword">return</span> config
})</code></pre>
<p>创建/src/reducer.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineReducers } from 'redux'

function reducer(state = 0, action) {
    return state
}

export default combineReducers({reducer})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { combineReducers } <span class="hljs-keyword">from</span> 'redux'

function reducer(<span class="hljs-keyword">state</span> = <span class="hljs-number">0</span>, action) {
    return <span class="hljs-keyword">state</span>
}

export <span class="hljs-keyword">default</span> combineReducers({reducer})
</code></pre>
<p>创建/src/app.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { Route } from 'react-router-dom'

import Login from './container/login'
import Register from './container/register'

class App extends React.Component {
    render () {
        return (
            <div>
                <Route path=&quot;/Register&quot; component={Register}></Route>
                <Route path=&quot;/login&quot; component={Login}></Route>
            </div>
        )
    }
}

export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>

<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'./container/login'</span>
<span class="hljs-keyword">import</span> Register <span class="hljs-keyword">from</span> <span class="hljs-string">'./container/register'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render () {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/Register"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Register}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/login"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Login}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre>
<p>修改/src/index.js，编辑如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducer'
import './config'
import App from './app'

registerServiceWorker()

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { createStore, applyMiddleware, compose } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { BrowserRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>

<span class="hljs-keyword">import</span> registerServiceWorker <span class="hljs-keyword">from</span> <span class="hljs-string">'./registerServiceWorker'</span>;
<span class="hljs-keyword">import</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducer'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./config'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

registerServiceWorker()

<span class="hljs-keyword">const</span> store = createStore(reducers, compose(
    applyMiddleware(thunk),
    <span class="hljs-built_in">window</span>.devToolsExtension ? <span class="hljs-built_in">window</span>.devToolsExtension() : <span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f
))

ReactDOM.render((
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">App</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">App</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));</code></pre>
<p>删除其他多余的文件，保持脚手架工程为如下结构：<br><span class="img-wrap"><img data-src="/img/bV2xlK?w=1692&amp;h=1108" src="https://static.alili.tech/img/bV2xlK?w=1692&amp;h=1108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>再次启动工程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<p>访问登录页<a href="http://localhost:3000/login" rel="nofollow noreferrer" target="_blank">http://localhost:3000/login</a>，显示：</p>
<p><span class="img-wrap"><img data-src="/img/bV0DuI?w=1210&amp;h=376" src="https://static.alili.tech/img/bV0DuI?w=1210&amp;h=376" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>访问注册页<a href="http://localhost:3000/register" rel="nofollow noreferrer" target="_blank">http://localhost:3000/register</a>，显示：</p>
<p><span class="img-wrap"><img data-src="/img/bV0DuL?w=1182&amp;h=418" src="https://static.alili.tech/img/bV0DuL?w=1182&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">安装Chrome扩展</h2>
<p>访问Chrome的<a href="https://chrome.google.com/webstore/category/extensions?hl=zh-CN" rel="nofollow noreferrer" target="_blank">获取更多扩展程序</a> （可能要翻墙）。搜索安装react-developer-tools和redux-devtools。</p>
<p>或者自己去网上下载扩展程序的crx文件，进入<a>chrome扩展程序</a>页面，勾选开发者模式，然后把crx文件拖进去。</p>
<p>也不必刻意学习要怎么使用，开发中自己调出来，多点几下就都明白了。</p>
<h2 id="articleHeader11">按需安装其他库</h2>
<p>其他库，视自身项目情况安装吧。比如，如果你的后端使用node服务端暴露接口API，而你又使用express框架进行node开发。那么，你需要安装express：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install express --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">express</span> --<span class="hljs-built_in">save</span></code></pre>
<p>假如你不想每次修改后端接口都重启node服务端，那么你可以安装nodemon库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g nodemon" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g nodemon</code></pre>
<p>安装了nodemon库后，用nodemon命令代替node命令启动node服务端就可以了。</p>
<p>安装node.js的消息体解析中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install body-parser --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">body</span>-parser <span class="hljs-comment">--save</span></code></pre>
<p>假如你用cookie存储用户会话，可以安装node操作cookie的库cookie-parse：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cookie-parser --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> cookie-parser <span class="hljs-comment">--save</span></code></pre>
<p>如果你要在node里用DM5进行密码加密的话，你可能需要utility库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install utility --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> utility <span class="hljs-comment">--save</span></code></pre>
<p>如果有实时聊天等功能的话，可能socket库你也需要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install socket.io --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">socket</span>.io <span class="hljs-comment">--save</span></code></pre>
<p>再如果，你是使用mongodb数据库，那么你要在机器上安装mongodb：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# mac电脑可以用brew工具在本机安装mongodb
brew install mongodb
# 完了后，你可以用以下命令启动和停止mongodb服务：
brew services start mongodb
brew services stop mongodb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-comment"># mac电脑可以用brew工具在本机安装mongodb</span>
<span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>mongodb
<span class="hljs-comment"># 完了后，你可以用以下命令启动和停止mongodb服务：</span>
<span class="hljs-keyword">brew </span>services start mongodb
<span class="hljs-keyword">brew </span>services stop mongodb</code></pre>
<p>安装mongoose库，封装了node对mongodb的api操纵：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mongoose --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> mongoose <span class="hljs-comment">--save</span></code></pre>
<p>npm里海量的库，自己按需安装去吧......</p>
<h2 id="articleHeader12">源代码托管一下</h2>
<p>去github上创建下远程仓库react-redux-app。<br>然后在工程目录下执行以下命令，关联上远程仓库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git init
git remote add origin https://github.com/zhutx/react-redux-app.git
git push -u origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git init
git remote <span class="hljs-keyword">add</span><span class="bash"> origin https://github.com/zhutx/react-redux-app.git
</span>git push -u origin master</code></pre>
<p>React+Redux开发实录（一）搭建工程脚手架<br><a href="https://segmentfault.com/a/1190000009879742">React+Redux开发实录（二）React技术栈一览</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React+Redux开发实录（一）搭建工程脚手架

## 原文链接
[https://segmentfault.com/a/1190000012505414](https://segmentfault.com/a/1190000012505414)


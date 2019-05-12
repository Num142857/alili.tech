---
title: 'Egg + React 服务端渲染开发指南' 
date: 2018-12-27 2:30:13
hidden: true
slug: i98hjfv0ro
categories: [reprint]
---

{{< raw >}}

                    
<p>## 1. 项目初始化</p>
<h3 id="articleHeader0">1.1 通过 <a href="http://hubcarl.github.io/easywebpack/webpack/cli/" rel="nofollow noreferrer" target="_blank">easywebpack-cli</a> 脚手架初始化</h3>
<ol>
<li>安装脚手架 <code>npm install easywebpack-cli -g</code> 命令行，然后就可以使用 <code>easywebpack</code> 或 <code>easy</code> 命令</li>
<li>命令行运行 <code>easywebpack init</code>
</li>
<li>选择 egg + react server side render boilerplate 初始化骨架项目</li>
<li>安装依赖 <code>npm install</code>
</li>
</ol>
<h3 id="articleHeader1">1.2 通过骨架项目初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/hubcarl/egg-react-webpack-boilerplate.git
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> https://github.com/hubcarl/egg-react-webpack-boilerplate.git
npm install</code></pre>
<p>初始化的项目提供多页面和SPA(react-router/react-redux)服务端渲染实例，可以直接运行。</p>
<h2 id="articleHeader2">2. 项目运行</h2>
<h3 id="articleHeader3">2.1 本地运行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<p>npm start 做了如下三件事情</p>
<ul>
<li>启动 egg 应用</li>
<li>启动 Webpack 构建, 文件不落地磁盘，构建的文件都在内存里面(只在本地启动, 发布模式是提前构建好文件到磁盘)</li>
<li>构建会同时启动两个 Webpack 构建服务, 客户端js构建端口9000, 服务端端口9001</li>
<li>构建完成，Egg应用正式可用，自动打开浏览器</li>
</ul>
<h3 id="articleHeader4">2.2 发布模式</h3>
<ul><li>构建文件落地磁盘</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build 或 easywebpack build prod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">npm</span> run <span class="hljs-keyword">build </span>或 easywebpack <span class="hljs-keyword">build </span>prod</code></pre>
<ol>
<li>启动 Webpack 构建，文件落地磁盘</li>
<li>服务端构建的文件放到 <code>app/view</code> 目录</li>
<li>客户端构建的文件放到 <code>public</code> 目录</li>
<li>生成的 <code>buildConfig.json</code> 和 <code>manifest.json</code> 放到 <code>config</code> 目录</li>
<li>构建的文件都是 <code>gitignore </code>的，部署时请注意把这些文件打包进去</li>
</ol>
<ul><li>运行</li></ul>
<p>启动应用前， 请设置 <code>EGG_SERVER_ENV</code> 环境变量，测试环境设置 <code>test</code>， 正式环境设置 <code>prod</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<h2 id="articleHeader5">3. 项目构建</h2>
<ul>
<li>通过 <code>easywebpack-cli</code> 统一构建，支持 dev，test，prod 模式构建</li>
<li>
<code>easywebpack-cli</code> 通过项目根目录下的 <code>webpack.config.js</code> 配置文件构造出 Webpack 实际的配置文件，配置项请见 <a href="http://hubcarl.github.io/easywebpack/webpack/config/" rel="nofollow noreferrer" target="_blank">webpack.config.js</a>
</li>
<li>获取 Webpack 实际的配置文件, <a href="https://github.com/hubcarl/egg-webpack" rel="nofollow noreferrer" target="_blank">egg-webpack</a> 会使用到该功能。构建会根据 <code>webpackConfigList.length</code> 启动对应个数的 Webpack 编译实例，这里会同时启动两个 Webpack 构建服务, 客户端jsbundle构建，端口9000, 服务端jsbundle构建端口9001。默认端口为9000, 端口依次递增。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/config.local.js 本地 npm start 使用
const EasyWebpack = require('easywebpack-react');
exports.webpack = {
  webpackConfigList:EasyWebpack.getWebpackConfig()
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/config.local.js 本地 npm start 使用</span>
<span class="hljs-keyword">const</span> EasyWebpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'easywebpack-react'</span>);
exports.webpack = {
  <span class="hljs-attr">webpackConfigList</span>:EasyWebpack.getWebpackConfig()
};</code></pre>
<ul><li>该项目中，<code>app/web/page</code> 目录中所有 .jsx 文件当作 Webpack 构建入口是采用 app/web/framework/entry/loader.js 模板实现的，这个需要结合 <code>webpack.config.js</code> 下的 entry.loader 使用。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    include: ['app/web/page',
      { layout: 'app/web/view/layout.jsx?loader=false' },
      { 'spa/redux': 'app/web/page/spa/redux.jsx?loader=false' },
      { 'spa/client': 'app/web/page/spa/client.jsx?loader=false' },
      { 'spa/ssr': 'app/web/page/spa/ssr.jsx?loader=false' }
    ],
    exclude: ['app/web/page/test'],
    loader: {
      client: 'app/web/framework/entry/loader.js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: {
    <span class="hljs-attr">include</span>: [<span class="hljs-string">'app/web/page'</span>,
      { <span class="hljs-attr">layout</span>: <span class="hljs-string">'app/web/view/layout.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/redux'</span>: <span class="hljs-string">'app/web/page/spa/redux.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/client'</span>: <span class="hljs-string">'app/web/page/spa/client.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/ssr'</span>: <span class="hljs-string">'app/web/page/spa/ssr.jsx?loader=false'</span> }
    ],
    <span class="hljs-attr">exclude</span>: [<span class="hljs-string">'app/web/page/test'</span>],
    <span class="hljs-attr">loader</span>: {
      <span class="hljs-attr">client</span>: <span class="hljs-string">'app/web/framework/entry/loader.js'</span>
    }
}</code></pre>
<p>上面 <code>{ 'app/app': 'app/web/page/app/app.js?loader=false' }</code> 这个 <code>loader=false</code> 的含义表示 <code>app/web/page</code> 目录下的 <code>app/app.js</code> 不使用 entry.loader 模板。因为这个app/app.js是一个SPA服务端渲染Example，实现逻辑与其他普通的页面不一样，不能用 entry.loader 模板， 这个功能在自定义entry文件构建规范时使用。</p>
<h2 id="articleHeader6">4. 项目规范</h2>
<ul>
<li><a href="https://eggjs.org/zh-cn/basics/structure.html" rel="nofollow noreferrer" target="_blank">遵循 egg 开发规范</a></li>
<li>React 项目代码放到 app/web 目录，页面入口目录为 page，该目录的 所有 .jsx 文件默认会作为 Webpack 的 entry 构建入口。建议每个页面目录的只保留一个.jsx 文件，jsx关联的组件可以放到widget 或者 component 目录。如果非要放到当前目前，请配置 <code>webpack.config.js</code> entry.exclude 排除 .jsx 文件。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVXkZS?w=235&amp;h=420" src="https://static.alili.tech/img/bVXkZS?w=235&amp;h=420" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">5. 项目开发</h2>
<p>支持多页面/单页面服务端渲染, 前端渲染, 静态页面三种方式.</p>
<h3 id="articleHeader8">5.1 多页面服务端渲染实现</h3>
<h4>5.1.1 多页面前端页面实现</h4>
<p>在app/web/page 目录下面创建home目录, home.jsx 文件, Webpack自动根据.jsx 文件创建entry入口, 具体实现请见<a href="http://hubcarl.github.io/easywebpack/webpack/config/" rel="nofollow noreferrer" target="_blank">webpack.config.js</a></p>
<ul><li>home.jsx 以组件的方式实现页面逻辑</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import Header from 'component/layout/standard/header/header.jsx';
import List from 'component/home/list.jsx';
import './home.css';
export default class Home extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    return <div>
      <Header></Header>
      <div className=&quot;main&quot;>
        <div className=&quot;page-container page-component&quot;>
          <List list={this.props.list}></List>
        </div>
      </div>
    </div>;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'component/layout/standard/header/header.jsx'</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'component/home/list.jsx'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./home.css'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'----componentDidMount-----'</span>);
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"page-container page-component"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">list</span>=<span class="hljs-string">{this.props.list}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }</code></pre>
<h4>5.1.2 多页面后端渲染实现, 通过 <code>egg-view-react-ssr</code> 插件 <code>render</code> 方法实现</h4>
<ul><li>创建controller文件home.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.index = function* (ctx) {
  yield ctx.render('home/home.js', Model.getPage(1, 10));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.index = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.render(<span class="hljs-string">'home/home.js'</span>, Model.getPage(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>));
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/home', app.controller.home.home.index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">app.get(<span class="hljs-string">'/home'</span>, app.controller.home.home.index);</code></pre>
<h4>5.1.3 多页面走前端渲染(后端路由)实现, 通过 <code>egg-view-react-ssr</code> 插件 <code>renderClient</code> 方法实现</h4>
<ul><li>创建controller文件home.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.client = function* (ctx) {
  yield ctx.renderClient('home/home.js', Model.getPage(1, 10));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.client = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.renderClient(<span class="hljs-string">'home/home.js'</span>, Model.getPage(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>));
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/client', app.controller.home.home.client);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">app.get(<span class="hljs-string">'/client'</span>, app.controller.home.home.client);</code></pre>
<h3 id="articleHeader9">5.2 HTML静态页面前端渲染</h3>
<ul>
<li>直接有easywebpack构建出静态HTML文件, 请见 <code>webpack.config.js</code> 配置和 <code>app/web/page/html</code>代码实现</li>
<li>通过 <code>egg-static</code> 静态文件访问HTML文件</li>
</ul>
<h3 id="articleHeader10">5.3 单页面服务器渲染同构实现</h3>
<h4>5.3.1 单页面前端实现</h4>
<p>在app/web/page 目录下面创建app目录, spa/ssr.jsx 文件.</p>
<ul><li>ssr.jsx 页面调用入口</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {match, RouterContext} from 'react-router'
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config'
import Header from 'component/layout/standard/header/header';
import SSR from 'component/spa/ssr/ssr';
import { create } from 'component/spa/ssr/store';
import routes from 'component/spa/ssr/routes'
import './spa.css';


if (typeof window === 'object') { // 前端渲染构建
  const store = create(window.__INITIAL_STATE__);
  const url = store.getState().url;
  ReactDOM.render(
    <div>
      <Header></Header>
      <Provider store={ store }>
        <BrowserRouter>
          <SSR url={ url }/>
        </BrowserRouter>
      </Provider>
    </div>,
    document.getElementById('app')
  );
} else {  // 服务端渲染构建和render入口, 这里 export 函数，服务端会负责处理
  module.exports = (context, options) => {
    const url = context.state.url;
    const branch = matchRoutes(routes, url);
    // 获取组件数据
    const promises = branch.map(({route}) => {
      const fetch = route.component.fetch;
      return fetch instanceof Function ? fetch() : Promise.resolve(null)
    });
    return Promise.all(promises).then(data => {
      // 初始化store数据
      const initState = context.state;
      data.forEach(item => {
        Object.assign(initState, item);
      });
      context.state = Object.assign({}, context.state, initState);
      const store = create(initState);
      return () =>(
        <div>
          <Header></Header>
          <Provider store={store}>
            <StaticRouter location={url} context="{{""}}">
              <SSR url={url}/>
            </StaticRouter>
          </Provider>
        </div>
      )
    });
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="jsx"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> {match, RouterContext} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
<span class="hljs-keyword">import</span> { BrowserRouter, StaticRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> { matchRoutes, renderRoutes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-config'</span>
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'component/layout/standard/header/header'</span>;
<span class="hljs-keyword">import</span> SSR <span class="hljs-keyword">from</span> <span class="hljs-string">'component/spa/ssr/ssr'</span>;
<span class="hljs-keyword">import</span> { create } <span class="hljs-keyword">from</span> <span class="hljs-string">'component/spa/ssr/store'</span>;
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'component/spa/ssr/routes'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./spa.css'</span>;


<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">'object'</span>) { <span class="hljs-regexp">//</span> 前端渲染构建
  const store = create(<span class="hljs-built_in">window</span>.__INITIAL_STATE__);
  const url = store.getState().url;
  ReactDOM.render(
    &lt;div&gt;
      &lt;Header&gt;&lt;/Header&gt;
      &lt;Provider store={ store }&gt;
        &lt;BrowserRouter&gt;
          &lt;SSR url={ url }/&gt;
        &lt;/BrowserRouter&gt;
      &lt;/Provider&gt;
    &lt;/div&gt;,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
  );
} <span class="hljs-keyword">else</span> {  <span class="hljs-regexp">//</span> 服务端渲染构建和render入口, 这里 <span class="hljs-keyword">export</span> 函数，服务端会负责处理
  <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(context, options)</span> =&gt;</span> {
    const url = context.state.url;
    const branch = matchRoutes(routes, url);
    <span class="hljs-regexp">//</span> 获取组件数据
    const promises = branch.map(<span class="hljs-function"><span class="hljs-params">({route})</span> =&gt;</span> {
      const fetch = route.component.fetch;
      <span class="hljs-keyword">return</span> fetch <span class="hljs-keyword">instanceof</span> Function ? fetch() : Promise.resolve(<span class="hljs-literal">null</span>)
    });
    <span class="hljs-keyword">return</span> Promise.all(promises).<span class="hljs-keyword">then</span>(data =&gt; {
      <span class="hljs-regexp">//</span> 初始化store数据
      const initState = context.state;
      data.forEach(item =&gt; {
        Object.assign(initState, item);
      });
      context.state = Object.assign({}, context.state, initState);
      const store = create(initState);
      <span class="hljs-keyword">return</span> () =&gt;(
        &lt;div&gt;
          &lt;Header&gt;&lt;/Header&gt;
          &lt;Provider store={store}&gt;
            &lt;StaticRouter location={url} context="{{""}}"&gt;
              &lt;SSR url={url}/&gt;
            &lt;/StaticRouter&gt;
          &lt;/Provider&gt;
        &lt;/div&gt;
      )
    });
  };
}</code></pre>
<h4>5.3.2 单页面后端实现</h4>
<ul><li>创建controller文件app.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.ssr = function* (ctx) {
  yield ctx.render('spa/ssr.js', { url: this.url });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.ssr = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.render(<span class="hljs-string">'spa/ssr.js'</span>, { <span class="hljs-attr">url</span>: <span class="hljs-keyword">this</span>.url });
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  app.get('/spa/ssr', app.controller.spa.ssr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  app.get(<span class="hljs-string">'/spa/ssr'</span>, app.controller.spa.ssr);</code></pre>
<ul><li>构建配置</li></ul>
<p>spa 单页面实现复杂，不能使用 entry.loader, 所以需要在 <code>webpack.config.js</code> 配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  entry: {
    include: ['app/web/page',
      { layout: 'app/web/view/layout.jsx?loader=false' },
      { 'spa/redux': 'app/web/page/spa/redux.jsx?loader=false' },
      { 'spa/client': 'app/web/page/spa/client.jsx?loader=false' },
      { 'spa/ssr': 'app/web/page/spa/ssr.jsx?loader=false' }
    ],
    exclude: ['app/web/page/test'],
    loader: {
      client: 'app/web/framework/entry/loader.js'
    }
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">include</span>: [<span class="hljs-string">'app/web/page'</span>,
      { <span class="hljs-attr">layout</span>: <span class="hljs-string">'app/web/view/layout.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/redux'</span>: <span class="hljs-string">'app/web/page/spa/redux.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/client'</span>: <span class="hljs-string">'app/web/page/spa/client.jsx?loader=false'</span> },
      { <span class="hljs-string">'spa/ssr'</span>: <span class="hljs-string">'app/web/page/spa/ssr.jsx?loader=false'</span> }
    ],
    <span class="hljs-attr">exclude</span>: [<span class="hljs-string">'app/web/page/test'</span>],
    <span class="hljs-attr">loader</span>: {
      <span class="hljs-attr">client</span>: <span class="hljs-string">'app/web/framework/entry/loader.js'</span>
    }
  },
}</code></pre>
<p>详细代码请参考<a href="https://github.com/hubcarl/egg-react-webpack-boilerplate/blob/master/app/web/page/spa/ssr.jsx" rel="nofollow noreferrer" target="_blank">骨架项目实现</a></p>
<h2 id="articleHeader11">6. 项目部署</h2>
<ul>
<li>正式环境部署，请设置 <code>EGG_SERVER_ENV=prod</code> 环境变量, 更多请见<a href="https://eggjs.org/zh-cn/basics/env.html" rel="nofollow noreferrer" target="_blank">运行环境</a>
</li>
<li>构建的 <code>app/view</code> 目录, <code>public</code> 目录以及 <code>buildConfig.json</code> 和 <code>manifest.json</code>等文件, 都是 <code>gitignore</code> 的，部署时请注意把这些文件打包进去。</li>
</ul>
<h2 id="articleHeader12">7. 项目和插件</h2>
<ul>
<li>
<a href="https://github.com/hubcarl/egg-react-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">egg-react-webpack-boilerplate</a>基于easywebpack-react和egg-view-react(ssr)插件的工程骨架项目</li>
<li>
<a href="https://github.com/hubcarl/easywebpack" rel="nofollow noreferrer" target="_blank">easywebpack</a> Webpack 构建工程化.</li>
<li>
<a href="https://github.com/hubcarl/easywebpack-cli" rel="nofollow noreferrer" target="_blank">easywebpack-cli</a>  Webpack 构建工程化脚手架.</li>
<li>
<a href="https://github.com/eggjs/egg-view-vue" rel="nofollow noreferrer" target="_blank">egg-view-react</a> react ssr engine.</li>
<li>
<a href="https://github.com/hubcarl/egg-view-vue-ssr" rel="nofollow noreferrer" target="_blank">egg-view-react-ssr</a> react ssr 解决方案.</li>
<li>
<a href="https://github.com/hubcarl/egg-webpack" rel="nofollow noreferrer" target="_blank">egg-webpack</a> 本地开发热更新使用.</li>
<li>
<a href="https://github.com/hubcarl/egg-webpack-react" rel="nofollow noreferrer" target="_blank">egg-webpack-react</a> 本地开发渲染内存读取辅助插件</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Egg + React 服务端渲染开发指南

## 原文链接
[https://segmentfault.com/a/1190000011719737](https://segmentfault.com/a/1190000011719737)


---
title: 'React 同构实践与思考' 
date: 2019-02-12 2:30:12
hidden: true
slug: lubyzuxg55m
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知，目前的 WEB 应用，用户体验要求越来越高，WEB 交互变得越来越丰富！前端可以做的事越来越多，去年 Node 引领了前后端分层的浪潮，而 React 的出现让分层思想可以更多彻底的执行，尤其是 React 同构 (Universal or Isomorphic) 这个黑科技到底是怎么实现的，我们来一探究竟。</p>
<h2 id="articleHeader0">React 服务端方法</h2>
<p>如果熟悉 React 开发，那么一定对 <code>ReactDOM.render</code> 方法不陌生，这是 React 渲染到 DOM 中的方法。</p>
<p>现有的任何开发模式都离不开 DOM 树，如图：<br><span class="img-wrap"><img data-src="http://dt-daily.alicdn.com/pic/render-client.png" src="https://static.alili.techhttp://dt-daily.alicdn.com/pic/render-client.png" alt="客户端渲染" title="客户端渲染" style="cursor: pointer; display: inline;"></span></p>
<p>服务端渲染就要稍作改动，如图：<br><span class="img-wrap"><img data-src="http://dt-daily.alicdn.com/pic/render-server.png" src="https://static.alili.techhttp://dt-daily.alicdn.com/pic/render-server.png" alt="服务端渲染" title="服务端渲染" style="cursor: pointer;"></span></p>
<p>比较两张图可以看出，服务端渲染需要把 React 的初次渲染放到服务端，让 React 帮我们把业务 component 翻译成 string 类型的 DOM 树，再通过后端语言的 IO 流输出至浏览器。</p>
<p>我们来看 React 官方给我们提供的服务端渲染的API：</p>
<ul>
<li><p><code>React.renderToString</code> 是把 React 元素转成一个 HTML 字符串，因为服务端渲染已经标识了 reactid，所以在浏览器端再次渲染，React 只是做事件绑定，而不会将所有的 DOM 树重新渲染，这样能带来高性能的页面首次加载！同构黑魔法主要从这个 API 而来。</p></li>
<li><p><code>React.renderToStaticMarkup</code>，这个 API 相当于一个简化版的 renderToString，如果你的应用基本上是静态文本，建议用这个方法，少了一大批的 reactid，DOM 树自然精简了，在 IO 流传输上节省一部分流量。</p></li>
</ul>
<p>配合 <code>renderToString</code> 和 <code>renderToStaticMarkup</code> 使用，<code>createElement</code> 返回的 ReactElement 作为参数传递给前面两个方法。</p>
<h2 id="articleHeader1">React 玩转 Node</h2>
<p>有了解决方案，我们就可以动手在 Node 来做一些事了。后面会利用 KOA 这个 Node 框架来做实践。</p>
<p>我们新建应用，目录结构如下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react-server-koa-simple
├── app
│   ├── assets
│   │   ├── build
│   │   ├── src
│   │   │    ├── img
│   │   │    ├── js
│   │   │    └── css
│   │   ├── package.json
│   │   └── webpack.config.js
│   ├── middleware
│   │   └── static.js（前端静态资源托管中间件）
│   ├── plugin
│   │   └── reactview（reactview 插件）
│   └── views
│       ├── layout
│       │    └── Default.js
│       ├── Device.js
│       └── Home.js
├── .babelrc
├── .gitgnore
├── app.js
├── package.json
└── README.md
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>react-server-koa-simple
├── app
│   ├── assets
│   │   ├── build
│   │   ├── src
│   │   │    ├── <span class="hljs-selector-tag">img</span>
│   │   │    ├── js
│   │   │    └── css
│   │   ├── package<span class="hljs-selector-class">.json</span>
│   │   └── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
│   ├── middleware
│   │   └── static.js（前端静态资源托管中间件）
│   ├── plugin
│   │   └── reactview（reactview 插件）
│   └── views
│       ├── layout
│       │    └── Default<span class="hljs-selector-class">.js</span>
│       ├── Device<span class="hljs-selector-class">.js</span>
│       └── Home<span class="hljs-selector-class">.js</span>
├── <span class="hljs-selector-class">.babelrc</span>
├── <span class="hljs-selector-class">.gitgnore</span>
├── app<span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
└── README<span class="hljs-selector-class">.md</span>
</code></pre>
<p>首先，我们需要实现一个 KOA 插件，用来实现 React 作为服务端模板的渲染工作，方法是将 <code>render</code> 方法插入到 app 上下文中，目的是在 controller 层中调用，<code>this.render(viewFileName, props, children)</code> 并通过 <code>this.body</code> 输出文档流至浏览器端。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * koa-react-view.js
 * 提供 react server render 功能
 * {
 *   options : {
 *     viewpath: viewpath,                 // the root directory of view files
 *     doctype: '<!DOCTYPE html>',
 *     extname: '.js',                     // view层直接渲染文件名后缀
 *     writeResp: true,                    // 是否需要在view层直接输出
 *   }
 * }
 */
module.exports = function(app) {
  const opts = app.config.reactview || {};
  assert(opts &amp;&amp; opts.viewpath &amp;&amp; util.isString(opts.viewpath), '[reactview] viewpath is required, please check config!');
  const options = Object.assign({}, defaultOpts, opts);

  app.context.render = function(filename, _locals, children) {
    let filepath = path.join(options.viewpath, filename);

    let render = opts.internals
      ? ReactDOMServer.renderToString
      : ReactDOMServer.renderToStaticMarkup;

    // merge koa state
    let props = Object.assign({}, this.state, _locals);
    let markup = options.doctype || '<!DOCTYPE html>';

    try {
      let component = require(filepath);
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += render(React.createElement(component, props, children));
    } catch (err) {
      err.code = 'REACT';
      throw err;
    }
    if (options.writeResp) {
      this.type = 'html';
      this.body = markup;
    }
    return markup;
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
 * koa-react-view.js
 * 提供 react server render 功能
 * {
 *   options : {
 *     viewpath: viewpath,                 // the root directory of view files
 *     doctype: '&lt;!DOCTYPE html&gt;',
 *     extname: '.js',                     // view层直接渲染文件名后缀
 *     writeResp: true,                    // 是否需要在view层直接输出
 *   }
 * }
 */</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
  <span class="hljs-keyword">const</span> opts = app.config.reactview || {};
  assert(opts &amp;&amp; opts.viewpath &amp;&amp; util.isString(opts.viewpath), <span class="hljs-string">'[reactview] viewpath is required, please check config!'</span>);
  <span class="hljs-keyword">const</span> options = <span class="hljs-built_in">Object</span>.assign({}, defaultOpts, opts);

  app.context.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filename, _locals, children</span>) </span>{
    <span class="hljs-keyword">let</span> filepath = path.join(options.viewpath, filename);

    <span class="hljs-keyword">let</span> render = opts.internals
      ? ReactDOMServer.renderToString
      : ReactDOMServer.renderToStaticMarkup;

    <span class="hljs-comment">// merge koa state</span>
    <span class="hljs-keyword">let</span> props = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.state, _locals);
    <span class="hljs-keyword">let</span> markup = options.doctype || <span class="hljs-string">'&lt;!DOCTYPE html&gt;'</span>;

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">let</span> component = <span class="hljs-built_in">require</span>(filepath);
      <span class="hljs-comment">// Transpiled ES6 may export components as { default: Component }</span>
      component = component.default || component;
      markup += render(React.createElement(component, props, children));
    } <span class="hljs-keyword">catch</span> (err) {
      err.code = <span class="hljs-string">'REACT'</span>;
      <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-keyword">if</span> (options.writeResp) {
      <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'html'</span>;
      <span class="hljs-keyword">this</span>.body = markup;
    }
    <span class="hljs-keyword">return</span> markup;
  };
};</code></pre>
<p>然后，我们来写用 React 实现的服务端的 Components，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * react-server-koa-simple - app/views/Home.js
 * home模板
 */

render() {
  let { microdata, mydata } = this.props;
  let homeJs = `${microdata.styleDomain}/build/${microdata.styleVersion}/js/home.js`;
  let scriptUrls = [homeJs];

  return (
    <Default
      microdata={microdata}
      scriptUrls={scriptUrls}
      title={&quot;demo&quot;}>
      <div id=&quot;demoApp&quot;
        data-microdata={JSON.stringify(microdata)}
        data-mydata={JSON.stringify(mydata)}>
        <Content mydata={mydata} microdata={microdata} />
      </div>
    </Default>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
 * react-server-koa-simple - app/views/Home.js
 * home模板
 */</span>

render() {
  <span class="hljs-keyword">let</span> { microdata, mydata } = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">let</span> homeJs = <span class="hljs-string">`<span class="hljs-subst">${microdata.styleDomain}</span>/build/<span class="hljs-subst">${microdata.styleVersion}</span>/js/home.js`</span>;
  <span class="hljs-keyword">let</span> scriptUrls = [homeJs];

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Default</span>
      <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span>
      <span class="hljs-attr">scriptUrls</span>=<span class="hljs-string">{scriptUrls}</span>
      <span class="hljs-attr">title</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">demo</span>"}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demoApp"</span>
        <span class="hljs-attr">data-microdata</span>=<span class="hljs-string">{JSON.stringify(microdata)}</span>
        <span class="hljs-attr">data-mydata</span>=<span class="hljs-string">{JSON.stringify(mydata)}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Content</span> <span class="hljs-attr">mydata</span>=<span class="hljs-string">{mydata}</span> <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Default</span>&gt;</span>
  );
}</span></code></pre>
<p>这里做了几件事，初始化 DOM 树，用 data 属性作服务端数据埋点，渲染前后端公共 Content 模块，引用前端模块</p>
<p>而客户端，我们就可以很方便地拿到了服务端的数据，可以直接拿来使用，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactDOM from 'react-dom';
import Content from './components/Content.js';

const microdata = JSON.parse(appEle.getAttribute('data-microdata'));
const mydata = JSON.parse(appEle.getAttribute('data-mydata'));

ReactDOM.render(
  <Content mydata={mydata} microdata={microdata} />,
  document.getElementById('demoApp')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> Content <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Content.js'</span>;

<span class="hljs-keyword">const</span> microdata = <span class="hljs-built_in">JSON</span>.parse(appEle.getAttribute(<span class="hljs-string">'data-microdata'</span>));
<span class="hljs-keyword">const</span> mydata = <span class="hljs-built_in">JSON</span>.parse(appEle.getAttribute(<span class="hljs-string">'data-mydata'</span>));

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Content</span> <span class="hljs-attr">mydata</span>=<span class="hljs-string">{mydata}</span> <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span> /&gt;</span>,
  document.getElementById('demoApp')
);</span></code></pre>
<p>然后，到了启动一个简单的 koa 应用的时候，完善入口 app.js 来验证我们的想法，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const koa = require('koa');
const koaRouter = require('koa-router');
const path = require('path');
const reactview = require('./app/plugin/reactview/app.js');
const Static = require('./app/middleware/static.js');

const App = ()=> {
  let app = koa();
  let router = koaRouter();

  // 初始化 /home 路由 dispatch 的 generator
  router.get('/home', function*() {
    // 执行view插件
    this.body = this.render('Home', {
      microdata: {
        domain: &quot;//localhost:3000&quot;
      },
      mydata: {
        nick: 'server render body'
      }
    });
  });
  app.use(router.routes()).use(router.allowedMethods());

  // 注入 reactview
  const viewpath = path.join(__dirname, 'app/views');
  app.config = {
    reactview: {
      viewpath: viewpath,                 // the root directory of view files
      doctype: '<!DOCTYPE html>',
      extname: '.js',                     // view层直接渲染文件名后缀
      beautify: true,                     // 是否需要对dom结构进行格式化
      writeResp: false,                    // 是否需要在view层直接输出
    }
  }
  reactview(app);

  return app;
};

const createApp = ()=> {
  const app = App();

  // http服务端口监听
  app.listen(3000, ()=> {
    console.log('3000 is listening!');
  });

  return app;
};
createApp();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> koaRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> reactview = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app/plugin/reactview/app.js'</span>);
<span class="hljs-keyword">const</span> Static = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app/middleware/static.js'</span>);

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
  <span class="hljs-keyword">let</span> app = koa();
  <span class="hljs-keyword">let</span> router = koaRouter();

  <span class="hljs-comment">// 初始化 /home 路由 dispatch 的 generator</span>
  router.get(<span class="hljs-string">'/home'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 执行view插件</span>
    <span class="hljs-keyword">this</span>.body = <span class="hljs-keyword">this</span>.render(<span class="hljs-string">'Home'</span>, {
      microdata: {
        domain: <span class="hljs-string">"//localhost:3000"</span>
      },
      mydata: {
        nick: <span class="hljs-string">'server render body'</span>
      }
    });
  });
  app.use(router.routes()).use(router.allowedMethods());

  <span class="hljs-comment">// 注入 reactview</span>
  <span class="hljs-keyword">const</span> viewpath = path.join(__dirname, <span class="hljs-string">'app/views'</span>);
  app.config = {
    reactview: {
      viewpath: viewpath,                 <span class="hljs-comment">// the root directory of view files</span>
      doctype: <span class="hljs-string">'&lt;!DOCTYPE html&gt;'</span>,
      extname: <span class="hljs-string">'.js'</span>,                     <span class="hljs-comment">// view层直接渲染文件名后缀</span>
      beautify: <span class="hljs-literal">true</span>,                     <span class="hljs-comment">// 是否需要对dom结构进行格式化</span>
      writeResp: <span class="hljs-literal">false</span>,                    <span class="hljs-comment">// 是否需要在view层直接输出</span>
    }
  }
  reactview(app);

  <span class="hljs-keyword">return</span> app;
};

<span class="hljs-keyword">const</span> createApp = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
  <span class="hljs-keyword">const</span> app = App();

  <span class="hljs-comment">// http服务端口监听</span>
  app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3000 is listening!'</span>);
  });

  <span class="hljs-keyword">return</span> app;
};
createApp();</code></pre>
<p>现在，访问上面预先设置好的路由，<a href="http://localhost:3000/home" rel="nofollow noreferrer" target="_blank">http://localhost:3000/home</a> 来验证 server render，</p>
<ul>
<li><p>服务端： <span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1LcVBLFXXXXazXpXXXXXXXXXX-1872-844.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1LcVBLFXXXXazXpXXXXXXXXXX-1872-844.png" alt="server-dom" title="server-dom" style="cursor: pointer;"></span></p></li>
<li><p>浏览器端： <span class="img-wrap"><img data-src="https://dt-daily.alicdn.com/browserdom.png" src="https://static.alili.techhttps://dt-daily.alicdn.com/browserdom.png" alt="browser-dom" title="browser-dom" style="cursor: pointer;"></span></p></li>
</ul>
<h2 id="articleHeader2">react-router 和 koa-router 统一</h2>
<p>我们已经建立了服务端渲染的基础了，接着再考虑下如何把后端和前端的路由做统一。</p>
<p>假设我们的路由设置成 <code>/device/:deviceID</code> 这种形式，<br>那么服务端是这么来实现的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化 device/:deviceID 路由 dispatch 的 generator
router.get('/device/:deviceID', function*() {
  // 执行view插件
  let deviceID = this.params.deviceID;
  this.body = this.render('Device', {
    isServer: true,
    microdata: microdata,
    mydata: {
      path: this.path,
      deviceID: deviceID,
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 初始化 device/:deviceID 路由 dispatch 的 generator</span>
router.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/device/:deviceID'</span>, function*() {
  <span class="hljs-comment">// 执行view插件</span>
  let deviceID = <span class="hljs-keyword">this</span>.params.deviceID;
  <span class="hljs-keyword">this</span>.body = <span class="hljs-keyword">this</span>.render(<span class="hljs-string">'Device'</span>, {
    isServer: <span class="hljs-literal">true</span>,
    microdata: microdata,
    mydata: {
      path: <span class="hljs-keyword">this</span>.path,
      deviceID: deviceID,
    }
  });
});</code></pre>
<p>以及服务端 View 模板，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const { microdata, mydata, isServer } = this.props;
  const deviceJs = `${microdata.styleDomain}/build/${microdata.styleVersion}/js/device.js`;
  const scriptUrls = [deviceJs];

  return (
    <Default
      microdata={microdata}
      scriptUrls={scriptUrls}
      title={&quot;demo&quot;}>
      <div id=&quot;demoApp&quot;
        data-microdata={JSON.stringify(microdata)}
        data-mydata={JSON.stringify(mydata)}>
        <Iso
          microdata={microdata}
          mydata={mydata}
          isServer={isServer}
        />
      </div>
    </Default>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">const</span> { microdata, mydata, isServer } = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">const</span> deviceJs = <span class="hljs-string">`<span class="hljs-subst">${microdata.styleDomain}</span>/build/<span class="hljs-subst">${microdata.styleVersion}</span>/js/device.js`</span>;
  <span class="hljs-keyword">const</span> scriptUrls = [deviceJs];

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Default</span>
      <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span>
      <span class="hljs-attr">scriptUrls</span>=<span class="hljs-string">{scriptUrls}</span>
      <span class="hljs-attr">title</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">demo</span>"}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demoApp"</span>
        <span class="hljs-attr">data-microdata</span>=<span class="hljs-string">{JSON.stringify(microdata)}</span>
        <span class="hljs-attr">data-mydata</span>=<span class="hljs-string">{JSON.stringify(mydata)}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Iso</span>
          <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span>
          <span class="hljs-attr">mydata</span>=<span class="hljs-string">{mydata}</span>
          <span class="hljs-attr">isServer</span>=<span class="hljs-string">{isServer}</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Default</span>&gt;</span>
  );
}</span></code></pre>
<p>前端 app 入口：app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getServerData(key) {
  return JSON.parse(appEle.getAttribute(`data-${key}`));
};

// 从服务端埋点处 <div id=&quot;demoApp&quot;> 获取 microdata, mydata
let microdata = getServerData('microdata');
let mydata = getServerData('mydata');

ReactDOM.render(
  <Iso microdata={microdata} mydata={mydata} isServer={false} />,
  document.getElementById('demoApp'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getServerData</span>(<span class="hljs-params">key</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(appEle.getAttribute(<span class="hljs-string">`data-<span class="hljs-subst">${key}</span>`</span>));
};

<span class="hljs-comment">// 从服务端埋点处 &lt;div id="demoApp"&gt; 获取 microdata, mydata</span>
<span class="hljs-keyword">let</span> microdata = getServerData(<span class="hljs-string">'microdata'</span>);
<span class="hljs-keyword">let</span> mydata = getServerData(<span class="hljs-string">'mydata'</span>);

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Iso</span> <span class="hljs-attr">microdata</span>=<span class="hljs-string">{microdata}</span> <span class="hljs-attr">mydata</span>=<span class="hljs-string">{mydata}</span> <span class="hljs-attr">isServer</span>=<span class="hljs-string">{false}</span> /&gt;</span>,
  document.getElementById('demoApp'));</span></code></pre>
<p>前后端公用的 Iso.js 模块，前端路由同样设置成 <code>/device/:deviceID</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Iso extends Component {
  static propTypes = {
    // ...
  };

  // 包裹 Route 的 Component，目的是注入服务端传入的 props
  wrapComponent(Component) {
    const { microdata, mydata } = this.props;

    return React.createClass({
      render() {
        return React.createElement(Component, {
          microdata: microdata,
          mydata: mydata
        }, this.props.children);
      }
    });
  }

  // LayoutView 为路由的布局; DeviceView 为参数处理模块
  render() {
    const { isServer, mydata } = this.props;

    return (
      <Router history={isServer ? createMemoryHistory(mydata.path || '/') : browserHistory}>
        <Route path=&quot;/&quot;
          component={this.wrapComponent(LayoutView)}>
          <IndexRoute component={this.wrapComponent(DeviceView)} />
          <Route path=&quot;/device/:deviceID&quot; component={DeviceView} />
        </Route>
      </Router>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Iso</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  static propTypes = {
    <span class="hljs-comment">// ...</span>
  };

  <span class="hljs-comment">// 包裹 Route 的 Component，目的是注入服务端传入的 props</span>
  wrapComponent(<span class="hljs-type">Component</span>) {
    const { microdata, mydata } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.createClass({
      render() {
        <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.createElement(<span class="hljs-type">Component</span>, {
          microdata: microdata,
          mydata: mydata
        }, <span class="hljs-keyword">this</span>.props.children);
      }
    });
  }

  <span class="hljs-comment">// LayoutView 为路由的布局; DeviceView 为参数处理模块</span>
  render() {
    const { isServer, mydata } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Router</span> history={isServer ? createMemoryHistory(mydata.path || '/') : browserHistory}&gt;
        &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/"</span>
          component={<span class="hljs-keyword">this</span>.wrapComponent(<span class="hljs-type">LayoutView</span>)}&gt;
          &lt;<span class="hljs-type">IndexRoute</span> component={<span class="hljs-keyword">this</span>.wrapComponent(<span class="hljs-type">DeviceView</span>)} /&gt;
          &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/device/:deviceID"</span> component={<span class="hljs-type">DeviceView</span>} /&gt;
        &lt;/<span class="hljs-type">Route</span>&gt;
      &lt;/<span class="hljs-type">Router</span>&gt;
    );
  }
}</code></pre>
<p>这样我就实现了服务端和前端路由的同构！</p>
<p>无论你是初次访问这些资源路径： <code>/device/all， /device/pc， /device/wireless</code>，还是在页面手动切换这些资源路径效果都是一样的，既保证了初次渲染有符合预期的 DOM 输出的用户体验，又保证了代码的简洁性，最重要的是前后端代码是一套，并且由一位工程师开发，有没有觉得很棒？</p>
<p>其中注意几点：</p>
<ol>
<li><p>Iso 的 render 模块需要判断isServer，服务端用createMemoryHistory，前端用browserHistory；</p></li>
<li><p>react-router 的 component 如果需要注入 props 必须对其进行包裹 wrapComponent。因为服务端渲染的数据需要通过传 props 的方式，而react-router-route 只提供了 component，并不支持继续追加 props。截取 Route 的源码，</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="propTypes: {
  path: string,
  component: _PropTypes.component,
  components: _PropTypes.components,
  getComponent: func,
  getComponents: func
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">propTypes:</span> {
<span class="hljs-symbol">  path:</span> string,
<span class="hljs-symbol">  component:</span> _PropTypes.component,
<span class="hljs-symbol">  components:</span> _PropTypes.components,
<span class="hljs-symbol">  getComponent:</span> func,
<span class="hljs-symbol">  getComponents:</span> func
},</code></pre>
<p>为什么服务端获取数据不和前端保持一致，在 Component 里作数据绑定，使用 fetchData 和数据绑定！只能说，你可以大胆的假设。接下来就是我们要继续探讨的同构model！</p>
<h2 id="articleHeader3">同构数据处理的探讨</h2>
<p>我们都知道，浏览器端获取数据需要发起 ajax 请求，实际上发起的请求 URL 就是对应服务端一个路由控制器。</p>
<p>React 是有生命周期的，官方给我们指出的绑定 Model，fetchData 应该在 <code>componentDidMount</code> 里来进行。在服务端，React 是不会去执行<code>componentDidMount</code> 方法的，因为，React 的 <code>renderTranscation</code> 分成两块： <code>ReactReconcileTransaction</code> 和<code>ReactServerRenderingTransaction</code>，其在服务端的实现移除掉了在浏览器端的一些特定方法。</p>
<p>而服务端处理数据是线性的，是不可逆的，发起请求 &gt; 去数据库获取数据 &gt; 业务逻辑处理 &gt; 组装成 html-&gt; IO流输出给浏览器。显然，服务端和浏览器端是矛盾的！</p>
<h2 id="articleHeader4">实验的方案</h2>
<p>你或许会想到利用 <code>ReactClass</code> 提供的 statics 来做点文章，React 确实提供了入口，不仅能包裹静态属性，还能包裹静态方法，并且能 DEFINE_MANY：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * An object containing properties and methods that should be defined on
 * the component's constructor instead of its prototype (static methods).
 *
 * @type {object}
 * @optional
 */
statics: SpecPolicy.DEFINE_MANY," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>/**
 * <span class="hljs-type">An</span> object containing properties and methods that should be defined on
 * the component's constructor instead <span class="hljs-keyword">of</span> its proto<span class="hljs-keyword">type</span> (static methods).
 *
 * @<span class="hljs-keyword">type</span> {object}
 * @optional
 */
<span class="hljs-title">statics</span>: <span class="hljs-type">SpecPolicy</span>.<span class="hljs-type">DEFINE_MANY</span>,</code></pre>
<p>利用 statics 把我们的组件扩展成这样，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ContentView extends Component {
  statics: {
    fetchData: function (callback) {
      ContentData.fetch().then((data)=> {
        callback(data);
      });
    }
  };
  // 浏览器端这样获取数据
  componentDidMount() {
    this.constructor.fetchData((data)=> {
      this.setState({
        data: data
      });
    });
  }
  ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ContentView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  statics: {
    fetchData: function (callback) {
      <span class="hljs-type">ContentData</span>.fetch().then((data)=&gt; {
        callback(data);
      });
    }
  };
  <span class="hljs-comment">// 浏览器端这样获取数据</span>
  componentDidMount() {
    <span class="hljs-keyword">this</span>.constructor.fetchData((data)=&gt; {
      <span class="hljs-keyword">this</span>.setState({
        data: data
      });
    });
  }
  ...
});</code></pre>
<p>ContentData.fetch() 需要实现两套：</p>
<ol>
<li><p>服务端：封装服务端service层方法</p></li>
<li><p>浏览器端：封装ajax或Fetch方法</p></li>
</ol>
<p>服务端调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('ContentView').fetchData((data)=> {
  this.body = this.render('Device', {
    isServer: true,
    microdata: microdata,
    mydata: data
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">'ContentView'</span>).fetchData(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span> {
  <span class="hljs-keyword">this</span>.body = <span class="hljs-keyword">this</span>.render(<span class="hljs-string">'Device'</span>, {
    isServer: <span class="hljs-literal">true</span>,
    microdata: microdata,
    mydata: data
  });
});</code></pre>
<p>这样可以解决数据层的同构！但我并不认为这是一个好的方法，好像回到 JSP 时代。</p>
<p>我们团队现在使用的方法：<br><span class="img-wrap"><img data-src="http://dt-daily.alicdn.com/pic/iso-data-flow2.png" src="https://static.alili.techhttp://dt-daily.alicdn.com/pic/iso-data-flow2.png" alt="流程图" title="流程图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">参考资料</h2>
<p>本文完整运行的 <a href="https://github.com/huqingliang/react-server/tree/master/react-server-koa-simple" rel="nofollow noreferrer" target="_blank">例子</a></p>
<ul>
<li><p><a href="https://facebook.github.io/react/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/react/docs/getting-started.html</a></p></li>
<li><p><a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/react</a></p></li>
<li><p><a href="https://github.com/rackt/react-router" rel="nofollow noreferrer" target="_blank">https://github.com/rackt/react-router</a></p></li>
<li><p><a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/koa</a></p></li>
<li><p><a href="https://github.com/alexmingoia/koa-router" rel="nofollow noreferrer" target="_blank">https://github.com/alexmingoia/koa-router</a></p></li>
<li><p><a href="https://github.com/koajs/react-view" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/react-view</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 同构实践与思考

## 原文链接
[https://segmentfault.com/a/1190000004671209](https://segmentfault.com/a/1190000004671209)


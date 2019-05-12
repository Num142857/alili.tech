---
title: 'react-router 按需加载' 
date: 2019-02-02 2:30:11
hidden: true
slug: fwut2x6q1s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>注：本文使用的 react-router 版本为 2.8.1</p></blockquote>
<p>React Router 是一个非常出色的路由解决方案，同时也非常容易上手。但是当网站规模越来越大的时候，首先出现的问题是 Javascript 文件变得巨大，这导致首页渲染的时间让人难以忍受。实际上程序应当只加载当前渲染页所需的 JavaScript，也就是大家说的“代码分拆" — 将所有的代码分拆成多个小包，在用户浏览过程中按需加载。</p>
<p>官方示例在 <a href="https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>所得到的效果是：</p>
<p>以前是这样（23333，我真不是故意的。。）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007141052?w=2500&amp;h=50" src="https://static.alili.tech/img/remote/1460000007141052?w=2500&amp;h=50" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在是这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007141053?w=2496&amp;h=214" src="https://static.alili.tech/img/remote/1460000007141053?w=2496&amp;h=214" alt="" title="" style="cursor: pointer;"></span></p>
<p>实际上就是将一个大 javascript 文件拆分成了若干个 chunk file。</p>
<p>下面是改造过程</p>
<h2 id="articleHeader0">Webpack 配置</h2>
<p>首先在 <code>webpack.config.js</code> 的 <code>output</code> 内加上 <code>chunkFilename</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath,
    // 添加 chunkFilename
    chunkFilename: '[name].[chunkhash:5].chunk.js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">output: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'/../dist/assets'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'app.js'</span>,
    <span class="hljs-attr">publicPath</span>: defaultSettings.publicPath,
    <span class="hljs-comment">// 添加 chunkFilename</span>
    chunkFilename: <span class="hljs-string">'[name].[chunkhash:5].chunk.js'</span>,
},</code></pre>
<p><code>name</code> 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。</p>
<p><code>chunkhash</code> 是文件的 hash 码，这里只使用前五位。</p>
<h2 id="articleHeader1">添加首页</h2>
<p>以前你的路由大概应该是这样的：（作为需要按需加载的大型应用，路由肯定是相当复杂，这里只列举部分路由举例）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  (
    <Router history={browserHistory}>
      {/* 主页 */}
      <Route path=&quot;/&quot; component={App}>
        {/* 默认 */}
        <IndexRoute component={HomePage} />

        {/* baidu */}
        <Route path=&quot;/baidu&quot; component={BaiduPage}>
          <Route path=&quot;result&quot; component={BaiduResultPage} />
          <Route path=&quot;frequency&quot; component={BaiduFrequencyPage} />
        </Route>

        {/* 404 */}
        <Route path='/404' component={NotFoundPage} />
        
        {/* 其他重定向到 404 */}
        <Redirect from='*' to='/404' />
      </Route>
    </Router>
  ), document.getElementById('app')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx"><span class="xml">ReactDOM.render(
  (
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=</span></span><span class="hljs-template-variable">{browserHistory}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      </span><span class="hljs-template-tag">{/* 主页 */}</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{App}</span><span class="xml"><span class="hljs-tag">&gt;</span>
        </span><span class="hljs-template-tag">{/* 默认 */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{HomePage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>

        </span><span class="hljs-template-tag">{/* <span class="hljs-name">baidu</span> */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/baidu"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduPage}</span><span class="xml"><span class="hljs-tag">&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"result"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduResultPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"frequency"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduFrequencyPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>

        </span><span class="hljs-template-tag">{/* 404 */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/404'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{NotFoundPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        
        </span><span class="hljs-template-tag">{/* 其他重定向到 404 */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">'*'</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/404'</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
  ), document.getElementById('app')
);</span></code></pre>
<p>按需加载之后，我们需要让路由动态加载组件，需要将 <code>component</code> 换成 <code>getComponent</code>。首先将路由拆出来（因为路由庞大之后全部写在一起会很难看），创建一个根路由 rootRoute：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rootRoute = {
  path: '/',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('components/layer/HomePage'))
      }, 'HomePage')
    },
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/Main'))
    }, 'Main')
  },
  childRoutes: [
    require('./routes/baidu'),
    require('./routes/404'),
    require('./routes/redirect')
  ]
}

ReactDOM.render(
  (
    <Router
      history={browserHistory}
      routes={rootRoute}
      />
  ), document.getElementById('app')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="jsx">const rootRoute = {
  path: <span class="hljs-string">'/'</span>,
  indexRoute: {
    getComponent(nextState, cb) {
      <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">require</span>)</span> =&gt;</span> {
        cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/layer/HomePage'</span>))
      }, <span class="hljs-string">'HomePage'</span>)
    },
  },
  getComponent(nextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">require</span>)</span> =&gt;</span> {
      cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/Main'</span>))
    }, <span class="hljs-string">'Main'</span>)
  },
  childRoutes: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/baidu'</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/404'</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/redirect'</span>)
  ]
}

ReactDOM.render(
  (
    &lt;Router
      history={browserHistory}
      routes={rootRoute}
      /&gt;
  ), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>)
);</code></pre>
<p>history 不变，在 Router 中添加 routes 属性，将创建的路由传递进去。</p>
<p>这里有四个属性：</p>
<h3 id="articleHeader2">path</h3>
<p>将匹配的路由，也就是以前的 path。</p>
<h3 id="articleHeader3">getComponent</h3>
<p>对应于以前的 component 属性，但是这个方法是异步的，也就是当路由匹配时，才会调用这个方法。</p>
<p>这里面有个 <strong>require.ensure</strong> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(dependencies, callback, chunkName)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>.ensure(dependencies, callback, chunkName)</code></pre>
<p>这是 webpack 提供的方法，这也是按需加载的核心方法。第一个参数是依赖，第二个是回调函数，第三个就是上面提到的 chunkName，用来指定这个 chunk file 的 name。</p>
<p>如果需要返回多个子组件，则使用 <code>getComponents</code> 方法，将多个组件作为一个对象的属性通过 <code>cb</code> 返回出去即可。这个在官方示例也有，但是我们这里并不需要，而且根组件是不能返回多个子组件的，所以使用 <code>getComponent</code>。</p>
<h3 id="articleHeader4">indexRoute</h3>
<p>用来设置主页，对应于以前的 <code>&lt;IndexRoute&gt;</code>。</p>
<p>注意这里的 indexRoute 写法， <strong>这是个对象，在对象里面使用 getComponent</strong>。</p>
<h3 id="articleHeader5">childRoutes</h3>
<p>这里面放置的就是子路由的配置，对应于以前的子路由们。我们将以前的 <code>/baidu</code>、<code>/404</code> 和 <code>*</code> 都拆了出来，接下来将分别为他们创建路由配置。</p>
<h2 id="articleHeader6">路由控制</h2>
<p>上面的<code>childRoutes</code> 里面，我们 require 了三个子路由，在目录下创建 <code>routes</code> 目录，将这三个路由放置进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes/
├── 404
│&nbsp;&nbsp; └── index.js
├── baidu
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── routes
│&nbsp;&nbsp;     ├── frequency
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp;     └── result
│&nbsp;&nbsp;         └── index.js
└── redirect
 &nbsp;&nbsp; └── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>routes/
├── <span class="hljs-number">404</span>
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
├── baidu
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── routes
│&nbsp;&nbsp;     ├── frequency
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     └── result
│&nbsp;&nbsp;         └── index<span class="hljs-selector-class">.js</span>
└── redirect
 &nbsp;&nbsp; └── index.js</code></pre>
<p>和 rootRoute 类似，里面的每个 index.js 都是一个路由对象：</p>
<h3 id="articleHeader7">/404/index.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  path: '404',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/layer/NotFoundPage'))
    }, 'NotFoundPage')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'404'</span>,

  getComponent(nextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], (<span class="hljs-built_in">require</span>) =&gt; {
      cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/layer/NotFoundPage'</span>))
    }, <span class="hljs-string">'NotFoundPage'</span>)
  }
}
</code></pre>
<h3 id="articleHeader8">/baidu/index.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  path: 'baidu',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/result'),
        require('./routes/frequency')
      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/layer/BaiduPage'))
    }, 'BaiduPage')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'baidu'</span>,

  getChildRoutes(partialNextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], (<span class="hljs-built_in">require</span>) =&gt; {
      cb(<span class="hljs-literal">null</span>, [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/result'</span>),
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/frequency'</span>)
      ])
    })
  },

  getComponent(nextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], (<span class="hljs-built_in">require</span>) =&gt; {
      cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/layer/BaiduPage'</span>))
    }, <span class="hljs-string">'BaiduPage'</span>)
  }
}
</code></pre>
<h3 id="articleHeader9">/baidu/routes/frequency/index.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  path: 'frequency',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/layer/BaiduFrequencyPage'))
    }, 'BaiduFrequencyPage')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'frequency'</span>,

  getComponent(nextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], (<span class="hljs-built_in">require</span>) =&gt; {
      cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/layer/BaiduFrequencyPage'</span>))
    }, <span class="hljs-string">'BaiduFrequencyPage'</span>)
  }
}
</code></pre>
<p>举这几个例子应该就差不多了，其他都是一样的，稍微有点特别的是 redirect。</p>
<h2 id="articleHeader10">设置 Redirect</h2>
<p>之前我们在根路由下是这么设置重定向的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Router history={browserHistory}>
      <Route path=&quot;/&quot; component={App}>
        {/* home */}
        <IndexRoute component={HomePage} />

        <Route path=&quot;/baidu&quot; component={BaiduPage}>
          <Route path=&quot;result&quot; component={BaiduResultPage} />
          <Route path=&quot;frequency&quot; component={BaiduFrequencyPage} />
        </Route>

        <Route path='/404' component={NotFoundPage} />
        {/* 如果都不匹配，重定向到 404 */}
        <Redirect from='*' to='/404' />
      </Route>
    </Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=</span></span><span class="hljs-template-variable">{browserHistory}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{App}</span><span class="xml"><span class="hljs-tag">&gt;</span>
        </span><span class="hljs-template-tag">{/* <span class="hljs-name">home</span> */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{HomePage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/baidu"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduPage}</span><span class="xml"><span class="hljs-tag">&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"result"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduResultPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"frequency"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{BaiduFrequencyPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/404'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{NotFoundPage}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
        </span><span class="hljs-template-tag">{/* 如果都不匹配，重定向到 404 */}</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">'*'</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/404'</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span></code></pre>
<p>当改写之后，我们需要把这个重定向的路由单独拆出来，也就是  <code>*</code> 这个路由，我们上面已经为他创建了一个 <code>redirect</code> 目录。这里使用到 onEnter 方法，然后在这个方法里改变路由状态，调到另外的路由，实现 redirect ：</p>
<h3 id="articleHeader11">/redirect/index.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  path: '*',
  onEnter: (_, replaceState) => replaceState(null, &quot;/404&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
  <span class="hljs-attr">onEnter</span>: <span class="hljs-function">(<span class="hljs-params">_, replaceState</span>) =&gt;</span> replaceState(<span class="hljs-literal">null</span>, <span class="hljs-string">"/404"</span>)
}</code></pre>
<h2 id="articleHeader12">The root route must render a single element</h2>
<p>跟着官方示例和上面码出来之后，可能页面并没有渲染出来，而是报 <strong>The root route must render a single element</strong> 这个异常，这是因为 <code>module.exports</code> 和 ES6 里的 <code>export default</code> 有区别。</p>
<p>如果你是使用 es6 的写法，也就是你的组件都是通过 <code>export default</code> 导出的，那么在 <code>getComponent</code> 方法里面需要加入 <code>.default</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getComponent(nextState, cb) {
    require.ensure([], (require) => {
      // 在后面加 .default
      cb(null, require('components/layer/ReportPage')).default
    }, 'ReportPage')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">getComponent(nextState, cb) {
    <span class="hljs-built_in">require</span>.ensure([], (<span class="hljs-built_in">require</span>) =&gt; {
      <span class="hljs-comment">// 在后面加 .default</span>
      cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'components/layer/ReportPage'</span>)).default
    }, <span class="hljs-string">'ReportPage'</span>)
}</code></pre>
<p>如果你是使用 CommonJS 的写法，也就是通过 <code>module.exports</code> 导出的，那就无须加 <code>.default</code> 了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-router 按需加载

## 原文链接
[https://segmentfault.com/a/1190000007141049](https://segmentfault.com/a/1190000007141049)


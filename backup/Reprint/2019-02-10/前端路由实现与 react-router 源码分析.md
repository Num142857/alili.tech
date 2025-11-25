---
title: '前端路由实现与 react-router 源码分析' 
date: 2019-02-10 2:30:42
hidden: true
slug: jlydd57n1am
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文地址：<a href="https://github.com/joeyguo/blog/issues/2" rel="nofollow noreferrer" target="_blank">https://github.com/joeyguo/blog/issues/2</a></p></blockquote>
<p>在单页应用上，前端路由并不陌生。很多前端框架也会有独立开发或推荐配套使用的路由系统。那么，当我们在谈前端路由的时候，还可以谈些什么？本文将简要分析并实现一个的前端路由，并对 react-router 进行分析。</p>
<h2 id="articleHeader0">一个极简前端路由实现</h2>
<p>说一下前端路由实现的简要原理，以 hash 形式（也可以使用 History API 来处理）为例，当 url 的 hash 发生变化时，触发 hashchange 注册的回调，回调中去进行不同的操作，进行不同的内容的展示。直接看代码或许更直观。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function(){};
};
Router.prototype.refresh = function() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Router</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.routes = {};
    <span class="hljs-keyword">this</span>.currentUrl = <span class="hljs-string">''</span>;
}
Router.prototype.route = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, callback</span>) </span>{
    <span class="hljs-keyword">this</span>.routes[path] = callback || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
};
Router.prototype.refresh = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.currentUrl = location.hash.slice(<span class="hljs-number">1</span>) || <span class="hljs-string">'/'</span>;
    <span class="hljs-keyword">this</span>.routes[<span class="hljs-keyword">this</span>.currentUrl]();
};
Router.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-keyword">this</span>.refresh.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, <span class="hljs-keyword">this</span>.refresh.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
}
<span class="hljs-built_in">window</span>.Router = <span class="hljs-keyword">new</span> Router();
<span class="hljs-built_in">window</span>.Router.init();</code></pre>
<p>上面路由系统 Router 对象实现，主要提供三个方法</p>
<ul>
<li><p>init 监听浏览器 url hash 更新事件</p></li>
<li><p>route 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新</p></li>
<li><p>refresh 执行当前url对应的回调函数，更新页面</p></li>
</ul>
<p>Router 调用方式以及呈现效果如下：点击触发 url 的 hash 改变，并对应地更新内容（这里为 body 背景色）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul> 
    <li><a href=&quot;#/&quot;>turn white</a></li> 
    <li><a href=&quot;#/blue&quot;>turn blue</a></li> 
    <li><a href=&quot;#/green&quot;>turn green</a></li> 
</ul> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/"</span>&gt;</span>turn white<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/blue"</span>&gt;</span>turn blue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#/green"</span>&gt;</span>turn green<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span> </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
    content.style.backgroundColor = color;
}
Router.route('/', function() {
    changeBgColor('white');
});
Router.route('/blue', function() {
    changeBgColor('blue');
});
Router.route('/green', function() {
    changeBgColor('green');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>);
<span class="hljs-comment">// change Page anything</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeBgColor</span>(<span class="hljs-params">color</span>) </span>{
    content.style.backgroundColor = color;
}
Router.route(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    changeBgColor(<span class="hljs-string">'white'</span>);
});
Router.route(<span class="hljs-string">'/blue'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    changeBgColor(<span class="hljs-string">'blue'</span>);
});
Router.route(<span class="hljs-string">'/green'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    changeBgColor(<span class="hljs-string">'green'</span>);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770567" src="https://static.alili.tech/img/remote/1460000006770567" alt="20160513_150041" title="20160513_150041" style="cursor: pointer;"></span></p>
<p>以上为一个前端路由的简单实现，<a href="https://github.com/joeyguo/blog/blob/master/lab/2016/router/simple-router.html" rel="nofollow noreferrer" target="_blank">点击查看完整代码</a>，虽然简单，但实际上很多路由系统的根基都立于此，其他路由系统主要是对自身使用的框架机制的进行配套及优化，如与 react 配套的 react-router。</p>
<h2 id="articleHeader1">react-router 分析</h2>
<h3 id="articleHeader2">react-router 与 history 结合形式</h3>
<p>react-router 是基于 history 模块提供的 api 进行开发的，结合的形式本文记为 <strong>包装方式</strong>。所以在开始对其分析之前，先举一个简单的例子来说明如何进行对象的包装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原对象
var historyModule = {
    listener: [],
    listen: function (listener) {
        this.listener.push(listener);
        console.log('historyModule listen..')
    },
    updateLocation: function(){
        this.listener.forEach(function(listener){
            listener('new localtion');
        })
    }
}
// Router 将使用 historyModule 对象，并对其包装
var Router = {
    source: {},
    init: function(source){
        this.source = source;
    },
    // 对 historyModule的listen进行了一层包装
    listen: function(listener) {
        return this.source.listen(function(location){
            console.log('Router listen tirgger.');
            listener(location);
        })
    }
}
// 将 historyModule 注入进 Router 中
Router.init(historyModule);
// Router 注册监听
Router.listen(function(location){
    console.log(location + '-> Router setState.');
})
// historyModule 触发回调
historyModule.updateLocation();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 原对象</span>
<span class="hljs-keyword">var</span> historyModule = {
    <span class="hljs-attr">listener</span>: [],
    <span class="hljs-attr">listen</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">listener</span>) </span>{
        <span class="hljs-keyword">this</span>.listener.push(listener);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'historyModule listen..'</span>)
    },
    <span class="hljs-attr">updateLocation</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.listener.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">listener</span>)</span>{
            listener(<span class="hljs-string">'new localtion'</span>);
        })
    }
}
<span class="hljs-comment">// Router 将使用 historyModule 对象，并对其包装</span>
<span class="hljs-keyword">var</span> Router = {
    <span class="hljs-attr">source</span>: {},
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">source</span>)</span>{
        <span class="hljs-keyword">this</span>.source = source;
    },
    <span class="hljs-comment">// 对 historyModule的listen进行了一层包装</span>
    listen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">listener</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.source.listen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">location</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Router listen tirgger.'</span>);
            listener(location);
        })
    }
}
<span class="hljs-comment">// 将 historyModule 注入进 Router 中</span>
Router.init(historyModule);
<span class="hljs-comment">// Router 注册监听</span>
Router.listen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">location</span>)</span>{
    <span class="hljs-built_in">console</span>.log(location + <span class="hljs-string">'-&gt; Router setState.'</span>);
})
<span class="hljs-comment">// historyModule 触发回调</span>
historyModule.updateLocation();</code></pre>
<p>返回：<br><span class="img-wrap"><img data-src="/img/remote/1460000005160836" src="https://static.alili.tech/img/remote/1460000005160836" alt="22" title="22" style="cursor: pointer;"></span></p>
<p>可看到 historyModule 中含有机制：historyModule.updateLocation() -&gt; listener( )，Router 通过对其进行包装开发，针对 historyModule 的机制对 Router 也起到了作用，即historyModule.updateLocation() 将触发 Router.listen 中的回调函数 。<a href="https://github.com/joeyguo/blog/blob/master/lab/2016/router/package-style.html" rel="nofollow noreferrer" target="_blank">点击查看完整代码</a><br>这种包装形式能够充分利用原对象（historyModule ）的内部机制，减少开发成本，也更好的分离包装函数（Router）的逻辑，减少对原对象的影响。</p>
<h3 id="articleHeader3">react-router 使用方式</h3>
<p>react-router 以 react component 的组件方式提供 API， 包含 Router，Route，Redirect，Link 等等，这样能够充分利用 react component 提供的生命周期特性，同时也让定义路由跟写 react component 达到统一，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render((
  <Router history={browserHistory}>
    <Route path=&quot;/&quot; component={App}>
      <Route path=&quot;about&quot; component={About}/>
      <Route path=&quot;users&quot; component={Users}>
        <Route path=&quot;/user/:userId&quot; component={User}/>
      </Route>
      <Route path=&quot;*&quot; component={NoMatch}/>
    </Route>
  </Router>
), document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render((
  &lt;Router history={browserHistory}&gt;
    &lt;Route path="/" component={App}&gt;
      &lt;Route path="about" component={About}/&gt;
      &lt;Route path="users" component={Users}&gt;
        &lt;Route path="/user/:userId" component={User}/&gt;
      &lt;/Route&gt;
      &lt;Route path="*" component={NoMatch}/&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
), document.body)</code></pre>
<p>就这样，声明了一份含有 path to component 的各个映射的路由表。</p>
<p>react-router 还提供的 Link 组件（如下），作为提供更新 url 的途径，触发 Link 后最终将通过如上面定义的路由表进行匹配，并拿到对应的 component 及 state 进行 render 渲染页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to={`/user/89757`}>'joey'</Link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Link to={<span class="hljs-string">`/user/89757`</span>}&gt;<span class="hljs-string">'joey'</span>&lt;<span class="hljs-regexp">/Link&gt;</span></code></pre>
<p>这里不细讲 react-router 的使用，详情可见：<a href="https://github.com/reactjs/react-router" rel="nofollow noreferrer" target="_blank">https://github.com/reactjs/react-router</a></p>
<h2 id="articleHeader4">从点击 Link 到 render 对应 component ，路由中发生了什么</h2>
<h3 id="articleHeader5">为何能够触发 render  component ？</h3>
<p>主要是因为触发了 react setState 的方法从而能够触发 render component。<br>从顶层组件 Router 出发（下面代码从 react-router/Router 中摘取），可看到 Router 在 react component 生命周期之组件被挂载前 componentWillMount 中使用 this.history.listen 去注册了 url 更新的回调函数。回调函数将在 url 更新时触发，回调中的 setState 起到 render 了新的 component 的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.componentWillMount = function componentWillMount() {
    // .. 省略其他
    var createHistory = this.props.history;
    
    this.history = _useRoutes2['default'](createHistory)({
      routes: _RouteUtils.createRoutes(routes || children),
      parseQueryString: parseQueryString,
      stringifyQuery: stringifyQuery
    });
    
    this._unlisten = this.history.listen(function (error, state) {
        _this.setState(state, _this.props.onUpdate);
    });
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.componentWillMount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillMount</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// .. 省略其他</span>
    <span class="hljs-keyword">var</span> createHistory = <span class="hljs-keyword">this</span>.props.history;
    
    <span class="hljs-keyword">this</span>.history = _useRoutes2[<span class="hljs-string">'default'</span>](createHistory)({
      <span class="hljs-attr">routes</span>: _RouteUtils.createRoutes(routes || children),
      <span class="hljs-attr">parseQueryString</span>: parseQueryString,
      <span class="hljs-attr">stringifyQuery</span>: stringifyQuery
    });
    
    <span class="hljs-keyword">this</span>._unlisten = <span class="hljs-keyword">this</span>.history.listen(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, state</span>) </span>{
        _this.setState(state, _this.props.onUpdate);
    });
  };</code></pre>
<p>上面的 _useRoutes2 对 history 操作便是对其做一层包装，所以调用的 this.history 实际为包装以后的对象，该对象含有 _useRoutes2 中的 listen 方法，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function listen(listener) {
      return history.listen(function (location) {
          // .. 省略其他
          match(location, function (error, redirectLocation, nextState) {
            listener(null, nextState);
          });
      });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listen</span>(<span class="hljs-params">listener</span>) </span>{
      <span class="hljs-keyword">return</span> history.listen(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">location</span>) </span>{
          <span class="hljs-comment">// .. 省略其他</span>
          match(location, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, redirectLocation, nextState</span>) </span>{
            listener(<span class="hljs-literal">null</span>, nextState);
          });
      });
}</code></pre>
<p>可看到，上面代码中，主要分为两部分</p>
<ol>
<li><p>使用了 history 模块的 listen 注册了一个含有 setState 的回调函数（这样就能使用 history 模块中的机制）</p></li>
<li><p>回调中的 match 方法为 react-router 所特有，match 函数根据当前 location 以及前面写的 Route 路由表匹配出对应的路由子集得到新的路由状态值 state，具体实现可见 react-router/matchRoutes ，再根据 state 得到对应的 component ，最终执行了 match 中的回调 listener(null, nextState) ，即执行了 Router 中的监听回调（setState），从而更新了展示。</p></li>
</ol>
<p>以上，为起始注册的监听，及回调的作用。</p>
<h3 id="articleHeader6">如何触发监听的回调函数的执行？</h3>
<p>这里还得从如何更新 url 说起。一般来说，url 更新主要有两种方式：简单的 hash 更新或使用 history api 进行地址更新。在 react-router 中，其提供了 Link 组件，该组件能在 render 中使用，最终会表现为 a 标签，并将 Link 中的各个参数组合放它的 href 属性中。可以从 react-router/ Link 中看到，对该组件的点击事件进行了阻止了浏览器的默认跳转行为，而改用 history 模块的 pushState 方法去触发 url 更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Link.prototype.render = function render() {
    // .. 省略其他
    props.onClick = function (e) {
      return _this.handleClick(e);
    };
    if (history) {
     // .. 省略其他
      props.href = history.createHref(to, query);
    }
    return _react2['default'].createElement('a', props);
};
  
Link.prototype.handleClick = function handleClick(event) {
    // .. 省略其他
    event.preventDefault();
    this.context.history.pushState(this.props.state, this.props.to, this.props.query);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Link.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// .. 省略其他</span>
    props.onClick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
      <span class="hljs-keyword">return</span> _this.handleClick(e);
    };
    <span class="hljs-keyword">if</span> (history) {
     <span class="hljs-comment">// .. 省略其他</span>
      props.href = history.createHref(to, query);
    }
    <span class="hljs-keyword">return</span> _react2[<span class="hljs-string">'default'</span>].createElement(<span class="hljs-string">'a'</span>, props);
};
  
Link.prototype.handleClick = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleClick</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-comment">// .. 省略其他</span>
    event.preventDefault();
    <span class="hljs-keyword">this</span>.context.history.pushState(<span class="hljs-keyword">this</span>.props.state, <span class="hljs-keyword">this</span>.props.to, <span class="hljs-keyword">this</span>.props.query);
};</code></pre>
<p>对 history 模块的 pushState 方法对 url 的更新形式，同样分为两种，分别在 history/createBrowserHistory 及 history/createHashHistory 各自的 finishTransition 中，如 history/createBrowserHistory 中使用的是 window.history.replaceState(historyState, null, path); 而 history/createHashHistory 则使用 window.location.hash = url，调用哪个是根据我们一开始创建 history 的方式。</p>
<p>更新 url 的显示是一部分，另一部分是根据 url 去更新展示，也就是触发前面的监听。这是在前面 finishTransition 更新 url 之后实现的，调用的是 history/createHistory 中的 updateLocation 方法，changeListeners 中为 history/createHistory 中的 listen 中所添加的，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateLocation(newLocation) {
   // 示意代码
    location = newLocation;
    changeListeners.forEach(function (listener) {
      listener(location);
    });
}
function listen(listener) {
     // 示意代码
    changeListeners.push(listener);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateLocation</span>(<span class="hljs-params">newLocation</span>) </span>{
   <span class="hljs-comment">// 示意代码</span>
    location = newLocation;
    changeListeners.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">listener</span>) </span>{
      listener(location);
    });
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listen</span>(<span class="hljs-params">listener</span>) </span>{
     <span class="hljs-comment">// 示意代码</span>
    changeListeners.push(listener);
}</code></pre>
<h2 id="articleHeader7">总结</h2>
<p>可以将以上 react-router 的整个包装闭环总结为</p>
<ol>
<li><p>回调函数：含有能够更新 react UI 的 react setState 方法。</p></li>
<li><p>注册回调：在 Router componentWillMount 中使用 history.listen 注册的回调函数，最终放在 history 模块的 回调函数数组 changeListeners 中。</p></li>
<li><p>触发回调：Link 点击触发 history 中回调函数数组 changeListeners 的执行，从而触发原来 listen 中的 setState 方法，更新了页面</p></li>
</ol>
<p>至于前进与后退的实现，是通过监听 popstate 以及 hashchange 的事件，当前进或后退 url 更新时，触发这两个事件的回调函数，回调的执行方式 Link 大致相同，最终同样更新了 UI ，这里就不再说明。</p>
<p>react-router 主要是利用底层 history 模块的机制，通过结合 react 的架构机制做一层包装，实际自身的内容并不多，但其包装的思想笔者认为很值得学习，有兴趣的建议阅读下源码，相信会有其他收获。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端路由实现与 react-router 源码分析

## 原文链接
[https://segmentfault.com/a/1190000005160459](https://segmentfault.com/a/1190000005160459)


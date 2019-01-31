---
title: 'koa-router 源码浅析' 
date: 2019-02-01 2:30:10
hidden: true
slug: j60tyttzo9d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">代码结构</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007468236?w=1425&amp;h=1772" src="https://static.alili.tech/img/remote/1460000007468236?w=1425&amp;h=1772" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">执行流程</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007468237?w=1212&amp;h=483" src="https://static.alili.tech/img/remote/1460000007468237?w=1212&amp;h=483" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>上面两张图主要将<code>koa-router</code>的整体代码结构和大概的执行流程画了出来，画的不够具体。那下面主要讲<code>koa-router</code>中的几处的关键代码解读一下。</p></blockquote>
<p>读代码首先要找到入口文件，那几乎所有的<code>node</code>模块的入口文件都会在<code>package.json</code>文件中的<code>main</code>属性指明了。<code>koa-router</code>的入口文件就是<code>lib/router.js</code>。</p>
<h2 id="articleHeader2">第三方模块</h2>
<p>首先先讲几个第三方的node模块了解一下，因为后面的代码讲解中会用到，不去看具体实现，只要知道其功能就行：  <br><strong><a href="https://github.com/koajs/compose" rel="nofollow noreferrer" target="_blank">koa-compose:</a></strong>  <br>提供给它一个中间件数组， 返回一个顺序执行所有中间件的执行函数。 <br><strong><a href="https://github.com/jshttp/methods" rel="nofollow noreferrer" target="_blank">methods</a>：</strong>  <br>node中支持的http动词，就是http.METHODS，可以在终端输出看看。  <br><strong><a href="https://github.com/pillarjs/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a>：</strong>  <br>将路径字符串转换成强大的正则表达式，还可以输出路径参数。</p>
<h2 id="articleHeader3">Router &amp; Layer</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007468238?w=295&amp;h=264" src="https://static.alili.tech/img/remote/1460000007468238?w=295&amp;h=264" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>Router</code> 和 <code>Layer</code> 分别是两个构造函数，分别在<code>router.js</code> 和 <code>layer.js</code>中，<code>koa-router</code>的所有代码也就在这两个文件中，可以知道它的代码量并不是很多。  </p>
<p><strong>Router: 创建管理整个路由模块的实例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];

  this.params = {};
  this.stack = [];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Router</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Router)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router(opts);
  }

  <span class="hljs-keyword">this</span>.opts = opts || {};
  <span class="hljs-keyword">this</span>.methods = <span class="hljs-keyword">this</span>.opts.methods || [
    <span class="hljs-string">'HEAD'</span>,
    <span class="hljs-string">'OPTIONS'</span>,
    <span class="hljs-string">'GET'</span>,
    <span class="hljs-string">'PUT'</span>,
    <span class="hljs-string">'PATCH'</span>,
    <span class="hljs-string">'POST'</span>,
    <span class="hljs-string">'DELETE'</span>
  ];

  <span class="hljs-keyword">this</span>.params = {};
  <span class="hljs-keyword">this</span>.stack = [];
};</code></pre>
<p>首先是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!(this instanceof Router)) {
  return new Router(opts);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Router)) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router(opts);
}</code></pre>
<p>这是常用的<code>去new</code>的方式，所以我们可以在引入koa-router时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = require('koa-router')()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)()</code></pre>
<p>而不用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new require('koa-router')() // 这样也是没问题的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)() <span class="hljs-comment">// 这样也是没问题的</span></code></pre>
<p><strong>this.methods:</strong>  <br>在后面要讲的<code>allowedMethods</code>方法中要用到的，目的是响应<code>options</code>请求和请求出错的处理。</p>
<p><strong>this.params:</strong>   <br>全局的路由参数处理的中间件组成的对象。</p>
<p><strong>this.stack:</strong>  <br>其实就是各个路由(Layer)实例组成的数组。每次处理请求时都需要循环这个数组找到匹配的路由。</p>
<p><strong>Layer: 创建各个路由实例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Layer(path, methods, middleware, opts) {
  ...

  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  // 为给后面的allowedMthods处理
  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    if (this.methods[l-1] === 'GET') {
      // 如果是get请求，则支持head请求
      this.methods.unshift('HEAD');
    }
  }, this);

  // 确保路由的每个中间件都是函数
  this.stack.forEach(function(fn) {
    var type = (typeof fn);
    if (type !== 'function') {
      throw new Error(
        methods.toString() + &quot; `&quot; + (this.opts.name || path) +&quot;`: `middleware` &quot;
        + &quot;must be a function, not `&quot; + type + &quot;`&quot;
      );
    }
  }, this);
  this.path = path;
  // 利用path-to-rege模块生产的路径的正则表达式
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);

  ...
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Layer</span>(<span class="hljs-params">path, methods, middleware, opts</span>) </span>{
  ...

  this.stack = <span class="hljs-built_in">Array</span>.isArray(middleware) ? middleware : [middleware];

  <span class="hljs-comment">// 为给后面的allowedMthods处理</span>
  methods.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    <span class="hljs-keyword">var</span> l = <span class="hljs-keyword">this</span>.methods.push(method.toUpperCase());
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.methods[l<span class="hljs-number">-1</span>] === <span class="hljs-string">'GET'</span>) {
      <span class="hljs-comment">// 如果是get请求，则支持head请求</span>
      <span class="hljs-keyword">this</span>.methods.unshift(<span class="hljs-string">'HEAD'</span>);
    }
  }, <span class="hljs-keyword">this</span>);

  <span class="hljs-comment">// 确保路由的每个中间件都是函数</span>
  <span class="hljs-keyword">this</span>.stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> type = (<span class="hljs-keyword">typeof</span> fn);
    <span class="hljs-keyword">if</span> (type !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        methods.toString() + <span class="hljs-string">" `"</span> + (<span class="hljs-keyword">this</span>.opts.name || path) +<span class="hljs-string">"`: `middleware` "</span>
        + <span class="hljs-string">"must be a function, not `"</span> + type + <span class="hljs-string">"`"</span>
      );
    }
  }, <span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.path = path;
  <span class="hljs-comment">// 利用path-to-rege模块生产的路径的正则表达式</span>
  <span class="hljs-keyword">this</span>.regexp = pathToRegExp(path, <span class="hljs-keyword">this</span>.paramNames, <span class="hljs-keyword">this</span>.opts);

  ...
};
</code></pre>
<p>这里的<code>this.stack</code>和<code>Router</code>中的不同，这里的是路由所有的中间件的数组。（一个路由可以有多个中间件）</p>
<h2 id="articleHeader4">router.register()</h2>
<p><strong>作用：注册路由</strong></p>
<p>从上一篇的代码结构图中可以看出，<code>Router</code>的几个实例方法都直接或简介地调用了<code>register</code>方法，可见，它应该是比较核心的函数, 代码不长，我们一行行看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {};
  var router = this;

  // 全部路由
  var stack = this.stack;

  // 说明路由的path是支持数组的
  // 如果是数组的话，需要递归调用register来注册路由
  // 因为一个path对应一个路由
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });

    return this;
  }

  // 创建路由，路由就是Layer的实例
  // mthods 是路由处理的http方法
  // 最后一个参数对象最终是传给Layer模块中的path-to-regexp模块接口调用的
  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || &quot;&quot;,
    ignoreCaptures: opts.ignoreCaptures
  });

  // 处理路径前缀
  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  }

  // 将全局的路由参数添加到每个路由中
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);

  // 往路由数组中添加新创建的路由
  stack.push(route);

  return route;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.register = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, methods, middleware, opts</span>) </span>{
  opts = opts || {};
  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>;

  <span class="hljs-comment">// 全部路由</span>
  <span class="hljs-keyword">var</span> stack = <span class="hljs-keyword">this</span>.stack;

  <span class="hljs-comment">// 说明路由的path是支持数组的</span>
  <span class="hljs-comment">// 如果是数组的话，需要递归调用register来注册路由</span>
  <span class="hljs-comment">// 因为一个path对应一个路由</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(path)) {
    path.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">p</span>) </span>{
      router.register.call(router, p, methods, middleware, opts);
    });

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  <span class="hljs-comment">// 创建路由，路由就是Layer的实例</span>
  <span class="hljs-comment">// mthods 是路由处理的http方法</span>
  <span class="hljs-comment">// 最后一个参数对象最终是传给Layer模块中的path-to-regexp模块接口调用的</span>
  <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">new</span> Layer(path, methods, middleware, {
    <span class="hljs-attr">end</span>: opts.end === <span class="hljs-literal">false</span> ? opts.end : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">name</span>: opts.name,
    <span class="hljs-attr">sensitive</span>: opts.sensitive || <span class="hljs-keyword">this</span>.opts.sensitive || <span class="hljs-literal">false</span>,
    <span class="hljs-attr">strict</span>: opts.strict || <span class="hljs-keyword">this</span>.opts.strict || <span class="hljs-literal">false</span>,
    <span class="hljs-attr">prefix</span>: opts.prefix || <span class="hljs-keyword">this</span>.opts.prefix || <span class="hljs-string">""</span>,
    <span class="hljs-attr">ignoreCaptures</span>: opts.ignoreCaptures
  });

  <span class="hljs-comment">// 处理路径前缀</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.opts.prefix) {
    route.setPrefix(<span class="hljs-keyword">this</span>.opts.prefix);
  }

  <span class="hljs-comment">// 将全局的路由参数添加到每个路由中</span>
  <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.params).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
    route.param(param, <span class="hljs-keyword">this</span>.params[param]);
  }, <span class="hljs-keyword">this</span>);

  <span class="hljs-comment">// 往路由数组中添加新创建的路由</span>
  stack.push(route);

  <span class="hljs-keyword">return</span> route;
};</code></pre>
<h2 id="articleHeader5">router.verb()</h2>
<p><strong>verb =&gt; get|put|post|patch|delete</strong>   <br><strong>作用：注册路由</strong>  </p>
<p>这是<code>koa-router</code>提供的直接注册相应http方法的路由，但最终还是会调用<code>register</code>方法如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/user', function(ctx, next){...})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">router.get(<span class="hljs-string">'/user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, next</span>)</span>{...})</code></pre>
<p>和下面利用<code>register</code>方法等价：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register('/user', ['get'], [function(ctx, next){...}])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">router.register(<span class="hljs-string">'/user'</span>, [<span class="hljs-string">'get'</span>], [<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, next</span>)</span>{...}])</code></pre>
<p>可以看到直接使用<code>router.verb</code>注册路由会方便很多。来看看代码：  <br>你会发现<code>router.js</code>的代码里并没有<code>Router.prototype.get</code>的代码出现，原因是它还依赖了上面提到的<code>methods</code>模块来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里的methods就是上面的methods模块提供的数组
methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    var middleware;

    // 这段代码做了两件事：
    // 1.name 参数是可选的，所以要做一些参数置换的处理
    // 2.将所有路由中间件合并成一个数组
    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }

    // 调用register方法
    this.register(path, [method], middleware, {
      name: name
    });

    return this;
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里的methods就是上面的methods模块提供的数组</span>
methods.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  Router.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, middleware</span>) </span>{
    <span class="hljs-keyword">var</span> middleware;

    <span class="hljs-comment">// 这段代码做了两件事：</span>
    <span class="hljs-comment">// 1.name 参数是可选的，所以要做一些参数置换的处理</span>
    <span class="hljs-comment">// 2.将所有路由中间件合并成一个数组</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> path === <span class="hljs-string">'string'</span> || path <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span>) {
      middleware = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">2</span>);
    } <span class="hljs-keyword">else</span> {
      middleware = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
      path = name;
      name = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// 调用register方法</span>
    <span class="hljs-keyword">this</span>.register(path, [method], middleware, {
      <span class="hljs-attr">name</span>: name
    });

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
});</code></pre>
<h2 id="articleHeader6">router.routes()</h2>
<p><strong>作用：启动路由</strong>  </p>
<p>这是在koa中配置路由的重要一步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = require('koa-router')();
...
app.use(router.routes())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)();
...
app.use(router.routes())</code></pre>
<p>就这样，<code>koa-router</code>就启动了，所以我们也一定会很好奇这个<code>routes</code>函数到底做了什么,但可以肯定<code>router.routes()</code>返回了一个中间件函数。<br>函数体长了一点，简化一下看下整体轮廓：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this;
  var dispatch = function dispatch(ctx, next) {
    ...
  }
  dispatch.router = this;
  return dispatch;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.routes = Router.prototype.middleware = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">var</span> dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">ctx, next</span>) </span>{
    ...
  }
  dispatch.router = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">return</span> dispatch;
};
</code></pre>
<p>这里形成了一个闭包，在<code>routes</code>函数内部返回了一个<code>dispatch</code>函数作为中间件。  <br>接下来看下<code>dispatch</code>函数的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path;

    // router.match函数内部遍历所有路由（this.stach）,
    // 根据路径和请求方法找到对应的路由
    // 返回的matched对象为： 
    /* 
      var matched = {
        path: [], // 保存了path匹配的路由数组
        pathAndMethod: [], // 保存了path和methods都匹配的路由数组
        route: false // 是否有对应的路由
      };
    */
    var matched = router.match(path, ctx.method);
    var layerChain, layer, i;
    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    // 如果没有对应的路由，则直接进入下一个中间件
    if (!matched.route) return next();

    // 找到正确的路由的path
    var mostSpecificPath = matched.pathAndMethod[matched.pathAndMethod.length - 1].path;
    ctx._matchedRoute = mostSpecificPath;

    // 使用reduce方法将路由的所有中间件形成一条链
    layerChain = matched.pathAndMethod.reduce(function(memo, layer) {

      // 在每个路由的中间件执行之前，根据参数不同，设置 ctx.captures 和 ctx.params
      // 这就是为什么我们可以直接在中间件函数中直接使用 ctx.params 来读取路由参数信息了
      memo.push(function(ctx, next) {

        // 返回路由的参数的key 
        ctx.captures = layer.captures(path, ctx.captures);

        // 返回参数的key和对应的value组成的对象
        ctx.params = layer.params(path, ctx.captures, ctx.params);

        // 执行下一个中间件
        return next();
      });

      // 将上面另外加的中间件和已有的路由中间件合并到一起
      // 所以最终 layerChain 将会是一个中间件的数组
      return memo.concat(layer.stack);
    }, []);

    // 最后调用上面提到的 compose 模块提供的方法，返回将 layerChain (中间件的数组) 
    // 顺序执行所有中间件的执行函数， 并立即执行。
    return compose(layerChain)(ctx, next);
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">var</span> path = router.opts.routerPath || ctx.routerPath || ctx.path;

    <span class="hljs-comment">// router.match函数内部遍历所有路由（this.stach）,</span>
    <span class="hljs-comment">// 根据路径和请求方法找到对应的路由</span>
    <span class="hljs-comment">// 返回的matched对象为： </span>
    <span class="hljs-comment">/* 
      var matched = {
        path: [], // 保存了path匹配的路由数组
        pathAndMethod: [], // 保存了path和methods都匹配的路由数组
        route: false // 是否有对应的路由
      };
    */</span>
    <span class="hljs-keyword">var</span> matched = router.match(path, ctx.method);
    <span class="hljs-keyword">var</span> layerChain, layer, i;
    <span class="hljs-keyword">if</span> (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } <span class="hljs-keyword">else</span> {
      ctx.matched = matched.path;
    }

    <span class="hljs-comment">// 如果没有对应的路由，则直接进入下一个中间件</span>
    <span class="hljs-keyword">if</span> (!matched.route) <span class="hljs-keyword">return</span> next();

    <span class="hljs-comment">// 找到正确的路由的path</span>
    <span class="hljs-keyword">var</span> mostSpecificPath = matched.pathAndMethod[matched.pathAndMethod.length - <span class="hljs-number">1</span>].path;
    ctx._matchedRoute = mostSpecificPath;

    <span class="hljs-comment">// 使用reduce方法将路由的所有中间件形成一条链</span>
    layerChain = matched.pathAndMethod.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">memo, layer</span>) </span>{

      <span class="hljs-comment">// 在每个路由的中间件执行之前，根据参数不同，设置 ctx.captures 和 ctx.params</span>
      <span class="hljs-comment">// 这就是为什么我们可以直接在中间件函数中直接使用 ctx.params 来读取路由参数信息了</span>
      memo.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, next</span>) </span>{

        <span class="hljs-comment">// 返回路由的参数的key </span>
        ctx.captures = layer.captures(path, ctx.captures);

        <span class="hljs-comment">// 返回参数的key和对应的value组成的对象</span>
        ctx.params = layer.params(path, ctx.captures, ctx.params);

        <span class="hljs-comment">// 执行下一个中间件</span>
        <span class="hljs-keyword">return</span> next();
      });

      <span class="hljs-comment">// 将上面另外加的中间件和已有的路由中间件合并到一起</span>
      <span class="hljs-comment">// 所以最终 layerChain 将会是一个中间件的数组</span>
      <span class="hljs-keyword">return</span> memo.concat(layer.stack);
    }, []);

    <span class="hljs-comment">// 最后调用上面提到的 compose 模块提供的方法，返回将 layerChain (中间件的数组) </span>
    <span class="hljs-comment">// 顺序执行所有中间件的执行函数， 并立即执行。</span>
    <span class="hljs-keyword">return</span> compose(layerChain)(ctx, next);
  };</code></pre>
<h2 id="articleHeader7">router.allowMethods()</h2>
<p><strong>作用： 当请求出错时的处理逻辑</strong>  </p>
<p>同样也是koa中配置路由的中一步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = require('koa-router')();
...
app.use(router.routes())
app.use(router.allowMethods())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)();
...
app.use(router.routes())
app.use(router.allowMethods())</code></pre>
<p>可以看出，该方法也是闭包内返回了中间件函数。我们将代码简化一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.allowedMethods = function (options) {
  options = options || {};
  var implemented = this.methods;
  return function allowedMethods(ctx, next) {
    return next().then(function() {
      var allowed = {};

      if (!ctx.status || ctx.status === 404) {
        ...

        if (!~implemented.indexOf(ctx.method)) {
          if (options.throw) {
            ...
          } else {
            ctx.status = 501;
            ctx.set('Allow', allowedArr);
          }
        } else if (allowedArr.length) {
          if (ctx.method === 'OPTIONS') {
            ctx.status = 204;
            ctx.set('Allow', allowedArr);
          } else if (!allowed[ctx.method]) {
            if (options.throw) {
              ...
            } else {
              ctx.status = 405;
              ctx.set('Allow', allowedArr);
            }
          }
        }
      }
    });
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.allowedMethods = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {};
  <span class="hljs-keyword">var</span> implemented = <span class="hljs-keyword">this</span>.methods;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">allowedMethods</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> next().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> allowed = {};

      <span class="hljs-keyword">if</span> (!ctx.status || ctx.status === <span class="hljs-number">404</span>) {
        ...

        if (!~implemented.indexOf(ctx.method)) {
          <span class="hljs-keyword">if</span> (options.throw) {
            ...
          } <span class="hljs-keyword">else</span> {
            ctx.status = <span class="hljs-number">501</span>;
            ctx.set(<span class="hljs-string">'Allow'</span>, allowedArr);
          }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (allowedArr.length) {
          <span class="hljs-keyword">if</span> (ctx.method === <span class="hljs-string">'OPTIONS'</span>) {
            ctx.status = <span class="hljs-number">204</span>;
            ctx.set(<span class="hljs-string">'Allow'</span>, allowedArr);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!allowed[ctx.method]) {
            <span class="hljs-keyword">if</span> (options.throw) {
              ...
            } <span class="hljs-keyword">else</span> {
              ctx.status = <span class="hljs-number">405</span>;
              ctx.set(<span class="hljs-string">'Allow'</span>, allowedArr);
            }
          }
        }
      }
    });
  };
};</code></pre>
<p>眼尖的同学可能会看到一些<code>http code</code> ： <code>404</code>, <code>501</code>, <code>204</code>, <code>405</code>    <br>那这个函数其实就是当所有中间件函数执行完了，并且请求出错了进行相应的处理：</p>
<ol>
<li><p>如果请求的方法koa-router不支持并且没有设置<code>throw</code>选项，则返回 <code>501(未实现)</code></p></li>
<li><p>如果是<code>options</code>请求，则返回 <code>204(无内容)</code></p></li>
<li><p>如果请求的方法支持但没有设置<code>throw</code>选项，则返回 <code>405(不允许此方法 )</code></p></li>
</ol>
<h2 id="articleHeader8">总结</h2>
<p>粗略浅析了这么些，能大概知道了koa-router的工作原理。笔者能力有限，有错误还请指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa-router 源码浅析

## 原文链接
[https://segmentfault.com/a/1190000007468233](https://segmentfault.com/a/1190000007468233)


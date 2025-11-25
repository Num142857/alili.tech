---
title: 'Koa2源码阅读笔记' 
date: 2019-01-11 2:30:08
hidden: true
slug: fufjyalfifv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<p>最近空闲时间读了一下<a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">Koa2</a>的源码；在阅读Koa2(version 2.2.0)的源码的过程中，我的感受是代码简洁、思路清晰（不得不佩服大神的水平）。<br>下面是我读完之后的一些感受。</p>
<h2 id="articleHeader1">Koa的设计理念</h2>
<blockquote><p>Koa 是一个轻量级的、极富表现力的 http 框架。<br>一个web request会通过 Koa 的中间件栈，来动态完成 response 的处理。<br>Koa2 采用了 async 和 await 的语法来增强中间件的表现力。<br>Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库。</p></blockquote>
<h2 id="articleHeader2">Koa基本组成</h2>
<p>Koa源码非常精简，只有四个文件：</p>
<ul>
<li>application.js：框架入口；负责管理中间件，以及处理请求</li>
<li>context.js：context对象的原型，代理request与response对象上的方法和属性</li>
<li>request.js：request对象的原型，提供请求相关的方法和属性</li>
<li>response.js：response对象的原型，提供响应相关的方法和属性</li>
</ul>
<h3 id="articleHeader3">application.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application.js

module.exports = class Application extends Emitter {
  constructor() {
    super();

    this.proxy = false; // 是否信任 proxy header 参数，默认为 false
    
    this.middleware = []; //保存通过app.use(middleware)注册的中间件
    
    this.subdomainOffset = 2; // 子域默认偏移量，默认为 2
    
    this.env = process.env.NODE_ENV || 'development'; // 环境参数，默认为 NODE_ENV 或 ‘development’
    
    this.context = Object.create(context); //context模块，通过context.js创建
    
    this.request = Object.create(request); //request模块，通过request.js创建
    
    this.response = Object.create(response); //response模块，通过response.js创建
  }

  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// application.js</span>

module.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Emitter</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();

    <span class="hljs-keyword">this</span>.proxy = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 是否信任 proxy header 参数，默认为 false</span>
    
    <span class="hljs-keyword">this</span>.middleware = []; <span class="hljs-comment">//保存通过app.use(middleware)注册的中间件</span>
    
    <span class="hljs-keyword">this</span>.subdomainOffset = <span class="hljs-number">2</span>; <span class="hljs-comment">// 子域默认偏移量，默认为 2</span>
    
    <span class="hljs-keyword">this</span>.env = process.env.<span class="hljs-type">NODE_ENV</span> || <span class="hljs-symbol">'developmen</span>t'; <span class="hljs-comment">// 环境参数，默认为 NODE_ENV 或 ‘development’</span>
    
    <span class="hljs-keyword">this</span>.context = <span class="hljs-type">Object</span>.create(context); <span class="hljs-comment">//context模块，通过context.js创建</span>
    
    <span class="hljs-keyword">this</span>.request = <span class="hljs-type">Object</span>.create(request); <span class="hljs-comment">//request模块，通过request.js创建</span>
    
    <span class="hljs-keyword">this</span>.response = <span class="hljs-type">Object</span>.create(response); <span class="hljs-comment">//response模块，通过response.js创建</span>
  }

  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>application.js 是 koa 的入口主要文件，暴露应用的 class, 这个 class 继承自 EventEmitter ，这里可以看出跟 koa1.x 的不同，koa1.x 是用的是构造函数的方式，koa2 大量使用 es6 的语法。调用的时候就跟 koa1.x 有区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var koa = require('koa');
// koa 1.x
var app = koa();
// koa 2.x
// 使用class必须使用new来调用
var app = new koa();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> koa = require(<span class="hljs-string">'koa'</span>);
<span class="hljs-comment">// koa 1.x</span>
<span class="hljs-keyword">var</span> app = koa();
<span class="hljs-comment">// koa 2.x</span>
<span class="hljs-comment">// 使用class必须使用new来调用</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">koa</span>();</code></pre>
<p>application.js除了上面的的构造函数外，还暴露了一些公用的api，比如两个常见的，一个是<code>listen</code>，一个是<code>use</code>。</p>
<h4>use函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application.js

use(fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  if (isGeneratorFunction(fn)) {
    deprecate('Support for generators will be removed in v3. ' +
              'See the documentation for examples of how to convert old middleware ' +
              'https://github.com/koajs/koa/blob/master/docs/migration.md');
    fn = convert(fn);
  }
  debug('use %s', fn._name || fn.name || '-');
  this.middleware.push(fn);
  return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code><span class="hljs-comment">// application.js</span>

<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">fn</span>) {
  <span class="hljs-title">if</span> </span>(<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> !== '<span class="hljs-title">function</span>') <span class="hljs-title">throw</span> <span class="hljs-title">new</span> <span class="hljs-title">TypeError</span></span>(<span class="hljs-symbol">'middleware</span> must <span class="hljs-keyword">be</span> a function!');
  <span class="hljs-keyword">if</span> (isGeneratorFunction(<span class="hljs-function"><span class="hljs-keyword">fn</span>)) {
    <span class="hljs-title">deprecate</span></span>(<span class="hljs-symbol">'Support</span> <span class="hljs-keyword">for</span> generators will <span class="hljs-keyword">be</span> removed <span class="hljs-keyword">in</span> v3. ' +
              <span class="hljs-symbol">'See</span> the documentation <span class="hljs-keyword">for</span> examples of how to convert old middleware ' +
              <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//github.com/koajs/koa/blob/master/docs/migration.md');</span>
    <span class="hljs-function"><span class="hljs-keyword">fn</span> = <span class="hljs-title">convert</span></span>(<span class="hljs-function"><span class="hljs-keyword">fn</span>);
  }
  <span class="hljs-title">debug</span></span>(<span class="hljs-symbol">'use</span> %s', <span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-title">_name</span> || <span class="hljs-title">fn</span>.<span class="hljs-title">name</span> || '-');
  <span class="hljs-title">this</span>.<span class="hljs-title">middleware</span>.<span class="hljs-title">push</span></span>(<span class="hljs-function"><span class="hljs-keyword">fn</span>);
  <span class="hljs-title">return</span> <span class="hljs-title">this</span>;
}</span></code></pre>
<p><code>use</code>函数做的事很简单：注册一个中间件<code>fn</code>，其实就是将<code>fn</code>放入<code>middleware</code>数组。</p>
<h4>listen函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application.js

listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// application.js</span>

<span class="hljs-built_in">listen</span>(...args) {
  debug(<span class="hljs-string">'listen'</span>);
  <span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-keyword">this</span>.callback());
  <span class="hljs-built_in">return</span> server.<span class="hljs-built_in">listen</span>(...args);
}</code></pre>
<p><code>listen</code>方法首先会通过<code>this.callback</code>方法来返回一个函数作为<code>http.createServer</code>的回调函数，然后进行监听。我们已经知道，<code>http.createServer</code>的回调函数接收两个参数：<code>req</code>和<code>res</code>，下面来看<code>this.callback</code>的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application.js

callback() {
  const fn = compose(this.middleware);
    
  if (!this.listeners('error').length) this.on('error', this.onerror);
    
  const handleRequest = (req, res) => {
    res.statusCode = 404;
    const ctx = this.createContext(req, res);
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fn(ctx).then(handleResponse).catch(onerror);
  };
    
  return handleRequest;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// application.js</span>

callback() {
  <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middleware);
    
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.listeners(<span class="hljs-string">'error'</span>).length) <span class="hljs-keyword">this</span>.on(<span class="hljs-string">'error'</span>, <span class="hljs-keyword">this</span>.onerror);
    
  <span class="hljs-keyword">const</span> handleRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    res.statusCode = <span class="hljs-number">404</span>;
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res);
    <span class="hljs-keyword">const</span> onerror = <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> ctx.onerror(err);
    <span class="hljs-keyword">const</span> handleResponse = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> respond(ctx);
    onFinished(res, onerror);
    <span class="hljs-keyword">return</span> fn(ctx).then(handleResponse).catch(onerror);
  };
    
  <span class="hljs-keyword">return</span> handleRequest;
}</code></pre>
<p>首先，<code>callback</code>方法把所有<code>middleware</code>进行了组合，使用了<code>koa-compose</code>，我们来看一下<code>koa-compose</code>的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// koa-compose

function compose (middleware) {
// 传入的middleware必须是一个数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
// 传入的middleware的每一个元素都必须是函数
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      //下面两行代码是处理最后一个中间件还有next的情况的，其实就是直接resolve出来
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve() 
      try {
        // 这里就是传入next执行中间件代码了
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// koa-compose</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{
<span class="hljs-comment">// 传入的middleware必须是一个数组</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(middleware)) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Middleware stack must be an array!'</span>)
<span class="hljs-comment">// 传入的middleware的每一个元素都必须是函数</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> fn <span class="hljs-keyword">of</span> middleware) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Middleware must be composed of functions!'</span>)
  }

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'next() called multiple times'</span>))
      index = i
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-comment">//下面两行代码是处理最后一个中间件还有next的情况的，其实就是直接resolve出来</span>
      <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve() 
      <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">// 这里就是传入next执行中间件代码了</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
      }
    }
  }
}
</code></pre>
<p>可以看到<code>koa-compose</code>基本就是个<code>dispatch</code>函数的递归调用。其中最重要的就是下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Promise.resolve(fn(context, function next () {
  return dispatch(i + 1)
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">return</span> Promise.resolve(fn(context, <span class="hljs-keyword">function</span> <span class="hljs-title">next</span> () {
  <span class="hljs-keyword">return</span> <span class="hljs-type">dispatch(i</span> + <span class="hljs-number">1</span>)
}))</code></pre>
<p>这段代码等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn(context, function next () {
 return dispatch(i + 1)
})
return Promise.resolve()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>fn(context, <span class="hljs-keyword">function</span> <span class="hljs-title">next</span> () {
 <span class="hljs-keyword">return</span> <span class="hljs-type">dispatch(i</span> + <span class="hljs-number">1</span>)
})
<span class="hljs-keyword">return</span> Promise.resolve()</code></pre>
<p>这里<code>middlewareFunction</code>的第二个参数(也就是next)是动态传递进去的信使，它会调取<code>dispatch(index)</code>执行下一个的<code>middleware</code>。最后会返回一个<code>Resolved</code>（已完成）状态的Promise对象。这个对象的作用我们稍后再说。</p>
<p>我们先暂时回到<code>callback</code>方法里面，前面说了它先对<code>middleware</code>进行了组合，生成了一个函数<code>fn</code>。<br>然后，<code>callback</code>方法返回<code>http.createServer</code>所需要的回调函数<code>handleRequest</code>。</p>
<p><code>handleRequest</code>函数，先把http code默认设置为404，接着利用<code>createContext</code>函数把node返回的req和res进行了封装创建出<code>context</code>，<br>然后通过<code>onFinished(res, onerror)</code>监听<code>http response</code>，当请求结束时执行回调。这里传入的回调是<code>context.onerror(err)</code>，即当错误发生时才执行。<br>最后返回 <code>fn(ctx).then(handleResponse).catch(onerror)</code>的执行结果，这里的<code>fn</code>函数就是就是组合所有<code>middleware</code>后生成的函数，调用它执行所有<code>middleware</code>后会返回前面提到的<code>Resolved</code>（已完成）状态的Promise对象，之后执行响应处理函数<code>respond(ctx)</code>（<code>respond</code>函数里面也主要是一些收尾工作，例如判断http code为空如何输出啦，http method是head如何输出啦，body返回是流或json时如何输出；代码就不贴了，感兴趣的小伙伴自己可以去看一下），当抛出异常时同样使用 <code>context.onerror(err)</code>处理。</p>
<p>我们可以看看<code>createContext</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application.js

createContext(req, res) {
  const context = Object.create(this.context);
  const request = context.request = Object.create(this.request);
  const response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.originalUrl = request.originalUrl = req.url;
  context.cookies = new Cookies(req, res, {
    keys: this.keys,
    secure: request.secure
  });
  request.ip = request.ips[0] || req.socket.remoteAddress || '';
  context.accept = request.accept = accepts(req);
  context.state = {};
  return context;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-comment">// application.js</span>

createContext(req, res) {
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">context</span> = Object<span class="hljs-variable">.create</span>(<span class="hljs-keyword">this</span><span class="hljs-variable">.context</span>);
  <span class="hljs-keyword">const</span> request = <span class="hljs-keyword">context</span><span class="hljs-variable">.request</span> = Object<span class="hljs-variable">.create</span>(<span class="hljs-keyword">this</span><span class="hljs-variable">.request</span>);
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">context</span><span class="hljs-variable">.response</span> = Object<span class="hljs-variable">.create</span>(<span class="hljs-keyword">this</span><span class="hljs-variable">.response</span>);
  <span class="hljs-keyword">context</span><span class="hljs-variable">.app</span> = request<span class="hljs-variable">.app</span> = response<span class="hljs-variable">.app</span> = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">context</span><span class="hljs-variable">.req</span> = request<span class="hljs-variable">.req</span> = response<span class="hljs-variable">.req</span> = req;
  <span class="hljs-keyword">context</span><span class="hljs-variable">.res</span> = request<span class="hljs-variable">.res</span> = response<span class="hljs-variable">.res</span> = res;
  request<span class="hljs-variable">.ctx</span> = response<span class="hljs-variable">.ctx</span> = <span class="hljs-keyword">context</span>;
  request<span class="hljs-variable">.response</span> = response;
  response<span class="hljs-variable">.request</span> = request;
  <span class="hljs-keyword">context</span><span class="hljs-variable">.originalUrl</span> = request<span class="hljs-variable">.originalUrl</span> = req<span class="hljs-variable">.url</span>;
  <span class="hljs-keyword">context</span><span class="hljs-variable">.cookies</span> = <span class="hljs-keyword">new</span> Cookies(req, res, {
    keys: <span class="hljs-keyword">this</span><span class="hljs-variable">.keys</span>,
    secure: request<span class="hljs-variable">.secure</span>
  });
  request<span class="hljs-variable">.ip</span> = request<span class="hljs-variable">.ips</span>[<span class="hljs-number">0</span>] || req<span class="hljs-variable">.socket</span><span class="hljs-variable">.remoteAddress</span> || '';
  <span class="hljs-keyword">context</span><span class="hljs-variable">.accept</span> = request<span class="hljs-variable">.accept</span> = accepts(req);
  <span class="hljs-keyword">context</span><span class="hljs-variable">.state</span> = {};
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">context</span>;
}</code></pre>
<p><code>createContext</code>创建<code>context</code>的时候，还会同时创建request和response，通过下图可以比较直观地看到所有这些对象之间的关系。<br><span class="img-wrap"><img data-src="/img/bVPAMf?w=833&amp;h=562" src="https://static.alili.tech/img/bVPAMf?w=833&amp;h=562" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>图中：</p>
<ul>
<li>最左边一列表示每个文件的导出对象</li>
<li>中间一列表示每个Koa应用及其维护的属性</li>
<li>右边两列表示对应每个请求所维护的一些列对象</li>
<li>黑色的线表示实例化</li>
<li>红色的线表示原型链</li>
<li>蓝色的线表示属性</li>
</ul>
<p>通过上面的分析，我们已经可以大概得知Koa处理请求的过程：当请求到来的时候，会通过 req 和 res 来创建一个 context (ctx) ，然后执行中间件。</p>
<h3 id="articleHeader4">content.js</h3>
<p>content.js 主要的功能提供了对<code>request</code>和<code>response</code>对象的方法与属性便捷访问能力。<br>其中使用了<a href="https://github.com/tj/node-delegates" rel="nofollow noreferrer" target="_blank">node-delegates</a>（有兴趣的可以看一下<a href="https://github.com/tj/node-delegates/blob/master/index.js" rel="nofollow noreferrer" target="_blank">源码</a>），将<code>context.request</code>与<code>context.response</code>上的方法与属性代理到<code>context</code>上。<br>在源码中，我们可以看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// context.js

delegate(proto, 'response')
  .method('attachment')
  // ...
  .access('status')
  // ...
  .getter('writable');

delegate(proto, 'request')
  .method('acceptsLanguages')
  // ...
  .access('querystring')
  // ...
  .getter('ip');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// context.js</span>

<span class="hljs-selector-tag">delegate</span>(proto, <span class="hljs-string">'response'</span>)
  <span class="hljs-selector-class">.method</span>(<span class="hljs-string">'attachment'</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-selector-class">.access</span>(<span class="hljs-string">'status'</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-selector-class">.getter</span>(<span class="hljs-string">'writable'</span>);

<span class="hljs-selector-tag">delegate</span>(proto, <span class="hljs-string">'request'</span>)
  <span class="hljs-selector-class">.method</span>(<span class="hljs-string">'acceptsLanguages'</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-selector-class">.access</span>(<span class="hljs-string">'querystring'</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-selector-class">.getter</span>(<span class="hljs-string">'ip'</span>);</code></pre>
<h3 id="articleHeader5">request.js</h3>
<p>request.js 封装了请求相关的属性以及方法。通过 application.js 中的<code>createContext</code>方法，代理对应的 request 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = context.request = Object.create(this.request);
// ...
context.req = request.req = response.req = req;
// ...
request.response = response;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>const <span class="hljs-attr">request</span> = context.<span class="hljs-attr">request</span> = Object.create(this.request);
// ...
context.<span class="hljs-attr">req</span> = request.<span class="hljs-attr">req</span> = response.<span class="hljs-attr">req</span> = req;
// ...
request.<span class="hljs-attr">response</span> = response;</code></pre>
<p><code>request.req</code>为原生的请求对象，在 request.js 中属性的获取都是通过 <code>ths.req</code>来获取的（即 <code>request.req</code>）。</p>
<h3 id="articleHeader6">response.js</h3>
<p>response.js 封装了响应相关的属性以及方法。与 request 相同，通过<code>createContext</code>方法代理对应的 response 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const response = context.response = Object.create(this.response);
// ...
context.res = request.res = response.res = res;
// ...
response.request = request;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>const <span class="hljs-attr">response</span> = context.<span class="hljs-attr">response</span> = Object.create(this.response);
// ...
context.<span class="hljs-attr">res</span> = request.<span class="hljs-attr">res</span> = response.<span class="hljs-attr">res</span> = res;
// ...
response.<span class="hljs-attr">request</span> = request;</code></pre>
<h2 id="articleHeader7">结语</h2>
<p>关于Koa2的源码就先分析到这，希望对大家有所帮助。<br>如有不同的看法，欢迎交流！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Koa2源码阅读笔记

## 原文链接
[https://segmentfault.com/a/1190000009875733](https://segmentfault.com/a/1190000009875733)


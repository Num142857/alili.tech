---
title: '一步步去阅读koa源码，整体架构分析' 
date: 2018-11-30 2:30:11
hidden: true
slug: rwotjbpp45
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读好的框架的源码有很多好处，从大神的视角去理解整个框架的设计思想。大到架构设计，小到可取的命名风格，还有设计模式、实现某类功能使用到的数据结构和算法等等。</blockquote>
<h3 id="articleHeader0">使用koa</h3>
<p>其实某个框架阅读源码的时候，首先我们要会去用这个框架，因为用了我们才知道，某个API是怎么用，哪里有坑，哪里设计的精妙。</p>
<p>下面我们就简单用一下<code>koa</code>这个框架，如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = 'Hello World'
})
app.listen(4002)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
<span class="hljs-keyword">const</span> Koa = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
app.<span class="hljs-keyword">use</span>(async (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">'Hello World'</span>
})
app.listen(<span class="hljs-number">4002</span>)
</code></pre>
<p>运行结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014894689?w=1188&amp;h=452" src="https://static.alili.tech/img/remote/1460000014894689?w=1188&amp;h=452" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>瓦特？？这个服务会涉及到从请求到响应返回数据，就这几行代码？？ 是的，你没有看错，就是单单这几行代码就可以搭建了一个服务器。</p>
<p>下面我们看看一探究竟。</p>
<h3 id="articleHeader1">阅读源码</h3>
<p>去到<code>node_modules</code>文件夹下找到<code>koa</code>模块，先喵几眼<code>README.md</code>文件，里面介绍了<code>koa</code>的一些安装、用法、插件等等，这里我们跳过，然后转到<code>package.json</code>如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014894690?w=1590&amp;h=736" src="https://static.alili.tech/img/remote/1460000014894690?w=1590&amp;h=736" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看到<code>package.json</code>里面的<code>"main": "lib/application.js"</code>没错，这就是我们的入口，在lib文件夹下面，我们看到里面有<code>application.js</code>、<code>context.js</code>、<code>requrest.js</code>和<code>response.js</code>。下面经过我修改简化去掉注释<code>application.js</code>就只有68行代码。阅读起来可以说是非常简单了。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014894691?w=1296&amp;h=750" src="https://static.alili.tech/img/remote/1460000014894691?w=1296&amp;h=750" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>第一步是我们引入各种主要依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入有很多 我只挑我阅读主要框架的代码模块

const response = require('./response'); // 处理response对象
const compose = require('koa-compose'); // 合并处理中间件函数
const context = require('./context'); // 整合处理context对象
const request = require('./request'); // 整合处理request对象
const http = require('http'); // node的 http原生模块
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入有很多 我只挑我阅读主要框架的代码模块</span>

<span class="hljs-keyword">const</span> response = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./response'</span>); <span class="hljs-comment">// 处理response对象</span>
<span class="hljs-keyword">const</span> compose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-compose'</span>); <span class="hljs-comment">// 合并处理中间件函数</span>
<span class="hljs-keyword">const</span> context = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./context'</span>); <span class="hljs-comment">// 整合处理context对象</span>
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./request'</span>); <span class="hljs-comment">// 整合处理request对象</span>
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>); <span class="hljs-comment">// node的 http原生模块</span>
</code></pre>
<p>以上就是我们的主要依赖</p>
<p>在<code>Application</code>的对象中，有<code>constructor</code>函数，这个主要是<code>初始化Application对象，生成context对象、request对象、response对象</code>，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = class Application extends Emitter {
  // 初始化 Application
  constructor() {
    super(); // 继承Emitter
    this.middleware = []; // 初始化middleware为空数组
    this.context = Object.create(context); // 生成context对象
    this.request = Object.create(request); // 生成request对象
    this.response = Object.create(response); // 生成response对象
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>module.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Emitter</span> </span>{
  <span class="hljs-comment">// 初始化 Application</span>
  constructor() {
    <span class="hljs-keyword">super</span>(); <span class="hljs-comment">// 继承Emitter</span>
    <span class="hljs-keyword">this</span>.middleware = []; <span class="hljs-comment">// 初始化middleware为空数组</span>
    <span class="hljs-keyword">this</span>.context = <span class="hljs-type">Object</span>.create(context); <span class="hljs-comment">// 生成context对象</span>
    <span class="hljs-keyword">this</span>.request = <span class="hljs-type">Object</span>.create(request); <span class="hljs-comment">// 生成request对象</span>
    <span class="hljs-keyword">this</span>.response = <span class="hljs-type">Object</span>.create(response); <span class="hljs-comment">// 生成response对象</span>
  }
}</code></pre>
<p>阅读源码，我们先不要去扣细节，比如说<code>Object.create(context)</code>生产的对象是什么？<code>this.request</code>对象下面又有什么东西？？？，我们现在主要知道的是、<code>this.context</code>是能获取或者设置请求和响应的信息的一个对象，。<code>this.request</code>是请求的对象、里面可以设置或者获取请求信息的一个对象、<code>this.response</code>是响应请求对象、里面可以设置或者获取响应参数和值的一个对象。大概先了解就可以了。继续往下看。</p>
<p>在上面运用的时候，用到了<code>app.use(fn)</code>和<code>app.listen(4002)</code> 我们看看，源码里面试这样子的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = class Application extends Emitter {
  // 初始化 Application
  constructor() {
    ...
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
module.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Emitter</span> </span>{
  <span class="hljs-comment">// 初始化 Application</span>
  constructor() {
    ...
  }
  listen(...args) {
    const server = http.createServer(<span class="hljs-keyword">this</span>.callback());
    <span class="hljs-keyword">return</span> server.listen(...args);
  }
  use(fn) {
    <span class="hljs-keyword">this</span>.middleware.push(fn);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
</code></pre>
<p>上面的代码很简单 <code>use</code>函数就是把传入的<code>fn</code> 推入到<code>this.middleware</code>的数组中，然后返回<code>this</code>，方便链式调用。</p>
<p>然后在<code>listen</code>里面用<code>node</code>原生的<code>http</code>模块创建一个<code>server</code>，在这里顺便说一下，原生 http创建一个服务是这样子滴</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
http.listen(8000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> http = http.createServer((req, res) =&gt; {
  res.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span> });
  res.<span class="hljs-built_in">end</span>(<span class="hljs-string">'okay'</span>);
});
http.<span class="hljs-built_in">listen</span>(<span class="hljs-number">8000</span>)</code></pre>
<p>继续看代码 ，在创建服务的时候，参数里面调用了一个<code>this.callback()</code>函数，下面我们看看这个函数究竟是怎么样子的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = class Application extends Emitter {
  // 初始化 Application
  constructor() {
    ...
  }
  listen(...args) {
    ...
  }
  use(fn) {
    ...
  }

  callback() {
    const fn = compose(this.middleware); // 集中处理中间件数组
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 整合req、res、context、request、response
      return this.handleRequest(ctx, fn); // 返回handleRequest
    };
    return handleRequest;
  }
    
  handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => respond(ctx); // 最终响应函数
    return fnMiddleware(ctx).then(handleResponse) // 处理完中间件，然后传到下一响应函数
  }
  // 创建整合新的 context.
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
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code>
<span class="hljs-keyword">module</span><span class="hljs-variable">.exports</span> = <span class="hljs-keyword">class</span> Application <span class="hljs-keyword">extends</span> Emitter {
  <span class="hljs-comment">// 初始化 Application</span>
  constructor() {
    ...
  }
  listen(..<span class="hljs-variable">.args</span>) {
    ...
  }
  <span class="hljs-keyword">use</span>(fn) {
    ...
  }

  callback() {
    <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span><span class="hljs-variable">.middleware</span>); <span class="hljs-comment">// 集中处理中间件数组</span>
    <span class="hljs-keyword">const</span> handleRequest = (req, res) =&gt; {
      <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span><span class="hljs-variable">.createContext</span>(req, res); <span class="hljs-comment">// 整合req、res、context、request、response</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span><span class="hljs-variable">.handleRequest</span>(ctx, fn); <span class="hljs-comment">// 返回handleRequest</span>
    };
    <span class="hljs-keyword">return</span> handleRequest;
  }
    
  handleRequest(ctx, fnMiddleware) {
    <span class="hljs-keyword">const</span> handleResponse = () =&gt; respond(ctx); <span class="hljs-comment">// 最终响应函数</span>
    <span class="hljs-keyword">return</span> fnMiddleware(ctx)<span class="hljs-variable">.then</span>(handleResponse) <span class="hljs-comment">// 处理完中间件，然后传到下一响应函数</span>
  }
  <span class="hljs-comment">// 创建整合新的 context.</span>
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
  }
};
</code></pre>
<p>上面我们可以看出在<code>callback</code>函数里面有一个<code>const fn = compose(this.middleware);</code> 这个函数就是把<code>this.middleware</code>数组传进去，然后集中处理中间件，然后会返回处理完中间件的fn。</p>
<p>继续下一行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const handleRequest = (req, res) => {
  const ctx = this.createContext(req, res);
  return this.handleRequest(ctx, fn);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> handleRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handleRequest(ctx, fn);
};
</code></pre>
<p>继续进入到<code>handleRequest</code>函数里面的<code>const ctx = this.createContext(req, res);</code>这个把原生的http的<code>请求对象req</code>和<code>响应对象res</code>作为参数传进去，然后在<code>createContext</code>函数（看上面最大那坨代码）在里面，把<code>this.request</code>、<code>this.response</code>、<code>this.context</code>、<code>请求对象req</code>、<code>响应对象res</code>都整，做各种整合、处理得到新的<code>context</code>对象返回出去。</p>
<p>也就是强大的<code>ctx</code>，得到<code>ctx</code>之后，下一行返回<code>return this.handleRequest(ctx, fn);</code></p>
<p><code>this.handleRequest(ctx, fn)</code>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => respond(ctx);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
handleRequest(ctx, fnMiddleware) {
    const handleResponse = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> respond(ctx);
    <span class="hljs-keyword">return</span> fnMiddleware(ctx).<span class="hljs-keyword">then</span>(handleResponse).<span class="hljs-keyword">catch</span>(onerror);
}
</code></pre>
<p>这个函数 就是处理完中间件处理之后的返回的函数把<code>ctx</code>传下去，最后流通到<code>respond(ctx);</code>这个函数，</p>
<p>那么我们看看这个函数被我简化后是怎么样子的，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一些容错判断或者提示我全部删了
function respond(ctx) {
  const res = ctx.res;
  let body = ctx.body;
  res.end(body);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code><span class="hljs-comment">// 一些容错判断或者提示我全部删了</span>
<span class="hljs-built_in">function</span> respond(ctx) {
  <span class="hljs-keyword">const</span> res = ctx.res;
  let <span class="hljs-keyword">body</span> = ctx.<span class="hljs-keyword">body</span>;
  res.end(<span class="hljs-keyword">body</span>);
}
</code></pre>
<p>通过<code>ctx</code>拿到响应对象，和响应值、通过<code>end</code>方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。看上面原生的http的服务方法。</p>
<p>最后附上一个流程图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014894692?w=2330&amp;h=1022" src="https://static.alili.tech/img/remote/1460000014894692?w=2330&amp;h=1022" alt="" title="" style="cursor: pointer;"></span></p>
<p>这个只是介绍<code>application</code>整个流程，还有很多细节都没有一一介绍到，比如、创建<code>context</code>、<code>request</code>、<code>response</code>对象是怎么样子的呀？中间件是如何集中层层深入处理然后返回的呀？等等这些细节都会在下一篇会讲到（最近公司业务非常忙，不知道到猴年马月）。</p>
<blockquote>写的不好的地方，让大家贱笑了。</blockquote>
<p>然后最后安利一波博客，喜欢的小哥哥小姐姐可以star 哟</p>
<p>websit: <a href="https://github.com/naihe138/naice-blog" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/naice-blog</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步步去阅读koa源码，整体架构分析

## 原文链接
[https://segmentfault.com/a/1190000014894684](https://segmentfault.com/a/1190000014894684)


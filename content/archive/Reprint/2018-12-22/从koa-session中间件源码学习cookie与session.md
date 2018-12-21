---
title: '从koa-session中间件源码学习cookie与session' 
date: 2018-12-22 2:30:11
hidden: true
slug: hmiqa86m8yg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从koa-session中间件学习cookie与session</h1>
<h2 id="articleHeader1"><a href="https://github.com/zyl1314/blog/issues/3" rel="nofollow noreferrer" target="_blank">原文链接</a></h2>
<p>关于cookie和session是什么网上有很多介绍，但是具体的用法自己事实上一直不是很清楚，通过koa-session中间件的源码自己也算是对cookie和session大致搞明白了。</p>
<p>在我了解cookie的时候，大多数教程讲的是这些：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + &quot;=&quot;+ escape (value) + &quot;;expires=&quot; + exp.toGMTString(); 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span>(<span class="hljs-params">name,value</span>) 
</span>{ 
    <span class="hljs-keyword">var</span> Days = <span class="hljs-number">30</span>; 
    <span class="hljs-keyword">var</span> exp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); 
    exp.setTime(exp.getTime() + Days*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>*<span class="hljs-number">1000</span>); 
    <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">"="</span>+ <span class="hljs-built_in">escape</span> (value) + <span class="hljs-string">";expires="</span> + exp.toGMTString(); 
} </code></pre>
<p>它给我一个错觉：cookie只能在客户端利用js设置读取删除等，但事实上很多的cookie是由服务端在response的headers里面写进去的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  ctx.cookies.set('test', 'hello', {httpOnly: false});
  ctx.body = 'hello world';
})

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

app.use(<span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  ctx.cookies.set(<span class="hljs-string">'test'</span>, <span class="hljs-string">'hello'</span>, {<span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">false</span>});
  ctx.body = <span class="hljs-string">'hello world'</span>;
})

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>访问localhost:3000,打开控制台可以看到：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012412304?w=289&amp;h=50" src="https://static.alili.tech/img/remote/1460000012412304?w=289&amp;h=50" alt="img" title="img" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012412305?w=293&amp;h=41" src="https://static.alili.tech/img/remote/1460000012412305?w=293&amp;h=41" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>那么下次浏览器再访问localhost:3000的时候就会把这些cookie信息通过request的headers带给服务器。</p>
<p>了解http协议的话可以经常看到这么一句话：http是无状态的协议。什么意思呢？大致这么理解一下，就是你请求一个网站的时候，服务器不知道你是谁，比如你第一次访问了www.google.com,过了三秒钟你又访问了www.google.com,虽然这两次都是你操作的但是服务器事实上是不知道的。不过根据我们的生活经验，你登录了一个网站后，过了三秒你刷新一下，你还是在登录态的，这好像与无状态的http矛盾，其实这是因为有session。  </p>
<p>按照上面的说法，session是用来保存用户信息的，那他与cookie有什么关系，事实上按照我的理解session只是一个信息保存的解决方法，实现这个方法可以有多种途径。既然cookie可以保存信息，那么我们可以直接利用cookie来实现session。对应于koa-session中间件，当我们没有写store的时候，默认即利用cookie实现session。  </p>
<p>看一个官方例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-keyword">const</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa-session'</span>);
<span class="hljs-keyword">const</span> Koa = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

app.keys = [<span class="hljs-string">'some secret hurr'</span>];

<span class="hljs-keyword">const</span> CONFIG = {
  key: <span class="hljs-string">'koa:sess'</span>, <span class="hljs-comment">/** (string) cookie key (default is koa:sess) */</span>
  <span class="hljs-comment">/** (number || 'session') maxAge in ms (default is 1 days) */</span>
  <span class="hljs-comment">/** 'session' will result in a cookie that expires when session/browser is closed */</span>
  <span class="hljs-comment">/** Warning: If a session cookie is stolen, this cookie will never expire */</span>
  maxAge: <span class="hljs-number">86400000</span>,
  overwrite: <span class="hljs-keyword">true</span>, <span class="hljs-comment">/** (boolean) can overwrite or not (default true) */</span>
  httpOnly: <span class="hljs-keyword">true</span>, <span class="hljs-comment">/** (boolean) httpOnly or not (default true) */</span>
  signed: <span class="hljs-keyword">true</span>, <span class="hljs-comment">/** (boolean) signed or not (default true) */</span>
  rolling: <span class="hljs-keyword">false</span>, <span class="hljs-comment">/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/</span>
};

app.<span class="hljs-keyword">use</span>(session(CONFIG, app));
<span class="hljs-comment">// or if you prefer all default config, just use =&gt; app.use(session(app));</span>

app.<span class="hljs-keyword">use</span>(ctx =&gt; {
  <span class="hljs-comment">// ignore favicon</span>
  <span class="hljs-keyword">if</span> (ctx.path === <span class="hljs-string">'/favicon.ico'</span>) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">let</span> n = ctx.session.views || <span class="hljs-number">0</span>;
  ctx.session.views = ++n;
  ctx.body = n + <span class="hljs-string">' views'</span>;
});

app.listen(<span class="hljs-number">3000</span>);
console.log(<span class="hljs-string">'listening on port 3000'</span>);</code></pre>
<p>每次我们访问views都会+1。  </p>
<p>看一下koa-session是怎么实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(opts, app) {
  // session(app[, opts])
  if (opts &amp;&amp; typeof opts.use === 'function') {
    [ app, opts ] = [ opts, app ];
  }
  // app required
  if (!app || typeof app.use !== 'function') {
    throw new TypeError('app instance required: `session(opts, app)`');
  }

  opts = formatOpts(opts);
  extendContext(app.context, opts);

  return async function session(ctx, next) {
    const sess = ctx[CONTEXT_SESSION];
    if (sess.store) await sess.initFromExternal();
    try {
      await next();
    } catch (err) {
      throw err;
    } finally {
      await sess.commit();
    }
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opts, app</span>) </span>{
  <span class="hljs-comment">// session(app[, opts])</span>
  <span class="hljs-keyword">if</span> (opts &amp;&amp; <span class="hljs-keyword">typeof</span> opts.use === <span class="hljs-string">'function'</span>) {
    [ app, opts ] = [ opts, app ];
  }
  <span class="hljs-comment">// app required</span>
  <span class="hljs-keyword">if</span> (!app || <span class="hljs-keyword">typeof</span> app.use !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'app instance required: `session(opts, app)`'</span>);
  }

  opts = formatOpts(opts);
  extendContext(app.context, opts);

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">session</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">const</span> sess = ctx[CONTEXT_SESSION];
    <span class="hljs-keyword">if</span> (sess.store) <span class="hljs-keyword">await</span> sess.initFromExternal();
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> next();
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-keyword">throw</span> err;
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-keyword">await</span> sess.commit();
    }
  };
};</code></pre>
<p>一步一步的来看，formatOpts是用来做一些默认参数处理，extendContext的主要任务是对ctx做一个拦截器，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extendContext(context, opts) {
  Object.defineProperties(context, {
    [CONTEXT_SESSION]: {
      get() {
        if (this[_CONTEXT_SESSION]) return this[_CONTEXT_SESSION];
        this[_CONTEXT_SESSION] = new ContextSession(this, opts);
        return this[_CONTEXT_SESSION];
      },
    },
    session: {
      get() {
        return this[CONTEXT_SESSION].get();
      },
      set(val) {
        this[CONTEXT_SESSION].set(val);
      },
      configurable: true,
    },
    sessionOptions: {
      get() {
        return this[CONTEXT_SESSION].opts;
      },
    },
  });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function extendContext(context, opts) {
  Object.defineProperties(context, {
    [CONTEXT_SESSION]: {
      <span class="hljs-keyword">get</span>() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>[_CONTEXT_SESSION]) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[_CONTEXT_SESSION];
        <span class="hljs-keyword">this</span>[_CONTEXT_SESSION] = new ContextSession(<span class="hljs-keyword">this</span>, opts);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[_CONTEXT_SESSION];
      },
    },
    session: {
      <span class="hljs-keyword">get</span>() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[CONTEXT_SESSION].<span class="hljs-keyword">get</span>();
      },
      <span class="hljs-keyword">set</span>(<span class="hljs-keyword">val</span>) {
        <span class="hljs-keyword">this</span>[CONTEXT_SESSION].<span class="hljs-keyword">set</span>(<span class="hljs-keyword">val</span>);
      },
      configurable: <span class="hljs-literal">true</span>,
    },
    sessionOptions: {
      <span class="hljs-keyword">get</span>() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[CONTEXT_SESSION].opts;
      },
    },
  });
}
</code></pre>
<p>所以走到下面这个代码时，事实上是新建了一个ContextSession对象sess。这个对象有个属性为session（要保存的session对象），有一些方法用来初始化session（如initFromExternal、initFromCookie），具体是什么下面用到再看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sess = ctx[CONTEXT_SESSION]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">const sess = ctx<span class="hljs-string">[CONTEXT_SESSION]</span></code></pre>
<p>接着看是执行了如下代码，也即执行我们的业务逻辑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await next();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">await</span> <span class="hljs-keyword">next</span>()<span class="hljs-comment">;</span></code></pre>
<p>然后就是下面这个了，看样子应该是类似保存cookie的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await sess.commit();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">await sess.commit()<span class="hljs-comment">;</span></code></pre>
<p>至此全部流程结束，好像并没有看到有什么初始化session的操作。其实在执行我们的业务逻辑时，假入我们操作了session，如例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let n = ctx.session.views || 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> n = ctx.session.views |<span class="hljs-type">| 0</span>;</code></pre>
<p>就会触发ctx的session属性拦截器，ctx.session实际上是sess的get方法返回值（返回值其实是一个Session对象），代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  get() {
    const session = this.session;
    // already retrieved
    if (session) return session;
    // unset
    if (session === false) return null;

    // cookie session store
    if (!this.store) this.initFromCookie();
    return this.session;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">get</span>() {
    const session = <span class="hljs-keyword">this</span>.session;
    <span class="hljs-comment">// already retrieved</span>
    <span class="hljs-keyword">if</span> (session) <span class="hljs-keyword">return</span> session;
    <span class="hljs-comment">// unset</span>
    <span class="hljs-keyword">if</span> (session === <span class="hljs-literal">false</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-comment">// cookie session store</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.store) <span class="hljs-keyword">this</span>.initFromCookie();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.session;
  }</code></pre>
<p>在get里面执行了session的初始化操作，我们考虑没有store的情况即执行initFromCookie();</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  initFromCookie() {
    debug('init from cookie');
    const ctx = this.ctx;
    const opts = this.opts;
    const cookie = ctx.cookies.get(opts.key, opts);
    if (!cookie) {
      this.create();
      return;
    }

    let json;
    debug('parse %s', cookie);
    try {
      json = opts.decode(cookie);
    } catch (err) {
      // backwards compatibility:
      // create a new session if parsing fails.
      // new Buffer(string, 'base64') does not seem to crash
      // when `string` is not base64-encoded.
      // but `JSON.parse(string)` will crash.
      debug('decode %j error: %s', cookie, err);
      if (!(err instanceof SyntaxError)) {
        // clean this cookie to ensure next request won't throw again
        ctx.cookies.set(opts.key, '', opts);
        // ctx.onerror will unset all headers, and set those specified in err
        err.headers = {
          'set-cookie': ctx.response.get('set-cookie'),
        };
        throw err;
      }
      this.create();
      return;
    }

    debug('parsed %j', json);

    if (!this.valid(json)) {
      this.create();
      return;
    }

    // support access `ctx.session` before session middleware
    this.create(json);
    this.prevHash = util.hash(this.session.toJSON());
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  initFromCookie() {
    debug(<span class="hljs-string">'init from cookie'</span>);
    const ctx = <span class="hljs-keyword">this</span>.ctx;
    const opts = <span class="hljs-keyword">this</span>.opts;
    const cookie = ctx.cookies.<span class="hljs-keyword">get</span>(opts.key, opts);
    <span class="hljs-keyword">if</span> (!cookie) {
      <span class="hljs-keyword">this</span>.create();
      <span class="hljs-keyword">return</span>;
    }

    let json;
    debug(<span class="hljs-string">'parse %s'</span>, cookie);
    <span class="hljs-keyword">try</span> {
      json = opts.decode(cookie);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-comment">// backwards compatibility:</span>
      <span class="hljs-comment">// create a new session if parsing fails.</span>
      <span class="hljs-comment">// new Buffer(string, 'base64') does not seem to crash</span>
      <span class="hljs-comment">// when `string` is not base64-encoded.</span>
      <span class="hljs-comment">// but `JSON.parse(string)` will crash.</span>
      debug(<span class="hljs-string">'decode %j error: %s'</span>, cookie, err);
      <span class="hljs-keyword">if</span> (!(err instanceof SyntaxError)) {
        <span class="hljs-comment">// clean this cookie to ensure next request won't throw again</span>
        ctx.cookies.<span class="hljs-keyword">set</span>(opts.key, <span class="hljs-string">''</span>, opts);
        <span class="hljs-comment">// ctx.onerror will unset all headers, and set those specified in err</span>
        err.headers = {
          <span class="hljs-string">'set-cookie'</span>: ctx.response.<span class="hljs-keyword">get</span>(<span class="hljs-string">'set-cookie'</span>),
        };
        <span class="hljs-keyword">throw</span> err;
      }
      <span class="hljs-keyword">this</span>.create();
      <span class="hljs-keyword">return</span>;
    }

    debug(<span class="hljs-string">'parsed %j'</span>, json);

    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.valid(json)) {
      <span class="hljs-keyword">this</span>.create();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// support access `ctx.session` before session middleware</span>
    <span class="hljs-keyword">this</span>.create(json);
    <span class="hljs-keyword">this</span>.prevHash = util.hash(<span class="hljs-keyword">this</span>.session.toJSON());
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Session {
  /**
   * Session constructor
   * @param {Context} ctx
   * @param {Object} obj
   * @api private
   */

  constructor(ctx, obj) {
    this._ctx = ctx;
    if (!obj) {
      this.isNew = true;
    } else {
      for (const k in obj) {
        // restore maxAge from store
        if (k === '_maxAge') this._ctx.sessionOptions.maxAge = obj._maxAge;
        else this[k] = obj[k];
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Session</span> </span>{
  <span class="hljs-comment">/**
   * Session constructor
   * <span class="hljs-doctag">@param</span> {Context} ctx
   * <span class="hljs-doctag">@param</span> {Object} obj
   * <span class="hljs-doctag">@api</span> private
   */</span>

  <span class="hljs-keyword">constructor</span>(ctx, obj) {
    <span class="hljs-keyword">this</span>._ctx = ctx;
    <span class="hljs-keyword">if</span> (!obj) {
      <span class="hljs-keyword">this</span>.isNew = <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">for</span> (const k <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-comment">// restore maxAge from store</span>
        <span class="hljs-keyword">if</span> (k === <span class="hljs-string">'_maxAge'</span>) <span class="hljs-keyword">this</span>._ctx.sessionOptions.maxAge = obj._maxAge;
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">this</span>[k] = obj[k];
      }
    }
  }</code></pre>
<p>很明了的可以看出来其主要逻辑就是新建一个session，第一次访问服务器时session.isNew为true。  </p>
<p>当我们执行完业务逻辑时，最后执行sess.commit()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async commit() {
    const session = this.session;
    const prevHash = this.prevHash;
    const opts = this.opts;
    const ctx = this.ctx;
    // not accessed
    if (undefined === session) return;

    // removed
    if (session === false) {
      await this.remove();
      return;
    }

    // force save session when `session._requireSave` set
    let changed = true;
    if (!session._requireSave) {
      const json = session.toJSON();
      // do nothing if new and not populated
      if (!prevHash &amp;&amp; !Object.keys(json).length) return;
      changed = prevHash !== util.hash(json);
      // do nothing if not changed and not in rolling mode
      if (!this.opts.rolling &amp;&amp; !changed) return;
    }

    if (typeof opts.beforeSave === 'function') {
      debug('before save');
      opts.beforeSave(ctx, session);
    }
    await this.save(changed);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  async commit() {
    const session = <span class="hljs-keyword">this</span>.session;
    const prevHash = <span class="hljs-keyword">this</span>.prevHash;
    const opts = <span class="hljs-keyword">this</span>.opts;
    const ctx = <span class="hljs-keyword">this</span>.ctx;
    <span class="hljs-regexp">//</span> <span class="hljs-keyword">not</span> accessed
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">undefined</span> === session) <span class="hljs-keyword">return</span>;

    <span class="hljs-regexp">//</span> removed
    <span class="hljs-keyword">if</span> (session === <span class="hljs-literal">false</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.remove();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-regexp">//</span> force save session <span class="hljs-keyword">when</span> `<span class="javascript">session._requireSave</span>` set
    let changed = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (!session._requireSave) {
      const json = session.toJSON();
      <span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> nothing <span class="hljs-keyword">if</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> populated
      <span class="hljs-keyword">if</span> (!prevHash &amp;&amp; !Object.keys(json).length) <span class="hljs-keyword">return</span>;
      changed = prevHash !== util.hash(json);
      <span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> nothing <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> changed <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> rolling mode
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.opts.rolling &amp;&amp; !changed) <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opts.beforeSave === <span class="hljs-string">'function'</span>) {
      debug(<span class="hljs-string">'before save'</span>);
      opts.beforeSave(ctx, session);
    }
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.save(changed);
  }</code></pre>
<p>commit事保存session前的准备工作，比如在我们没有强制保存session的时候它会判断时候保存session</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let changed = true;
    if (!session._requireSave) {
      const json = session.toJSON();
      // do nothing if new and not populated
      if (!prevHash &amp;&amp; !Object.keys(json).length) return;
      changed = prevHash !== util.hash(json);
      // do nothing if not changed and not in rolling mode
      if (!this.opts.rolling &amp;&amp; !changed) return;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">let</span> changed = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (!session._requireSave) {
      const json = session.toJSON();
      // <span class="hljs-keyword">do</span> nothing <span class="hljs-keyword">if</span> <span class="hljs-built_in">new</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> populated
      <span class="hljs-keyword">if</span> (!prevHash &amp;&amp; !Object.keys(json).<span class="hljs-built_in">length</span>) <span class="hljs-built_in">return</span>;
      changed = prevHash !== util.hash(json);
      // <span class="hljs-keyword">do</span> nothing <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> changed <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> rolling mode
      <span class="hljs-keyword">if</span> (!this.opts.rolling &amp;&amp; !changed) <span class="hljs-built_in">return</span>;
    }</code></pre>
<p>还提供了hook给我们使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (typeof opts.beforeSave === 'function') {
      debug('before save');
      opts.beforeSave(ctx, session);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">if</span> (typeof opts.beforeSave === <span class="hljs-string">'function'</span>) {
      <span class="hljs-selector-tag">debug</span>(<span class="hljs-string">'before save'</span>);
      <span class="hljs-selector-tag">opts</span><span class="hljs-selector-class">.beforeSave</span>(ctx, session);
    }</code></pre>
<p>到此开始真正的save session</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async save(changed) {
    const opts = this.opts;
    const key = opts.key;
    const externalKey = this.externalKey;
    let json = this.session.toJSON();
    // set expire for check
    const maxAge = opts.maxAge ? opts.maxAge : ONE_DAY;
    if (maxAge === 'session') {
      // do not set _expire in json if maxAge is set to 'session'
      // also delete maxAge from options
      opts.maxAge = undefined;
    } else {
      // set expire for check
      json._expire = maxAge + Date.now();
      json._maxAge = maxAge;
    }

    // save to external store
    if (externalKey) {
      debug('save %j to external key %s', json, externalKey);
      await this.store.set(externalKey, json, maxAge, {
        changed,
        rolling: opts.rolling,
      });
      this.ctx.cookies.set(key, externalKey, opts);
      return;
    }

    // save to cookie
    debug('save %j to cookie', json);
    json = opts.encode(json);
    
    debug('save %s', json);

    this.ctx.cookies.set(key, json, opts);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>  async <span class="hljs-built_in">save</span>(changed) {
    <span class="hljs-keyword">const</span> opts = <span class="hljs-keyword">this</span>.opts;
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = opts.<span class="hljs-built_in">key</span>;
    <span class="hljs-keyword">const</span> externalKey = <span class="hljs-keyword">this</span>.externalKey;
    let json = <span class="hljs-keyword">this</span>.session.toJSON();
    <span class="hljs-comment">// set expire for check</span>
    <span class="hljs-keyword">const</span> maxAge = opts.maxAge ? opts.maxAge : ONE_DAY;
    <span class="hljs-keyword">if</span> (maxAge === <span class="hljs-string">'session'</span>) {
      <span class="hljs-comment">// do not set _expire in json if maxAge is set to 'session'</span>
      <span class="hljs-comment">// also delete maxAge from options</span>
      opts.maxAge = undefined;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// set expire for check</span>
      json._expire = maxAge + Date.now();
      json._maxAge = maxAge;
    }

    <span class="hljs-comment">// save to external store</span>
    <span class="hljs-keyword">if</span> (externalKey) {
      debug(<span class="hljs-string">'save %j to external key %s'</span>, json, externalKey);
      await <span class="hljs-keyword">this</span>.store.<span class="hljs-built_in">set</span>(externalKey, json, maxAge, {
        changed,
        rolling: opts.rolling,
      });
      <span class="hljs-keyword">this</span>.ctx.cookies.<span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, externalKey, opts);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// save to cookie</span>
    debug(<span class="hljs-string">'save %j to cookie'</span>, json);
    json = opts.encode(json);
    
    debug(<span class="hljs-string">'save %s'</span>, json);

    <span class="hljs-keyword">this</span>.ctx.cookies.<span class="hljs-built_in">set</span>(<span class="hljs-built_in">key</span>, json, opts);
  }</code></pre>
<p>对于我们讨论的这种情况，可以看到就是将信息encode之后写入了cookie，并且包含了两个字段_expire和_maxAge。  </p>
<p>简单验证一下,CONFIG添加encode和decode</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  encode: json => JSON.stringify(json),
  decode: str => JSON.parse(str)
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">const</span> CONFIG = {
  key: <span class="hljs-comment">'koa:sess', /** (string) cookie key (default is koa:sess) */</span>
  /** (number || <span class="hljs-comment">'session') maxAge in ms (default is 1 days) */</span>
  /** <span class="hljs-comment">'session' will result in a cookie that expires when session/browser is closed */</span>
  /** Warning: <span class="hljs-keyword">If</span> a session cookie <span class="hljs-keyword">is</span> stolen, this cookie will never expire */
  maxAge: <span class="hljs-number">86400000</span>,
  overwrite: <span class="hljs-literal">true</span>, /** (boolean) can overwrite <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> (<span class="hljs-keyword">default</span> <span class="hljs-literal">true</span>) */
  httpOnly: <span class="hljs-literal">true</span>, /** (boolean) httpOnly <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> (<span class="hljs-keyword">default</span> <span class="hljs-literal">true</span>) */
  signed: <span class="hljs-literal">true</span>, /** (boolean) signed <span class="hljs-keyword">or</span> <span class="hljs-keyword">not</span> (<span class="hljs-keyword">default</span> <span class="hljs-literal">true</span>) */
  rolling: <span class="hljs-literal">false</span>, /** (boolean) Force a session identifier cookie <span class="hljs-keyword">to</span> be <span class="hljs-keyword">set</span> <span class="hljs-keyword">on</span> every <span class="hljs-built_in">response</span>. The expiration <span class="hljs-keyword">is</span> reset <span class="hljs-keyword">to</span> the original maxAge, resetting the expiration countdown. <span class="hljs-keyword">default</span> <span class="hljs-keyword">is</span> <span class="hljs-literal">false</span> **/
  encode: json =&gt; JSON.stringify(json),
  decode: str =&gt; JSON.parse(str)
};
</code></pre>
<p>第一次访问时<br><span class="img-wrap"><img data-src="/img/remote/1460000012412306?w=582&amp;h=27" src="https://static.alili.tech/img/remote/1460000012412306?w=582&amp;h=27" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>再次访问  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012412307?w=596&amp;h=34" src="https://static.alili.tech/img/remote/1460000012412307?w=596&amp;h=34" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>_expire用来下次访问服务器时判断session是否已过期</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  valid(json) {
    if (!json) return false;

    if (json._expire &amp;&amp; json._expire < Date.now()) {
      debug('expired session');
      return false;
    }

    const valid = this.opts.valid;
    if (typeof valid === 'function' &amp;&amp; !valid(this.ctx, json)) {
      // valid session value fail, ignore this session
      debug('invalid session');
      return false;
    }
    return true;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  valid(json) {
    <span class="hljs-keyword">if</span> (!json) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">if</span> (json._expire &amp;&amp; json._expire &lt; Date.now()) {
      debug(<span class="hljs-string">'expired session'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    const valid = <span class="hljs-keyword">this</span>.opts.valid;
    <span class="hljs-keyword">if</span> (typeof valid === <span class="hljs-string">'function'</span> &amp;&amp; !valid(<span class="hljs-keyword">this</span>.ctx, json)) {
      <span class="hljs-comment">// valid session value fail, ignore this session</span>
      debug(<span class="hljs-string">'invalid session'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }</code></pre>
<p>_maxAge用来保存过期时间,ctx.sessionOptions经过拦截器指向的其实是sess.opts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Session {
  /**
   * Session constructor
   * @param {Context} ctx
   * @param {Object} obj
   * @api private
   */

  constructor(ctx, obj) {
    this._ctx = ctx;
    if (!obj) {
      this.isNew = true;
    } else {
      for (const k in obj) {
        // restore maxAge from store
        if (k === '_maxAge') this._ctx.sessionOptions.maxAge = obj._maxAge;
        else this[k] = obj[k];
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Session</span> </span>{
  <span class="hljs-comment">/**
   * Session constructor
   * <span class="hljs-doctag">@param</span> {Context} ctx
   * <span class="hljs-doctag">@param</span> {Object} obj
   * <span class="hljs-doctag">@api</span> private
   */</span>

  <span class="hljs-keyword">constructor</span>(ctx, obj) {
    <span class="hljs-keyword">this</span>._ctx = ctx;
    <span class="hljs-keyword">if</span> (!obj) {
      <span class="hljs-keyword">this</span>.isNew = <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">for</span> (const k <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-comment">// restore maxAge from store</span>
        <span class="hljs-keyword">if</span> (k === <span class="hljs-string">'_maxAge'</span>) <span class="hljs-keyword">this</span>._ctx.sessionOptions.maxAge = obj._maxAge;
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">this</span>[k] = obj[k];
      }
    }
  }</code></pre>
<p>画一个简单的流程图看一下这整个逻辑时怎样的  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012412308?w=1177&amp;h=443" src="https://static.alili.tech/img/remote/1460000012412308?w=1177&amp;h=443" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>通常情况下，把session保存在cookie有下面两个缺点：</p>
<ul>
<li>Session is stored on client side unencrypted</li>
<li>Browser cookies always have length limits</li>
</ul>
<p>所以可以把session保存在数据库中等，在koa-session中，可以设置store并提供三个方法：get、set、destroy。</p>
<p>当设置了store的时候，初始化操作是在initFromExternal完成的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  async initFromExternal() {
    debug('init from external');
    const ctx = this.ctx;
    const opts = this.opts;

    const externalKey = ctx.cookies.get(opts.key, opts);
    debug('get external key from cookie %s', externalKey);

    if (!externalKey) {
      // create a new `externalKey`
      this.create();
      return;
    }

    const json = await this.store.get(externalKey, opts.maxAge, { rolling: opts.rolling });
    if (!this.valid(json)) {
      // create a new `externalKey`
      this.create();
      return;
    }

    // create with original `externalKey`
    this.create(json, externalKey);
    this.prevHash = util.hash(this.session.toJSON());
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  async initFromExternal() {
    debug(<span class="hljs-string">'init from external'</span>);
    const ctx = <span class="hljs-keyword">this</span>.ctx;
    const opts = <span class="hljs-keyword">this</span>.opts;

    const externalKey = ctx.cookies.<span class="hljs-keyword">get</span>(opts.key, opts);
    debug(<span class="hljs-string">'get external key from cookie %s'</span>, externalKey);

    <span class="hljs-keyword">if</span> (!externalKey) {
      <span class="hljs-comment">// create a new `externalKey`</span>
      <span class="hljs-keyword">this</span>.create();
      <span class="hljs-keyword">return</span>;
    }

    const json = await <span class="hljs-keyword">this</span>.store.<span class="hljs-keyword">get</span>(externalKey, opts.maxAge, { rolling: opts.rolling });
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.valid(json)) {
      <span class="hljs-comment">// create a new `externalKey`</span>
      <span class="hljs-keyword">this</span>.create();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// create with original `externalKey`</span>
    <span class="hljs-keyword">this</span>.create(json, externalKey);
    <span class="hljs-keyword">this</span>.prevHash = util.hash(<span class="hljs-keyword">this</span>.session.toJSON());
  }</code></pre>
<p>externalKey事实上是session数据的索引，此时相比于直接把session存在cookie来说多了一层，cookie里面存的不是session而是找到session的钥匙。当然我们保存的时候就要做两个工作，一是将session存入数据库，另一个是将session对应的key即（externalKey）写入到cookie,如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // save to external store
    if (externalKey) {
      debug('save %j to external key %s', json, externalKey);
      await this.store.set(externalKey, json, maxAge, {
        changed,
        rolling: opts.rolling,
      });
      this.ctx.cookies.set(key, externalKey, opts);
      return;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-comment">// save to external store</span>
    <span class="hljs-keyword">if</span> (externalKey) {
      debug(<span class="hljs-string">'save %j to external key %s'</span>, json, externalKey);
      await <span class="hljs-keyword">this</span>.store.<span class="hljs-keyword">set</span>(externalKey, json, maxAge, {
        changed,
        rolling: opts.rolling,
      });
      <span class="hljs-keyword">this</span>.ctx.cookies.<span class="hljs-keyword">set</span>(key, externalKey, opts);
      <span class="hljs-keyword">return</span>;
    }</code></pre>
<p>我们可以测试一下，事实上我们可以把session存在任意的媒介，不一定非要是数据库（主要是电脑没装数据库），只要store提供了三个接口即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');

app.keys = ['some secret hurr'];

const store = {
  get(key) {
    const sessionDir = path.resolve(__dirname, './session');
    const files = fs.readdirSync(sessionDir);

    for (let i = 0; i < files.length; i++) {
      if (files[i].startsWith(key)) {
        const filepath = path.resolve(sessionDir, files[i]);
        delete require.cache[require.resolve(filepath)];
        const result = require(filepath);
        return result;
      }
    }
  },
  set(key, session) {
    const filePath = path.resolve(__dirname, './session', `${key}.js`);
    const content = `module.exports = ${JSON.stringify(session)};`;
    
    fs.writeFileSync(filePath, content);
  },

  destroy(key){
    const filePath = path.resolve(__dirname, './session', `${key}.js`);
    fs.unlinkSync(filePath);
  }
}

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  store
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  if (n >=5 ) ctx.session = null;
  ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> session = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-session'</span>);
<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

app.keys = [<span class="hljs-string">'some secret hurr'</span>];

<span class="hljs-keyword">const</span> store = {
  <span class="hljs-keyword">get</span>(key) {
    <span class="hljs-keyword">const</span> sessionDir = path.resolve(__dirname, <span class="hljs-string">'./session'</span>);
    <span class="hljs-keyword">const</span> files = fs.readdirSync(sessionDir);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
      <span class="hljs-keyword">if</span> (files[i].startsWith(key)) {
        <span class="hljs-keyword">const</span> filepath = path.resolve(sessionDir, files[i]);
        <span class="hljs-keyword">delete</span> <span class="hljs-built_in">require</span>.cache[<span class="hljs-built_in">require</span>.resolve(filepath)];
        <span class="hljs-keyword">const</span> result = <span class="hljs-built_in">require</span>(filepath);
        <span class="hljs-keyword">return</span> result;
      }
    }
  },
  <span class="hljs-keyword">set</span>(key, session) {
    <span class="hljs-keyword">const</span> filePath = path.resolve(__dirname, <span class="hljs-string">'./session'</span>, <span class="hljs-string">`<span class="hljs-subst">${key}</span>.js`</span>);
    <span class="hljs-keyword">const</span> content = <span class="hljs-string">`module.exports = <span class="hljs-subst">${JSON.stringify(session)}</span>;`</span>;
    
    fs.writeFileSync(filePath, content);
  },

  destroy(key){
    <span class="hljs-keyword">const</span> filePath = path.resolve(__dirname, <span class="hljs-string">'./session'</span>, <span class="hljs-string">`<span class="hljs-subst">${key}</span>.js`</span>);
    fs.unlinkSync(filePath);
  }
}

<span class="hljs-keyword">const</span> CONFIG = {
  key: <span class="hljs-string">'koa:sess'</span>, <span class="hljs-comment">/** (string) cookie key (default is koa:sess) */</span>
  <span class="hljs-comment">/** (number || 'session') maxAge in ms (default is 1 days) */</span>
  <span class="hljs-comment">/** 'session' will result in a cookie that expires when session/browser is closed */</span>
  <span class="hljs-comment">/** Warning: If a session cookie is stolen, this cookie will never expire */</span>
  maxAge: <span class="hljs-number">86400000</span>,
  overwrite: <span class="hljs-literal">true</span>, <span class="hljs-comment">/** (boolean) can overwrite or not (default true) */</span>
  httpOnly: <span class="hljs-literal">true</span>, <span class="hljs-comment">/** (boolean) httpOnly or not (default true) */</span>
  signed: <span class="hljs-literal">true</span>, <span class="hljs-comment">/** (boolean) signed or not (default true) */</span>
  rolling: <span class="hljs-literal">false</span>, <span class="hljs-comment">/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/</span>
  store
};

app.use(session(CONFIG, app));
<span class="hljs-comment">// or if you prefer all default config, just use =&gt; app.use(session(app));</span>

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-comment">// ignore favicon</span>
  <span class="hljs-keyword">if</span> (ctx.path === <span class="hljs-string">'/favicon.ico'</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">let</span> n = ctx.session.views || <span class="hljs-number">0</span>;
  ctx.session.views = ++n;
  <span class="hljs-keyword">if</span> (n &gt;=<span class="hljs-number">5</span> ) ctx.session = <span class="hljs-literal">null</span>;
  ctx.body = n + <span class="hljs-string">' views'</span>;
});

app.listen(<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on port 3000'</span>);</code></pre>
<p>浏览器输入localhost:3000，刷新五次则views重新开始计数。  </p>
<p>全文完。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从koa-session中间件源码学习cookie与session

## 原文链接
[https://segmentfault.com/a/1190000012412299](https://segmentfault.com/a/1190000012412299)


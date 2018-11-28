---
title: '一步步去阅读koa源码，中间件执行原理' 
date: 2018-11-28 2:30:10
hidden: true
slug: mpgvhl9nwcb
categories: [reprint]
---

{{< raw >}}
<p>koa&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x7684;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#xFF0C;&#x4EE3;&#x7801;&#x7684;&#x662F;&#x975E;&#x5E38;&#x7CBE;&#x5999;&#x7684;&#x3002;&#x7531;&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x5F20;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7684;&#x56FE;&#x6765;&#x5F62;&#x5BB9;&#xFF0C;&#x8BB0;&#x4F4F;&#x8FD9;&#x5F20;&#x56FE;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015294321?w=478&amp;h=435" src="https://static.alili.tech/img/remote/1460000015294321?w=478&amp;h=435" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#x56FE;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x6765;&#x63CF;&#x8FF0;&#x4E00;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const app = new Koa()
// fn1
app.use(async (ctx, next) =&gt; {
  console.log(&apos;fn1-1&apos;)
  next()
  console.log(&apos;fn1-2&apos;)
})

// fn2
app.use(async (ctx, next) =&gt; {
  console.log(&apos;fn2-1&apos;)
  next()
  console.log(&apos;fn2-2&apos;)
})

// fn3
app.use(async (ctx, next) =&gt; {
  console.log(&apos;fn3-1&apos;)
  next()
  console.log(&apos;fn3-2&apos;)
})

app.listen(4002)

// fn1-1&#x3001;fn2-1&#x3001;fn3-1&#x3001;fn3-2&#x3001;fn2-2&#x3001;fn1-2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-comment">// fn1</span>
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn1-1&apos;</span>)
  next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn1-2&apos;</span>)
})

<span class="hljs-comment">// fn2</span>
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn2-1&apos;</span>)
  next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn2-2&apos;</span>)
})

<span class="hljs-comment">// fn3</span>
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn3-1&apos;</span>)
  next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;fn3-2&apos;</span>)
})

app.listen(<span class="hljs-number">4002</span>)

<span class="hljs-comment">// fn1-1&#x3001;fn2-1&#x3001;fn3-1&#x3001;fn3-2&#x3001;fn2-2&#x3001;fn1-2</span>
</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x987A;&#x5E8F;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684;&#x662F;<code>fn1-1&#x3001;fn2-1&#x3001;fn3-1&#x3001;fn3-2&#x3001;fn2-2&#x3001;fn1-2</code>&#xFF0C;&#x73B0;&#x5728;&#x53EA;&#x77E5;&#x9053;&#xFF0C;&#x8C03;&#x7528;<code>next()</code>&#x51FD;&#x6570;&#x5C31;&#x4F1A;&#x628A;&#x63A7;&#x5236;&#x6D41;&#x7A0B;&#x5C31;&#x8DF3;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x77E5;&#x9053;&#x6267;&#x884C;&#x6240;&#x6709;&#x5B8C;&#x4E4B;&#x540E;&#x7136;&#x540E;&#x518D;&#x9010;&#x6B65;&#x5411;&#x4E0A;&#x6267;&#x884C;&#x524D;&#x4E00;&#x4E2A;<code>next</code>&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x8FD9;&#x6839;&#x8DDF;&#x6D0B;&#x8471;&#x6709;&#x5F88;&#x5927;&#x7684;&#x76F8;&#x50CF;&#x4F3C;&#x6027;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x613F;&#x610F;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x7684;&#x5265;&#x5F00;&#x6211;&#x7684;&#x5FC3;~~~&#xFF09;&#x3002;</p><h3 id="articleHeader0">&#x63A2;&#x7D22;</h3><p>&#x4F46;&#x662F;&#x5176;&#x4E2D;&#x7684;&#x539F;&#x7406;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#xFF1F;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E00;&#x6B65;&#x6B65;&#x53BB;&#x63A2;&#x7D22;&#x3002;</p><p>&#x9996;&#x5148;&#x662F;&#x8C03;&#x7528; <code>app.use(fn)</code>&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5728;&#x6E90;&#x7801;&#x91CC;&#x9762;&#xFF0C;&#x5220;&#x9664;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x5224;&#x65AD;&#xFF0C;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
constructor() {
  super();
  this.middleware = [];
}

use(fn) {
  this.middleware.push(fn);
  return this;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code>
<span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  super();
  this.middleware = [];
}</span>

<span class="hljs-title">use</span><span class="hljs-params">(fn)</span> <span class="hljs-comment">{
  this.middleware.push(fn);
  return this;
}</span>
</span></code></pre><p>&#x5C31;&#x662F;&#x628A;&#x6240;&#x6709;&#x51FD;&#x6570;<code>push</code>&#x5230;&#x4E00;&#x4E2A;<code>middleware</code>&#x7684;&#x6570;&#x7EC4;&#x4E4B;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E2A;<code>use</code>&#x5C31;&#x662F;&#x4E13;&#x95E8;&#x5E72;&#x8FD9;&#x4E2D;&#x52FE;&#x5F53;&#x7684;&#x3002;</p><p>&#x597D;&#x4E86;&#x77E5;&#x9053;<code>use</code>&#x7684;&#x4F5C;&#x7528;&#x4E86;&#xFF0C;&#x6267;&#x884C;&#x4E86;<code>use</code>&#x4E4B;&#x540E; &#x6211;&#x4EEC;&#x7684;<code>middleware</code>&#x4E2D;&#x5C31;&#x6709;&#x5F88;&#x591A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x770B;&#x4E0B;&#x53BB;&#x3002;</p><p>&#x7136;&#x540E;&#x6267;&#x884C;&#x5230; <code>app.listen</code>&#x51FD;&#x6570;&#x4E4B;&#x540E;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen(...args) {
  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;server
  const server = http.createServer(this.callback());
  return server.listen(...args);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-built_in">listen</span>(...args) {
  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;server</span>
  <span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-keyword">this</span>.callback());
  <span class="hljs-built_in">return</span> server.<span class="hljs-built_in">listen</span>(...args);
}
</code></pre><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x91CC;&#x4E48;&#x6709;&#x4E2A;<code>this.callback()</code>&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x8DF3;&#x5230;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback() {
  // &#x6211;&#x4EEC;&#x770B;&#x8FD9;&#x91CC;
  const fn = compose(this.middleware);

  const handleRequest = (req, res) =&gt; {
    const ctx = this.createContext(req, res);
    // &#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x6211;&#x4EEC;&#x8BF7;&#x8BB0;&#x4F4F;&#x4E0B;&#x9762;&#x8FD9;&#x4E00;&#x884C;&#x4EE3;&#x7801;
    return this.handleRequest(ctx, fn);
  };

  return handleRequest;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>callback() {
  <span class="hljs-comment">// &#x6211;&#x4EEC;&#x770B;&#x8FD9;&#x91CC;</span>
  <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middleware);

  <span class="hljs-keyword">const</span> handleRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res);
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x6211;&#x4EEC;&#x8BF7;&#x8BB0;&#x4F4F;&#x4E0B;&#x9762;&#x8FD9;&#x4E00;&#x884C;&#x4EE3;&#x7801;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handleRequest(ctx, fn);
  };

  <span class="hljs-keyword">return</span> handleRequest;
}
</code></pre><p>&#x8FD9;&#x4E2A;<code>callback</code>&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x6267;&#x884C;&#x4E86;<code>compose</code>&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x628A;<code>middleware</code>&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#x3002;</p><p>&#x6267;&#x884C;&#x5230;&#x4E86;<code>compose</code>&#x51FD;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x770B;&#x770B;<code>compose</code>&#x91CC;&#x9762;&#x6709;&#x4EC0;&#x4E48;&#x3002;</p><p><code>compose</code>&#x51FD;&#x6570;&#x5C31;&#x662F;&#x4E00;&#x5F00;&#x59CB;&#x5F15;&#x7528;&#x4E86;<code>koa-compose</code>&#x6A21;&#x5757;,&#x7B80;&#x5316;&#x4E4B;&#x540E;&#x53D1;&#x73B0;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF0C;&#x7B80;&#x5316;&#x540E;&#x5C31;&#x7B80;&#x7B80;&#x5355;&#x5355;&#x7684;20&#x51E0;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose (middleware) {
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      index = i
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
      }
    }
  }
}
</code></pre><p>&#x6267;&#x884C;&#x8FD9;&#x4E2A;<code>compose</code>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x6CE8;&#x610F;&#x8FD9;&#x662F;&#x4E0A;&#x9762;&#x7684;<code>callback</code>&#x8C03;&#x7528;&#x7684;&#x3002;&#x5F97;&#x5230;&#x4E00;&#x4E2A;<code>fn</code>&#x51FD;&#x6570;</p><p>&#x770B;&#x4E0A;&#x9762;&#x7684;<code>callback</code>&#x8C03;&#x7528;&#x7684;</p><p>&#x7136;&#x540E;&#x6267;&#x884C;&#x5230;<code>this.handleRequest(ctx, fn);</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5427;<code>ctx</code>&#x548C;<code>fn</code>&#xFF08;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4E0A;&#x9762;compose&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#xFF09;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x4F20;&#x5165;&#x5230;this.handleRequest&#x4E2D;&#x3002; &#x4EE3;&#x7801;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleRequest(ctx, fnMiddleware) {
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">handleRequest</span>(ctx, fnMiddleware) {
  <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">fnMiddleware</span>(ctx)<span class="hljs-selector-class">.then</span>(handleResponse)<span class="hljs-selector-class">.catch</span>(onerror);
}
</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#x624D;&#x771F;&#x6B63;&#x7684;&#x6267;&#x884C;&#x4E86;<code>compose</code>&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x628A;<code>ctx</code>&#x4F20;&#x8FDB;&#x53BB;&#x3002;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x770B;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;<code>fnMiddleware(ctx)</code>&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (context, next) {
  // &#x8BBE;&#x7F6E;&#x4E86;&#x4E00;&#x4E2A;&#x51FA;&#x4E8B;&#x7D22;&#x5F15;&#x503C;
  let index = -1
  // &#x8C03;&#x7528;dispatch&#x51FD;&#x6570;&#xFF0C;&#x5F00;&#x59CB;&#x65F6;&#x5019;&#x4F20;0&#x8FDB;&#x53BB;
  return dispatch(0) 

  // &#x58F0;&#x660E;dispatch&#x51FD;&#x6570;&#xFF0C;
  function dispatch (i) {
    // &#x628A;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x8D4B;&#x503C;&#x7ED9;index
    index = i
    // &#x62FF;&#x51FA;middleware&#x7B2C;i&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;fn
    let fn = middleware[i] 
    // &#x5224;&#x65AD;&#x5982;&#x679C;i &#x7B49;&#x4E8E;middleware&#x7684;&#x957F;&#x5EA6; &#x5C31;&#x628A;next &#x8D4B;&#x503C;&#x7ED9; fn
    if (i === middleware.length) fn = next
    // &#x5982;&#x679C;fn&#x662F;&#x5047;&#x7684; return return Promise.resolve()
    if (!fn) return Promise.resolve()
    try {
      // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise.resolve, &#x540C;&#x65F6;&#x6267;&#x884C;fn&#xFF0C; &#x4E5F;&#x5C31;&#x662F;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x628A;next &#x51FD;&#x6570;&#x4F20;&#x9012;&#x5230;fn&#x91CC;&#x9762; 
      return Promise.resolve(fn(context, function next () {
        // &#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x5DF1;
        return dispatch(i + 1)
      }))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E86;&#x4E00;&#x4E2A;&#x51FA;&#x4E8B;&#x7D22;&#x5F15;&#x503C;</span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
  <span class="hljs-comment">// &#x8C03;&#x7528;dispatch&#x51FD;&#x6570;&#xFF0C;&#x5F00;&#x59CB;&#x65F6;&#x5019;&#x4F20;0&#x8FDB;&#x53BB;</span>
  <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>) 

  <span class="hljs-comment">// &#x58F0;&#x660E;dispatch&#x51FD;&#x6570;&#xFF0C;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
    <span class="hljs-comment">// &#x628A;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x8D4B;&#x503C;&#x7ED9;index</span>
    index = i
    <span class="hljs-comment">// &#x62FF;&#x51FA;middleware&#x7B2C;i&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;fn</span>
    <span class="hljs-keyword">let</span> fn = middleware[i] 
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x5982;&#x679C;i &#x7B49;&#x4E8E;middleware&#x7684;&#x957F;&#x5EA6; &#x5C31;&#x628A;next &#x8D4B;&#x503C;&#x7ED9; fn</span>
    <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
    <span class="hljs-comment">// &#x5982;&#x679C;fn&#x662F;&#x5047;&#x7684; return return Promise.resolve()</span>
    <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise.resolve, &#x540C;&#x65F6;&#x6267;&#x884C;fn&#xFF0C; &#x4E5F;&#x5C31;&#x662F;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x628A;next &#x51FD;&#x6570;&#x4F20;&#x9012;&#x5230;fn&#x91CC;&#x9762; </span>
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x5DF1;</span>
        <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
      }))
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
    }
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x8FD9;&#x4E2A;&#x90E8;&#x5206;&#x7684;&#x7CBE;&#x534E;&#x3002;&#x8FD9;&#x91CC;&#x8BE6;&#x7EC6;&#x7684;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;&#x9996;&#x5148;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;<code>index</code>&#x548C;<code>dispatch</code>&#x51FD;&#x6570;&#xFF0C; &#x7136;&#x540E;&#x4E00;&#x5F00;&#x59CB;&#x8C03;&#x7528;<code>dispatch(0)</code>&#x51FD;&#x6570;&#xFF0C;&#x91CC;&#x9762;&#x628A;0&#x8D4B;&#x503C;&#x7ED9;&#x4E86;<code>index</code>&#xFF0C;&#x7136;&#x540E;&#x4ECE;<code>middleware</code>&#x7684;&#x6570;&#x7EC4;&#xFF08;&#x4F8B;&#x5B50;&#x4E2D;&#x6211;&#x4EEC;&#x6709;&#x4E09;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF09;&#x4E2D;&#x62FF;&#x5230;&#x7B2C;<code>0</code>&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;<code>fn</code>&#xFF0C;&#x7ECF;&#x8FC7;&#x4E24;&#x4E2A;<code>if</code>&#x90FD;&#x4E0D;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Promise.resolve(fn(context, function next () {
    // &#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x5DF1;
    return dispatch(i + 1)
  }))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x5DF1;</span>
    <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
  }))</code></pre><p>&#x8FD9;&#x91CC;&#x7684;&#x6267;&#x884C;<code>fn</code> &#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x628A;<code>ctx</code>&#x548C; <code>function next () { return dispatch(i + 1) })</code>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#x4E00;&#x5E55;&#x4E86;&#x7136;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) =&gt; {
  console.log(&apos;fn1-1&apos;)
  next() // &#x6267;&#x884C;&#x4F20;&#x5165;&#x7684;next
  console.log(&apos;fn1-2&apos;)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>app.use(async (ctx, <span class="hljs-keyword">next</span>) =&gt; {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;fn1-1&apos;</span>)
  <span class="hljs-keyword">next</span>() // &#x6267;&#x884C;&#x4F20;&#x5165;&#x7684;<span class="hljs-keyword">next</span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;fn1-2&apos;</span>)
})
</code></pre><p>&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570; &#x5C31;&#x4F1A;&#x6253;&#x5370;&#x51FA;<code>fn1-1</code> &#x7136;&#x540E;&#x5C31;&#x4F1A;&#x6267;&#x884C;<code>next()</code>&#x51FD;&#x6570;&#xFF0C;&#x770B;<code>&#x4E0A;&#x4E0A;&#x4E00;&#x5757;&#x4EE3;&#x7801;</code>&#xFF0C;&#x6267;&#x884C;<code>next()</code>&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F1A;&#x8C03;&#x7528; <code>dispatch(i + 1)</code>&#x4E5F;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x7B2C;<code>fn = middleware[1]</code>&#x6B63;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;</p><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#x5927;&#x5BB6;&#x5C31;&#x5927;&#x6982;&#x660E;&#x767D;&#x4E86;&#x3002;&#x7136;&#x540E;&#x8FDB;&#x5165;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;<code>fn</code>&#xFF0C;&#x6253;&#x5370;&#x51FA;<code>fn2-1</code>&#xFF0C;&#x7EE7;&#x7EED;&#x6267;&#x884C;<code>next()</code>&#x51FD;&#x6570;&#xFF0C;next&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7EE7;&#x7EED;&#x8C03;&#x7528; <code>dispatch(i + 1)</code>&#xFF0C;</p><p>&#x4E5F;&#x5C31;&#x662F;<code>fn = middleware[2]</code> &#x7B2C;&#x4E09;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x6253;&#x5370;&#x51FA;<code>fn3-1</code>&#xFF0C;&#x7EE7;&#x7EED;&#x6267;&#x884C;<code>next()</code>&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F1A;&#x8C03;&#x7528; <code>dispatch(i + 1)</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>fn = middleware[3]</code>&#xFF0C;</p><p>&#x8FD9;&#x91CC;&#x6CE8;&#x610F;&#x4E86;&#xFF0C;<code>if (i === middleware.length) fn = next</code>&#x5230;&#x8FD9;&#x91CC;&#x4F1A;&#x7B26;&#x5408;&#x8FD9;&#x4E2A;&#x6761;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x628A;<code>next</code>&#x8D4B;&#x503C;&#x7ED9;<code>fn</code>&#x8FD9;&#x91CC;&#x7684;<code>next</code>&#x5C31;&#x662F;&#x8FD9;&#x4E2A;<code>fnMiddleware(ctx).then(handleResponse).catch(onerror);</code>&#x8C03;&#x7528;&#x65F6;&#x5019;&#x4F20;&#x5165;&#x7684;&#xFF0C;&#x7136;&#x800C;&#x8FD9;&#x91CC;&#x5E76;&#x6CA1;&#x6709;&#x4F20;&#x5165;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x65F6;&#x5019; <code>fn</code>&#x5C31;&#x662F; <code>undefined</code>&#xFF0C;&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x5230;<code>if (!fn) return Promise.resolve()</code>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x7B2C;&#x4E09;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>next</code>&#x6267;&#x884C;&#x7ED3;&#x679C;&#xFF0C;</p><p>&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x884C;&#x5C31;&#x6253;&#x5370;&#x51FA;&#x4E86;<code>fn3-2</code>&#xFF0C;&#x6700;&#x540E;&#x5411;&#x4E0A;&#x6267;&#x884C;&#x5230;<code>fn2-2</code>&#xFF0C;&#x7136;&#x540E;&#x5230;<code>fn1-2</code>, &#x6574;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x3002;&#x5F88;&#x50CF;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#xFF0C;&#x4E00;&#x5C42;&#x5C42;&#x8FDB;&#x5165;&#xFF0C;&#x7136;&#x540E;&#x4E00;&#x5C42;&#x5C42;&#x51FA;&#x6765;&#x3002;</p><p>&#x597D;&#x4E86;&#x6574;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x9171;&#x7D2B;&#x5566;~~~</p><p>&#x6700;&#x540E;&#x5B89;&#x5229;&#x4E00;&#x6CE2;&#x535A;&#x5BA2;&#xFF1A; <a href="https://github.com/naihe138/naice-blog" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/naihe138/naice-blog" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/n...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步步去阅读koa源码，中间件执行原理

## 原文链接
[https://segmentfault.com/a/1190000015294318](https://segmentfault.com/a/1190000015294318)


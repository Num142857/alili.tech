---
title: '如何阅读源码--Koa为例' 
date: 2018-12-17 2:30:06
hidden: true
slug: t8xbodgfdpr
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一年零零散散看了不少开源项目的源码, 多少也有点心得, 这里想通过这篇文章总结一下, 这里以Koa为例, 前段时间其实看过Koa的源码, 但是发现理解的有点偏差, 所以重新过一遍.</p>
<p>不得不说阅读tj的代码真的收获很大, 没啥奇技淫巧, 代码优雅, 设计极好. 注释什么的就更不用说了. 总之还是推荐把他的项目都过一遍(逃)</p>
<h2 id="articleHeader0">跑通例子</h2>
<p>Koa作为一个web框架, 我们要去阅读它的源码肯定是得知道它的用法, Koa的文档也很简单, 它一开始就提供了一个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

app.use(<span class="hljs-keyword">async</span> ctx =&gt; {
  ctx.body = <span class="hljs-string">'Hello World'</span>;
});

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>这是启动最基本的的web服务, 这个跑起来没啥问题. </p>
<p>同样, 文档也提供了作为Koa的核心卖点的中间件的基本用法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

<span class="hljs-comment">// x-response-time</span>

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">await</span> next();
  <span class="hljs-keyword">const</span> ms = <span class="hljs-built_in">Date</span>.now() - start;
  ctx.set(<span class="hljs-string">'X-Response-Time'</span>, <span class="hljs-string">`<span class="hljs-subst">${ms}</span>ms`</span>);
});

<span class="hljs-comment">// logger</span>

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">await</span> next();
  <span class="hljs-keyword">const</span> ms = <span class="hljs-built_in">Date</span>.now() - start;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.method}</span> <span class="hljs-subst">${ctx.url}</span> - <span class="hljs-subst">${ms}</span>`</span>);
});

<span class="hljs-comment">// response</span>

app.use(<span class="hljs-keyword">async</span> ctx =&gt; {
  ctx.body = <span class="hljs-string">'Hello World'</span>;
});

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>上面代码可能跟我们之前写的js代码常识不太符合了,  因为async/await会暂停作案现场, 类似同步. 也就是碰到<code>await next</code>, 代码会跳出当前中间件, 执行下一个, 最终还回原路返回, 依次执行<code>await next</code>下面的代码, 当然这只是一个表述而已, 实际就是一个递归返回Promise, 后面会提到.</p>
<h2 id="articleHeader1">阅读目标</h2>
<p>好了. 我们知道Koa怎么用了, 那对于这个框架我们想知道什么呢. 先看一下源码的目录结构好了:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012909012?w=244&amp;h=725" src="https://static.alili.tech/img/remote/1460000012909012?w=244&amp;h=725" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>注意这个<code>compose.js</code>是我为了方便修改源码拉过来的, 其实它是额外的一个包.</p>
<p><code>application.js</code> 作为入口文件肯定是个构造函数<br><code>context.js</code> 就是<code>ctx</code>咯<br><code>request.js</code> <br><code>response.js</code></p>
<p>那我们读源码总需要一个目标吧, 这篇文章里我们假定目标就是弄懂<strong>Koa的中间件原理</strong>好了</p>
<h2 id="articleHeader2">分析执行流程</h2>
<p>好, 目标也有了, 下面正式进入源码阅读状态. 我们以最简单的示例代码作为入口来切入Koa的执行过程:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = new Koa();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();</code></pre>
<p>上面我们可以看到Koa是作为构造函数引用的, 那么我们来看看入口文件<code>Application.js</code> 导出了个啥:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = class Application extends Emitter { 
 // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Emitter</span> </span>{ 
 <span class="hljs-comment">// ...</span>
}</code></pre>
<p>毫无疑问是可以对应上的, 导出了一个类.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async ctx => {
  ctx.body = 'Hello World';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-keyword">async</span> ctx =&gt; {
  ctx.body = <span class="hljs-string">'Hello World'</span>;
});</code></pre>
<p>看上面的东西似乎进入正题了, 我们知道use就是引用了一个中间件, 那来看看use是个啥玩意:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use(fn) {
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
      </div><pre class="javascript hljs"><code class="js">use(fn) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'middleware must be a function!'</span>);
    <span class="hljs-keyword">if</span> (isGeneratorFunction(fn)) {
      deprecate(<span class="hljs-string">'Support for generators will be removed in v3. '</span> +
                <span class="hljs-string">'See the documentation for examples of how to convert old middleware '</span> +
                <span class="hljs-string">'https://github.com/koajs/koa/blob/master/docs/migration.md'</span>);
      fn = convert(fn);
    }
    debug(<span class="hljs-string">'use %s'</span>, fn._name || fn.name || <span class="hljs-string">'-'</span>);
    <span class="hljs-keyword">this</span>.middleware.push(fn);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }</code></pre>
<p>太长太臭, 精简一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use(fn) {
    this.middleware.push(fn);
    return this;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">use(fn) {
    <span class="hljs-keyword">this</span>.middleware.push(fn);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }</code></pre>
<p>emm 这下就很清楚了, 就是维护了一个中间件数组<code>middleware</code>, 到这里不要忘了我们的目标: Koa的中间件原理, 既然找到这个中间件数组了, 我们就来看看它是怎么被调用的吧. 全局搜一下, 我们发现其实就一个方法里用到了<code>middleware</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  callback() {
    <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middleware);

    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.listeners(<span class="hljs-string">'error'</span>).length) <span class="hljs-keyword">this</span>.on(<span class="hljs-string">'error'</span>, <span class="hljs-keyword">this</span>.onerror);

    <span class="hljs-keyword">const</span> handleRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handleRequest(ctx, fn);
    };

    <span class="hljs-keyword">return</span> handleRequest;
  }
</code></pre>
<p>上面的代码可以看到, 似乎有一个<code>compose</code>对middleware进行处理了, 我们好像离真相越来越近了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose (middleware) {

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
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
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{

  <span class="hljs-comment">/**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */</span>

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-comment">// last called middleware #</span>
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
</code></pre>
<h2 id="articleHeader3">删除边界条件, 错误处理</h2>
<p><code>compose.js</code>的代码很短, 但是还是嫌长怎么办, 之前有文章提到的, 删除边界条件和异常处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose (middleware) {

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      index = i
      let fn = middleware[i]
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{

  <span class="hljs-comment">/**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */</span>

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      index = i
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
    }
  }
}</code></pre>
<p>这么一看就清晰多了, 不就是一个递归遍历<code>middleware</code>嘛. 似乎跟express有点像.</p>
<h2 id="articleHeader4">猜想结论</h2>
<p>大胆假设嘛, 前面提到了, await 会暂停执行, 那<code>await next</code> 似乎暂停的就是这里, 然后不断递归调用中间件, 然后递归中断了, 代码又从一个个的promise里退出来, 似乎这样就很洋葱了.</p>
<p>emm 到底是不是这样呢, 我也不知道. 比较还想再水一篇文章呢.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012909013?w=897&amp;h=626" src="https://static.alili.tech/img/remote/1460000012909013?w=897&amp;h=626" alt="image" title="image" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何阅读源码--Koa为例

## 原文链接
[https://segmentfault.com/a/1190000012909006](https://segmentfault.com/a/1190000012909006)


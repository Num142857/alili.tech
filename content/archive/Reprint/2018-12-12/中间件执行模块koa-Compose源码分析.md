---
title: '中间件执行模块koa-Compose源码分析' 
date: 2018-12-12 2:30:10
hidden: true
slug: yabu1mwxhho
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文博客地址，欢迎学习交流：<a href="http://blog.fetoutiao.com/2018/02/28/%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%89%A7%E8%A1%8C%E6%A8%A1%E5%9D%97koa-Compose%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/" rel="nofollow noreferrer" target="_blank">点击预览</a>
</blockquote>
<p>读了下Koa的源码，写的相当的精简，遇到处理中间件执行的模块<strong>koa-Compose</strong>,决定学习一下这个模块的源码。</p>
<p>阅读本文可以学到：</p>
<ul>
<li>Koa中间件的加载</li>
<li>next参数的来源</li>
<li>中间件控制权执行顺序</li>
</ul>
<p>先上一段使用Koa启动服务的代码：<br>放在文件<strong>app.js</strong>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const koa = require('koa');  // require引入koa模块
const app = new koa();    // 创建对象
app.use(async (ctx,next) => {
    console.log('第一个中间件')
    next();
})
app.use(async (ctx,next) => {
    console.log('第二个中间件')
    next();
})

app.use((ctx,next) => {
    console.log('第三个中间件')
    next();
})

app.use(ctx => {
    console.log('准备响应');
    ctx.body = 'hello'
})

app.listen(3000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);  <span class="hljs-comment">// require引入koa模块</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> koa();    <span class="hljs-comment">// 创建对象</span>
app.use(<span class="hljs-keyword">async</span> (ctx,next) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个中间件'</span>)
    next();
})
app.use(<span class="hljs-keyword">async</span> (ctx,next) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个中间件'</span>)
    next();
})

app.use(<span class="hljs-function">(<span class="hljs-params">ctx,next</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个中间件'</span>)
    next();
})

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'准备响应'</span>);
    ctx.body = <span class="hljs-string">'hello'</span>
})

app.listen(<span class="hljs-number">3000</span>)</code></pre>
<p>以上代码，可以使用<strong>node app.js</strong>启动，启动后可以在浏览器中访问<strong><a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/</strong><br>访问后，会在启动的命令窗口中打印出如下值：</p>
<blockquote>第一个中间件<br>第二个中间件<br>第三个中间件<br>准备响应</blockquote>
<p>代码说明：</p>
<ul>
<li>
<strong>app.use()</strong>方法,用来将中间件添加到队列中</li>
<li>中间件就是传给<strong>app.use()</strong>作为的参数的函数</li>
<li>使用<strong>app.use()</strong>将函数添加至队列之中后，当有请求时，会依次触发队列中的函数，也就是依次执行一个个中间件函数,执行顺序按照调用<strong>app.use()</strong>添加的顺序。</li>
<li>在每个中间件函数中，会执行<strong>next()</strong>函数，意思是把控制权交到下一个中间件（实际上是调用next函数后，会调用下一个中间件函数，后面解析源码会有说明），如果不调用<strong>next()</strong>函数，不能调用下一个中间件函数，那么队列执行也就终止了，在上面的代码中表现就是不能响应客户端的请求了。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx,next) => {
    console.log('第二个中间件')
    // next(); 注释之后，下一个中间件函数就不会执行
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>app.use(async (ctx,<span class="hljs-keyword">next</span>) =&gt; {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'第二个中间件'</span>)
    // <span class="hljs-keyword">next</span>()<span class="hljs-comment">; 注释之后，下一个中间件函数就不会执行</span>
})</code></pre>
<h2 id="articleHeader0">内部过程分析</h2>
<ul><li>内部利用<strong>app.use()</strong>添加到一个数组队列中：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.use()函数内部添加
this.middleware.push(fn);
// 最终this.middleware为：
this.middleware = [fn,fn,fn...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// app.use()函数内部添加</span>
this.middleware.<span class="hljs-keyword">push</span>(<span class="hljs-function"><span class="hljs-keyword">fn</span>)</span>;
<span class="hljs-comment">// 最终this.middleware为：</span>
this.middleware = [<span class="hljs-function"><span class="hljs-keyword">fn</span>,<span class="hljs-keyword">fn</span>,<span class="hljs-keyword">fn</span>...]</span></code></pre>
<p><em>具体参考这里Koa的源码use函数：<a href="https://github.com/koajs/koa/blob/master/lib/application.js#L104" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/koa/blob/master/lib/application.js#L104</a></em></p>
<ul><li>使用<strong>koa-compose</strong>模块的<strong>compose</strong>方法，把这个中间件数组合并成一个大的中间件函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fn = compose(this.middleware);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> = <span class="hljs-title">compose</span></span>(this.middleware);</code></pre>
<p><em>具体参考这里Koa的源码<a href="https://github.com/koajs/koa/blob/master/lib/application.js#L126" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/koa/blob/master/lib/application.js#L126</a></em></p>
<ul><li>在有请求后后会执行这个中间件函数<strong>fn</strong>，进而会把所有的中间件函数依次执行</li></ul>
<blockquote>这样片面的描述可能会不知所云，可以跳过不看，只是让诸位知道Koa执行中间件的过程<br>本篇主要是分析<strong>koa-compose</strong>的源码，之后分析整个Koa的源码后会做详细说明</blockquote>
<p>所以最主要的还是使用<strong>koa-compose</strong>模块来控制中间件的执行，那么来一探究竟这个模块如何进行工作的</p>
<h2 id="articleHeader1">koa-compose</h2>
<p><strong>koa-compose</strong>模块可以将多个中间件函数合并成一个大的中间件函数，然后调用这个中间件函数就可以依次执行添加的中间件函数，执行一系列的任务。</p>
<p>源码地址：<a href="https://github.com/koajs/compose/blob/master/index.js" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/compose/blob/master/index.js</a></p>
<p>先从一段代码开始，创建一个<strong>compose.js</strong>的文件，写入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = require('koa-compose');

function one(ctx,next){
    console.log('第一个');
    next(); // 控制权交到下一个中间件（实际上是可以执行下一个函数），
}
function two(ctx,next){
    console.log('第二个');
    next();
}
function three(ctx,next){
    console.log('第三个');
    next();
}
// 传入中间件函数组成的数组队列，合并成一个中间件函数
const middlewares = compose([one, two, three]);
// 执行中间件函数,函数执行后返回的是Promise对象
middlewares().then(function (){
    console.log('队列执行完毕');    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> compose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-compose'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">one</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个'</span>);
    next(); <span class="hljs-comment">// 控制权交到下一个中间件（实际上是可以执行下一个函数），</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">two</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个'</span>);
    next();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">three</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个'</span>);
    next();
}
<span class="hljs-comment">// 传入中间件函数组成的数组队列，合并成一个中间件函数</span>
<span class="hljs-keyword">const</span> middlewares = compose([one, two, three]);
<span class="hljs-comment">// 执行中间件函数,函数执行后返回的是Promise对象</span>
middlewares().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'队列执行完毕'</span>);    
})</code></pre>
<p>可以使用<strong>node compose.js</strong>运行此文件，命令行窗口打印出：</p>
<blockquote>第一个<br>第二个<br>第三个<br>队列执行完毕</blockquote>
<p>中间件这儿的重点，是<strong>compose</strong>函数。<strong>compose</strong>函数的源代码虽然很简洁，但要理解明白着实要下一番功夫。<br>以下为源码分析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

'use strict'

/**
 * Expose compositor.
 */
// 暴露compose函数
module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
// compose函数需要传入一个数组队列 [fn,fn,fn,fn]
function compose (middleware) {
  // 如果传入的不是数组，则抛出错误
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  // 数组队列中有一项不为函数，则抛出错误
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

   // compose函数调用后，返回的是以下这个匿名函数
   // 匿名函数接收两个参数，第一个随便传入，根据使用场景决定
   // 第一次调用时候第二个参数next实际上是一个undefined，因为初次调用并不需要传入next参数
   // 这个匿名函数返回一个promise
  return function (context, next) {
    // last called middleware #
    //初始下标为-1
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      // 如果传入i为负数且<=-1 返回一个Promise.reject携带着错误信息
      // 所以执行两次next会报出这个错误。将状态rejected，就是确保在一个中间件中next只调用一次
      

      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      // 执行一遍next之后,这个index值将改变
      index = i
      // 根据下标取出一个中间件函数
      let fn = middleware[i]
      // next在这个内部中是一个局部变量，值为undefined
      // 当i已经是数组的length了，说明中间件函数都执行结束，执行结束后把fn设置为undefined
      // 问题：本来middleware[i]如果i为length的话取到的值已经是undefined了，为什么要重新给fn设置为undefined呢？
      if (i === middleware.length) fn = next

      //如果中间件遍历到最后了。那么。此时return Promise.resolve()返回一个成功状态的promise
      // 方面之后做调用then
      if (!fn) return Promise.resolve()

      // try catch保证错误在Promise的情况下能够正常被捕获。

      // 调用后依然返回一个成功的状态的Promise对象
      // 用Promise包裹中间件，方便await调用
      // 调用中间件函数，传入context（根据场景不同可以传入不同的值，在KOa传入的是ctx）
      // 第二个参数是一个next函数，可在中间件函数中调用这个函数
      // 调用next函数后，递归调用dispatch函数，目的是执行下一个中间件函数
      // next函数在中间件函数调用后返回的是一个promise对象
      // 读到这里不得不佩服作者的高明之处。
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="javascript"><span class="hljs-meta">'use strict'</span>

<span class="hljs-comment">/**
 * Expose compositor.
 */</span>
<span class="hljs-comment">// 暴露compose函数</span>
<span class="hljs-built_in">module</span>.exports = compose

<span class="hljs-comment">/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */</span>
<span class="hljs-comment">// compose函数需要传入一个数组队列 [fn,fn,fn,fn]</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{
  <span class="hljs-comment">// 如果传入的不是数组，则抛出错误</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(middleware)) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Middleware stack must be an array!'</span>)
  <span class="hljs-comment">// 数组队列中有一项不为函数，则抛出错误</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> fn <span class="hljs-keyword">of</span> middleware) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Middleware must be composed of functions!'</span>)
  }

  <span class="hljs-comment">/**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */</span>

   <span class="hljs-comment">// compose函数调用后，返回的是以下这个匿名函数</span>
   <span class="hljs-comment">// 匿名函数接收两个参数，第一个随便传入，根据使用场景决定</span>
   <span class="hljs-comment">// 第一次调用时候第二个参数next实际上是一个undefined，因为初次调用并不需要传入next参数</span>
   <span class="hljs-comment">// 这个匿名函数返回一个promise</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-comment">// last called middleware #</span>
    <span class="hljs-comment">//初始下标为-1</span>
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      <span class="hljs-comment">// 如果传入i为负数且&lt;=-1 返回一个Promise.reject携带着错误信息</span>
      <span class="hljs-comment">// 所以执行两次next会报出这个错误。将状态rejected，就是确保在一个中间件中next只调用一次</span>
      

      <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'next() called multiple times'</span>))
      <span class="hljs-comment">// 执行一遍next之后,这个index值将改变</span>
      index = i
      <span class="hljs-comment">// 根据下标取出一个中间件函数</span>
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-comment">// next在这个内部中是一个局部变量，值为undefined</span>
      <span class="hljs-comment">// 当i已经是数组的length了，说明中间件函数都执行结束，执行结束后把fn设置为undefined</span>
      <span class="hljs-comment">// 问题：本来middleware[i]如果i为length的话取到的值已经是undefined了，为什么要重新给fn设置为undefined呢？</span>
      <span class="hljs-keyword">if</span> (i === middleware.length) fn = next

      <span class="hljs-comment">//如果中间件遍历到最后了。那么。此时return Promise.resolve()返回一个成功状态的promise</span>
      <span class="hljs-comment">// 方面之后做调用then</span>
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()

      <span class="hljs-comment">// try catch保证错误在Promise的情况下能够正常被捕获。</span>

      <span class="hljs-comment">// 调用后依然返回一个成功的状态的Promise对象</span>
      <span class="hljs-comment">// 用Promise包裹中间件，方便await调用</span>
      <span class="hljs-comment">// 调用中间件函数，传入context（根据场景不同可以传入不同的值，在KOa传入的是ctx）</span>
      <span class="hljs-comment">// 第二个参数是一个next函数，可在中间件函数中调用这个函数</span>
      <span class="hljs-comment">// 调用next函数后，递归调用dispatch函数，目的是执行下一个中间件函数</span>
      <span class="hljs-comment">// next函数在中间件函数调用后返回的是一个promise对象</span>
      <span class="hljs-comment">// 读到这里不得不佩服作者的高明之处。</span>
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
      }
    }
  }
}</span></code></pre>
<p>补充说明：</p>
<ul><li>根据以上的源码分析得到，在一个中间件函数中不能调用两次<strong>next()</strong>，否则会抛出错误</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function one(ctx,next){
    console.log('第一个');
    next();
    next();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">one</span><span class="hljs-params">(ctx,next)</span></span>{
    console.log(<span class="hljs-string">'第一个'</span>);
    <span class="hljs-built_in">next</span>();
    <span class="hljs-built_in">next</span>();
}</code></pre>
<p>抛出错误：</p>
<blockquote>next() called multiple times</blockquote>
<ul><li>
<strong>next()</strong>调用后返回的是一个Promise对象，可以调用then函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function two(ctx,next){
    console.log('第二个');
    next().then(function(){
        console.log('第二个调用then后')
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">two</span><span class="hljs-params">(ctx,next)</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'第二个'</span>);
    next().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'第二个调用then后'</span>)
    });
}</code></pre>
<ul><li>中间件函数可以是async/await函数，在函数内部可以写任意的异步处理，处理得到结果后再进行下一个中间件函数。</li></ul>
<p>创建一个文件问test-async.js,写入以下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = require('koa-compose');

// 获取数据
const getData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('得到数据'), 2000);
});

async function one(ctx,next){
    console.log('第一个，等待两秒后再进行下一个中间件');
    // 模拟异步读取数据库数据
    await getData()  // 等到获取数据后继续执行下一个中间件
    next()
}
function two(ctx,next){
    console.log('第二个');
    next()
}
function three(ctx,next){
    console.log('第三个');
    next();
}

const middlewares = compose([one, two, three]);

middlewares().then(function (){
    console.log('队列执行完毕');    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> compose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-compose'</span>);

<span class="hljs-comment">// 获取数据</span>
<span class="hljs-keyword">const</span> getData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'得到数据'</span>), <span class="hljs-number">2000</span>);
});

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">one</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个，等待两秒后再进行下一个中间件'</span>);
    <span class="hljs-comment">// 模拟异步读取数据库数据</span>
    <span class="hljs-keyword">await</span> getData()  <span class="hljs-comment">// 等到获取数据后继续执行下一个中间件</span>
    next()
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">two</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个'</span>);
    next()
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">three</span>(<span class="hljs-params">ctx,next</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第三个'</span>);
    next();
}

<span class="hljs-keyword">const</span> middlewares = compose([one, two, three]);

middlewares().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'队列执行完毕'</span>);    
})</code></pre>
<p>可以使用<strong>node test-async.js</strong>运行此文件，命令行窗口打印出：</p>
<blockquote>第一个，等待两秒后再进行下一个中间件<br>第二个<br>第三个<br>第二个调用then后<br>队列执行完毕</blockquote>
<p>在以上打印输出过程中，执行第一个中间件后，在内部会有一个异步操作，使用了async/await后得到同步操作一样的体验，这步操作可能是读取数据库数据或者读取文件，读取数据后，调用<strong>next()</strong>执行下一个中间件。这里模拟式等待2秒后再执行下一个中间件。</p>
<blockquote>更多参考了async/await：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await</a>
</blockquote>
<h2 id="articleHeader2">执行顺序</h2>
<p>调用next后，执行的顺序会让人产生迷惑，创建文件为<strong>text-next.js</strong>，写入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const koa = require('koa');
const app = new koa();
app.use((ctx, next) => {
  console.log('第一个中间件函数')
  next();
  console.log('第一个中间件函数next之后');
})
app.use(async (ctx, next) => {
  console.log('第二个中间件函数')
  next();
  console.log('第二个中间件函数next之后');
})
app.use(ctx => {
  console.log('响应');
  ctx.body = 'hello'
})

app.listen(3000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> koa();
app.use(<span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个中间件函数'</span>)
  next();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一个中间件函数next之后'</span>);
})
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个中间件函数'</span>)
  next();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二个中间件函数next之后'</span>);
})
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'响应'</span>);
  ctx.body = <span class="hljs-string">'hello'</span>
})

app.listen(<span class="hljs-number">3000</span>)
</code></pre>
<p>以上代码，可以使用<strong>node text-next.js</strong>启动，启动后可以在浏览器中访问<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/ <br>访问后，会在启动的命令窗口中打印出如下值：</p>
<blockquote>第一个中间件函数<br>第二个中间件函数<br>响应<br>第二个中间件函数next之后<br>第一个中间件函数next之后</blockquote>
<p>是不是对这个顺序产生了深深地疑问，为什么会这样呢？</p>
<p>当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。<br>过程是这样的：</p>
<ul>
<li>先执行第一个中间件函数，打印出 '第一个中间件函数'</li>
<li>调用了next，不再继续向下执行</li>
<li>执行第二个中间件函数，打印出 '第二个中间件函数'</li>
<li>调用了next，不再继续向下执行</li>
<li>执行最后一个中间件函数，打印出 '响应'</li>
<li>...</li>
<li>最后一个中间函数执行后，上一个中间件函数收回控制权，继续执行，打印出 '第二个中间件函数next之后'</li>
<li>第二个中间件函数执行后，上一个中间件函数收回控制权，继续执行，打印出 '第一个中间件函数next之后'</li>
</ul>
<p>借用一张图来直观的说明：<br><span class="img-wrap"><img data-src="/img/bV4AlJ?w=1883&amp;h=731" src="https://static.alili.tech/img/bV4AlJ?w=1883&amp;h=731" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体看别人怎么理解next的顺序：<a href="https://segmentfault.com/q/1010000011033764">https://segmentfault.com/q/1010000011033764</a></p>
<p>最近在看Koa的源码，以上属于个人理解，如有偏差欢迎指正学习，谢谢。</p>
<p>参考资料：<a href="https://koa.bootcss.com/" rel="nofollow noreferrer" target="_blank">https://koa.bootcss.com/</a><br><a href="https://cnodejs.org/topic/58fd8ec7523b9d0956dad945" rel="nofollow noreferrer" target="_blank">https://cnodejs.org/topic/58fd8ec7523b9d0956dad945</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
中间件执行模块koa-Compose源码分析

## 原文链接
[https://segmentfault.com/a/1190000013447551](https://segmentfault.com/a/1190000013447551)


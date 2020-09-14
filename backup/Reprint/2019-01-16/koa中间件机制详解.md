---
title: 'koa中间件机制详解' 
date: 2019-01-16 2:30:08
hidden: true
slug: zne1p0oahf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">koa</h2>
<blockquote><p><code>koa</code>是由<code>express</code>原班人马打造的一个更小、更富有表现力、更健壮的<code>web</code>框架。</p></blockquote>
<p>在我眼中，<code>koa</code>的确是比<code>express</code>轻量的多，<code>koa</code>给我的感觉更像是一个中间件框架，<code>koa</code>只是一个基础的架子，需要用到的相应的功能时，用相应的中间件来实现就好，诸如路由系统等。一个更好的点在于，<code>express</code>是基于回调来处理，至于回调到底有多么的不好，大家可以自行搜索来看。<code>koa1</code>基于的<code>co</code>库，所以<code>koa1</code>利用<code>Generator</code>来代替回调，而<code>koa2</code>由于<code>node</code>对<code>async/await</code>的支持，所以<code>koa2</code>利用的是<code>async/await</code>。关于<code>async</code>以及<code>co</code>库等，大家可以参考我之前写过的一篇文章（<a href="https://segmentfault.com/a/1190000008687414">理解async</a>）。<code>koa</code>可以说是一个各种中间件的架子，下面就来看一下<code>koa</code>对于中间件部分的实现：</p>
<h2 id="articleHeader1">koa1的中间件</h2>
<p><code>koa1</code>主要利用的是<code>Generator</code>来实现，一般来说，<code>koa1</code>的一个中间件大概是长这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function *(next){
    console.log(1);
    yield next;
    console.log(5);
});
app.use(function *(next){
    console.log(2);
    yield next;
    console.log(4);
});
app.use(function *(){
    console.log(3);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-params">(next)</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">1</span>);
    yield next;
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">5</span>);
});
app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-params">(next)</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);
    yield next;
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">4</span>);
});
app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-params">()</span>{</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-number">3</span>);
});</code></pre>
<p>这样的输出会是<code>1, 2, 3, 4, 5</code>，<code>koa</code>的中间件的实现主要依靠的是<code>koa-compose</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose(middleware){
  return function *(next){
    if (!next) next = noop();

    var i = middleware.length;
    // 组合中间件
    while (i--) {
      next = middleware[i].call(this, next);
    }

    return yield *next;
  }
}
function *noop(){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params">middleware</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">next</span>)</span>{
    <span class="hljs-keyword">if</span> (!next) next = noop();

    <span class="hljs-keyword">var</span> i = middleware.length;
    <span class="hljs-comment">// 组合中间件</span>
    <span class="hljs-keyword">while</span> (i--) {
      next = middleware[i].call(<span class="hljs-keyword">this</span>, next);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> *next;
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">noop</span>(<span class="hljs-params"></span>)</span>{}</code></pre>
<p>源码非常的简单，实现的功能就是将所有的中间件串联起来，首先给倒数第一个中间件传入一个<code>noop</code>作为其<code>next</code>，再将这个整理后的倒数第一个中间作为<code>next</code>传入倒数第二个中间件，最终得到的<code>next</code>就是整理后的第一个中间件。说起来比较复杂，画图来看：</p>
<p><span class="img-wrap"><img data-src="/img/bVMAtq?w=498&amp;h=349" src="https://static.alili.tech/img/bVMAtq?w=498&amp;h=349" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>实现的效果如同上图，与<code>redux</code>需要实现的目标类似，只要遇到了<code>yield next</code>就去执行下一个中间件，利用<code>co</code>库很容易将这个流程串联起来，下面来简单模拟下，中间件完整的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const middlewares = [];

const getTestMiddWare = (loggerA, loggerB) => {
    return function *(next) {
        console.log(loggerA);
        yield next;
        console.log(loggerB);
    }
};
const mid1 = getTestMiddWare(1, 4),
    mid2 = getTestMiddWare(2, 3);

const getData = new Promise((resolve, reject) => {
    setTimeout(() => resolve('数据已经取出'), 1000);
});

function *response(next) {
    // 模拟异步读取数据库数据
    const data = yield getData;
    console.log(data);
}

middlewares.push(mid1, mid2, response);
// 简单模拟co库
function co(gen) {
    const ctx = this,
        args = Array.prototype.slice.call(arguments, 1);
    return new Promise((reslove, reject) => {
        if (typeof gen === 'function') gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        const baseHandle = handle => res => {
            let ret;
            try {
                ret = gen[handle](res);
            } catch(e) {
                reject(e);
            }
            next(ret);
        };
        const onFulfilled = baseHandle('next'),
            onRejected = baseHandle('throw');
            
        onFulfilled();
        function next(ret) {
            if (ret.done) return reslove(ret.value);
            // 将yield的返回值转换为Proimse
            let value = null;
            if (typeof ret.value.then !== 'function') {
                value = co(ret.value);
            } else {
                value = ret.value;
            }
            if (value) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('yield type error'));
        }
    });
}
// 调用方式
const gen = compose(middlewares);
co(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> middlewares = [];

<span class="hljs-keyword">const</span> getTestMiddWare = <span class="hljs-function">(<span class="hljs-params">loggerA, loggerB</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">next</span>) </span>{
        <span class="hljs-built_in">console</span>.log(loggerA);
        <span class="hljs-keyword">yield</span> next;
        <span class="hljs-built_in">console</span>.log(loggerB);
    }
};
<span class="hljs-keyword">const</span> mid1 = getTestMiddWare(<span class="hljs-number">1</span>, <span class="hljs-number">4</span>),
    mid2 = getTestMiddWare(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);

<span class="hljs-keyword">const</span> getData = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'数据已经取出'</span>), <span class="hljs-number">1000</span>);
});

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">response</span>(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-comment">// 模拟异步读取数据库数据</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">yield</span> getData;
    <span class="hljs-built_in">console</span>.log(data);
}

middlewares.push(mid1, mid2, response);
<span class="hljs-comment">// 简单模拟co库</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">co</span>(<span class="hljs-params">gen</span>) </span>{
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>,
        args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gen === <span class="hljs-string">'function'</span>) gen = gen.apply(ctx, args);
        <span class="hljs-keyword">if</span> (!gen || <span class="hljs-keyword">typeof</span> gen.next !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">return</span> resolve(gen);

        <span class="hljs-keyword">const</span> baseHandle = <span class="hljs-function"><span class="hljs-params">handle</span> =&gt;</span> res =&gt; {
            <span class="hljs-keyword">let</span> ret;
            <span class="hljs-keyword">try</span> {
                ret = gen[handle](res);
            } <span class="hljs-keyword">catch</span>(e) {
                reject(e);
            }
            next(ret);
        };
        <span class="hljs-keyword">const</span> onFulfilled = baseHandle(<span class="hljs-string">'next'</span>),
            onRejected = baseHandle(<span class="hljs-string">'throw'</span>);
            
        onFulfilled();
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">ret</span>) </span>{
            <span class="hljs-keyword">if</span> (ret.done) <span class="hljs-keyword">return</span> reslove(ret.value);
            <span class="hljs-comment">// 将yield的返回值转换为Proimse</span>
            <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> ret.value.then !== <span class="hljs-string">'function'</span>) {
                value = co(ret.value);
            } <span class="hljs-keyword">else</span> {
                value = ret.value;
            }
            <span class="hljs-keyword">if</span> (value) <span class="hljs-keyword">return</span> value.then(onFulfilled, onRejected);
            <span class="hljs-keyword">return</span> onRejected(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'yield type error'</span>));
        }
    });
}
<span class="hljs-comment">// 调用方式</span>
<span class="hljs-keyword">const</span> gen = compose(middlewares);
co(gen);</code></pre>
<h2 id="articleHeader2">koa2的中间件</h2>
<p>随着<code>node</code>对于<code>async/await</code>的支持，貌似不需要再借助于<code>co</code>这种工具库了，直接利用原生的就好，于是<code>koa</code>也做出了改变，来看目前的<code>koa-compose</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose (middleware) {
  // 参数检验
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // 最后一个中间件的调用
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      // 用Promise包裹中间件，方便await调用
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
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span> (<span class="hljs-params">middleware</span>) </span>{
  <span class="hljs-comment">// 参数检验</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-comment">// last called middleware #</span>
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'next() called multiple times'</span>))
      index = i
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-comment">// 最后一个中间件的调用</span>
      <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
      <span class="hljs-comment">// 用Promise包裹中间件，方便await调用</span>
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
      }
    }
  }
}</code></pre>
<p><code>koa-compose</code>利用了<code>Promise</code>，<code>koa2</code>的中间件的参数也有一个变为了两个，而且执行下一个的中间件利用的是<code>await next()</code>，要达到与上面的示例代码的相同效果，需要更改中间件的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const middlewares = [];
const getTestMiddWare = (loggerA, loggerB) => async (ctx, next) => {
    console.log(loggerA);
    await next();
    console.log(loggerB);
};

const mid1 = getTestMiddWare(1, 4),
    mid2 = getTestMiddWare(2, 3);
const response = async () => {
    // 模拟异步读取数据库数据
    const data = await getData();
    console.log(data);
};
const getData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('数据已经取出'), 1000);
});
middlewares.push(mid1, mid2);

// 调用方式
compose(middlewares)(null, response);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> middlewares = [];
<span class="hljs-keyword">const</span> getTestMiddWare = <span class="hljs-function">(<span class="hljs-params">loggerA, loggerB</span>) =&gt;</span> <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
    <span class="hljs-built_in">console</span>.log(loggerA);
    <span class="hljs-keyword">await</span> next();
    <span class="hljs-built_in">console</span>.log(loggerB);
};

<span class="hljs-keyword">const</span> mid1 = getTestMiddWare(<span class="hljs-number">1</span>, <span class="hljs-number">4</span>),
    mid2 = getTestMiddWare(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-comment">// 模拟异步读取数据库数据</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> getData();
    <span class="hljs-built_in">console</span>.log(data);
};
<span class="hljs-keyword">const</span> getData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'数据已经取出'</span>), <span class="hljs-number">1000</span>);
});
middlewares.push(mid1, mid2);

<span class="hljs-comment">// 调用方式</span>
compose(middlewares)(<span class="hljs-literal">null</span>, response);</code></pre>
<h2 id="articleHeader3">如何做到兼容</h2>
<p>可以看到的是，<code>koa1</code>与<code>koa2</code>对于中间件的实现还是有着很多的不同的，将<code>koa1</code>的中间件直接拿到<code>koa2</code>下面来使用肯定是会出现错误的，如何兼容这两个版本也成了一个问题，<code>koa</code>团队写了一个包来是<code>koa1</code>的中间件可以用于<code>koa2</code>中，叫做<code>koa-convert</code>，先来看看这个包怎么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *mid3(next) {
    console.log(2, 'koa1的中间件');
    yield next;
    console.log(3, 'koa1的中间件');
}
convert.compose(mid3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">mid3</span>(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>, <span class="hljs-string">'koa1的中间件'</span>);
    <span class="hljs-keyword">yield</span> next;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>, <span class="hljs-string">'koa1的中间件'</span>);
}
convert.compose(mid3)</code></pre>
<p>来看下这个包实现的思路：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将参数转为数组，对每一个koa1的中间件执行convert操作
convert.compose = function (arr) {
  if (!Array.isArray(arr)) {
    arr = Array.from(arguments)
  }
  return compose(arr.map(convert))
}
// 关键在于convert的实现
const convert = mw => (ctx, next) => {
    // 借助co库，返回一个Promise，同时执行yield
    return co.call(ctx, mw.call(ctx, createGenerator(next)));
};

function * createGenerator (next) {
  /*
     next为koa-compomse中：
     function next () {
         return dispatch(i + 1)
     }
  */
  return yield next()
  // 执行完koa1的中间件，又回到了利用await执行koa2中间件的正轨
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 将参数转为数组，对每一个koa1的中间件执行convert操作</span>
convert.compose = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray(arr)) {
    arr = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>)
  }
  <span class="hljs-keyword">return</span> compose(arr.map(convert))
}
<span class="hljs-comment">// 关键在于convert的实现</span>
<span class="hljs-keyword">const</span> convert = <span class="hljs-function"><span class="hljs-params">mw</span> =&gt;</span> (ctx, next) =&gt; {
    <span class="hljs-comment">// 借助co库，返回一个Promise，同时执行yield</span>
    <span class="hljs-keyword">return</span> co.call(ctx, mw.call(ctx, createGenerator(next)));
};

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">createGenerator</span> (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-comment">/*
     next为koa-compomse中：
     function next () {
         return dispatch(i + 1)
     }
  */</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> next()
  <span class="hljs-comment">// 执行完koa1的中间件，又回到了利用await执行koa2中间件的正轨</span>
}</code></pre>
<p>个人感觉<code>koa-convert</code>的思路就是对<code>Generator</code>封装一层<code>Promise</code>，使上一个中间件可以利用<code>await next()</code>的方式调用，对于<code>Generator</code>的执行，利用<code>co</code>库，从而达到了兼容的目的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa中间件机制详解

## 原文链接
[https://segmentfault.com/a/1190000009158828](https://segmentfault.com/a/1190000009158828)


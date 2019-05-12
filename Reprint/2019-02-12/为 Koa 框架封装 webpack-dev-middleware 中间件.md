---
title: '为 Koa 框架封装 webpack-dev-middleware 中间件' 
date: 2019-02-12 2:30:12
hidden: true
slug: mbz7hrd20g8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">这篇文章能带给你什么</h2>
<p>我见到有很多朋友在 SegmentFault 上面问一些不太好回答的问题，“JavaScript／Node 学好了能做什么？”，“前端架构师每天都做些什么？”等等。这些问题并非不能回答，但是第一、问题本身太过泛泛，很难回答的既针对又具体；第二、面对这样的问题一时也想不出从何处着手来回答。我自己觉得如果能配合一个实例来说明一下会比泛泛而谈更有价值，所以这篇文章等待了好久，就为了等一个合适的例子。</p>
<p>恰逢最近一个项目应用了 React＋Redux 的同构化应用程序架构，在实施这个项目的过程中也使用了 express＋webpack 的组合，在整个过程中特别是 SSR（服务端渲染）这一块儿解决了不少的技术问题，我觉得值得总结一下经验。项目临近结束，我打算把里面的核心部分抽取出来重构一下做个开源项目，于是这里面就有了一些值得拿出来分享的例子，并且分享的目的不只是问题的解决方法本身，更重要的是一些额外的东西，那些能多多少少回答上述问题的东西。比如思路分析、原理阐释、源代码阅读、编写／调试技巧等等。</p>
<p>如果接下来我能有比较充裕的时间，那就会不止这一篇，我的目标对象是那些初学者和处于进阶门槛的人，希望能对你们的胃口。接下来是第一个例子：为 Koa 框架封装 webpack-dev-middleware 中间件。</p>
<h2 id="articleHeader1">关于 Koa</h2>
<p>我并非经验丰富的全栈型工程师，UI 编程方面还可以，服务端则只会些皮毛。前面提到的项目是我第一次用 express 编写真实上线的后端服务，并且也只是做了 SSR 而已。对于 express 我没什么特别的感觉——既没觉得不好，也没觉得出色，因此在重构的时候我打算试试从来没有玩过的 Koa。</p>
<p>很多人都会问“学一个新的框架／工具最好的方法／途径是什么？”，我从来不回答这类的问题，因为我认为这是一个见仁见智的问题，而且我还认为只会听从于别人的规划是学不到东西的，所谓“因材施教”就是这个意思。当然你可以说“我是为了借鉴大家的经验”，然而若是为此的话其实可以问得更巧妙或是具体一些。</p>
<p>在 Koa 这个具体的例子上我的方法其实很简单，就是把一个用 express 写过的项目用 Koa 重构一遍。不过对此我的要求很高，这些要求是方方面面的，其中有一个和本文有关，即：使用到的所有第三方的库都要读懂其原理，若不费事的话就自己造一遍。学习的方法千千万，不过里面总有些通用的法则，我的法则就是<strong>求稳不求快</strong>。事实上这个法则在后面帮了我的大忙，因为熟悉了几个典型的 Koa 中间件后，在处理 webpack-dev-middleware 的封装时就觉得简单很多。</p>
<h2 id="articleHeader2">关于 webpack-dev-middleware</h2>
<p>对于 webpack-dev-middleware，最直观简单的理解就是一个运行于内存中的文件系统。你定义了 webpack.config，webpack 就能据此梳理出所有模块的关系脉络，而 webpack-dev-middleware 就在此基础上形成一个微型的文件映射系统，每当应用程序请求一个文件——比如说你定义的某个 <code>entry</code>，它匹配到了就把内存中缓存的对应结果作为文件内容返回给你，反之则进入到下一个中间件。</p>
<p>因为是内存型的文件系统，所以 rebuilding 的速度非常快，因此特别适合于开发阶段用作静态资源服务器；又因为 webpack 可以把任何一种资源都当作是模块来处理，因此它完全可以取代其他的 HTTP 服务器。事实上，大多数 webpack 用户用过的 webpack-dev-server 就是一个 express＋webpack-dev-middleware 的实现。二者的区别仅在于 webpack-dev-server 是封装好的，除了 webpack.config 和命令行参数之外，你很难去做定制型开发，所以它是适合纯前端项目的辅助工具。而 webpack-dev-middleware 是中间件，你可以编写自己的后端服务然后把它整合进来，相对而言就自由得多了。我们做的是一个前后同构的应用，因此 webpack-dev-server 就不予考虑了。</p>
<h2 id="articleHeader3">问题所在</h2>
<p>问题在于 webpack-dev-middleware 是 express 标准的中间件，并不能直接用于 Koa。</p>
<p>一个标准的 express 中间件是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expressApp.use((req, res, next) => {
  if (nextNeeded) {
    // do what you want
    // until you need down-stream middleware(s)
    next();
  } else {  
    // anything else, e.g. sending response
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">expressApp.use(<span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (nextNeeded) {
    <span class="hljs-comment">// do what you want</span>
    <span class="hljs-comment">// until you need down-stream middleware(s)</span>
    next();
  } <span class="hljs-keyword">else</span> {  
    <span class="hljs-comment">// anything else, e.g. sending response</span>
  }
});</code></pre>
<p>而一个标准的 Koa（v2.x）中间件是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server.use((context, next) => Promise.resolve(() => doSomething()
  .then(() => {/* before next middleware */})
  .then(() => next())
  .then(() => {/* ... and more */})
  .then(() => {/* after down-stream middleware(s) */})
));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">server.use(<span class="hljs-function">(<span class="hljs-params">context, next</span>) =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> doSomething()
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-comment">/* before next middleware */</span>})
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> next())
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-comment">/* ... and more */</span>})
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-comment">/* after down-stream middleware(s) */</span>})
));</code></pre>
<blockquote><p>为什么上面要用 <code>Promise.resolve</code> 包一层？……交给你自己探索了。</p></blockquote>
<p>或者是它的姊妹版，基于 <code>async</code> 的函数形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="koaApp.use(async (context, next) => {
  const beforeNextMiddleware = await doSomething();
  try {
    await next();
  } catch (error) {
    context.body = { message: error.message };
    context.status = error.status || 500;
  }
  return andMore().then(() => evenAfterDownStreams());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript">koaApp.use(<span class="hljs-keyword">async</span> (context, next) =&gt; {
  <span class="hljs-keyword">const</span> beforeNextMiddleware = <span class="hljs-keyword">await</span> doSomething();
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> next();
  } <span class="hljs-keyword">catch</span> (error) {
    context.body = { <span class="hljs-attr">message</span>: error.message };
    context.status = error.status || <span class="hljs-number">500</span>;
  }
  <span class="hljs-keyword">return</span> andMore().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> evenAfterDownStreams());
});</code></pre>
<p>虽然以上只是一些最基本的概念，真实的中间件还有很多编写方法与技巧，不过我们已经看到二者最显著的不兼容之处，即它们的参数签名。如果直接把 webpack-dev-middleware 用于 Koa，显然由于 <code>res</code> 不是一个函数是没有办法调用的，因此 Koa 会告诉你：<code>next is not a function</code>。</p>
<p>看来要想把 webpack-dev-middleware 用在 Koa 里，需要封装一层中间件来协调两种不同的参数签名。如上所示，我使用的是 Koa v2，在此之前 Koa 的中间件是基于 ES2015 Generator 来编写的，Github 上可以找到适合 Generator 的 webpack-dev-middleware，但是找不到适合 Promise/Async 的现成中间件，所以我们来自己造轮子吧。</p>
<h2 id="articleHeader4">Koa 中间件的基础骨架</h2>
<p>基本上，定义一个返回 Promise 的函数或是一个 Async 函数都可以直接拿来用作 Koa 中间件。不过大多数中间件都会需要 <code>options</code>，所以惯例上都会用高阶函数包一层来传参：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (compiler, options) => async (context, next) => {
  await next();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (compiler, options) =&gt; <span class="hljs-keyword">async</span> (context, next) =&gt; {
  <span class="hljs-keyword">await</span> next();
}</code></pre>
<p>webpack-dev-middleware 需要两个参数：</p>
<ul>
<li><p><code>compiler</code>：可以通过 <code>webpack(webpackConfig)</code> 得到</p></li>
<li><p><code>options</code>：补充 webpack-dev-middleware 需要的特定选项，其中 <code>publicPath</code> 是必须的，并且其值应该等于 <code>webpackConfig.output.publicPath</code></p></li>
</ul>
<p>因此我们可以帮用户检查 <code>options</code> 是否有效，若不传 <code>options</code> 就用 <code>compiler</code> 里的默认构造一份，有的话就沿用。严格一点的话你还可以检查 <code>publicPath</code> 是否正确，否则抛出异常中断处理也可以——这个我就不写了。另外我还添加了一点点个人偏好的 <code>options</code> 进去，这个是可选的，可以完全交给用户来传参。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import webpackDevMiddleware from 'webpack-dev-middleware';

// personal taste, totally optional
const stats = {chunkModules: false, colors: 'debug' != process.env.NODE_ENV};

export default (compiler, options = {}) => {
  // this is how we get the original webpack dev middleware, also totally
  // optional if you willing to let user pass in everything.
  const {publicPath} = compiler.options.output;
  const defaults = options.publicPath ? options : {publicPath, stats};
  const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, options));
  
  // CAUTION: explicitly return middleware here because we don't want to
  // initialize webpackDevMiddleware instance through every request.
  return async (context, next) => {
    await next();
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-keyword">import</span> webpackDevMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack-dev-middleware'</span>;

<span class="hljs-comment">// personal taste, totally optional</span>
<span class="hljs-keyword">const</span> stats = {<span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">colors</span>: <span class="hljs-string">'debug'</span> != process.env.NODE_ENV};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (compiler, options = {}) =&gt; {
  <span class="hljs-comment">// this is how we get the original webpack dev middleware, also totally</span>
  <span class="hljs-comment">// optional if you willing to let user pass in everything.</span>
  <span class="hljs-keyword">const</span> {publicPath} = compiler.options.output;
  <span class="hljs-keyword">const</span> defaults = options.publicPath ? options : {publicPath, stats};
  <span class="hljs-keyword">const</span> middleware = webpackDevMiddleware(compiler, <span class="hljs-built_in">Object</span>.assign({}, defaults, options));
  
  <span class="hljs-comment">// CAUTION: explicitly return middleware here because we don't want to</span>
  <span class="hljs-comment">// initialize webpackDevMiddleware instance through every request.</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (context, next) =&gt; {
    <span class="hljs-keyword">await</span> next();
  };
}</code></pre>
<p>我补充了比较详细的注释来解释 what &amp; how，初学者应该仔细读一下里面的经验之谈，顺便就当练习英文读写了；其实读源码的时候经常能得到这些 tips。另外别忘了看看命令行的输出，此时若无误 webpack 本身应该已经正常工作了。</p>
<p>现在我们手头上拥有了 express 版本的中间件了，接下来就是考虑如何让其既能适合 Koa 对于中间件定义的要求，又能做好自己的本职工作。我们先来看看两方的参数如何匹配：</p>
<ul>
<li><p>express 的 <code>req</code>：等价于 Koa 的 <code>context.req</code></p></li>
<li><p>express 的 <code>res</code>：等价于 Koa 的 <code>context.res</code></p></li>
<li><p>express 的 <code>next()</code>：形式上等价于 Koa 的 <code>next()</code> 但是两者的内涵不同，Koa 的 <code>next()</code> 需要返回 Promise 对象（Async 函数是基于 Promise 的语法糖），但 express 的 <code>next()</code> 只是单纯的回调函数</p></li>
</ul>
<p>好吧，我们先来试试很天真的做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...same as above, just pass to async function

return async (context, next) => {
  middleware(context.req, context.res, next);
  await next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">// ...same as above, just pass to async function</span>

<span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (context, next) =&gt; {
  middleware(context.req, context.res, next);
  <span class="hljs-keyword">await</span> next();
};</code></pre>
<p>直接调用会让我们看到这样的错误：<code>Error: next() called multiple times</code>，从错误的蛛丝马迹来推断问题的原因是每一位初学者的必修课，接下来我们重温一遍这个过程看看在没什么经验的情况下如何处理这个情况（我不会讲很深的东西，因为我也不懂……）。</p>
<h2 id="articleHeader5">调试与源代码阅读</h2>
<p>如果你试图截断抛出的异常然后向回追踪调用栈会发现看不出什么蛛丝马迹，顶多就是找到抛出 <code>Error: next() called multiple times</code> 的那一行代码，然而对解决这个问题并没有什么帮助。思考一下 <code>next()</code> 为什么会多次（不正确的）调用？此时我并没有彻底想清楚，但是我得到了两条思路：</p>
<ol>
<li><p>回顾我们的代码，<code>next()</code> 会在 <code>middleware</code> 里面调用，还会在 <code>middleware</code> 执行之后由 <code>await next()</code>，注意这两个 <code>next</code> 的调用场景是不同的，而且在这时我们并不能确定 <code>middleware</code> 里面到底有没有调用 <code>next()</code> 或者能不能正确处理 <code>next()</code>，这些事情前面分析过。所以去步进一下 <code>middleware</code> 里的过程应该是比较明显的线索；</p></li>
<li><p>按照中间件的逻辑，它们以栈的方式从上到下（按声明顺序，也就是 <code>app.use(middleware)</code>）的顺序执行，需要继续的就调用 <code>next()</code>，已经处理完成的话就可以直接返回响应，所以后面的 <code>await next()</code> 应该是有条件调用的，因为在我写这个中间件的时候它之后就只剩下 SSR 的中间件了（调试时，把确认正常且不相干的中间件注释掉会是一个很好的办法）。如果它不停的 <code>await next()</code>，而 SSR 又不能全部处理为响应的话，出现前面的错误也不奇怪。</p></li>
</ol>
<p>第二点其实很值得深入说明，不过由于第一点可以立即动手试试，所以我们先动手看看能否带领我们理清第二点的细节。</p>
<p>断点打到这里：<a href="https://github.com/webpack/webpack-dev-middleware/blob/master/middleware.js#L175" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/webpack-dev-m...</a>，准备步进看看怎么走的（webpack-dev-middleware 的源码我就不贴了，Github 上有现成的，后续指示的断点位置都来自于 Github）。</p>
<p>对于陌生的代码在阅读／调试的时候不要急着钻细节，应该由表及里，先宏观再微观的逐层深入。像这个例子，断点打好之后我压根没看过程，只是不断的步进然后留意两个重点：</p>
<ol>
<li><p>有没有大块代码在步进时被跳过。通常这是条件分支／异常处理等情形出现的特征，留意一下这些地方，在后续调试的时候会是节省时间并且帮助你宏观理解代码结构的好帮手；</p></li>
<li><p>跳出的位置，一旦跳出了就回退一步（调用栈）看看是什么情况。正常的方法调用？（留意一下函数名字大致判断一下干什么去了）还是抛出异常？（留意一下错误对象看看什么原因）。</p></li>
</ol>
<p>直到步进至前文错误出现的地方为止，我观察到 <code>webpackDevMiddleware</code> 几乎就没做什么事儿（其实这是很显然的，我刻意写了前面那个天真的代码就为了通过调试引导到这里……），从第二行开始就 <code>next()</code> 出去了，此后直到异常重现都再没有它参与其中。好！我们仔细看看前两行，为什么啥都不干就 <code>next()</code>？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var filename = getFilenameFromUrl(req.url);
if (filename === false) return next();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-keyword">var</span> filename = getFilenameFromUrl(req.url);
<span class="hljs-keyword">if</span> (filename === <span class="hljs-literal">false</span>) <span class="hljs-keyword">return</span> next();</code></pre>
<p>很显然，如果从请求的 url 里匹配不到文件，那么就跳出 webpackDevMiddleware 剩下的处理逻辑直接进入到下一个中间件了。问题来了：</p>
<ol>
<li><p>为什么没有 <code>next()</code> 到下一个中间件（SSR）而是抛出异常了呢？</p></li>
<li><p>什么情况下能匹配到文件而不是跳出呢？</p></li>
</ol>
<p>第一个问题有兴趣可以步进 <code>next()</code> 一路走下去看看什么情况，这里先告诉大家结论：前面说了 Koa v2.x 的中间件是基于 Promise 的，而此处是直接执行了一个空函数而没有返回 promise 对象，所以没法顺利过渡到后面的中间件。这个问题是不仅限于本文的例子的，只要你在 Koa v2.x 下开发迟早都会意识到这一点。我们在这里不做继续的深入是因为我的环境是使用 <code>babel-transform-async-to-module-method</code> 将 async 函数转为 bluebird Promise 实现的，而每个项目使用的 Promise 实现都未必一样，不具备通用性，因此这个问题点到为止。</p>
<p>至于第二个问题这里要插播一些背景：我在写这个中间件的时候，用于测试的页面构成如下：</p>
<ol>
<li><p>一个 SSR 渲染的首页 <code>index.html</code>，只是最基本的 HTML5 模版，里面渲染了一个 React 组件做测试</p></li>
<li><p>一个 <code>client.js</code>，前面的组件在这里调用的，用于接手客户端渲染</p></li>
<li><p>一个 <code>vendor.js</code>, 包含了一些模块，比如 React、fetch、bluebird 之类常用的工具库</p></li>
</ol>
<p><code>index.html</code> 自然是第一个请求了，它的里面引了后两个脚本，这俩脚本是使用 webpack 打包的，因此它们是应该在 webpack-dev-middleware 里被匹配到的，而 <code>index.html</code> 则应该通过调用 <code>next()</code> 交由 SSR 渲染。</p>
<p>此时此刻，<code>index.html</code> 第一个到达 webpack-dev-middleware 并走到了调用 <code>next()</code> 这里，又因为前面提到的非 promise 的 <code>next()</code> 问题导致了异常的抛出，于是下面就……木有了。</p>
<p>行文为了流畅，以上的阐述自然省却了一些分析源码和调试的过程，不过不用担心，所谓“眼过千遍不如手过一遍”，要学会给自己找合适的机会亲身尝试一下。不用多，类似的事情做个两三次就会找到感觉，用不了多久就能把貌似一团乱麻的问题梳理的清清楚楚。这里顺便提个小故事，《实用主义程序员》提到的橡胶小黄鸭调试法，建议大家去读一读，个人觉得它非常有效。其精髓很简单：分析问题的时候要一句一句，一点一点的说出来，说给小黄鸭、奥特曼、恐龙特级克塞号……都无所谓，哪怕只是自言自语，但是一定要说出来，要出声！信不信一试便知。</p>
<h3 id="articleHeader6">分而治之，逐个攻破</h3>
<p>现在，我们尝试一步一步让 webpack-dev-middleware 和 Koa 和谐共处吧。</p>
<p>首先，如果我们让 <code>next()</code> 返回 Promise 的话会如何？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...same as above, just pass to async function

return async (context, next) => {
  middleware(context.req, context.res, () => Promise.resolve())
  await next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">// ...same as above, just pass to async function</span>

<span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (context, next) =&gt; {
  middleware(context.req, context.res, () =&gt; <span class="hljs-built_in">Promise</span>.resolve())
  <span class="hljs-keyword">await</span> next();
};</code></pre>
<p>我们把传入的 <code>next</code> 替换为一个返回 promise 的匿名函数再试试看？啊哈～ SSR 成功渲染！</p>
<blockquote><p>如果你没有后续的 SSR 中间件也无妨，随便返回点 <code>Hello World</code> 的简单中间件也是一样的：<br><code>app.use(function(context, next) { context.body = "Hello World" })</code><br>放在后面就行。</p></blockquote>
<p>但是 <code>client.js</code> 和 <code>vendor.js</code> 的请求返回的都是 404，这又是为啥嘞？像这样的问题下意识的都会以为 webpack-dev-middleware 是不是有问题？不过请等，像这种知名的开源项目出现这么“明显”问题的概率是很低的，不确信的话可以扫一下 issues 说不定也能找到答案。不过既然都已经读了一些源码了，索性咱继续往后走看看到底如何吧。</p>
<p>当请求走到两个脚本文件的时候，前面的 <code>filename</code> 检查就会跳过 <code>next()</code> 调用了。<a href="https://github.com/webpack/webpack-dev-middleware/blob/master/middleware.js#L177-L189" rel="nofollow noreferrer" target="_blank">Line 177-189</a> 之间是一些选项检查和缓存处理，不用细究。</p>
<p>要注意 <a href="https://github.com/webpack/webpack-dev-middleware/blob/master/middleware.js#L191" rel="nofollow noreferrer" target="_blank">Line 191</a> 开始的逻辑，L192 的 <code>processRequest()</code> 是对匹配成功的请求的主要逻辑，由于首次请求要等待 building 完成才能返回完整的内容，所以 L191 又一个 <code>ready()</code> 做延迟处理（源代码有注释），因此断点要提前打到函数内部，否则眼一闭一睁——没了～</p>
<p>在这之后我陷入了一段长时间的困惑，因为根据调试的结果，我们有了代表文件内容的 <code>content</code>，也执行了必要的 <code>res.setHeader()</code>，最后尽管 <code>res.send()</code> 方法不存在，但 webpack-dev-middleware 也 fallback 到了 <code>res.end(content)</code>。按理来说应该是成功走完了才对，为什么会是 404 呢？</p>
<p>其实早前我曾经提到过，<code>await next()</code> 这句应该是有条件调用的，具体来说：如果 <code>res.end(content)</code> 正确执行了，那么我们就应该终止下一个中间件的继续调用。但目前我们在 <code>middleware()</code> 执行过后无论如何都会继续 <code>await next()</code>，于是我的 SSR 又接手了这些请求。鉴于 SSR 的设计是不去处理脚本等外链静态资源请求的，所以返回 404 也就不难理解了。（涉及 SSR 的部分以后有时间再分享）</p>
<p>讨厌的是 webpack-dev-middleware 处理到最后并不会返回什么，所以我们拿不到可靠的条件来跳过 <code>await next()</code> 这一句。不过想想我们前面处理 <code>next()</code> 的方式吧，我们不是让它顺利返回了 promise 对象吗？那么是不是也可以让 <code>middleware()</code> 也返回些什么东西呢？我们需要如下的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...same as above, just pass to async function

return async (context, next) => {
  const hasNext = await middleware(context.req, context.res, () => Promise.resolve(true));
  if (hasNext === true) { await next(); }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-comment">// ...same as above, just pass to async function</span>

<span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (context, next) =&gt; {
  <span class="hljs-keyword">const</span> hasNext = <span class="hljs-keyword">await</span> middleware(context.req, context.res, () =&gt; <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-literal">true</span>));
  <span class="hljs-keyword">if</span> (hasNext === <span class="hljs-literal">true</span>) { <span class="hljs-keyword">await</span> next(); }
};</code></pre>
<p>注意：这一点改动并不能解决前面 404 的问题，因为它只能保证在 <code>next()</code> 被调用时让我们通过 await promise 拿到 <code>true</code> 而已。但是这一改动暗示着，如果我们能让 <code>middleware()</code> 在不走 <code>next()</code> 的时候最终返回 <code>Promise.resolve(false)</code>，那么就可以跳过不需要的 <code>await next()</code> 了。也就是说，我们需要包装 <code>res.send()</code> 和 <code>res.setHeader()</code> 方法让它们代理 webpack-dev-middleware 里的同名方法，同时让 <code>res.send()</code> 返回 <code>Promise.resolve(false)</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (compiler, options = {}) => {
  // omit options processing...
  
  return async (context, next) => {
    const hasNext = await applyMiddleware(middleware, context.req, {
      send: content => context.body = content,
      setHeader: function() {context.set.apply(context, arguments)}
    });
    hasNext &amp;&amp; await next();
  };
};

function applyMiddleware(middleware, req, res) {
  const _send = res.send;
  return new Promise((resolve, reject) => {
    try {
      res.send = function() {_send.apply(res, arguments) &amp;&amp; resolve(false)};
      middleware(req, res, resolve.bind(null, true));
    } catch (error) {
      reject(error);
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (compiler, options = {}) =&gt; {
  <span class="hljs-comment">// omit options processing...</span>
  
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (context, next) =&gt; {
    <span class="hljs-keyword">const</span> hasNext = <span class="hljs-keyword">await</span> applyMiddleware(middleware, context.req, {
      <span class="hljs-attr">send</span>: <span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> context.body = content,
      <span class="hljs-attr">setHeader</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{context.set.apply(context, <span class="hljs-built_in">arguments</span>)}
    });
    hasNext &amp;&amp; <span class="hljs-keyword">await</span> next();
  };
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">middleware, req, res</span>) </span>{
  <span class="hljs-keyword">const</span> _send = res.send;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{_send.apply(res, <span class="hljs-built_in">arguments</span>) &amp;&amp; resolve(<span class="hljs-literal">false</span>)};
      middleware(req, res, resolve.bind(<span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>));
    } <span class="hljs-keyword">catch</span> (error) {
      reject(error);
    }
  });
}</code></pre>
<p>这一段变化较大同时又有点烧脑，且容我一一道来：</p>
<p>首先我们需要单独写一个 <code>applyMiddleware</code> 函数用于返回可包含两种情形的 promise（而且更容易处理异常），且由于 promise 分离出去处理了，也就不需要单独封装 <code>next()</code> 了。</p>
<p><code>context.res</code> 不能原封不动的传进去了，否则又走回了 webpack-dev-middleware 的老路数，因此我们“伪造”了一个刚好够用的对象，仅实现了 <code>send()</code> 和 <code>setHeader()</code> 这俩方法。前文说过，这是 webpack-dev-middleware 唯二调用的两个属于 <code>res</code> 对象的成员。这两个方法作用不变，但是内部使用的是 Koa 的对等 API，也就是说，当 webpack-dev-middleware 调用它们的时候，我们将会代理给 Koa 来进行等价处理。</p>
<p>状态符 <code>hasNext</code> 或真或假，将会由 <code>applyMiddleware</code> 返回，于是 <code>middleware</code> 的调用转入其中执行。</p>
<p>再看 <code>applyMiddleware</code> 里面。首先我们拷贝了一份代理的 <code>res.send</code>，这是因为该方法需要的 <code>content</code> 参数我们是无法直接获取到的，需要由 webpack-dev-middleware 调用时帮我们传进来，然后我们重写它并在其中 <code>apply</code> 调用。注意，Koa 等价的 <code>send()</code> 其实是针对 <code>context.body</code> 的直接赋值，因此 <code>apply(null)</code> 是没有问题的，但是 <code>setHeader</code> 需要 <code>apply(context)</code>，否则 <code>this</code> 的指向会出问题。</p>
<p>在这之后，我们才真正调用 <code>middleware()</code>，此时 <code>res</code> 已经是经过处理的代理对象了，但 webpack-dev-middleware 再次走到 <code>setHeader</code> 和 <code>send</code> 那里的时候，这俩方法已经“叛变”成了 Koa 的等价处理逻辑，于是真正发挥作用的是 <code>context.body=</code> 和 <code>context.set</code>，最后 <code>context.body=</code> 其实是一个 setter，它最终返回的是实际的 <code>content</code>，我们知道它是一个真值，所以直接短路至 <code>resolve(false)</code>。</p>
<blockquote><p>Tips: <code>resolve.bind(null, true)</code> 等价于 <code>function() { resolve(true) }</code>——如果你还不清楚这一点的话，它的作用就是帮助 <code>next()</code> 返回结果为真的 promise</p></blockquote>
<p>再次返回 <code>await applyMiddleware(...)</code> 那里，这一次 <code>hasNext</code> 会在需要后续中间件介入时为真，前面 404 的问题迎刃而解。</p>
<h2 id="articleHeader7">Bonus</h2>
<p>希望这篇文章絮絮叨叨的风格多少能带给初学者一些帮助或引导，Github 上还没有完成我们这个例子的开源项目，而我也不打算去做这件事情。我想把这个机会留给读完本文并且还没有在 npm 上发布过模块软件包的新手朋友们，如果你有这个热情和精力来维护它那就干吧，在这里我就权当开源了。等你发布后如果有问题我也乐意给予力所能及的帮助，衷心希望各位能在编程的道路上越走越远。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为 Koa 框架封装 webpack-dev-middleware 中间件

## 原文链接
[https://segmentfault.com/a/1190000004883199](https://segmentfault.com/a/1190000004883199)


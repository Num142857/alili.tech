---
title: 在 Node.js 中使用 Promise.prototype.finally
reprint: true
categories: reprint
abbrlink: c8c91cd5
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally">Promise.prototype.finally()</a>  最近达到了 TC39 提案的 <a href="https://github.com/tc39/proposals/blob/master/finished-proposals.md">第 4 阶段</a> 。这意味着 <code>Promise.prototype.finally()</code> 提案被采纳成为 <a href="https://tc39.github.io/ecma262/#sec-promise.prototype.finally">ECMAScript 最新特性草案</a> 的一部分，登陆 Node.js 现在只是时间问题了。这篇文章会向大家展示 <code>Promise.prototype.finally()</code> 的用法和简化版 Polyfill 的写法。</p>
<p><img src="https://p0.ssl.qhimg.com/t01fc30e562a31d7177.png" alt=""></p>
<h2>Promise.prototype.finally() 是什么？</h2>
<p>假设你创建了一个新的 <code>Promise</code>：</p>
<pre><code class="hljs lisp">const promiseThatFulfills = new Promise((<span class="hljs-name">resolve</span>) =&gt; {
  // 调用 resolve() 可以让 Promised 的状态变为 fulfilled。<span class="hljs-string">"fulfilled"</span> 和 <span class="hljs-string">"resolved"</span> 是不同的概念：
  // 如果你 resolve() 一个非 Promise 值，Promise 会变成 <span class="hljs-string">"fulfilled"</span>。
  // 然而, 如果 resolve() 一个 Promise，外层（原来的） Promise 会保持 <span class="hljs-string">"pending"</span> 状态
  // 直到内层 Promise 变为 <span class="hljs-string">"fulfilled"</span> 或者 <span class="hljs-string">"rejected"</span>
  setTimeout(() =&gt; resolve('Hello, World'), <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>

const promiseThatRejects = new Promise((<span class="hljs-name">resolve</span>, reject) =&gt; {
  setTimeout(() =&gt; reject(<span class="hljs-name">new</span> Error('whoops!')), <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>
</code></pre><p>你可以用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then"><code>.then()</code> 函数</a>把这些 <code>Promise</code> 串联在一起。</p>
<pre><code class="hljs coffeescript">promiseThatFulfills.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Will print after about 1 second'</span>));
promiseThatRejects.<span class="hljs-keyword">then</span>(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Will print after about 1 second'</span>));
</code></pre><p>注意 <code>.then()</code> 需要两个函数作为参数。第一个参数是 <code>onFulfilled()</code>，当 <code>Promise</code> 为 fulfilled 时调用；第二个 <code>onRejected()</code> 则是在 rejected 的时候调用。<code>Promise</code> 是一个必定处于以下三种状态之一的状态机：</p>
<ul>
<li>pending（进行中）: Promise 中的操作正在进行中，状态未被凝固为 fulfilled 或 rejected。</li>
<li>fulfilled（已完成，<em>直译：已满足</em>）: Promise 中的操作已成功完成，现在 <code>Promise</code> 里面关联有该操作的返回值。</li>
<li>rejected（已失败，<em>直译：已回绝</em>）: Promise 中的操作因某些原因失败，现在 <code>Promise</code> 里面关联有该操作的错误信息。</li>
</ul>
<p>此外，处于 fulfilled 或者 rejected 状态的 <code>Promise</code> 称作“已凝固”(settled) 的 <code>Promise</code>。</p>
<p><img src="https://p0.ssl.qhimg.com/t0110b87cd2a79466d3.png" alt=""></p>
<p>虽然 <code>.then()</code> 是串联 <code>Promise</code> 的核心机制，但并不独一无二。<code>Promise</code> 用来处理抛出错误的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch"><code>.catch()</code> 函数</a> 也能串联 <code>Promise</code>。</p>
<pre><code class="hljs coffeescript">promiseThatRejects.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Will print after about 1 second'</span>));
</code></pre><p><code>.catch()</code> 函数只是一个只有 <code>onRejected()</code> 参数的 <code>.then()</code> 的语法糖：</p>
<pre><code class="hljs coffeescript">promiseThatRejects.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Will print after about 1 second'</span>));
<span class="hljs-regexp">//</span> 等价于
promiseThatRejects.<span class="hljs-keyword">then</span>(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Will print after about 1 second'</span>));
</code></pre><p>类似于 <code>.catch()</code>，.<code>finally()</code> 也是 <code>.then()</code> 的一个语法糖。区别在于 <code>.finally()</code> 当 <code>Promise</code> 凝固（fulfilled / rejected）时执行一个 <code>onFinally</code> 函数。当前 <code>.finally()</code> 还没有加入 Node.js 发行版，但 <a href="https://www.npmjs.com/package/promise.prototype.finally">npm 上的 promise.prototype.finally 模块</a> 实现了它的 Polyfill。</p>
<pre><code class="hljs coffeescript">const promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-regexp">//</span> 向 Promise.prototype 增加 <span class="hljs-keyword">finally</span>()
promiseFinally.shim();

const promiseThatFulfills = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(<span class="hljs-string">'Hello, World'</span>), <span class="hljs-number">1000</span>);
});

const promiseThatRejects = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'whoops!'</span>)), <span class="hljs-number">1000</span>);
});

promiseThatFulfills.<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fulfilled'</span>));
promiseThatRejects.<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected'</span>));
</code></pre><p>上面代码的运行结果会打印 'fulfilled' 和 'rejected'，因为无论是 fulfilled 还是 rejected，只要状态凝固 <code>onFinally</code> 都会立即执行。不过 <code>onFinally</code> <strong>不</strong>接受参数，所以你无法判断 <code>Promise</code> 的状态到底是两个中的哪个。</p>
<p><code>finally()</code> 会返回一个 <code>Promise</code>，所以你可以使用 <code>.then()</code> / <code>.catch()</code> / <code>.finally()</code> 串联它的返回值。finally() 返回的 <code>Promise</code> 会和它连接到的 <code>Promise</code> 保持相同的 fulfill 条件。 例如下面的代码，即使 <code>onFinally</code> 返回了 'bar'，它还是会打印 5 次 'foo' 。</p>
<pre><code class="hljs coffeescript">const promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-regexp">//</span> 向 Promise.prototype 增加 <span class="hljs-keyword">finally</span>()
promiseFinally.shim();

Promise.resolve(<span class="hljs-string">'foo'</span>).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">'bar'</span>).
  <span class="hljs-regexp">//</span> 会打印 <span class="hljs-string">'foo'</span>, **不是** <span class="hljs-string">'bar'</span>，因为 <span class="hljs-keyword">finally</span>() 只起到转运的作用
  <span class="hljs-regexp">//</span> <span class="hljs-keyword">for</span> fulfilled values <span class="hljs-keyword">and</span> rejected errors
  <span class="hljs-keyword">then</span>(res =&gt; <span class="hljs-built_in">console</span>.log(res));
</code></pre><p>类似地，下面代码中即使 <code>onFinally</code> 没有抛出任何错误，仍然会打印 'foo'。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-comment">// 向 Promise.prototype 增加 finally()</span>
promiseFinally.shim();

<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'foo'</span>)).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">'bar'</span>).
  <span class="hljs-comment">// 会打印 'foo', **不是** 'bar'，因为 finally() 只起到转运的作用</span>
  <span class="hljs-comment">// 无论是 resolve 的值还是 reject 的错误</span>
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.message));
</code></pre><p>上面代码展示了使用 <code>finally()</code> 的一个重要细节：它 <strong>不会</strong> 帮你处理 <code>Promise</code> 的错误。如何让它能处理 <code>Promise</code> 错误值得更深入的研究。</p>
<h2>错误处理</h2>
<p><code>finally()</code> <strong>不是</strong> 用来处理 <code>Promise</code> 的错误的。事实上，它会在 <code>onFinally()</code> 执行后<a href="https://github.com/tc39/proposal-promise-finally/blob/fd934c0b42d59bf8d9446e737ba14d50a9067216/polyfill.js#L40">显式重新抛错</a>。下面的代码会打印一个未被处理的 <code>Promise</code> 错误警告。</p>
<pre><code class="hljs coffeescript">const promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-regexp">//</span> 向 Promise.prototype 增加 <span class="hljs-keyword">finally</span>()
promiseFinally.shim();

const promiseThatRejects = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'whoops!'</span>)), <span class="hljs-number">1000</span>);
});

promiseThatRejects.<span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected'</span>));
</code></pre><pre><code class="hljs crmsh">$ <span class="hljs-keyword">node</span> <span class="hljs-title">finally</span>.js
rejected
(<span class="hljs-keyword">node</span><span class="hljs-title">:5342</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: <span class="hljs-number">2</span>): Error: whoops!
(<span class="hljs-keyword">node</span><span class="hljs-title">:5342</span>) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. <span class="hljs-keyword">In</span> the future, promise rejections that are not handled will terminate the <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> process with a non-zero exit code.
$
</code></pre><p>与 <a href="https://www.w3schools.com/jsref/jsref_try_catch.asp"><code>try</code>/<code>catch</code>/<code>finally</code></a> 类似，通常 <code>.finally()</code> 都会在 <code>.catch()</code> 后面被调用。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-comment">// 向 Promise.prototype 增加 finally()</span>
promiseFinally.shim();

<span class="hljs-keyword">const</span> promiseThatRejects = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'whoops!'</span>)), <span class="hljs-number">1000</span>);
});

promiseThatRejects.
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* ignore the error */</span> }).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'done'</span>));
</code></pre><p>然而 <code>finally()</code> 返回的也是 <code>Promise</code>，所以你可以随意在 <code>finally()</code> 后面调用 <code>.catch()</code>。特别地，如果 <code>onFinally</code> 会出错，例如 HTTP 请求，你应该在末尾添加 <code>.catch()</code> 以处理可能发生的错误。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> promiseFinally = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promise.prototype.finally'</span>);

<span class="hljs-comment">// 向 Promise.prototype 增加 finally()</span>
promiseFinally.shim();

<span class="hljs-keyword">const</span> promiseThatRejects = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'whoops!'</span>)), <span class="hljs-number">1000</span>);
});

promiseThatRejects.
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected'</span>)).
  <span class="hljs-comment">// No unhandled promise rejection because there's a .catch()</span>
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* ignore the error */</span> });
</code></pre><h2>简版 Polyfill</h2>
<p>我觉得想要真正搞懂一个东西，最简单的方式就是<a href="http://es2015generators.com/">自己去实现一个</a>。<code>.finally()</code> 是一个很好的选择，因为<a href="https://github.com/tc39/proposal-promise-finally/blob/fd934c0b42d59bf8d9446e737ba14d50a9067216/polyfill.js">官方 Polyfill</a> 只有 45 行，而且大多数代码在验证原理时可以进一步精简。</p>
<p>接下来是一些关于 <code>.finally()</code> 的测试样例。下面的代码会打印 'foo' 5 次。</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// 返回值被忽略，Promise 正常完成</span>
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'foo'</span>).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">'bar'</span>).
  then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res));

<span class="hljs-comment">// 返回值被忽略，Promise 正常抛错</span>
<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'foo'</span>)).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">'bar'</span>).
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.message));

<span class="hljs-comment">// onFinally 抛错，返回新抛出的错误</span>
<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'bar'</span>)).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'foo'</span>); }).
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.message));

<span class="hljs-comment">// onFinally 返回的是一个抛错的 Promise，</span>
<span class="hljs-comment">// 返回新抛出的错误</span>
<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'bar'</span>)).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'foo'</span>))).
  <span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.message));

<span class="hljs-comment">// onFinally 返回的是一个 Promise， 需要等待它</span>
<span class="hljs-comment">// 状态凝固才能继续执行</span>
<span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now();
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。span>.resolve(<span class="hljs-string">'foo'</span>).
  <span class="hljs-keyword">finally</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(), <span class="hljs-number">1000</span>))).
  then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res, <span class="hljs-built_in">Date</span>.now() - start));
</code></pre><p>下面是简版 Polyfill 的实现。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// 向 Promise.prototype 增加 finally()</span>
<span class="hljs-built_in">Promise</span>.prototype.finally = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFinally</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(
    <span class="hljs-comment">/* onFulfilled */</span>
    res =&gt; <span class="hljs-built_in">Promise</span>.resolve(onFinally()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> res),
    <span class="hljs-comment">/* onRejected */</span>
    err =&gt; <span class="hljs-built_in">Promise</span>.resolve(onFinally()).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">throw</span> err; })
  );
};
</code></pre><p>这个实现背后关键的思路在于 <code>onFinally</code> 可能返回 <code>Promise</code>。在这种情况下你需要用 <code>.then()</code> 来处理它并且给外层 <code>Promise</code> 凝固状态。你可以显式检查 <code>onFinally</code> 是否返回 <code>Promise</code>，但 <code>Promise.resolve()</code> 已经帮你做了，而且不需要 <code>if</code> 语句。你还需要跟踪初始 <code>Promise</code> 的值或错误，并确保 <code>finally()</code> 返回的 <code>Promise</code> 解析出初始值 <code>res</code>，或重新抛出初始错误 <code>err</code>。</p>
<h2>后记</h2>
<p>在动笔时，<code>Promise.prototype.finally()</code> 是 <a href="https://github.com/tc39/proposals/blob/master/finished-proposals.md">8 个 TC39 第四阶段提案</a> 之一。这意味着 <code>finally()</code> 将和 7 个其他新语言特性一起加入 Node.js。 <code>finally()</code> 是这 8 个新特性中最令人兴奋的之一，皆因为它可以让异步操作结束后的清理更彻底。举个例子，下面我正用在生产环境的代码非常需要 <code>finally()</code> 来在函数完成时释放资源的锁定。</p>
<p><img src="https://p0.ssl.qhimg.com/t01d067cf4198b33407.png" alt=""></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/using-promise-prototype-finally-in-node-js](https://www.zcfy.cc/article/using-promise-prototype-finally-in-node-js)
原文标题: 在 Node.js 中使用 Promise.prototype.finally
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

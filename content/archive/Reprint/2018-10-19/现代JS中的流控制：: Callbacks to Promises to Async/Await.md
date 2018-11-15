---
title: '现代JS中的流控制：: Callbacks to Promises to Async/Await'
hidden: true
categories: reprint
slug: c7e93bce
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p><strong>JavaScript经常声称是<em>asynchronous</em>。那是什么意思？它如何影响发展？近年来这种方法有何变化？</strong></p>
<p>请思考以下代码：</p>
<pre><code class="hljs abnf"><span class="hljs-attribute">result1</span> = doSomething1()<span class="hljs-comment">;</span>
<span class="hljs-attribute">result2</span> = doSomething2(result1)<span class="hljs-comment">;</span>


</code></pre><p>大多数语言都处理每一行<em>synchronously</em>。第一行运行并返回结果。第二行在第一行完成后运行<em>无论需要多长时间</em>。</p>
<h2>单线程处理</h2>
<p>JavaScript在单个处理线程上运行。在浏览器选项卡中执行时，其他所有内容都会停止，因为在并行线程上不会发生对页面DOM的更改;将一个线程重定向到另一个URL而另一个线程尝试追加子节点是危险的。</p>
<p>这对用户来说是显而易见。例如，JavaScript检测到按钮单击，运行计算并更新DOM。完成后，浏览器可以自由处理队列中的下一个项目。</p>
<p><em>（旁注：其他语言如PHP也使用单个线程，但可以由多线程服务器（如Apache）管理。同时对同一个PHP运行时页面的两个请求可以启动两个运行隔离的实例的线程。）</em></p>
<h2>使用回调进行异步</h2>
<p>单线程引发了一个问题。当JavaScript调用“慢”进程（例如浏览器中的Ajax请求或服务器上的数据库操作）时会发生什么？这个操作可能需要几秒钟 - 甚至几分钟。浏览器在等待响应时会被锁定。在服务器上，Node.js应用程序将无法进一步处理用户请求。</p>
<p>解决方案是异步处理。而不是等待完成，一个进程被告知在结果准备好时调用另一个函数。这称为<em>callback</em>，它作为参数传递给任何异步函数。例如：</p>
<pre><code class="hljs scilab">doSomethingAsync(callback1);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'finished'</span>);

<span class="hljs-comment">// call when doSomethingAsync completes</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback1</span><span class="hljs-params">(error)</span> {</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">error</span>) console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'doSomethingAsync complete'</span>);
}


</code></pre><p>doSomethingAsync（）接受一个回调函数作为参数（只传递对该函数的引用，因此几乎没有开销）。doSomethingAsync（）需要多长时间并不重要;我们所知道的是callback1（）将在未来的某个时刻执行。控制台将显示：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">finished
doSomethingAsync complete</span>


</code></pre><h3>回调地狱</h3>
<p>通常，回调只能由一个异步函数调用。因此可以使用简洁的匿名内联函数：</p>
<pre><code class="hljs javascript">doSomethingAsync(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (!error) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doSomethingAsync complete'</span>);
});


</code></pre><p>通过嵌套回调函数，可以串行完成一系列两个或多个异步调用。例如：</p>
<pre><code class="hljs lisp">async1((<span class="hljs-name">err</span>, res) =&gt; {
  if (!err) async2(<span class="hljs-name">res</span>, (<span class="hljs-name">err</span>, res) =&gt; {
    if (!err) async3(<span class="hljs-name">res</span>, (<span class="hljs-name">err</span>, res) =&gt; {
      console.log('async1, async2, async3 complete.')<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
  })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span>


</code></pre><p>不幸的是，这引入了<strong>回调地狱</strong> - 一个臭名昭着的概念(<a href="http://callbackhell.com/">http://callbackhell.com/</a>) ！代码难以阅读，并且在添加错误处理逻辑时会变得更糟。</p>
<p>回调地狱在客户端编码中相对较少。如果您正在进行Ajax调用，更新DOM并等待动画完成，它可以深入两到三个级别，但它通常仍然可以管理。</p>
<p>操作系统或服务器进程的情况不同。Node.js API调用可以接收文件上载，更新多个数据库表，写入日志，并在发送响应之前进行进一步的API调用。</p>
<h2>Promises</h2>
<p><a href="https://www.sitepoint.com/overview-javascript-promises/">ES2015（ES6）推出了Promises</a>。回调仍然可以使用，但Promises提供了更清晰的语法<em>chains</em>异步命令，因此它们可以串行运行（<a href="https://www.sitepoint.com/flow-control-callbacks-promises-async-await/#asynchronouschaining">更多相关内容</a>）。</p>
<p>要启用基于Promise的执行，必须更改基于异步回调的函数，以便它们立即返回Promise对象。该<em>promises</em>对象在将来的某个时刻运行两个函数之一（作为参数传递）：</p>
<ul>
<li><p><strong>resolve</strong> ：处理成功完成时运行的回调函数</p>
</li>
<li><p><strong>reject</strong> ：发生故障时运行的可选回调函数。</p>
</li>
</ul>
<p>在下面的示例中，数据库API提供了一个接受回调函数的connect（）方法。外部asyncDBconnect（）函数立即返回一个新的Promise，并在建立连接或失败后运行resolve（）或reject（）：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">'database'</span>);

<span class="hljs-comment">// connect to database</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncDBconnect</span>(<span class="hljs-params">param</span>) </span>{

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {

    db.connect(param, <span class="hljs-function">(<span class="hljs-params">err, connection</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) reject(err);
      <span class="hljs-keyword">else</span> resolve(connection);
    });

  });

}


</code></pre><p>Node.js 8.0+提供了<a href="https://nodejs.org/api/util.html#util_util_promisify_original">util.promisify（）实用程序</a>，将基于回调的函数转换为基于Promise的替代方法。有几个条件：</p>
<ol>
<li><p>必须将回调作为最后一个参数传递给异步函数</p>
</li>
<li><p>回调函数必须指向一个错误，后跟一个值参数。</p>
</li>
</ol>
<p>例子:</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// Node.js: promisify fs.readFile</span>
<span class="hljs-keyword">const</span>
  util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>),
  fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>),
  readFileAsync = util.promisify(fs.readFile);

readFileAsync(<span class="hljs-string">'file.txt'</span>);


</code></pre><p>各种客户端库也提供promisify选项，但您可以自己创建几个：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// promisify a callback function passed as the last parameter</span>
<span class="hljs-comment">// the callback function must accept (err, data) parameters</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promisify</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(
        <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> fn(
          ...Array.from(<span class="hljs-built_in">arguments</span>),
        (err, data) =&gt; err ? reject(err) : resolve(data)
      )
    );
  }
}

<span class="hljs-comment">// example</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wait</span>(<span class="hljs-params">time, callback</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { callback(<span class="hljs-literal">null</span>, <span class="hljs-string">'done'</span>); }, time);
}

<span class="hljs-keyword">const</span> asyncWait = promisify(wait);

ayscWait(<span class="hljs-number">1000</span>);


</code></pre><h3>异步链</h3>
<p>任何返回Promise的东西都可以启动.then（）方法中定义的一系列异步函数调用。每个都传递了上一个解决方案的结果：</p>
<pre><code class="hljs scilab">asyncDBconnect(<span class="hljs-string">'http://localhost:1234'</span>)
  .<span class="hljs-keyword">then</span>(asyncGetSession)      <span class="hljs-comment">// passed result of asyncDBconnect</span>
  .<span class="hljs-keyword">then</span>(asyncGetUser)         <span class="hljs-comment">// passed result of asyncGetSession</span>
  .<span class="hljs-keyword">then</span>(asyncLogAccess)       <span class="hljs-comment">// passed result of asyncGetUser</span>
  .<span class="hljs-keyword">then</span>(result =&gt; {           <span class="hljs-comment">// non-asynchronous function</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'complete'</span>);  <span class="hljs-comment">//   (passed result of asyncLogAccess)</span>
    <span class="hljs-keyword">return</span> result;            <span class="hljs-comment">//   (result passed to next .then())</span>
  })
  .<span class="hljs-keyword">catch</span>(err =&gt; {             <span class="hljs-comment">// called on any reject</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'error'</span>, err);
  });


</code></pre><p>同步函数也可以在.then（）块中执行。返回的值将传递给下一个.then（）（如果有）。</p>
<p>.catch（）方法定义了在触发任何先前拒绝时调用的函数。此时，不会再运行.then（）方法。您可以在整个链中使用多个.catch（）方法来捕获不同的错误。</p>
<p>ES2018引入了一个.finally（）方法，无论结果如何都运行任何最终逻辑 - 例如，清理，关闭数据库连接等。目前仅支持Chrome和Firefox，但技术委员会39已发布了 <a href="https://github.com/tc39/proposal-promise-finally/blob/fd934c0b42d59bf8d9446e737ba14d50a9067216/polyfill.js">.finally() polyfill.</a></p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err);
  })
  .finally(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// tidy-up here!</span>
  });
}


</code></pre><h3>使用Promise.all（）进行多个异步调用</h3>
<p>Promise .then（）方法一个接一个地运行异步函数。如果顺序无关紧要 - 例如，初始化不相关的组件 - 同时启动所有异步函数并在最后（最慢）函数运行解析时结束更快。</p>
<p>这可以通过Promise.all（）来实现。它接受一组函数并返回另一个Promise。例如：</p>
<pre><code class="hljs maxima">Promise.all([ async1, async2, async3 ])
  .<span class="hljs-keyword">then</span>(<span class="hljs-built_in">values</span> =&gt; {           // <span class="hljs-built_in">array</span> of resolved <span class="hljs-built_in">values</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">values</span>);      // (<span class="hljs-keyword">in</span> same order as function <span class="hljs-built_in">array</span>)
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">values</span>;
  })
  .<span class="hljs-built_in">catch</span>(err =&gt; {             // called on any reject
    console.<span class="hljs-built_in">log</span>('<span class="hljs-built_in">error</span>', err);
  });


</code></pre><p>如果任何一个异步函数调用拒绝，则Promise.all（）立即终止。</p>
<h3>使用Promise.race的多个异步调用（）</h3>
<p>Promise.race（）与Promise.all（）类似，只是它会在<em>first</em> Promise解析或拒绝后立即解析或拒绝。只有最快的基于Promise的异步函数才能完成：</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">Promise</span>.race([ async1, async2, async3 ])
  .then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {            <span class="hljs-comment">// single value</span>
    <span class="hljs-built_in">console</span>.log(value);
    <span class="hljs-keyword">return</span> value;
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {             <span class="hljs-comment">// called on any reject</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, err);
  });


</code></pre><h3>但是有什么别的问题吗？</h3>
<p>Promises 减少了回调地狱但引入了别的问题。</p>
<p>教程经常没有提到_整个Promise链是异步的。使用一系列promise的任何函数都应返回自己的Promise或在最终的.then（）,. catch（）或.finally（）方法中运行回调函数。</p>
<p>学习基础知识至关重要。</p>
<p>更多的关于Promises的资源：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">MDN Promise文档</a></p>
</li>
<li><p><a href="https://developers.google.com/web/fundamentals/primers/promises">JavaScript Promises: 简介</a></p>
</li>
<li><p><a href="http://www.mattgreer.org/articles/promises-in-wicked-detail/">JavaScript Promises …相关细节</a></p>
</li>
<li><p><a href="http://exploringjs.com/es6/ch_promises.html">Promises异步编程</a></p>
</li>
</ul>
<h2>Async/Await</h2>
<p>Promises 可能令人生畏，因此<a href="https://www.sitepoint.com/LINK-to-ES2017-article">ES2017</a>引入了async and await。 虽然它可能只是语法糖，它使Promise更完善，你可以完全避免.then（）链。 考虑下面的基于Promise的示例：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {

    asyncDBconnect(<span class="hljs-string">'http://localhost:1234'</span>)
      .then(asyncGetSession)
      .then(asyncGetUser)
      .then(asyncLogAccess)
      .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> resolve(result))
      .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> reject(err))

  });
}

<span class="hljs-comment">// run connect (self-executing function)</span>
(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  connect();
    .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(result))
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
})();


</code></pre><p>用这个重写一下async/await:</p>
<ol>
<li><p>外部函数必须以async语句开头</p>
</li>
<li><p>对异步的基于Promise的函数的调用必须在await之前，以确保在下一个命令执行之前完成处理。</p>
</li>
</ol>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span>
      connection = <span class="hljs-keyword">await</span> asyncDBconnect(<span class="hljs-string">'http://localhost:1234'</span>),
      session = <span class="hljs-keyword">await</span> asyncGetSession(connection),
      user = <span class="hljs-keyword">await</span> asyncGetUser(session),
      log = <span class="hljs-keyword">await</span> asyncLogAccess(user);

    <span class="hljs-keyword">return</span> log;
  }
  <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, err);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

}

<span class="hljs-comment">// run connect (self-executing async function)</span>
(<span class="hljs-keyword">async</span> () =&gt; { <span class="hljs-keyword">await</span> connect(); })();


</code></pre><p>await有效地使每个调用看起来好像是同步的，而不是阻止JavaScript的单个处理线程。 此外，异步函数总是返回一个Promise，因此它们可以被其他异步函数调用。</p>
<p>async/await 代码可能不会更短，但有相当大的好处:</p>
<ol>
<li><p>语法更清晰。括号更少，错误更少。</p>
</li>
<li><p>调试更容易。可以在任何await语句上设置断点。</p>
</li>
<li><p>错误处理更好。try / catch块可以与同步代码一样使用。</p>
</li>
<li><p>支持很好。它在所有浏览器（IE和Opera Mini除外）和Node 7.6+中都得到了支持。</p>
</li>
</ol>
<p>但是并非所有都是完美的......</p>
<h3>切勿滥用async/await</h3>
<p>async / await仍然依赖于Promises，它最终依赖于回调。你需要了解Promises是如何工作的，并且没有Promise.all（）和Promise.race（）的直接等价物。并且不要忘记Promise.all（），它比使用一系列不相关的await命令更有效。</p>
<h3>同步循环中的异步等待</h3>
<p>在某些时候，您将尝试调用异步函数中的同步循环。例如：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> array) {
    <span class="hljs-keyword">await</span> doSomething(i);
  }
}


</code></pre><p>它不会起作用。这也不会：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params">array</span>) </span>{
  array.forEach(<span class="hljs-keyword">async</span> i =&gt; {
    <span class="hljs-keyword">await</span> doSomething(i);
  });
}


</code></pre><p>循环本身保持同步，并且总是在它们的内部异步操作之前完成。</p>
<p>ES2018引入了异步迭代器，它与常规迭代器一样，但next（）方法返回Promise。因此，await关键字可以与for循环一起用于串行运行异步操作。例如：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> array) {
    doSomething(i);
  }
}


</code></pre><p>但是，在实现异步迭代器之前，最好将数组项映射到异步函数并使用Promise.all（）运行它们。例如：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span>
  todo = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>],
  alltodo = todo.map(<span class="hljs-keyword">async</span> (v, i) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'iteration'</span>, i);
    <span class="hljs-keyword">await</span> processSomething(v);
});

<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(alltodo);


</code></pre><p>这具有并行运行任务的好处，但是不可能将一次迭代的结果传递给另一次迭代，并且映射大型数组可能在性能消耗上是很昂贵。</p>
<h3>try/catch 有哪些问题了？</h3>
<p>如果省略任何await失败的try / catch，async函数将以静默方式退出。如果您有一组很长的异步await命令，则可能需要多个try / catch块。</p>
<p>一种替代方案是高阶函数，它捕获错误，因此try / catch块变得不必要(thanks to <a href="https://twitter.com/wesbos/status/911309291545559041">@wesbos</a> for the suggestion):</p>
<pre><code class="hljs actionscript">async <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span><span class="hljs-params">()</span> </span>{

  <span class="hljs-keyword">const</span>
    connection = await asyncDBconnect(<span class="hljs-string">'http://localhost:1234'</span>),
    session = await asyncGetSession(connection),
    user = await asyncGetUser(session),
    log = await asyncLogAccess(user);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-comment">// higher-order function to catch errors</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">catchErrors</span><span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    <span class="hljs-keyword">return</span> fn(...args).catch(err =&gt; {
      console.log(<span class="hljs-string">'ERROR'</span>, err);
    });
  }
}

(async () =&gt; {
  await catchErrors(connect)();
})();


</code></pre><p>但是，在应用程序必须以与其他错误不同的方式对某些错误做出反应的情况下，此选项可能不实用。</p>
<p>尽管有一些陷阱，async / await是JavaScript的一个优雅补充。更多资源：</p>
<ul>
<li><p>MDN <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">await</a></p>
</li>
<li><p><a href="https://developers.google.com/web/fundamentals/primers/async-functions">Async functions – 使 promises 更友好</a></p>
</li>
<li><p><a href="https://tc39.github.io/ecmascript-asyncawait/">TC39 Async Functions 规范</a></p>
</li>
<li><p><a href="https://www.sitepoint.com/simplifying-asynchronous-coding-async-functions/">使用异步函数简化异步编码</a></p>
</li>
</ul>
<h2>JavaScript 旅程</h2>
<p>异步编程是一项在JavaScript中无法避免的挑战。回调在大多数应用程序中都是必不可少的，但它很容易陷入深层嵌套的函数中。</p>
<p>Promises 抽象回调，但有许多语法陷阱。 转换现有函数可能是一件苦差事，而.then（）链仍然看起来很混乱。</p>
<p>幸运的是，async / await提供了清晰度。代码看起来是同步的，但它不能独占单个处理线程。它将改变你编写JavaScript的方式！</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/flow-control-in-modern-js-callbacks-to-promises-to-async-await](https://www.zcfy.cc/article/flow-control-in-modern-js-callbacks-to-promises-to-async-await)
原文标题: 现代JS中的流控制：: Callbacks to Promises to Async/Await
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

---
title: '你真的会在async/await中捕获异常吗？' 
date: 2018-12-18 2:30:11
hidden: true
slug: ru2gmfukaah
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://hueniverse.com/catching-without-awaiting-b2cb7df45790" rel="nofollow noreferrer" target="_blank">Catching without Awaiting</a></p>
<p>当执行一项需要等待一段时间才能返回的任务时，如果使用<code>async/await</code>，就显得比较麻烦了。如果<code>async</code>方法还没有得到返回值，我们就捕获不到其中的异常。</p>
<p>在我的上一篇文章<a href="https://hueniverse.com/learning-to-throw-again-79b498504d28" rel="nofollow noreferrer" target="_blank">Learn to Throw Again</a>中写到，当使用<code>async/await</code>时，如何同时捕获到回调函数和<code>throw</code>抛出的错误。在这篇文章中，我们将讨论如何在“后台”中执行异步操作并捕获异常（这里使用双引号，因为在单线程平台上没有真正的后台操作）</p>
<p>从回调函数的模式开始，思考下列代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function email(user, message, callback) {
  if (!user) {
    // 抛出异常
    throw new Error('Invlid user');
  }
  if (!user.address) {
    // 回调函数，可能抛出异常
    return callback();
  }
  // 异步的
  return mailer.send(user.address, message, callback);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">email</span>(<span class="hljs-params">user, message, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-comment">// 抛出异常</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Invlid user'</span>);
  }
  <span class="hljs-keyword">if</span> (!user.address) {
    <span class="hljs-comment">// 回调函数，可能抛出异常</span>
    <span class="hljs-keyword">return</span> callback();
  }
  <span class="hljs-comment">// 异步的</span>
  <span class="hljs-keyword">return</span> mailer.send(user.address, message, callback);
}</code></pre>
<p>上述代码遵循典型的<code>throw-on-bad-input / callback-asynchronous-errors</code>模式（一旦程序接收到错误的输入，异步抛出异常），如果我们想要发出一封邮件，我们这样调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="email(user, message, () => {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">email(user, message, () =&gt; {});</code></pre>
<p>对于非法的输入，调用这个函数依旧可能抛出异常。但是，如果电子邮件在传输中产生错误，这个函数调用时会忽略异步抛出的错误。</p>
<p>我们把它改为<code>Promise</code>的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function email(user, message) {
  if (!user) {
    throw new Error('Invlid user');
  }
  if (!user.address) {
    return Promise.resolve();
  }
  return mailer.send(user.address, message); // 函数返回一个Promise
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">email</span>(<span class="hljs-params">user, message</span>) </span>{
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Invlid user'</span>);
  }
  <span class="hljs-keyword">if</span> (!user.address) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve();
  }
  <span class="hljs-keyword">return</span> mailer.send(user.address, message); <span class="hljs-comment">// 函数返回一个Promise</span>
}</code></pre>
<p>这样，对于非法的输入，依旧可以捕获到异常。而对于<code>mailer.send()</code>操作则会返回一个<code>Promise</code>，我们能够轻松地通过<code>Promise.catch()</code>捕获到异常：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="email(user, message).catch(() => {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">email(user, message).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {});</code></pre>
<p>不管是回调函数还是<code>Promise</code>，他们都是异步的，我们的应用程序都不会因为<code>email</code>发送而被阻塞。</p>
<p>对于<code>async/await</code>的模式，如果在<code>try...catch</code>语句中不使用<code>await</code>关键字，那么<code>try...catch</code>子句不会真正工作。来看下面的<code>async</code>版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function email(user, message) {
  if (!user) {
    throw new Error('Invlid user');
  }
  if (!user.address) {
    return;
  }
  return mailer.send(user.address, message); // async function
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">email</span>(<span class="hljs-params">user, message</span>) </span>{
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Invlid user'</span>);
  }
  <span class="hljs-keyword">if</span> (!user.address) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">return</span> mailer.send(user.address, message); <span class="hljs-comment">// async function</span>
}</code></pre>
<p>如果我们像这样去调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  email(user, message);
} catch (err) {
  Bounce.rethrow(err, 'system');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
  email(user, message);
} <span class="hljs-keyword">catch</span> (err) {
  Bounce.rethrow(err, <span class="hljs-string">'system'</span>);
}</code></pre>
<p>对于非法的输入错误，仍然会正常地抛出异常，这没问题。但是对于任何异步返回的异常，例如在<code>mailer.send()</code>抛出的异常，则会被忽略掉。不管这种错误我们想不想捕获到，反正都是捕获不到的。为了修补这个<code>bug</code>，则要使用<code>await</code>关键字。但是问题来了，这将会导致整个“后台操作”的阻塞。</p>
<p>有一种方案是混用<code>async/await</code>和<code>Promise</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="email(user, message).catch(() => {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">email(user, message).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {});</code></pre>
<p>但这样的问题在于，对于没有<code>address</code>的用户，这个方法返回的返回值类型并不是<code>Promise</code>，因而其也不会有<code>catch()</code>方法，因此程序会出现<code>TypeError: Cannot read property ‘catch’ of undefined</code>这样的错误。</p>
<p>你可能会尝试直接把<code>email()</code>函数声明为<code>async</code>函数， 并使得它一定会返回一个<code>Promise</code>，但是这并不是一个很好的解决方案，因为<code>async / await</code>其实也只是<code>Promise</code>对象的一层包装。如果不使用<code>await</code>关键字，把一个函数声明为<code>async</code>函数是完全没有必要的。因为<code>async</code>函数总是要通过返回一个<code>Promise</code>，通过<code>next-tick</code>拿到结果，这样会浪费<code>Promise</code>包装和<code>next-tick</code>事件循环机制所造成的性能损耗。</p>
<p>此外，如果要在循环中使用<code>async</code>函数，并且这个循环中执行了很多任务，但是其实很多任务并不是真正意义上异步的，那就没有必要使用<code>async / await</code>，可以参考<code>hapi.js</code>中的<a href="https://github.com/hapijs/hapi/blob/v17.0.1/lib/request.js#L277-L278" rel="nofollow noreferrer" target="_blank">checking if you really need to await</a>下列代码判断是否真的需要使用<code>await</code>，这样或许能获得一些性能的提升：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var response = (typeof func === 'function' ? func(this) : this._invoke(func));
if (response &amp;&amp; typeof response.then === 'function') { // Skip await if no reason to
  response = await response;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> response = (<span class="hljs-keyword">typeof</span> func === <span class="hljs-string">'function'</span> ? func(<span class="hljs-keyword">this</span>) : <span class="hljs-keyword">this</span>._invoke(func));
<span class="hljs-keyword">if</span> (response &amp;&amp; <span class="hljs-keyword">typeof</span> response.then === <span class="hljs-string">'function'</span>) { <span class="hljs-comment">// Skip await if no reason to</span>
  response = <span class="hljs-keyword">await</span> response;
}</code></pre>
<p>判断是否真的需要<code>await</code>，其实就是判断其是否存在<code>then</code>方法，并且<code>then</code>方法是一个函数。因为<code>await</code>的作用其实就是取得一个异步操作的返回结果。</p>
<p>如果你能够保证<code>email</code>方法总是返回一个<code>Promise</code>，我们可以通过更改我们的<code>email()</code>函数来达到这一点，但这样就显得急功近利了！代码显得十分不简洁，而且使用了很不必要的异步操作。在一个完整的<code>async/await</code>函数调用栈中，不需要我们手动构建<code>Promise</code>。对于这个例子来说还好，更重要的是，我们不可能总通过改变<code>email()</code>方法来实现，因为这只是一个例子，在实际运用中，可能<code>email()</code>方法是通过模块引入的。</p>
<p>其中一种解决方案是通过<code>await</code>关键字来调用<code>async</code>函数。通常情况下，在一个函数中使用阻塞操作，如果不等待这个函数执行完成，它不会抛出异常，但是我们可以通过<code>try...catch</code>来包裹：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function backgroundEmail(user, message) {
  try {
    await email(user, message);
  } catch (err) {
    Bounce.rethrow(err, 'system');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">backgroundEmail</span>(<span class="hljs-params">user, message</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> email(user, message);
  } <span class="hljs-keyword">catch</span> (err) {
    Bounce.rethrow(err, <span class="hljs-string">'system'</span>);
  }
}</code></pre>
<p>然后不通过<code>await</code>调用<code>backgroundEmail</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="backgroundEmail(user, message);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">backgroundEmail(user, message);</code></pre>
<p>这样我们不但能够捕获到应用程序的异常，还能够捕获到异步抛出的异常。</p>
<p>为了让异常捕获更加简单，我们使用<a href="https://github.com/hapijs/bounce" rel="nofollow noreferrer" target="_blank">Bounce</a>模块，它提供了一个<code>background()</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Bounce.background(() => email(user, message));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Bounce.background(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> email(user, message));</code></pre>
<p>如果我们使用<code>Node.js</code>的<code>AssertionError</code>原型，这样就能够使得<a href="https://github.com/hapijs/bounce" rel="nofollow noreferrer" target="_blank">Bounce</a>抛出输入异常的错误了。</p>
<p><code>async/await</code>函数去除了一些同步函数(<code>() =&gt; {}</code>)的功能，为了达到和普通函数相同的效果，我们不得不写一些额外的代码来实现。但是使用新的工具库，可以很简便地突破这一限制。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你真的会在async/await中捕获异常吗？

## 原文链接
[https://segmentfault.com/a/1190000012767617](https://segmentfault.com/a/1190000012767617)


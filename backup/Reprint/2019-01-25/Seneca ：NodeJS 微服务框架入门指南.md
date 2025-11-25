---
title: 'Seneca ：NodeJS 微服务框架入门指南' 
date: 2019-01-25 2:30:24
hidden: true
slug: xe4kfnhxlfo
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="http://onmr.com/press/getting-started-seneca.html" rel="nofollow noreferrer" target="_blank">http://onmr.com/press/getting-started-seneca.html</a></p>
<p><a href="http://senecajs.org/" rel="nofollow noreferrer" target="_blank">Seneca</a> 是一个能让您快速构建基于消息的微服务系统的工具集，你不需要知道各种服务本身被部署在何处，不需要知道具体有多少服务存在，也不需要知道他们具体做什么，任何你业务逻辑之外的服务（如数据库、缓存或者第三方集成等）都被隐藏在微服务之后。</p>
<p>这种解耦使您的系统易于连续构建与更新，Seneca 能做到这些，原因在于它的三大核心功能：</p>
<ol>
<li><p><strong>模式匹配</strong>：不同于脆弱的服务发现，模式匹配旨在告诉这个世界你真正关心的消息是什么；</p></li>
<li><p><strong>无依赖传输</strong>：你可以以多种方式在服务之间发送消息，所有这些都隐藏至你的业务逻辑之后；</p></li>
<li><p><strong>组件化</strong>：功能被表示为一组可以一起组成微服务的插件。</p></li>
</ol>
<p>在 Seneca 中，消息就是一个可以有任何你喜欢的内部结构的 <code>JSON</code> 对象，它们可以通过 HTTP/HTTPS、TCP、消息队列、发布/订阅服务或者任何能传输数据的方式进行传输，而对于作为消息生产者的你来讲，你只需要将消息发送出去即可，完全不需要关心哪些服务来接收它们。</p>
<p>然后，你又想告诉这个世界，你想要接收一些消息，这也很简单，你只需在 Seneca 中作一点匹配模式配置即可，匹配模式也很简单，只是一个键值对的列表，这些键值对被用于匹配 <code>JSON</code> 消息的极组属性。</p>
<p>在本文接下来的内容中，我们将一同基于 Seneca 构建一些微服务。</p>
<h1 id="articleHeader0">模式（ <em>Patterns</em> ）</h1>
<p>让我们从一点特别简单的代码开始，我们将创建两个微服务，一个会进行数学计算，另一个去调用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')();

seneca.add('role:math, cmd:sum', (msg, reply) => {
  reply(null, { answer: ( msg.left + msg.right )})
});

seneca.act({
  role: 'math',
  cmd: 'sum',
  left: 1,
  right: 2
}, (err, result) => {
  if (err) {
    return console.error(err);
  }
  console.log(result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)();

seneca.add(<span class="hljs-string">'role:math, cmd:sum'</span>, (msg, reply) =&gt; {
  reply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: ( msg.left + msg.right )})
});

seneca.act({
  <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
  <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>,
  <span class="hljs-attr">left</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">right</span>: <span class="hljs-number">2</span>
}, (err, result) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
  }
  <span class="hljs-built_in">console</span>.log(result);
});</code></pre>
<p>将上面的代码，保存至一个 <code>js</code> 文件中，然后执行它，你可能会在 <code>console</code> 中看到类似下面这样的消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;kind&quot;:&quot;notice&quot;,&quot;notice&quot;:&quot;hello seneca 4y8daxnikuxp/1483577040151/58922/3.2.2/-&quot;,&quot;level&quot;:&quot;info&quot;,&quot;when&quot;:1483577040175}
(node:58922) DeprecationWarning: 'root' is deprecated, use 'global'
{ answer: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{<span class="hljs-string">"kind"</span>:<span class="hljs-string">"notice"</span>,<span class="hljs-string">"notice"</span>:<span class="hljs-string">"hello seneca 4y8daxnikuxp/1483577040151/58922/3.2.2/-"</span>,<span class="hljs-string">"level"</span>:<span class="hljs-string">"info"</span>,<span class="hljs-string">"when"</span>:1483577040175}
(node:58922) DeprecationWarning: <span class="hljs-string">'root'</span> is deprecated, use <span class="hljs-string">'global'</span>
{ answer: 3 }</code></pre>
<p>到目前为止，所有这一切都发生在同一个进程中，没有网络流量产生，进程内的函数调用也是基于消息传输。</p>
<p><code>seneca.add</code> 方法，添加了一个新的动作模式（_Action Pattern_）至 <code>Seneca</code> 实例中，它有两个参数：</p>
<ol>
<li><p><code>pattern</code> ：用于匹配 Seneca 实例中 <code>JSON</code> 消息体的模式；</p></li>
<li><p><code>action</code> ：当模式被匹配时执行的操作</p></li>
</ol>
<p><code>seneca.act</code> 方法同样有两个参数：</p>
<ol>
<li><p><code>msg</code> ：作为纯对象提供的待匹配的入站消息；</p></li>
<li><p><code>respond</code> ：用于接收并处理响应信息的回调函数。</p></li>
</ol>
<p>让我们再把所有代码重新过一次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="seneca.add('role:math, cmd:sum', (msg, reply) => {
  reply(null, { answer: ( msg.left + msg.right )})
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">seneca.add(<span class="hljs-string">'role:math, cmd:sum'</span>, (msg, reply) =&gt; {
  reply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: ( msg.left + msg.right )})
});</code></pre>
<p>在上面的代码中的 <code>Action</code> 函数，计算了匹配到的消息体中两个属性 <code>left</code> 与 <code>right</code> 的值的和，并不是所有的消息都会被创建一个响应，但是在绝大多数情况下，是需要有响应的， Seneca 提供了用于响应消息的回调函数。</p>
<p>在匹配模式中， <code>role:math, cmd:sum</code> 匹配到了下面这个消息体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  role: 'math',
  cmd: 'sum',
  left: 1,
  right: 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
  <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>,
  <span class="hljs-attr">left</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">right</span>: <span class="hljs-number">2</span>
}</code></pre>
<p>并得到计自结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  answer: 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">answer</span>: <span class="hljs-number">3</span>
}</code></pre>
<p>关于 <code>role</code> 与 <code>cmd</code> 这两个属性，它们没有什么特别的，只是恰好被你用于匹配模式而已。</p>
<p>接着，<code>seneca.act</code> 方法，发送了一条消息，它有两个参数：</p>
<ol>
<li><p><code>msg</code> ：发送的消息主体</p></li>
<li><p><code>response_callback</code> ：如果该消息有任何响应，该回调函数都会被执行。</p></li>
</ol>
<p>响应的回调函数可接收两个参数： <code>error</code> 与 <code>result</code> ，如果有任何错误发生（比如，发送出去的消息未被任何模式匹配），则第一个参数将是一个 <code>Error</code> 对象，而如果程序按照我们所预期的方向执行了的话，那么，第二个参数将接收到响应结果，在我们的示例中，我们只是简单的将接收到的响应结果打印至了 <code>console</code> 而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="seneca.act({
  role: 'math',
  cmd: 'sum',
  left: 1,
  right: 2
}, (err, result) => {
  if (err) {
    return console.error(err);
  }
  console.log(result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">seneca.act({
  <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
  <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>,
  <span class="hljs-attr">left</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">right</span>: <span class="hljs-number">2</span>
}, (err, result) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
  }
  <span class="hljs-built_in">console</span>.log(result);
});</code></pre>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/sum.js" rel="nofollow noreferrer" target="_blank">sum.js</a> 示例文件，向你展示了如何定义并创建一个 Action 以及如何呼起一个 Action，但它们都发生在一个进程中，接下来，我们很快就会展示如何拆分成不同的代码和多个进程。</p>
<h1 id="articleHeader1">匹配模式如何工作？</h1>
<p>模式----而不是网络地址或者会话，让你可以更加容易的扩展或增强您的系统，这样做，让添加新的微服务变得更简单。</p>
<p>现在让我们给系统再添加一个新的功能----计算两个数字的乘积。</p>
<p>我们想要发送的消息看起来像下面这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  role: 'math',
  cmd: 'product',
  left: 3,
  right: 4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
  <span class="hljs-attr">cmd</span>: <span class="hljs-string">'product'</span>,
  <span class="hljs-attr">left</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">right</span>: <span class="hljs-number">4</span>
}</code></pre>
<p>而后获得的结果看起来像下面这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  answer: 12
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">answer</span>: <span class="hljs-number">12</span>
}</code></pre>
<p>知道怎么做了吧？你可以像 <code>role: math, cmd: sum</code> 模式这样，创建一个 <code>role: math, cmd: product</code> 操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="seneca.add('role:math, cmd:product', (msg, reply) => {
  reply(null, { answer: ( msg.left * msg.right )})
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">seneca.add(<span class="hljs-string">'role:math, cmd:product'</span>, (msg, reply) =&gt; {
  reply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: ( msg.left * msg.right )})
});</code></pre>
<p>然后，调用该操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="seneca.act({
  role: 'math',
  cmd: 'product',
  left: 3,
  right: 4
}, (err, result) => {
  if (err) {
    return console.error(err);
  }
  console.log(result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">seneca.act({
  <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
  <span class="hljs-attr">cmd</span>: <span class="hljs-string">'product'</span>,
  <span class="hljs-attr">left</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">right</span>: <span class="hljs-number">4</span>
}, (err, result) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
  }
  <span class="hljs-built_in">console</span>.log(result);
});</code></pre>
<p>运行 <a href="https://github.com/pantao/getting-started-seneca/blob/master/product.js" rel="nofollow noreferrer" target="_blank">product.js</a> ，你将得到你想要的结果。</p>
<p>将这两个方法放在一起，代码像是下面这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')();

seneca.add('role:math, cmd:sum', (msg, reply) => {
  reply(null, { answer: ( msg.left + msg.right )})
});

seneca.add('role:math, cmd:product', (msg, reply) => {
  reply(null, { answer: ( msg.left * msg.right )})
});

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, console.log)
      .act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)();

seneca.add(<span class="hljs-string">'role:math, cmd:sum'</span>, (msg, reply) =&gt; {
  reply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: ( msg.left + msg.right )})
});

seneca.add(<span class="hljs-string">'role:math, cmd:product'</span>, (msg, reply) =&gt; {
  reply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: ( msg.left * msg.right )})
});

seneca.act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2</span>}, <span class="hljs-built_in">console</span>.log)
      .act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'product'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">4</span>}, <span class="hljs-built_in">console</span>.log)</code></pre>
<p>运行 <a href="https://github.com/pantao/getting-started-seneca/blob/master/sum-product.js" rel="nofollow noreferrer" target="_blank">sum-product.js</a> 后，你将得到下面这样的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null { answer: 3 }
null { answer: 12 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">null { answer: 3 }
null { answer: 12 }</code></pre>
<p>在上面合并到一起的代码中，我们发现， <code>seneca.act</code> 是可以进行链式调用的，<code>Seneca</code> 提供了一个链式API，调式调用是顺序执行的，但是不是串行，所以，返回的结果的顺序可能与调用顺序并不一样。</p>
<h1 id="articleHeader2">扩展模式以增加新功能</h1>
<p>模式让你可以更加容易的扩展程序的功能，与 <code>if...else...</code> 语法不同的是，你可以通过增加更多的匹配模式以达到同样的功能。</p>
<p>下面让我们扩展一下 <code>role: math, cmd: sum</code> 操作，它只接收整型数字，那么，怎么做？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
  var sum = Math.floor(msg.left) + Math.floor(msg.right)
  respond(null, {answer: sum})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">seneca.add({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">integer</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
  <span class="hljs-keyword">var</span> sum = <span class="hljs-built_in">Math</span>.floor(msg.left) + <span class="hljs-built_in">Math</span>.floor(msg.right)
  respond(<span class="hljs-literal">null</span>, {<span class="hljs-attr">answer</span>: sum})
})</code></pre>
<p>现在，下面这条消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>, <span class="hljs-attr">integer</span>: <span class="hljs-literal">true</span>}</code></pre>
<p>将得到下面这样的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{answer: 3}  // == 1 + 2，小数部分已经被移除了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">answer</span>: <span class="hljs-number">3</span>}  <span class="hljs-comment">// == 1 + 2，小数部分已经被移除了</span></code></pre>
<p>代码可在 <a href="https://github.com/pantao/getting-started-seneca/blob/master/sum-integer.js" rel="nofollow noreferrer" target="_blank">sum-integer.js</a> 中查看。</p>
<p>现在，你的两个模式都存在于系统中了，而且还存在交叉部分，那么 <code>Seneca</code> 最终会将消息匹配至哪条模式呢？原则是：更多匹配项目被匹配到的优先，被匹配到的属性越多，则优先级越高。</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/pattern-priority-testing.js" rel="nofollow noreferrer" target="_blank">pattern-priority-testing.js</a> 可以给我们更加直观的测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')()

seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
})

// 下面两条消息都匹配 role: math, cmd: sum

seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log)
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log)

setTimeout(() => {
  seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
    var sum = Math.floor(msg.left) + Math.floor(msg.right)
    respond(null, { answer: sum })
  })

  // 下面这条消息同样匹配 role: math, cmd: sum
  seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log)

  // 但是，也匹配 role:math,cmd:sum,integer:true
  // 但是因为更多属性被匹配到，所以，它的优先级更高
  seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log)
}, 100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()

seneca.add({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
  <span class="hljs-keyword">var</span> sum = msg.left + msg.right
  respond(<span class="hljs-literal">null</span>, {<span class="hljs-attr">answer</span>: sum})
})

<span class="hljs-comment">// 下面两条消息都匹配 role: math, cmd: sum</span>

seneca.act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>}, <span class="hljs-built_in">console</span>.log)
seneca.act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>, <span class="hljs-attr">integer</span>: <span class="hljs-literal">true</span>}, <span class="hljs-built_in">console</span>.log)

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  seneca.add({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">integer</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">var</span> sum = <span class="hljs-built_in">Math</span>.floor(msg.left) + <span class="hljs-built_in">Math</span>.floor(msg.right)
    respond(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: sum })
  })

  <span class="hljs-comment">// 下面这条消息同样匹配 role: math, cmd: sum</span>
  seneca.act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>}, <span class="hljs-built_in">console</span>.log)

  <span class="hljs-comment">// 但是，也匹配 role:math,cmd:sum,integer:true</span>
  <span class="hljs-comment">// 但是因为更多属性被匹配到，所以，它的优先级更高</span>
  seneca.act({<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>, <span class="hljs-attr">integer</span>: <span class="hljs-literal">true</span>}, <span class="hljs-built_in">console</span>.log)
}, <span class="hljs-number">100</span>)</code></pre>
<p>输出结果应该像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null { answer: 4 }
null { answer: 4 }
null { answer: 4 }
null { answer: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">null { answer: 4 }
null { answer: 4 }
null { answer: 4 }
null { answer: 3 }</code></pre>
<p>在上面的代码中，因为系统中只存在 <code>role: math, cmd: sum</code> 模式，所以，都匹配到它，但是当 100ms 后，我们给系统中添加了一个 <code>role: math, cmd: sum, integer: true</code> 模式之后，结果就不一样了，匹配到更多的操作将有更高的优先级。</p>
<p>这种设计，可以让我们的系统可以更加简单的添加新的功能，不管是在开发环境还是在生产环境中，你都可以在不需要修改现有代码的前提下即可更新新的服务，你只需要先好新的服务，然后启动新服务即可。</p>
<h1 id="articleHeader3">基于模式的代码复用</h1>
<p>模式操作还可以调用其它的操作，所以，这样我们可以达到代码复用的需求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')()

seneca.add('role: math, cmd: sum', function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
})

seneca.add('role: math, cmd: sum, integer: true', function (msg, respond) {
  // 复用 role:math, cmd:sum
  this.act({
    role: 'math',
    cmd: 'sum',
    left: Math.floor(msg.left),
    right: Math.floor(msg.right)
  }, respond)
})

// 匹配 role:math,cmd:sum
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5',console.log)

// 匹配 role:math,cmd:sum,integer:true
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5, integer: true', console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()

seneca.add(<span class="hljs-string">'role: math, cmd: sum'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
  <span class="hljs-keyword">var</span> sum = msg.left + msg.right
  respond(<span class="hljs-literal">null</span>, {<span class="hljs-attr">answer</span>: sum})
})

seneca.add(<span class="hljs-string">'role: math, cmd: sum, integer: true'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
  <span class="hljs-comment">// 复用 role:math, cmd:sum</span>
  <span class="hljs-keyword">this</span>.act({
    <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
    <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>,
    <span class="hljs-attr">left</span>: <span class="hljs-built_in">Math</span>.floor(msg.left),
    <span class="hljs-attr">right</span>: <span class="hljs-built_in">Math</span>.floor(msg.right)
  }, respond)
})

<span class="hljs-comment">// 匹配 role:math,cmd:sum</span>
seneca.act(<span class="hljs-string">'role: math, cmd: sum, left: 1.5, right: 2.5'</span>,<span class="hljs-built_in">console</span>.log)

<span class="hljs-comment">// 匹配 role:math,cmd:sum,integer:true</span>
seneca.act(<span class="hljs-string">'role: math, cmd: sum, left: 1.5, right: 2.5, integer: true'</span>, <span class="hljs-built_in">console</span>.log)</code></pre>
<p>在上面的示例代码中，我们使用了 <code>this.act</code> 而不是前面的 <code>seneca.act</code>，那是因为，在 <code>action</code> 函数中，上下文关系变量 <code>this</code> ，引用了当前的 <code>seneca</code> 实例，这样你就可以在任何一个 <code>action</code> 函数中，访问到该 <code>action</code> 调用的整个上下文。</p>
<p>在上面的代码中，我们使用了 JSON 缩写形式来描述模式与消息， 比如，下面是对象字面量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{role: 'math', cmd: 'sum', left: 1.5, right: 2.5}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>, <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">2.5</span>}</code></pre>
<p>缩写模式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'role: math, cmd: sum, left: 1.5, right: 2.5'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code class="text" style="word-break: break-word; white-space: initial;">'role: math, cmd: <span class="hljs-built_in">sum</span>, <span class="hljs-built_in">left</span>: <span class="hljs-number">1.5</span>, <span class="hljs-built_in">right</span>: <span class="hljs-number">2.5</span>'</code></pre>
<p><a href="https://github.com/rjrodger/jsonic" rel="nofollow noreferrer" target="_blank">jsonic</a> 这种格式，提供了一种以字符串字面量来表达对象的简便方式，这使得我们可以创建更加简单的模式和消息。</p>
<p>上面的代码保存在了 <a href="https://github.com/pantao/getting-started-seneca/blob/master/sum-reuse.js" rel="nofollow noreferrer" target="_blank">sum-reuse.js</a> 文件中。</p>
<h1 id="articleHeader4">模式是唯一的</h1>
<p>你定义的 Action 模式都是唯一了，它们只能触发一个函数，模式的解析规则如下：</p>
<ul>
<li><p>更多我属性优先级更高</p></li>
<li><p>若模式具有相同的数量的属性，则按字母顺序匹配</p></li>
</ul>
<p>规则被设计得很简单，这使得你可以更加简单的了解到到底是哪个模式被匹配了。</p>
<p>下面这些示例可以让你更容易理解：</p>
<ul>
<li><p><code>a: 1, b: 2</code> 优先于 <code>a: 1</code>， 因为它有更多的属性；</p></li>
<li><p><code>a: 1, b: 2</code> 优先于 <code>a: 1, c: 3</code>，因为 <code>b</code> 在 <code>c</code> 字母的前面；</p></li>
<li><p><code>a: 1, b: 2, d: 4</code> 优先于 <code>a: 1, c: 3, d:4</code>，因为 <code>b</code> 在 <code>c</code> 字母的前面；</p></li>
<li><p><code>a: 1, b:2, c:3</code> 优先于 <code>a:1, b: 2</code>，因为它有更多的属性；</p></li>
<li><p><code>a: 1, b:2, c:3</code> 优先于 <code>a:1, c:3</code>，因为它有更多的属性。</p></li>
</ul>
<p>很多时间，提供一种可以让你不需要全盘修改现有 Action 函数的代码即可增加它功能的方法是很有必要的，比如，你可能想为某一个消息增加更多自定义的属性验证方法，捕获消息统计信息，添加额外的数据库结果中，或者控制消息流速等。</p>
<p>我下面的示例代码中，加法操作期望 <code>left</code> 和 <code>right</code> 属性是有限数，此外，为了调试目的，将原始输入参数附加到输出的结果中也是很有用的，您可以使用以下代码添加验证检查和调试信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')()

seneca
  .add(
    'role:math,cmd:sum',
    function(msg, respond) {
      var sum = msg.left + msg.right
      respond(null, {
        answer: sum
      })
    })

// 重写 role:math,cmd:sum with ，添加额外的功能
.add(
  'role:math,cmd:sum',
  function(msg, respond) {

    // bail out early if there's a problem
    if (!Number.isFinite(msg.left) ||
      !Number.isFinite(msg.right)) {
      return respond(new Error(&quot;left 与 right 值必须为数字。&quot;))
    }

    // 调用上一个操作函数 role:math,cmd:sum
    this.prior({
      role: 'math',
      cmd: 'sum',
      left: msg.left,
      right: msg.right,

    }, function(err, result) {
      if (err) return respond(err)

      result.info = msg.left + '+' + msg.right
      respond(null, result)
    })
  })

// 增加了的 role:math,cmd:sum
.act('role:math,cmd:sum,left:1.5,right:2.5',
  console.log // 打印 { answer: 4, info: '1.5+2.5' }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()

seneca
  .add(
    <span class="hljs-string">'role:math,cmd:sum'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
      <span class="hljs-keyword">var</span> sum = msg.left + msg.right
      respond(<span class="hljs-literal">null</span>, {
        <span class="hljs-attr">answer</span>: sum
      })
    })

<span class="hljs-comment">// 重写 role:math,cmd:sum with ，添加额外的功能</span>
.add(
  <span class="hljs-string">'role:math,cmd:sum'</span>,
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{

    <span class="hljs-comment">// bail out early if there's a problem</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Number</span>.isFinite(msg.left) ||
      !<span class="hljs-built_in">Number</span>.isFinite(msg.right)) {
      <span class="hljs-keyword">return</span> respond(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"left 与 right 值必须为数字。"</span>))
    }

    <span class="hljs-comment">// 调用上一个操作函数 role:math,cmd:sum</span>
    <span class="hljs-keyword">this</span>.prior({
      <span class="hljs-attr">role</span>: <span class="hljs-string">'math'</span>,
      <span class="hljs-attr">cmd</span>: <span class="hljs-string">'sum'</span>,
      <span class="hljs-attr">left</span>: msg.left,
      <span class="hljs-attr">right</span>: msg.right,

    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> respond(err)

      result.info = msg.left + <span class="hljs-string">'+'</span> + msg.right
      respond(<span class="hljs-literal">null</span>, result)
    })
  })

<span class="hljs-comment">// 增加了的 role:math,cmd:sum</span>
.act(<span class="hljs-string">'role:math,cmd:sum,left:1.5,right:2.5'</span>,
  <span class="hljs-built_in">console</span>.log <span class="hljs-comment">// 打印 { answer: 4, info: '1.5+2.5' }</span>
)</code></pre>
<p><code>seneca</code> 实例提供了一个名为 <code>prior</code> 的方法，让可以在当前的 <code>action</code> 方法中，调用被其重写的旧操作函数。</p>
<p><code>prior</code> 函数接受两个参数：</p>
<ol>
<li><p><code>msg</code>：消息体</p></li>
<li><p><code>response_callback</code>：回调函数</p></li>
</ol>
<p>在上面的示例代码中，已经演示了如何修改入参与出参，修改这些参数与值是可选的，比如，可以再添加新的重写，以增加日志记录功能。</p>
<p>在上面的示例中，也同样演示了如何更好的进行错误处理，我们在真正进行操作之前，就验证的数据的正确性，若传入的参数本身就有错误，那么我们直接就返回错误信息，而不需要等待真正计算的时候由系统去报错了。</p>
<blockquote><p>错误消息应该只被用于描述错误的输入或者内部失败信息等，比如，如果你执行了一些数据库的查询，返回没有任何数据，这并不是一个错误，而仅仅只是数据库的事实的反馈，但是如果连接数据库失败，那就是一个错误了。</p></blockquote>
<p>上面的代码可以在 <a href="https://github.com/pantao/getting-started-seneca/blob/master/sum-valid.js" rel="nofollow noreferrer" target="_blank">sum-valid.js</a> 文件中找到。</p>
<h1 id="articleHeader5">使用插件组织模式</h1>
<p>一个 <code>seneca</code> 实例，其实就只是多个 <code>Action Patterm</code> 的集合而已，你可以使用命名空间的方式来组织操作模式，例如在前面的示例中，我们都使用了 <code>role: math</code>，为了帮助日志记录和调试， <code>Seneca</code> 还支持一个简约的插件支持。</p>
<p>同样，Seneca插件只是一组操作模式的集合，它可以有一个名称，用于注释日志记录条目，还可以给插件一组选项来控制它们的行为，插件还提供了以正确的顺序执行初始化函数的机制，例如，您希望在尝试从数据库读取数据之前建立数据库连接。</p>
<p>简单来说，Seneca插件就只是一个具有单个参数选项的函数，你将这个插件定义函数传递给 <code>seneca.use</code> 方法，下面这个是最小的Seneca插件（其实它什么也没做！）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function minimal_plugin(options) {
  console.log(options)
}

require('seneca')()
  .use(minimal_plugin, {foo: 'bar'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">minimal_plugin</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-built_in">console</span>.log(options)
}

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(minimal_plugin, {<span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>})</code></pre>
<p><code>seneca.use</code> 方法接受两个参数：</p>
<ol>
<li><p><code>plugin</code> ：插件定义函数或者一个插件名称；</p></li>
<li><p><code>options</code> ：插件配置选项</p></li>
</ol>
<p>上面的示例代码执行后，打印出来的日志看上去是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;kind&quot;:&quot;notice&quot;,&quot;notice&quot;:&quot;hello seneca 3qk0ij5t2bta/1483584697034/62768/3.2.2/-&quot;,&quot;level&quot;:&quot;info&quot;,&quot;when&quot;:1483584697057}
(node:62768) DeprecationWarning: 'root' is deprecated, use 'global'
{ foo: 'bar' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{<span class="hljs-string">"kind"</span>:<span class="hljs-string">"notice"</span>,<span class="hljs-string">"notice"</span>:<span class="hljs-string">"hello seneca 3qk0ij5t2bta/1483584697034/62768/3.2.2/-"</span>,<span class="hljs-string">"level"</span>:<span class="hljs-string">"info"</span>,<span class="hljs-string">"when"</span>:1483584697057}
(node:62768) DeprecationWarning: <span class="hljs-string">'root'</span> is deprecated, use <span class="hljs-string">'global'</span>
{ foo: <span class="hljs-string">'bar'</span> }</code></pre>
<p>Seneca 还提供了详细日志记录功能，可以提供为开发或者生产提供更多的日志信息，通常的，日志级别被设置为 <code>INFO</code>，它并不会打印太多日志信息，如果想看到所有的日志信息，试试以下面这样的方式启动你的服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node minimal-plugin.js --seneca.log.all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node minimal-plugin.js --seneca.log.all</code></pre>
<p>会不会被吓一跳？当然，你还可以过滤日志信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node minimal-plugin.js --seneca.log.all | grep plugin:define" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node minimal-plugin.js --seneca.log.all | grep plugin:define</code></pre>
<p>通过日志我们可以看到， seneca 加载了很多内置的插件，比如 <code>basic</code>、<code>transport</code>、<code>web</code> 以及 <code>mem-store</code>，这些插件为我们提供了创建微服务的基础功能，同样，你应该也可以看到 <code>minimal_plugin</code> 插件。</p>
<p>现在，让我们为这个插件添加一些操作模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function math(options) {

  this.add('role:math,cmd:sum', function (msg, respond) {
    respond(null, { answer: msg.left + msg.right })
  })

  this.add('role:math,cmd:product', function (msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

}

require('seneca')()
  .use(math)
  .act('role:math,cmd:sum,left:1,right:2', console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">math</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:sum'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    respond(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: msg.left + msg.right })
  })

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:product'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    respond(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: msg.left * msg.right })
  })

}

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(math)
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>, <span class="hljs-built_in">console</span>.log)</code></pre>
<p>运行 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math-plugin.js" rel="nofollow noreferrer" target="_blank">math-plugin.js</a> 文件，得到下面这样的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null { answer: 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">null { answer: 3 }</code></pre>
<p>看打印出来的一条日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;actid&quot;: &quot;7ubgm65mcnfl/uatuklury90r&quot;,
  &quot;msg&quot;: {
    &quot;role&quot;: &quot;math&quot;,
    &quot;cmd&quot;: &quot;sum&quot;,
    &quot;left&quot;: 1,
    &quot;right&quot;: 2,
    &quot;meta$&quot;: {
      &quot;id&quot;: &quot;7ubgm65mcnfl/uatuklury90r&quot;,
      &quot;tx&quot;: &quot;uatuklury90r&quot;,
      &quot;pattern&quot;: &quot;cmd:sum,role:math&quot;,
      &quot;action&quot;: &quot;(bjx5u38uwyse)&quot;,
      &quot;plugin_name&quot;: &quot;math&quot;,
      &quot;plugin_tag&quot;: &quot;-&quot;,
      &quot;prior&quot;: {
        &quot;chain&quot;: [],
        &quot;entry&quot;: true,
        &quot;depth&quot;: 0
      },
      &quot;start&quot;: 1483587274794,
      &quot;sync&quot;: true
    },
    &quot;plugin$&quot;: {
      &quot;name&quot;: &quot;math&quot;,
      &quot;tag&quot;: &quot;-&quot;
    },
    &quot;tx$&quot;: &quot;uatuklury90r&quot;
  },
  &quot;entry&quot;: true,
  &quot;prior&quot;: [],
  &quot;meta&quot;: {
    &quot;plugin_name&quot;: &quot;math&quot;,
    &quot;plugin_tag&quot;: &quot;-&quot;,
    &quot;plugin_fullname&quot;: &quot;math&quot;,
    &quot;raw&quot;: {
      &quot;role&quot;: &quot;math&quot;,
      &quot;cmd&quot;: &quot;sum&quot;
    },
    &quot;sub&quot;: false,
    &quot;client&quot;: false,
    &quot;args&quot;: {
      &quot;role&quot;: &quot;math&quot;,
      &quot;cmd&quot;: &quot;sum&quot;
    },
    &quot;rules&quot;: {},
    &quot;id&quot;: &quot;(bjx5u38uwyse)&quot;,
    &quot;pattern&quot;: &quot;cmd:sum,role:math&quot;,
    &quot;msgcanon&quot;: {
      &quot;cmd&quot;: &quot;sum&quot;,
      &quot;role&quot;: &quot;math&quot;
    },
    &quot;priorpath&quot;: &quot;&quot;
  },
  &quot;client&quot;: false,
  &quot;listen&quot;: false,
  &quot;transport&quot;: {},
  &quot;kind&quot;: &quot;act&quot;,
  &quot;case&quot;: &quot;OUT&quot;,
  &quot;duration&quot;: 35,
  &quot;result&quot;: {
    &quot;answer&quot;: 3
  },
  &quot;level&quot;: &quot;debug&quot;,
  &quot;plugin_name&quot;: &quot;math&quot;,
  &quot;plugin_tag&quot;: &quot;-&quot;,
  &quot;pattern&quot;: &quot;cmd:sum,role:math&quot;,
  &quot;when&quot;: 1483587274829
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"actid"</span>: <span class="hljs-string">"7ubgm65mcnfl/uatuklury90r"</span>,
  <span class="hljs-string">"msg"</span>: {
    <span class="hljs-string">"role"</span>: <span class="hljs-string">"math"</span>,
    <span class="hljs-string">"cmd"</span>: <span class="hljs-string">"sum"</span>,
    <span class="hljs-string">"left"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">"right"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">"meta$"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-string">"7ubgm65mcnfl/uatuklury90r"</span>,
      <span class="hljs-string">"tx"</span>: <span class="hljs-string">"uatuklury90r"</span>,
      <span class="hljs-string">"pattern"</span>: <span class="hljs-string">"cmd:sum,role:math"</span>,
      <span class="hljs-string">"action"</span>: <span class="hljs-string">"(bjx5u38uwyse)"</span>,
      <span class="hljs-string">"plugin_name"</span>: <span class="hljs-string">"math"</span>,
      <span class="hljs-string">"plugin_tag"</span>: <span class="hljs-string">"-"</span>,
      <span class="hljs-string">"prior"</span>: {
        <span class="hljs-string">"chain"</span>: [],
        <span class="hljs-string">"entry"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-string">"depth"</span>: <span class="hljs-number">0</span>
      },
      <span class="hljs-string">"start"</span>: <span class="hljs-number">1483587274794</span>,
      <span class="hljs-string">"sync"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-string">"plugin$"</span>: {
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"math"</span>,
      <span class="hljs-string">"tag"</span>: <span class="hljs-string">"-"</span>
    },
    <span class="hljs-string">"tx$"</span>: <span class="hljs-string">"uatuklury90r"</span>
  },
  <span class="hljs-string">"entry"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"prior"</span>: [],
  <span class="hljs-string">"meta"</span>: {
    <span class="hljs-string">"plugin_name"</span>: <span class="hljs-string">"math"</span>,
    <span class="hljs-string">"plugin_tag"</span>: <span class="hljs-string">"-"</span>,
    <span class="hljs-string">"plugin_fullname"</span>: <span class="hljs-string">"math"</span>,
    <span class="hljs-string">"raw"</span>: {
      <span class="hljs-string">"role"</span>: <span class="hljs-string">"math"</span>,
      <span class="hljs-string">"cmd"</span>: <span class="hljs-string">"sum"</span>
    },
    <span class="hljs-string">"sub"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"client"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"args"</span>: {
      <span class="hljs-string">"role"</span>: <span class="hljs-string">"math"</span>,
      <span class="hljs-string">"cmd"</span>: <span class="hljs-string">"sum"</span>
    },
    <span class="hljs-string">"rules"</span>: {},
    <span class="hljs-string">"id"</span>: <span class="hljs-string">"(bjx5u38uwyse)"</span>,
    <span class="hljs-string">"pattern"</span>: <span class="hljs-string">"cmd:sum,role:math"</span>,
    <span class="hljs-string">"msgcanon"</span>: {
      <span class="hljs-string">"cmd"</span>: <span class="hljs-string">"sum"</span>,
      <span class="hljs-string">"role"</span>: <span class="hljs-string">"math"</span>
    },
    <span class="hljs-string">"priorpath"</span>: <span class="hljs-string">""</span>
  },
  <span class="hljs-string">"client"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"listen"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"transport"</span>: {},
  <span class="hljs-string">"kind"</span>: <span class="hljs-string">"act"</span>,
  <span class="hljs-string">"case"</span>: <span class="hljs-string">"OUT"</span>,
  <span class="hljs-string">"duration"</span>: <span class="hljs-number">35</span>,
  <span class="hljs-string">"result"</span>: {
    <span class="hljs-string">"answer"</span>: <span class="hljs-number">3</span>
  },
  <span class="hljs-string">"level"</span>: <span class="hljs-string">"debug"</span>,
  <span class="hljs-string">"plugin_name"</span>: <span class="hljs-string">"math"</span>,
  <span class="hljs-string">"plugin_tag"</span>: <span class="hljs-string">"-"</span>,
  <span class="hljs-string">"pattern"</span>: <span class="hljs-string">"cmd:sum,role:math"</span>,
  <span class="hljs-string">"when"</span>: <span class="hljs-number">1483587274829</span>
}</code></pre>
<p>所有的该插件的日志都被自动的添加了 <code>plugin</code> 属性。</p>
<p>在 Seneca 的世界中，我们通过插件组织各种操作模式集合，这让日志与调试变得更简单，然后你还可以将多个插件合并成为各种微服务，在接下来的章节中，我们将创建一个 <code>math</code> 服务。</p>
<p>插件通过需要进行一些初始化的工作，比如连接数据库等，但是，你并不需要在插件的定义函数中去执行这些初始化，定义函数被设计为同步执行的，因为它的所有操作都是在定义一个插件，事实上，你不应该在定义函数中调用 <code>seneca.act</code> 方法，只调用 <code>seneca.add</code> 方法。</p>
<p>要初始化插件，你需要定义一个特殊的匹配模式 <code>init: &lt;plugin-name&gt;</code>，对于每一个插件，将按顺序调用此操作模式，<code>init</code> 函数必须调用其 <code>callback</code> 函数，并且不能有错误发生，如果插件初始化失败，则 Seneca 会立即退出 Node 进程。所以的插件初始化工作都必须在任何操作执行之前完成。</p>
<p>为了演示初始化，让我们向 <code>math</code> 插件添加简单的自定义日志记录，当插件启动时，它打开一个日志文件，并将所有操作的日志写入文件，文件需要成功打开并且可写，如果这失败，微服务启动就应该失败。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')

function math(options) {

  // 日志记录函数，通过 init 函数创建
  var log

  // 将所有模式放在一起会上我们查找更方便
  this.add('role:math,cmd:sum',     sum)
  this.add('role:math,cmd:product', product)

  // 这就是那个特殊的初始化操作
  this.add('init:math', init)

  function init(msg, respond) {
    // 将日志记录至一个特写的文件中
    fs.open(options.logfile, 'a', function (err, fd) {

      // 如果不能读取或者写入该文件，则返回错误，这会导致 Seneca 启动失败
      if (err) return respond(err)

      log = makeLog(fd)
      respond()
    })
  }

  function sum(msg, respond) {
    var out = { answer: msg.left + msg.right }
    log('sum '+msg.left+'+'+msg.right+'='+out.answer+'\n')
    respond(null, out)
  }

  function product(msg, respond) {
    var out = { answer: msg.left * msg.right }
    log('product '+msg.left+'*'+msg.right+'='+out.answer+'\n')
    respond(null, out)
  }

  function makeLog(fd) {
    return function (entry) {
      fs.write(fd, new Date().toISOString()+' '+entry, null, 'utf8', function (err) {
        if (err) return console.log(err)

        // 确保日志条目已刷新
        fs.fsync(fd, function (err) {
          if (err) return console.log(err)
        })
      })
    }
  }
}

require('seneca')()
  .use(math, {logfile:'./math.log'})
  .act('role:math,cmd:sum,left:1,right:2', console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">math</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-comment">// 日志记录函数，通过 init 函数创建</span>
  <span class="hljs-keyword">var</span> log

  <span class="hljs-comment">// 将所有模式放在一起会上我们查找更方便</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:sum'</span>,     sum)
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:product'</span>, product)

  <span class="hljs-comment">// 这就是那个特殊的初始化操作</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'init:math'</span>, init)

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-comment">// 将日志记录至一个特写的文件中</span>
    fs.open(options.logfile, <span class="hljs-string">'a'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, fd</span>) </span>{

      <span class="hljs-comment">// 如果不能读取或者写入该文件，则返回错误，这会导致 Seneca 启动失败</span>
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> respond(err)

      log = makeLog(fd)
      respond()
    })
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">var</span> out = { <span class="hljs-attr">answer</span>: msg.left + msg.right }
    log(<span class="hljs-string">'sum '</span>+msg.left+<span class="hljs-string">'+'</span>+msg.right+<span class="hljs-string">'='</span>+out.answer+<span class="hljs-string">'\n'</span>)
    respond(<span class="hljs-literal">null</span>, out)
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">product</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">var</span> out = { <span class="hljs-attr">answer</span>: msg.left * msg.right }
    log(<span class="hljs-string">'product '</span>+msg.left+<span class="hljs-string">'*'</span>+msg.right+<span class="hljs-string">'='</span>+out.answer+<span class="hljs-string">'\n'</span>)
    respond(<span class="hljs-literal">null</span>, out)
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeLog</span>(<span class="hljs-params">fd</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">entry</span>) </span>{
      fs.write(fd, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toISOString()+<span class="hljs-string">' '</span>+entry, <span class="hljs-literal">null</span>, <span class="hljs-string">'utf8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err)

        <span class="hljs-comment">// 确保日志条目已刷新</span>
        fs.fsync(fd, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err)
        })
      })
    }
  }
}

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(math, {<span class="hljs-attr">logfile</span>:<span class="hljs-string">'./math.log'</span>})
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>, <span class="hljs-built_in">console</span>.log)</code></pre>
<p>在上面这个插件的代码中，匹配模式被组织在插件的顶部，以便它们更容易被看到，函数在这些模式下面一点被定义，您还可以看到如何使用选项提供自定义日志文件的位置（不言而喻，这不是生产日志！）。</p>
<p>初始化函数 <code>init</code> 执行一些异步文件系统工作，因此必须在执行任何操作之前完成。 如果失败，整个服务将无法初始化。要查看失败时的操作，可以尝试将日志文件位置更改为无效的，例如 <code>/math.log</code>。</p>
<p>以上代码可以在 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math-plugin-init.js" rel="nofollow noreferrer" target="_blank">math-plugin-init.js</a> 文件中找到。</p>
<h1 id="articleHeader6">创建微服务</h1>
<p>现在让我们把 <code>math</code> 插件变成一个真正的微服务。首先，你需要组织你的插件。 <code>math</code> 插件的业务逻辑 ---- 即它提供的功能，与它以何种方式与外部世界通信是分开的，你可能会暴露一个Web服务，也有可能在消息总线上监听。</p>
<p>将业务逻辑（即插件定义）放在其自己的文件中是有意义的。 Node.js 模块即可完美的实现，创建一个名为 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math.js" rel="nofollow noreferrer" target="_blank">math.js</a> 的文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function math(options) {

  this.add('role:math,cmd:sum', function sum(msg, respond) {
    respond(null, { answer: msg.left + msg.right })
  })

  this.add('role:math,cmd:product', function product(msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

  this.wrap('role:math', function (msg, respond) {
    msg.left  = Number(msg.left).valueOf()
    msg.right = Number(msg.right).valueOf()
    this.prior(msg, respond)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">math</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:sum'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">msg, respond</span>) </span>{
    respond(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: msg.left + msg.right })
  })

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:math,cmd:product'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">product</span>(<span class="hljs-params">msg, respond</span>) </span>{
    respond(<span class="hljs-literal">null</span>, { <span class="hljs-attr">answer</span>: msg.left * msg.right })
  })

  <span class="hljs-keyword">this</span>.wrap(<span class="hljs-string">'role:math'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    msg.left  = <span class="hljs-built_in">Number</span>(msg.left).valueOf()
    msg.right = <span class="hljs-built_in">Number</span>(msg.right).valueOf()
    <span class="hljs-keyword">this</span>.prior(msg, respond)
  })
}</code></pre>
<p>然后，我们可以在需要引用它的文件中像下面这样添加到我们的微服务系统中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下面这两种方式都是等价的（还记得我们前面讲过的 `seneca.use` 方法的两个参数吗？）
require('seneca')()
  .use(require('./math.js'))
  .act('role:math,cmd:sum,left:1,right:2', console.log)

require('seneca')()
  .use('math') // 在当前目录下找到 `./math.js`
  .act('role:math,cmd:sum,left:1,right:2', console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 下面这两种方式都是等价的（还记得我们前面讲过的 `seneca.use` 方法的两个参数吗？）</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./math.js'</span>))
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>, <span class="hljs-built_in">console</span>.log)

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'math'</span>) <span class="hljs-comment">// 在当前目录下找到 `./math.js`</span>
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>, <span class="hljs-built_in">console</span>.log)</code></pre>
<p><code>seneca.wrap</code> 方法可以匹配一组模式，同使用相同的动作扩展函数覆盖至所有被匹配的模式，这与为每一个组模式手动调用 <code>seneca.add</code> 去扩展可以得到一样的效果，它需要两个参数：</p>
<ol>
<li><p><code>pin</code> ：模式匹配模式</p></li>
<li><p><code>action</code> ：扩展的 <code>action</code> 函数</p></li>
</ol>
<p><code>pin</code> 是一个可以匹配到多个模式的模式，它可以匹配到多个模式，比如 <code>role:math</code> 这个 <code>pin</code> 可以匹配到 <code>role:math, cmd:sum</code> 与 <code>role:math, cmd:product</code>。</p>
<p>在上面的示例中，我们在最后面的 <code>wrap</code> 函数中，确保了，任何传递给 <code>role:math</code> 的消息体中 <code>left</code> 与 <code>right</code> 值都是数字，即使我们传递了字符串，也可以被自动的转换为数字。</p>
<p>有时，查看 Seneca 实例中有哪些操作是被重写了是很有用的，你可以在启动应用时，加上 <code>--seneca.print.tree</code> 参数即可，我们先创建一个 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math-tree.js" rel="nofollow noreferrer" target="_blank">math-tree.js</a> 文件，填入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .use('math')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'math'</span>)</code></pre>
<p>然后再执行它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="❯ node math-tree.js --seneca.print.tree
{&quot;kind&quot;:&quot;notice&quot;,&quot;notice&quot;:&quot;hello seneca abs0eg4hu04h/1483589278500/65316/3.2.2/-&quot;,&quot;level&quot;:&quot;info&quot;,&quot;when&quot;:1483589278522}
(node:65316) DeprecationWarning: 'root' is deprecated, use 'global'
Seneca action patterns for instance: abs0eg4hu04h/1483589278500/65316/3.2.2/-
├─┬ cmd:sum
│ └─┬ role:math
│   └── # math, (15fqzd54pnsp),
│       # math, (qqrze3ub5vhl), sum
└─┬ cmd:product
  └─┬ role:math
    └── # math, (qnh86mgin4r6),
        # math, (4nrxi5f6sp69), product" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">❯ node math-tree.js --seneca.print.tree
{<span class="hljs-string">"kind"</span>:<span class="hljs-string">"notice"</span>,<span class="hljs-string">"notice"</span>:<span class="hljs-string">"hello seneca abs0eg4hu04h/1483589278500/65316/3.2.2/-"</span>,<span class="hljs-string">"level"</span>:<span class="hljs-string">"info"</span>,<span class="hljs-string">"when"</span>:1483589278522}
(node:65316) DeprecationWarning: <span class="hljs-string">'root'</span> is deprecated, use <span class="hljs-string">'global'</span>
Seneca action patterns <span class="hljs-keyword">for</span> instance: abs0eg4hu04h/1483589278500/65316/3.2.2/-
├─┬ cmd:sum
│ └─┬ role:math
│   └── <span class="hljs-comment"># math, (15fqzd54pnsp),</span>
│       <span class="hljs-comment"># math, (qqrze3ub5vhl), sum</span>
└─┬ cmd:product
  └─┬ role:math
    └── <span class="hljs-comment"># math, (qnh86mgin4r6),</span>
        <span class="hljs-comment"># math, (4nrxi5f6sp69), product</span></code></pre>
<p>从上面你可以看到很多的键/值对，并且以树状结构展示了重写，所有的 <code>Action</code> 函数展示的格式都是 <code>#plugin, (action-id), function-name</code>。</p>
<p>但是，到现在为止，所有的操作都还存在于同一个进程中，接下来，让我们先创建一个名为 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math-service.js" rel="nofollow noreferrer" target="_blank">math-service.js</a> 的文件，填入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .use('math')
  .listen()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'math'</span>)
  .listen()</code></pre>
<p>然后启动该脚本，即可启动我们的微服务，它会启动一个进程，并通过 <code>10101</code> 端口监听HTTP请求，它不是一个 Web 服务器，在此时， <code>HTTP</code> 仅仅作为消息的传输机制。</p>
<p>你现在可以访问 <a href="http://localhost:10101/act?role=math&amp;cmd=sum&amp;left=1&amp;right=2" rel="nofollow noreferrer" target="_blank">http://localhost:10101/act?ro...</a> 即可看到结果，或者使用 <code>curl</code> 命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -d '{&quot;role&quot;:&quot;math&quot;,&quot;cmd&quot;:&quot;sum&quot;,&quot;left&quot;:1,&quot;right&quot;:2}' http://localhost:10101/act" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">curl <span class="hljs-_">-d</span> <span class="hljs-string">'{"role":"math","cmd":"sum","left":1,"right":2}'</span> http://localhost:10101/act</code></pre>
<p>两种方式都可以看到结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;answer&quot;:3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-string">"answer"</span>:<span class="hljs-number">3</span>}</code></pre>
<p>接下来，你需要一个微服务客户端 <a href="https://github.com/pantao/getting-started-seneca/blob/master/math-client.js" rel="nofollow noreferrer" target="_blank">math-client.js</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .client()
  .act('role:math,cmd:sum,left:1,right:2',console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .client()
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>,<span class="hljs-built_in">console</span>.log)</code></pre>
<p>打开一个新的终端，执行该脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null { answer: 3 } { id: '7uuptvpf8iff/9wfb26kbqx55',
  accept: '043di4pxswq7/1483589685164/65429/3.2.2/-',
  track: undefined,
  time:
   { client_sent: '0',
     listen_recv: '0',
     listen_sent: '0',
     client_recv: 1483589898390 } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">null { answer: 3 } { id: <span class="hljs-string">'7uuptvpf8iff/9wfb26kbqx55'</span>,
  accept: <span class="hljs-string">'043di4pxswq7/1483589685164/65429/3.2.2/-'</span>,
  track: undefined,
  time:
   { client_sent: <span class="hljs-string">'0'</span>,
     listen_recv: <span class="hljs-string">'0'</span>,
     listen_sent: <span class="hljs-string">'0'</span>,
     client_recv: 1483589898390 } }</code></pre>
<p>在 <code>Seneca</code> 中，我们通过 <code>seneca.listen</code> 方法创建微服务，然后通过 <code>seneca.client</code> 去与微服务进行通信。在上面的示例中，我们使用的都是 Seneca 的默认配置，比如 <code>HTTP</code> 协议监听 <code>10101</code> 端口，但 <code>seneca.listen</code> 与 <code>seneca.client</code> 方法都可以接受下面这些参数，以达到定抽的功能：</p>
<ul>
<li><p><code>port</code> ：可选的数字，表示端口号；</p></li>
<li><p><code>host</code> ：可先的字符串，表示主机名或者IP地址；</p></li>
<li><p><code>spec</code> ：可选的对象，完整的定制对象</p></li>
</ul>
<blockquote><p><strong>注意</strong>：在 Windows 系统中，如果未指定 <code>host</code>， 默认会连接 <code>0.0.0.0</code>，这是没有任何用处的，你可以设置 <code>host</code> 为 <code>localhost</code>。</p></blockquote>
<p>只要 <code>client</code> 与 <code>listen</code> 的端口号与主机一致，它们就可以进行通信：</p>
<ul>
<li><p>seneca.client(8080) → seneca.listen(8080)</p></li>
<li><p>seneca.client(8080, '192.168.0.2') → seneca.listen(8080, '192.168.0.2')</p></li>
<li><p>seneca.client({ port: 8080, host: '192.168.0.2' }) → seneca.listen({ port: 8080, host: '192.168.0.2' })</p></li>
</ul>
<p>Seneca 为你提供的 <strong>无依赖传输</strong> 特性，让你在进行业务逻辑开发时，不需要知道消息如何传输或哪些服务会得到它们，而是在服务设置代码或配置中指定，比如 <code>math.js</code> 插件中的代码永远不需要改变，我们就可以任意的改变传输方式。</p>
<p>虽然 <code>HTTP</code> 协议很方便，但是并不是所有时间都合适，另一个常用的协议是 <code>TCP</code>，我们可以很容易的使用 <code>TCP</code> 协议来进行数据的传输，尝试下面这两个文件：</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/math-service-tcp.js" rel="nofollow noreferrer" target="_blank">math-service-tcp.js</a> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .use('math')
  .listen({type: 'tcp'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'math'</span>)
  .listen({<span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>})</code></pre>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/math-client-tcp.js" rel="nofollow noreferrer" target="_blank">math-client-tcp.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .client({type: 'tcp'})
  .act('role:math,cmd:sum,left:1,right:2',console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .client({<span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>})
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>,<span class="hljs-built_in">console</span>.log)</code></pre>
<p>默认情况下， <code>client/listen</code> 并未指定哪些消息将发送至哪里，只是本地定义了模式的话，会发送至本地的模式中，否则会全部发送至服务器中，我们可以通过一些配置来定义哪些消息将发送到哪些服务中，你可以使用一个 <code>pin</code> 参数来做这件事情。</p>
<p>让我们来创建一个应用，它将通过 TCP 发送所有 <code>role:math</code> 消息至服务，而把其它的所有消息都在发送至本地：</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/math-pin-service.js" rel="nofollow noreferrer" target="_blank">math-pin-service.js</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()

  .use('math')

  // 监听 role:math 消息
  // 重要：必须匹配客户端
  .listen({ type: 'tcp', pin: 'role:math' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()

  .use(<span class="hljs-string">'math'</span>)

  <span class="hljs-comment">// 监听 role:math 消息</span>
  <span class="hljs-comment">// 重要：必须匹配客户端</span>
  .listen({ <span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>, <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:math'</span> })</code></pre>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/math-pin-client.js" rel="nofollow noreferrer" target="_blank">math-pin-client.js</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()

  // 本地模式
  .add('say:hello', function (msg, respond){ respond(null, {text: &quot;Hi!&quot;}) })

  // 发送 role:math 模式至服务
  // 注意：必须匹配服务端
  .client({ type: 'tcp', pin: 'role:math' })

  // 远程操作
  .act('role:math,cmd:sum,left:1,right:2',console.log)

  // 本地操作
  .act('say:hello',console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()

  <span class="hljs-comment">// 本地模式</span>
  .add(<span class="hljs-string">'say:hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>)</span>{ respond(<span class="hljs-literal">null</span>, {<span class="hljs-attr">text</span>: <span class="hljs-string">"Hi!"</span>}) })

  <span class="hljs-comment">// 发送 role:math 模式至服务</span>
  <span class="hljs-comment">// 注意：必须匹配服务端</span>
  .client({ <span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>, <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:math'</span> })

  <span class="hljs-comment">// 远程操作</span>
  .act(<span class="hljs-string">'role:math,cmd:sum,left:1,right:2'</span>,<span class="hljs-built_in">console</span>.log)

  <span class="hljs-comment">// 本地操作</span>
  .act(<span class="hljs-string">'say:hello'</span>,<span class="hljs-built_in">console</span>.log)</code></pre>
<p>你可以通过各种过滤器来自定义日志的打印，以跟踪消息的流动，使用 <code>--seneca...</code> 参数，支持以下配置：</p>
<ul>
<li><p><code>date-time</code>： log 条目何时被创建；</p></li>
<li><p><code>seneca-id</code>： Seneca process ID；</p></li>
<li><p><code>level</code>：<code>DEBUG</code>、<code>INFO</code>、<code>WARN</code>、<code>ERROR</code> 以及 <code>FATAL</code> 中任何一个；</p></li>
<li><p><code>type</code>：条目编码，比如 <code>act</code>、<code>plugin</code> 等；</p></li>
<li><p><code>plugin</code>：插件名称，不是插件内的操作将表示为 <code>root$</code>；</p></li>
<li><p><code>case</code>： 条目的事件：<code>IN</code>、<code>ADD</code>、<code>OUT</code> 等</p></li>
<li><p><code>action-id/transaction-id</code>：跟踪标识符，_在网络中永远保持一致_；</p></li>
<li><p><code>pin</code>：<code>action</code> 匹配模式；</p></li>
<li><p><code>message</code>：入/出参消息体</p></li>
</ul>
<p>如果你运行上面的进程，使用了 <code>--seneca.log.all</code>，则会打印出所有日志，如果你只想看 <code>math</code> 插件打印的日志，可以像下面这样启动服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node math-pin-service.js --seneca.log=plugin:math" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node math-pin-service.js --seneca.log=plugin:math</code></pre>
<h1 id="articleHeader7">Web 服务集成</h1>
<p>Seneca不是一个Web框架。 但是，您仍然需要将其连接到您的Web服务API，你永远要记住的是，不要将你的内部行为模式暴露在外面，这不是一个好的安全的实践，相反的，你应该定义一组API模式，比如用属性 <code>role：api</code>，然后你可以将它们连接到你的内部微服务。</p>
<p>下面是我们定义 <a href="https://github.com/pantao/getting-started-seneca/blob/master/api.js" rel="nofollow noreferrer" target="_blank">api.js</a> 插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function api(options) {

  var validOps = { sum:'sum', product:'product' }

  this.add('role:api,path:calculate', function (msg, respond) {
    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    this.act('role:math', {
      cmd:   validOps[operation],
      left:  left,
      right: right,
    }, respond)
  })

  this.add('init:api', function (msg, respond) {
    this.act('role:web',{routes:{
      prefix: '/api',
      pin: 'role:api,path:*',
      map: {
        calculate: { GET:true, suffix:'/{operation}' }
      }
    "}}", respond)
  })

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">api</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-keyword">var</span> validOps = { <span class="hljs-attr">sum</span>:<span class="hljs-string">'sum'</span>, <span class="hljs-attr">product</span>:<span class="hljs-string">'product'</span> }

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:api,path:calculate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">var</span> operation = msg.args.params.operation
    <span class="hljs-keyword">var</span> left = msg.args.query.left
    <span class="hljs-keyword">var</span> right = msg.args.query.right
    <span class="hljs-keyword">this</span>.act(<span class="hljs-string">'role:math'</span>, {
      <span class="hljs-attr">cmd</span>:   validOps[operation],
      <span class="hljs-attr">left</span>:  left,
      <span class="hljs-attr">right</span>: right,
    }, respond)
  })

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'init:api'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.act(<span class="hljs-string">'role:web'</span>,{<span class="hljs-attr">routes</span>:{
      <span class="hljs-attr">prefix</span>: <span class="hljs-string">'/api'</span>,
      <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:api,path:*'</span>,
      <span class="hljs-attr">map</span>: {
        <span class="hljs-attr">calculate</span>: { <span class="hljs-attr">GET</span>:<span class="hljs-literal">true</span>, <span class="hljs-attr">suffix</span>:<span class="hljs-string">'/{operation}'</span> }
      }
    "}}", respond)
  })

}</code></pre>
<p>然后，我们使用 <code>hapi</code> 作为Web框架，建了 <a href="https://github.com/pantao/getting-started-seneca/blob/master/hapi-app.js" rel="nofollow noreferrer" target="_blank">hapi-app.js</a> 应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Hapi = require('hapi');
const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');

const config = {
  adapter: require('seneca-web-adapter-hapi'),
  context: (() => {
    const server = new Hapi.Server();
    server.connection({
      port: 3000
    });

    server.route({
      path: '/routes',
      method: 'get',
      handler: (request, reply) => {
        const routes = server.table()[0].table.map(route => {
          return {
            path: route.path,
            method: route.method.toUpperCase(),
            description: route.settings.description,
            tags: route.settings.tags,
            vhost: route.settings.vhost,
            cors: route.settings.cors,
            jsonp: route.settings.jsonp,
          }
        })
        reply(routes)
      }
    });

    return server;
  })()
};

const seneca = Seneca()
  .use(SenecaWeb, config)
  .use('math')
  .use('api')
  .ready(() => {
    const server = seneca.export('web/context')();
    server.start(() => {
      server.log('server started on: ' + server.info.uri);
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Hapi = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hapi'</span>);
<span class="hljs-keyword">const</span> Seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>);
<span class="hljs-keyword">const</span> SenecaWeb = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca-web'</span>);

<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">adapter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca-web-adapter-hapi'</span>),
  <span class="hljs-attr">context</span>: <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> Hapi.Server();
    server.connection({
      <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>
    });

    server.route({
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/routes'</span>,
      <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
      <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">request, reply</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> routes = server.table()[<span class="hljs-number">0</span>].table.map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">path</span>: route.path,
            <span class="hljs-attr">method</span>: route.method.toUpperCase(),
            <span class="hljs-attr">description</span>: route.settings.description,
            <span class="hljs-attr">tags</span>: route.settings.tags,
            <span class="hljs-attr">vhost</span>: route.settings.vhost,
            <span class="hljs-attr">cors</span>: route.settings.cors,
            <span class="hljs-attr">jsonp</span>: route.settings.jsonp,
          }
        })
        reply(routes)
      }
    });

    <span class="hljs-keyword">return</span> server;
  })()
};

<span class="hljs-keyword">const</span> seneca = Seneca()
  .use(SenecaWeb, config)
  .use(<span class="hljs-string">'math'</span>)
  .use(<span class="hljs-string">'api'</span>)
  .ready(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> server = seneca.export(<span class="hljs-string">'web/context'</span>)();
    server.start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      server.log(<span class="hljs-string">'server started on: '</span> + server.info.uri);
    });
  });</code></pre>
<p>启动 <code>hapi-app.js</code> 之后，访问 <a href="http://localhost:3000/routes" rel="nofollow noreferrer" target="_blank">http://localhost:3000/routes</a>，你便可以看到下面这样的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    &quot;path&quot;: &quot;/routes&quot;,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;cors&quot;: false
  },
  {
    &quot;path&quot;: &quot;/api/calculate/{operation}&quot;,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;cors&quot;: false
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  {
    <span class="hljs-string">"path"</span>: <span class="hljs-string">"/routes"</span>,
    <span class="hljs-string">"method"</span>: <span class="hljs-string">"GET"</span>,
    <span class="hljs-string">"cors"</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-string">"path"</span>: <span class="hljs-string">"/api/calculate/{operation}"</span>,
    <span class="hljs-string">"method"</span>: <span class="hljs-string">"GET"</span>,
    <span class="hljs-string">"cors"</span>: <span class="hljs-literal">false</span>
  }
]</code></pre>
<p>这表示，我们已经成功的将模式匹配更新至 <code>hapi</code> 应用的路由中。访问 <a href="http://localhost:3000/api/calculate/sum?left=1&amp;right=2" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/cal...</a> ，将得到结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;answer&quot;:3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">{<span class="hljs-string">"answer"</span>:<span class="hljs-number">3</span>}</code></pre>
<p>在上面的示例中，我们直接将 <code>math</code> 插件也加载到了 <code>seneca</code> 实例中，其实我们可以更加合理的进行这种操作，如 <a href="https://github.com/pantao/getting-started-seneca/blob/master/hapi-app-client.js" rel="nofollow noreferrer" target="_blank">hapi-app-client.js</a> 文件所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
const seneca = Seneca()
  .use(SenecaWeb, config)
  .use('api')
  .client({type: 'tcp', pin: 'role:math'})
  .ready(() => {
    const server = seneca.export('web/context')();
    server.start(() => {
      server.log('server started on: ' + server.info.uri);
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
const seneca = Seneca()
  .use(SenecaWeb, config)
  .use(<span class="hljs-string">'api'</span>)
  .client({<span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>, <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:math'</span>})
  .ready(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> server = seneca.export(<span class="hljs-string">'web/context'</span>)();
    server.start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      server.log(<span class="hljs-string">'server started on: '</span> + server.info.uri);
    });
  });</code></pre>
<p>我们不注册 <code>math</code> 插件，而是使用 <code>client</code> 方法，将 <code>role:math</code> 发送给 <code>math-pin-service.js</code> 的服务，并且使用的是 <code>tcp</code> 连接，没错，你的微服务就是这样成型了。</p>
<p><strong>注意：永远不要使用外部输入创建操作的消息体，永远显示地在内部创建，这可以有效避免注入攻击。</strong></p>
<p>在上面的的初始化函数中，调用了一个 <code>role:web</code> 的模式操作，并且定义了一个 <code>routes</code> 属性，这将定义一个URL地址与操作模式的匹配规则，它有下面这些参数：</p>
<ul>
<li><p><code>prefix</code>：URL 前缀</p></li>
<li><p><code>pin</code>： 需要映射的模式集</p></li>
<li><p><code>map</code>：要用作 URL Endpoint 的 <code>pin</code> 通配符属性列表</p></li>
</ul>
<p>你的URL地址将开始于 <code>/api/</code>。</p>
<p><code>rol:api, path:*</code> 这个 <code>pin</code> 表示，映射任何有 <code>role="api"</code> 键值对，同时 <code>path</code> 属性被定义了的模式，在本例中，只有 <code>role:api,path:calculate</code> 符合该模式。</p>
<p><code>map</code> 属性是一个对象，它有一个 <code>calculate</code> 属性，对应的URL地址开始于：<code>/api/calculate</code>。</p>
<p>按着， <code>calculate</code> 的值是一个对象，它表示了 <code>HTTP</code> 的 <code>GET</code> 方法是被允许的，并且URL应该有参数化的后缀（后缀就类于 <code>hapi</code> 的 <code>route</code> 规则中一样）。</p>
<p>所以，你的完整地址是 <code>/api/calculate/{operation}</code>。</p>
<p>然后，其它的消息属性都将从 URL query 对象或者 JSON body 中获得，在本示例中，因为使用的是 GET 方法，所以没有 body。</p>
<p><code>SenecaWeb</code> 将会通过 <code>msg.args</code> 来描述一次请求，它包括：</p>
<ul>
<li><p><code>body</code>：HTTP 请求的 <code>payload</code> 部分；</p></li>
<li><p><code>query</code>：请求的 <code>querystring</code>；</p></li>
<li><p><code>params</code>：请求的路径参数。</p></li>
</ul>
<p>现在，启动前面我们创建的微服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node math-pin-service.js --seneca.log=plugin:math" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node math-pin-service.js --seneca.log=plugin:math</code></pre>
<p>然后再启动我们的应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node hapi-app.js --seneca.log=plugin:web,plugin:api" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node hapi-app.js --seneca.log=plugin:web,plugin:api</code></pre>
<p>访问下面的地址：</p>
<ul>
<li><p><a href="http://localhost:3000/api/calculate/product?left=2&amp;right=3" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/cal...</a> 得到 <code>{"answer":6}</code></p></li>
<li><p><a href="http://localhost:3000/api/calculate/sum?left=2&amp;right=3" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/cal...</a> 得到 <code>{"answer":5}</code></p></li>
</ul>
<h1 id="articleHeader8">数据持久化</h1>
<p>一个真实的系统，肯定需要持久化数据，在Seneca中，你可以执行任何您喜欢的操作，使用任何类型的数据库层，但是，为什么不使用模式匹配和微服务的力量，使你的开发更轻松？</p>
<p>模式匹配还意味着你可以推迟有关微服务数据的争论，比如服务是否应该"拥有"数据，服务是否应该访问共享数据库等，模式匹配意味着你可以在随后的任何时间重新配置你的系统。</p>
<p><a href="https://github.com/senecajs/seneca-entity" rel="nofollow noreferrer" target="_blank">seneca-entity</a> 提供了一个简单的数据抽象层（ORM），基于以下操作：</p>
<ul>
<li><p><code>load</code>：根据实体标识加载一个实体；</p></li>
<li><p><code>save</code>：创建或更新（如果你提供了一个标识的话）一个实体；</p></li>
<li><p><code>list</code>：列出匹配查询条件的所有实体；</p></li>
<li><p><code>remove</code>：删除一个标识指定的实体。</p></li>
</ul>
<p>它们的匹配模式分别是：</p>
<ul>
<li><p><code>load</code>： <code>role:entity,cmd:load,name:&lt;entity-name&gt;</code></p></li>
<li><p><code>save</code>： <code>role:entity,cmd:save,name:&lt;entity-name&gt;</code></p></li>
<li><p><code>list</code>： <code>role:entity,cmd:list,name:&lt;entity-name&gt;</code></p></li>
<li><p><code>remove</code>： <code>role:entity,cmd:remove,name:&lt;entity-name&gt;</code></p></li>
</ul>
<p>任何实现了这些模式的插件都可以被用于提供数据库（比如 <a href="https://www.npmjs.com/package/seneca-mysql-store" rel="nofollow noreferrer" target="_blank">MySQL</a>）访问。</p>
<p>当数据的持久化与其它的一切都基于相同的机制提供时，微服务的开发将变得更容易，而这种机制，便是模式匹配消息。</p>
<p>由于直接使用数据持久性模式可能变得乏味，所以 <code>seneca</code> 实体还提供了一个更熟悉的 <code>ActiveRecord</code> 风格的接口，要创建记录对象，请调用 <code>seneca.make</code> 方法。 记录对象有方法 <code>load$</code>、<code>save$</code>、<code>list$</code> 以及 <code>remove$</code>（所有方法都带有 <code>$</code> 后缀，以防止与数据字段冲突），数据字段只是对象属性。</p>
<p>通过 <code>npm</code> 安装 <code>seneca-entity</code>， 然后在你的应用中使用 <code>seneca.use()</code> 方法加载至你的 <code>seneca</code> 实例。</p>
<p>现在让我们先创建一个简单的数据实体，它保存 <code>book</code> 的详情。</p>
<p>文件 <a href="https://github.com/pantao/getting-started-seneca/blob/master/book.js" rel="nofollow noreferrer" target="_blank">book.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')();
seneca.use('basic').use('entity');

const book = seneca.make('book');
book.title = 'Action in Seneca';
book.price = 9.99;

// 发送 role:entity,cmd:save,name:book 消息
book.save$( console.log );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)();
seneca.use(<span class="hljs-string">'basic'</span>).use(<span class="hljs-string">'entity'</span>);

<span class="hljs-keyword">const</span> book = seneca.make(<span class="hljs-string">'book'</span>);
book.title = <span class="hljs-string">'Action in Seneca'</span>;
book.price = <span class="hljs-number">9.99</span>;

<span class="hljs-comment">// 发送 role:entity,cmd:save,name:book 消息</span>
book.save$( <span class="hljs-built_in">console</span>.log );</code></pre>
<p>在上面的示例中，我们还使用了 <a href="https://github.com/senecajs/seneca-basic" rel="nofollow noreferrer" target="_blank">seneca-basic</a>，它是 <code>seneca-entity</code> 依赖的插件。</p>
<p>执行上面的代码之后，我们可以看到下面这样的日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="❯ node book.js
null $-/-/book;id=byo81d;{title:Action in Seneca,price:9.99}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">❯ node book.js
null $-/-/book;id=byo81d;{title:Action <span class="hljs-keyword">in</span> Seneca,price:9.99}</code></pre>
<blockquote><p>Seneca 内置了 <a href="https://www.npmjs.com/package/seneca-mem-store" rel="nofollow noreferrer" target="_blank">mem-store</a>，这使得我们在本示例中，不需要使用任何其它数据库的支持也能进行完整的数据库持久操作（虽然，它并不是真正的持久化了）。</p></blockquote>
<p>由于数据的持久化永远都是使用的同样的消息模式集，所以，你可以非常简单的交互数据库，比如，你可能在开发的过程中使用的是 <a href="https://www.npmjs.com/package/seneca-mongo-store" rel="nofollow noreferrer" target="_blank">MongoDB</a>，而后，开发完成之后，在生产环境中使用 <a href="https://www.npmjs.com/package/seneca-postgres-store" rel="nofollow noreferrer" target="_blank">Postgres</a>。</p>
<p>下面让我他创建一个简单的线上书店，我们可以通过它，快速的添加新书、获取书的详细信息以及购买一本书：</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/book-store.js" rel="nofollow noreferrer" target="_blank">book-store.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(options) {

  // 从数据库中，查询一本ID为 `msg.id` 的书，我们使用了 `load$` 方法
  this.add('role:store, get:book', function(msg, respond) {
    this.make('book').load$(msg.id, respond);
  });

  // 向数据库中添加一本书，书的数据为 `msg.data`，我们使用了 `data$` 方法
  this.add('role:store, add:book', function(msg, respond) {
    this.make('book').data$(msg.data).save$(respond);
  });

  // 创建一条新的支付订单（在真实的系统中，经常是由商品详情布中的 *购买* 按钮触
  // 发的事件），先是查询出ID为 `msg.id` 的书本，若查询出错，则直接返回错误，
  // 否则，将书本的信息复制给 `purchase` 实体，并保存该订单，然后，我们发送了
  // 一条 `role:store,info:purchase` 消息（但是，我们并不接收任何响应），
  // 这条消息只是通知整个系统，我们现在有一条新的订单产生了，但是我并不关心谁会
  // 需要它。
  this.add('role:store, cmd:purchase', function(msg, respond) {
    this.make('book').load$(msg.id, function(err, book) {
      if (err) return respond(err);

      this
        .make('purchase')
        .data$({
          when: Date.now(),
          bookId: book.id,
          title: book.title,
          price: book.price,
        })
        .save$(function(err, purchase) {
          if (err) return respond(err);

          this.act('role:store,info:purchase', {
            purchase: purchase
          });
          respond(null, purchase);
        });
    });
  });

  // 最后，我们实现了 `role:store, info:purchase` 模式，就只是简单的将信息
  // 打印出来， `seneca.log` 对象提供了 `debug`、`info`、`warn`、`error`、
  // `fatal` 方法用于打印相应级别的日志。
  this.add('role:store, info:purchase', function(msg, respond) {
    this.log.info('purchase', msg.purchase);
    respond();
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-comment">// 从数据库中，查询一本ID为 `msg.id` 的书，我们使用了 `load$` 方法</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:store, get:book'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.make(<span class="hljs-string">'book'</span>).load$(msg.id, respond);
  });

  <span class="hljs-comment">// 向数据库中添加一本书，书的数据为 `msg.data`，我们使用了 `data$` 方法</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:store, add:book'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.make(<span class="hljs-string">'book'</span>).data$(msg.data).save$(respond);
  });

  <span class="hljs-comment">// 创建一条新的支付订单（在真实的系统中，经常是由商品详情布中的 *购买* 按钮触</span>
  <span class="hljs-comment">// 发的事件），先是查询出ID为 `msg.id` 的书本，若查询出错，则直接返回错误，</span>
  <span class="hljs-comment">// 否则，将书本的信息复制给 `purchase` 实体，并保存该订单，然后，我们发送了</span>
  <span class="hljs-comment">// 一条 `role:store,info:purchase` 消息（但是，我们并不接收任何响应），</span>
  <span class="hljs-comment">// 这条消息只是通知整个系统，我们现在有一条新的订单产生了，但是我并不关心谁会</span>
  <span class="hljs-comment">// 需要它。</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:store, cmd:purchase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.make(<span class="hljs-string">'book'</span>).load$(msg.id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, book</span>) </span>{
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> respond(err);

      <span class="hljs-keyword">this</span>
        .make(<span class="hljs-string">'purchase'</span>)
        .data$({
          <span class="hljs-attr">when</span>: <span class="hljs-built_in">Date</span>.now(),
          <span class="hljs-attr">bookId</span>: book.id,
          <span class="hljs-attr">title</span>: book.title,
          <span class="hljs-attr">price</span>: book.price,
        })
        .save$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, purchase</span>) </span>{
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> respond(err);

          <span class="hljs-keyword">this</span>.act(<span class="hljs-string">'role:store,info:purchase'</span>, {
            <span class="hljs-attr">purchase</span>: purchase
          });
          respond(<span class="hljs-literal">null</span>, purchase);
        });
    });
  });

  <span class="hljs-comment">// 最后，我们实现了 `role:store, info:purchase` 模式，就只是简单的将信息</span>
  <span class="hljs-comment">// 打印出来， `seneca.log` 对象提供了 `debug`、`info`、`warn`、`error`、</span>
  <span class="hljs-comment">// `fatal` 方法用于打印相应级别的日志。</span>
  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:store, info:purchase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.log.info(<span class="hljs-string">'purchase'</span>, msg.purchase);
    respond();
  });
};</code></pre>
<p>接下来，我们可以创建一个简单的单元测试，以验证我们前面创建的程序：</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/book-store-test.js" rel="nofollow noreferrer" target="_blank">boot-store-test.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 Node 内置的 `assert` 模块
const assert = require('assert')

const seneca = require('seneca')()
  .use('basic')
  .use('entity')
  .use('book-store')
  .error(assert.fail)

// 添加一本书
addBook()

function addBook() {
  seneca.act(
    'role:store,add:book,data:{title:Action in Seneca,price:9.99}',
    function(err, savedBook) {

      this.act(
        'role:store,get:book', {
          id: savedBook.id
        },
        function(err, loadedBook) {

          assert.equal(loadedBook.title, savedBook.title)

          purchase(loadedBook);
        }
      )
    }
  )
}

function purchase(book) {
  seneca.act(
    'role:store,cmd:purchase', {
      id: book.id
    },
    function(err, purchase) {
      assert.equal(purchase.bookId, book.id)
    }
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用 Node 内置的 `assert` 模块</span>
<span class="hljs-keyword">const</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assert'</span>)

<span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'basic'</span>)
  .use(<span class="hljs-string">'entity'</span>)
  .use(<span class="hljs-string">'book-store'</span>)
  .error(assert.fail)

<span class="hljs-comment">// 添加一本书</span>
addBook()

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addBook</span>(<span class="hljs-params"></span>) </span>{
  seneca.act(
    <span class="hljs-string">'role:store,add:book,data:{title:Action in Seneca,price:9.99}'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, savedBook</span>) </span>{

      <span class="hljs-keyword">this</span>.act(
        <span class="hljs-string">'role:store,get:book'</span>, {
          <span class="hljs-attr">id</span>: savedBook.id
        },
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, loadedBook</span>) </span>{

          assert.equal(loadedBook.title, savedBook.title)

          purchase(loadedBook);
        }
      )
    }
  )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">purchase</span>(<span class="hljs-params">book</span>) </span>{
  seneca.act(
    <span class="hljs-string">'role:store,cmd:purchase'</span>, {
      <span class="hljs-attr">id</span>: book.id
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, purchase</span>) </span>{
      assert.equal(purchase.bookId, book.id)
    }
  )
}</code></pre>
<p>执行该测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="❯ node book-store-test.js
[&quot;purchase&quot;,{&quot;entity$&quot;:&quot;-/-/purchase&quot;,&quot;when&quot;:1483607360925,&quot;bookId&quot;:&quot;a2mlev&quot;,&quot;title&quot;:&quot;Action in Seneca&quot;,&quot;price&quot;:9.99,&quot;id&quot;:&quot;i28xoc&quot;}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">❯ node book-store-test.js
[<span class="hljs-string">"purchase"</span>,{<span class="hljs-string">"entity$"</span>:<span class="hljs-string">"-/-/purchase"</span>,<span class="hljs-string">"when"</span>:1483607360925,<span class="hljs-string">"bookId"</span>:<span class="hljs-string">"a2mlev"</span>,<span class="hljs-string">"title"</span>:<span class="hljs-string">"Action in Seneca"</span>,<span class="hljs-string">"price"</span>:9.99,<span class="hljs-string">"id"</span>:<span class="hljs-string">"i28xoc"</span>}]</code></pre>
<p>在一个生产应用中，我们对于上面的订单数据，可能会有单独的服务进行监控，而不是像上面这样，只是打印一条日志出来，那么，我们现在来创建一个新的服务，用于收集订单数据：</p>
<p><a href="https://github.com/pantao/getting-started-seneca/blob/master/book-store-stats.js" rel="nofollow noreferrer" target="_blank">book-store-stats.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const stats = {};

require('seneca')()
  .add('role:store,info:purchase', function(msg, respond) {
    const id = msg.purchase.bookId;
    stats[id] = stats[id] || 0;
    stats[id]++;
    console.log(stats);
    respond();
  })
  .listen({
    port: 9003,
    host: 'localhost',
    pin: 'role:store,info:purchase'
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> stats = {};

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .add(<span class="hljs-string">'role:store,info:purchase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">const</span> id = msg.purchase.bookId;
    stats[id] = stats[id] || <span class="hljs-number">0</span>;
    stats[id]++;
    <span class="hljs-built_in">console</span>.log(stats);
    respond();
  })
  .listen({
    <span class="hljs-attr">port</span>: <span class="hljs-number">9003</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
    <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:store,info:purchase'</span>
  });</code></pre>
<p>然后，更新 <code>book-store-test.js</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const seneca = require('seneca')()
  .use('basic')
  .use('entity')
  .use('book-store')
  .client({port:9003,host: 'localhost', pin:'role:store,info:purchase'})
  .error(assert.fail);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'basic'</span>)
  .use(<span class="hljs-string">'entity'</span>)
  .use(<span class="hljs-string">'book-store'</span>)
  .client({<span class="hljs-attr">port</span>:<span class="hljs-number">9003</span>,<span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>, <span class="hljs-attr">pin</span>:<span class="hljs-string">'role:store,info:purchase'</span>})
  .error(assert.fail);</code></pre>
<p>此时，当有新的订单产生时，就会通知到订单监控服务了。</p>
<h2 id="articleHeader9">将所有服务集成到一起</h2>
<p>通过上面的所有步骤，我们现在已经有四个服务了：</p>
<ul>
<li><p><a href="https://github.com/pantao/getting-started-seneca/blob/master/book-store-stats.js" rel="nofollow noreferrer" target="_blank">book-store-stats.js</a> ： 用于收集书店的订单信息；</p></li>
<li><p><a href="https://github.com/pantao/getting-started-seneca/blob/master/book-store-service.js" rel="nofollow noreferrer" target="_blank">book-store-service.js</a> ：提供书店相关的功能；</p></li>
<li><p><a href="https://github.com/pantao/getting-started-seneca/blob/master/math-pin-service.js" rel="nofollow noreferrer" target="_blank">math-pin-service.js</a>：提供一些数学相关的服务；</p></li>
<li><p><a href="https://github.com/pantao/getting-started-seneca/blob/master/app-all.js" rel="nofollow noreferrer" target="_blank">app-all.js</a>：Web 服务</p></li>
</ul>
<p><code>book-store-stats</code> 与 <code>math-pin-service</code> 我们已经有了，所以，直接启动即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node math-pin-service.js --seneca.log.all
node book-store-stats.js --seneca.log.all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">node math-pin-service.js --seneca.log.all
node book-store-stats.js --seneca.log.all</code></pre>
<p>现在，我们需要一个 <code>book-store-service</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('seneca')()
  .use('basic')
  .use('entity')
  .use('book-store')
  .listen({
    port: 9002,
    host: 'localhost',
    pin: 'role:store'
  })
  .client({
    port: 9003,
    host: 'localhost',
    pin: 'role:store,info:purchase'
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)()
  .use(<span class="hljs-string">'basic'</span>)
  .use(<span class="hljs-string">'entity'</span>)
  .use(<span class="hljs-string">'book-store'</span>)
  .listen({
    <span class="hljs-attr">port</span>: <span class="hljs-number">9002</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
    <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:store'</span>
  })
  .client({
    <span class="hljs-attr">port</span>: <span class="hljs-number">9003</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
    <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:store,info:purchase'</span>
  });</code></pre>
<p>该服务接收任何 <code>role:store</code> 消息，但同时又将任何 <code>role:store,info:purchase</code> 消息发送至网络，<strong>永远都要记住， client 与 listen 的 pin 配置必须完全一致</strong>。</p>
<p>现在，我们可以启动该服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node book-store-service.js --seneca.log.all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node book-store-service.js --seneca.log.all</code></pre>
<p>然后，创建我们的 <code>app-all.js</code>，首选，复制 <code>api.js</code> 文件到 <a href="https://github.com/pantao/getting-started-seneca/blob/master/api-all.js" rel="nofollow noreferrer" target="_blank">api-all.js</a>，这是我们的API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function api(options) {

  var validOps = {
    sum: 'sum',
    product: 'product'
  }

  this.add('role:api,path:calculate', function(msg, respond) {
    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    this.act('role:math', {
      cmd: validOps[operation],
      left: left,
      right: right,
    }, respond)
  });

  this.add('role:api,path:store', function(msg, respond) {
    let id = null;
    if (msg.args.query.id) id = msg.args.query.id;
    if (msg.args.body.id) id = msg.args.body.id;

    const operation = msg.args.params.operation;
    const storeMsg = {
      role: 'store',
      id: id
    };
    if ('get' === operation) storeMsg.get = 'book';
    if ('purchase' === operation) storeMsg.cmd = 'purchase';
    this.act(storeMsg, respond);
  });

  this.add('init:api', function(msg, respond) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          calculate: {
            GET: true,
            suffix: '/{operation}'
          },
          store: {
            GET: true,
            POST: true,
            suffix: '/{operation}'
          }
        }
      }
    }, respond)
  })

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">api</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-keyword">var</span> validOps = {
    <span class="hljs-attr">sum</span>: <span class="hljs-string">'sum'</span>,
    <span class="hljs-attr">product</span>: <span class="hljs-string">'product'</span>
  }

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:api,path:calculate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">var</span> operation = msg.args.params.operation
    <span class="hljs-keyword">var</span> left = msg.args.query.left
    <span class="hljs-keyword">var</span> right = msg.args.query.right
    <span class="hljs-keyword">this</span>.act(<span class="hljs-string">'role:math'</span>, {
      <span class="hljs-attr">cmd</span>: validOps[operation],
      <span class="hljs-attr">left</span>: left,
      <span class="hljs-attr">right</span>: right,
    }, respond)
  });

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'role:api,path:store'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">let</span> id = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">if</span> (msg.args.query.id) id = msg.args.query.id;
    <span class="hljs-keyword">if</span> (msg.args.body.id) id = msg.args.body.id;

    <span class="hljs-keyword">const</span> operation = msg.args.params.operation;
    <span class="hljs-keyword">const</span> storeMsg = {
      <span class="hljs-attr">role</span>: <span class="hljs-string">'store'</span>,
      <span class="hljs-attr">id</span>: id
    };
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'get'</span> === operation) storeMsg.get = <span class="hljs-string">'book'</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'purchase'</span> === operation) storeMsg.cmd = <span class="hljs-string">'purchase'</span>;
    <span class="hljs-keyword">this</span>.act(storeMsg, respond);
  });

  <span class="hljs-keyword">this</span>.add(<span class="hljs-string">'init:api'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg, respond</span>) </span>{
    <span class="hljs-keyword">this</span>.act(<span class="hljs-string">'role:web'</span>, {
      <span class="hljs-attr">routes</span>: {
        <span class="hljs-attr">prefix</span>: <span class="hljs-string">'/api'</span>,
        <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:api,path:*'</span>,
        <span class="hljs-attr">map</span>: {
          <span class="hljs-attr">calculate</span>: {
            <span class="hljs-attr">GET</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">suffix</span>: <span class="hljs-string">'/{operation}'</span>
          },
          <span class="hljs-attr">store</span>: {
            <span class="hljs-attr">GET</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">POST</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">suffix</span>: <span class="hljs-string">'/{operation}'</span>
          }
        }
      }
    }, respond)
  })

}</code></pre>
<p>最后， <a href="https://github.com/pantao/getting-started-seneca/blob/master/app-all.js" rel="nofollow noreferrer" target="_blank">app-all.js</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Hapi = require('hapi');
const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');

const config = {
  adapter: require('seneca-web-adapter-hapi'),
  context: (() => {
    const server = new Hapi.Server();
    server.connection({
      port: 3000
    });

    server.route({
      path: '/routes',
      method: 'get',
      handler: (request, reply) => {
        const routes = server.table()[0].table.map(route => {
          return {
            path: route.path,
            method: route.method.toUpperCase(),
            description: route.settings.description,
            tags: route.settings.tags,
            vhost: route.settings.vhost,
            cors: route.settings.cors,
            jsonp: route.settings.jsonp,
          }
        })
        reply(routes)
      }
    });

    return server;
  })()
};

const seneca = Seneca()
  .use(SenecaWeb, config)
  .use('basic')
  .use('entity')
  .use('math')
  .use('api-all')
  .client({
    type: 'tcp',
    pin: 'role:math'
  })
  .client({
    port: 9002,
    host: 'localhost',
    pin: 'role:store'
  })
  .ready(() => {
    const server = seneca.export('web/context')();
    server.start(() => {
      server.log('server started on: ' + server.info.uri);
    });
  });

// 创建一本示例书籍
seneca.act(
  'role:store,add:book', {
    data: {
      title: 'Action in Seneca',
      price: 9.99
    }
  },
  console.log
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Hapi = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hapi'</span>);
<span class="hljs-keyword">const</span> Seneca = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>);
<span class="hljs-keyword">const</span> SenecaWeb = <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca-web'</span>);

<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">adapter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca-web-adapter-hapi'</span>),
  <span class="hljs-attr">context</span>: <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> Hapi.Server();
    server.connection({
      <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>
    });

    server.route({
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/routes'</span>,
      <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
      <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">request, reply</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> routes = server.table()[<span class="hljs-number">0</span>].table.map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">path</span>: route.path,
            <span class="hljs-attr">method</span>: route.method.toUpperCase(),
            <span class="hljs-attr">description</span>: route.settings.description,
            <span class="hljs-attr">tags</span>: route.settings.tags,
            <span class="hljs-attr">vhost</span>: route.settings.vhost,
            <span class="hljs-attr">cors</span>: route.settings.cors,
            <span class="hljs-attr">jsonp</span>: route.settings.jsonp,
          }
        })
        reply(routes)
      }
    });

    <span class="hljs-keyword">return</span> server;
  })()
};

<span class="hljs-keyword">const</span> seneca = Seneca()
  .use(SenecaWeb, config)
  .use(<span class="hljs-string">'basic'</span>)
  .use(<span class="hljs-string">'entity'</span>)
  .use(<span class="hljs-string">'math'</span>)
  .use(<span class="hljs-string">'api-all'</span>)
  .client({
    <span class="hljs-attr">type</span>: <span class="hljs-string">'tcp'</span>,
    <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:math'</span>
  })
  .client({
    <span class="hljs-attr">port</span>: <span class="hljs-number">9002</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
    <span class="hljs-attr">pin</span>: <span class="hljs-string">'role:store'</span>
  })
  .ready(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> server = seneca.export(<span class="hljs-string">'web/context'</span>)();
    server.start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      server.log(<span class="hljs-string">'server started on: '</span> + server.info.uri);
    });
  });

<span class="hljs-comment">// 创建一本示例书籍</span>
seneca.act(
  <span class="hljs-string">'role:store,add:book'</span>, {
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'Action in Seneca'</span>,
      <span class="hljs-attr">price</span>: <span class="hljs-number">9.99</span>
    }
  },
  <span class="hljs-built_in">console</span>.log
)</code></pre>
<p>启动该服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app-all.js --seneca.log.all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node app-all.js --seneca.log.all</code></pre>
<p>从控制台我们可以看到下面这样的消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="null $-/-/book;id=0r7mg7;{title:Action in Seneca,price:9.99}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">null $-/-/book;id=0r7mg7;{title:Action <span class="hljs-keyword">in</span> Seneca,price:9.99}</code></pre>
<p>这表示成功创建了一本ID为 <code>0r7mg7</code> 的书籍，现在，我们访问 <a href="http://localhost:3000/api/store/get?id=0r7mg7" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/store/get?id=0r7mg7</a> 即可查看该ID的书籍详情（ID是随机的，所以，你生成的ID可能并不是这样的）。</p>
<p><a href="http://localhost:3000/routes" rel="nofollow noreferrer" target="_blank">http://localhost:3000/routes</a> 可以查看所有的路由。</p>
<p>然后我们可创建一个新的购买订单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -d '{&quot;id&quot;:&quot;0r7mg7&quot;}' -H &quot;content-type:application/json&quot; http://localhost:3000/api/store/purchase
{&quot;when&quot;:1483609872715,&quot;bookId&quot;:&quot;0r7mg7&quot;,&quot;title&quot;:&quot;Action in Seneca&quot;,&quot;price&quot;:9.99,&quot;id&quot;:&quot;8suhf4&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">curl <span class="hljs-_">-d</span> <span class="hljs-string">'{"id":"0r7mg7"}'</span> -H <span class="hljs-string">"content-type:application/json"</span> http://localhost:3000/api/store/purchase
{<span class="hljs-string">"when"</span>:1483609872715,<span class="hljs-string">"bookId"</span>:<span class="hljs-string">"0r7mg7"</span>,<span class="hljs-string">"title"</span>:<span class="hljs-string">"Action in Seneca"</span>,<span class="hljs-string">"price"</span>:9.99,<span class="hljs-string">"id"</span>:<span class="hljs-string">"8suhf4"</span>}</code></pre>
<p>访问 <a href="http://localhost:3000/api/calculate/sum?left=2&amp;right=3" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/calculate/sum?left=2&amp;right=3</a> 可以得到 <code>{"answer":5}</code>。</p>
<h2 id="articleHeader10">最佳 Seneca 应用结构实践</h2>
<h3 id="articleHeader11">推荐你这样做</h3>
<ul>
<li><p>将业务逻辑与执行分开，放在单独的插件中，比如不同的Node模块、不同的项目甚至同一个项目下不同的文件都是可以的；</p></li>
<li>
<p>使用执行脚本撰写您的应用程序，不要害怕为不同的上下文使用不同的脚本，它们看上去应该很短，比如像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SOME_CONFIG = process.env.SOME_CONFIG || 'some-default-value'

require('seneca')({ some_options: 123 })

  // 已存在的 Seneca 插件
  .use('community-plugin-0')
  .use('community-plugin-1', {some_config: SOME_CONFIG})
  .use('community-plugin-2')

  // 业务逻辑插件
  .use('project-plugin-module')
  .use('../plugin-repository')
  .use('./lib/local-plugin')

  .listen( ... )
  .client( ... )

  .ready( function() {
    // 当 Seneca 启动成功之后的自定义脚本
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> SOME_CONFIG = process.env.SOME_CONFIG || <span class="hljs-string">'some-default-value'</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'seneca'</span>)({ <span class="hljs-attr">some_options</span>: <span class="hljs-number">123</span> })

  <span class="hljs-comment">// 已存在的 Seneca 插件</span>
  .use(<span class="hljs-string">'community-plugin-0'</span>)
  .use(<span class="hljs-string">'community-plugin-1'</span>, {<span class="hljs-attr">some_config</span>: SOME_CONFIG})
  .use(<span class="hljs-string">'community-plugin-2'</span>)

  <span class="hljs-comment">// 业务逻辑插件</span>
  .use(<span class="hljs-string">'project-plugin-module'</span>)
  .use(<span class="hljs-string">'../plugin-repository'</span>)
  .use(<span class="hljs-string">'./lib/local-plugin'</span>)

  .listen( ... )
  .client( ... )

  .ready( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 当 Seneca 启动成功之后的自定义脚本</span>
  })</code></pre>
</li>
<li><p>插件加载顺序很重要，这当然是一件好事，可以主上你对消息的成有绝对的控制权。</p></li>
</ul>
<h3 id="articleHeader12">不推荐你这样做</h3>
<ul>
<li><p>将 Seneca 应用的启动与初始化同其它框架的启动与初始化放在一起了，永远记住，保持事务的简单；</p></li>
<li><p>将 Seneca 实例当做变量到处传递。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Seneca ：NodeJS 微服务框架入门指南

## 原文链接
[https://segmentfault.com/a/1190000008501410](https://segmentfault.com/a/1190000008501410)


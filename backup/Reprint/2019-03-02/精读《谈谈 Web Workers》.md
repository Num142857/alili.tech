---
title: '精读《谈谈 Web Workers》' 
date: 2019-03-02 2:30:07
hidden: true
slug: h27jxfgofh6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 引言</h2>
<p>本周精读的文章是 <a href="https://auth0.com/blog/speedy-introduction-to-web-workers/" rel="nofollow noreferrer" target="_blank">speedy-introduction-to-web-workers</a>，是一篇 Web Workers 快速入门的文章，借精读这篇文章的机会，谈谈对 Web Workers 的理解与运用。</p>
<h2 id="articleHeader1">2 概述</h2>
<blockquote>就像分工，你只负责编码，而你的朋友负责设计，那你就可以专心把自己的事情做好，而且更快速的完成任务。</blockquote>
<p>本文通过一个比方，描述了 Web Workers 的两大特征：</p>
<ol>
<li>高效。</li>
<li>并行。</li>
</ol>
<p>因为浏览器是单线程的，任何大量耗时的 JS 任务都会卡住界面，使浏览器无法响应任何操作，这样的用户体验非常糟糕。Web Workers 可以将耗时任务拆解出去，降低主线程的压力，避免主线程无响应。</p>
<blockquote>但 CPU 资源是有限的，Web Workers 并不能增加总体运行效率，算上通信的损耗，整体计算效率会有一定的下降。</blockquote>
<h3 id="articleHeader2">创建 Web Workers</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const worker = new Worker(&quot;../src/worker.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">"../src/worker.js"</span>);</code></pre>
<p>上述代码中，<code>worker</code> 就是一个 Web Workers 实例，执行的代码是 <code>../src/worker.js</code> 路径下的文件。</p>
<h3 id="articleHeader3">收发消息</h3>
<p>Web Workers 用来执行异步脚本，只要掌握了它与主线程通信的方式，就可以在指定时机运行异步脚本，并在运行完时将结果传递给主线程。</p>
<h4>主线程接收发 Web Workers 消息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const worker = new Worker(&quot;../src/worker.js&quot;);

worker.onmessage = e => {};

worker.postMessage(&quot;Marco!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">"../src/worker.js"</span>);

worker.onmessage = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {};

worker.postMessage(<span class="hljs-string">"Marco!"</span>);</code></pre>
<p>每个 <code>worker</code> 实例通过 <code>onmessage</code> 接收消息，通过 <code>postMessage</code> 发送消息。</p>
<h4>Web Workers 收发主线程消息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.onmessage = e => {};

self.postMessage(&quot;Marco!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">self.onmessage = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {};

self.postMessage(<span class="hljs-string">"Marco!"</span>);</code></pre>
<p>和主线程代码类似，在 Web Workers 代码中，也是 <code>onmessage</code> 接收消息，这个消息来自主线程或者其它 Workers。也可以通过 <code>postMessage</code> 发送消息。</p>
<h4>销毁 Web Workers</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker.terminate();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">worker.terminate();</code></pre>
<p>文章内容就这么多，是不是有写太简单了呢！笔者结合自己的使用经验，再补充一些知识。</p>
<h2 id="articleHeader4">3 精读</h2>
<h3 id="articleHeader5">对象转移（Transferable Objects）</h3>
<p>对象转移就是将对象引用零成本转交给 Web Workers 的上下文，而不需要进行结构拷贝。</p>
<p>这里要解释的是，<strong>主线程与 Web Workers 之间的通信，并不是对象引用的传递，而是序列化/反序列化的过程</strong>，当对象非常庞大时，序列化和反序列化都会消耗大量计算资源，降低运行速度。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016756469?w=577&amp;h=318" src="https://static.alili.tech/img/remote/1460000016756469?w=577&amp;h=318" alt="" title="" style="cursor: pointer;"></span></p>
<p>上面的图充分证明了，大对象传递，使用对象转移各项指标都优于结构拷贝。</p>
<p>对象转移使用方式很简单，给 <code>postMessage</code> 增加一个参数，把对象引用传过去即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ab = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">1</span>);
worker.postMessage(ab, [ab]);</code></pre>
<p>浏览器兼容性也不错：Currently Chrome 17+, Firefox, Opera, Safari, IE10+。更具体内容，可以看 <a href="https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast" rel="nofollow noreferrer" target="_blank">Transferable Objects: Lightning Fast!</a>。</p>
<blockquote>需要注意的是，对象引用转移后，原先上下文就无法访问此对象了，需要在 Web Workers 再次将对象还原到主线程上下文后，主线程才能正常访问被转交的对象。</blockquote>
<h3 id="articleHeader6">如何不用 JS 文件创建 Web Workers</h3>
<p>Web Workers 优势这么大，但用起来需要在同域下创建一个 JS 文件实在不方便，尤其在前后端分离做的比较彻底的团队，前端团队能控制的仅仅是一个 JS 文件。那么下面给出几个不用 JS 文件，就创建 Web Workers 的方法：</p>
<h4>webpack 插件 - worker-loader</h4>
<p><a href="https://github.com/webpack-contrib/worker-loader" rel="nofollow noreferrer" target="_blank">worker-loader</a> 是一个 webpack 插件，可以将一个普通 JS 文件的全部依赖提取后打包并替换调用处，以 Blob 形式内联在源码中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Worker from &quot;worker-loader!./file.worker.js&quot;;

const worker = new Worker();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Worker <span class="hljs-keyword">from</span> <span class="hljs-string">"worker-loader!./file.worker.js"</span>;

<span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker();</code></pre>
<p>上述代码的魔术在于，转化成下面的方式执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const blob = new Blob([codeFromFileWorker], { type: &quot;application/javascript&quot; });
const worker = new Worker(URL.createObjectURL(blob));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> blob = <span class="hljs-keyword">new</span> Blob([codeFromFileWorker], { <span class="hljs-attr">type</span>: <span class="hljs-string">"application/javascript"</span> });
<span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker(URL.createObjectURL(blob));</code></pre>
<h4>Blob URL</h4>
<p>第二种方式由第一种方式自然带出：如果不想用 webpack 插件，那自己通过 Blob 的方式创建也可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const code = `
  importScripts('https://xxx.com/xxx.js');
  self.onmessage = e => {};
`;

const blob = new Blob([code], { type: &quot;application/javascript&quot; });
const worker = new Worker(URL.createObjectURL(blob));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> code = <span class="hljs-string">`
  importScripts('https://xxx.com/xxx.js');
  self.onmessage = e =&gt; {};
`</span>;

<span class="hljs-keyword">const</span> blob = <span class="hljs-keyword">new</span> Blob([code], { <span class="hljs-attr">type</span>: <span class="hljs-string">"application/javascript"</span> });
<span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker(URL.createObjectURL(blob));</code></pre>
<p>看上去代码更轻量一些，不过问题是当遇到复杂依赖时，如果不能把依赖都转化为脚本通过 <code>importScripts</code> 方式引用，就无法访问到主线程环境中的包。如果真的遇到了这个问题，可以用第一种 webpack 插件的方式解决，这个插件会自动把文件所有依赖都打包进源码。</p>
<h3 id="articleHeader7">管理 postMessage 队列</h3>
<p>为什么 postMessage 会形成队列，为什么要管理它？</p>
<p>首先在 Web Workers 架构设计上就必须做成队列，因为调用 <code>postMessage</code> 时，对应的 Web Workers 不一定完成了初始化，所以浏览器底层必须管理一个队列，在 Web Workers 初始化完毕时，依次消费，这样才能确保任何时候发出的 <code>postMessage</code> 都能被 Web Workers 接收到。</p>
<p>其次，为什么要手动维护这个队列，原因可能取决于如下几点：</p>
<ul>
<li>业务原因，前面的 <code>postMessage</code> 还没来得及消费，就不要发送新的消息，或者丢弃新的消息，这时候需要通过双向通信拿到 Web Workers 的执行结果回执，手动控制队列。</li>
<li>性能原因，一般 Web Workers 都会被用来执行耗时的同步运算，如果运算时间比较长，那短期塞入多个消息队列是没有意义的。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016756470" src="https://static.alili.tech/img/remote/1460000016756470" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上图所示，对于每次用户输入都要进行的 SQL Parser 很耗时，及时放在 Web Workers 也可能导致将 Workers 撑爆到无响应，这是不仅要使用多 Workers 缓冲池，还要对待执行队列进行过滤，因为用户永远只关心最后一次输入的 Parser 结果。</p>
<p>由于 Web Workers 运算被卡住时，除了销毁 Worker 没有别的办法，而销毁 Worker 的成本比较高，不能对每一个用户输入都销毁并新建 Web Workers，所以利用 Workers 缓冲池，当缓冲池满了，新的消费队列又进来的时候，可以销毁全部 Workers 缓冲池，换一批新缓冲池重新消费用户输入。</p>
<h2 id="articleHeader8">4 总结</h2>
<p>Web Workers 是拆解异步计算的好帮手，vscode 网页版也通过 Web Workers 异步完成代码提示和高亮，笔者有对比过，发现 Web Workers 性能提升非常明显。</p>
<p>管理好你的 Web Workers 消息队列，谨防同步计算让 Web Workers 失去响应！建立一个智能的消息队列，根据业务需求设计一个最好的队列消费模型吧！</p>
<h2 id="articleHeader9">5 更多讨论</h2>
<blockquote>讨论地址是：<a href="https://github.com/dt-fe/weekly/issues/108" rel="nofollow noreferrer" target="_blank">精读《谈谈 Web Workers》 · Issue #108 · dt-fe/weekly</a>
</blockquote>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，周末或周一发布。前端精读 - 帮你筛选靠谱的内容。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《谈谈 Web Workers》

## 原文链接
[https://segmentfault.com/a/1190000016756466](https://segmentfault.com/a/1190000016756466)


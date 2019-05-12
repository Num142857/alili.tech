---
title: 'Koa v2.x 中文文档' 
date: 2018-12-27 2:30:12
hidden: true
slug: aszdj8lj4t
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>此系列文章的应用示例已发布于 <a href="https://github.com/demopark/koa-docs-Zh-CN" rel="nofollow noreferrer" target="_blank">GitHub: koa-docs-Zh-CN</a>. 可以 Fork 帮助改进或 Star 关注更新. 欢迎 Star.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVNQYf?w=1020&amp;h=790" src="https://static.alili.tech/img/bVNQYf?w=1020&amp;h=790" alt="用于 nodejs 的 koa 中间件框架" title="用于 nodejs 的 koa 中间件框架" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://gitter.im/koajs/koa?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011841333" src="https://static.alili.tech/img/remote/1460000011841333" alt="gitter" title="gitter" style="cursor: pointer;"></span></a><br><a href="https://www.npmjs.com/package/koa" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011841334" src="https://static.alili.tech/img/remote/1460000011841334" alt="NPM version" title="NPM version" style="cursor: pointer;"></span></a><br><a href="https://travis-ci.org/koajs/koa" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011841335" src="https://static.alili.tech/img/remote/1460000011841335" alt="build status" title="build status" style="cursor: pointer;"></span></a><br><a href="https://codecov.io/github/koajs/koa?branch=master" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011841336" src="https://static.alili.tech/img/remote/1460000011841336" alt="Test coverage" title="Test coverage" style="cursor: pointer;"></span></a><br><a href="#backers"><span class="img-wrap"><img data-src="/img/remote/1460000011841337" src="https://static.alili.tech/img/remote/1460000011841337" alt="OpenCollective Backers" title="OpenCollective Backers" style="cursor: pointer; display: inline;"></span></a><br><a href="#sponsors"><span class="img-wrap"><img data-src="/img/remote/1460000011841338" src="https://static.alili.tech/img/remote/1460000011841338" alt="OpenCollective Sponsors" title="OpenCollective Sponsors" style="cursor: pointer;"></span></a></p>
<blockquote><p>此项目同步自 <a href="https://github.com/koajs" rel="nofollow noreferrer" target="_blank">koajs</a> / <a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">koa</a> 项目中的  docs. 除特殊情况, 将保持每月一次的同步频率.</p></blockquote>
<p>用 node.js 来实现 HTTP 的中间件框架，让 Web 应用程序和 API 可以更加愉快地编写。Koa 的中间件堆栈以类似堆栈的方式流动，允许您执行下游操作，然后过滤并操纵上游的响应。</p>
<p>几乎所有 HTTP 服务器通用的方法都被直接集成到 Koa 大约570行源码的代码库中。其中包括比如内容协商，规范节点不一致性，重定向等其它操作。</p>
<p>Koa没有捆绑任何中间件。</p>
<h2 id="articleHeader0">安装</h2>
<p>Koa 依赖 <strong>node v7.6.0</strong> 或 ES2015及更高版本和 async 方法支持.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install koa" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> koa</code></pre>
<h2 id="articleHeader1">Hello koa</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require('koa');
const app = new Koa();

// 响应
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

<span class="hljs-comment">// 响应</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>;
});

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<h2 id="articleHeader2">入门</h2>
<ul>
<li>
<a href="https://github.com/koajs/kick-off-koa" rel="nofollow noreferrer" target="_blank">Kick-Off-Koa</a> - 通过一系列自身指引的讲解介绍了 Koa。</li>
<li>
<a href="https://github.com/koajs/workshop" rel="nofollow noreferrer" target="_blank">Workshop</a> - 通过学习 Koa 的讲解，快速领会精髓。</li>
<li>
<a href="http://knowthen.com/episode-3-koajs-quickstart-guide/" rel="nofollow noreferrer" target="_blank">Introduction Screencast</a> - 关于 Koa 安装入门的介绍。</li>
</ul>
<h2 id="articleHeader3">中间件</h2>
<p>Koa 是一个中间件框架，可以将两种不同的功能作为中间件：</p>
<ul>
<li>async function</li>
<li>common function</li>
</ul>
<p>以下是每个不同功能记录器的中间件示例：</p>
<h3 id="articleHeader4">
<strong><em>async</em></strong> functions (node v7.6+)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">await</span> next();
  <span class="hljs-keyword">const</span> ms = <span class="hljs-built_in">Date</span>.now() - start;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.method}</span> <span class="hljs-subst">${ctx.url}</span> - <span class="hljs-subst">${ms}</span>ms`</span>);
});</code></pre>
<h3 id="articleHeader5">Common function</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 中间件通常带有两个参数 (ctx, next), ctx 是一个请求的上下文,
// next 是调用执行下游中间件的函数. 在代码执行完成后通过 then 方法返回一个 Promise.

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 中间件通常带有两个参数 (ctx, next), ctx 是一个请求的上下文,</span>
<span class="hljs-comment">// next 是调用执行下游中间件的函数. 在代码执行完成后通过 then 方法返回一个 Promise.</span>

app.use(<span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now();
  <span class="hljs-keyword">return</span> next().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> ms = <span class="hljs-built_in">Date</span>.now() - start;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.method}</span> <span class="hljs-subst">${ctx.url}</span> - <span class="hljs-subst">${ms}</span>ms`</span>);
  });
});</code></pre>
<h3 id="articleHeader6">Koa v1.x 中间件签名</h3>
<p>中间件签名在 v1.x 和 v2.x 之间已经被更改. 旧的签名已经被弃用.</p>
<p><strong>旧的签名中间件支持将在 v3 中删除</strong></p>
<p>请参阅 <a href="https://segmentfault.com/a/1190000011840238">迁移指南</a> 获取有关从 v1.x 升级并使用 v2.x 中间件的更多信息。</p>
<h2 id="articleHeader7">上下文, 请求和响应</h2>
<p>每个中间件都接收一个 Koa 的 <code>Context</code> 对象，该对象封装了一个传入的 http 消息，并对该消息进行了相应的响应。 <code>ctx</code> 通常用作上下文对象的参数名称。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) => { await next(); });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; { <span class="hljs-keyword">await</span> next(); });</code></pre>
<p>Koa 提供了一个 <code>Request</code> 对象作为 <code>Context</code> 的 <code>request</code> 属性。<br>Koa的 <code>Request</code> 对象提供了用于处理 http 请求的方法，该请求委托给 node <code>http</code> 模块的<a href="https://nodejs.org/api/http.html#http_class_http_incomingmessage" rel="nofollow noreferrer" target="_blank">IncomingMessage</a>。</p>
<p>这是一个检查请求客户端 xml 支持的示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) => {
  ctx.assert(ctx.request.accepts('xml'), 406);
  // 相当于:
  // if (!ctx.request.accepts('xml')) ctx.throw(406);
  await next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.assert(ctx.request.accepts(<span class="hljs-string">'xml'</span>), <span class="hljs-number">406</span>);
  <span class="hljs-comment">// 相当于:</span>
  <span class="hljs-comment">// if (!ctx.request.accepts('xml')) ctx.throw(406);</span>
  <span class="hljs-keyword">await</span> next();
});</code></pre>
<p>Koa提供了一个 <code>Response</code> 对象作为 <code>Context</code> 的 <code>response</code> 属性。<br>Koa的 <code>Response</code> 对象提供了用于处理 http 响应的方法，该响应委托给 <a href="https://nodejs.org/api/http.html#http_class_http_serverresponse" rel="nofollow noreferrer" target="_blank">ServerResponse</a>。</p>
<p>Koa 对 Node 的请求和响应对象进行委托而不是扩展它们。这种模式提供了更清晰的接口，并减少了不同中间件与 Node 本身之间的冲突，并为流处理提供了更好的支持。<br><code>IncomingMessage</code> 仍然可以直接被访问，因为 <code>Context</code> 和 <code>ServerResponse</code> 上的 <code>req</code> 属性可以直接作为 <code>Context</code> 上的 <code>res</code> 属性访问。</p>
<p>这里是一个使用 Koa 的 <code>Response</code> 对象将文件作为响应体流式传输的示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'xml';
  ctx.response.body = fs.createReadStream('really_large.xml');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">await</span> next();
  ctx.response.type = <span class="hljs-string">'xml'</span>;
  ctx.response.body = fs.createReadStream(<span class="hljs-string">'really_large.xml'</span>);
});</code></pre>
<p><code>Context</code> 对象还提供了其 <code>request</code> 和 <code>response</code> 方法的快捷方式。在前面的例子中，可以使用 <code>ctx.type</code> 而不是 <code>ctx.request.type</code>，而 <code>ctx.accepts</code> 可以用来代替 <code>ctx.request.accepts</code>。</p>
<p>关于 <code>Request</code>, <code>Response</code> 和 <code>Context</code> 更多详细信息, 参阅 <a href="https://segmentfault.com/a/1190000011839832">请求 API 参考</a>,<br><a href="https://segmentfault.com/a/1190000011839957" target="_blank">响应 API 参考</a> 和 <a href="https://segmentfault.com/a/1190000011840010">上下文 API 参考</a>.</p>
<h2 id="articleHeader8">Koa 应用程序</h2>
<p>在执行 <code>new Koa()</code> 时创建的对象被称为 Koa 应用程序对象。</p>
<p>应用对象是 Koa 与 node 的 http 服务器和处理中间件注册的接口，从 http 发送到中间件，默认错误处理，以及上下文，请求和响应对象的配置。</p>
<p>了解有关应用程序对象的更多信息请到 <a href="https://segmentfault.com/a/1190000011840160" target="_blank">应用 API 参考</a>.</p>
<h2 id="articleHeader9">文档</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000011840963">使用指南</a></li>
<li><a href="https://segmentfault.com/a/1190000011840558" target="_blank">错误处理</a></li>
<li><a href="https://segmentfault.com/a/1190000011840369">Koa 与 Express</a></li>
<li><a href="https://segmentfault.com/a/1190000011840501" target="_blank">常见问题</a></li>
<li><a href="https://segmentfault.com/a/1190000011840238">从 Koa v1.x 迁移到 v2.x</a></li>
<li>
<p><a href="https://segmentfault.com/a/1190000011840160" target="_blank">API 文档</a></p>
<ul>
<li><a href="https://segmentfault.com/a/1190000011840010">上下文(Context)</a></li>
<li><a href="https://segmentfault.com/a/1190000011839832" target="_blank">请求(Request)</a></li>
<li><a href="https://segmentfault.com/a/1190000011839957">响应(Response)</a></li>
</ul>
</li>
<li><a href="https://github.com/koajs/koa/wiki" rel="nofollow noreferrer" target="_blank">Koa 中间件列表</a></li>
</ul>
<h2 id="articleHeader10">Babel 配置</h2>
<p>如果你正在使用的不是 <code>node v7.6+</code>, 我们推荐你用 <a href="https://github.com/babel/babel-preset-env" rel="nofollow noreferrer" target="_blank"><code>babel-preset-env</code></a> 配置 <code>babel</code> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-register babel-preset-env --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install babel-register babel-preset-env --save</code></pre>
<p>在你入口文件配置 <code>babel-register</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('babel-register');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-register'</span>);</code></pre>
<p>还有你的 <code>.babelrc</code> 配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;targets&quot;: {
        &quot;node&quot;: true
      }
    }]
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"targets"</span>: {
        <span class="hljs-attr">"node"</span>: <span class="hljs-literal">true</span>
      }
    }]
  ]
}</code></pre>
<h2 id="articleHeader11">运行测试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-built_in">test</span></code></pre>
<blockquote><p>如果这篇文章对您有帮助, 感谢 下方点赞 或 Star  <a href="https://github.com/demopark/koa-docs-Zh-CN" rel="nofollow noreferrer" target="_blank">GitHub: koa-docs-Zh-CN</a> 支持, 谢谢.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Koa v2.x 中文文档

## 原文链接
[https://segmentfault.com/a/1190000011841330](https://segmentfault.com/a/1190000011841330)


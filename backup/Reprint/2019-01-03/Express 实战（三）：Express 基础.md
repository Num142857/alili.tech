---
title: 'Express 实战（三）：Express 基础' 
date: 2019-01-03 2:30:11
hidden: true
slug: 89u6woy7q88
categories: [reprint]
---

{{< raw >}}

                    
<p>Express 框架的初衷是为了拓展 Node 内置模块的功能提高开发效率。当你深入研究后就会发现，Express 其实是在 Node 内置的 HTTP 模块上构建了一层抽象。理论上所有 Express 实现的功能，同样可以使用纯 Node 实现。</p>
<p>在本文中，我们将基于前面的 Node 内容去探究 Express 和 Node 之间的关系，其中包括：中间件和路由等概念。当然，这里只会进行一些综述具体的细节会在后面带来。</p>
<p>总的来说，Express 提供了 4 个主要特性：</p>
<ol>
<li>与纯 Node 中使用一个函数处理所有请求的代码不同， Express 则使用“中间件栈”处理流。</li>
<li>路由与中间件类似，只有当你通过特定 HTTP 方法访问特定 URL 时才会触发处理函数的调用。</li>
<li>对 request 和 response 对象方法进行了拓展。</li>
<li>视图模块允许你动态渲染和改变 HTML 内容，并且使用其他语言编写 HTML 。</li>
</ol>
<p>&lt;!--more--&gt;</p>
<h2 id="articleHeader0">中间件</h2>
<p>中间件是 Express 中最大的特性之一。中间件与原生的 Node 处理函数非常类似（接受一个请求并做出响应），但是与原生不同的是，中间件将处理过程进行划分，并且使用多个函数构成一个完整的处理流程。</p>
<p>我们将会看到中间件在代码中的各种应用。例如，首先使用一个中间件记录所有的请求，接着在其他的中间件中设置 HTTP 头部信息，然后继续处理流程。虽然在一个“大函数”中也可以完成请求处理，但是将任务进行拆分为多个功能明确独立的中间件明显更符合软件开发中的 SRP 规则。</p>
<blockquote><p>中间件并不是 Express 特有，Python 的 Django 或者 PHP 的 Laravel 也有同样的概念存在。同样的 Ruby 的 Web 框架中也有被称为 Rack 中间件概念。</p></blockquote>
<p>现在我们就用 Express 中间件来重新实现 Hello World 应用。你将会发现只需几行代码就能完成开发，在提高效率的同时还消除了一些隐藏 bug。</p>
<h3 id="articleHeader1">Express 版 Hello World</h3>
<p>首先新建一个Express工程：新建一个文件夹并在其中新建 package.json 文件。回想一下 package.json 的工作原理，其中完整的列出了该工程的依赖、项目名称、作者等信息。我们新工程中的  package.json 大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&nbsp; &quot;name&quot;: &quot;hello-world&quot;,
&nbsp; &quot;author&quot;: &quot;Your Name Here!&quot;,
&nbsp; &quot;private&quot;: true,
&nbsp; &quot;dependencies&quot;: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
&nbsp; <span class="hljs-attr">"name"</span>: <span class="hljs-string">"hello-world"</span>,
&nbsp; <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Your Name Here!"</span>,
&nbsp; <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
&nbsp; <span class="hljs-attr">"dependencies"</span>: {}
}</code></pre>
<p>接下来执行命令，安装最新的 Express 并且将其保存到 package.json 中：</p>
<blockquote><p>npm install express -sava</p></blockquote>
<p>命令执行完成后，Express 会自动安装到 <em>node_modules</em> 的文件下，并且会在 package.json 明确列出改依赖。此时 package.json  中的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&nbsp; &quot;name&quot;: &quot;hello-world&quot;,
&nbsp; &quot;author&quot;: &quot;Your Name Here!&quot;,
&nbsp; &quot;private&quot;: true,
&nbsp; &quot;dependencies&quot;: {
&nbsp;       &quot;express&quot;: &quot;^5.0.0&quot;
&nbsp; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
&nbsp; <span class="hljs-attr">"name"</span>: <span class="hljs-string">"hello-world"</span>,
&nbsp; <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Your Name Here!"</span>,
&nbsp; <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
&nbsp; <span class="hljs-attr">"dependencies"</span>: {
&nbsp;       <span class="hljs-attr">"express"</span>: <span class="hljs-string">"^5.0.0"</span>
&nbsp; }
}</code></pre>
<p>接下来将下列代码复制到 app.js 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);&nbsp; 
var http = require(&quot;http&quot;);
var app = express();&nbsp;&nbsp; 
&nbsp;
app.use(function(request, response) {&nbsp; 
    response.writeHead(200, { &quot;Content-Type&quot;: &quot;text/plain&quot; });&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp;   response.end(&quot;Hello, World!&quot;);&nbsp; 
});&nbsp;
&nbsp;
http.createServer(app).listen(3000);&nbsp; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);&nbsp; 
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> app = express();&nbsp;&nbsp; 
&nbsp;
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{&nbsp; 
    response.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span> });&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp;   response.end(<span class="hljs-string">"Hello, World!"</span>);&nbsp; 
});&nbsp;
&nbsp;
http.createServer(app).listen(<span class="hljs-number">3000</span>);&nbsp; 
</code></pre>
<p>首先，我们依次引入了 Express 和 HTTP 模块。</p>
<p>然后，使用 <em>express()</em> 方法创建变量 <em>app</em> ，该方法会返回一个请求处理函数闭包。这一点非常重要，因为它意味着我可以像之前一样将其传递给 <em>http.createServer</em> 方法。</p>
<p>还记得前一章提到的原生 Node 请求处理吗？它大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = http.createServer(function(request, response) {
    response.writeHead(200, { &quot;Content-Type&quot;: &quot;text/plain&quot; });
&nbsp;   response.end(&quot;Hello, world!&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> app = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span> });
&nbsp;   response.end(<span class="hljs-string">"Hello, world!"</span>);
});</code></pre>
<p>两段代码非常相似，回调闭包都包含两个参数并且响应也一样。</p>
<p>最后，我们创建了一个服务并且启动了它。<em>http.createServer</em> 接受的参数是一个函数，所以合理猜测 app 也只是一个函数，只不过该函数表示的是 Express 中一个完整的中间件处理流程。</p>
<h3 id="articleHeader2">中间件如何在高层工作</h3>
<p>在原生的 Node 代码中，所有的 HTTP 请求处理都在一个函数中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function requestHandler(request, response) {
    console.log(&quot;In comes a request to: &quot; + request.url);
    response.end(&quot;Hello, world!&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestHandler</span>(<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"In comes a request to: "</span> + request.url);
    response.end(<span class="hljs-string">"Hello, world!"</span>);
}</code></pre>
<p>如果抽象成流程图的话，它看起来就像：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819806" src="https://static.alili.tech/img/remote/1460000010819806" alt="03_01" title="03_01" style="cursor: pointer;"></span></p>
<p>这并不是说在处理过程中不能调用其它函数，而是所有的请求响应都由该函数发送。</p>
<p>而中间件则使用一组中间件栈函数来处理这些请求，处理过程如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819807" src="https://static.alili.tech/img/remote/1460000010819807" alt="03_02" title="03_02" style="cursor: pointer;"></span></p>
<p>那么，接下来我们就有必要了解 Express 使用一组中间件函数的缘由，以及这些函数作用。</p>
<p>现在我们回顾一下前面用户验证的例子：只有验证通过才会展示用户的私密信息，与此同时每次访问请求都要进行记录。</p>
<p>在这个应用中存在三个中间件函数：请求记录、用户验证、信息展示。中间件工作流为：先记录每个请求，然后进行用户验证，验证通过进行信息展示，最后对请求做出响应。所以，整个工作流有两种可能情形：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819808" src="https://static.alili.tech/img/remote/1460000010819808" alt="03_03" title="03_03" style="cursor: pointer; display: inline;"></span></p>
<p>另外，这些中间件函数中部分函数需要对响应做出响应。如果没有做出任何响应的话，那么服务器会挂起请求而浏览器也会干等。</p>
<p>这样做的好处就是，我们可以将应用进行拆分。而拆分后的组件不仅利于后期维护，并且组件之间还可以进行不同组合。</p>
<h3 id="articleHeader3">不做任何修改的中间件</h3>
<p>中间件函数可以对  request、response 进行修改，但它并不是必要操作。例如，前面的日志记录中间件代码：它只需要进行记录操作。而一个不做任何修改，纯功能性的中间函数代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunMiddleware(request, response, next) {
  ...     
  nest(); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunMiddleware</span>(<span class="hljs-params">request, response, next</span>) </span>{
  ...     
  nest(); 
}</code></pre>
<p>因为中间件函数的执行是从上到下的。所以，加入纯功能性的请求记录中间件后，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var http = require(&quot;http&quot;);
var app = express();
// 日志记录中间件
app.use(function(request, response, next) {
  console.log(&quot;In comes a &quot; + request.method + &quot; to &quot; + request.url);
  next();
});

// 发送实际响应
app.use(function(request, response) {
  response.writeHead(200, { &quot;Content-Type&quot;: &quot;text/plain&quot; });
  response.end(&quot;Hello, world!&quot;);
});
http.createServer(app).listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-comment">// 日志记录中间件</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"In comes a "</span> + request.method + <span class="hljs-string">" to "</span> + request.url);
  next();
});

<span class="hljs-comment">// 发送实际响应</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span> });
  response.end(<span class="hljs-string">"Hello, world!"</span>);
});
http.createServer(app).listen(<span class="hljs-number">3000</span>);</code></pre>
<h3 id="articleHeader4">修改 request、response 的中间件</h3>
<p>并不是所有的中间件都和上面一样，在部分中间件函数需要对 request、response  进行处理，尤其是后者。</p>
<p>下面我们来实现前面提到的验证中间件函数。为了简单起见，这里只允许当前分钟数为偶数的情况通过验证。那么，该中间件函数代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function(request, response, next) {
  console.log(&quot;In comes a &quot; + request.method + &quot; to &quot; + request.url);
  next();
});
app.use(function(request, response, next) {
  var minute = (new Date()).getMinutes();
  // 如果在这个小时的第一分钟访问，那么调用next()继续
  if ((minute % 2) === 0) {
    next();
  } else {
    // 如果没有通过验证，发送一个403的状态码并进行响应
    response.statusCode = 403;
    response.end(&quot;Not authorized.&quot;);
  }
});
app.use(function(request, response) {
  response.end('Secret info: the password is &quot;swordfish&quot;!'); // 发送密码信息
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"In comes a "</span> + request.method + <span class="hljs-string">" to "</span> + request.url);
  next();
});
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-keyword">var</span> minute = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getMinutes();
  <span class="hljs-comment">// 如果在这个小时的第一分钟访问，那么调用next()继续</span>
  <span class="hljs-keyword">if</span> ((minute % <span class="hljs-number">2</span>) === <span class="hljs-number">0</span>) {
    next();
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 如果没有通过验证，发送一个403的状态码并进行响应</span>
    response.statusCode = <span class="hljs-number">403</span>;
    response.end(<span class="hljs-string">"Not authorized."</span>);
  }
});
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">'Secret info: the password is "swordfish"!'</span>); <span class="hljs-comment">// 发送密码信息</span>
});</code></pre>
<h3 id="articleHeader5">第三方中间件类库</h3>
<p>在大多数情况下，你正在尝试的工作可能已经被人实现过了。也就是说，对于一些常用的功能社区中可能已经存在成熟的解决方案了。下面，我们就来介绍一些 Express 中常用的第三方模块。</p>
<h4>MORGAN：日志记录中间件</h4>
<p><strong>Morgan</strong> 是一个功能非常强大的日志中间件。它能对用户的行为和请求时间进行记录。而这对于分析异常行为和可能的站点崩溃来说非常有用。大多数时候 <strong>Morgan</strong> 也是 Express 中日志中间件的首选。</p>
<p>使用命令 <em>npm install morgan --save</em> 安装该中间件，并修改 app.js 中的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var logger = require(&quot;morgan&quot;);
var http = require(&quot;http&quot;);
var app = express();
app.use(logger(&quot;short&quot;)); 
app.use(function(request, response){
    response.writeHead(200, {&quot;Content-Type&quot;: &quot;text/plain&quot;});
    response.end(&quot;Hello, world!&quot;);
});
http.createServer(app).listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">"morgan"</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> app = express();
app.use(logger(<span class="hljs-string">"short"</span>)); 
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>)</span>{
    response.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span>});
    response.end(<span class="hljs-string">"Hello, world!"</span>);
});
http.createServer(app).listen(<span class="hljs-number">3000</span>);</code></pre>
<p>再次访问 <em><a href="http://localhost:3000/em" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a></em> 你就会看到 Morgan 记录的日志了。</p>
<h4>Express 的静态文件中间件</h4>
<p>通过网络发送静态文件对 Web 应用来说是一个常见的需求场景。这些资源通常包括图片资源、CSS 文件以及静态 HTML 文件。但是一个简单的文件发送行为其实代码量很大，因为需要检查大量的边界情况以及性能问题的考量。而 Express 内置的 <em>express.static</em> 模块能最大程度简化工作。</p>
<p>假设现在需要对 <em>public</em> 文件夹提供文件服务，只需通过静态文件中间件我们就能极大压缩代码量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var path = require(&quot;path&quot;);
var http = require(&quot;http&quot;);
var app = express();
var publicPath = path.resolve(__dirname, &quot;public&quot;); 
app.use(express.static(publicPath)); 
app.use(function(request, response) {
    response.writeHead(200, { &quot;Content-Type&quot;: &quot;text/plain&quot; });
    response.end(&quot;Looks like you didn't find a static file.&quot;);
});
http.createServer(app).listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-keyword">var</span> publicPath = path.resolve(__dirname, <span class="hljs-string">"public"</span>); 
app.use(express.static(publicPath)); 
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"text/plain"</span> });
    response.end(<span class="hljs-string">"Looks like you didn't find a static file."</span>);
});
http.createServer(app).listen(<span class="hljs-number">3000</span>);</code></pre>
<p>现在，任何在 <em>public</em> 目录下的静态文件都能直接请求了，所以你可以将所有需要的文件的放在该目录下。如果 <em>public</em> 文件夹中没有任何匹配的文件存在，它将继续执行下一个中间件并响应一段 <strong>没有匹配的文件</strong>信息。</p>
<blockquote><p>为什么使用  path.resolve ？<br>之所以不直接使用 <em>/public</em>  是因为 Mac 和 Linux 中目录为 <em>/public</em> 而 Windows 使用万恶的反斜杠 <em>public</em> 。path.resolve 就是用来解决多平台目录路径问题。</p></blockquote>
<h4>更多中间件</h4>
<p>除此上面介绍的 Morgan 中间件和 Express 静态中间之外，还有很多其他功能强大的中间件，例如：</p>
<ul>
<li>connect-ratelimit：可以让你控制每小时的连接数。如果某人向服务发起大量请求，那么可以直接返回错误停止处理这些请求。</li>
<li>helmet：可以添加 HTTP 头部信息来应对一些网络攻击。具体内容会在后面关于安全的章节讲到。</li>
<li>cookie-parses：用于解析浏览器中的 cookie 信息。</li>
<li>response-time：通过发送 X-Response-Time 信息，让你能够更好的调试应用的性能。</li>
</ul>
<h2 id="articleHeader6">路由</h2>
<p>路由是一种将 URL 和 HTTP 方法映射到特定处理回调函数的技术。假设工程里有一个主页，一个关于页面以及一个 404 页面，接下来看看路由是如何进行映射的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var express = require(&quot;express&quot;);
var path = require(&quot;path&quot;);
var http = require(&quot;http&quot;);
var app = express();

// 像之前一样设置静态文件中间件。
// 所有的请求通过这个中间件，如果没有文件被找到的话会继续前进
var publicPath = path.resolve(__dirname, &quot;public&quot;);
app.use(express.static(publicPath));

// 当请求根目录的时候被调用
app.get(&quot;/&quot;, function(request, response) {
    response.end(&quot;Welcome to my homepage!&quot;);
});

// 当请求/about的时候被调用
app.get(&quot;/about&quot;, function(request, response) {
    response.end(&quot;Welcome to the about page!&quot;);
});

// 当请求/weather的时候被调用
app.get(&quot;/weather&quot;, function(request, response) {
    response.end(&quot;The current weather is NICE.&quot;);
});

// 前面都不匹配，则路由错误。返回 404 页面
app.use(function(request, response) {
    response.statusCode = 404;
    response.end(&quot;404&quot;);
});
http.createServer(app).listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 像之前一样设置静态文件中间件。</span>
<span class="hljs-comment">// 所有的请求通过这个中间件，如果没有文件被找到的话会继续前进</span>
<span class="hljs-keyword">var</span> publicPath = path.resolve(__dirname, <span class="hljs-string">"public"</span>);
app.use(express.static(publicPath));

<span class="hljs-comment">// 当请求根目录的时候被调用</span>
app.get(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.end(<span class="hljs-string">"Welcome to my homepage!"</span>);
});

<span class="hljs-comment">// 当请求/about的时候被调用</span>
app.get(<span class="hljs-string">"/about"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.end(<span class="hljs-string">"Welcome to the about page!"</span>);
});

<span class="hljs-comment">// 当请求/weather的时候被调用</span>
app.get(<span class="hljs-string">"/weather"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.end(<span class="hljs-string">"The current weather is NICE."</span>);
});

<span class="hljs-comment">// 前面都不匹配，则路由错误。返回 404 页面</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.statusCode = <span class="hljs-number">404</span>;
    response.end(<span class="hljs-string">"404"</span>);
});
http.createServer(app).listen(<span class="hljs-number">3000</span>);</code></pre>
<p>上面代码中除了添加前面提到的中间件之外，后面三个 <em>app.get</em> 函数就是 Express 中强大的路由系统了。它们使用 app.post 来响应一个 POST 或者 PUT 等所有网络请求。函数中第一个参数是一个路径，例如 /about 或者 /weather 或者简单的根目录 / ，第二个参数是一个请求处理函数。该处理函数与之前的中间件工作方式一样，唯一的区别就是调用时机。</p>
<p>除了固定路由形式外，它还可以匹配更复杂的路由（使用正则等方式）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 指定“hello”为路由的固定部分
app.get(&quot;/hello/:who&quot;, function(request, response) {
    // :who 并不是固定住，它表示 URL 中传递过来的名字
    response.end(&quot;Hello, &quot; + request.params.who + &quot;.&quot;);
   
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 指定“hello”为路由的固定部分</span>
app.get(<span class="hljs-string">"/hello/:who"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-comment">// :who 并不是固定住，它表示 URL 中传递过来的名字</span>
    response.end(<span class="hljs-string">"Hello, "</span> + request.params.who + <span class="hljs-string">"."</span>);
   
});</code></pre>
<p>重启服务并访问 <em>localhost:3000/hello/earth</em> 等到的响应信息为：</p>
<blockquote><p>Hello, earth</p></blockquote>
<p>注意到如果你在 URL 后面插入多个 <em>/</em> 的话，例如：<em>localhost:3000/hello/entire/earth</em> 将会返回一个 404 错误。</p>
<p>你应该在日常生活中见过这种 URL 链接，特定的用户能够访问特定的 URL 。例如，有一个用户为 <em>ExpressSuperHero</em> ，那么他的个人信息页面 URL 可能是：</p>
<blockquote><p><a href="https://mywebsite.com/users/ExpressSuperHero" rel="nofollow noreferrer" target="_blank">https://mywebsite.com/users/E...</a></p></blockquote>
<p>在 Express 中你可以通过这种通配方式简化路由定义，而不必将所有用户的特定路由都一一列举出来。</p>
<p>官方文档中还展示了一个使用正则表达式来进行复杂匹配的例子，并且你可以通过路由做更多其它的事情。不过这章中只需要知道路由概念就行了，更多的内容将会在第五章中深入讲解。</p>
<h2 id="articleHeader7">扩展 request 和 response</h2>
<p>Express 在原来基础上对 request 和 response 对象进行了功能扩展。你可以在官方<a href="http://expressjs.com/en/api.html" rel="nofollow noreferrer" target="_blank">文档</a>中找到所有细节内容，不过我们可以先来领略其中的一部分：</p>
<p>Express 提供的功能中 redirect 算一个非常棒的功能，使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.redirect(&quot;/hello/world&quot;);
response.redirect(&quot;http://expressjs.com&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">response.redirect(<span class="hljs-string">"/hello/world"</span>);
response.redirect(<span class="hljs-string">"http://expressjs.com"</span>);</code></pre>
<p>原生 Node 中并没有重定向 redirect 方法。虽然我们也能够使用原生代码实现重定向功能，但明显它的代码量会更多。</p>
<p>另外，在 Express 中文件发送也变的更加简单，只需一行代码就能实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.sendFile(&quot;path/to/cool_song.mp3&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">response.sendFile(<span class="hljs-string">"path/to/cool_song.mp3"</span>)</code></pre>
<p>与之前一样，该功能的原生实现代码也比较复杂。</p>
<p>除了对响应对象 response 进行了拓展之外，Express 也对请求对象 request 进行了拓展。例如：你可以通过 <em>request.ip</em> 获取发送请求的机器 IP 地址或者通过 <em>request.get</em> 获取 HTTP 头部。</p>
<p>下面我们使用它实现 IP 黑名单功能，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var app = express();

var EVIL_IP = &quot;123.45.67.89&quot;;

app.use(function(request, response, next) {
    if (request.ip === EVIL_IP) {
        response.status(401).send(&quot;Not allowed!&quot;);
    } else {
        next();
    }
});

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-keyword">var</span> EVIL_IP = <span class="hljs-string">"123.45.67.89"</span>;

app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response, next</span>) </span>{
    <span class="hljs-keyword">if</span> (request.ip === EVIL_IP) {
        response.status(<span class="hljs-number">401</span>).send(<span class="hljs-string">"Not allowed!"</span>);
    } <span class="hljs-keyword">else</span> {
        next();
    }
});

...</code></pre>
<p>这里使用到了 <em>req.ip</em> 以及 <em>res.status()</em> 和 <em>res.send()</em> ，而这些方法全都来自于 Express 的拓展。</p>
<p>理论上来说，我们只需要知道 Express 拓展了 request 和 response 并知道如何使用就行了，至于细节可以不去做了解。</p>
<p>上面的例子，只是 Express 所有拓展中的冰山一角，你可以在<a href="http://expressjs.com/en/api.html" rel="nofollow noreferrer" target="_blank">文档</a>中看到更多的示例。</p>
<h2 id="articleHeader8">视图</h2>
<p>几乎所有的网站内容都是基于 HTML 进行展示的，并且大多时候这些 HTML 内容都是动态生成的。你可能需要为当前登录用户提供特定欢迎页或者需要在页面中动态生成数据表。为了应对动态内容的渲染，社区中出现了大量的 Express 模版引擎，例如：  EJS、Handlebars、Pug。</p>
<p>下面是 EJS 模版引擎使用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var path = require(&quot;path&quot;);
var app = express();

// 告诉 Express 你的视图存在于一个名为 views 的文件夹中
app.set(&quot;views&quot;, path.resolve(__dirname, &quot;views&quot;));

// 告诉 Express 你将使用EJS模板引擎
app.set(&quot;view engine&quot;, &quot;ejs&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 告诉 Express 你的视图存在于一个名为 views 的文件夹中</span>
app.set(<span class="hljs-string">"views"</span>, path.resolve(__dirname, <span class="hljs-string">"views"</span>));

<span class="hljs-comment">// 告诉 Express 你将使用EJS模板引擎</span>
app.set(<span class="hljs-string">"view engine"</span>, <span class="hljs-string">"ejs"</span>);</code></pre>
<p>在代码中，首先我们导入了必要的模块。然后设置了视图文件所在的路径。紧接着，我们将模版引擎设置为 EJS （<a href="https://github.com/tj/ejs" rel="nofollow noreferrer" target="_blank">文档</a>）。当然在使用 EJS  执行，我们还需要通过 <em>npm install ejs --save</em> 命令进行安装。</p>
<p>安装并设置好 EJS 引擎之后，接下里就是如何使用的问题了。</p>
<p>首先，我们在 <em>views</em> 文件夹下面创建一个 <em>index.ejs</em> 文件，并拷贝下面的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>Hello, world!</title>
</head>
<body>
    <%= message %>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">message</span> %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>EJS 实质上是 HTML 的一个超集，所有 HTML 的语法都可以直接使用并且完全兼容。但是 EJS 对语法进行了部分拓展。 例如，你可以通过 <em>&lt;%= message %&gt;</em> 语法将传递过来的参数 <em>message</em> 插入到标签中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get(&quot;/&quot;, function(request, response) {
    response.render(&quot;index&quot;, {
        message: &quot;Hey everyone! This is my webpage.&quot;
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">app.get(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.render(<span class="hljs-string">"index"</span>, {
        <span class="hljs-attr">message</span>: <span class="hljs-string">"Hey everyone! This is my webpage."</span>
    });
});</code></pre>
<p>Express 给 response 对象添加了一个名为 <em>render</em> 的方法。该方法在视图目录下查找第一个参数对应的模版视图文件并将第二个参数传递给该模版文件。</p>
<p>下面是经过引擎渲染动态生成后的 HTML 文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>Hello, world!</title>
</head>
<body>
    Hey everyone! This is my webpage. 
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    Hey everyone! This is my webpage. 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader9">实例：一个留言板的实现</h2>
<p>最后这部分，我们将会使用到前面的技术来构建一个完整的留言板 web 程序。通过这个示例来加深对上面内容的掌握，该应用主要包含两个页面：</p>
<ol>
<li>一个主页：主要用于列出之前所有的留言</li>
<li>一个编辑页面：用于编辑新的留言</li>
</ol>
<h3 id="articleHeader10">准备工作</h3>
<p>首先，我们新建一个文件夹并新建项目，并复制下面内容到新建的 <em>package.json</em> 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;express-guestbook&quot;,
    &quot;private&quot;: true,
    &quot;scripts&quot;: {
        &quot;start&quot;: &quot;node app&quot; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"express-guestbook"</span>,
    <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"scripts"</span>: {
        <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node app"</span> 
    }
}</code></pre>
<p>你可以在文件中添加其他字段信息（例如作者或者版本），但是在本例中这并不是必要信息。接下来，我们安装依赖文件，输入命令：</p>
<blockquote><p>npm install express morgan body-parser ejs --save</p></blockquote>
<p>因为需要实现留言新建动作，所以这里需要使用 <em>body-parser</em> 对 POST 请求进行解析。</p>
<h3 id="articleHeader11">核心代码</h3>
<p>准备工作完成后，接下来就创建 <em>app.js</em> 文件并复制下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var http = require(&quot;http&quot;);
var path = require(&quot;path&quot;);
var express = require(&quot;express&quot;);
var logger = require('morgan');
var bodyParser = require(&quot;body-parser&quot;);

var app = express();

// 设置引擎
app.set(&quot;views&quot;, path.resolve(__dirname, &quot;views&quot;));
app.set(&quot;view engine&quot;, &quot;ejs&quot;);

// 设置留言的全局变量
var entries = [];
app.locals.entries = entries;

// 使用 Morgan 进行日志记录
app.use(logger(&quot;dev&quot;));

// 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里
app.use(bodyParser.urlencoded({ extended: false }));

// 当访问了网站根目录，就渲染主页（位于views/index.ejs）
app.get(&quot;/&quot;, function(request, response) {
    response.render(&quot;index&quot;);
});

// 渲染“新留言”页面（位于views/index.ejs）当get访问这个URL的时候
app.get(&quot;/new-entry&quot;, function(request, response) {
    response.render(&quot;new-entry&quot;);
});

// POST 动作进行留言新建的路由处理
app.post(&quot;/new-entry&quot;, function(request, response) {
    // 如果用户提交的表单没有标题或者内容，则返回一个 400 的错误
    if (!request.body.title || !request.body.body) {
        response.status(400).send(&quot;Entries must have a title and a body.&quot;);
        return;
    }
    
    // 添加新留言到 entries 中
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    // 重定向到主页来查看你的新条目
    response.redirect(&quot;/&quot;);
});

// 渲染404页面，因为你请求了未知资源
app.use(function(request, response) {
    response.status(404).render(&quot;404&quot;);
});

// 在3000端口启动服务器
http.createServer(app).listen(3000, function() {
    console.log(&quot;Guestbook app started on port 3000.&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'morgan'</span>);
<span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">"body-parser"</span>);

<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 设置引擎</span>
app.set(<span class="hljs-string">"views"</span>, path.resolve(__dirname, <span class="hljs-string">"views"</span>));
app.set(<span class="hljs-string">"view engine"</span>, <span class="hljs-string">"ejs"</span>);

<span class="hljs-comment">// 设置留言的全局变量</span>
<span class="hljs-keyword">var</span> entries = [];
app.locals.entries = entries;

<span class="hljs-comment">// 使用 Morgan 进行日志记录</span>
app.use(logger(<span class="hljs-string">"dev"</span>));

<span class="hljs-comment">// 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里</span>
app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span> }));

<span class="hljs-comment">// 当访问了网站根目录，就渲染主页（位于views/index.ejs）</span>
app.get(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.render(<span class="hljs-string">"index"</span>);
});

<span class="hljs-comment">// 渲染“新留言”页面（位于views/index.ejs）当get访问这个URL的时候</span>
app.get(<span class="hljs-string">"/new-entry"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.render(<span class="hljs-string">"new-entry"</span>);
});

<span class="hljs-comment">// POST 动作进行留言新建的路由处理</span>
app.post(<span class="hljs-string">"/new-entry"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-comment">// 如果用户提交的表单没有标题或者内容，则返回一个 400 的错误</span>
    <span class="hljs-keyword">if</span> (!request.body.title || !request.body.body) {
        response.status(<span class="hljs-number">400</span>).send(<span class="hljs-string">"Entries must have a title and a body."</span>);
        <span class="hljs-keyword">return</span>;
    }
    
    <span class="hljs-comment">// 添加新留言到 entries 中</span>
    entries.push({
        <span class="hljs-attr">title</span>: request.body.title,
        <span class="hljs-attr">content</span>: request.body.body,
        <span class="hljs-attr">published</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    });
    <span class="hljs-comment">// 重定向到主页来查看你的新条目</span>
    response.redirect(<span class="hljs-string">"/"</span>);
});

<span class="hljs-comment">// 渲染404页面，因为你请求了未知资源</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    response.status(<span class="hljs-number">404</span>).render(<span class="hljs-string">"404"</span>);
});

<span class="hljs-comment">// 在3000端口启动服务器</span>
http.createServer(app).listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Guestbook app started on port 3000."</span>);
});</code></pre>
<h3 id="articleHeader12">新建视图</h3>
<p>最后我们需要将页面的视图文件补全，新建 <em>views</em> 文件夹，然后复制下面内容到新建 <em>header.ejs</em> 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<title>Express Guestbook</title>
<link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css&quot;>
</head>
<body class=&quot;container&quot;>
    <h1>
        Express Guestbook
        <a href=&quot;/new-entry&quot; class=&quot;btn btn-primary pull-right&quot;>
            Write in the guestbook
        </a>
    </h1>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Express Guestbook<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
        Express Guestbook
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/new-entry"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary pull-right"</span>&gt;</span>
            Write in the guestbook
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    </code></pre>
<p>这里使用了 Twitter 的 Bootstrap 框架，当然你也可以进行任意替换。最重要的一点是，该文件会做为所有页面的通用头部。</p>
<p>接下来，在相同目录下新建 <em>footer.ejs</em> 作为通用的 footer：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>通用部分完成后，接下来就是 <em>index</em>、<em>new-entry</em>、<em>404</em> 页面文件了。复制下面代码到文件 <em>views/index.ejs</em> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% include header %>
<% if (entries.length) { %>
    <% entries.forEach(function(entry) { %>
        <div class=&quot;panel panel-default&quot;>
            <div class=&quot;panel-heading&quot;>
                <div class=&quot;text-muted pull-right&quot;>
                    <%= entry.published %>
                </div>
                <%= entry.title %>
             </div>
             <div class=&quot;panel-body&quot;>
                <%= entry.body %>
             </div>
         </div>
     <% }) %>
<% } else { %>
    No entries! <a href=&quot;/new-entry&quot;>Add one!</a>
<% } %>
<% include footer %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">header</span> %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">entries.length</span>) { %&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">entries.forEach</span>(<span class="hljs-attr">function</span>(<span class="hljs-attr">entry</span>) { %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel panel-default"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-heading"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-muted pull-right"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">entry.published</span> %&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">entry.title</span> %&gt;</span>
             <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-body"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">entry.body</span> %&gt;</span>
             <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">%</span> }) %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } <span class="hljs-attr">else</span> { %&gt;</span>
    No entries! <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/new-entry"</span>&gt;</span>Add one!<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">footer</span> %&gt;</span></code></pre>
<p>同时将下面的代码复制到 <em>views/new-entry.ejs</em> 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% include header %>
<h2>Write a new entry</h2>
<form method=&quot;post&quot; role=&quot;form&quot;>
    <div class=&quot;form-group&quot;>
        <label for=&quot;title&quot;>Title</label>
        <input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;title&quot; name=&quot;title&quot; placeholder=&quot;Entry title&quot; required>
    </div>
    <div class=&quot;form-group&quot;>
        <label for=&quot;content&quot;>Entry text</label>
        <textarea class=&quot;form-control&quot; id=&quot;body&quot; name=&quot;body&quot; placeholder=&quot;Love Express! It's a great tool for building websites.&quot; rows=&quot;3&quot; required></textarea>
    </div>
    <div class=&quot;form-group&quot;>
        <input type=&quot;submit&quot; value=&quot;Post entry&quot; class=&quot;btn btn-primary&quot;>
    </div>
</form>
<% include footer %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">header</span> %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Write a new entry<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"form"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"title"</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Entry title"</span> <span class="hljs-attr">required</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"content"</span>&gt;</span>Entry text<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"body"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"body"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Love Express! It's a great tool for building websites."</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">required</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Post entry"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">footer</span> %&gt;</span></code></pre>
<p>最后就是 <em>views/404.ejs</em> 文件了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% include header %>
<h2>404! Page not found.</h2>
<% include footer %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">header</span> %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>404! Page not found.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">include</span> <span class="hljs-attr">footer</span> %&gt;</span></code></pre>
<p>所有的视图文件都创建完成了，接下来就是运行服务了。</p>
<h3 id="articleHeader13">运行服务</h3>
<p>如果你现在就使用 <em>npm start</em> 拉起服务，然后访问对应的 URL ，你就能见到下图所示的场景了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819809" src="https://static.alili.tech/img/remote/1460000010819809" alt="03_04" title="03_04" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819810" src="https://static.alili.tech/img/remote/1460000010819810" alt="03_05" title="03_05" style="cursor: pointer;"></span></p>
<p>最后，我们回顾一下这个小项目的几个关键点：</p>
<ul>
<li>使用了一个中间件来记录所有的请求，并且对不匹配的 URL 链接进行了 404 页面响应。</li>
<li>在新建留言后，我们将页面重定向到了主页。</li>
<li>在该工程里使用了 EJS 作为 Express 的模版引擎。并使用它实现了 HTML 文件的动态渲染。</li>
</ul>
<h2 id="articleHeader14">总结</h2>
<ul>
<li>Express 基于 Node 进行了工程拓展，使得开发过程更为流畅高效。</li>
<li>Express 主要有四个部分构成。</li>
<li>Express 的请求处理流程可以由多个中间件进行构建。</li>
<li>Express 中流行的模版引擎为 EJS ，它能实现对 HTML 的动态渲染并且语法也更为友好。</li>
</ul>
<blockquote><p>原文<a href="https://bignerdcoding.com/archives/43.html" rel="nofollow noreferrer" target="_blank">地址</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 实战（三）：Express 基础

## 原文链接
[https://segmentfault.com/a/1190000010819801](https://segmentfault.com/a/1190000010819801)


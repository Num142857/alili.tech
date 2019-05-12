---
title: 'Express 实战（六）：构建 API 接口' 
date: 2019-01-03 2:30:11
hidden: true
slug: bv67m1nmtoq
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820713" src="https://static.alili.tech/img/remote/1460000010820713" alt="Cover" title="Cover" style="cursor: pointer; display: inline;"></span></p>
<p>在介绍了那么多 Express 核心概念之后，接下来的文章将会把注意力放在如何构建一个真实的应用上。这里我们先从构建应用 API 接口开始。从某种程度上来说几乎所有的软件应用其背后都是由一组强大的 API 驱动。</p>
<p>其实 API 就是一种代码之间交互的一种方式，它既可以是在程序内部也可以是通过网络的跨机器进行。例如，Express 中的 <em>app.use</em> 和 <em>app.get</em> 就属于在内部使用 API 。而通过 HTTP 或者 FTP 等协议发送 JSON、XML 数据的方式则属于后者。对于后一种方式需要注意的是，API 的提供者和使用者必须对数据格式做出约定。在本文示例中，我们将会讨论如何使用 Express 构建后一类型的 API 接口，同时所有 HTTP 接口返回的数据格式都将使用 JSON。</p>
<p>&lt;!--more--&gt;</p>
<p>另外，本章还会讨论如何设计一个优雅的 API   用于提升使用者的体验和效率，让 API 的含义一目了然而不用去阅读又臭又长的说明文档。就像“好代码”与“坏代码”一样，API 是否优雅其实更多的取决于实际情形。盲目遵循 API 设计的最佳实践有时会显得很迂腐，因为它有可能与使用者的期望不一致。</p>
<p>接下来的内容包括：</p>
<ul>
<li>什么是 API 。</li>
<li>Express 中构建 API 的基础内容。</li>
<li>HTTP 方法与应用逻辑的关联。</li>
<li>多版本 API 的实现和管理。</li>
<li>HTTP 状态码的正确使用。</li>
</ul>
<h2 id="articleHeader0">简单的 JSON 格式 API 示例</h2>
<p>首先，我们需要明确该示例的功能以及 API 的使用方式，后面再写代码。</p>
<p>假设，现在程序需要在接受到 <em>America/Los_Angeles</em> 或 <em>Europe/London</em> 等代表时区的字符串后，返回该时区的当前时间信息（例如：<em>2015-04-07T20:09:58-07:00</em> ）。该返回信息与现实中易懂的时间格式是不一样的，因为它是为计算机设计的。</p>
<p>通过类似下面格式的 URL 的 HTTP 请求来调用应用 API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/timezone?tz=America+Los_Angeles" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fix"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">/timezone?tz</span>=<span class="hljs-string">America+Los_Angeles</span></code></pre>
<p>而服务端 API 返回的 JSON 的数据格式，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;time&quot;: &quot;2015-06-09T16:20:00+01:00&quot;,
    &quot;zone&quot;: &quot;America/Los_Angeles&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
    <span class="hljs-attr">"time"</span>: <span class="hljs-string">"2015-06-09T16:20:00+01:00"</span>,
    <span class="hljs-attr">"zone"</span>: <span class="hljs-string">"America/Los_Angeles"</span>
}</code></pre>
<p>只要能调用 API 并对 JSON 数据进行解析，你就可以在任意平台构建任意应用程序。如下图，你可以通过 AJAX  请求该 API  实现一个展示时区信息的单页应用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820714" src="https://static.alili.tech/img/remote/1460000010820714" alt="06_01" title="06_01" style="cursor: pointer;"></span></p>
<p>你也可以利用该接口实现下图所示的移动应用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820715" src="https://static.alili.tech/img/remote/1460000010820715" alt="06_02" title="06_02" style="cursor: pointer;"></span></p>
<p>你甚至可以利用该 API 实现下图一样的终端命令行工具：在终端中打印服务端 API 接口返回的数据。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820716" src="https://static.alili.tech/img/remote/1460000010820716" alt="06_03" title="06_03" style="cursor: pointer;"></span></p>
<p>像前一章的天气应用一样，我们可以利用这些 API 返回的冰冷数据构建更具表达力的 UI 。</p>
<h2 id="articleHeader1">Express 驱动的 JSON API 服务</h2>
<p>了解 API 概念之后，下面我们就动手实现一个 Express 驱动的 API 服务。实现的原理非常简单：通过中间件和内置函数解析网络请求并将 JSON 数据和 HTTP 状态码封装到响应对象并返回给客户端。</p>
<blockquote><p>从技术角度上说，API 服务除了使用 JSON 格式外，你还可以是使用 XML 或者纯文本。但是 Express 和 JavaScript 对 JSON 的支持是最好的，同时它也是当前最流行的格式，所以后面会一直使用 JSON 作为默认数据格式。</p></blockquote>
<p>下面我们编写一个为多平台提供随机数生成的服务，该 API 将拥有如下特性：</p>
<ul>
<li>在请求 API 时必须附带随机数最小值和最大值。</li>
<li>解析请求获取随机数范围并将生产的结果以 JSON 格式返回。</li>
</ul>
<p>你可能认为这里完全可以使用纯文本来替换 JSON 格式。但是发送 JSON 数据是开发者的必备技能，而且 JSON 格式极易拓展。</p>
<p>该工程的构建步骤如下：</p>
<ol>
<li>新建 <em>package.json</em> 。</li>
<li>创建工程主入口文件 <em>app.js</em> 。</li>
<li>在 <em>app.js</em> 中创建应用和路由中间件。</li>
</ol>
<p>首先，在新建的 <em>package.json</em> 中，复制下面的内容并按照依赖项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;random-number-api&quot;,
    &quot;private&quot;: true,
    &quot;scripts&quot;: {
        &quot;start&quot;: &quot;node app&quot;
    },
    &quot;dependencies&quot;: {
        &quot;express&quot;: &quot;^5.0.0&quot; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"random-number-api"</span>,
    <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"scripts"</span>: {
        <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node app"</span>
    },
    <span class="hljs-attr">"dependencies"</span>: {
        <span class="hljs-attr">"express"</span>: <span class="hljs-string">"^5.0.0"</span> 
    }
}</code></pre>
<p>接下来，将下面的代码复制到入口文件 <em>app.js</em> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var app = express();

app.get(&quot;/random/:min/:max&quot;, function(req, res) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({ error: &quot;Bad request.&quot; });
        return;
    }
   
    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({ result: result });
});

app.listen(3000, function() {
    console.log(&quot;App started on port 3000&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> app = express();

app.get(<span class="hljs-string">"/random/:min/:max"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> min = <span class="hljs-built_in">parseInt</span>(req.params.min);
    <span class="hljs-keyword">var</span> max = <span class="hljs-built_in">parseInt</span>(req.params.max);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(min) || <span class="hljs-built_in">isNaN</span>(max)) {
        res.status(<span class="hljs-number">400</span>);
        res.json({ <span class="hljs-attr">error</span>: <span class="hljs-string">"Bad request."</span> });
        <span class="hljs-keyword">return</span>;
    }
   
    <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">Math</span>.round((<span class="hljs-built_in">Math</span>.random() * (max - min)) + min);
    res.json({ <span class="hljs-attr">result</span>: result });
});

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"App started on port 3000"</span>);
});</code></pre>
<p>现在启动应用并访问 <em><a href="http://localhost:3000/random/10/100/em" rel="nofollow noreferrer" target="_blank">http://localhost:3000/random/...</a> 的话，你将看到一个附带 10 ～ 100 范围内随机数的 JSON 数据。</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820717" src="https://static.alili.tech/img/remote/1460000010820717" alt="06_04" title="06_04" style="cursor: pointer;"></span></p>
<p>接下来，我们来分析上面的代码。</p>
<p>与之前一样，前两行代码引入了 Express 并创建了一个 Express 应用实例。</p>
<p>然后，我们创建了一个路由中间件用于处理类似 <em>/random/10/100</em> 这样的 API 请求。当然，这里还存在一些 bug ，例如，没有过滤掉 <em>/random/foo/bar</em> 请求。所以，在调用 API 的时候请确保使用的参数是整型变量。</p>
<p>在然后，我们使用内置的 <em>parseInt</em> 解析范围参数，而该函数的返回值只可能是整形数字或者 NaN。如果传入的参数有一个为 NaN 的话就会给客户端返回一个错误信息。下面这部分代码对于整个程序来说是非常重要的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isNaN(min) || isNaN(max)) {
  res.status(400);
  res.json({ error: &quot;Bad request.&quot; });
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(min) || <span class="hljs-built_in">isNaN</span>(max)) {
  res.status(<span class="hljs-number">400</span>);
  res.json({ <span class="hljs-attr">error</span>: <span class="hljs-string">"Bad request."</span> });
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p>如果上面的参数检查的结果是最少有一个为 NaN ，程序就会进行如下处理：</p>
<ol>
<li>设置 HTTP 状态码为 400。常见的 404 错误就是它的一个具体变种，表示的含义是：用户请求的出现了问题。</li>
<li>发送包含错误信息的 JSON 数据。</li>
<li>结束请求处理并跳出中间件执行。</li>
</ol>
<p>在代码的最后，我们会在合法的参数返回内生成随机数并将结果返回给客户端。</p>
<p>虽然示例很简单，但是它已经包含了使用 Express 构建 API 的基本流程：解析请求，设置 HTTP 状态码，返回响应数据。你可以在这个基础之上构建更为复杂优雅的 API 。</p>
<h2 id="articleHeader2">CURD  操作 API</h2>
<p>CURD 是对程序中 Create、Read、Update、Delete 四种业务动作的一个简称。</p>
<p>大多数的应用都会涉及到 CURD 操作。例如，对于一个图片分享应用来说，其中涉及图片的所有操作就是典型的 CRUD：</p>
<ul>
<li>用户上传照片的行为对应就是 <em>create</em> 操作。</li>
<li>用户浏览照片的行为就是 <em>read</em> 操作。</li>
<li>用户更新照片的行为就是 <em>update</em> 操作。</li>
<li>用户删除照片的行为就是 <em>delete</em> 操作。</li>
</ul>
<p>无论是分享照片的社交应用还是文件存储服务，你生活中的使用的很多服务中都使用了这种模式。不过在开始讨论构建 CRUD 功能的 API 之前，我们先来看看被称为 HTTP 方法的内容。</p>
<h3 id="articleHeader3">HTTP 方法</h3>
<p>HTTP 的规范中是这样定义其方法的：</p>
<blockquote><p>HTTP 方法明确了对请求 URI 所标识资源进行的操作，而且方法是区分大小写的。</p></blockquote>
<p>一个更易理解的解释是：客户端在发送 HTTP 请求时需要指定一个 HTTP 方法，然后服务端回依据不同的 HTTP 方法做出不同的响应。虽然，可用的 HTTP 方法有很多，但是常用的其实并不多。其中在 Web 应用中常用是下面 4 个：</p>
<ol>
<li>GET 是最常用的一个 HTTP 方法，它表示请求服务端资源。例如，加载网站首页、请求图片资源都使用的是 GET。虽然服务端的响应可能不同，但是GET 请求并不会改变服务器的资源。例如，对某图片资源的一次或者多次请求并不会导致图片本身出现任何差别。</li>
<li>POST 是另一个常用的 HTTP 方法。例如，创建新博客、上传照片、注册用户、清空购物车等业务都是使用 POST 。与 GET 不同的是：每次 POST 请求都会导致服务端发生修改。</li>
<li>PUT 方法用于对已有记录的修改，所有我觉得它应该被称为 "UPDATE" 更为合适。例如，修改博客标题、修改用户昵称等操作都是 PUT 操作。另外，PUT 还具备 POST 的功能：就是当要修改的记录不存在时可以进行新建操作（非必需）。其次 PUT 还具有 GET 方法的特点：对同一 URL 的一次或多次 PUT 请求后的结果是一致的。</li>
<li>DELETE 方法用于记录删除。例如，删除用户文章、删除网络照片。另外，与 PUT 一样同一删除请求无论是执行一次还是多次最终结果是一致的。</li>
</ol>
<p>虽然 HTTP 还有很多其他的方法，但是它们在现实开发过程中并不常见。理论上你甚至可以只使用 GET 和 POST 请求完成所有业务，但是这是错误实践毕竟它违反了 HTTP 规范也会给开发者造成困惑。另外，很多浏览器也是根据 HTTP 方法来明确所执行的操作类型。所以，即使并没有强制你也应该参照该规范来约束自己的行为。</p>
<p>前面你已经见过 Express 中对部分方法的处理，不过下面的代码将一次涵盖上面所有的四个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = express(&quot;express&quot;);
var app = express();

app.get(&quot;/&quot;, function(req, res) {
  res.send(&quot;you just sent a GET request, friend&quot;);
});

app.post(&quot;/&quot;, function(req, res) {
  res.send(&quot;a POST request? nice&quot;);
});

app.put(&quot;/&quot;, function(req, res) {
  res.send(&quot;i don't see a lot of PUT requests anymore&quot;);
});

app.delete(&quot;/&quot;, function(req, res) {
  res.send(&quot;oh my, a DELETE??&quot;);
});

app.listen(3000, function() {
  console.log(&quot;App is listening on port 3000&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = express(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> app = express();

app.get(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">"you just sent a GET request, friend"</span>);
});

app.post(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">"a POST request? nice"</span>);
});

app.put(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">"i don't see a lot of PUT requests anymore"</span>);
});

app.delete(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">"oh my, a DELETE??"</span>);
});

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"App is listening on port 3000"</span>);
});</code></pre>
<p>将代码复制到入口文件 <em>app.js</em> 中并启动服务，然后你就可以使用 cURL 命令测试不同的 HTTP 方法了。默认情况下 cURL 使用 GET 发送请求，但是你可以使用 -X 选项来指定其他的方法。例如，<em>curl -X PUT <a href="http://localhost:3000/em" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a></em> 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820718" src="https://static.alili.tech/img/remote/1460000010820718" alt="06_05" title="06_05" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">通过 HTTP 方法构建 CRUD 接口</h3>
<p>回想以下之前的照片分享应用，下面是其中可能的 CRUD  操作：</p>
<ol>
<li>用户上传图片，此为 <em>Create</em>。</li>
<li>用户浏览图片，此为 <em>Read</em>。</li>
<li>用户更新图片备注等信息，此为 <em>Update</em>。</li>
<li>用户从站点删除图片，此为 <em>Delete</em>。</li>
</ol>
<p>不难看出 CRUD 操作与之前四种 HTTP 方法存在对应关系：</p>
<ul>
<li>Create = POST</li>
<li>Read = GET</li>
<li>Update = PUT</li>
<li>Delete = DELETE</li>
</ul>
<p>因此通过这四个 HTTP 方法我们可以很好的实现最常见 CRUD 风格的 web 应用程序。</p>
<blockquote><p>实际上对于更新和创建动作与 HTTP 方法的对应关系，一些人有着自己的看法。它们认为 PUT 更应该对应创建动作而非 POST。另外，新的 PATCH 方法则对应更新操作。虽然本文将会使用上面那种更规范的对应关系，但是你完全可以按照自己的意愿选择。</p></blockquote>
<h2 id="articleHeader5">API 版本控制</h2>
<p>为了应对未来可能的 API 更新，对 API 进行版本控制是一件非常高效的方法。例如，前面获取指定时区当前时间的 API 在推出后就被很多的厂商和开发者使用。但是，几年几后由于某些原因必须对该 API 进行更新而与此同时你又不能影响之前的使用者。此时，我们就可以通过添加新版本来解决这个问题。其中原有的 API 请求可以通过：</p>
<blockquote><p>/v1/timezone</p></blockquote>
<p>而新版本 API 请求则可以使用：</p>
<blockquote><p>/v2/timezone</p></blockquote>
<p>这样不仅在进行 API 更新时防止了代码的破坏性更改。而且接口使用者也有了更灵活的选择，他们可以在必要的时候进行 API 切换。</p>
<p>在 Express 中可以使用 Router 中间件来实现 API 版本管理。拷贝下面代码到文件 <em>app1.js</em> 中，并讲其作为第一个版本 API 的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var api = express.Router();

api.get(&quot;/timezone&quot;, function(req, res) {
    res.send(&quot;Sample response for /timezone&quot;);
});
api.get(&quot;/all_timezones&quot;, function(req, res) {
    res.send(&quot;Sample response for /all_timezones&quot;);
});

module.exports = api;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> api = express.Router();

api.get(<span class="hljs-string">"/timezone"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">"Sample response for /timezone"</span>);
});
api.get(<span class="hljs-string">"/all_timezones"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">"Sample response for /all_timezones"</span>);
});

<span class="hljs-built_in">module</span>.exports = api;</code></pre>
<p>请注意，上面的中间件代码在处理的 URL 并没有包含 <em>/v1</em> 。下面在入口文件中引入这个 Router 中间件并进行路由映射。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var apiVersion1 = require(&quot;./api1.js&quot;);
var app = express();
app.use(&quot;/v1&quot;, apiVersion1);
app.listen(3000, function() {
    console.log(&quot;App started on port 3000&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> apiVersion1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./api1.js"</span>);
<span class="hljs-keyword">var</span> app = express();
app.use(<span class="hljs-string">"/v1"</span>, apiVersion1);
app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"App started on port 3000"</span>);
});</code></pre>
<p>然后，你将最新版本的 API  实现放在 <em>api2.js</em> 文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var api = express.Router();

api.get(&quot;/timezone&quot;, function(req, res) {
    res.send(&quot;API 2: super cool new response for /timezone&quot;);
});
module.exports = api;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="JavaScirpt"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> api = express.Router();

api.get(<span class="hljs-string">"/timezone"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">"API 2: super cool new response for /timezone"</span>);
});
<span class="hljs-built_in">module</span>.exports = api;</code></pre>
<p>最后，通过 Router 将这两个版本的 API 同时添加到主入口中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);

var apiVersion1 = require(&quot;./api1.js&quot;);
var apiVersion2 = require(&quot;./api2.js&quot;);
var app = express();

app.use(&quot;/v1&quot;, apiVersion1);
app.use(&quot;/v2&quot;, apiVersion2);
app.listen(3000, function() {
    console.log(&quot;App started on port 3000&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);

<span class="hljs-keyword">var</span> apiVersion1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./api1.js"</span>);
<span class="hljs-keyword">var</span> apiVersion2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./api2.js"</span>);
<span class="hljs-keyword">var</span> app = express();

app.use(<span class="hljs-string">"/v1"</span>, apiVersion1);
app.use(<span class="hljs-string">"/v2"</span>, apiVersion2);
app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"App started on port 3000"</span>);
});</code></pre>
<p>你可以通过浏览器验证这些版本化后的 API 是否正确工作，另外你也可以使用 cURL 命令进行测试。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010820719" src="https://static.alili.tech/img/remote/1460000010820719" alt="06_07" title="06_07" style="cursor: pointer; display: inline;"></span></p>
<p>就像前面章节介绍的那样，Router 可以让你将不同的路由存放在不同文件中进行管理。而版本化 API 就是最典型的应用实例。</p>
<h2 id="articleHeader6">设置 HTTP 状态码</h2>
<p>每一个 HTTP 响应都应该附带一个 HTTP 状态码，其中最有名的就是 <em>404 Not Found</em> 。</p>
<p>虽然 404 是最出名的，但是 200 状态码确是最常见的。与 404 不同的是，虽然当网页成功加载或 JSON 数据成功返回后都会包含状态码 200，但它并不会被展示出来。</p>
<p>当然，除了 404 和 200 之外，HTTP 中还定义了很多其他的状态码，包括 100、200、300、400 以及 500 系列。需要注意的是并不是每个系列中所有 100 个数字都有明确定义，例如，100 系列只有 100，101，102 三个有效码，紧跟其后就是 200 。</p>
<p>每个状态码系列其实都有特定的含义和主题，总结就是：</p>
<p>1xx: 成功接收到请求。<br>2xx: 成功<br>3xx: 重定向 <br>4xx: 客户端错误  <br>5xx: 服务端错误</p>
<p>规范中只定义的大约 60 个<a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" rel="nofollow noreferrer" target="_blank">状态码</a>。你可以在此基础上拓展自己的状态码，但是通常并不会这么做。因为优秀的 API 的首要设计原则就是确保不会对使用者造成任何歧义，所以应该最大程度遵循官方规范的指导。后面我们会对上面的每个区间的状态码进行讲解，但是在此之前先来看看如何在 Express 中设置状态码。</p>
<blockquote><p>少部分应用还在使用 HTTP 1.0 版本的协议，而大部分以及切换到了 1.1 版本。作为下一个版本的 HTTP 2.0 标准现在也逐渐在推广过程中。幸运的是，2.0 版本的协议大部分更新都在底层所以切换时并不会涉及太大的工作量。另外，2.0 版本还新增了一个 421 的状态码。</p></blockquote>
<h3 id="articleHeader7">设置 HTTP 状态码</h3>
<p>默认情况下，HTTP 状态码是 200。如果用户访问的 URL 对应资源不存在的话，Express 会发送 404 错误。如果访问的服务器出现问题的话，Express 就会发送 500 错误。</p>
<p>但是这些都是 Express 的默认行为，某些情形下可能会需要自行设置状态码。为此，Express 的 <em>response</em> 对象提供了一个 <em>status</em> 方法，你需要在调用是传入对应状态码就能完成设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
res.status(404);
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// ...</span>
res.status(<span class="hljs-number">404</span>);
<span class="hljs-comment">// ...</span></code></pre>
<p>该方法可以进行链式调用，所以你可以紧跟其后使用 <em>json</em> 设置返回的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.status(404).json({ error: &quot;Resource not found!&quot; });
// 它等价于：
res.status(404);
res.json({ error: &quot;Resource not found!&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">res.status(<span class="hljs-number">404</span>).json({ <span class="hljs-attr">error</span>: <span class="hljs-string">"Resource not found!"</span> });
<span class="hljs-comment">// 它等价于：</span>
res.status(<span class="hljs-number">404</span>);
res.json({ <span class="hljs-attr">error</span>: <span class="hljs-string">"Resource not found!"</span> });</code></pre>
<p>虽然 Express 对原生 Node 的 <em>response</em> 对象进行了拓展，并且在使用 Express 时也应遵循 Express 风格，但是你依旧可以使用原生方法来完成设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.statusCode = 404;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">res.statusCode = <span class="hljs-number">404</span>;</code></pre>
<h3 id="articleHeader8">100 区间</h3>
<p>100 区间的官方状态码只有两个：100（继续） 和 101 （切换协议），而且它们很少会被用到。如果你必须处理的话，可以去官网或者维基上查看。</p>
<h3 id="articleHeader9">200 区间</h3>
<p>200 区间状态码表示请求成功。虽然该区间状态码不少，但是常用的也就下面 4 个：</p>
<ul>
<li>200：作为最常见的状态码，它也被称为 "OK"。这意味着请求和响应都正确执行期间并没有出现任何错误或者重定向操作。</li>
<li>201：与 200 十分类似，但是使用情形略有不同。它通常用于 POST 或者 PUT 请求成功创建记录后。例如，创建博文、上传图片等操作成功后就会发送 201。</li>
<li>202：202 是 201 的一个变种。因为，资源的创建大多是异步进行的，而这些操作也是费时的。所以，你可以在此时给客户端响应 202 。它表示已经成功接收数据正在等待创建。</li>
<li>204：它表示用户删除请求所对应的资源并不存在已经被删除过了。</li>
</ul>
<h3 id="articleHeader10">300区间</h3>
<p>同样，在 300 区间，我们只介绍其中常用的三个，并且它们全都涉及重定向。</p>
<ul>
<li>301：它表示所访问资源位置已经发生修改，请访问最新的 URL 。通常它还会附带一个 Location 的头部信息指明重定向的位置。</li>
<li>303：它表示请求的资源已经创建完成，现在你就会被重定位到一个新页面。</li>
<li>307：与 301 类似都是提示当前 URL 不存在。不过区别是，301 的重定向是永久的而 307 可能重定向的只是一个临时性 URL 。</li>
</ul>
<h3 id="articleHeader11">400 区间</h3>
<p>400 区间的状态码是最多的，而它通常都是表示由于客户端的错误导致请求失败。</p>
<ul>
<li>401 和 403：这两个状态码分别表示“未授权”和“禁止”。字面上看两者很类似，但是前者可能表示用户未登录而后者则可能是用户登录了但是权限不够。</li>
<li>404：它表示用户 URL 请求的资源并不存在。</li>
</ul>
<p>至于该区间其他状态码，读者可以去<a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" rel="nofollow noreferrer" target="_blank">维基</a>上自行查看，这里就不一一介绍了。另外，当你不确定应该使用哪种客户端错误状态码时，你可以直接使用 400 。</p>
<h3 id="articleHeader12">500 区间</h3>
<p>作为 HTTP 规范里的最后一个区间，500 区间状态码表示的是服务内部出现错误。例如，请求过载或者数据库连接中断。另外，理论上该区间的错误只能有服务内部自己触发。最后，为了防止黑客窥探太多内部信息，你可以对所有的内部错误仅仅返回一个抽象的“内部服务器错误”这样的信息。</p>
<h2 id="articleHeader13">总结</h2>
<p>本章包含的内容有：</p>
<ul>
<li>使用 Express 构建 API 服务。</li>
<li>HTTP 方法以及与 CRUD 操作之间的关系。</li>
<li>如果对 API 进行版本控制，提示服务的兼容性和稳定性。</li>
<li>HTTP 状态码的使用和其意义。</li>
</ul>
<blockquote><p>原文<a href="https://bignerdcoding.com/archives/47.html" rel="nofollow noreferrer" target="_blank">地址</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 实战（六）：构建 API 接口

## 原文链接
[https://segmentfault.com/a/1190000010820708](https://segmentfault.com/a/1190000010820708)


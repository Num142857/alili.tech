---
title: '编写 Node.js Rest API 的 10 个最佳实践' 
date: 2019-01-25 2:30:23
hidden: true
slug: pxekxeyhxw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文首发于之乎专栏<a href="https://zhuanlan.zhihu.com/p/25506654" rel="nofollow noreferrer" target="_blank">前端周刊</a>，全文共 6953 字，读完需 8 分钟，速度需 2 分钟。翻译自：<code>RingStack</code> 的文章 <a href="https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/" rel="nofollow noreferrer" target="_blank">https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/</a>，英文好的同学可以直接阅读原文，译文较原文有删节。</p></blockquote>
<p><code>Node.js</code> 除了用来编写 <code>WEB</code> 应用之外，还可以用来编写 <code>API</code> 服务，我们在本文中会介绍编写 <code>Node.js Rest API</code> 的最佳实践，包括如何命名路由、进行认证和测试等话题，内容摘要如下：</p>
<blockquote><ol>
<li><p>正确使用 <code>HTTP Method</code> 和路由</p></li>
<li><p>正确的使用 <code>HTTP</code> 状态码</p></li>
<li><p>使用 <code>HTTP Header</code> 来发送元数据</p></li>
<li><p>为 <code>REST API</code> 挑选合适的框架</p></li>
<li><p>要对 <code>API</code> 进行黑盒测试</p></li>
<li><p>使用基于 <code>JWT</code> 的无状态的认证机制</p></li>
<li><p>学会使用条件请求机制</p></li>
<li><p>拥抱接口调用频率限制（Rate-Limiting）</p></li>
<li><p>编写良好的 <code>API</code> 文档</p></li>
<li><p>对 <code>API</code> 技术演化保持关注</p></li>
</ol></blockquote>
<h2 id="articleHeader0">1. 正确使用 HTTP Method 和路由</h2>
<p>试想你正要构建一个 <code>API</code> 用来创建、更新、获取、删除用户，对于这些操作，<code>HTTP</code> 规范里面已经有了现成的操作：<code>POST</code>、<code>PUT</code>、<code>GET</code>、<code>DELETE</code>，建议直接使用他们来描述接口的行为。</p>
<p>至于路由的命名，应该使用名词或名词性短语来作为资源标识符，比如上文提到的用户管理的例子，路由就应该长这样：</p>
<ul>
<li><p><code>POST /users</code> 或者 <code>PUT /users/:id</code> 用来创建新用户；</p></li>
<li><p><code>GET /users</code> 用来获取用户列表；</p></li>
<li><p><code>GET /users/:id</code> 用来获取单个用户；</p></li>
<li><p><code>PATCH /users/:id</code> 用来更新用户信息；</p></li>
<li><p><code>DELETE /users/:id</code> 用来删除用户；</p></li>
</ul>
<h2 id="articleHeader1">2. 正确的使用 <code>HTTP</code> 状态码</h2>
<p>如果服务器端在请求处理的过程中出错了，你必须设置正确的响应状态码，具体如下：</p>
<ul>
<li><p><code>2xx</code>，表示一切正常；</p></li>
<li><p><code>3xx</code>，表示资源位置已经更改；</p></li>
<li><p><code>4xx</code>，表示因为客户端错误而导致请求无法被处理，比如参数校验没通过；</p></li>
<li><p><code>5xx</code>，表示因为服务器错误导致请求无法被处理，比如服务端抛了异常；</p></li>
</ul>
<p>如果你使用 <code>express</code>，设置状态码非常简单：<code>res.status(500).send({ error: 'Internal server error happend' })</code>，如果使用了 <code>restify</code>，也是类似的：<code>res.status(201)</code>。</p>
<p>如果想看完整的 <code>HTTP</code> 状态码，<a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" rel="nofollow noreferrer" target="_blank">点击这里</a>。</p>
<h2 id="articleHeader2">3. 使用 <code>HTTP Header</code> 来发送元数据</h2>
<p>如果想要发送关于响应体数据的元数据，可以使用 <code>Header</code> ，<code>Header</code> 可以包含的常见元数据包括如下几类：</p>
<ul>
<li><p>分页信息；</p></li>
<li><p>频率限制信息；</p></li>
<li><p>认证信息；</p></li>
</ul>
<p>如果你需要在 <code>Header</code> 中发送自定义的元数据，最好的做法是在 <code>Header</code> 名称前面加 <code>X</code>，例如，需要发送 <code>CSRF Token</code> 的时候，实际的 <code>Header</code> 应该命名为：<code>X-CSRF-Token</code>，然而，这种 <code>Header</code> 在 <a href="https://tools.ietf.org/html/rfc6648" rel="nofollow noreferrer" target="_blank">RFC 6648</a> 中已经被废弃了。API 在设置自定义 <code>Header</code> 的时候还要尽可能避免命名冲突，比如为了达到这个目的<code>OpenStack</code> 为所有 API  的自定义 <code>Header</code> 都加上了 <code>OpenStack</code> 的前缀：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OpenStack-Identity-Account-ID  
OpenStack-Networking-Host-Name  
OpenStack-Object-Storage-Policy  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>OpenStack-Identity-Account-ID  
OpenStack-Networking-Host-<span class="hljs-keyword">Name</span>  
OpenStack-<span class="hljs-keyword">Object</span>-Storage-Policy  </code></pre>
<p>需要注意的是，虽然 HTTP 规范中没有规定 <code>Header</code> 的大小，但是 Node.js 中 <code>Header</code> 的大小被限制在了 <code>80KB</code>。官方原文如下：</p>
<blockquote><p>不要让 HTTP <code>Header</code> ，包括其中状态码那行的整体大小超过 HTTP_MAX_Header_SIZE，这样做的目的是为了防御基于 <code>Header</code> 的 <code>DDOS</code> 攻击。<a href="https://github.com/nodejs/node/blob/db1087c9757c31a82c50a1eba368d8cba95b57d0/deps/http_parser/http_parser.c#L143" rel="nofollow noreferrer" target="_blank">点击这里</a></p></blockquote>
<h2 id="articleHeader3">4. 为 REST API 挑选合适的框架</h2>
<p>根据你的实际场景挑选合适的框架是非常重要的，<code>Node.js</code> 中的框架大致介绍如下：</p>
<h3 id="articleHeader4">Express、Koa、HAPI</h3>
<p><a href="http://expressjs.com/" rel="nofollow noreferrer" target="_blank">Express</a>、<a href="http://koajs.com/" rel="nofollow noreferrer" target="_blank">Koa</a>、<a href="http://hapijs.com/" rel="nofollow noreferrer" target="_blank">HAPI</a> 主要是用来构建浏览器 <code>WEB</code> 应用，因为他们都支持服务端模板渲染，虽然这只是他们众多功能中的一个。如果你的应用需要提供用户界面，那么这三个就是不错的选择。</p>
<h3 id="articleHeader5">Restify</h3>
<p>而 <a href="http://restify.com/" rel="nofollow noreferrer" target="_blank">Restify</a> 是专门用来创建符合 <code>REST</code> 规范的服务的，他诞生的目的就是帮你构建严格意义上的、可维护的 <code>API</code> 服务。<code>Restify</code> 内置了所有请求处理函数的 <a href="http://dtrace.org/blogs/about/" rel="nofollow noreferrer" target="_blank">DTrace</a> 支持。并且已经被 <a href="https://npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a> 和 <a href="https://netflix.com/" rel="nofollow noreferrer" target="_blank">netflix</a> 用来在生产环境提供重要的服务。</p>
<h2 id="articleHeader6">5. 要对 API 进行黑盒测试</h2>
<p>测试 <code>API</code> 的最好办法是对他们进行黑盒测试，黑盒测试是一种不关心应用内部结构和工作原理的测试方法，测试时系统任何部分都不应该被 <code>mock</code>。</p>
<p><a href="https://www.npmjs.com/package/supertest" rel="nofollow noreferrer" target="_blank">supertest</a> 是可以用来对接口进行黑盒测试的模块之一，下面是基于测试框架 <a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">mocha</a> 编写的一个测试用例，该用例的目的是检查接口是否能返回单条的用户数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require('supertest')

describe('GET /user/:id', function() {
  it('returns a user', function() {
    // newer mocha versions accepts promises as well
    return request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(200, {
        id: '1',
        name: 'John Math'
      }, done);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'supertest'</span>)

describe(<span class="hljs-string">'GET /user/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  it(<span class="hljs-string">'returns a user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// newer mocha versions accepts promises as well</span>
    <span class="hljs-keyword">return</span> request(app)
      .get(<span class="hljs-string">'/user'</span>)
      .set(<span class="hljs-string">'Accept'</span>, <span class="hljs-string">'application/json'</span>)
      .expect(<span class="hljs-number">200</span>, {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> '1',
        name</span>: <span class="hljs-string">'John Math'</span>
      }, done);
  });
});</code></pre>
<p>可能有人会问：<code>API</code> 服务所连接的数据库里面的数据是如何写进去的呢？</p>
<p>通常来说，你写测试的时候，要尽可能不对系统状态做假设，然而在某些场景下，你需要准确的知道系统当前所处的状态以增加更多的断言来提高测试覆盖率。如果你有这种需求，你可以试用如下的方法对数据库进行预填充：</p>
<ul>
<li><p>选择生产环境数据的子集来运行黑盒测试；</p></li>
<li><p>运行黑盒测试之前把手工构造的数据填充到数据库中。</p></li>
</ul>
<p>此外，有了黑盒测试并不意味着不需要单元测试，针对 <code>API</code> 的<a href="https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/" rel="nofollow noreferrer" target="_blank">单元测试</a>还是需要编写的。</p>
<h2 id="articleHeader7">6. 使用基于 JWT 的无状态的认证机制</h2>
<p>因为 <code>Rest API</code> 必须是无状态的，因此认证机制也需要是无状态的，而基于 <code>JWT（JSON Web Token）</code> 的认证机制是无状态认证机制中的最佳解决方案。</p>
<p><code>JWT</code> 的认证机制包含三部分：</p>
<ol>
<li><p><code>Header</code>：包含 <code>token</code> 的类型和哈希算法；</p></li>
<li><p><code>payload</code>：包含声明信息；</p></li>
<li><p><code>signature</code>：<code>JWT</code> 实际上并不是对 <code>payload</code> 进行加密，只是对其做了签名；</p></li>
</ol>
<p>为 <code>API</code> 添加基于 <code>JWT</code> 的认证机制也非常的简单，比如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const koa = require('koa');
const jwt = require('koa-jwt');

const app = koa();

app.use(jwt(
  secret: 'very-secret'
}));

// Protected middleware
app.use(function*() 
  // content of the token will be available on this.state.user
  this.body = { secret: '42' }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> koa = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> jwt = <span class="hljs-keyword">require</span>(<span class="hljs-string">'koa-jwt'</span>);

<span class="hljs-keyword">const</span> app = koa();

app.<span class="hljs-keyword">use</span>(jwt(
  secret: <span class="hljs-string">'very-secret'</span>
}));

<span class="hljs-comment">// Protected middleware</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>*<span class="hljs-params">()</span> 
  // <span class="hljs-title">content</span> <span class="hljs-title">of</span> <span class="hljs-title">the</span> <span class="hljs-title">token</span> <span class="hljs-title">will</span> <span class="hljs-title">be</span> <span class="hljs-title">available</span> <span class="hljs-title">on</span> <span class="hljs-title">this</span>.<span class="hljs-title">state</span>.<span class="hljs-title">user</span>
  <span class="hljs-title">this</span>.<span class="hljs-title">body</span> = </span>{ secret: <span class="hljs-string">'42'</span> }
});</code></pre>
<p>有了如上的代码，你的 <code>API</code> 就有了 <code>JWT</code> 的保护。如果要访问这种被保护的接口，需要使用 <code>Authorization Header</code> 来提供 <code>token</code>，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl --Header &quot;Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ&quot; my-website.com  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">curl</span> <span class="hljs-selector-tag">--Header</span> "<span class="hljs-selector-tag">Authorization</span>: <span class="hljs-selector-tag">Bearer</span> <span class="hljs-selector-tag">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span><span class="hljs-selector-class">.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9</span><span class="hljs-selector-class">.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ</span>" <span class="hljs-selector-tag">my-website</span><span class="hljs-selector-class">.com</span>  </code></pre>
<p>你可能注意到了，<code>JWT</code> 模块并不依赖任何数据存储层，这是因为 <code>token</code> 本身是可以单独被校验的，<code>token</code> 里面的 <code>payload</code> 甚至可以包含 <code>token</code> 的签名时间、有效期限。</p>
<p>此外，你还需要确保，所有的 <code>API</code> 接口只能通过更安全的 <code>HTTPS</code> 链接来访问。</p>
<h2 id="articleHeader8">7. 学会使用条件请求机制</h2>
<p>条件请求机制是基于不同的 <code>Header</code> 表现出不同的行为的机制，可以认为这些 <code>Header</code> 就是请求处理方式的先决条件，如果条件满足，请求处理方式就会有所不同。</p>
<p>可以利用这些 <code>Header</code> 检测服务器上的资源版本是否匹配特定的资源版本，这些 <code>Header</code> 的取值可以是如下的内容：</p>
<ul>
<li><p>资源的最后修改时间；</p></li>
<li><p>资源的标签（随资源变化而变化）；</p></li>
</ul>
<p>具体来说：</p>
<ul>
<li><p><code>Last-Modified</code>：标识资源的最新修改时间；</p></li>
<li><p><code>Etag</code>：标识资源的标签；</p></li>
<li><p><code>If-Modified-Since</code>：结合 <code>Last-Modified Header</code> 使用；</p></li>
<li><p><code>If-Non-Match</code>：结合 <code>Etag</code> 使用；</p></li>
</ul>
<p>下面来看一个实际的例子：</p>
<p>客户端不知道 <code>doc</code> 资源的任何版本，所以请求时即不能提供 <code>If-Modified-Since</code>，也不能提供 <code>If-Non-Match</code> 两个 Header，然后服务端在响应中会增加 <code>Etag</code> 和 <code>Last-Modified</code> 两个 <code>Header</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008537715" src="https://static.alili.tech/img/remote/1460000008537715" alt="nodejs-resftul-api-with-conditional-request-without-previous-versions.png" title="nodejs-resftul-api-with-conditional-request-without-previous-versions.png" style="cursor: pointer;"></span></p>
<p>接下来，客户端再次请求相同的资源的时候，就可以带上 <code>If-Modified-Since</code> 和 <code>If-Non-Match</code> 这两个 <code>Header</code> 了，然后如果服务器端会检查资源是否修改，如果没有修改，直接返回 <code>304 - Not Modified</code> 状态码，而不重复发送资源的内容。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008537716" src="https://static.alili.tech/img/remote/1460000008537716" alt="nodejs-resftul-api-with-conditional-request-with-previous-versions.png" title="nodejs-resftul-api-with-conditional-request-with-previous-versions.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">8. 拥抱接口调用频率限制（Rate-Limiting）</h2>
<p>频率限制是用来控制调用方有对接口发起请求的次数，为了让你的 <code>API</code> 用户知道他们还剩下多少余额，可以设置下面的 <code>Header</code>：</p>
<ul>
<li><p>X-Rate-Limit-Limit：特定时间段内允许的最多请求次数；</p></li>
<li><p>X-Rate-Limit-Remaining：特定时间段内剩余的请求次数；</p></li>
<li><p>X-Rate-Limit-Reset：什么时候请求频率限制次数会重置；</p></li>
</ul>
<p>大多数的 <code>WEB</code> 框架都支持上面这些 <code>Header</code>，如果内置不支持，也可以找到插件来支持，比如，如果你使用了 <code>koa</code>，可以使用 <a href="https://github.com/koajs/ratelimit" rel="nofollow noreferrer" target="_blank">koa-rate-limit</a>。</p>
<p>需要注意的是，不同的 <code>API</code> 服务提供商频率限制的时间窗差异会很大，比如 <code>GitHub</code> 是 60 分钟，而 <code>Twitter</code> 是 15 分钟。</p>
<h2 id="articleHeader10">9. 编写良好的 API 文档</h2>
<p>编写 <code>API</code> 的目的当然是让别人使用并受益，提供良好的接口文档至关重要。下面这两个开源项目可以帮你创建 <code>API</code> 文档：</p>
<ul>
<li><p><a href="https://apiblueprint.org/" rel="nofollow noreferrer" target="_blank">API Blueprint</a></p></li>
<li><p><a href="http://swagger.io/" rel="nofollow noreferrer" target="_blank">Swagger</a></p></li>
</ul>
<p>如果你愿意使用第三方文档服务商，可以考虑 <a href="https://apiary.io/" rel="nofollow noreferrer" target="_blank">Apiary</a>。</p>
<h2 id="articleHeader11">10. 对 API 技术演化保持关注</h2>
<p>过去几年中，<code>API</code> 技术方案领域出现了两种新的查询语言，分别是 <code>Facebook</code> 的 <code>GraphQL</code> 和 <code>Netflix</code> 的 <code>Falcor</code>，为什么需要他们呢？</p>
<p>试想这种 API 接口请求：<code>/org/1/space/2/docs/1/collaborators?include=email&amp;page=1&amp;limit=10</code>，类似的情况会让 API 很快失控，如果你希望所有接口能返回类似的响应格式，那么 <code>GraphQL</code> 和 <code>Falcor</code> 就能帮你解决这个问题。</p>
<p><strong>关于 GraphQL</strong>：</p>
<blockquote><p>GraphQL 是一种用于 API 的查询语言，也是一种基于现有数据处理数据查询的运行时。GraphQL 为您的 API 中的数据提供了一个完整和可理解的描述，使用户能够准确地询问他们需要什么，使得随着时间推移的 API 演化更容易，GraphQL 还有强大的开发工具支持。 到<a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">这里</a>阅读更多。</p></blockquote>
<p><strong>关于 Falcor</strong>：</p>
<blockquote><p>Falcor 是支撑着 Netflix UI 的创新数据平台。Falcor 允许你将所有后端数据建模为 Node.js 服务商的单个虚拟 JSON 对象。在客户端可以使用熟悉的 JavaScript 操作、处理远程JSON对象。如果你知道你的数据，你就知道你的 API 长啥样。 到<a href="https://netflix.github.io/falcor" rel="nofollow noreferrer" target="_blank">这里</a>阅读更多。</p></blockquote>
<h2 id="articleHeader12">能带来灵感的优秀 API 设计</h2>
<p>如果你正在开发 <code>Rest API</code> 或者准备改进老版本的 <code>API</code>，这里收集了几个在线上提供服务、设计优秀并且非常直接借鉴的 <code>API</code>：</p>
<ul>
<li><p><a href="https://developer.github.com/v3/" rel="nofollow noreferrer" target="_blank">GitHub API</a></p></li>
<li><p><a href="https://www.twilio.com/docs/api/rest" rel="nofollow noreferrer" target="_blank">Twilio API</a></p></li>
<li><p><a href="https://stripe.com/docs/api" rel="nofollow noreferrer" target="_blank">Stripe API</a></p></li>
<li><p><a href="https://developers.digitalocean.com/documentation/v2/#introduction" rel="nofollow noreferrer" target="_blank">Digital Ocean API</a></p></li>
</ul>
<p>希望读到这里的同学对如何用 <code>Node.js</code> 编写良好的 <code>API</code> 有更好的理解，如果有建议，欢迎评论中提出。</p>
<h3 id="articleHeader13">One More Thing</h3>
<p>想直接在微信中订阅前端周刊？扫下方二维码关注前端周刊订阅号。<br><span class="img-wrap"><img data-src="/img/remote/1460000008537717" src="https://static.alili.tech/img/remote/1460000008537717" alt="feweekly" title="feweekly" style="cursor: pointer; display: inline;"></span></p>
<p>想和我面对面交流？扫下方二维码添加我为好友。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008537718" src="https://static.alili.tech/img/remote/1460000008537718" alt="wangshijun" title="wangshijun" style="cursor: pointer; display: inline;"></span></p>
<p>Happy Hacking</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写 Node.js Rest API 的 10 个最佳实践

## 原文链接
[https://segmentfault.com/a/1190000008537712](https://segmentfault.com/a/1190000008537712)


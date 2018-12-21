---
title: '使用Postman做API自动化测试' 
date: 2018-12-22 2:30:10
hidden: true
slug: 9d8pw9o2lel
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Postman API 自动化测试</h1>
<p>Postman 最基本的功能用来重放请求，并且配合良好的 <code>response</code> 格式化工具。</p>
<p>高级点的用法可以使用 Postman 生成各个语言的脚本，还可以抓包，认证，传输文件。</p>
<p>仅仅做到这些还不能够满足一个系统的开发，或者说过于琐碎，你仍需要频繁地在开发环境，测试环境，生产环境中来回切换。单一的请求也不够，你需要维护系统所有 API 的请求，并且每个请求还带有不同的 <code>querystring</code> 和 <code>body</code>。</p>
<p><a href="https://github.com/shfshanyue/blog/tree/master/Articles/Postman-for-API-Automated-Testing" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h2 id="articleHeader1">Collection</h2>
<p>对服务器端的所有请求按功能或者业务模块进行组织，使用 markdown 对所有请求和示例添加适当的描述，这时候就用到了 Collection。以下是 postman 的一些术语以及组织请求的建议。</p>
<p>详细参考 <a href="http://www.postmanlabs.com/postman-collection/tutorial-concepts.html" rel="nofollow noreferrer" target="_blank">Postman SDK Concepts</a> 以及 <a href="https://www.getpostman.com/docs/postman/collections/creating_collections" rel="nofollow noreferrer" target="_blank">creating collections</a></p>
<ul>
<li>Collection<br>对应一个Application，组内各个成员(server, client, QA)共享一个 Collection。可以对整个 Collection 添加测试，文档。<br>对于一开始未在 postman 组织请求的应用，可以设置 Proxy，跑一遍应用，对应用的所有请求进行抓包。</li>
<li>Folder (ItemGroup)<br>对应一个模块，或者各层级子路由。如 <code>router.use('/users')</code> 所有的请求都在一个 Folder，可以根据路由互相嵌套 Folder。</li>
<li>Request (Item)<br>对应一个请求，可以添加认证信息。也可以设置代理，进行抓包。详见 <a href="https://www.getpostman.com/docs/postman/sending_api_requests/capturing_http_requests" rel="nofollow noreferrer" target="_blank">capturing http requests</a>。</li>
<li>Example<br>对应一个请求不同的参数以及响应，用于Mock Server 以及文档。</li>
</ul>
<p>postman 可以根据 Collection 的结构生成文档与Mock Server。不过都是付费功能，免费版有次数限制。</p>
<h3 id="articleHeader2">文档</h3>
<p>postman 自动生成文档有助于团队协作，解决了手动写文档，以及更新不及时的重大bug。</p>
<p>对于 GET 请求，Postman 上可以添加对该字段的描述，生成文档。</p>
<p>对于 POST 以及 PUT 请求，如果 Content-Type 是 <code>form-data</code> 或者 <code>x-www-form-urlencoded</code> 可以添加描述生成文档。不过如今传递 json 更方便灵活，所以 <code>application/json</code> 也会有很多，而且 json 又是不能添加注释的。如果需要对 json 添加文档说明的话，可以添加冗余字段 <code>_{key}.comment</code> 标明注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;id&quot;: 128,
  &quot;_id.comment&quot;: &quot;id&quot;,
  &quot;page&quot;: 10,
  &quot;_page.comment&quot;: &quot;页数&quot;
  &quot;pageSize&quot;: 15,
  &quot;_pageSize.comment&quot;: &quot;每页条数&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"id"</span>: <span class="hljs-number">128</span>,
  <span class="hljs-string">"_id.comment"</span>: <span class="hljs-string">"id"</span>,
  <span class="hljs-string">"page"</span>: <span class="hljs-number">10</span>,
  <span class="hljs-string">"_page.comment"</span>: <span class="hljs-string">"页数"</span>
  <span class="hljs-string">"pageSize"</span>: <span class="hljs-number">15</span>,
  <span class="hljs-string">"_pageSize.comment"</span>: <span class="hljs-string">"每页条数"</span>
}</code></pre>
<p>不过这样冗余字段过多，更好的解决方案是在测试中对请求进行 json 校验，同时充当了一部分文档的功能。毕竟 json-schema 就是用来描述数据使数据更加可读。</p>
<p>以上说到请求，对于响应的文档，可以 json-schema 校验或者每个字段的描述，以及更多的测试用例代表更多的细节。</p>
<h3 id="articleHeader3">Mock</h3>
<p>当服务器端还没有写好 API 时，客户端可以根据 Examples 来生成 Mock Server。</p>
<p>建议客户端端自己做 Mock，与项目集成在一起，纳入版本控制，方便灵活。强烈推荐 <a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a>，简单好用。</p>
<h2 id="articleHeader4">测试</h2>
<p>对于每一个 Request 都需要有测试用例。验证响应是否成功，响应时间是否过长或者响应 json 的数据类型是否正确。</p>
<p>测试可以使用 <code>pm.expect</code> 进行 <code>BDD</code> 测试，风格和 <code>chai</code> 很像，如果熟悉 <code>chai</code> 就很容易上手。</p>
<p>postman 内置了一些<a href="https://www.getpostman.com/docs/postman/scripts/postman_sandbox_api_reference" rel="nofollow noreferrer" target="_blank">第三方库</a>，如果你更喜欢 <code>chai</code> ，可以直接使用，也可以使用 <code>pm.expect</code> 底层使用 chai 实现，与 chai BDD API 一致。</p>
<p>postman 也有一些 http 相关的测试 API，如 status code，header, body，并且也提供了一些 snippets。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 响应成功
pm.test('Status code is 200', () => {
  pm.response.to.have.status(200)
})

// 响应成功 chai.expect
pm.test('Status code is 200', () => {
  chai.expect(pm.response).to.have.property('code', 200)
})

// 校验响应数据
pm.test('Page is 100', () => {
  const jsonData = pm.response.json()
  chai.expect(jsonData.page).to.eql(100)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 响应成功</span>
pm.test(<span class="hljs-string">'Status code is 200'</span>, () =&gt; {
  pm.response.to.have.status(<span class="hljs-number">200</span>)
})

<span class="hljs-comment">// 响应成功 chai.expect</span>
pm.test(<span class="hljs-string">'Status code is 200'</span>, () =&gt; {
  chai.expect(pm.response).to.have.property(<span class="hljs-string">'code'</span>, <span class="hljs-number">200</span>)
})

<span class="hljs-comment">// 校验响应数据</span>
pm.test(<span class="hljs-string">'Page is 100'</span>, () =&gt; {
  <span class="hljs-keyword">const</span> jsonData = pm.response.json()
  chai.expect(jsonData.page).to.eql(<span class="hljs-number">100</span>)
})</code></pre>
<h3 id="articleHeader5">Json Schema</h3>
<p><a href="http://json-schema.org/" rel="nofollow noreferrer" target="_blank">json-schema</a> 可以用来描述 json 信息，使 json 更加易读，同时也可以用来校验 json 的合法性。主流语言都有实现 json-schema 的库。</p>
<p>建议对所有 GET 响应进行 json-schema 校验，一来校验数据，二来也可以作为文档使用，使用 <a href="https://github.com/geraintluff/tv4" rel="nofollow noreferrer" target="_blank">tv4</a> 校验 json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm.test(&quot;User info&quot;, () => {
  const jsonData = pm.response.json()
  const schema = {
    title: 'UserInfo',
    discription: '用户信息',
    type: 'object',
    required: ['age', 'email', 'name'],
    properties: {
      age: {
        description: '年龄',
        type: 'number',
        mininum: 0,
      },
      email: {
        description: '邮箱',
        type: 'string' 
      },
      name: {
        description: '姓名',
        type: 'string' 
      }
    }
  }
  pm.expect(tv4.validate(jsonData, schema)).to.eql(true)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pm.test(<span class="hljs-string">"User info"</span>, () =&gt; {
  <span class="hljs-keyword">const</span> jsonData = pm.response.json()
  <span class="hljs-keyword">const</span> schema = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'UserInfo'</span>,
    <span class="hljs-attr">discription</span>: <span class="hljs-string">'用户信息'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'object'</span>,
    <span class="hljs-attr">required</span>: [<span class="hljs-string">'age'</span>, <span class="hljs-string">'email'</span>, <span class="hljs-string">'name'</span>],
    <span class="hljs-attr">properties</span>: {
      <span class="hljs-attr">age</span>: {
        <span class="hljs-attr">description</span>: <span class="hljs-string">'年龄'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'number'</span>,
        <span class="hljs-attr">mininum</span>: <span class="hljs-number">0</span>,
      },
      <span class="hljs-attr">email</span>: {
        <span class="hljs-attr">description</span>: <span class="hljs-string">'邮箱'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'string'</span> 
      },
      <span class="hljs-attr">name</span>: {
        <span class="hljs-attr">description</span>: <span class="hljs-string">'姓名'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'string'</span> 
      }
    }
  }
  pm.expect(tv4.validate(jsonData, schema)).to.eql(<span class="hljs-literal">true</span>)
})</code></pre>
<p>同样对于请求也可以添加 json 校验，不过更复杂一些，因为 postman 没有直接给出获取全部请求参数的api，需要自己解析和计算</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取 application/json 中的数据
const json = JSON.stringify(pm.request.body.raw)

// 获取 GET query string 的数据
const qs = pm.request.url.query.toObject()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取 application/json 中的数据</span>
<span class="hljs-keyword">const</span> json = <span class="hljs-built_in">JSON</span>.stringify(pm.request.body.raw)

<span class="hljs-comment">// 获取 GET query string 的数据</span>
<span class="hljs-keyword">const</span> qs = pm.request.url.query.toObject()</code></pre>
<blockquote>如果 postman 可以根据请求参数的 json-schema 自动生成数据就好了...</blockquote>
<ul><li>
<p>参考</p>
<ul>
<li><a href="http://json-schema.org/" rel="nofollow noreferrer" target="_blank">json-schema.org</a></li>
<li><a href="https://github.com/geraintluff/tv4" rel="nofollow noreferrer" target="_blank">tv4 Documentaion</a></li>
<li><a href="http://chaijs.com/api/bdd/" rel="nofollow noreferrer" target="_blank">chai bdd - API</a></li>
<li><a href="https://www.getpostman.com/docs/postman/scripts/postman_sandbox_api_reference" rel="nofollow noreferrer" target="_blank">postman sandbox api reference</a></li>
</ul>
</li></ul>
<h3 id="articleHeader6">测试请求参数</h3>
<p>一个请求带有若干参数，如 <code>GET</code> 的 <code>querystring(search)</code> 以及 <code>POST</code> 的 <code>body</code>，不同的参数会有不同的响应。</p>
<p>假设一个请求不同参数返回的 json schema 完全不同，则可以写成两个 Request 分开测试。如果返回的 json schema 相同，只是值不同，则需要考虑传递了哪些参数，参数是多少。</p>
<p>一个经典的场景，根据 filter 来筛选符合条件的列表。拿用户列表举例，伪代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url = '/api/users'
const query = {
  name: 'san',
  age: 12,
  sex: 'MALE'
}
// 注意query数据需要校验，防止 SQL 注入
const sql = `select * from users where name = ${query.name} and age = ${query.age} and sex = ${query.sex}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> url = <span class="hljs-string">'/api/users'</span>
<span class="hljs-keyword">const</span> query = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'san'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>,
  <span class="hljs-attr">sex</span>: <span class="hljs-string">'MALE'</span>
}
<span class="hljs-comment">// 注意query数据需要校验，防止 SQL 注入</span>
<span class="hljs-keyword">const</span> sql = <span class="hljs-string">`select * from users where name = <span class="hljs-subst">${query.name}</span> and age = <span class="hljs-subst">${query.age}</span> and sex = <span class="hljs-subst">${query.sex}</span>`</span></code></pre>
<p>一个思路是根据请求的参数进行测试，一段重要的 snipet 是在 postman 中获取 querystring，query 是一种 <code>PropertyList</code> 的数据，定义在 <a href="http://www.postmanlabs.com/postman-collection/PropertyList.html" rel="nofollow noreferrer" target="_blank">postman-collection - PropertyList</a>。如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name = pm.request.url.query.get('name')
const age = pm.request.url.query.get('age')

if (name) {
  pm.test('Items should match the name', () => {
    const jsonData = pm.response.json()
    expect(_.uniq(jsonData.rows.map(row => row.name))).to.eql([name])
  })
}

// 冗余代码有些多，postman不知道支不支持自建 snipets
if (age) {
  pm.test('Items should match the age', () => {
    const jsonData = pm.response.json()
    expect(_.uniq(jsonData.rows.map(row => row.age))).to.eql([age])
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> name = pm.request.url.query.get(<span class="hljs-string">'name'</span>)
<span class="hljs-keyword">const</span> age = pm.request.url.query.get(<span class="hljs-string">'age'</span>)

<span class="hljs-keyword">if</span> (name) {
  pm.test(<span class="hljs-string">'Items should match the name'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> jsonData = pm.response.json()
    expect(_.uniq(jsonData.rows.map(<span class="hljs-function"><span class="hljs-params">row</span> =&gt;</span> row.name))).to.eql([name])
  })
}

<span class="hljs-comment">// 冗余代码有些多，postman不知道支不支持自建 snipets</span>
<span class="hljs-keyword">if</span> (age) {
  pm.test(<span class="hljs-string">'Items should match the age'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> jsonData = pm.response.json()
    expect(_.uniq(jsonData.rows.map(<span class="hljs-function"><span class="hljs-params">row</span> =&gt;</span> row.age))).to.eql([age])
  })
}</code></pre>
<p>当然以上 filter 只包含了最简单的场景，其中只涉及到了相等测试。但是有不等以及包含关系呢。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const query = {
  name: 'san',
  age: 12,
  sex: 'MALE'
}
const sql = `select * from users where name like ${query.name} and age < ${query.age} and sex = ${query.sex}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> query = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'san'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>,
  <span class="hljs-attr">sex</span>: <span class="hljs-string">'MALE'</span>
}
<span class="hljs-keyword">const</span> sql = <span class="hljs-string">`select * from users where name like <span class="hljs-subst">${query.name}</span> and age &lt; <span class="hljs-subst">${query.age}</span> and sex = <span class="hljs-subst">${query.sex}</span>`</span></code></pre>
<p>这种请求参数依赖于前后端的协商交流，当然对测试或者一个不知情的开发来说很不友好的。</p>
<p>当然对于后端也是不友好的，因为需要对你传入的每个 query 来进行处理，而且以后每添加一个筛选字段，都需要手动改一下。</p>
<p>可以由前端自行决定需要筛选的数据，比如使用类似于 mongo 的检索语法。</p>
<blockquote>
<a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">graphql</a> 是相当酷的，值得尝试一下</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const query = {
  name: {
    $like: 'san' 
  },
  age: {
    $lt: 12 
  },
  sex: 'MALE'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> query = {
  <span class="hljs-attr">name</span>: {
    <span class="hljs-attr">$like</span>: <span class="hljs-string">'san'</span> 
  },
  <span class="hljs-attr">age</span>: {
    <span class="hljs-attr">$lt</span>: <span class="hljs-number">12</span> 
  },
  <span class="hljs-attr">sex</span>: <span class="hljs-string">'MALE'</span>
}</code></pre>
<p>不过这对于测试的开发能力要求也比较高了，测试人员需要解析参数并且测试接口。</p>
<h3 id="articleHeader7">测试多次请求</h3>
<p>当对一个函数进行单元测试时，需要大量的输入以及期望输出，在postman中，可以使用 <code>data</code> 来模拟多次输入</p>
<p>data 是一种变量，只能在 Runner 中使用，有必要对每个 Folder 建立相关的 data file，并且加入版本控制</p>
<ul><li><a href="http://blog.getpostman.com/2014/10/28/using-csv-and-json-files-in-the-postman-collection-runner/" rel="nofollow noreferrer" target="_blank">using csv and json files in the postman collection runner</a></li></ul>
<h2 id="articleHeader8">集成测试</h2>
<p>单个API测试通过后，需要把所有请求集成在一起进行测试。这时候出现了两个问题</p>
<ol>
<li>如何确保API依赖</li>
<li>API之间如何传递数据</li>
</ol>
<p>请求在 Collection 的顺序就是他们的发起请求的顺序，如果需要强制更改顺序，可以使用 <a href="https://www.getpostman.com/docs/postman/collection_runs/building_workflows" rel="nofollow noreferrer" target="_blank"><code>setNextRuest()</code></a></p>
<p>在 postman 中有三种作用域的数据，<code>data</code>，<code>environment</code>，<code>global</code>。在请求中用 <code>"{{""}}"</code> 占位符替代。</p>
<p><code>environment</code> 可以用来更改 <code>HOST</code>，避免在 url 中频繁手动切换本地环境，开发环境和生产环境。另外也可以用来传递数据。</p>
<p>一个常见的场景是项目使用 token 来保存登录信息，每次请求都需要携带token。可以在登录的测试代码中设置 token 的环境变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const url = 'http://"{{"HOST"}}"/api/login'

pm.test('There is a token', () => {
  const jsonData = pm.response.json()
  pm.expect(jsonData.token).to.a('string')
  pm.environment.set('token', jsonData.token)
})

const urlNext = 'http://"{{"HOST"}}"/api/profile?token="{{"token"}}"'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> url = <span class="hljs-string">'http://"{{"HOST"}}"/api/login'</span>

pm.test(<span class="hljs-string">'There is a token'</span>, () =&gt; {
  <span class="hljs-keyword">const</span> jsonData = pm.response.json()
  pm.expect(jsonData.token).to.a(<span class="hljs-string">'string'</span>)
  pm.environment.set(<span class="hljs-string">'token'</span>, jsonData.token)
})

<span class="hljs-keyword">const</span> urlNext = <span class="hljs-string">'http://"{{"HOST"}}"/api/profile?token="{{"token"}}"'</span></code></pre>
<h3 id="articleHeader9">测试Collection</h3>
<p>确保依赖后，可以对 Collection 新建一个 Runner，并且引入一个 data 文件来测试所有的请求。对局部的 Folder 也可以使用 Runner 以及 data 进行测试。</p>
<blockquote>最新版本的 postman 已经可以支持，为每个 Postman 新建变量以及 Test</blockquote>
<p>所有的请求都会有一些共同测试，比如测试接口是否响应成功以及以上提到的测试 filter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm.test('Response is right', () => {
  // status code: 2XX
  pm.response.to.be.success
})

pm.test('Filter is matching', () => {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pm.test(<span class="hljs-string">'Response is right'</span>, () =&gt; {
  <span class="hljs-comment">// status code: 2XX</span>
  pm.response.to.be.success
})

pm.test(<span class="hljs-string">'Filter is matching'</span>, () =&gt; {
  <span class="hljs-comment">// ...</span>
})</code></pre>
<h2 id="articleHeader10">持续集成</h2>
<p>当可以测试 Collection 后，需要对测试加入版本控制，与项目集成在一起，保留测试记录，以便准时定位 bug。可以与 postman 的官方工具 <code>newman</code> 集成在一起，但是有一点不方便的是，持续集成仅仅可以保存记录，并不能还原记录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newman run https://api.getpostman.com/collections/"{{"collection_uid"}}"?apikey="{{"postman-api-key-here"}}" --environment https://api.getpostman.com/environments/"{{"environment_uid"}}"?apikey="{{"postman-api-key-here"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code class="shell" style="word-break: break-word; white-space: initial;">newman run https://api.getpostman.com/collections/"{{"collection_uid"}}"?apikey="{{"postman-api-key-here"}}" --environment https://api.getpostman.com/environments/"{{"environment_uid"}}"?apikey="{{"postman-api-key-here"}}"</code></pre>
<h2 id="articleHeader11">对比UI自动化测试</h2>
<p>按照我的理解，UI 自动化测试目的是用来测试流程是否通畅，比如登陆，注册，退出，如果用例没通过则截屏。但是前端需求的不断变化，加上现在各种前端框架，导致 selector 不是特别容易获取到且流程容易更改。</p>
<p>而API 自动化测试用来测试数据是否正确。而且大部分问题是出在数据问题上，所以 API 自动化测试性价比比较高一些。</p>
<h2 id="articleHeader12">总结</h2>
<ol>
<li>
<p>如何编写测试用例</p>
<blockquote>postman 底层使用 <code>[chai.js](http://chaijs.com/api/bdd/)</code> 的 bdd 语法作为断言库，另外加了一些特有的语法。</blockquote>
</li>
<li>
<p>如何debug</p>
<blockquote>点击菜单栏 View -&gt; Show Devtools (Show Postman Console) 可以查看响应，检查输出，不过不能打断点。对于系统的单个请求，可以使用 Proxy 监听请求进行调试。</blockquote>
</li>
<li>
<p>如何使用js第三方库对请求就行预处理以及后处理</p>
<p>比如:<br>发送请求时，服务器端要求时间为 <code>timestmap(unix)</code> 的格式，但接口调试时可读性过弱，是否可以使用 <code>moment</code> 转化时间。<br>收到响应时，也需要 <code>moment</code> 对时间进行解析，获得更好的展现形式。或者使用 <code>lodash</code> 一些函数进行数据的处理。</p>
<blockquote>可以在 Tests 和 Pre-request Script 中编写脚本对请求以及响应做一些处理。但是不能对数据格式化，比如日期。<br>建议前后端交流日期时使用 ISO 格式的字符串，前后端都容易解析，并且可读性强。</blockquote>
</li>
<li>
<p>如何管理请求依赖</p>
<p>比如:<br>两个API需要有依赖关系，比如当创建完一个用户后（注册），获取他的个人信息。获取个人信息就需要依赖创建用户这个API。</p>
<blockquote>使用 Environment Variables 可以管理依赖</blockquote>
</li>
<li>
<p>如何设置统一的请求参数</p>
<p>比如:<br>大部分接口都需要统一的 <code>token</code> 参数。</p>
<blockquote>目前好像没什么办法</blockquote>
</li>
<li>
<p>如何集成到服务器端项目中</p>
<p>如果系统后续版本没有通过API测试，则保留测试记录是很重要的，版本控制可以得知该时间段内的代码变更。以git为例，需要每次提交后运行测试，并保留测试结果。</p>
<blockquote>可以使用 npm 包 newman 来集成到项目中</blockquote>
</li>
</ol>
<h2 id="articleHeader13">参考</h2>
<ul>
<li><a href="http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/" rel="nofollow noreferrer" target="_blank">using variables inside postman and collection runner</a></li>
<li><a href="http://blog.getpostman.com/2017/10/25/writing-tests-in-postman/" rel="nofollow noreferrer" target="_blank">writing tests in postman</a></li>
<li><a href="https://docs.postman-echo.com" rel="nofollow noreferrer" target="_blank">postman-echo</a></li>
<li><a href="http://blog.getpostman.com/2016/11/09/generate-spotify-playlists-using-a-postman-collection/" rel="nofollow noreferrer" target="_blank">generate spoitify playlists using a postman collection</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Postman做API自动化测试

## 原文链接
[https://segmentfault.com/a/1190000012433650](https://segmentfault.com/a/1190000012433650)


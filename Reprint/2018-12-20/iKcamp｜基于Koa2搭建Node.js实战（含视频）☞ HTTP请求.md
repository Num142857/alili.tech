---
title: 'iKcamp｜基于Koa2搭建Node.js实战（含视频）☞ HTTP请求' 
date: 2018-12-20 2:30:10
hidden: true
slug: ily7b208ql
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">POST/GET请求——常见请求方式处理</h2>
<h2 id="articleHeader1">??  iKcamp 制作团队</h2>
<p>原创作者：<a href="https://github.com/pplgin" rel="nofollow noreferrer" target="_blank">大哼</a>、<a href="https://github.com/xiaoyaojun" rel="nofollow noreferrer" target="_blank">阿干</a>、<a href="https://github.com/l3ve" rel="nofollow noreferrer" target="_blank">三三</a>、<a href="https://github.com/tinyuen" rel="nofollow noreferrer" target="_blank">小虎</a>、<a href="https://github.com/pangz1" rel="nofollow noreferrer" target="_blank">胖子</a>、<a href="http://zoei.me/" rel="nofollow noreferrer" target="_blank">小哈</a>、<a href="https://github.com/DDU1222" rel="nofollow noreferrer" target="_blank">DDU</a>、<a href="https://github.com/cfancc" rel="nofollow noreferrer" target="_blank">可木</a>、<a href="https://github.com/walterxu0704" rel="nofollow noreferrer" target="_blank">晃晃</a>  <br>文案校对：<a href="https://github.com/yliiii" rel="nofollow noreferrer" target="_blank">李益</a>、<a href="https://github.com/yanyixin" rel="nofollow noreferrer" target="_blank">大力萌</a>、<a href="https://github.com/MatildaJin" rel="nofollow noreferrer" target="_blank">Au</a>、<a href="https://github.com/DDU1222" rel="nofollow noreferrer" target="_blank">DDU</a>、<a href="http://www.xiaoxili.com/" rel="nofollow noreferrer" target="_blank">小溪里</a>、<a href="http://zoei.me/" rel="nofollow noreferrer" target="_blank">小哈</a>  <br>风采主播：<a href="https://github.com/cfancc" rel="nofollow noreferrer" target="_blank">可木</a>、<a href="https://github.com/xiaoyaojun" rel="nofollow noreferrer" target="_blank">阿干</a>、<a href="https://github.com/MatildaJin" rel="nofollow noreferrer" target="_blank">Au</a>、<a href="https://github.com/DDU1222" rel="nofollow noreferrer" target="_blank">DDU</a>、<a href="http://zoei.me/" rel="nofollow noreferrer" target="_blank">小哈</a>  <br>视频剪辑：<a href="http://www.xiaoxili.com/" rel="nofollow noreferrer" target="_blank">小溪里</a>  <br>主站运营：<a href="https://github.com/jackson13145" rel="nofollow noreferrer" target="_blank">给力xi</a>、<a href="https://github.com/xiatianyu" rel="nofollow noreferrer" target="_blank">xty</a>  <br>教程主编：<a href="https://github.com/brucecham" rel="nofollow noreferrer" target="_blank">张利涛</a></p>
<hr>
<p>视频地址：<a href="https://www.cctalk.com/v/15114357765870" rel="nofollow noreferrer" target="_blank">https://www.cctalk.com/v/15114357765870</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012622980?w=1602&amp;h=964" src="https://static.alili.tech/img/remote/1460000012622980?w=1602&amp;h=964" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">文章</h1>
<h1 id="articleHeader3">Http 请求</h1>
<blockquote>在学习了 <code>koa-router</code> 之后，我们就可以用它来处理一些常见的请求了，比如 <code>POST/GET</code> 。</blockquote>
<p>&lt;br/&gt; </p>
<p><code>koa-router</code> 提供了 <code>.get</code>、<code>.post</code>、<code>.put</code> 和 <code>.del</code> 接口来处理各种请求，但实际业务上，我们大部分只会接触到 <code>POST</code> 和 <code>GET</code>，所以接下来只针对这两种请求类型来说明。 </p>
<p>&lt;br/&gt;</p>
<p>当我们捕获到请求后，一般都需要把请求带过来的数据解析出来。数据传递过来的方式一般有三种： </p>
<p>&lt;br/&gt;</p>
<h2 id="articleHeader4">请求参数放在 <code>URL</code> 后面</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:3000/home?id=12&amp;name=ikcamp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="txt" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//localhost:3000/home?id=12&amp;name=ikcamp</span></code></pre>
<p>&lt;br/&gt;</p>
<p><code>koa-router</code> 封装的 <code>request</code> 对象，里面的 <code>query</code> 方法或 <code>querystring</code> 方法可以直接获取到 <code>Get</code> 请求的数据，唯一不同的是 <code>query</code> 返回的是对象，而 <code>querystring</code> 返回的是字符串。 </p>
<p>修改 <code>app.js</code>，我们加入解析方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const Koa = require('koa')
  const router = require('koa-router')()
  const app = new Koa()

  router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  })

  router.get('/home', async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  })

  router.get('/404', async(ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
  })

  // add router middleware:
  app.use(router.routes())

  app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
  <span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)()
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

  router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    ctx.response.body = <span class="hljs-string">`&lt;h1&gt;index page&lt;/h1&gt;`</span>
  })

  router.get(<span class="hljs-string">'/home'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    <span class="hljs-built_in">console</span>.log(ctx.request.query)
    <span class="hljs-built_in">console</span>.log(ctx.request.querystring)
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;HOME page&lt;/h1&gt;'</span>
  })

  router.get(<span class="hljs-string">'/404'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;404 Not Found&lt;/h1&gt;'</span>
  })

  <span class="hljs-comment">// add router middleware:</span>
  app.use(router.routes())

  app.listen(<span class="hljs-number">3000</span>, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3000'</span>)
  })</code></pre>
<p>&lt;br/&gt;</p>
<p>运行代码，并通过浏览器访问 <code>http://localhost:3000/home?id=12&amp;name=ikcamp</code>，然后打开控制台会看到下面的输出内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ id: '12', name: 'ikcamp' }
id=12&amp;name=ikcamp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="txt">{ <span class="hljs-built_in">id</span>: '<span class="hljs-number">12</span>', <span class="hljs-built_in">name</span>: 'ikcamp' }
<span class="hljs-built_in">id</span>=<span class="hljs-number">12</span>&amp;<span class="hljs-built_in">name</span>=ikcamp</code></pre>
<p>&lt;br/&gt;</p>
<h2 id="articleHeader5">请求参数放在 <code>URL</code> 中间</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:3000/home/12/ikcamp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="txt" style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">3000</span><span class="hljs-regexp">/home/</span><span class="hljs-number">12</span><span class="hljs-regexp">/ikcamp</span></code></pre>
<p>&lt;br/&gt;</p>
<p>这种情况下，解析方式肯定与上面的不一样了，<code>koa-router</code> 会把请求参数解析在 <code>params</code> 对象上，我们修改 <code>app.js</code> 文件，增加新的路由来测试下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 增加如下代码
  router.get('/home/:id/:name', async(ctx, next)=>{
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 增加如下代码</span>
  router.get(<span class="hljs-string">'/home/:id/:name'</span>, <span class="hljs-keyword">async</span>(ctx, next)=&gt;{
    <span class="hljs-built_in">console</span>.log(ctx.params)
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;HOME page /:id/:name&lt;/h1&gt;'</span>
  })</code></pre>
<p>&lt;br/&gt; </p>
<p>运行代码，并通过浏览器访问 <code>http://localhost:3000/home/12/ikcamp</code>，然后查看下控制台显示的日志信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ id: '12', name: 'ikcamp' } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="txt" style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">id</span>: <span class="hljs-string">'12'</span>, name: <span class="hljs-string">'ikcamp'</span> } </code></pre>
<p>&lt;br/&gt;</p>
<h2 id="articleHeader6">请求参数放在 <code>body</code> 中</h2>
<p>&lt;br/&gt;</p>
<p>当用 <code>post</code> 方式请求时，我们会遇到一个问题：<code>post</code> 请求通常都会通过表单或 <code>JSON</code> 形式发送，而无论是 <code>Node</code> 还是 <code>Koa</code>，都 <strong>没有提供</strong> 解析 <code>post</code> 请求参数的功能。 </p>
<p>&lt;br/&gt;</p>
<h3 id="articleHeader7">koa-bodyparser 说：『是时候登场了！』</h3>
<p>&lt;br/&gt; </p>
<p>首先，安装 <code>koa-bodyparser</code> 包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa-bodyparser -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm i koa-bodyparser -S</code></pre>
<p>&lt;br/&gt; </p>
<p>安装完成之后，我们需要在 <code>app.js</code> 中引入中间件并应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const Koa = require('koa')
  const router = require('koa-router')()
  const bodyParser = require('koa-bodyparser')
  const app = new Koa()

  app.use(bodyParser())

  router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  })

  router.get('/home', async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  })

  router.get('/home/:id/:name', async(ctx, next)=>{
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  })

  router.get('/404', async(ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
  })

  app.use(router.routes())

  app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
  <span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)()
  <span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-bodyparser'</span>)
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

  app.use(bodyParser())

  router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    ctx.response.body = <span class="hljs-string">`&lt;h1&gt;index page&lt;/h1&gt;`</span>
  })

  router.get(<span class="hljs-string">'/home'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    <span class="hljs-built_in">console</span>.log(ctx.request.query)
    <span class="hljs-built_in">console</span>.log(ctx.request.querystring)
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;HOME page&lt;/h1&gt;'</span>
  })

  router.get(<span class="hljs-string">'/home/:id/:name'</span>, <span class="hljs-keyword">async</span>(ctx, next)=&gt;{
    <span class="hljs-built_in">console</span>.log(ctx.params)
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;HOME page /:id/:name&lt;/h1&gt;'</span>
  })

  router.get(<span class="hljs-string">'/404'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {
    ctx.response.body = <span class="hljs-string">'&lt;h1&gt;404 Not Found&lt;/h1&gt;'</span>
  })

  app.use(router.routes())

  app.listen(<span class="hljs-number">3000</span>, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at http://localhost:3000'</span>)
  })</code></pre>
<p>然后我们来试着写一个简单的表单提交实例。修改 <code>app.js</code> 增加如下代码，实现增加表单页面的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 增加返回表单页面的路由
  router.get('/user', async(ctx, next)=>{
    ctx.response.body = 
    `
      <form action=&quot;/user/register&quot; method=&quot;post&quot;>
        <input name=&quot;name&quot; type=&quot;text&quot; placeholder=&quot;请输入用户名：ikcamp&quot;/> 
        <br/>
        <input name=&quot;password&quot; type=&quot;text&quot; placeholder=&quot;请输入密码：123456&quot;/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 增加返回表单页面的路由</span>
  router.get(<span class="hljs-string">'/user'</span>, <span class="hljs-keyword">async</span>(ctx, next)=&gt;{
    ctx.response.body = 
    <span class="hljs-string">`
      &lt;form action="/user/register" method="post"&gt;
        &lt;input name="name" type="text" placeholder="请输入用户名：ikcamp"/&gt; 
        &lt;br/&gt;
        &lt;input name="password" type="text" placeholder="请输入密码：123456"/&gt;
        &lt;br/&gt; 
        &lt;button&gt;GoGoGo&lt;/button&gt;
      &lt;/form&gt;
    `</span>
  })</code></pre>
<p>&lt;br/&gt;</p>
<p>继续修改 <code>app.js</code> 增加如下代码，实现 <code>post</code> 表单提交对应的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 增加响应表单请求的路由
  router.post('/user/register',async(ctx, next)=>{
    let {name, password} = ctx.request.body
    if( name === 'ikcamp' &amp;&amp; password === '123456' ){
      ctx.response.body = `Hello， ${name}！`
    }else{
      ctx.response.body = '账号信息错误'
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 增加响应表单请求的路由</span>
  router.post(<span class="hljs-string">'/user/register'</span>,<span class="hljs-keyword">async</span>(ctx, next)=&gt;{
    <span class="hljs-keyword">let</span> {name, password} = ctx.request.body
    <span class="hljs-keyword">if</span>( name === <span class="hljs-string">'ikcamp'</span> &amp;&amp; password === <span class="hljs-string">'123456'</span> ){
      ctx.response.body = <span class="hljs-string">`Hello， <span class="hljs-subst">${name}</span>！`</span>
    }<span class="hljs-keyword">else</span>{
      ctx.response.body = <span class="hljs-string">'账号信息错误'</span>
    }
  })</code></pre>
<p>&lt;br/&gt; </p>
<p>常见的几种请求，以及相应的参数传递解析，我们已经学习过了。下一节中，我们会把项目整理重构下，做个分层，并引入视图层。</p>
<blockquote>下一篇：代码分层——梳理代码，渐近于 MVC 分层模式</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012423305?w=1426&amp;h=778" src="https://static.alili.tech/img/remote/1460000012423305?w=1426&amp;h=778" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>上一篇：iKcamp新课程推出啦～～～～～<a href="https://juejin.im/post/5a4063876fb9a04515441be7" rel="nofollow noreferrer" target="_blank">iKcamp｜基于Koa2搭建Node.js实战（含视频）☞ 路由koa-router</a>
</blockquote>
<h2 id="articleHeader8">推荐： 翻译项目Master的自述：</h2>
<h3 id="articleHeader9">1. <a href="https://juejin.im/post/59e87bef5188255ea95b1077" rel="nofollow noreferrer" target="_blank">干货｜人人都是翻译项目的Master</a>
</h3>
<h3 id="articleHeader10">2. <a>iKcamp出品微信小程序教学共5章16小节汇总(含视频)</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
iKcamp｜基于Koa2搭建Node.js实战（含视频）☞ HTTP请求

## 原文链接
[https://segmentfault.com/a/1190000012622975](https://segmentfault.com/a/1190000012622975)


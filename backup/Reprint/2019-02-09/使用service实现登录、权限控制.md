---
title: '使用service实现登录、权限控制' 
date: 2019-02-09 2:30:58
hidden: true
slug: tda4awahqi
categories: [reprint]
---

{{< raw >}}

                    
<p>文章来源：<a href="http://blog.ddlisting.com/2016/06/15/shi-yong-serviceshi-xian-deng-lu-quan-xian-kong-zhi/" rel="nofollow noreferrer" target="_blank">http://blog.ddlisting.com</a></p>
<p>官网对于登录、用户权限的介绍只有一段简单的说明，并没有详细说明如何使用service实现权限控制。下面地址是官网的说法：</p>
<p><a href="https://guides.emberjs.com/v2.6.0/applications/services/" rel="nofollow noreferrer" target="_blank">https://guides.emberjs.com/v2.6.0/applications/services/</a></p>
<blockquote>
<p>An Ember.Service is a long-lived Ember object that can be made available in different parts of your application.<br>Services are useful for features that require shared state or persistent connections. Example uses of services might include:</p>
<ol>
<li><p>User/session authentication.</p></li>
<li><p>Geolocation.</p></li>
<li><p>WebSockets.</p></li>
<li><p>Server-sent events or notifications.</p></li>
<li><p>Server-backed API calls that may not fit Ember Data.</p></li>
<li><p>Third-party APIs.</p></li>
<li><p>Logging.</p></li>
</ol>
</blockquote>
<p><code>service</code>是啥东西呢？简单讲<code>service</code>也是一个<code>Ember.Object</code>只不过这个对象与普通的对象有点不一样。首先这种对象是放在文件夹<code>appName/app/services</code>目录下。其次放在这个目录下的对象Ember会自动注册（<code>registered</code>）或者注入（<code>injection</code>）到Ember项目中。这种对象有如下2个特点</p>
<ol>
<li><p>对象声明周期是session级别的</p></li>
<li><p>在Ember项目的任何地方都可以调用</p></li>
</ol>
<p>正是基于这两个特性才能实现权限的控制。最简单的例子就是用户的登录问题。目前也有现成的插件实现权限的控制，请看<a href="http://blog.ddlisting.com/2015/11/20/ember-application-authority-control/" rel="nofollow noreferrer" target="_blank">使用ember-simple-auth实现Ember.js应用的权限控制</a>所描述的方法，但是如果要根据自己项目需要去实现权限控制那么又如何做呢？</p>
<p>本篇博文将为你介绍如何使用<code>service</code>实现权限控制，我会创建一个简单的登录示例加以说明。如有不妥欢迎留言指正。</p>
<h2 id="articleHeader0">构建项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember new secretcodez
cd secretcodez
ember s" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code class="shell">ember <span class="hljs-keyword">new</span> <span class="hljs-type">secretcodez</span>
cd secretcodez
ember s</code></pre>
<p>验证项目是否创建成功<a href="http://localhost:4200" rel="nofollow noreferrer" target="_blank">http://localhost:4200</a>。看到<strong>Welcome to Ember</strong>说明项创建成功。下面创建演示所需文件。</p>
<h3 id="articleHeader1">创建文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g route secret
ember g route login
ember g route application

ember g component secret-page
ember g component login-page

ember g model code description:string

ember g adapter application" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell">ember g route secret
ember g route login
ember g route <span class="hljs-built_in">application</span>

ember g component secret-page
ember g component login-page

ember g model code description:<span class="hljs-built_in">string</span>

ember g adapter <span class="hljs-built_in">application</span></code></pre>
<p>项目演示用到的文件基本就这些。</p>
<h2 id="articleHeader2">secret页面</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/templates/secret.hbs "}}"
"{{"secret-page model=model"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/templates/secret.hbs "}}"
"{{"secret-page model=model"}}"</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/tempalates/components/secret-page.hbs"}}"
<h1>secret page</h1>

<ul>
    "{{"#each model as |code|"}}"
    <li>
        <strong>"{{"code.description"}}"</strong>
    </li>
    "{{"/each"}}"
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/tempalates/components/secret-page.hbs"}}"
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>secret page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    "{{"#each model as |code|"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>"{{"code.description"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    "{{"/each"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h2 id="articleHeader3">后端服务</h2>
<p>为了测试创建一个简单的后端服务程序，使用的是Node，然后写死一些测试数据。就没必要动牛刀，创建一个数据库了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g server
npm install
npm install body-parser --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell">ember g server
npm <span class="hljs-keyword">install</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">body</span>-parser <span class="hljs-comment">--save-dev</span></code></pre>
<p>执行完<code>ember g server</code>后，在APP目录下创建一个nodejs程序，自动植入到当前项目中，访问的domain和port与ember访问域名端口一致。</p>
<p>打开<code>index.js</code>编辑后端请求监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server/index.js

const bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/codes', function (req, res) {    
    return res.status(200).send({
          codes: [
              { id:1, description: '为了测试创建一个简单的后端服务程序，使用的是Node，然后写死一些测试数据。就没必要动牛刀，创建一个数据库了！' },
              { id:2, description: '本篇博文将为你介绍如何使用service实现权限控制，我会创建一个简单的登录示例加以说明。如有不妥欢迎留言指正。' }
          ]
      });
  });

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// server/index.js</span>

<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{

  app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">true</span> }));

  app.get(<span class="hljs-string">'/api/codes'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{    
    <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send({
          <span class="hljs-attr">codes</span>: [
              { <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">'为了测试创建一个简单的后端服务程序，使用的是Node，然后写死一些测试数据。就没必要动牛刀，创建一个数据库了！'</span> },
              { <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">'本篇博文将为你介绍如何使用service实现权限控制，我会创建一个简单的登录示例加以说明。如有不妥欢迎留言指正。'</span> }
          ]
      });
  });

};</code></pre>
<p>既然用到自己的后端服务那么对应的你就需要自定义适配器了。简单起见就创建<code>RESTAdapter</code>适配器吧。<code>JSONAPIAdapter</code>适配器相对麻烦点，需要格式化数据为<a href="http://jsonapi.org" rel="nofollow noreferrer" target="_blank">json api</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/adapters/application.js

export default DS.RESTAdapter.extend({
  namespace: 'api'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/adapters/application.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DS.RESTAdapter.extend({
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'api'</span>
});</code></pre>
<p>使用属性<code>namespace</code>指定URL前缀，比如请求URL为<a href="http://localhost:4200/api/codes" rel="nofollow noreferrer" target="_blank">http://localhost:4200/api/codes</a>，自动在请求上加入前缀<code>api</code>。</p>
<p>修改路由，获取后端数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/routes/secret.js

export default Ember.Route.extend({
  model() {
    // 返回后端数据，这些数据直接从 server/index.js 获取
    return this.store.findAll('code');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/routes/secret.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Route.extend({
  model() {
    <span class="hljs-comment">// 返回后端数据，这些数据直接从 server/index.js 获取</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.store.findAll(<span class="hljs-string">'code'</span>);
  }
});</code></pre>
<p>重新启动项目。检查项目是否有错误！如果启动没问题，那么访问<a href="http://localhost:4200/secret" rel="nofollow noreferrer" target="_blank">http://localhost:4200/secret</a>你也会得到如下截图的效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006791823" src="https://static.alili.tech/img/remote/1460000006791823" alt="效果截图1" title="效果截图1" style="cursor: pointer;"></span></p>
<p>从截图中可以看到发送一个请求<code>http://localhost:4200/api/codes</code>，并且从这个请求中获取到服务端返回的数据。你可以直接把这个URL放到浏览器地址栏执行，可以清楚的看到返回的数据。数据的格式是普通的json格式。</p>
<p>目前的效果是任何人都可以访问，还没实现权限控制的效果。那么如何去实现呢？不知道你是否看过前面的文章<a href="http://blog.ddlisting.com/2016/06/06/adapter-serializer/" rel="nofollow noreferrer" target="_blank">adapter与serializer使用示例</a>，如果你看过里面有介绍过在请求头加验证信息这个小结。如果我也想这么实现控制访问API的权限如何做呢？</p>
<h4>修改服务端，加入权限校验</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 拦截 /api/codes 请求
app.get('/api/codes', function(req, res) {
    //获取数据之前先校验请求者是否有权访问资源
    //  做一个非常简单的判断，如果请求的头信息不等于BLOG.DDLISTING.COM则认为无权限
    if (req.headers['authorization'] !== 'BLOG.DDLISTING.COM') {
        return res.status(403).send('您无权访问此资源！')
    }
    // 直接返回正确状态和测试数据
    return res.status(200).send({
        codes: [
            { id:1, description: '为了测试创建一个简单的后端服务程序，使用的是Node，然后写死一些测试数据。就没必要动牛刀，创建一个数据库了！' },
            { id:2, description: '本篇博文将为你介绍如何使用service实现权限控制，我会创建一个简单的登录示例加以说明。如有不妥欢迎留言指正。' }
        ]
    });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 拦截 /api/codes 请求</span>
app.get(<span class="hljs-string">'/api/codes'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">//获取数据之前先校验请求者是否有权访问资源</span>
    <span class="hljs-comment">//  做一个非常简单的判断，如果请求的头信息不等于BLOG.DDLISTING.COM则认为无权限</span>
    <span class="hljs-keyword">if</span> (req.headers[<span class="hljs-string">'authorization'</span>] !== <span class="hljs-string">'BLOG.DDLISTING.COM'</span>) {
        <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">403</span>).send(<span class="hljs-string">'您无权访问此资源！'</span>)
    }
    <span class="hljs-comment">// 直接返回正确状态和测试数据</span>
    <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">200</span>).send({
        <span class="hljs-attr">codes</span>: [
            { <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">'为了测试创建一个简单的后端服务程序，使用的是Node，然后写死一些测试数据。就没必要动牛刀，创建一个数据库了！'</span> },
            { <span class="hljs-attr">id</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">'本篇博文将为你介绍如何使用service实现权限控制，我会创建一个简单的登录示例加以说明。如有不妥欢迎留言指正。'</span> }
        ]
    });
})</code></pre>
<p>注意：_代码只列出主要部分，其他的不变。_<br>在代码中加入了简单的权限校验，通常<code>authorization</code>的值应该是变化的或者是每个用户都是唯一的，比如oauth2中的<code>access token</code>。当你再次访问之前的资源<a href="http://localhost:4200/secret" rel="nofollow noreferrer" target="_blank">http://localhost:4200/secret</a>可以看到，报错了，提示无权访问。如下截图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005720345" src="https://static.alili.tech/img/remote/1460000005720345" alt="无权访问" title="无权访问" style="cursor: pointer; display: inline;"></span></p>
<p>显然这样的校验是没啥意义的，那么如果你也想模拟Oauth2也生成一个唯一的<code>access token</code>，你可以请求之前首先获取一个<code>access token</code>。但是这个<code>access token</code>不是随便就能获取的，需要通过登录成功后才能获取到。下面加入模拟登录的程序。仍然是修改<code>server/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 登录
app.post('/api/login', function(req, res) {
    //判断用户名和密码是否正确，这里就直接判断字符串了，实际中通常是通过查询数据去判断登录的用户是否存在
    if (req.body.username === 'blog.ddlisting.com'
      &amp;&amp; req.body.password === 'yes') {
          res.send({ access_token: 'BLOG.DDLISTING.COM' });
      } else {
          res.status(400).send({ error: '获取token错误！' });
      }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 登录</span>
app.post(<span class="hljs-string">'/api/login'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">//判断用户名和密码是否正确，这里就直接判断字符串了，实际中通常是通过查询数据去判断登录的用户是否存在</span>
    <span class="hljs-keyword">if</span> (req.body.username === <span class="hljs-string">'blog.ddlisting.com'</span>
      &amp;&amp; req.body.password === <span class="hljs-string">'yes'</span>) {
          res.send({ <span class="hljs-attr">access_token</span>: <span class="hljs-string">'BLOG.DDLISTING.COM'</span> });
      } <span class="hljs-keyword">else</span> {
          res.status(<span class="hljs-number">400</span>).send({ <span class="hljs-attr">error</span>: <span class="hljs-string">'获取token错误！'</span> });
      }
});</code></pre>
<p>有了后端的服务之后显然我们需要在前端增加一个登录的表单，提供用户登录并且登录成功之后还要把获取到的<code>access_token</code>保存好，在发送请求的时候设置到请求的头。这个时候就需要用到<code>service</code>了！！</p>
<h3 id="articleHeader4">登录</h3>
<h4>登录表单</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/templates/login.hbs 登录"}}"
"{{"login-page"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/templates/login.hbs 登录"}}"
"{{"login-page"}}"</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/templates/components/login-page.hbs 登录表单"}}"

"{{"link-to '点击查看有权才能访问的资源' ’secret"}}"

<h2>登录</h2>
<p>
    默认的用户名和密码为：blog.ddlisting.com/yes
</p>

<form class=&quot;&quot; method=&quot;post&quot; "{{"action 'authenticate' on='submit'"}}">
    "{{"input type=&quot;text&quot; value=username placeholder='blog.ddlisting.com'"}}"
    "{{"input type=&quot;password&quot; value=password placeholder=&quot;密码&quot;"}}"
    <br>
    <button type=&quot;submit&quot;>登录</button>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/templates/components/login-page.hbs 登录表单"}}"

"{{"link-to '点击查看有权才能访问的资源' ’secret"}}"

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    默认的用户名和密码为：blog.ddlisting.com/yes
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">authenticate</span>' <span class="hljs-attr">on</span>=<span class="hljs-string">'submit'</span>"}}"&gt;</span>
    "{{"input type="text" value=username placeholder='blog.ddlisting.com'"}}"
    "{{"input type="password" value=password placeholder="密码""}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h4>登录处理</h4>
<p>在组件类中添加处理登录的action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/components/login-page.js

import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service(),  //注入servi'auth-manager'ce
    actions: {
        authenticate() {
            const { username, password } = this.getProperties('username', 'password');
            //调用service类中的authenticate方法校验登录的用户
            this.get('authManager').authenticate(username, password),then(() => {
                console.log('登录成功');
            }, (err) => {
                console.log('登录失败');
            });
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/components/login-page.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Component.extend({
    <span class="hljs-attr">authManager</span>: Ember.inject.service(),  <span class="hljs-comment">//注入servi'auth-manager'ce</span>
    actions: {
        authenticate() {
            <span class="hljs-keyword">const</span> { username, password } = <span class="hljs-keyword">this</span>.getProperties(<span class="hljs-string">'username'</span>, <span class="hljs-string">'password'</span>);
            <span class="hljs-comment">//调用service类中的authenticate方法校验登录的用户</span>
            <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'authManager'</span>).authenticate(username, password),then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'登录成功'</span>);
            }, (err) =&gt; {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'登录失败'</span>);
            });
        }
    }
});</code></pre>
<p>在这个类中使用了<code>service</code>类，并且调用此类中的<code>authenticate</code>方法。代码中的属性<code>authManager</code>就是一个<code>service</code>实例。下面定义<code>service</code>类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g service auth-manager" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">ember g service auth-manager</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/serivces/auth-manager.js

import Ember from 'ember';

export default Ember.Service.extend({
    accessToken: null,

    // 判断accessToken是否是空
    isAuthenticated: Ember.computed.bool('accessToken'),

    // 发起请求校验登录用户
    authenticate(username, password) {
        return Ember.$.ajax({
            method: 'post',
            url: '/api/login',
            data: { username: username, password: password }
        }).then((res) => {
            // 设置返回的access_token到service类的属性中
            this.set('accessToken', res.access_token);
        }, (err) => {
            //登录失败
        });
    },
    invalidate() {
        this.set('accessToken', null);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/serivces/auth-manager.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Service.extend({
    <span class="hljs-attr">accessToken</span>: <span class="hljs-literal">null</span>,

    <span class="hljs-comment">// 判断accessToken是否是空</span>
    isAuthenticated: Ember.computed.bool(<span class="hljs-string">'accessToken'</span>),

    <span class="hljs-comment">// 发起请求校验登录用户</span>
    authenticate(username, password) {
        <span class="hljs-keyword">return</span> Ember.$.ajax({
            <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/login'</span>,
            <span class="hljs-attr">data</span>: { <span class="hljs-attr">username</span>: username, <span class="hljs-attr">password</span>: password }
        }).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
            <span class="hljs-comment">// 设置返回的access_token到service类的属性中</span>
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'accessToken'</span>, res.access_token);
        }, (err) =&gt; {
            <span class="hljs-comment">//登录失败</span>
        });
    },
    invalidate() {
        <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'accessToken'</span>, <span class="hljs-literal">null</span>);
    }
});</code></pre>
<p>在组件类<code>login-page.js</code>中并没有直接发请求校验用户是否登录成功，而是通过调用<code>serivce</code>类的方法去校验，目的是为了把返回的值保存到<code>service</code>的属性中，这也是利用它的特性。方法<code>invalidate</code>的目的是执行退出登录操作，把保存到<code>service</code>属性中的值置空，使得计算属性<code>isAuthenticated</code>返回<code>false</code>。</p>
<p>一切都定义好了下面就是如何使用这个<code>service</code>属性了！修改适配器的代码，在请求头中加入<code>accessToken</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';

// 不使用默认适配器JSONAPIAdapter，而是使用RESTAdapter
export default DS.RESTAdapter.extend({
    namespace: 'api',  //访问请求前缀： http://localhost:4200/api/codes
    // 加入请求头
    authManager: Ember.inject.service('auth-manager'),
    headers: Ember.computed('authManager.accessToken', function() {
        //动态返回accessToken的值
        return {
            'authorization': `${this.get('authManager.accessToken')}`
        };
    })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// import JSONAPIAdapter from 'ember-data/adapters/json-api';</span>
<span class="hljs-keyword">import</span> DS <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data'</span>;

<span class="hljs-comment">// 不使用默认适配器JSONAPIAdapter，而是使用RESTAdapter</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DS.RESTAdapter.extend({
    <span class="hljs-attr">namespace</span>: <span class="hljs-string">'api'</span>,  <span class="hljs-comment">//访问请求前缀： http://localhost:4200/api/codes</span>
    <span class="hljs-comment">// 加入请求头</span>
    authManager: Ember.inject.service(<span class="hljs-string">'auth-manager'</span>),
    <span class="hljs-attr">headers</span>: Ember.computed(<span class="hljs-string">'authManager.accessToken'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//动态返回accessToken的值</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-string">'authorization'</span>: <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.get(<span class="hljs-string">'authManager.accessToken'</span>)}</span>`</span>
        };
    })
});</code></pre>
<p>到此代码基本写完了，为了处理服务端返回的错误直接在<code>application</code>路由中拦截<code>error</code>事件，在这个事件中处理错误的情况。<br><strong>说明</strong>：所有的子路由的<code>error</code>事件都会自动冒泡到路由<code>application</code>的<code>error</code>事件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        // 处理所有的error事件
        error(reason, transition) {
            //如果出现错误直接转到登录界面
            this.transitionTo('login');
            return false;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/routes/application.js</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Route.extend({
    <span class="hljs-attr">actions</span>: {
        <span class="hljs-comment">// 处理所有的error事件</span>
        error(reason, transition) {
            <span class="hljs-comment">//如果出现错误直接转到登录界面</span>
            <span class="hljs-keyword">this</span>.transitionTo(<span class="hljs-string">'login'</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
});</code></pre>
<p>项目重启完毕(是手动终止在启动，否则会出现service未定义的情况)之后可以看到界面直接跳转到了登录页面，实现了简单的权限拦截（无权先登录）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005720347" src="https://static.alili.tech/img/remote/1460000005720347" alt="登录" title="登录" style="cursor: pointer;"></span></p>
<p><strong>未登录直接点击链接“点击查看有权才能访问的资源”效果</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005720349" src="https://static.alili.tech/img/remote/1460000005720349" alt="未登录直接点击链接“点击查看有权才能访问的资源”效果截图" title="未登录直接点击链接“点击查看有权才能访问的资源”效果截图" style="cursor: pointer;"></span></p>
<p>可以看到浏览器控制台打印信息显示资源无权访问，返回的代码是<code>403</code>。</p>
<p>输入错误的用户名或密码的情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005720351" src="https://static.alili.tech/img/remote/1460000005720351" alt="用户名密码错误" title="用户名密码错误" style="cursor: pointer; display: inline;"></span></p>
<p><strong>登录成功再访问授权资源</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005720353" src="https://static.alili.tech/img/remote/1460000005720353" alt="登录成功再访问授权资源" title="登录成功再访问授权资源" style="cursor: pointer; display: inline;"></span></p>
<p>登录成功之后再点击链接可以正常访问了，并且正确看到后端返回的数据。</p>
<p>即使你点击链接“点击查看有权才能访问的资源”也还是会跳转回登录页面。那么开始测试登录后的效果，在表单中输入正确的用户名和密码。点击登录后跳转到了</p>
<h2 id="articleHeader5">退出</h2>
<p>有登录就会有退出，退出相对简单，只要销毁了service类中的属性<code>accessToken</code>值即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/tempalates/components/secret-page.hbs"}}"
<h1>secret page</h1>

<ul>
    "{{"#each model as |code|"}}"
    <li>
        <strong>"{{"code.description"}}"</strong>
    </li>
    "{{"/each"}}"
</ul>


<br><br>

<button type=&quot;button&quot; "{{"action 'invalidate'"}}">退出</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/tempalates/components/secret-page.hbs"}}"
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>secret page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    "{{"#each model as |code|"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>"{{"code.description"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    "{{"/each"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">invalidate</span>'"}}"&gt;</span>退出<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/components/secret-page.js
import Ember from 'ember';

export default Ember.Component.extend({
    //注入service
    authManager: Ember.inject.service('auth-manager'),

    actions: {
        invalidate() {
            this.get('authManager').invalidate();  //退出登录状态
            //暂时粗暴处理，直接强制刷新，重新进入application路由触发error事件，再次判断是否登录
            location.reload();
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/components/secret-page.js</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Component.extend({
    <span class="hljs-comment">//注入service</span>
    authManager: Ember.inject.service(<span class="hljs-string">'auth-manager'</span>),

    <span class="hljs-attr">actions</span>: {
        invalidate() {
            <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'authManager'</span>).invalidate();  <span class="hljs-comment">//退出登录状态</span>
            <span class="hljs-comment">//暂时粗暴处理，直接强制刷新，重新进入application路由触发error事件，再次判断是否登录</span>
            location.reload();
        }
    }
});</code></pre>
<p>对于退出事件的处理就比较简单粗暴了，直接刷新页面，由于属性<code>authManager</code>的值已经设置为<code>null</code>所以发起请求的时候是无权限的会再次触发<code>error</code>事件，然后跳转到登录页面。</p>
<p>到这里，基本上实现了一个简单的权限控制功能。例子比较简单，但是处理的思路大体上是这样做的，能实现这样的功能是基于<code>service</code>类的特性。也希望读者能通过本例理解懂得如何使用<code>service</code>。</p>
<p>项目代码：<a href="https://github.com/ubuntuvim/secretcodez" rel="nofollow noreferrer" target="_blank">https://github.com/ubuntuvim/secretcodez</a>，有疑问欢迎给我留言。<br>您的支持是我继续写作的最大动力，谢谢！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用service实现登录、权限控制

## 原文链接
[https://segmentfault.com/a/1190000005720340](https://segmentfault.com/a/1190000005720340)


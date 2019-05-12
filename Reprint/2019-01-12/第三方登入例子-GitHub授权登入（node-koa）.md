---
title: '第三方登入例子-GitHub授权登入（node-koa）' 
date: 2019-01-12 2:30:25
hidden: true
slug: bzaykvq260u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>第三方登入太常见了，微信，微博，QQ...总有一个你用过。当然看这篇文章的你，应该还用过github登入。这篇分享是在上一篇<a href="https://segmentfault.com/a/1190000009470011">基于node的登入例子（node-koa-mongoose）</a>的基础增加了github账号第三方授权登入功能，如果有些代码，这篇中美介绍，你可以先去看下上一篇的分享。</p>
<p><strong>本项目源码地址</strong>：<a href="https://github.com/linwalker/node-login" rel="nofollow noreferrer" target="_blank">https://github.com/linwalker/...</a></p>
<h2 id="articleHeader1">第三方登入</h2>
<p>第三方登入主要基于OAuth 2.0。OAuth协议为用户资源的授权提供了一个安全的、开放而又简易的标准。与以往的授权方式不同之处是OAUTH的授权不会使第三方触及到用户的帐号信息（如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，因此OAUTH是安全的 ---- 百度百科</p>
<p>更详细的介绍可以看这篇文章<a href="http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" rel="nofollow noreferrer" target="_blank">理解OAuth 2.0</a></p>
<h2 id="articleHeader2">github 授权登入</h2>
<h3 id="articleHeader3">原理过程</h3>
<p>先来大致了解下第三方通过GitHub账号授权登入的过程，具体实现结合后面代码讲解</p>
<ul>
<li>
<p>1.获取code</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第三方客户端向`https://github.com/login/oauth/authorize`发送get请求，带上`?client_id=XXXXXX`参数，这时会跳转到GitHub登入页面，授权后GitHub会向客户端返回`https://redirect_url?code=XXXXXX`。其中`client_id`和`redirect_url`是第三方事先在GitHub平台上配置好的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>第三方客户端向`<span class="javascript">https:<span class="hljs-comment">//github.com/login/oauth/authorize</span></span>`发送get请求，带上`<span class="javascript">?client_id=XXXXXX</span>`参数，这时会跳转到GitHub登入页面，授权后GitHub会向客户端返回`<span class="javascript">https:<span class="hljs-comment">//redirect_url?code=XXXXXX</span></span>`。其中`<span class="javascript">client_id</span>`和`<span class="javascript">redirect_url</span>`是第三方事先在GitHub平台上配置好的。
</code></pre>
</li>
<li>
<p>2.通过code获取access_token</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="客户端处理`https://redirect_url?code=XXXXXX`请求，获取code值，向`https://github.com/login/oauth/access_token`发起post请求，请求参数为`client_di`,`client_secret`和`code`。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code><span class="hljs-symbol">客户端处理`https://redirect_url?code=XXXXXX`请求，获取code值，向`https:</span>//github.com/login/oauth/access_token`发起post请求，请求参数为`client_di`,`client_secret`和`code`。
</code></pre>
</li>
<li><p>3.通过access_token获取用户GitHub账号信息</p></li>
</ul>
<p>第二步的请求会返回这样<code>access_token=d0686dc49a22d64e77402db072b719f510f22421&amp;scope=user&amp;token_type=bearer</code>的内容，拿到access_token只需要向<code>https://api.github.com/user?access_token=xxx</code>发送GET请求，即可获取到登录用户的基本信息，</p>
<h3 id="articleHeader4">具体实现</h3>
<h4>GitHub注册应用</h4>
<p>首先你要有一个GitHub账号，然后进入settings -&gt; OAuth application -&gt; Register a new application。进来后你会看到下面这个页面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722477" src="https://static.alili.tech/img/remote/1460000009722477" alt="应用注册(github-login).png" title="应用注册(github-login).png" style="cursor: pointer; display: inline;"></span></p>
<p>依次填好应用名称，应用地址和授权回掉地址后点击<code>Register application</code>按钮，会生成一个<code>client Id</code>和<code>client Secret</code>，用于后面向GitHub发送请求传参。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722478?w=763&amp;h=423" src="https://static.alili.tech/img/remote/1460000009722478?w=763&amp;h=423" alt="生成ID和Secret(github-login).png" title="生成ID和Secret(github-login).png" style="cursor: pointer; display: inline;"></span></p>
<h4>Github授权请求（获取code）</h4>
<p>在页面中添加GitHub登入跳转按钮，并在路由中对跳转请求进行转发处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在node-login/components/LoginTab.js

<a href=&quot;/github/login&quot;>
     <Icon type=&quot;github&quot; style="{{"fontSize: 20, color: '#000'"}}"/>
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//在node-login/components/LoginTab.js</span>

&lt;a href=<span class="hljs-string">"/github/login"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"github"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"fontSize:</span> <span class="hljs-attr">20</span>, <span class="hljs-attr">color:</span> '#<span class="hljs-attr">000</span>'"}}"/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722479?w=349&amp;h=361" src="https://static.alili.tech/img/remote/1460000009722479?w=349&amp;h=361" alt="点击登入(github-login).png" title="点击登入(github-login).png" style="cursor: pointer;"></span></p>
<p>添加跳转按钮后，增加相应路由处理,路由入口中添加／github路径处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在node-login/routes/index.js

const github = require('./github');
router.use('/github', github.routes(), github.allowedMethods());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//在node-login/routes/index.js</span>

<span class="hljs-keyword">const</span> github = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./github'</span>);
router.use(<span class="hljs-string">'/github'</span>, github.routes(), github.allowedMethods());</code></pre>
<p>最后是具体的路由处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在node-login/routes/github.js
const config = require('../config');
const router = require('koa-router')();
const fetch = require('node-fetch');
const routers = router
    .get('/login', async (ctx) => {
        var dataStr = (new Date()).valueOf();
        //重定向到认证接口,并配置参数
        var path = &quot;https://github.com/login/oauth/authorize&quot;;
        path += '?client_id=' + config.client_id;
        path += '&amp;scope=' + config.scope;
        path += '&amp;state=' + dataStr;
        //转发到授权服务器
        ctx.redirect(path);
    })
module.exports = routers;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//在node-login/routes/github.js</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>);
<span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)();
<span class="hljs-keyword">const</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);
<span class="hljs-keyword">const</span> routers = router
    .get(<span class="hljs-string">'/login'</span>, <span class="hljs-keyword">async</span> (ctx) =&gt; {
        <span class="hljs-keyword">var</span> dataStr = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).valueOf();
        <span class="hljs-comment">//重定向到认证接口,并配置参数</span>
        <span class="hljs-keyword">var</span> path = <span class="hljs-string">"https://github.com/login/oauth/authorize"</span>;
        path += <span class="hljs-string">'?client_id='</span> + config.client_id;
        path += <span class="hljs-string">'&amp;scope='</span> + config.scope;
        path += <span class="hljs-string">'&amp;state='</span> + dataStr;
        <span class="hljs-comment">//转发到授权服务器</span>
        ctx.redirect(path);
    })
<span class="hljs-built_in">module</span>.exports = routers;</code></pre>
<p>在config中事先添加配置请求所需参数<code>client_id</code>，<code>client_secret</code>和<code>scope</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    'database': 'mongodb://localhost:27017/node-login',
    'client_id': '83b21756e93d6ce27075',
    'client_secret': 'd87c4163ece5695a9ded1e8bf2701c5ee2651f28',
    'scope': ['user'],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-string">'database'</span>: <span class="hljs-string">'mongodb://localhost:27017/node-login'</span>,
    <span class="hljs-string">'client_id'</span>: <span class="hljs-string">'83b21756e93d6ce27075'</span>,
    <span class="hljs-string">'client_secret'</span>: <span class="hljs-string">'d87c4163ece5695a9ded1e8bf2701c5ee2651f28'</span>,
    <span class="hljs-string">'scope'</span>: [<span class="hljs-string">'user'</span>],
};</code></pre>
<p>其中scope参数可选。就是你期待你的应用需要调用Github哪些信息，可以填写多个，以逗号分割，比如：scope=user,public_repo。state参数非必需，用于防治跨域伪造请求攻击。</p>
<p>现在可以运行一下项目，点击小黑猫，跳转到授权登入页面（没登入过，要输入账号密码），授权成功返回回掉地址。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722480?w=563&amp;h=571" src="https://static.alili.tech/img/remote/1460000009722480?w=563&amp;h=571" alt="授权(github-login).png" title="授权(github-login).png" style="cursor: pointer; display: inline;"></span></p>
<p>回掉地址中<code>code</code>就是返回的授权码，通过授权码再去获取令牌<code>access_token</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722481?w=861&amp;h=93" src="https://static.alili.tech/img/remote/1460000009722481?w=861&amp;h=93" alt="授权回掉(github-login).png" title="授权回掉(github-login).png" style="cursor: pointer; display: inline;"></span></p>
<h4>授权回掉处理（获取access_token）</h4>
<p>在第一步授权请求<code>https://github.com/login/oauth/authorize</code>成功后GitHub会给应用返回一个回掉<code>http://localhost:3003/github/oauth/callback?code=14de2c737aa02037132d&amp;state=1496989988474</code>。这个回掉地址就是之前在GitHub注册应用时填入的回掉地址，另外还带了需要的code参数，state就是上一步请求中带的state参数，原样返回。</p>
<p>现在我们要对这个回掉请求进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//node-login/routes/github.js
const config = require('../config');
const router = require('koa-router')();
const fetch = require('node-fetch');
const routers = router
    .get('/login', async (ctx) => {
        ...
    })
    .get('/oauth/callback', async (ctx) => {
        const code = ctx.query.code;
        let path = 'https://github.com/login/oauth/access_token';
        const params = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code
        }
        console.log(code);
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(res => {
            return res.text();
        })
        .then(body => {
            ctx.body = body;
        })
       .catch(e => {
            console.log(e);
        })
    })
module.exports = routers;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//node-login/routes/github.js</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>);
<span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)();
<span class="hljs-keyword">const</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);
<span class="hljs-keyword">const</span> routers = router
    .get(<span class="hljs-string">'/login'</span>, <span class="hljs-keyword">async</span> (ctx) =&gt; {
        ...
    })
    .get(<span class="hljs-string">'/oauth/callback'</span>, <span class="hljs-keyword">async</span> (ctx) =&gt; {
        <span class="hljs-keyword">const</span> code = ctx.query.code;
        <span class="hljs-keyword">let</span> path = <span class="hljs-string">'https://github.com/login/oauth/access_token'</span>;
        <span class="hljs-keyword">const</span> params = {
            <span class="hljs-attr">client_id</span>: config.client_id,
            <span class="hljs-attr">client_secret</span>: config.client_secret,
            <span class="hljs-attr">code</span>: code
        }
        <span class="hljs-built_in">console</span>.log(code);
        <span class="hljs-keyword">await</span> fetch(path, {
            <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
            },
            <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify(params)
        })
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> res.text();
        })
        .then(<span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> {
            ctx.body = body;
        })
       .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(e);
        })
    })
<span class="hljs-built_in">module</span>.exports = routers;</code></pre>
<p>GitHub返回回掉地址时，先拿到请求中的code参数，然后向<code>https://github.com/login/oauth/access_token</code>发送post请求并带上<code>client_id,client_secret,code</code>参数，请求成功后会返回带有access_token的信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722482?w=796&amp;h=89" src="https://static.alili.tech/img/remote/1460000009722482?w=796&amp;h=89" alt="access_token(github-login).png" title="access_token(github-login).png" style="cursor: pointer;"></span></p>
<h4>获取GitHub账号信息</h4>
<p>最后带上获取的<code>access_token</code>请求<code>https://api.github.com/user?access_token=xxx</code>,返回的就是之前scope中对应的账号信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".get('/oauth/callback', async (ctx) => {
        const code = ctx.query.code;
        let path = 'https://github.com/login/oauth/access_token';
        const params = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code
        }
        console.log(code);
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(res => {
            return res.text();
        })
        .then(body => {
            const args = body.split('&amp;');
            let arg = args[0].split('=');
            const access_token = arg[1];
            console.log(body);
            console.log(access_token);
            return access_token;
        })
        .then(async(token) => {
            const url = ' https://api.github.com/user?access_token=' + token;
            console.log(url);
            await fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log(res);
                    ctx.body = res;
                })
        })
        .catch(e => {
            console.log(e);
        })
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">.get(<span class="hljs-string">'/oauth/callback'</span>, <span class="hljs-keyword">async</span> (ctx) =&gt; {
        <span class="hljs-keyword">const</span> code = ctx.query.code;
        <span class="hljs-keyword">let</span> path = <span class="hljs-string">'https://github.com/login/oauth/access_token'</span>;
        <span class="hljs-keyword">const</span> params = {
            <span class="hljs-attr">client_id</span>: config.client_id,
            <span class="hljs-attr">client_secret</span>: config.client_secret,
            <span class="hljs-attr">code</span>: code
        }
        <span class="hljs-built_in">console</span>.log(code);
        <span class="hljs-keyword">await</span> fetch(path, {
            <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>
            },
            <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify(params)
        })
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> res.text();
        })
        .then(<span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> args = body.split(<span class="hljs-string">'&amp;'</span>);
            <span class="hljs-keyword">let</span> arg = args[<span class="hljs-number">0</span>].split(<span class="hljs-string">'='</span>);
            <span class="hljs-keyword">const</span> access_token = arg[<span class="hljs-number">1</span>];
            <span class="hljs-built_in">console</span>.log(body);
            <span class="hljs-built_in">console</span>.log(access_token);
            <span class="hljs-keyword">return</span> access_token;
        })
        .then(<span class="hljs-keyword">async</span>(token) =&gt; {
            <span class="hljs-keyword">const</span> url = <span class="hljs-string">' https://api.github.com/user?access_token='</span> + token;
            <span class="hljs-built_in">console</span>.log(url);
            <span class="hljs-keyword">await</span> fetch(url)
                .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                    <span class="hljs-keyword">return</span> res.json();
                })
                .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(res);
                    ctx.body = res;
                })
        })
        .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(e);
        })
    })</code></pre>
<p>返回的用户信息如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722483?w=863&amp;h=399" src="https://static.alili.tech/img/remote/1460000009722483?w=863&amp;h=399" alt="user_info(github-login).png" title="user_info(github-login).png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">总结</h3>
<p>用一张图来总结</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009722484?w=847&amp;h=555" src="https://static.alili.tech/img/remote/1460000009722484?w=847&amp;h=555" alt="原理过程(github-login).png" title="原理过程(github-login).png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
第三方登入例子-GitHub授权登入（node-koa）

## 原文链接
[https://segmentfault.com/a/1190000009722474](https://segmentfault.com/a/1190000009722474)


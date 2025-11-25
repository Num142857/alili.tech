---
title: 'connect-history-api-fallback分析' 
date: 2019-01-29 2:30:10
hidden: true
slug: 32tudf93d15
categories: [reprint]
---

{{< raw >}}

                    
<p>研究下connect-history-api-fallback v1.3.0，地址：<a href="https://github.com/bripkens/connect-history-api-fallback" rel="nofollow noreferrer" target="_blank">https://github.com/bripkens/c...</a>，当然它也可以作为express的中间件使用</p>
<p>README中介绍的很清楚</p>
<blockquote>
<p>Single Page Applications (SPA) typically only utilise one index file that is accessible by web browsers: usually index.html. Navigation in the application is then commonly handled using JavaScript with the help of the HTML5 History API. This results in issues when the user hits the refresh button or is directly accessing a page other than the landing page, e.g. /help or /help/online as the web server bypasses the index file to locate the file at this location. As your application is a SPA, the web server will fail trying to retrieve the file and return a 404 - Not Found message to the user.</p>
<p>This tiny middleware addresses some of the issues. Specifically, it will change the requested location to the index you specify (default being /index.html) whenever there is a request which fulfills the following criteria:</p>
<ol>
<li><p>The request is a GET request</p></li>
<li><p>which accepts text/html,</p></li>
<li><p>is not a direct file request, i.e. the requested path does not contain a . (DOT) character and</p></li>
<li><p>does not match a pattern provided in options.rewrites (see options below)</p></li>
</ol>
</blockquote>
<h4>解释一下：</h4>
<p>server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')

const express = require('express')
const router = express.Router()

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index', {
    title: '首页'
  })
})

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'html')
app.engine('html', ejs.__express)

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(history({
  rewrites: [
    { from: /^\/abc$/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(9090, '127.0.0.1', () => {
  console.log('ther server is running at port ' + 9090)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> router = express.Router()

<span class="hljs-keyword">const</span> indexRoute = router.get(<span class="hljs-string">'/'</span>, (req, res) =&gt; {
  res.status(<span class="hljs-number">200</span>).render(<span class="hljs-string">'index'</span>, {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'首页'</span>
  })
})

app.set(<span class="hljs-string">'views'</span>, path.join(__dirname, <span class="hljs-string">'templates'</span>))
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'html'</span>)
app.engine(<span class="hljs-string">'html'</span>, ejs.__express)

app.use(<span class="hljs-string">'/static'</span>, express.static(path.join(__dirname, <span class="hljs-string">'public'</span>)))

app.use(history({
  <span class="hljs-attr">rewrites</span>: [
    { <span class="hljs-attr">from</span>: <span class="hljs-regexp">/^\/abc$/</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">'/'</span> }
  ]
}))

app.get(<span class="hljs-string">'/'</span>, indexRoute)

app.use(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.status(<span class="hljs-number">404</span>).send(<span class="hljs-string">'File not found!'</span>)
})

app.listen(<span class="hljs-number">9090</span>, <span class="hljs-string">'127.0.0.1'</span>, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ther server is running at port '</span> + <span class="hljs-number">9090</span>)
})</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;test&quot;>
  <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(VueRouter)

var s = '<div><router-link to=&quot;/foo&quot;>Go to Foo</router-link> - <router-link to=&quot;/bar&quot;>Go to Bar</router-link> - <router-link to=&quot;/&quot;>Go to Home</router-link></div>'

var Home =  { template: '<div>' + s + '<div>home</div>' + '</div>', created: function() { console.log('home') } }
var Foo = { template: '<div>' + s + '<div>foo</div>' + '</div>', created: function() { console.log('foo') "}}"
var Bar = { template: '<div>' + s + '<div>bar</div>' + '</div>', created: function() { console.log('bar') "}}"
var NotFoundComponent = { template: '<div>' + s + '<div>not found</div>' + '</div>', created: function() { console.log('not found') "}}"

var routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', component: NotFoundComponent }
]

var router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router: router
}).$mount('#test')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.use(VueRouter)

<span class="hljs-keyword">var</span> s = <span class="hljs-string">'&lt;div&gt;&lt;router-link to="/foo"&gt;Go to Foo&lt;/router-link&gt; - &lt;router-link to="/bar"&gt;Go to Bar&lt;/router-link&gt; - &lt;router-link to="/"&gt;Go to Home&lt;/router-link&gt;&lt;/div&gt;'</span>

<span class="hljs-keyword">var</span> Home =  { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;'</span> + s + <span class="hljs-string">'&lt;div&gt;home&lt;/div&gt;'</span> + <span class="hljs-string">'&lt;/div&gt;'</span>, <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'home'</span>) } }
<span class="hljs-keyword">var</span> Foo = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;'</span> + s + <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> + <span class="hljs-string">'&lt;/div&gt;'</span>, <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'foo'</span>) "}}"
<span class="hljs-keyword">var</span> Bar = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;'</span> + s + <span class="hljs-string">'&lt;div&gt;bar&lt;/div&gt;'</span> + <span class="hljs-string">'&lt;/div&gt;'</span>, <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar'</span>) "}}"
<span class="hljs-keyword">var</span> NotFoundComponent = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;'</span> + s + <span class="hljs-string">'&lt;div&gt;not found&lt;/div&gt;'</span> + <span class="hljs-string">'&lt;/div&gt;'</span>, <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'not found'</span>) "}}"

<span class="hljs-keyword">var</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: Home },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/foo'</span>, <span class="hljs-attr">component</span>: Foo },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/bar'</span>, <span class="hljs-attr">component</span>: Bar },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">component</span>: NotFoundComponent }
]

<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: routes
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">router</span>: router
}).$mount(<span class="hljs-string">'#test'</span>)</code></pre>
<p>比如我使用vue-router, 访问<a href="http://localhost:9090" rel="nofollow noreferrer" target="_blank">http://localhost:9090</a>，发现显示home，点击Go to Foo，显示foo，地址栏变为<a href="http://localhost:9090/foo" rel="nofollow noreferrer" target="_blank">http://localhost:9090/foo</a>，一切正常，ok<br>这时候刷新当前页面(ctrl+R或ctrl+command+R或点击浏览器的刷新按钮或在地址栏上再敲一下回车)，发现404了哦<br>vue-router文档针对这种情况做了很好的解释:</p>
<blockquote><p>Not to worry: To fix the issue, all you need to do is add a simple catch-all fallback route to your server. If the URL doesn't match any static assets, it should serve the same index.html page that your app lives in. Beautiful, again!</p></blockquote>
<p>如果express server使用了connect-history-api-fallback middleware，在你定义router的前面app.use(history({ rewrites: [ { from: /^/abc$/, to: '/' } ] }))一下</p>
<p>再刷新页面，发现地址仍然<a href="http://localhost:9090/foo" rel="nofollow noreferrer" target="_blank">http://localhost:9090/foo</a>，然而走进了咱们的前端路由，chrome控制台显示了foo，真的是beautiful again</p>
<p>其实过程也很简单啦，请求/foo，走到了咱们的history-api-fallback中间件，然后他看你没有rewrite，那么好，我把req.url改成'/'，于是vue-router发现地址/foo，所以根据routes的map，渲染了Foo组件</p>
<p>但是万一有人输入地址/abc，怎么办? vue-router定义了{ path: '*', component: NotFoundComponent }用来catch-all route within your Vue app to show a 404 page</p>
<blockquote><p>Alternatively, if you are using a Node.js server, you can implement the fallback by using the router on the server side to match the incoming URL and respond with 404 if no route is matched.</p></blockquote>
<ol>
<li><p>地址输入/abc，回车，走到vue-router，会显示not found</p></li>
<li><p>地址输入/xyz，回车，走到服务端路由，http状态为404，然后显示File not found!</p></li>
</ol>
<h3 id="articleHeader0">source code 分析</h3>
<p>贴下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

var url = require('url');

exports = module.exports = function historyApiFallback(options) {
  options = options || {};
  var logger = getLogger(options);

  return function(req, res, next) {
    var headers = req.headers;
    if (req.method !== 'GET') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the method is not GET.'
      );
      return next();
    } else if (!headers || typeof headers.accept !== 'string') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client did not send an HTTP accept header.'
      );
      return next();
    } else if (headers.accept.indexOf('application/json') === 0) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client prefers JSON.'
      );
      return next();
    } else if (!acceptsHtml(headers.accept, options)) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client does not accept HTML.'
      );
      return next();
    }

    var parsedUrl = url.parse(req.url);
    var rewriteTarget;
    options.rewrites = options.rewrites || [];
    for (var i = 0; i < options.rewrites.length; i++) {
      var rewrite = options.rewrites[i];
      var match = parsedUrl.pathname.match(rewrite.from);
      if (match !== null) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to);
        logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
        req.url = rewriteTarget;
        return next();
      }
    }

    if (parsedUrl.pathname.indexOf('.') !== -1 &amp;&amp;
        options.disableDotRule !== true) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the path includes a dot (.) character.'
      );
      return next();
    }

    rewriteTarget = options.index || '/index.html';
    logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
    req.url = rewriteTarget;
    next();
  };
};

function evaluateRewriteRule(parsedUrl, match, rule) {
  if (typeof rule === 'string') {
    return rule;
  } else if (typeof rule !== 'function') {
    throw new Error('Rewrite rule can only be of type string of function.');
  }

  return rule({
    parsedUrl: parsedUrl,
    match: match
  });
}

function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getLogger(options) {
  if (options &amp;&amp; options.logger) {
    return options.logger;
  } else if (options &amp;&amp; options.verbose) {
    return console.log.bind(console);
  }
  return function(){};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">var</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

exports = <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">historyApiFallback</span>(<span class="hljs-params">options</span>) </span>{
  options = options || {};
  <span class="hljs-keyword">var</span> logger = getLogger(options);

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">var</span> headers = req.headers;
    <span class="hljs-keyword">if</span> (req.method !== <span class="hljs-string">'GET'</span>) {
      logger(
        <span class="hljs-string">'Not rewriting'</span>,
        req.method,
        req.url,
        <span class="hljs-string">'because the method is not GET.'</span>
      );
      <span class="hljs-keyword">return</span> next();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!headers || <span class="hljs-keyword">typeof</span> headers.accept !== <span class="hljs-string">'string'</span>) {
      logger(
        <span class="hljs-string">'Not rewriting'</span>,
        req.method,
        req.url,
        <span class="hljs-string">'because the client did not send an HTTP accept header.'</span>
      );
      <span class="hljs-keyword">return</span> next();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (headers.accept.indexOf(<span class="hljs-string">'application/json'</span>) === <span class="hljs-number">0</span>) {
      logger(
        <span class="hljs-string">'Not rewriting'</span>,
        req.method,
        req.url,
        <span class="hljs-string">'because the client prefers JSON.'</span>
      );
      <span class="hljs-keyword">return</span> next();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!acceptsHtml(headers.accept, options)) {
      logger(
        <span class="hljs-string">'Not rewriting'</span>,
        req.method,
        req.url,
        <span class="hljs-string">'because the client does not accept HTML.'</span>
      );
      <span class="hljs-keyword">return</span> next();
    }

    <span class="hljs-keyword">var</span> parsedUrl = url.parse(req.url);
    <span class="hljs-keyword">var</span> rewriteTarget;
    options.rewrites = options.rewrites || [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.rewrites.length; i++) {
      <span class="hljs-keyword">var</span> rewrite = options.rewrites[i];
      <span class="hljs-keyword">var</span> match = parsedUrl.pathname.match(rewrite.from);
      <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to);
        logger(<span class="hljs-string">'Rewriting'</span>, req.method, req.url, <span class="hljs-string">'to'</span>, rewriteTarget);
        req.url = rewriteTarget;
        <span class="hljs-keyword">return</span> next();
      }
    }

    <span class="hljs-keyword">if</span> (parsedUrl.pathname.indexOf(<span class="hljs-string">'.'</span>) !== <span class="hljs-number">-1</span> &amp;&amp;
        options.disableDotRule !== <span class="hljs-literal">true</span>) {
      logger(
        <span class="hljs-string">'Not rewriting'</span>,
        req.method,
        req.url,
        <span class="hljs-string">'because the path includes a dot (.) character.'</span>
      );
      <span class="hljs-keyword">return</span> next();
    }

    rewriteTarget = options.index || <span class="hljs-string">'/index.html'</span>;
    logger(<span class="hljs-string">'Rewriting'</span>, req.method, req.url, <span class="hljs-string">'to'</span>, rewriteTarget);
    req.url = rewriteTarget;
    next();
  };
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evaluateRewriteRule</span>(<span class="hljs-params">parsedUrl, match, rule</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> rule === <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">return</span> rule;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> rule !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Rewrite rule can only be of type string of function.'</span>);
  }

  <span class="hljs-keyword">return</span> rule({
    <span class="hljs-attr">parsedUrl</span>: parsedUrl,
    <span class="hljs-attr">match</span>: match
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">acceptsHtml</span>(<span class="hljs-params">header, options</span>) </span>{
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || [<span class="hljs-string">'text/html'</span>, <span class="hljs-string">'*/*'</span>];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.htmlAcceptHeaders.length; i++) {
    <span class="hljs-keyword">if</span> (header.indexOf(options.htmlAcceptHeaders[i]) !== <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLogger</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (options &amp;&amp; options.logger) {
    <span class="hljs-keyword">return</span> options.logger;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options &amp;&amp; options.verbose) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log.bind(<span class="hljs-built_in">console</span>);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVHgOa?w=462&amp;h=223" src="https://static.alili.tech/img/bVHgOa?w=462&amp;h=223" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>getLogger, 默认不输出，options.verbose为true，则默认console.log.bind(console)，但不知道这里bind意义何在 - -，也可以直接传logger，比如debug</p>
<p>如果req.method != 'GET'，灰，结束<br>如果!headers || !headers.accept != 'string' (有这情况?)，灰，结束<br>如果headers.accept.indexOf('application/json') === 0，灰，结束</p>
<p>acceptsHtml函数a判断headers.accept字符串是否含有['text/html', '<em>/</em>']中任意一个<br>当然不够这两个不够你可以自定义到选项options.htmlAcceptHeaders中<br>!acceptsHtml(headers.accept, options)，灰，结束</p>
<p>然后根据你定义的选项rewrites(没定义就相当于跳过了)<br>按定义的数组顺序，字符串依次匹配路由rewrite.from，匹配成功则走rewrite.to，to可以是字符串也可以是函数，绿，结束</p>
<p>判断dot file，即pathname中包含.(点)，并且选项disableDotRule !== true，即没有关闭点文件限制规则，灰，结束<br>那么剩下的情况(parsedUrl.pathname不含点，或者含点但关闭了点文件规则)<br>rewriteTarget = options.index || '/index.html'，绿结束</p>
<p>稍微注意下，他是先匹配自定义rewrites规则，再匹配点文件规则</p>
<h3 id="articleHeader1">测试部分</h3>
<p>用的是nodeunit，具体用法<a href="https://github.com/caolan/nodeunit" rel="nofollow noreferrer" target="_blank">https://github.com/caolan/nod...</a><br>随便看两个测试用例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var sinon = require('sinon');
var historyApiFallback = require('../lib');

var tests = module.exports = {};

var middleware;
var req = null;
var requestedUrl;
var next;

tests.setUp = function(done) {
  middleware = historyApiFallback();
  requestedUrl = '/foo';
  req = {
    method: 'GET',
    url: requestedUrl,
    headers: {
      accept: 'text/html, */*'
    }
  };
  next = sinon.stub();

  done();
};

// ....

tests['should ignore requests that do not accept html'] = function(test) {
  req.headers.accept = 'application/json';
  // 调用middleware
  middleware(req, null, next);
  // 测试req.url是否等于requestedUrl
  test.equal(req.url, requestedUrl);
  // next是否被调用过
  test.ok(next.called);
  // 测试结束
  test.done();
};

// ...

tests['should rewrite requests when the . rule is disabled'] = function(test) {
  req.url = 'js/app.js';
  middleware = historyApiFallback({
    disableDotRule: true
  });
  middleware(req, null, next);
  // 测试req.url是否等于/index.html
  // 因为pathname中有点，且关闭了点规则
  // req.url应该被rewrit成了/index.html
  test.equal(req.url, '/index.html');
  test.ok(next.called);
  test.done();
};

// ...
tests['should test rewrite rules'] = function(test) {
  req.url = '/socer';
  middleware = historyApiFallback({
    rewrites: [
      {from: /\/soccer/, to: '/soccer.html'}
    ]
  });
     
  middleware(req, null, next);
  // 因为没有匹配上rewrites里的规则
  // 而req.url pathname又不含点
  // 所以req.url 倒退到了index.html
  test.equal(req.url, '/index.html');
  test.ok(next.called);
  test.done();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> sinon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'sinon'</span>);
<span class="hljs-keyword">var</span> historyApiFallback = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib'</span>);

<span class="hljs-keyword">var</span> tests = <span class="hljs-built_in">module</span>.exports = {};

<span class="hljs-keyword">var</span> middleware;
<span class="hljs-keyword">var</span> req = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> requestedUrl;
<span class="hljs-keyword">var</span> next;

tests.setUp = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
  middleware = historyApiFallback();
  requestedUrl = <span class="hljs-string">'/foo'</span>;
  req = {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">url</span>: requestedUrl,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-attr">accept</span>: <span class="hljs-string">'text/html, */*'</span>
    }
  };
  next = sinon.stub();

  done();
};

<span class="hljs-comment">// ....</span>

tests[<span class="hljs-string">'should ignore requests that do not accept html'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">test</span>) </span>{
  req.headers.accept = <span class="hljs-string">'application/json'</span>;
  <span class="hljs-comment">// 调用middleware</span>
  middleware(req, <span class="hljs-literal">null</span>, next);
  <span class="hljs-comment">// 测试req.url是否等于requestedUrl</span>
  test.equal(req.url, requestedUrl);
  <span class="hljs-comment">// next是否被调用过</span>
  test.ok(next.called);
  <span class="hljs-comment">// 测试结束</span>
  test.done();
};

<span class="hljs-comment">// ...</span>

tests[<span class="hljs-string">'should rewrite requests when the . rule is disabled'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">test</span>) </span>{
  req.url = <span class="hljs-string">'js/app.js'</span>;
  middleware = historyApiFallback({
    <span class="hljs-attr">disableDotRule</span>: <span class="hljs-literal">true</span>
  });
  middleware(req, <span class="hljs-literal">null</span>, next);
  <span class="hljs-comment">// 测试req.url是否等于/index.html</span>
  <span class="hljs-comment">// 因为pathname中有点，且关闭了点规则</span>
  <span class="hljs-comment">// req.url应该被rewrit成了/index.html</span>
  test.equal(req.url, <span class="hljs-string">'/index.html'</span>);
  test.ok(next.called);
  test.done();
};

<span class="hljs-comment">// ...</span>
tests[<span class="hljs-string">'should test rewrite rules'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">test</span>) </span>{
  req.url = <span class="hljs-string">'/socer'</span>;
  middleware = historyApiFallback({
    <span class="hljs-attr">rewrites</span>: [
      {<span class="hljs-attr">from</span>: <span class="hljs-regexp">/\/soccer/</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">'/soccer.html'</span>}
    ]
  });
     
  middleware(req, <span class="hljs-literal">null</span>, next);
  <span class="hljs-comment">// 因为没有匹配上rewrites里的规则</span>
  <span class="hljs-comment">// 而req.url pathname又不含点</span>
  <span class="hljs-comment">// 所以req.url 倒退到了index.html</span>
  test.equal(req.url, <span class="hljs-string">'/index.html'</span>);
  test.ok(next.called);
  test.done();
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
connect-history-api-fallback分析

## 原文链接
[https://segmentfault.com/a/1190000007890379](https://segmentfault.com/a/1190000007890379)


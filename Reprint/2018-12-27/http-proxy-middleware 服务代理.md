---
title: 'http-proxy-middleware 服务代理' 
date: 2018-12-27 2:30:12
hidden: true
slug: 1wbx8th422f
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">该文章以收录 <a href="http://webxiaoma.com/blogs/2017/09/14/webpack-log" rel="nofollow noreferrer" target="_blank">《webpack、npm探索之路》</a>
</h3>
<p>本文为 http-proxy-middleware 官网译文 </p>
<p>单线程node.js代理中间件，用于连接，快速和浏览器同步</p>
<p>Node.js代理简单。 轻松配置代理中间件连接，快速，浏览器同步等。</p>
<p>由流行的Nodejitsu http代理提供。</p>
<h1 id="articleHeader1">TL;DR</h1>
<p>代理<code>/api</code>请求到<code>http://www.example.org</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-keyword">var</span> app = express();

app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/api'</span>, proxy({target: <span class="hljs-string">'http://www.example.org'</span>, changeOrigin: <span class="hljs-keyword">true</span>}));
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>可以使用所有http-proxy选项，以及一些额外的http-proxy-middleware选项。</p>
<p>提示：将基于名称的虚拟托管网站的选项changeOrigin设置为true。</p>
<h1 id="articleHeader2">安装</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev http-proxy-middleware" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> http-proxy-middleware</code></pre>
<h1 id="articleHeader3">核心概念</h1>
<p><strong> proxy([context,] config)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {target: 'http://www.example.org'});
//                   \____/   \_____________________________/ 
//                     |                    | 
//                   context             options 

// 'apiProxy' is now ready to be used as middleware in a server. " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">var</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-keyword">var</span> apiProxy = proxy(<span class="hljs-string">'/api'</span>, {target: <span class="hljs-string">'http://www.example.org'</span>});
<span class="hljs-regexp">//                   \____/   \_____________________________/ 
//</span>                     |                    | 
<span class="hljs-regexp">//                   context             options 

//</span> <span class="hljs-string">'apiProxy'</span> <span class="hljs-keyword">is</span> now ready <span class="hljs-keyword">to</span> be used as middleware <span class="hljs-keyword">in</span> a server. </code></pre>
<ul>
<li>context：确定应将哪些请求代理到目标主机。 （更多关于上下文匹配）</li>
<li>options.target：目标主机到代理。 （协议+主机）</li>
</ul>
<p>（http-proxy-middleware配置选项的完整列表）</p>
<p><strong>proxy(uri [, config])</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// shorthand syntax for the example above: 
var apiProxy = proxy('http://www.example.org/api');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// shorthand syntax for the example above: </span>
<span class="hljs-keyword">var</span> apiProxy = proxy(<span class="hljs-symbol">'http</span>:<span class="hljs-comment">//www.example.org/api');</span></code></pre>
<p>更多关于速记配置。</p>
<h1 id="articleHeader4">举个栗子</h1>
<p>使用express服务器的示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// include dependencies 
var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy middleware options 
var options = {
        target: 'http://www.example.org', // target host 
        changeOrigin: true,               // needed for virtual hosted sites 
        ws: true,                         // proxy websockets 
        pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // rewrite path 
            '^/api/remove/path' : '/path'           // remove base path 
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000', 
            // override target 'http://www.example.org' to 'http://localhost:8000' 
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };

// create the proxy (without context) 
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server 
var app = express();
    app.use('/api', exampleProxy);
    app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// include dependencies </span>
<span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-comment">// proxy middleware options </span>
<span class="hljs-keyword">var</span> options = {
        target: <span class="hljs-string">'http://www.example.org'</span>, <span class="hljs-comment">// target host </span>
        changeOrigin: <span class="hljs-keyword">true</span>,               <span class="hljs-comment">// needed for virtual hosted sites </span>
        ws: <span class="hljs-keyword">true</span>,                         <span class="hljs-comment">// proxy websockets </span>
        pathRewrite: {
            <span class="hljs-string">'^/api/old-path'</span> : <span class="hljs-string">'/api/new-path'</span>,     <span class="hljs-comment">// rewrite path </span>
            <span class="hljs-string">'^/api/remove/path'</span> : <span class="hljs-string">'/path'</span>           <span class="hljs-comment">// remove base path </span>
        },
        router: {
            <span class="hljs-comment">// when request.headers.host == 'dev.localhost:3000', </span>
            <span class="hljs-comment">// override target 'http://www.example.org' to 'http://localhost:8000' </span>
            <span class="hljs-string">'dev.localhost:3000'</span> : <span class="hljs-string">'http://localhost:8000'</span>
        }
    };

<span class="hljs-comment">// create the proxy (without context) </span>
<span class="hljs-keyword">var</span> exampleProxy = proxy(options);

<span class="hljs-comment">// mount `exampleProxy` in web server </span>
<span class="hljs-keyword">var</span> app = express();
    app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/api'</span>, exampleProxy);
    app.listen(<span class="hljs-number">3000</span>);</code></pre>
<h1 id="articleHeader5">匹配代理规则</h1>
<p>提供一种替代方式来决定哪些请求应该被代理;如果您无法使用服务器的路径参数来装载代理，或者需要更多的灵活性。</p>
<p>RFC 3986路径用于上下文匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     foo://example.com:8042/over/there?name=ferret#nose
     \_/   \______________/\_________/ \_________/ \__/
      |           |            |            |        |
   scheme     authority       path        query   fragment" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>     foo://example.com:8042/over/there?name=ferret<span class="hljs-comment">#nose</span>
     \_/   \______________/\_________/ \_________/ \__/
      |<span class="hljs-string">           </span>|<span class="hljs-string">            </span>|<span class="hljs-string">            </span>|<span class="hljs-string">        </span>|
   scheme     authority       path        query   fragment</code></pre>
<ul><li><strong>路径匹配</strong></li></ul>
<ol>
<li>
<code>proxy({...})</code> - 匹配任意路径，所有的请求都会被代理。</li>
<li>
<code>proxy('/', {...})</code>-匹配任意路径，所有的请求都会被代理。</li>
<li>
<code>proxy('/api', {...})</code>-匹配所有以/api开始的路径。</li>
</ol>
<ul><li><strong>多重路径匹配</strong></li></ul>
<ol><li><code>proxy(['/api', '/ajax', '/someotherpath'], {...})</code></li></ol>
<ul><li>
<strong>通配符路径匹配</strong> <br> 对于细粒度控制，您可以使用通配符匹配。通过micromatch进行全局模式匹配。访问micromatch或glob更多globbing示例。</li></ul>
<ol>
<li>
<code>proxy('**', {...})</code> 匹配任意路径，所有的请求都会被代理。</li>
<li>
<code>proxy('**/*.html', {...})</code> 匹配所有以.html结尾的任意路径。</li>
<li>
<code>proxy('/*.html', {...})</code> 直接匹配绝对路径下的路径。</li>
<li>
<code>proxy('/api/**/*.html', {...})</code>匹配在/api路径下以.html结尾的请求。</li>
<li>
<code>proxy(['/api/**', '/ajax/**'], {...})</code>组合多重路由模式。</li>
<li>
<code>proxy(['/api/**', '!**/bad.json'], {...})</code>排除匹配。</li>
</ol>
<ul><li>
<strong>自定义匹配</strong> <br>为了完全控制，您可以提供一个自定义函数来确定哪些请求应该被代理。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var filter = function (pathname, req) {
    return (pathname.match('^/api') &amp;&amp; req.method === 'GET');
};

var apiProxy = proxy(filter, {target: 'http://www.example.org'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> filter = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(pathname, req)</span> </span>{
    <span class="hljs-keyword">return</span> (pathname.match(<span class="hljs-string">'^/api'</span>) &amp;&amp; req.method === <span class="hljs-string">'GET'</span>);
};

<span class="hljs-keyword">var</span> apiProxy = proxy(filter, {target: <span class="hljs-string">'http://www.example.org'</span>})</code></pre>
<h1 id="articleHeader6">选项</h1>
<h3 id="articleHeader7">http-proxy-middleware选项</h3>
<ul><li>
<code>option.pathRewrite：Object/Function</code>，重写目标的url路径。对象键将被用作RegExp来匹配路径。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rewrite path 
pathRewrite: {'^/old/api' : '/new/api'}

// remove path 
pathRewrite: {'^/remove/api' : ''}

// add base path 
pathRewrite: {'^/' : '/basepath/'}

// custom rewriting 
pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// rewrite path </span>
<span class="hljs-string">pathRewrite:</span> {<span class="hljs-string">'^/old/api'</span> : <span class="hljs-string">'/new/api'</span>}

<span class="hljs-comment">// remove path </span>
<span class="hljs-string">pathRewrite:</span> {<span class="hljs-string">'^/remove/api'</span> : <span class="hljs-string">''</span>}

<span class="hljs-comment">// add base path </span>
<span class="hljs-string">pathRewrite:</span> {<span class="hljs-string">'^/'</span> : <span class="hljs-string">'/basepath/'</span>}

<span class="hljs-comment">// custom rewriting </span>
<span class="hljs-string">pathRewrite:</span> function (path, req) { <span class="hljs-keyword">return</span> path.replace(<span class="hljs-string">'/api'</span>, <span class="hljs-string">'/base/api'</span>) }</code></pre>
<ul><li>
<code>option.router：Object/Function</code>，重新定位特定请求的<code>option.target</code>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Use `host` and/or `path` to match requests. First match will be used. 
// The order of the configuration matters. 
router: {
    'integration.localhost:3000' : 'http://localhost:8001',  // host only 
    'staging.localhost:3000'     : 'http://localhost:8002',  // host only 
    'localhost:3000/api'         : 'http://localhost:8003',  // host + path 
    '/rest'                      : 'http://localhost:8004'   // path only 
}

// Custom router function 
router: function(req) {
    return 'http://localhost:8004';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Use `host` and/or `path` to match requests. First match will be used. </span>
<span class="hljs-comment">// The order of the configuration matters. </span>
router: {
    <span class="hljs-string">'integration.localhost:3000'</span> : <span class="hljs-string">'http://localhost:8001'</span>,  <span class="hljs-comment">// host only </span>
    <span class="hljs-string">'staging.localhost:3000'</span>     : <span class="hljs-string">'http://localhost:8002'</span>,  <span class="hljs-comment">// host only </span>
    <span class="hljs-string">'localhost:3000/api'</span>         : <span class="hljs-string">'http://localhost:8003'</span>,  <span class="hljs-comment">// host + path </span>
    <span class="hljs-string">'/rest'</span>                      : <span class="hljs-string">'http://localhost:8004'</span>   <span class="hljs-comment">// path only </span>
}

<span class="hljs-comment">// Custom router function </span>
router: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'http://localhost:8004'</span>;
}</code></pre>
<ul>
<li>
<code>option.logLevel：String</code>， [‘debug’, ‘info’, ‘warn’, ‘error’, ‘silent’]. 默认：<code>info</code>。</li>
<li>
<code>option.logProvider：Function</code>，修改或者替换日志服务。默认：<code>console</code>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// simple replace 
function logProvider(provider) {
    // replace the default console log provider. 
    return require('winston');
}

// verbose replacement 
function logProvider(provider) {
    var logger = new (require('winston').Logger)();

    var myCustomProvider = {
        log: logger.log,
        debug: logger.debug,
        info: logger.info,
        warn: logger.warn,
        error: logger.error
    }
    return myCustomProvider;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// simple replace </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logProvider</span>(<span class="hljs-params">provider</span>) </span>{
    <span class="hljs-comment">// replace the default console log provider. </span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'winston'</span>);
}

<span class="hljs-comment">// verbose replacement </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logProvider</span>(<span class="hljs-params">provider</span>) </span>{
    <span class="hljs-keyword">var</span> logger = <span class="hljs-keyword">new</span> (<span class="hljs-built_in">require</span>(<span class="hljs-string">'winston'</span>).Logger)();

    <span class="hljs-keyword">var</span> myCustomProvider = {
        <span class="hljs-attr">log</span>: logger.log,
        <span class="hljs-attr">debug</span>: logger.debug,
        <span class="hljs-attr">info</span>: logger.info,
        <span class="hljs-attr">warn</span>: logger.warn,
        <span class="hljs-attr">error</span>: logger.error
    }
    <span class="hljs-keyword">return</span> myCustomProvider;
}</code></pre>
<p>-（已弃用）<code>option.proxyHost</code>：用<code>option.changeOrigin = true</code>代替。<br>-（已弃用）<code>option.proxyTable</code>：用<code>option.router</code>代替。</p>
<h3 id="articleHeader8">http-proxy 事件</h3>
<ul><li>
<code>option.onError：Function</code>，订阅<code>http-proxy</code>的<code>error</code>事件以进行自定义错误处理。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onError(err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onError</span><span class="hljs-params">(err, req, res)</span></span> {
    res.writeHead(<span class="hljs-number">500</span>, {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
    });
    res.<span class="hljs-keyword">end</span>(<span class="hljs-string">'Something went wrong. And we are reporting a custom error message.'</span>);</code></pre>
<ul><li>
<code>option.onProxyRes：Function</code>，订阅<code>http-proxy</code>的<code>proxyRes</code>事件。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onProxyRes(proxyRes, req, res) {
    proxyRes.headers['x-added'] = 'foobar';     // add new header to response 
    delete proxyRes.headers['x-removed'];       // remove header from response 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onProxyRes</span><span class="hljs-params">(proxyRes, req, res)</span> </span>{
    proxyRes.headers[<span class="hljs-string">'x-added'</span>] = <span class="hljs-string">'foobar'</span>;     <span class="hljs-comment">// add new header to response </span>
    <span class="hljs-keyword">delete</span> proxyRes.headers[<span class="hljs-string">'x-removed'</span>];       <span class="hljs-comment">// remove header from response </span>
}</code></pre>
<ul><li>
<code>option.onProxyReq：Function</code>，订阅<code>http-proxy</code>的<code>proxyReq</code>事件。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onProxyReq(proxyReq, req, res) {
    // add custom header to request 
    proxyReq.setHeader('x-added', 'foobar');
    // or log the req 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>function onProxyRe<span class="hljs-string">q(proxyReq, req, res)</span> {
    <span class="hljs-regexp">//</span> add custom header to request 
    proxyReq.setHeader(<span class="hljs-string">'x-added'</span>, <span class="hljs-string">'foobar'</span>);
    <span class="hljs-regexp">//</span> <span class="hljs-keyword">or</span> <span class="hljs-keyword">log</span> the req 
}</code></pre>
<ul><li>
<code>option.onProxyReqWs：Function</code>，订阅<code>http-proxy</code>的<code>proxyReqWs</code>事件。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onProxyReqWs(proxyReq, req, socket, options, head) {
    // add custom header 
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onProxyReqWs</span><span class="hljs-params">(proxyReq, req, socket, options, head)</span> </span>{
    <span class="hljs-comment">// add custom header </span>
    proxyReq.setHeader(<span class="hljs-string">'X-Special-Proxy-Header'</span>, <span class="hljs-string">'foobar'</span>);
}</code></pre>
<ul><li>
<code>option.onOpen：Function</code>，订阅<code>http-proxy</code>的 <code>open</code>事件。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onOpen(proxySocket) {
    // listen for messages coming FROM the target here 
    proxySocket.on('data', hybiParseAndLogMessage);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onOpen</span><span class="hljs-params">(proxySocket)</span> </span>{
    <span class="hljs-comment">// listen for messages coming FROM the target here </span>
    proxySocket.on(<span class="hljs-string">'data'</span>, hybiParseAndLogMessage);
}</code></pre>
<ul><li>
<code>option.onClose：Function</code>，订阅<code>http-proxy</code> 的<code>close</code>事件。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function onClose(res, socket, head) {
    // view disconnected websocket connections 
    console.log('Client disconnected');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClose</span>(<span class="hljs-params">res, socket, head</span>) </span>{
    <span class="hljs-comment">// view disconnected websocket connections </span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Client disconnected'</span>);
}</code></pre>
<h3 id="articleHeader9">http-proxy选项</h3>
<p>底层http-proxy库提供以下选项。</p>
<p><code>option.target：url</code> 字符串将与url模块解析<br><code>option.forward：url</code>字符串将与url模块解析<br><code>option.target</code>：传递给http(s)请求的对象（参阅Node https代理和http代理对象）<br><code>option.ssl</code>：传递给https.createServer()的对象<br><code>option.ws：true / false</code>，如果你想要代理websockets<br><code>option.xfwd：true / false</code>，添加x-forward请求头<br><code>option.secure：true / false</code>，如果你想要验证SSL证书<br><code>option.toProxy：true / false</code>，将绝对URL作为path（对代理使用代理时很有用）<br><code>option.prependPath：true / false</code>，默认：true-指定是否要将目标的路径预置到代理路径<br><code>option.ignorePath：true / false</code>，默认：false-指定是否要忽略传入请求的代理路径（注意：如果需要，您将必须附加/手动）。<br><code>option.localAddress</code>：用于传出连接的本地接口字符串<br><code>option.changeOrigin：true / false</code>，默认值：false - 将主机头的源更改为目标URL<br><code>option.auth</code>：基本认证，即“用户：密码”来计算授权头。<br><code>option.hostRewrite</code>：重写（301/302/307/308）重定向的位置主机名。<br><code>option.autoRewrite</code>：根据请求的主机/端口重写（301/302/307/308）重定向的位置主机/端口。默认值：false。<br><code>option.protocolRewrite</code>：重写位置协议（301/302/307/308）重定向到’http’或’https’。默认值：null。<br><code>option.cookieDomainRewrite</code>：重写set-cookie标头的域。可能的值：</p>
<ul>
<li>false（默认）：禁止重写cookie</li>
<li>字符串：新域名，比如说cookieDomainRewrite:"new.domain"。使用cookieDomainRewrite:""删除域名。</li>
<li>对象：域名到新域名的映射，用”*”匹配所有域名。 <br>举个栗子：保持一个域名不变，重写一个域名并且删除其他的：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cookieDomainRewrite: { 
&quot;unchanged.domain&quot;: &quot;unchanged.domain&quot;, 
&quot;old.domain&quot;: &quot;new.domain&quot;, 
&quot;*&quot;: &quot;&quot; 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">cookieDomainRewrite:</span> { 
<span class="hljs-string">"unchanged.domain"</span>: <span class="hljs-string">"unchanged.domain"</span>, 
<span class="hljs-string">"old.domain"</span>: <span class="hljs-string">"new.domain"</span>, 
<span class="hljs-string">"*"</span>: <span class="hljs-string">""</span> 
} </code></pre>
<p><code>option.headers</code>：对象，添加请求头。（比如：{host:'www.example.org'}）<br><code>option.proxyTimeout</code>：超时时间（毫秒）当代理接收不到目标服务器的返回</p>
<h1 id="articleHeader10">速记</h1>
<p>当不需要详细配置时，请使用简写语法。当使用速记时，上下文和option.target将被自动配置。如果需要，仍然可以使用选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxy('http://www.example.org:8000/api');
// proxy('/api', {target: 'http://www.example.org:8000'}); 


proxy('http://www.example.org:8000/api/books/*/**.json');
// proxy('/api/books/*/**.json', {target: 'http://www.example.org:8000'}); 


proxy('http://www.example.org:8000/api', {changeOrigin:true});
// proxy('/api', {target: 'http://www.example.org:8000', changeOrigin: true}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>proxy('http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>/api')<span class="hljs-comment">;</span>
// proxy('/api', {target: 'http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>'})<span class="hljs-comment">; </span>


proxy('http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>/api/books/*/**.json')<span class="hljs-comment">;</span>
// proxy('/api/books/*/**.json', {target: 'http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>'})<span class="hljs-comment">; </span>


proxy('http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>/api', {changeOrigin<span class="hljs-symbol">:true</span>})<span class="hljs-comment">;</span>
// proxy('/api', {target: 'http<span class="hljs-symbol">://www</span>.example.org:<span class="hljs-number">8000</span>', changeOrigin: true})<span class="hljs-comment">; </span></code></pre>
<p>app.use(path, proxy)</p>
<p>如果要使用服务器的app.usepath参数匹配请求;创建并装载不带http-proxy-middleware`上下文参数的代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use('/api', proxy({target:'http://www.example.org', changeOrigin:true}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">app.use(<span class="hljs-string">'/api'</span>, proxy({<span class="hljs-string">target:</span><span class="hljs-string">'http://www.example.org'</span>, <span class="hljs-string">changeOrigin:</span><span class="hljs-literal">true</span>}));</code></pre>
<h1 id="articleHeader11">app.use文档</h1>
<p>express： <a href="http://expressjs.com/en/4x/api.html#app.use" rel="nofollow noreferrer" target="_blank">http://expressjs.com/en/4x/api.html#app.use</a><br>connect：<a href="https://github.com/senchalabs/connect#mount-middleware" rel="nofollow noreferrer" target="_blank">https://github.com/senchalabs/connect#mount-middleware</a></p>
<h1 id="articleHeader12">Websocket</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// verbose api 
proxy('/', {target:'http://echo.websocket.org', ws:true});

// shorthand 
proxy('http://echo.websocket.org', {ws:true});

// shorter shorthand 
proxy('ws://echo.websocket.org');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// verbose api </span>
proxy(<span class="hljs-string">'/'</span>, {<span class="hljs-string">target:</span><span class="hljs-string">'http://echo.websocket.org'</span>, <span class="hljs-string">ws:</span><span class="hljs-literal">true</span>});

<span class="hljs-comment">// shorthand </span>
proxy(<span class="hljs-string">'http://echo.websocket.org'</span>, {<span class="hljs-string">ws:</span><span class="hljs-literal">true</span>});

<span class="hljs-comment">// shorter shorthand </span>
proxy(<span class="hljs-string">'ws://echo.websocket.org'</span>);</code></pre>
<h1 id="articleHeader13">外部WebSocket升级</h1>
<p>在以前的WebSocket示例中，http代理中间件依赖于初始http请求以便侦听http升级事件。如果需要在没有初始http请求的情况下代理WebSockets，则可以手动预订服务器的http升级事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wsProxy = proxy('ws://echo.websocket.org', {changeOrigin:true});

var app = express();
    app.use(wsProxy);

var server = app.listen(3000);
    server.on('upgrade', wsProxy.upgrade);  // <-- subscribe to http 'upgrade' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> wsProxy = proxy('ws:<span class="hljs-comment">//echo.websocket.org', {changeOrigin:true});</span>

<span class="hljs-keyword">var</span> <span class="hljs-keyword">app</span> = express();
    <span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(wsProxy);

<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">app</span>.listen(3000);
    server.<span class="hljs-keyword">on</span>('upgrade', wsProxy.upgrade);  <span class="hljs-comment">// &lt;-- subscribe to http 'upgrade' </span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
http-proxy-middleware 服务代理

## 原文链接
[https://segmentfault.com/a/1190000011776090](https://segmentfault.com/a/1190000011776090)


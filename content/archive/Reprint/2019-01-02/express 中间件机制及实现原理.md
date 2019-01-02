---
title: 'express 中间件机制及实现原理' 
date: 2019-01-02 2:30:09
hidden: true
slug: sc4qqwjhlji
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>中间件机制可以让我们在一个给定的流程中添加一个处理步骤，从而对这个流程的输入或者输出产生影响，或者产生一些中作用、状态，或者拦截这个流程。中间件机制和<code>tomcat</code>的过滤器类似，这两者都属于责任链模式的具体实现。</p>
<h2 id="articleHeader1">express 中间件使用案例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let express = require('express')
let app = express()
//解析request 的body
app.use(bodyParser.json())
//解析 cookie
app.use(cookieParser())
//拦截
app.get('/hello', function (req, res) {
  res.send('Hello World!');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-keyword">let</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">let</span> app = express()
<span class="hljs-comment">//解析request 的body</span>
app.<span class="hljs-keyword">use</span>(bodyParser.json())
<span class="hljs-comment">//解析 cookie</span>
app.<span class="hljs-keyword">use</span>(cookieParser())
<span class="hljs-comment">//拦截</span>
app.get(<span class="hljs-string">'/hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>);
});
</code></pre>
<h2 id="articleHeader2">模拟中间件机制并且模拟实现解析<code>request</code>的中间件</h2>
<p><strong>首先模拟一个<code>request</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request = { //模拟的request
    requestLine: 'POST /iven_ HTTP/1.1',
    headers: 'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0',
    requestBody: 'key1=value1&amp;key2=value2&amp;key3=value3',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>request = { <span class="hljs-comment">//模拟的request</span>
    requestLine: <span class="hljs-string">'POST /iven_ HTTP/1.1'</span>,
    headers: <span class="hljs-string">'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0'</span>,
    requestBody: <span class="hljs-string">'key1=value1&amp;key2=value2&amp;key3=value3'</span>,
}</code></pre>
<p>一个<code>http</code>请求分为请求行、请求头、和请求体，这三者之间通过<code>\r\n\r\n</code>即一个空行来分割，这里假设已经将这三者分开，<code>requestLine</code>（请求行）中有方法类型，请求<code>url</code>，<code>http</code>版本号，这三者通过空格来区分，<code>headers</code>（请求头）中的各部分通过<code>\r\n</code>来分割，<code>requestBody</code>（请求体）中通过 <code>&amp;</code> 来区分参数</p>
<p><strong>模拟中间件机制</strong></p>
<p>约定 中间件一定是一个函数并且接受 request, response, next三个参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function App() {
    if (!(this instanceof App))
        return new App();
    this.init();
}
App.prototype = {
    constructor: App,
    init: function() {
        this.request = { //模拟的request
            requestLine: 'POST /iven_ HTTP/1.1',
            headers: 'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0',
            requestBody: 'key1=value1&amp;key2=value2&amp;key3=value3',
        };
        this.response = {}; //模拟的response
        this.chain = []; //存放中间件的一个数组
        this.index = 0; //当前执行的中间件在chain中的位置
    },
    use: function(handle) { //这里默认 handle 是函数，并且这里不做判断
        this.chain.push(handle);
    },
    next: function() { //当调用next时执行index所指向的中间件
        if (this.index >= this.chain.length)
            return;
        let middleware = this.chain[this.index];
        this.index++;
        middleware(this.request, this.response, this.next.bind(this));
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function App() {
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> instanceof App))
        <span class="hljs-keyword">return</span> new App();
    <span class="hljs-keyword">this</span>.init();
}
App.prototype = {
    <span class="hljs-keyword">constructor</span>: App,
    init: function() {
        <span class="hljs-keyword">this</span>.request = { <span class="hljs-comment">//模拟的request</span>
            requestLine: <span class="hljs-string">'POST /iven_ HTTP/1.1'</span>,
            headers: <span class="hljs-string">'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0'</span>,
            requestBody: <span class="hljs-string">'key1=value1&amp;key2=value2&amp;key3=value3'</span>,
        };
        <span class="hljs-keyword">this</span>.response = {}; <span class="hljs-comment">//模拟的response</span>
        <span class="hljs-keyword">this</span>.chain = []; <span class="hljs-comment">//存放中间件的一个数组</span>
        <span class="hljs-keyword">this</span>.index = <span class="hljs-number">0</span>; <span class="hljs-comment">//当前执行的中间件在chain中的位置</span>
    },
    use: function(handle) { <span class="hljs-comment">//这里默认 handle 是函数，并且这里不做判断</span>
        <span class="hljs-keyword">this</span>.chain.push(handle);
    },
    next: function() { <span class="hljs-comment">//当调用next时执行index所指向的中间件</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &gt;= <span class="hljs-keyword">this</span>.chain.length)
            <span class="hljs-keyword">return</span>;
        let middleware = <span class="hljs-keyword">this</span>.chain[<span class="hljs-keyword">this</span>.index];
        <span class="hljs-keyword">this</span>.index++;
        middleware(<span class="hljs-keyword">this</span>.request, <span class="hljs-keyword">this</span>.response, <span class="hljs-keyword">this</span>.next.bind(<span class="hljs-keyword">this</span>));
    },
}</code></pre>
<p><strong>对 request 处理的中间件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function lineParser(req, res, next) {
        let items = req.requestLine.split(' ');
        req.methond = items[0];
        req.url = items[1];
        req.version = items[2];
        next(); //执行下一个中间件
    }

function headersParser(req, res, next) {
    let items = req.headers.split('\r\n');
    let header = {}
    for(let i in items) {
        let item = items[i].split(':');
        let key = item[0];
        let value = item[1];
        header[key] = value;
    }
    req.header = header;
    next(); //执行下一个中间件
}

function bodyParser(req, res, next) {
    let bodyStr = req.requestBody;
    let body = {};
    let items = bodyStr.split('&amp;');
    for(let i in items) {
        let item = items[i].split('=');
        let key = item[0];
        let value = item[1];
        body[key] = value;
    }
    req.body = body;
    next(); //执行下一个中间件
}

function middleware3(req, res, next) {
    console.log('url: '+req.url);
    console.log('methond: '+req.methond);
    console.log('version: '+req.version);
    console.log(req.body);
    console.log(req.header);
    next(); //执行下一个中间件
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lineParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
        <span class="hljs-keyword">let</span> items = req.requestLine.split(<span class="hljs-string">' '</span>);
        req.methond = items[<span class="hljs-number">0</span>];
        req.url = items[<span class="hljs-number">1</span>];
        req.version = items[<span class="hljs-number">2</span>];
        next(); <span class="hljs-comment">//执行下一个中间件</span>
    }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">headersParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> items = req.headers.split(<span class="hljs-string">'\r\n'</span>);
    <span class="hljs-keyword">let</span> header = {}
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> items) {
        <span class="hljs-keyword">let</span> item = items[i].split(<span class="hljs-string">':'</span>);
        <span class="hljs-keyword">let</span> key = item[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> value = item[<span class="hljs-number">1</span>];
        header[key] = value;
    }
    req.header = header;
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bodyParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> bodyStr = req.requestBody;
    <span class="hljs-keyword">let</span> body = {};
    <span class="hljs-keyword">let</span> items = bodyStr.split(<span class="hljs-string">'&amp;'</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> items) {
        <span class="hljs-keyword">let</span> item = items[i].split(<span class="hljs-string">'='</span>);
        <span class="hljs-keyword">let</span> key = item[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> value = item[<span class="hljs-number">1</span>];
        body[key] = value;
    }
    req.body = body;
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">middleware3</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'url: '</span>+req.url);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'methond: '</span>+req.methond);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'version: '</span>+req.version);
    <span class="hljs-built_in">console</span>.log(req.body);
    <span class="hljs-built_in">console</span>.log(req.header);
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}

</code></pre>
<h2 id="articleHeader3">测试代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let app = App();
app.use(lineParser);
app.use(headersParser);
app.use(bodyParser);
app.use(middleware3);
app.next();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>let <span class="hljs-keyword">app</span> = <span class="hljs-keyword">App</span>();
<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(lineParser);
<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(headersParser);
<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(bodyParser);
<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(middleware3);
<span class="hljs-keyword">app</span>.next();
</code></pre>
<h2 id="articleHeader4">整体代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function App() {
    if (!(this instanceof App))
        return new App();
    this.init();
}
App.prototype = {
    constructor: App,
    init: function() {
        this.request = { //模拟的request
            requestLine: 'POST /iven_ HTTP/1.1',
            headers: 'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0',
            requestBody: 'key1=value1&amp;key2=value2&amp;key3=value3',
        };
        this.response = {}; //模拟的response
        this.chain = []; //存放中间件的一个数组
        this.index = 0; //当前执行的中间件在chain中的位置
    },
    use: function(handle) { //这里默认 handle 是函数，并且这里不做判断
        this.chain.push(handle);
    },
    next: function() { //当调用next时执行index所指向的中间件
        if (this.index >= this.chain.length)
            return;
        let middleware = this.chain[this.index];
        this.index++;
        middleware(this.request, this.response, this.next.bind(this));
    },
}
function lineParser(req, res, next) {
        let items = req.requestLine.split(' ');
        req.methond = items[0];
        req.url = items[1];
        req.version = items[2];
        next(); //执行下一个中间件
    }

function headersParser(req, res, next) {
    let items = req.headers.split('\r\n');
    let header = {}
    for(let i in items) {
        let item = items[i].split(':');
        let key = item[0];
        let value = item[1];
        header[key] = value;
    }
    req.header = header;
    next(); //执行下一个中间件
}

function bodyParser(req, res, next) {
    let bodyStr = req.requestBody;
    let body = {};
    let items = bodyStr.split('&amp;');
    for(let i in items) {
        let item = items[i].split('=');
        let key = item[0];
        let value = item[1];
        body[key] = value;
    }
    req.body = body;
    next(); //执行下一个中间件
}

function middleware3(req, res, next) {
    console.log('url: '+req.url);
    console.log('methond: '+req.methond);
    console.log('version: '+req.version);
    console.log(req.body);
    console.log(req.header);
    next(); //执行下一个中间件
}
let app = App();
app.use(lineParser);
app.use(headersParser);
app.use(bodyParser);
app.use(middleware3);
app.next();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> App))
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> App();
    <span class="hljs-keyword">this</span>.init();
}
App.prototype = {
    <span class="hljs-attr">constructor</span>: App,
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.request = { <span class="hljs-comment">//模拟的request</span>
            requestLine: <span class="hljs-string">'POST /iven_ HTTP/1.1'</span>,
            <span class="hljs-attr">headers</span>: <span class="hljs-string">'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0'</span>,
            <span class="hljs-attr">requestBody</span>: <span class="hljs-string">'key1=value1&amp;key2=value2&amp;key3=value3'</span>,
        };
        <span class="hljs-keyword">this</span>.response = {}; <span class="hljs-comment">//模拟的response</span>
        <span class="hljs-keyword">this</span>.chain = []; <span class="hljs-comment">//存放中间件的一个数组</span>
        <span class="hljs-keyword">this</span>.index = <span class="hljs-number">0</span>; <span class="hljs-comment">//当前执行的中间件在chain中的位置</span>
    },
    <span class="hljs-attr">use</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">handle</span>) </span>{ <span class="hljs-comment">//这里默认 handle 是函数，并且这里不做判断</span>
        <span class="hljs-keyword">this</span>.chain.push(handle);
    },
    <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//当调用next时执行index所指向的中间件</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &gt;= <span class="hljs-keyword">this</span>.chain.length)
            <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">let</span> middleware = <span class="hljs-keyword">this</span>.chain[<span class="hljs-keyword">this</span>.index];
        <span class="hljs-keyword">this</span>.index++;
        middleware(<span class="hljs-keyword">this</span>.request, <span class="hljs-keyword">this</span>.response, <span class="hljs-keyword">this</span>.next.bind(<span class="hljs-keyword">this</span>));
    },
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lineParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
        <span class="hljs-keyword">let</span> items = req.requestLine.split(<span class="hljs-string">' '</span>);
        req.methond = items[<span class="hljs-number">0</span>];
        req.url = items[<span class="hljs-number">1</span>];
        req.version = items[<span class="hljs-number">2</span>];
        next(); <span class="hljs-comment">//执行下一个中间件</span>
    }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">headersParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> items = req.headers.split(<span class="hljs-string">'\r\n'</span>);
    <span class="hljs-keyword">let</span> header = {}
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> items) {
        <span class="hljs-keyword">let</span> item = items[i].split(<span class="hljs-string">':'</span>);
        <span class="hljs-keyword">let</span> key = item[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> value = item[<span class="hljs-number">1</span>];
        header[key] = value;
    }
    req.header = header;
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bodyParser</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">let</span> bodyStr = req.requestBody;
    <span class="hljs-keyword">let</span> body = {};
    <span class="hljs-keyword">let</span> items = bodyStr.split(<span class="hljs-string">'&amp;'</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> items) {
        <span class="hljs-keyword">let</span> item = items[i].split(<span class="hljs-string">'='</span>);
        <span class="hljs-keyword">let</span> key = item[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> value = item[<span class="hljs-number">1</span>];
        body[key] = value;
    }
    req.body = body;
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">middleware3</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'url: '</span>+req.url);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'methond: '</span>+req.methond);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'version: '</span>+req.version);
    <span class="hljs-built_in">console</span>.log(req.body);
    <span class="hljs-built_in">console</span>.log(req.header);
    next(); <span class="hljs-comment">//执行下一个中间件</span>
}
<span class="hljs-keyword">let</span> app = App();
app.use(lineParser);
app.use(headersParser);
app.use(bodyParser);
app.use(middleware3);
app.next();
</code></pre>
<h2 id="articleHeader5">运行结果</h2>
<p>将以上整体代码运行后将打印以下信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="url: /iven_
methond: POST
version: HTTP/1.1
{key1: &quot;value1&quot;, key2: &quot;value2&quot;, key3: &quot;value3&quot;}
{Host: &quot;www.baidu.com&quot;, Cookie: &quot;BAIDUID=E063E9B2690116090FE24E01ACDDF4AD&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">url:</span> /iven_
<span class="hljs-string">methond:</span> POST
<span class="hljs-string">version:</span> HTTP/<span class="hljs-number">1.1</span>
{<span class="hljs-string">key1:</span> <span class="hljs-string">"value1"</span>, <span class="hljs-string">key2:</span> <span class="hljs-string">"value2"</span>, <span class="hljs-string">key3:</span> <span class="hljs-string">"value3"</span>}
{<span class="hljs-string">Host:</span> <span class="hljs-string">"www.baidu.com"</span>, <span class="hljs-string">Cookie:</span> <span class="hljs-string">"BAIDUID=E063E9B2690116090FE24E01ACDDF4AD"</span>}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
express 中间件机制及实现原理

## 原文链接
[https://segmentfault.com/a/1190000010877994](https://segmentfault.com/a/1190000010877994)


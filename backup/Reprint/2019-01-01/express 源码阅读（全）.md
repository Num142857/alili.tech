---
title: 'express 源码阅读（全）' 
date: 2019-01-01 2:30:07
hidden: true
slug: c3lvqlovckn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 简介</h2>
<p>这篇文章主要的目的是分析理解express的源码，网络上关于源码的分析已经数不胜数，这篇文章准备另辟蹊径，仿制一个express的轮子，通过测试驱动的开发方式不断迭代，正向理解express的代码。</p>
<p>文章中的express源码是参考官网最新版本（v4.15.4），文章的整体思路是参考早期创作的<a href="https://segmentfault.com/a/1190000005833119">另一篇文章</a>，这篇算是其升级版本。</p>
<p>如果你准备通过本文学习express的基本原理，前提条件最好有一定的express使用经验，写过一两个基于express的应用程序，否则对于其背后的原理理解起来难以产生共鸣，不易掌握。</p>
<p>代码链接：<a href="https://github.com/WangZhechao/expross" rel="nofollow noreferrer" target="_blank">https://github.com/WangZhecha...</a></p>
<h2 id="articleHeader1">2. 框架初始化</h2>
<p>在仿制express框架前，首先完成两件事。</p>
<ul>
<li>确认需求。</li>
<li>确认结构。</li>
</ul>
<p>首先确认需求，从express的官方网站入手。网站有一个Hello world 的事例程序，想要仿制express，该程序肯定需要通过测试，将改代码复制保存到测试目录<code>test/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> app = express()

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Hello World!'</span>)
})

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening on port 3000!'</span>)
})</code></pre>
<p>接下来，确认框架的名称以及目录结构。框架的名称叫做<code>expross</code>。目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expross
  |
  |-- lib
  |    | 
  |    |-- expross.js
  |
  |-- test
  |    |
  |    |-- index.js
  |
  |-- index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>expross
  |<span class="hljs-string">
  </span>|<span class="hljs-string">-- lib
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string"> 
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- expross.js
  </span>|
  |<span class="hljs-string">-- test
  </span>|<span class="hljs-string">    </span>|
  |<span class="hljs-string">    </span>|<span class="hljs-string">-- index.js
  </span>|
  |<span class="hljs-string">-- index.js</span></code></pre>
<p>让<code>expross/index.js</code>文件加载<code>lib</code>目录下的<code>expross.js</code>文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = require('./lib/expross');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/expross'</span>);</code></pre>
<p>通过<em>测试程序前两行</em>可以推断<code>lib/expross.js</code>导出结果应该是一个<strong>函数</strong>，所以在<code>expross.js</code>文件中添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createApplication() {
  return {};
}

exports = module.exports = createApplication;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApplication</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {};
}

exports = <span class="hljs-built_in">module</span>.exports = createApplication;</code></pre>
<p>测试程序中包含两个函数，所以暂时将<code>createApplication</code>函数体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createApplication() {
    return {
        get: function() {
            console.log('expross().get function');
        },

        listen: function() {
            console.log('expross().listen function');
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApplication</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'expross().get function'</span>);
        },

        <span class="hljs-attr">listen</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'expross().listen function'</span>);
        }
    }
}</code></pre>
<p>虽然无法得到想要的结果，但至少可以将测试程序跑通，函数的核心内容可以在接下来的步骤中不断完善。</p>
<p>至此，初始框架搭建完毕，修改<code>test/index.js</code>文件的前两行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const expross = require('../');
const app = expross();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> expross = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../'</span>);
<span class="hljs-keyword">const</span> app = expross();</code></pre>
<p>运行<code>node test/index.js</code>查看结果。</p>
<h2 id="articleHeader2">2. 第一次迭代</h2>
<p>本节是expross的第一次迭代，主要实现的目标是将当前的测试用例功能完整实现，一共分两部分：</p>
<ul>
<li>实现http服务器。</li>
<li>实现get路由请求。</li>
</ul>
<p>实现http服务器比较简单，可以参考nodejs官网的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);

<span class="hljs-keyword">const</span> hostname = <span class="hljs-string">'127.0.0.1'</span>;
<span class="hljs-keyword">const</span> port = <span class="hljs-number">3000</span>;

<span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.statusCode = <span class="hljs-number">200</span>;
  res.setHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'text/plain'</span>);
  res.end(<span class="hljs-string">'Hello World\n'</span>);
});

server.listen(port, hostname, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Server running at http://<span class="hljs-subst">${hostname}</span>:<span class="hljs-subst">${port}</span>/`</span>);
});</code></pre>
<p>参考该案例，实现<code>expross</code>的<code>listen</code>函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen: function(port, cb) {
    var server = http.createServer(function(req, res) {
        console.log('http.createServer...');
    });

    return server.listen(port, cb);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">listen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
    <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'http.createServer...'</span>);
    });

    <span class="hljs-keyword">return</span> server.listen(port, cb);
}</code></pre>
<p>当前<code>listen</code>函数包含了两个参数，但是<code>http.listen</code>有很多重载函数，为了和<code>http.listen</code>一致，可以将函数设置为<code>http.listen</code>的“代理”，这样可以保持<code>expross().listen</code>和<code>http.listen</code>的参数统一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen: function(port, cb) {
    var server = http.createServer(function(req, res) {
        console.log('http.createServer...');
    });

      //代理
    return server.listen.apply(server, arguments);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">listen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
    <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'http.createServer...'</span>);
    });

      <span class="hljs-comment">//代理</span>
    <span class="hljs-keyword">return</span> server.listen.apply(server, <span class="hljs-built_in">arguments</span>);
}</code></pre>
<p>在<code>listen</code>函数中，我们拦截了所有http请求，每次http请求都会打印<code>http.createServer ...</code>,之所以拦截http请求，是因为expross需要分析每次http请求，根据http请求的不同来处理不同的业务逻辑。</p>
<p>在底层：</p>
<p>一个http请求主要包括请求行、请求头和消息体，nodejs将常用的数据封装为http.IncomingMessage类，在上面的代码中req就是该类的一个对象。</p>
<p>每个http请求都会对应一个http响应。一个http响应主要包括状态行、响应头、消息体，nodejs将常用的数据封装为http.ServerResponse类，在上面的代码中res就是该类的一个对象。</p>
<p>不仅仅是nodejs，基本上所有的http服务框架都会包含request和response两个对象，分别代表着http的请求和响应，负责服务端和浏览器的交互。</p>
<p>在上层：</p>
<p>服务器后台代码根据http请求的不同，绑定不同的逻辑。在真正的http请求来临时，匹配这些http请求，执行与之对应的逻辑，这个过程就是web服务器基本的执行流程。</p>
<p>对于这些http请求的管理，有一个专有名词 —— “<strong>路由管理</strong>”，每个http请求就默认为一个<strong>路由</strong>，常见的路由区分策略包括URL、HTTP请求名词等等，但不仅仅限定这些，所有的http请求头上的参数其实都可以进行判断区分，例如使用user-agent字段判断移动端。</p>
<p>不同的框架对于路由的管理规则略有不同，但不管怎样，都需要一组管理http请求和业务逻辑映射的函数，测试用例中的<code>get</code>函数就是路由管理中的一个函数，主要负责添加get请求。</p>
<p>既然知道路由管理的重要，这里就创建一个router数组，负责管理所有路由映射。参考express框架，抽象出每个路由的基本属性：</p>
<ul>
<li>path 请求路径，例如：/books、/books/1。</li>
<li>method 请求方法，例如：GET、POST、PUT、DELETE。</li>
<li>handle 处理函数。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = [{
    path: '*',
    method: '*',
    handle: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('404');
    }
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = [{
    <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'*'</span>,
    <span class="hljs-attr">handle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>});
        res.end(<span class="hljs-string">'404'</span>);
    }
}];</code></pre>
<p>修改listen函数，将http请求拦截逻辑改为匹配router路由表，如果匹配成功，执行对应的handle函数，否则执行router[0].handle函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen: function(port, cb) {
    var server = http.createServer(function(req, res) {
        
        for(var i=1,len=router.length; i<len; i++) {
            if((req.url === router[i].path || router[i].path === '*') &amp;&amp;
                (req.method === router[i].method || router[i].method === '*')) {
                return router[i].handle &amp;&amp; router[i].handle(req, res);
            }
        }

        return router[0].handle &amp;&amp; router[0].handle(req, res);
    });

    return server.listen.apply(server, arguments);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">listen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
    <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>,len=router.length; i&lt;len; i++) {
            <span class="hljs-keyword">if</span>((req.url === router[i].path || router[i].path === <span class="hljs-string">'*'</span>) &amp;&amp;
                (req.method === router[i].method || router[i].method === <span class="hljs-string">'*'</span>)) {
                <span class="hljs-keyword">return</span> router[i].handle &amp;&amp; router[i].handle(req, res);
            }
        }

        <span class="hljs-keyword">return</span> router[<span class="hljs-number">0</span>].handle &amp;&amp; router[<span class="hljs-number">0</span>].handle(req, res);
    });

    <span class="hljs-keyword">return</span> server.listen.apply(server, <span class="hljs-built_in">arguments</span>);
}</code></pre>
<p>实现get路由请求非常简单，该函数主要是添加get请求路由，只需要将其信息加入到router数组即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get: function(path, fn) {
    router.push({
        path: path,
        method: 'GET',
        handle: fn
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">get: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
    router.push({
        <span class="hljs-attr">path</span>: path,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">handle</span>: fn
    });
}</code></pre>
<p>执行测试用例，报错，提示res.send不存在。该函数并不是nodejs原生函数，这里在res上临时添加函数send，负责发送相应到浏览器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen: function(port, cb) {
    var server = http.createServer(function(req, res) {
        if(!res.send) {
            res.send = function(body) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(body);
            };
        }

        ......
    });

    return server.listen.apply(server, arguments);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">listen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
    <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        <span class="hljs-keyword">if</span>(!res.send) {
            res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
                res.writeHead(<span class="hljs-number">200</span>, {
                    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
                });
                res.end(body);
            };
        }

        ......
    });

    <span class="hljs-keyword">return</span> server.listen.apply(server, <span class="hljs-built_in">arguments</span>);
}</code></pre>
<p>在结束这次迭代之前，拆分整理一下程序目录：</p>
<p>创建application.js文件，将createApplication函数中的代码转移到该文件，expross.js文件只保留引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = require('./application');

function createApplication() {
    return app;
}

exports = module.exports = createApplication;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./application'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApplication</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> app;
}

exports = <span class="hljs-built_in">module</span>.exports = createApplication;</code></pre>
<p>整个目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expross
  |
  |-- lib
  |    | 
  |    |-- expross.js
  |    |-- application.js
  |
  |-- test
  |    |
  |    |-- index.js
  |
  |-- index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>expross
  |<span class="hljs-string">
  </span>|<span class="hljs-string">-- lib
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string"> 
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- expross.js
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- application.js
  </span>|
  |<span class="hljs-string">-- test
  </span>|<span class="hljs-string">    </span>|
  |<span class="hljs-string">    </span>|<span class="hljs-string">-- index.js
  </span>|
  |<span class="hljs-string">-- index.js</span></code></pre>
<p>最后，运行<code>node test/index.js</code>，打开浏览器访问<code>http://127.0.0.1:3000/</code>。</p>
<h2 id="articleHeader3">3. 第二次迭代</h2>
<p>本节是expross的第二次迭代，主要的目标是构建一个初步的路由系统。根据上一节的改动，目前的路由是用一个router数组进行描述管理，对于router的操作有两个，分别是在application.get函数和application.listen函数，前者用于添加，后者用来处理。</p>
<p>按照面向对象的封装法则，接下来将路由系统的数据和路由系统的操作封装到一起定义一个 Router类负责整个路由系统的主要工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Router = function() {
    this.stack = [{
        path: '*',
        method: '*',
        handle: function(req, res) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('404');
        }
    }];
};


Router.prototype.get = function(path, fn) {
    this.stack.push({
        path: path,
        method: 'GET',
        handle: fn
    });
};


Router.prototype.handle = function(req, res) {
    for(var i=1,len=this.stack.length; i<len; i++) {
        if((req.url === this.stack[i].path || this.stack[i].path === '*') &amp;&amp;
            (req.method === this.stack[i].method || this.stack[i].method === '*')) {
            return this.stack[i].handle &amp;&amp; this.stack[i].handle(req, res);
        }
    }

    return this.stack[0].handle &amp;&amp; this.stack[0].handle(req, res);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Router = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.stack = [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'*'</span>,
        <span class="hljs-attr">handle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
            res.writeHead(<span class="hljs-number">200</span>, {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
            });
            res.end(<span class="hljs-string">'404'</span>);
        }
    }];
};


Router.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
    <span class="hljs-keyword">this</span>.stack.push({
        <span class="hljs-attr">path</span>: path,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">handle</span>: fn
    });
};


Router.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>,len=<span class="hljs-keyword">this</span>.stack.length; i&lt;len; i++) {
        <span class="hljs-keyword">if</span>((req.url === <span class="hljs-keyword">this</span>.stack[i].path || <span class="hljs-keyword">this</span>.stack[i].path === <span class="hljs-string">'*'</span>) &amp;&amp;
            (req.method === <span class="hljs-keyword">this</span>.stack[i].method || <span class="hljs-keyword">this</span>.stack[i].method === <span class="hljs-string">'*'</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack[i].handle &amp;&amp; <span class="hljs-keyword">this</span>.stack[i].handle(req, res);
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack[<span class="hljs-number">0</span>].handle &amp;&amp; <span class="hljs-keyword">this</span>.stack[<span class="hljs-number">0</span>].handle(req, res);
};</code></pre>
<p>修改原有的application.js文件的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
var Router = require('./router');


exports = module.exports = {
    _router: new Router(),

    get: function(path, fn) {
        return this._router.get(path, fn);
    },

    listen: function(port, cb) {
        var self = this;

        var server = http.createServer(function(req, res) {
            if(!res.send) {
                res.send = function(body) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(body);
                };
            }

            return self._router.handle(req, res);
        });

        return server.listen.apply(server, arguments);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./router'</span>);


exports = <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">_router</span>: <span class="hljs-keyword">new</span> Router(),

    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._router.get(path, fn);
    },

    <span class="hljs-attr">listen</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
            <span class="hljs-keyword">if</span>(!res.send) {
                res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
                    res.writeHead(<span class="hljs-number">200</span>, {
                        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
                    });
                    res.end(body);
                };
            }

            <span class="hljs-keyword">return</span> self._router.handle(req, res);
        });

        <span class="hljs-keyword">return</span> server.listen.apply(server, <span class="hljs-built_in">arguments</span>);
    }
};</code></pre>
<p>这样以后路由方面的操作只和Router本身有关，与application分离，使代码更加清晰。</p>
<p>这个路由系统正常运行时没有问题的，但是如果路由不断的增多，this.stack数组会不断的增大，匹配的效率会不断降低，为了解决效率的问题，需要仔细分析路由的组成成分。</p>
<p>目前在expross中，一个路由是由三个部分构成：路径、方法和处理函数。前两者的关系并不是一对一的关系，而是一对多的关系，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET books/1
PUT books/1
DELETE books/1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>GET books/<span class="hljs-number">1</span>
PUT books/<span class="hljs-number">1</span>
DELETE books/<span class="hljs-number">1</span></code></pre>
<p>如果将路径一样的路由整合成一组，显然效率会提高很多，于是引入Layer的概念。</p>
<p>这里将Router系统中this.stack数组的每一项，代表一个Layer。每个Layer内部含有三个变量。</p>
<ul>
<li>path，表示路由的路径。</li>
<li>handle，代表路由的处理函数。</li>
<li>route，代表真正的路由。</li>
</ul>
<p>整体结构如下图所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="------------------------------------------------
|     0     |     1     |     2     |     3     |      
------------------------------------------------
| Layer     | Layer     | Layer     | Layer     |
|  |- path  |  |- path  |  |- path  |  |- path  |
|  |- handle|  |- handle|  |- handle|  |- handle|
|  |- route |  |- route |  |- route |  |- route |
------------------------------------------------
                  router 内部" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>------------------------------------------------
|<span class="hljs-string">     0     </span>|<span class="hljs-string">     1     </span>|<span class="hljs-string">     2     </span>|<span class="hljs-string">     3     </span>|<span class="hljs-string">      
------------------------------------------------
</span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">- path  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- path  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- path  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- path  </span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">- route </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- route </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- route </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- route </span>|
------------------------------------------------
                  router 内部</code></pre>
<p>这里先创建Layer类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.path = path;
}


//简单处理
Layer.prototype.handle_request = function (req, res) {
  var fn = this.handle;

  if(fn) {
      fn(req, res);
  }
};


//简单匹配
Layer.prototype.match = function (path) {
    if(path === this.path || path === '*') {
        return true;
    }
    
    return false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Layer</span>(<span class="hljs-params">path, fn</span>) </span>{
    <span class="hljs-keyword">this</span>.handle = fn;
    <span class="hljs-keyword">this</span>.name = fn.name || <span class="hljs-string">'&lt;anonymous&gt;'</span>;
    <span class="hljs-keyword">this</span>.path = path;
}


<span class="hljs-comment">//简单处理</span>
Layer.prototype.handle_request = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>.handle;

  <span class="hljs-keyword">if</span>(fn) {
      fn(req, res);
  }
};


<span class="hljs-comment">//简单匹配</span>
Layer.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">if</span>(path === <span class="hljs-keyword">this</span>.path || path === <span class="hljs-string">'*'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};</code></pre>
<p>再次修改Router类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Router = function() {
    this.stack = [new Layer('*', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404');        
    })];
};


Router.prototype.handle = function(req, res) {
    var self = this;

    for(var i=1,len=self.stack.length; i<len; i++) {
        if(self.stack[i].match(req.url)) {
            return self.stack[i].handle_request(req, res);
        }
    }

    return self.stack[0].handle_request(req, res);
};


Router.prototype.get = function(path, fn) {
    this.stack.push(new Layer(path, fn));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Router = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.stack = [<span class="hljs-keyword">new</span> Layer(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        res.writeHead(<span class="hljs-number">200</span>, {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
        });
        res.end(<span class="hljs-string">'404'</span>);        
    })];
};


Router.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>,len=self.stack.length; i&lt;len; i++) {
        <span class="hljs-keyword">if</span>(self.stack[i].match(req.url)) {
            <span class="hljs-keyword">return</span> self.stack[i].handle_request(req, res);
        }
    }

    <span class="hljs-keyword">return</span> self.stack[<span class="hljs-number">0</span>].handle_request(req, res);
};


Router.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
    <span class="hljs-keyword">this</span>.stack.push(<span class="hljs-keyword">new</span> Layer(path, fn));
};</code></pre>
<p>运行<code>node test/index.js</code>，访问<code>http://127.0.0.1:3000/</code>一切看起来很正常，但是上面的代码忽略了路由的属性method。这样的结果会导致如果测试用例存在问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.put('/', function(req, res) {
    res.send('put Hello World!');
});

app.get('/', function(req, res) {
    res.send('get Hello World!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.put(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'put Hello World!'</span>);
});

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'get Hello World!'</span>);
});</code></pre>
<p>程序无法分清PUT和GET的区别。</p>
<p>所以需要继续完善路由系统中的Layer类中的route属性，这个属性才是真正包含method属性的路由。</p>
<p>route的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="------------------------------------------------
|     0     |     1     |     2     |     3     |      
------------------------------------------------
| item      | item      | item      | item      |
|  |- method|  |- method|  |- method|  |- method|
|  |- handle|  |- handle|  |- handle|  |- handle|
------------------------------------------------
                  route 内部" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>------------------------------------------------
|<span class="hljs-string">     0     </span>|<span class="hljs-string">     1     </span>|<span class="hljs-string">     2     </span>|<span class="hljs-string">     3     </span>|<span class="hljs-string">      
------------------------------------------------
</span>|<span class="hljs-string"> item      </span>|<span class="hljs-string"> item      </span>|<span class="hljs-string"> item      </span>|<span class="hljs-string"> item      </span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|
------------------------------------------------
                  route 内部</code></pre>
<p>创建Route类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Route = function(path) {
    this.path = path;
    this.stack = [];

    this.methods = {};
};

Route.prototype._handles_method = function(method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
};

Route.prototype.get = function(fn) {
    var layer = new Layer('/', fn);
    layer.method = 'get';

    this.methods['get'] = true;
    this.stack.push(layer);

    return this;
};

Route.prototype.dispatch = function(req, res) {
    var self = this,
        method = req.method.toLowerCase();

    for(var i=0,len=self.stack.length; i<len; i++) {
        if(method === self.stack[i].method) {
            return self.stack[i].handle_request(req, res);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Route = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">this</span>.path = path;
    <span class="hljs-keyword">this</span>.stack = [];

    <span class="hljs-keyword">this</span>.methods = {};
};

Route.prototype._handles_method = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    <span class="hljs-keyword">var</span> name = method.toLowerCase();
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-keyword">this</span>.methods[name]);
};

Route.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> layer = <span class="hljs-keyword">new</span> Layer(<span class="hljs-string">'/'</span>, fn);
    layer.method = <span class="hljs-string">'get'</span>;

    <span class="hljs-keyword">this</span>.methods[<span class="hljs-string">'get'</span>] = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">this</span>.stack.push(layer);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};

Route.prototype.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method.toLowerCase();

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=self.stack.length; i&lt;len; i++) {
        <span class="hljs-keyword">if</span>(method === self.stack[i].method) {
            <span class="hljs-keyword">return</span> self.stack[i].handle_request(req, res);
        }
    }
};</code></pre>
<p>在上面的代码中，并没有定义前面结构图中的item对象，而是使用了Layer对象进行替代，主要是为了方便快捷，从另一种角度看，其实二者是存在很多共同点的。另外，为了利于理解，代码中只实现了GET方法，其他方法的代码实现是类似的。</p>
<p>既然有了Route类，接下来就改修改原有的Router类，将route集成其中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.handle = function(req, res) {
    var self = this,
        method = req.method;

    for(var i=0,len=self.stack.length; i<len; i++) {
        if(self.stack[i].match(req.url) &amp;&amp; 
            self.stack[i].route &amp;&amp; self.stack[i].route._handles_method(method)) {
            return self.stack[i].handle_request(req, res);
        }
    }

    return self.stack[0].handle_request(req, res);
};


Router.prototype.route = function route(path) {
    var route = new Route(path);

    var layer = new Layer(path, function(req, res) {
        route.dispatch(req, res);
    });

    layer.route = route;

    this.stack.push(layer);
    
    return route;
};


Router.prototype.get = function(path, fn) {
    var route = this.route(path);
    route.get(fn);

    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method;

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=self.stack.length; i&lt;len; i++) {
        <span class="hljs-keyword">if</span>(self.stack[i].match(req.url) &amp;&amp; 
            self.stack[i].route &amp;&amp; self.stack[i].route._handles_method(method)) {
            <span class="hljs-keyword">return</span> self.stack[i].handle_request(req, res);
        }
    }

    <span class="hljs-keyword">return</span> self.stack[<span class="hljs-number">0</span>].handle_request(req, res);
};


Router.prototype.route = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">new</span> Route(path);

    <span class="hljs-keyword">var</span> layer = <span class="hljs-keyword">new</span> Layer(path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        route.dispatch(req, res);
    });

    layer.route = route;

    <span class="hljs-keyword">this</span>.stack.push(layer);
    
    <span class="hljs-keyword">return</span> route;
};


Router.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
    <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">this</span>.route(path);
    route.get(fn);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>运行<code>node test/index.js</code>，一切看起来和原来一样。</p>
<p>这节内容主要是创建一个完整的路由系统，并在原始代码的基础上引入了Layer和Route两个概念，并修改了大量的代码，在结束本节前总结一下目前的信息。</p>
<p>首先，当前程序的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expross
  |
  |-- lib
  |    | 
  |    |-- expross.js
  |    |-- application.js
  |    |-- router
  |          |
  |          |-- index.js
  |          |-- layer.js
  |          |-- route.js
  |
  |-- test
  |    |
  |    |-- index.js
  |
  |-- index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>expross
  |<span class="hljs-string">
  </span>|<span class="hljs-string">-- lib
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string"> 
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- expross.js
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- application.js
  </span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- router
  </span>|<span class="hljs-string">          </span>|
  |<span class="hljs-string">          </span>|<span class="hljs-string">-- index.js
  </span>|<span class="hljs-string">          </span>|<span class="hljs-string">-- layer.js
  </span>|<span class="hljs-string">          </span>|<span class="hljs-string">-- route.js
  </span>|
  |<span class="hljs-string">-- test
  </span>|<span class="hljs-string">    </span>|
  |<span class="hljs-string">    </span>|<span class="hljs-string">-- index.js
  </span>|
  |<span class="hljs-string">-- index.js</span></code></pre>
<p>接着，总结一下当前expross各个部分的工作。</p>
<p>application代表一个应用程序，expross是一个工厂类负责创建application对象。Router代表路由组件，负责应用程序的整个路由系统。组件内部由一个Layer数组构成，每个Layer代表一组路径相同的路由信息，具体信息存储在Route内部，每个Route内部也是一个Layer对象，但是Route内部的Layer和Router内部的Layer是存在一定的差异性。</p>
<ul>
<li>Router内部的Layer，主要包含path、route属性。</li>
<li>Route内部的Layer，主要包含method、handle属性。</li>
</ul>
<p>如果一个请求来临，会现从头至尾的扫描router内部的每一层，而处理每层的时候会先对比URI，相同则扫描route的每一项，匹配成功则返回具体的信息，没有任何匹配则返回未找到。</p>
<p>最后，整个路由系统的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" --------------
| Application  |                                 ---------------------------------------------------------
|     |        |        ----- -----------        |     0     |     1     |     2     |     3     |  ...  |
|     |-router | ----> |     | Layer     |       ---------------------------------------------------------
 --------------        |  0  |   |-path  |       | Layer     | Layer     | Layer     | Layer     |       |
  application          |     |   |-route | ----> |  |- method|  |- method|  |- method|  |- method|  ...  |
                       |-----|-----------|       |  |- handle|  |- handle|  |- handle|  |- handle|       |
                       |     | Layer     |       ---------------------------------------------------------
                       |  1  |   |-path  |                                  route
                       |     |   |-route |       
                       |-----|-----------|       
                       |     | Layer     |
                       |  2  |   |-path  |
                       |     |   |-route |
                       |-----|-----------|
                       | ... |   ...     |
                        ----- ----------- 
                             router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code> --------------
|<span class="hljs-string"> Application  </span>|<span class="hljs-string">                                 ---------------------------------------------------------
</span>|<span class="hljs-string">     </span>|<span class="hljs-string">        </span>|<span class="hljs-string">        ----- -----------        </span>|<span class="hljs-string">     0     </span>|<span class="hljs-string">     1     </span>|<span class="hljs-string">     2     </span>|<span class="hljs-string">     3     </span>|<span class="hljs-string">  ...  </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string">-router </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       ---------------------------------------------------------
 --------------        </span>|<span class="hljs-string">  0  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">       </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       </span>|
  application          |<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  ...  </span>|
                       |<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">       </span>|
                       |<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       ---------------------------------------------------------
                       </span>|<span class="hljs-string">  1  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">                                  route
                       </span>|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string">       
                       </span>|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       
                       </span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|
                       |<span class="hljs-string">  2  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|
                       |<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|
                       |<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|
                       |<span class="hljs-string"> ... </span>|<span class="hljs-string">   ...     </span>|
                        ----- ----------- 
                             router</code></pre>
<h2 id="articleHeader4">3. 第三次迭代</h2>
<p>本节是expross的第三次迭代，主要的目标是继续完善路由系统，主要工作有部分：</p>
<ul>
<li>丰富接口，目前只支持get接口。</li>
<li>增加路由系统的流程控制。</li>
</ul>
<p>当前expross框架只支持get接口，具体的接口是由expross提供的，内部调用Router.get接口，而其内部是对Route.get的封装。</p>
<p>HTTP显然不仅仅只有GET这一个方法，还包括很多，例如：PUT、POST、DELETE等等，每个方法都单独写一个处理函数显然是冗余的，因为函数的内容除了和函数名相关外，其他都是一成不变的。根据JavaScript脚本语言语言的特性，这里可以通过HTTP的方法列表动态生成函数内容。</p>
<p>想要动态生成函数，首先需要确定函数名称。函数名就是nodejs中HTTP服务器支持的方法名称，可以在官方文档中获取，具体参数是<code>http.METHODS</code>。这个属性是在v0.11.8新增的，如果nodejs低于该版本，需要手动建立一个方法列表，具体可以参考nodejs代码。</p>
<p>express框架HTTP方法名的获取封装到另一个包，叫做<code>methods</code>，内部给出了低版本的兼容动词列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBasicNodeMethods</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    <span class="hljs-string">'get'</span>,
    <span class="hljs-string">'post'</span>,
    <span class="hljs-string">'put'</span>,
    <span class="hljs-string">'head'</span>,
    <span class="hljs-string">'delete'</span>,
    <span class="hljs-string">'options'</span>,
    <span class="hljs-string">'trace'</span>,
    <span class="hljs-string">'copy'</span>,
    <span class="hljs-string">'lock'</span>,
    <span class="hljs-string">'mkcol'</span>,
    <span class="hljs-string">'move'</span>,
    <span class="hljs-string">'purge'</span>,
    <span class="hljs-string">'propfind'</span>,
    <span class="hljs-string">'proppatch'</span>,
    <span class="hljs-string">'unlock'</span>,
    <span class="hljs-string">'report'</span>,
    <span class="hljs-string">'mkactivity'</span>,
    <span class="hljs-string">'checkout'</span>,
    <span class="hljs-string">'merge'</span>,
    <span class="hljs-string">'m-search'</span>,
    <span class="hljs-string">'notify'</span>,
    <span class="hljs-string">'subscribe'</span>,
    <span class="hljs-string">'unsubscribe'</span>,
    <span class="hljs-string">'patch'</span>,
    <span class="hljs-string">'search'</span>,
    <span class="hljs-string">'connect'</span>
  ];
}</code></pre>
<p>知道所支持的方法名列表数组后，剩下的只需要一个for循环生成所有的函数即可。</p>
<p>所有的动词处理函数的核心内容都在Route中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Route.prototype[method] = function(fn) {
        var layer = new Layer('/', fn);
        layer.method = method;

        this.methods[method] = true;
        this.stack.push(layer);

        return this;
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">http.METHODS.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    method = method.toLowerCase();
    Route.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
        <span class="hljs-keyword">var</span> layer = <span class="hljs-keyword">new</span> Layer(<span class="hljs-string">'/'</span>, fn);
        layer.method = method;

        <span class="hljs-keyword">this</span>.methods[method] = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.stack.push(layer);

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };
});</code></pre>
<p>接着修改Router。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Router.prototype[method] = function(path, fn) {
        var route = this.route(path);
        route[method].call(route, fn);

        return this;
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">http.METHODS.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    method = method.toLowerCase();
    Router.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
        <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">this</span>.route(path);
        route[method].call(route, fn);

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };
});</code></pre>
<p>最后修改application.js的内容。这里改动较大，重新定义了一个Application类，而不是使用字面量直接创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Application() {
    this._router = new Router();
}


Application.prototype.listen = function(port, cb) {
    var self = this;

    var server = http.createServer(function(req, res) {
        self.handle(req, res);
    });

    return server.listen.apply(server, arguments);
};


Application.prototype.handle = function(req, res) {
    if(!res.send) {
        res.send = function(body) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(body);
        };
    }

    var router = this._router;
    router.handle(req, res);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Application</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._router = <span class="hljs-keyword">new</span> Router();
}


Application.prototype.listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port, cb</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        self.handle(req, res);
    });

    <span class="hljs-keyword">return</span> server.listen.apply(server, <span class="hljs-built_in">arguments</span>);
};


Application.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">if</span>(!res.send) {
        res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
            res.writeHead(<span class="hljs-number">200</span>, {
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
            });
            res.end(body);
        };
    }

    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>._router;
    router.handle(req, res);
};</code></pre>
<p>接着增加HTTP方法函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Application.prototype[method] = function(path, fn) {
        this._router[method].apply(this._router, arguments);
        return this;
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">http.METHODS.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    method = method.toLowerCase();
    Application.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
        <span class="hljs-keyword">this</span>._router[method].apply(<span class="hljs-keyword">this</span>._router, <span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };
});</code></pre>
<p>因为导出的是Application类，所以修改expross.js文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Application = require('./application');

function createApplication() {
    var app = new Application();
    return app;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Application = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./application'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApplication</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Application();
    <span class="hljs-keyword">return</span> app;
}</code></pre>
<p>运行<code>node test/index.js</code>，走起。</p>
<p>如果你仔细研究路由系统的源码，会发现route本身的定义并不是像文字描述那样。例如：</p>
<p>增加两个同样路径的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.put('/', function(req, res) {
    res.send('put Hello World!');
});

app.get('/', function(req, res) {
    res.send('get Hello World!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.put(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'put Hello World!'</span>);
});

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'get Hello World!'</span>);
});</code></pre>
<p>结果并不是想象中类似下面的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                          ---------------------------------------------------------
 ----- -----------        |     0     |     1     |     2     |     3     |  ...  |
|     | Layer     |       ---------------------------------------------------------
|  0  |   |-path  |       | Layer     | Layer     | Layer     | Layer     |       |
|     |   |-route | ----> |  |- method|  |- method|  |- method|  |- method|  ...  |
|-----|-----------|       |  |- handle|  |- handle|  |- handle|  |- handle|       |
|     | Layer     |       ---------------------------------------------------------
|  1  |   |-path  |                                  route
|     |   |-route |       
|-----|-----------|       
|     | Layer     |
|  2  |   |-path  |
|     |   |-route |
|-----|-----------|
| ... |   ...     |
 ----- ----------- 
      router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>                          ---------------------------------------------------------
 ----- -----------        |<span class="hljs-string">     0     </span>|<span class="hljs-string">     1     </span>|<span class="hljs-string">     2     </span>|<span class="hljs-string">     3     </span>|<span class="hljs-string">  ...  </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       ---------------------------------------------------------
</span>|<span class="hljs-string">  0  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">       </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">  ...  </span>|
|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">       </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       ---------------------------------------------------------
</span>|<span class="hljs-string">  1  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">                                  route
</span>|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string">       
</span>|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       
</span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|
|<span class="hljs-string">  2  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|
|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|
|<span class="hljs-string"> ... </span>|<span class="hljs-string">   ...     </span>|
 ----- ----------- 
      router</code></pre>
<p>而是如下的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ----- -----------        -------------
|     | Layer     | ----> | Layer     |
|  0  |   |-path  |       |  |- method|   route
|     |   |-route |       |  |- handle|
|-----|-----------|       -------------
|     | Layer     |       -------------      
|  1  |   |-path  | ----> | Layer     |
|     |   |-route |       |  |- method|   route     
|-----|-----------|       |  |- handle|        
|     | Layer     |       -------------
|  2  |   |-path  |       -------------  
|     |   |-route | ----> | Layer     |
|-----|-----------|       |  |- method|   route
| ... |   ...     |       |  |- handle| 
 ----- -----------        -------------
    router            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code> ----- -----------        -------------
|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string"> Layer     </span>|
|<span class="hljs-string">  0  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">   route
</span>|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|
|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       -------------
</span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       -------------      
</span>|<span class="hljs-string">  1  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string"> Layer     </span>|
|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">   route     
</span>|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string">        
</span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Layer     </span>|<span class="hljs-string">       -------------
</span>|<span class="hljs-string">  2  </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-path  </span>|<span class="hljs-string">       -------------  
</span>|<span class="hljs-string">     </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-route </span>|<span class="hljs-string"> ----&gt; </span>|<span class="hljs-string"> Layer     </span>|
|<span class="hljs-string">-----</span>|<span class="hljs-string">-----------</span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- method</span>|<span class="hljs-string">   route
</span>|<span class="hljs-string"> ... </span>|<span class="hljs-string">   ...     </span>|<span class="hljs-string">       </span>|<span class="hljs-string">  </span>|<span class="hljs-string">- handle</span>|<span class="hljs-string"> 
 ----- -----------        -------------
    router            </span></code></pre>
<p>之所以会这样是因为路由系统存在这先后顺序的关系，如果你前面的描述结构很有可能会丢失路由顺序这个属性。既然这样，那Route的用处是在哪？</p>
<p>因为在express框架中，Route存储的是真正的路由信息，可以当做单独的成员使用，如果想要真正前面的所描述的结果描述，你需要这样创建你的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = express.Router();

router.route('/users/:user_id')
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = express.Router();

router.route(<span class="hljs-string">'/users/:user_id'</span>)
.get(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  res.json(req.user);
})
.put(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-comment">// just an example of maybe updating the user</span>
  req.user.name = req.params.name;
  <span class="hljs-comment">// save user ... etc</span>
  res.json(req.user);
})
.post(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  next(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'not implemented'</span>));
})
.delete(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  next(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'not implemented'</span>));
});</code></pre>
<p>而不是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = expross();

app.get('/users/:user_id', function(req, res) {
    
})

.put('/users/:user_id', function(req, res) {
    
})

.post('/users/:user_id', function(req, res) {
    
})

.delete('/users/:user_id', function(req, res) {
    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = expross();

app.get(<span class="hljs-string">'/users/:user_id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    
})

.put(<span class="hljs-string">'/users/:user_id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    
})

.post(<span class="hljs-string">'/users/:user_id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    
})

.delete(<span class="hljs-string">'/users/:user_id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    
});</code></pre>
<p>理解了Route的使用方法，接下来就要讨论刚刚提到的顺序问题。在路由系统中，路由的处理顺序非常重要，因为路由是按照数组的方式存储的，如果遇见两个同样的路由，同样的方法名，不同的处理函数，这时候前后声明的顺序将直接影响结果（这也是express中间件存在顺序相关的原因），例如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('first');
});

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('second');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>});
    res.end(<span class="hljs-string">'first'</span>);
});

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>});
    res.end(<span class="hljs-string">'second'</span>);
});</code></pre>
<p>上面的代码如果执行会发现永远都返回<code>first</code>，但是有的时候会根据前台传来的参数动态判断是否执行接下来的路由，怎样才能跳过<code>first</code>进入<code>second</code>？这就涉及到路由系统的流程控制问题。</p>
<p>流程控制分为主动和被动两种模式。</p>
<p>对于expross框架来说，路由绑定的处理逻辑、用户设置的路径参数这些都是不可靠的，在运行过程中很有可能会发生异常，被动流程控制就是当这些异常发生的时候，expross框架要担负起捕获这些异常的工作，因为如果不明确异常的发生位置，会导致js代码无法继续运行，并且无法准确的报出故障。</p>
<p>主动流程控制则是处理函数内部的操作逻辑，以主动调用的方式来跳转路由内部的执行逻辑。</p>
<p>目前express通过引入next参数的方式来解决流程控制问题。next是处理函数的一个参数，其本身也是一个函数，该函数有几种使用方式：</p>
<ul>
<li>执行下一个处理函数。执行<code>next()</code>。</li>
<li>报告异常。执行<code>next(err)</code>。</li>
<li>跳过当前Route，执行Router的下一项。执行<code>next('route')</code>。</li>
<li>跳过整个Router。执行<code>next('router')</code>。</li>
</ul>
<p>接下来，我们尝试实现以下这些需求。</p>
<p>首先修改最底层的Layer对象，该对象的<code>handle_request</code>函数是负责调用路由绑定的处理逻辑，这里添加next参数，并且增加异常捕获功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Layer.prototype.handle_request = function (req, res, next) {
  var fn = this.handle;

  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Layer.prototype.handle_request = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>.handle;

  <span class="hljs-keyword">try</span> {
    fn(req, res, next);
  } <span class="hljs-keyword">catch</span> (err) {
    next(err);
  }
};</code></pre>
<p>接下来修改Route.dispath函数。因为涉及到内部的逻辑跳转，使用for循环按部就班不太合适，这里使用了类似递归的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Route.prototype.dispatch = function(req, res, done) {
    var self = this,
        method = req.method.toLowerCase(),
        idx = 0, stack = self.stack;

    function next(err) {
        //跳过route
        if(err &amp;&amp; err === 'route') {
            return done();
        }

        //跳过整个路由系统
        if(err &amp;&amp; err === 'router') {
            return done(err);
        }

        //越界
        if(idx >= stack.length) {
            return done(err);
        }

        //不等枚举下一个
        var layer = stack[idx++];
        if(method !== layer.method) {
            return next(err);
        }

        if(err) {
            //主动报错
            return done(err);
        } else {
            layer.handle_request(req, res, next);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Route.prototype.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method.toLowerCase(),
        idx = <span class="hljs-number">0</span>, stack = self.stack;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-comment">//跳过route</span>
        <span class="hljs-keyword">if</span>(err &amp;&amp; err === <span class="hljs-string">'route'</span>) {
            <span class="hljs-keyword">return</span> done();
        }

        <span class="hljs-comment">//跳过整个路由系统</span>
        <span class="hljs-keyword">if</span>(err &amp;&amp; err === <span class="hljs-string">'router'</span>) {
            <span class="hljs-keyword">return</span> done(err);
        }

        <span class="hljs-comment">//越界</span>
        <span class="hljs-keyword">if</span>(idx &gt;= stack.length) {
            <span class="hljs-keyword">return</span> done(err);
        }

        <span class="hljs-comment">//不等枚举下一个</span>
        <span class="hljs-keyword">var</span> layer = stack[idx++];
        <span class="hljs-keyword">if</span>(method !== layer.method) {
            <span class="hljs-keyword">return</span> next(err);
        }

        <span class="hljs-keyword">if</span>(err) {
            <span class="hljs-comment">//主动报错</span>
            <span class="hljs-keyword">return</span> done(err);
        } <span class="hljs-keyword">else</span> {
            layer.handle_request(req, res, next);
        }
    }

    next();
};</code></pre>
<p>整个处理过程本质上还是一个for循环，唯一的差别就是在处理函数中用户主动调用next函数的处理逻辑。</p>
<p>如果用户通过next函数返回错误、<code>route</code>和<code>router</code>这三种情况，目前统一抛给Router处理。</p>
<p>因为修改了dispatch函数，所以调用该函数的Router.route函数也要修改，这回直接改彻底，以后无需根据参数的个数进行调整。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.route = function route(path) {
    ...
    
    //使用bind方式
    var layer = new Layer(path, route.dispatch.bind(route));
    
    ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.route = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">path</span>) </span>{
    ...
    
    <span class="hljs-comment">//使用bind方式</span>
    <span class="hljs-keyword">var</span> layer = <span class="hljs-keyword">new</span> Layer(path, route.dispatch.bind(route));
    
    ...
};</code></pre>
<p>接着修改Router.handle的代码，逻辑和Route.dispatch类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.handle = function(req, res, done) {
    var self = this,
        method = req.method,
        idx = 0, stack = self.stack;

    function next(err) {
        var layerError = (err === 'route' ? null : err);

        //跳过路由系统
        if(layerError === 'router') {
            return done(null);
        }

        if(idx >= stack.length || layerError) {
            return done(layerError);
        }

        var layer = stack[idx++];
        //匹配，执行
        if(layer.match(req.url) &amp;&amp; layer.route &amp;&amp;
            layer.route._handles_method(method)) {
            return layer.handle_request(req, res, next);
        } else {
            next(layerError);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method,
        idx = <span class="hljs-number">0</span>, stack = self.stack;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">var</span> layerError = (err === <span class="hljs-string">'route'</span> ? <span class="hljs-literal">null</span> : err);

        <span class="hljs-comment">//跳过路由系统</span>
        <span class="hljs-keyword">if</span>(layerError === <span class="hljs-string">'router'</span>) {
            <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>);
        }

        <span class="hljs-keyword">if</span>(idx &gt;= stack.length || layerError) {
            <span class="hljs-keyword">return</span> done(layerError);
        }

        <span class="hljs-keyword">var</span> layer = stack[idx++];
        <span class="hljs-comment">//匹配，执行</span>
        <span class="hljs-keyword">if</span>(layer.match(req.url) &amp;&amp; layer.route &amp;&amp;
            layer.route._handles_method(method)) {
            <span class="hljs-keyword">return</span> layer.handle_request(req, res, next);
        } <span class="hljs-keyword">else</span> {
            next(layerError);
        }
    }

    next();
};</code></pre>
<p>修改后的函数处理过程和原来的类似，不过有一点需要注意，当发生异常的时候，会将结果返回给上一层，而不是执行原有<code>this.stack</code>第0层的代码逻辑。</p>
<p>最后增加expross框架异常处理的逻辑。</p>
<p>在之前，可以移除原有this.stack的初始化代码，将</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Router = function() {
    this.stack = [new Layer('*', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404');        
    })];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Router = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.stack = [<span class="hljs-keyword">new</span> Layer(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        res.writeHead(<span class="hljs-number">200</span>, {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
        });
        res.end(<span class="hljs-string">'404'</span>);        
    })];
};</code></pre>
<p>改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Router = function() {
    this.stack = [];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Router = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.stack = [];
};</code></pre>
<p>然后，修改Application.handle函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.handle = function(req, res) {
  
    ...
    
    var done = function finalhandler(err) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        if(err) {
            res.end('404: ' + err);    
        } else {
            var msg = 'Cannot ' + req.method + ' ' + req.url;
            res.end(msg);    
        }
    };

    var router = this._router;
    router.handle(req, res, done);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  
    ...
    
    var done = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">finalhandler</span>(<span class="hljs-params">err</span>) </span>{
        res.writeHead(<span class="hljs-number">404</span>, {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
        });

        <span class="hljs-keyword">if</span>(err) {
            res.end(<span class="hljs-string">'404: '</span> + err);    
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> msg = <span class="hljs-string">'Cannot '</span> + req.method + <span class="hljs-string">' '</span> + req.url;
            res.end(msg);    
        }
    };

    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>._router;
    router.handle(req, res, done);
};</code></pre>
<p>这里简单的将done函数处理为返回404页面，其实在express框架中，使用的是一个单独的npm包，叫做<code>finalhandler</code>。</p>
<p>简单的修改一下测试用例证明一下成果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expross = require('../');
var app = expross();

app.get('/', function(req, res, next) {
    next();
})

.get('/', function(req, res, next) {
    next(new Error('error'));
})

.get('/', function(req, res) {
    res.send('third');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> expross = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../'</span>);
<span class="hljs-keyword">var</span> app = expross();

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    next();
})

.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    next(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error'</span>));
})

.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.send(<span class="hljs-string">'third'</span>);
});

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening on port 3000!'</span>);
});</code></pre>
<p>运行<code>node test/index.js</code>，访问<code>http://127.0.0.1:3000/</code>，结果显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="404: Error: error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">404</span>: <span class="hljs-keyword">Error</span>: <span class="hljs-keyword">error</span></code></pre>
<p>貌似目前一切都很顺利，不过还有一个需求目前被忽略了。当前处理函数的异常全部是由框架捕获，返回的信息只能是固定的404页面，对于框架使用者显然很不方便，大多数时候，我们都希望可以捕获错误，并按照一定的信息封装返回给浏览器，所以expross需要一个返回错误给上层使用者的接口。</p>
<p>目前和上层对接的处理函数的声明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function process_fun(req, res, next) {
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process_fun</span>(<span class="hljs-params">req, res, next</span>) </span>{
  
}</code></pre>
<p>如果增加一个错误处理函数，按照nodejs的规则，第一个参数是错误信息，定义应该如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function process_err(err, req, res, next) {
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process_err</span>(<span class="hljs-params">err, req, res, next</span>) </span>{
  
}</code></pre>
<p>因为两个声明的第一个参数信息是不同的，如果区分传入的处理函数是处理错误的函数还是处理正常的函数，这个是expross框架需要搞定的关键问题。</p>
<p>javascript中，Function.length属性可以获取传入函数指定的参数个数，这个可以当做区分二者的关键信息。</p>
<p>既然确定了原理，接下来直接在Layer类上增加一个专门处理错误的函数，和处理正常信息的函数区分开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//错误处理
Layer.prototype.handle_error = function (error, req, res, next) {
  var fn = this.handle;

  //如果函数参数不是标准的4个参数，返回错误信息
  if(fn.length !== 4) {
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//错误处理</span>
Layer.prototype.handle_error = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, req, res, next</span>) </span>{
  <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>.handle;

  <span class="hljs-comment">//如果函数参数不是标准的4个参数，返回错误信息</span>
  <span class="hljs-keyword">if</span>(fn.length !== <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">return</span> next(error);
  }

  <span class="hljs-keyword">try</span> {
    fn(error, req, res, next);
  } <span class="hljs-keyword">catch</span> (err) {
    next(err);
  }
};</code></pre>
<p>接着修改Route.dispatch函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Route.prototype.dispatch = function(req, res, done) {
    var self = this,
        method = req.method.toLowerCase(),
        idx = 0, stack = self.stack;

    function next(err) {
    
        ...

        if(err) {
            //主动报错
            layer.handle_error(err, req, res, next);
        } else {
            layer.handle_request(req, res, next);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Route.prototype.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method.toLowerCase(),
        idx = <span class="hljs-number">0</span>, stack = self.stack;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err</span>) </span>{
    
        ...

        if(err) {
            <span class="hljs-comment">//主动报错</span>
            layer.handle_error(err, req, res, next);
        } <span class="hljs-keyword">else</span> {
            layer.handle_request(req, res, next);
        }
    }

    next();
};</code></pre>
<p>当发生错误的时候，Route会一直向后寻找错误处理函数，如果找到则返回，否则执行<code>done(err)</code>，将错误抛给Router。</p>
<p>对于Router.handle的修改，因为涉及到一些中间件的概念，完整的错误处理将推移到下一节完成。</p>
<p>本节的内容基本上完成，包括HTTP相关的动作接口的添加、路由系统的流程跳转以及Route级别的错误响应等等，涉及到路由系统剩下的一点内容暂时放到以后讲解。</p>
<h2 id="articleHeader5">4. 第四次迭代</h2>
<p>本节是expross的第四次迭代，主要的目标是建立中间件机制并继续完善路由系统的功能。</p>
<p>在express中，中间件其实是一个介于web请求来临后到调用处理函数前整个流程体系中间调用的组件。其本质是一个函数，内部可以访问修改请求和响应对象，并调整接下来的处理流程。</p>
<p>express官方给出的解释如下：</p>
<blockquote>
<p>Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。</p>
<p><em>中间件（Middleware）</em> 是一个函数，它可以访问请求对象（<a href="http://www.expressjs.com.cn/4x/api.html#req" rel="nofollow noreferrer" target="_blank">request object</a> (<code>req</code>)）, 响应对象（<a href="http://www.expressjs.com.cn/4x/api.html#res" rel="nofollow noreferrer" target="_blank">response object</a> (<code>res</code>)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 <code>next</code> 的变量。</p>
<p>中间件的功能包括：</p>
<ul>
<li>执行任何代码。</li>
<li>修改请求和响应对象。</li>
<li>终结请求-响应循环。</li>
<li>调用堆栈中的下一个中间件。</li>
</ul>
<p>如果当前中间件没有终结请求-响应循环，则必须调用 <code>next()</code> 方法将控制权交给下一个中间件，否则请求就会挂起。</p>
<p>Express 应用可使用如下几种中间件：</p>
<ul>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html#middleware.application" rel="nofollow noreferrer" target="_blank">应用级中间件</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html#middleware.router" rel="nofollow noreferrer" target="_blank">路由级中间件</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html#middleware.error-handling" rel="nofollow noreferrer" target="_blank">错误处理中间件</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html#middleware.built-in" rel="nofollow noreferrer" target="_blank">内置中间件</a></li>
<li><a href="http://www.expressjs.com.cn/guide/using-middleware.html#middleware.third-party" rel="nofollow noreferrer" target="_blank">第三方中间件</a></li>
</ul>
<p>使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。</p>
</blockquote>
<p>官方给出的定义其实已经足够清晰，一个中间件的样式其实就是上一节所提到的处理函数，只不过并没有正式命名。所以对于代码来说Router类中的this.stack属性内部的每个handle都是一个中间件，根据使用接口不同区别了<strong>应用级中间件</strong>和<strong>路由级中间件</strong>，而四个参数的处理函数就是<strong>错误处理中间件</strong>。</p>
<p>接下来就给expross框架添加中间件的功能。</p>
<p>首先是应用级中间件，其使用方法是Application类上的两种方式：Application.use 和 Application.METHOD (HTTP的各种请求方法），后者其实在前面的小节里已经实现了，前者则是需要新增的。</p>
<p>在前面的小节里的代码已经说明Application.METHOD内部其实是Router.METHOD的代理，Application.use同样如此。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.use = function(fn) {
    var path = '/',
        router = this._router;

    router.use(path, fn);

    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.use = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> path = <span class="hljs-string">'/'</span>,
        router = <span class="hljs-keyword">this</span>._router;

    router.use(path, fn);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>因为Application.use支持可选路径，所以需要增加处理路径的重载代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.use = function(fn) {
    var path = '/',
        router = this._router;

    //路径挂载
    if(typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }

    router.use(path, fn);

    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.use = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> path = <span class="hljs-string">'/'</span>,
        router = <span class="hljs-keyword">this</span>._router;

    <span class="hljs-comment">//路径挂载</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        path = fn;
        fn = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    }

    router.use(path, fn);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>其实express框架支持的参数不仅仅这两种，但是为了便于理解剔除了一些旁枝末节，便于框架的理解。</p>
<p>接下来实现Router.use函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.use = function(fn) {
    var path = '/';

    //路径挂载
    if(typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }

    var layer = new Layer(path, fn);
    layer.route = undefined;

    this.stack.push(layer);

    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Router.prototype.use = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> path = <span class="hljs-string">'/'</span>;

    <span class="hljs-comment">//路径挂载</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">'function'</span>) {
        path = fn;
        fn = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    }

    <span class="hljs-keyword">var</span> layer = <span class="hljs-keyword">new</span> Layer(path, fn);
    layer.route = <span class="hljs-literal">undefined</span>;

    <span class="hljs-keyword">this</span>.stack.push(layer);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>内部代码和Application.use差不多，只不过最后不再是调用Router.use，而是直接创建一个Layer对象，将其放到this.stack数组中。</p>
<p>在这里段代码里可以看到普通路由和中间件的区别。普通路由放到Route中，且Router.route属性指向Route对象，Router.handle属性指向Route.dispatch函数；中间件的Router.route属性为undefined，Router.handle指向中间件处理函数，被放到Router.stack数组中。</p>
<p>对于路由级中间件，首先按照要求导出Router类，便于使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.Router = Router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">exports.Router = Router;</code></pre>
<p>上面的代码添加到expross.js文件中，这样就可以按照下面的使用方式创建一个单独的路由系统。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = express();
<span class="hljs-keyword">var</span> router = express.Router();

router.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Time:'</span>, <span class="hljs-built_in">Date</span>.now());
});</code></pre>
<p>现在问题来了，如果像上面的代码一样创建一个新的路由系统是无法让路由系统内部的逻辑生效的，因为这个路由系统没法添加到现有的系统中。</p>
<p>一种办法是增加一个专门添加新路由系统的接口，是完全是可行的，但是我更欣赏express框架的办法，这可能是Router叫做路由级中间件的原因。express将Router定义成一个特殊的中间件，而不是一个单独的类。</p>
<p>这样将单独创建的路由系统添加到现有的应用中的代码非常简单通用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = express.Router();

// 将路由挂载至应用
app.use('/', router);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-comment">// 将路由挂载至应用</span>
app.use(<span class="hljs-string">'/'</span>, router);</code></pre>
<p>这确实是一个好方法，现在就来将expross修改成类似的样子。</p>
<p>首先创建一个原型对象，将现有的Router方法转移到该对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proto = {};

proto.handle = function(req, res, done) {...};
proto.route = function route(path) {...};
proto.use = function(fn) { ... };

http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    proto[method] = function(path, fn) {
        var route = this.route(path);
        route[method].call(route, fn);

        return this;
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> proto = {};

proto.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{...};
proto.route = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">route</span>(<span class="hljs-params">path</span>) </span>{...};
proto.use = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{ ... };

http.METHODS.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    method = method.toLowerCase();
    proto[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
        <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">this</span>.route(path);
        route[method].call(route, fn);

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };
});</code></pre>
<p>然后创建一个中间件函数，使用Object.setPrototypeOf函数设置其原型，最后导出一个生成这些过程的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function() {
    function router(req, res, next) {
        router.handle(req, res, next);
    }

    Object.setPrototypeOf(router, proto);

    router.stack = [];
    return router;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">router</span>(<span class="hljs-params">req, res, next</span>) </span>{
        router.handle(req, res, next);
    }

    <span class="hljs-built_in">Object</span>.setPrototypeOf(router, proto);

    router.stack = [];
    <span class="hljs-keyword">return</span> router;
};</code></pre>
<p>修改测试用例，测试一下效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function(req, res, next) {
    console.log('Time：', Date.now());
    next();
});

app.get('/', function(req, res, next) {
    res.send('first');
});


router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use('/', function(req, res, next) {
    res.send('second');
});

app.use('/user', router);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Time：'</span>, <span class="hljs-built_in">Date</span>.now());
    next();
});

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'first'</span>);
});


router.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Time: '</span>, <span class="hljs-built_in">Date</span>.now());
    next();
});

router.use(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'second'</span>);
});

app.use(<span class="hljs-string">'/user'</span>, router);

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Example app listening on port 3000!'</span>);
});</code></pre>
<p>结果并不理想，原有的应用程序还有两个地方需要修改。</p>
<p>首先是逻辑处理问题。原有的Router.handle函数中并没有处理中间件的情况，需要进一步修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proto.handle = function(req, res, done) {
    
    ...
    
    function next(err) {
        
        ...
        
        //注意这里，layer.route属性
        if(layer.match(req.url) &amp;&amp; layer.route &amp;&amp;
            layer.route._handles_method(method)) {
            layer.handle_request(req, res, next);
        } else {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proto.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{
    
    ...
    
    function next(err) {
        
        ...
        
        <span class="hljs-comment">//注意这里，layer.route属性</span>
        <span class="hljs-keyword">if</span>(layer.match(req.url) &amp;&amp; layer.route &amp;&amp;
            layer.route._handles_method(method)) {
            layer.handle_request(req, res, next);
        } <span class="hljs-keyword">else</span> {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};</code></pre>
<p>改成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proto.handle = function(req, res, done) {

    ...

    function next(err) {
        
        ...
        
        //匹配，执行
        if(layer.match(path)) {
            if(!layer.route) {
                //处理中间件
                layer.handle_request(req, res, next);    
            } else if(layer.route._handles_method(method)) {
                //处理路由
                layer.handle_request(req, res, next);
            }    
        } else {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proto.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{

    ...

    function next(err) {
        
        ...
        
        <span class="hljs-comment">//匹配，执行</span>
        <span class="hljs-keyword">if</span>(layer.match(path)) {
            <span class="hljs-keyword">if</span>(!layer.route) {
                <span class="hljs-comment">//处理中间件</span>
                layer.handle_request(req, res, next);    
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(layer.route._handles_method(method)) {
                <span class="hljs-comment">//处理路由</span>
                layer.handle_request(req, res, next);
            }    
        } <span class="hljs-keyword">else</span> {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};</code></pre>
<p>其次是路径匹配的问题。原有的单一路径被拆分成为不同中间的路径组合，这里判断需要多步进行，因为每个中间件只是匹配自己的路径是否通过，不过相对而言目前涉及的匹配都是全等匹配，还没有涉及到类似express框架中的正则匹配，算是非常简单了。</p>
<p>想要实现匹配逻辑就要清楚的知道哪段路径和哪个处理函数匹配，这里定义三个变量：</p>
<ul>
<li>req.originalUrl 原始请求路径。</li>
<li>req.url 当前路径。</li>
<li>req.baseUrl 父路径。</li>
</ul>
<p>主要修改Router.handle函数，该函数主要负责提取当前路径段，便于和事先传入的路径进行匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proto.handle = function(req, res, done) {
    var self = this,
        method = req.method,
        idx = 0, stack = self.stack,
        removed = '', slashAdded = false;


    //获取当前父路径
    var parentUrl = req.baseUrl || '';
    //保存父路径
    req.baseUrl = parentUrl;
    //保存原始路径
    req.orginalUrl = req.orginalUrl || req.url;


    function next(err) {
        var layerError = (err === 'route' ? null : err);

        //如果有移除，复原原有路径
        if(slashAdded) {
            req.url = '';
            slashAdded = false;
        }


        //如果有移除，复原原有路径信息
        if(removed.length !== 0) {
            req.baseUrl = parentUrl;
            req.url = removed + req.url;
            removed = '';
        }


        //跳过路由系统
        if(layerError === 'router') {
            return done(null);
        }


        if(idx >= stack.length || layerError) {
            return done(layerError);
        }

        //获取当前路径
        var path = require('url').parse(req.url).pathname;

        var layer = stack[idx++];
        //匹配，执行
        if(layer.match(path)) {

            //处理中间件
            if(!layer.route) {
                //要移除的部分路径
                removed = layer.path;

                //设置当前路径
                req.url = req.url.substr(removed.length);
                if(req.url === '') {
                    req.url = '/' + req.url;
                    slashAdded = true;
                }

                //设置当前路径的父路径
                req.baseUrl = parentUrl + removed;

                //调用处理函数
                layer.handle_request(req, res, next);    
            } else if(layer.route._handles_method(method)) {
                //处理路由
                layer.handle_request(req, res, next);
            }    
        } else {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proto.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, done</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>,
        method = req.method,
        idx = <span class="hljs-number">0</span>, stack = self.stack,
        removed = <span class="hljs-string">''</span>, slashAdded = <span class="hljs-literal">false</span>;


    <span class="hljs-comment">//获取当前父路径</span>
    <span class="hljs-keyword">var</span> parentUrl = req.baseUrl || <span class="hljs-string">''</span>;
    <span class="hljs-comment">//保存父路径</span>
    req.baseUrl = parentUrl;
    <span class="hljs-comment">//保存原始路径</span>
    req.orginalUrl = req.orginalUrl || req.url;


    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">var</span> layerError = (err === <span class="hljs-string">'route'</span> ? <span class="hljs-literal">null</span> : err);

        <span class="hljs-comment">//如果有移除，复原原有路径</span>
        <span class="hljs-keyword">if</span>(slashAdded) {
            req.url = <span class="hljs-string">''</span>;
            slashAdded = <span class="hljs-literal">false</span>;
        }


        <span class="hljs-comment">//如果有移除，复原原有路径信息</span>
        <span class="hljs-keyword">if</span>(removed.length !== <span class="hljs-number">0</span>) {
            req.baseUrl = parentUrl;
            req.url = removed + req.url;
            removed = <span class="hljs-string">''</span>;
        }


        <span class="hljs-comment">//跳过路由系统</span>
        <span class="hljs-keyword">if</span>(layerError === <span class="hljs-string">'router'</span>) {
            <span class="hljs-keyword">return</span> done(<span class="hljs-literal">null</span>);
        }


        <span class="hljs-keyword">if</span>(idx &gt;= stack.length || layerError) {
            <span class="hljs-keyword">return</span> done(layerError);
        }

        <span class="hljs-comment">//获取当前路径</span>
        <span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>).parse(req.url).pathname;

        <span class="hljs-keyword">var</span> layer = stack[idx++];
        <span class="hljs-comment">//匹配，执行</span>
        <span class="hljs-keyword">if</span>(layer.match(path)) {

            <span class="hljs-comment">//处理中间件</span>
            <span class="hljs-keyword">if</span>(!layer.route) {
                <span class="hljs-comment">//要移除的部分路径</span>
                removed = layer.path;

                <span class="hljs-comment">//设置当前路径</span>
                req.url = req.url.substr(removed.length);
                <span class="hljs-keyword">if</span>(req.url === <span class="hljs-string">''</span>) {
                    req.url = <span class="hljs-string">'/'</span> + req.url;
                    slashAdded = <span class="hljs-literal">true</span>;
                }

                <span class="hljs-comment">//设置当前路径的父路径</span>
                req.baseUrl = parentUrl + removed;

                <span class="hljs-comment">//调用处理函数</span>
                layer.handle_request(req, res, next);    
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(layer.route._handles_method(method)) {
                <span class="hljs-comment">//处理路由</span>
                layer.handle_request(req, res, next);
            }    
        } <span class="hljs-keyword">else</span> {
            layer.handle_error(layerError, req, res, next);
        }
    }

    next();
};</code></pre>
<p>这段代码主要处理两种情况：</p>
<p>第一种，存在路由中间件的情况。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.use('/1', function(req, res, next) {
    res.send('first user');
});

router.use('/2', function(req, res, next) {
    res.send('second user');
});

app.use('/users', router);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.use(<span class="hljs-string">'/1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'first user'</span>);
});

router.use(<span class="hljs-string">'/2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'second user'</span>);
});

app.use(<span class="hljs-string">'/users'</span>, router);</code></pre>
<p>这种情况下，Router.handle顺序匹配到中间的时候，会递归调用Router.handle，所以需要保存当前的路径快照，具体路径相关信息放到req.url、req.originalUrl 和req.baseUrl 这三个参数中。</p>
<p>第二种，非路由中间件的情况。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/', function(req, res, next) {
    res.send('home');
});

app.get('/books', function(req, res, next) {
    res.send('books');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'home'</span>);
});

app.get(<span class="hljs-string">'/books'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.send(<span class="hljs-string">'books'</span>);
});</code></pre>
<p>这种情况下，Router.handle内部主要是按照栈中的次序匹配路径即可。</p>
<p>改好了处理函数，还需要修改一下Layer.match这个匹配函数。目前创建Layer可能会有三种情况：</p>
<ul>
<li>不含有路径的中间件。path属性默认为<code>/</code>。</li>
<li>含有路径的中间件。</li>
<li>普通路由。如果path属性为<code>*</code>，表示任意路径。</li>
</ul>
<p>修改原有Layer是构造函数，增加一个fast_star 标记用来判断path是否为*。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Layer(path, fn) {
  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.path = undefined;

  //是否为*
  this.fast_star = (path === '*' ? true : false);
  if(!this.fast_star) {
    this.path = path;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Layer</span>(<span class="hljs-params">path, fn</span>) </span>{
  <span class="hljs-keyword">this</span>.handle = fn;
  <span class="hljs-keyword">this</span>.name = fn.name || <span class="hljs-string">'&lt;anonymous&gt;'</span>;
  <span class="hljs-keyword">this</span>.path = <span class="hljs-literal">undefined</span>;

  <span class="hljs-comment">//是否为*</span>
  <span class="hljs-keyword">this</span>.fast_star = (path === <span class="hljs-string">'*'</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>);
  <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.fast_star) {
    <span class="hljs-keyword">this</span>.path = path;
  }
}</code></pre>
<p>接着修改Layer.match匹配函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Layer.prototype.match = function(path) {

  //如果为*，匹配
  if(this.fast_star) {
    this.path = '';
    return true;
  }

  //如果是普通路由，从后匹配
  if(this.route &amp;&amp; this.path === path.slice(-this.path.length)) {
    return true;
  }

  if (!this.route) {
    //不带路径的中间件
    if (this.path === '/') {
      this.path = '';
      return true;
    }

    //带路径中间件
    if(this.path === path.slice(0, this.path.length)) {
      return true;
    }
  }
  
  return false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Layer.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{

  <span class="hljs-comment">//如果为*，匹配</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.fast_star) {
    <span class="hljs-keyword">this</span>.path = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-comment">//如果是普通路由，从后匹配</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.route &amp;&amp; <span class="hljs-keyword">this</span>.path === path.slice(-<span class="hljs-keyword">this</span>.path.length)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.route) {
    <span class="hljs-comment">//不带路径的中间件</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.path === <span class="hljs-string">'/'</span>) {
      <span class="hljs-keyword">this</span>.path = <span class="hljs-string">''</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-comment">//带路径中间件</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.path === path.slice(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.path.length)) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }
  
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};</code></pre>
<p>代码中一共判断四种情况，根据this.route区分中间件和普通路由，然后分开判断。</p>
<p>express除了普通的中间件外还要一种错误中间件，专门用来处理错误信息。该中间件的声明和上一小节最后介绍的错误处理函数是一样的，同样是四个参数分别是：err、 req、 res和 next。</p>
<p>目前Router.handle中，当遇见错误信息的时候，会直接通过回调函数返回错误信息，显示错误页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(idx >= stack.length || layerError) {
    return done(layerError);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(idx &gt;= stack.length || layerError) {
    <span class="hljs-keyword">return</span> done(layerError);
}</code></pre>
<p>这里需要修改策略，将其改为继续调用下一个中间件，直到碰到错误中间件为止。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//没有找到
if(idx >= stack.length) {
    return done(layerError);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//没有找到</span>
<span class="hljs-keyword">if</span>(idx &gt;= stack.length) {
    <span class="hljs-keyword">return</span> done(layerError);
}</code></pre>
<p>原有这一块的代码只保留判断枚举是否完成，将错误判断转移到最后执行处理函数的位置。之所以这样做是因为不管是执行处理函数，或是执行错误处理都需要进行路径匹配操作和路径分析操作，所以放到后面正好合适。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//处理中间件
if(!layer.route) {

    ...

    //调用处理函数
    if(layerError)
        layer.handle_error(layerError, req, res, next);
    else
        layer.handle_request(req, res, next);
    
} else if(layer.route._handles_method(method)) {
    //处理路由
    layer.handle_request(req, res, next);
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//处理中间件</span>
<span class="hljs-keyword">if</span>(!layer.route) {

    ...

    <span class="hljs-comment">//调用处理函数</span>
    <span class="hljs-keyword">if</span>(layerError)
        layer.handle_error(layerError, req, res, next);
    <span class="hljs-keyword">else</span>
        layer.handle_request(req, res, next);
    
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(layer.route._handles_method(method)) {
    <span class="hljs-comment">//处理路由</span>
    layer.handle_request(req, res, next);
}    </code></pre>
<p>到此为止，expross的错误处理部分算是基本完成了。</p>
<p>路由系统和中间件两个大的概念算是全部讲解完毕，当然还有很多细节没有完善，在剩下的文字里如果有必要会继续完善。</p>
<p>下一节主要的内容是介绍前后端交互的两个重要成员：request和response。express在nodejs的基础之上进行了丰富的扩展，所以很有必要仿制一下。</p>
<h2 id="articleHeader6">5. 第五次迭代</h2>
<p>本节是expross的第五次迭代，主要的目标是封装request和response两个对象，方便使用。</p>
<p>其实nodejs已经给我们提供这两个默认的对象，之所以要封装是因为丰富一下二者的接口，方便框架使用者，目前框架在response对象上已经有一个接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!res.send) {
    res.send = function(body) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(body);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(!res.send) {
    res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
        res.writeHead(<span class="hljs-number">200</span>, {
            <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
        });
        res.end(body);
    };
}</code></pre>
<p>如果需要继续封装，也要类似的结构在代码上添加显然会给人一种很乱的感觉，因为request和response的原始版本是nodejs提供给框架的，框架获取到的是两个对象，并不是类，要想在二者之上提供另一组接口的办法有很多，归根结底就是将新的接口加到该对象上或者加到该对象的原型链上，目前的代码选择了前者，express的代码选择了后者。</p>
<p>首先建立两个文件：request.js 和 response.js，二者分别导出req和res对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//request.js
var http = require('http');

var req = Object.create(http.IncomingMessage.prototype);

module.exports = req;


//response.js
var http = require('http');

var res = Object.create(http.ServerResponse.prototype);

module.exports = res;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//request.js</span>
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);

<span class="hljs-keyword">var</span> req = <span class="hljs-built_in">Object</span>.create(http.IncomingMessage.prototype);

<span class="hljs-built_in">module</span>.exports = req;


<span class="hljs-comment">//response.js</span>
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);

<span class="hljs-keyword">var</span> res = <span class="hljs-built_in">Object</span>.create(http.ServerResponse.prototype);

<span class="hljs-built_in">module</span>.exports = res;</code></pre>
<p>二者文件的代码都是创建一个对象，分别指向nodejs提供的request和response两个对象的原型，以后expross自定的接口可以统一挂载到这两个对象上。</p>
<p>接着修改Application.handle函数，因为这个函数里面有新鲜出炉的request和response。思路很简单，就是将二者的原型指向我们自建的req和res。因为req和res对象的原型和request和response的原型相同，所以并不影响原有nodejs的接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = require('./request');
var response = require('./response');

...

Application.prototype.handle = function(req, res) {

    Object.setPrototypeOf(req, request);
    Object.setPrototypeOf(res, response);


    ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./request'</span>);
<span class="hljs-keyword">var</span> response = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./response'</span>);

...

Application.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

    <span class="hljs-built_in">Object</span>.setPrototypeOf(req, request);
    <span class="hljs-built_in">Object</span>.setPrototypeOf(res, response);


    ...
};</code></pre>
<p>这里将原有的res.send转移到了response.js文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.send = function(body) {
    this.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    this.end(body);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">res.send = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">body</span>) </span>{
    <span class="hljs-keyword">this</span>.writeHead(<span class="hljs-number">200</span>, {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/plain'</span>
    });
    <span class="hljs-keyword">this</span>.end(body);
};</code></pre>
<p>注意函数中不在是res.writeHead和res.end，而是this.writeHead和this.end。</p>
<p>在整个路由系统中，Router.stack每一项其实都是一个中间件，每个中间件都有可能用到req和res这两个对象，所以代码中修改nodejs原生提供的request和response对象的代码放到了Application.handle中，这样做并没有问题，但是有一种更好的方式，expross框架将这部分代码封装成了一个内部中间件。</p>
<p>为了确保框架中每个中间件接收这两个参数的正确性，需要将该内部中间放到Router.stack的首项。这里将原有Application的构造函数中的代码去掉，不再是直接创建Router()路由系统，而是用一种惰性加载的方式，动态创建。</p>
<p>去除原有Application构造函数的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Application() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Application</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<p>添加惰性初始化函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.lazyrouter = function() {
    if(!this._router) {
        this._router = new Router();

        this._router.use(middleware.init());
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.lazyrouter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>._router) {
        <span class="hljs-keyword">this</span>._router = <span class="hljs-keyword">new</span> Router();

        <span class="hljs-keyword">this</span>._router.use(middleware.init());
    }
};</code></pre>
<p>因为是惰性初始化，所以在使用<code>this._router</code>对象前，一定要先调用该函数动态创建<code>this._router</code>对象。类似如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取router
this.lazyrouter();
router = this._router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//获取router</span>
<span class="hljs-keyword">this</span>.lazyrouter();
router = <span class="hljs-keyword">this</span>._router;</code></pre>
<p>接下来创建一个叫middleware文件夹，专门放内部中间件的文件，再创建一个init.js文件，放置Application.handle中用来初始化res和req的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = require('../request');
var response = require('../response');

exports.init = function expressInit(req, res, next) {
    //request文件可能用到res对象
    req.res = res;

    //response文件可能用到req对象
    res.req = req;

    //修改原始req和res原型
    Object.setPrototypeOf(req, request);
    Object.setPrototypeOf(res, response);

    //继续
    next();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../request'</span>);
<span class="hljs-keyword">var</span> response = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../response'</span>);

exports.init = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">expressInit</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-comment">//request文件可能用到res对象</span>
    req.res = res;

    <span class="hljs-comment">//response文件可能用到req对象</span>
    res.req = req;

    <span class="hljs-comment">//修改原始req和res原型</span>
    <span class="hljs-built_in">Object</span>.setPrototypeOf(req, request);
    <span class="hljs-built_in">Object</span>.setPrototypeOf(res, response);

    <span class="hljs-comment">//继续</span>
    next();
};</code></pre>
<p>修改原有的Applicaton.handle函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.handle = function(req, res) {

    ...

    // 这里无需调用lazyrouter，因为listen前一定调用了.use或者.METHODS方法。
    // 如果二者都没有调用，没有必要创建路由系统。this._router为undefined。
    var router = this._router;
    if(router) {
        router.handle(req, res, done);
    } else {
        done();
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.handle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

    ...

    <span class="hljs-comment">// 这里无需调用lazyrouter，因为listen前一定调用了.use或者.METHODS方法。</span>
    <span class="hljs-comment">// 如果二者都没有调用，没有必要创建路由系统。this._router为undefined。</span>
    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>._router;
    <span class="hljs-keyword">if</span>(router) {
        router.handle(req, res, done);
    } <span class="hljs-keyword">else</span> {
        done();
    }
};</code></pre>
<p>运行<code>node test/index.js</code>走起……</p>
<p>express框架中，request和response两个对象有很多非常好用的函数，不过大部分和框架结构无关，并且这些函数内部过于专研细节，对框架本身的理解没有多少帮助。不过接下来有一个方面需要仔细研究一下，那就是前后端参数的传递，express如何获取并分类这些参数的，这一点还是需要略微了解。</p>
<p>默认情况下，一共有三种参数获取方式。</p>
<ul>
<li>req.query 代表查询字符串。</li>
<li>req.params 代表路径变量。</li>
<li>req.body 代表表单提交变量。</li>
</ul>
<p>req.query 是最常用的方式，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// GET /search?q=tobi+ferret
req.query.q
// => &quot;tobi ferret&quot;

// GET /shoes?order=desc&amp;shoe[color]=blue&amp;shoe[type]=converse
req.query.order
// => &quot;desc&quot;

req.query.shoe.color
// => &quot;blue&quot;

req.query.shoe.type
// => &quot;converse&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// GET /search?q=tobi+ferret</span>
req<span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.q</span>
<span class="hljs-comment">// =&gt; "tobi ferret"</span>

<span class="hljs-comment">// GET /shoes?order=desc&amp;shoe[color]=blue&amp;shoe[type]=converse</span>
req<span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.order</span>
<span class="hljs-comment">// =&gt; "desc"</span>

req<span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.shoe</span><span class="hljs-selector-class">.color</span>
<span class="hljs-comment">// =&gt; "blue"</span>

req<span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.shoe</span><span class="hljs-selector-class">.type</span>
<span class="hljs-comment">// =&gt; "converse"</span></code></pre>
<p>后台获取这些参数最简单的方式就是通过nodejs自带的querystring模块分析URL。express使用的是另一个npm包，<a href="https://github.com/ljharb/qs" rel="nofollow noreferrer" target="_blank">qs</a>。并且将其封装为另一个内部中间件，专门负责解析查询字符串，默认加载。</p>
<p>req.params 是另一种从URL获取参数的方式，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//路由规则  /user/:name
// GET /user/tj
req.params.name
// => &quot;tj&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>路由规则  <span class="hljs-regexp">/user/</span>:name
<span class="hljs-regexp">//</span> GET <span class="hljs-regexp">/user/</span>tj
req.params.name
<span class="hljs-regexp">//</span> =&gt; <span class="hljs-string">"tj"</span></code></pre>
<p>这是一种express框架规定的参数获取方式，对于批量处理逻辑非常实用。在expross中并没有实现，因为路径匹配问题过于细节化，如果对此感兴趣可以研究研究<a href="https://github.com/pillarjs/path-to-regexp" rel="nofollow noreferrer" target="_blank">path-to-regexp</a>模块，express也是在其上的封装。</p>
<p>req.body 是获取表单数据的方式，但是默认情况下框架是不会去解析这种数据，直接使用只会返回undefined。如果想要支持需要添加其他中间件，例如 <a href="https://www.npmjs.org/package/body-parser" rel="nofollow noreferrer" target="_blank">body-parser</a> 或 <a href="https://www.npmjs.org/package/multer" rel="nofollow noreferrer" target="_blank">multer</a>。</p>
<p>本小节主要介绍了request和response两个对象，并且讲解了一下现有expross框架中获取参数的方式，整体上并没有太深入的仿制，主要是这方面内容涉及的细节过多，只可意会。研究了也就仅仅知道而已，并不能带来多少积累，除非重头再造一次轮子。</p>
<h2 id="articleHeader7">6. 第六次迭代</h2>
<p>本小节是第六次迭代，主要的目的是介绍一下expresss是如何集成现有的渲染引擎的。与渲染引擎有关的事情涉及到下面几个方面：</p>
<ul>
<li>如何开发或绑定一个渲染引擎。</li>
<li>如何注册一个渲染引擎。</li>
<li>如何指定模板路径。</li>
<li>如何渲染模板引擎。</li>
</ul>
<p>express通过<code>app.engine(ext, callback)</code> 方法即可创建一个你自己的模板引擎。其中，<code>ext</code> 指的是文件扩展名、<code>callback</code> 是模板引擎的主函数，接受文件路径、参数对象和回调函数作为其参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//下面的代码演示的是一个非常简单的能够渲染 “.ntl” 文件的模板引擎。

var fs = require('fs'); // 此模板引擎依赖 fs 模块
app.engine('ntl', function (filePath, options, callback) { // 定义模板引擎
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // 这是一个功能极其简单的模板引擎
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//下面的代码演示的是一个非常简单的能够渲染 “.ntl” 文件的模板引擎。</span>

<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>); <span class="hljs-comment">// 此模板引擎依赖 fs 模块</span>
app.engine(<span class="hljs-string">'ntl'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filePath, options, callback</span>) </span>{ <span class="hljs-comment">// 定义模板引擎</span>
  fs.readFile(filePath, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, content</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err));
    <span class="hljs-comment">// 这是一个功能极其简单的模板引擎</span>
    <span class="hljs-keyword">var</span> rendered = content.toString().replace(<span class="hljs-string">'#title#'</span>, <span class="hljs-string">'&lt;title&gt;'</span>+ options.title +<span class="hljs-string">'&lt;/title&gt;'</span>)
    .replace(<span class="hljs-string">'#message#'</span>, <span class="hljs-string">'&lt;h1&gt;'</span>+ options.message +<span class="hljs-string">'&lt;/h1&gt;'</span>);
    <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, rendered);
  })
});</code></pre>
<p>为了让应用程序可以渲染模板文件，还需要做如下设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//views, 放模板文件的目录
app.set('views', './views')
//view engine, 模板引擎
app.set('view engine', 'jade')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//views, 放模板文件的目录</span>
app.set(<span class="hljs-string">'views'</span>, <span class="hljs-string">'./views'</span>)
<span class="hljs-comment">//view engine, 模板引擎</span>
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'jade'</span>)</code></pre>
<p>一旦 <code>view engine</code> 设置成功，就不需要显式指定引擎，或者在应用中加载模板引擎模块，Express 已经在内部加载。下面是如何渲染页面的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">title</span>: <span class="hljs-string">'Hey'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello there!'</span>});
});</code></pre>
<p>要想实现上述功能，首先在Application类中定义两个变量，一个存储app.set 和 app.get 这两个方法存储的值，另一个存储模板引擎中扩展名和渲染函数的对应关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Application() {
    this.settings = {};
    this.engines = {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Application</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.settings = {};
    <span class="hljs-keyword">this</span>.engines = {};
}</code></pre>
<p>然后是实现app.set函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.set = function(setting, val) {
      if (arguments.length === 1) {
      // app.get(setting)
      return this.settings[setting];
    }
  
    this.settings[setting] = val;
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.set = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">setting, val</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">1</span>) {
      <span class="hljs-comment">// app.get(setting)</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.settings[setting];
    }
  
    <span class="hljs-keyword">this</span>.settings[setting] = val;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>代码中不仅仅实现了设置，如何传入的参数只有一个等价于get函数。</p>
<p>接着实现app.get函数。因为现在已经有了一个app.get方法用来设置路由，所以需要在该方法上进行重载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Application.prototype[method] = function(path, fn) {
        if(method === 'get' &amp;&amp; arguments.length === 1) {
            // app.get(setting)
            return this.set(path);
        }

        ...
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">http.METHODS.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    method = method.toLowerCase();
    Application.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, fn</span>) </span>{
        <span class="hljs-keyword">if</span>(method === <span class="hljs-string">'get'</span> &amp;&amp; <span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">1</span>) {
            <span class="hljs-comment">// app.get(setting)</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.set(path);
        }

        ...
    };
});</code></pre>
<p>最后实现app.engine进行扩展名和引擎函数的映射。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.engine = function(ext, fn) {
    // get file extension
    var extension = ext[0] !== '.'
      ? '.' + ext
      : ext;

    // store engine
    this.engines[extension] = fn;

    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.engine = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ext, fn</span>) </span>{
    <span class="hljs-comment">// get file extension</span>
    <span class="hljs-keyword">var</span> extension = ext[<span class="hljs-number">0</span>] !== <span class="hljs-string">'.'</span>
      ? <span class="hljs-string">'.'</span> + ext
      : ext;

    <span class="hljs-comment">// store engine</span>
    <span class="hljs-keyword">this</span>.engines[extension] = fn;

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>扩展名当做key，统一添加“.”。</p>
<p>到此设置模板引擎相关信息的函数算是完成，接下来就是最重要的渲染引擎函数的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.render = function(view, options, callback) {
      var app = this.req.app;
    var done = callback;
    var opts = options || {};
    var self = this;

    //如果定义回调，则返回，否则渲染
    done = done || function(err, str) {
        if(err) {
            return req.next(err);
        }

        self.send(str);
    };

    //渲染
    app.render(view, opts, done);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">res.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">view, options, callback</span>) </span>{
      <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">this</span>.req.app;
    <span class="hljs-keyword">var</span> done = callback;
    <span class="hljs-keyword">var</span> opts = options || {};
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;

    <span class="hljs-comment">//如果定义回调，则返回，否则渲染</span>
    done = done || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, str</span>) </span>{
        <span class="hljs-keyword">if</span>(err) {
            <span class="hljs-keyword">return</span> req.next(err);
        }

        self.send(str);
    };

    <span class="hljs-comment">//渲染</span>
    app.render(view, opts, done);
};</code></pre>
<p>渲染函数一共有三个参数，view表示模板的名称，options是模板渲染的变量，callback是渲染成功后的回调函数。</p>
<p>函数内部直接调用render函数进行渲染，渲染完成后调用done回调。</p>
<p>接下来创建一个view.js文件，主要功能是负责各种模板引擎和框架间的隔离，保持对内接口的统一性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function View(name, options) {
    var opts = options || {};

    this.defaultEngine = opts.defaultEngine;
    this.root = opts.root;

    this.ext = path.extname(name);
    this.name = name;


    var fileName = name;
    if (!this.ext) {
      // get extension from default engine name
      this.ext = this.defaultEngine[0] !== '.'
        ? '.' + this.defaultEngine
        : this.defaultEngine;

      fileName += this.ext;
    }


    // store loaded engine
    this.engine = opts.engines[this.ext];

    // lookup path
    this.path = this.lookup(fileName);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">View</span>(<span class="hljs-params">name, options</span>) </span>{
    <span class="hljs-keyword">var</span> opts = options || {};

    <span class="hljs-keyword">this</span>.defaultEngine = opts.defaultEngine;
    <span class="hljs-keyword">this</span>.root = opts.root;

    <span class="hljs-keyword">this</span>.ext = path.extname(name);
    <span class="hljs-keyword">this</span>.name = name;


    <span class="hljs-keyword">var</span> fileName = name;
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.ext) {
      <span class="hljs-comment">// get extension from default engine name</span>
      <span class="hljs-keyword">this</span>.ext = <span class="hljs-keyword">this</span>.defaultEngine[<span class="hljs-number">0</span>] !== <span class="hljs-string">'.'</span>
        ? <span class="hljs-string">'.'</span> + <span class="hljs-keyword">this</span>.defaultEngine
        : <span class="hljs-keyword">this</span>.defaultEngine;

      fileName += <span class="hljs-keyword">this</span>.ext;
    }


    <span class="hljs-comment">// store loaded engine</span>
    <span class="hljs-keyword">this</span>.engine = opts.engines[<span class="hljs-keyword">this</span>.ext];

    <span class="hljs-comment">// lookup path</span>
    <span class="hljs-keyword">this</span>.path = <span class="hljs-keyword">this</span>.lookup(fileName);
}</code></pre>
<p>View类内部定义了很多属性，主要包括引擎、根目录、扩展名、文件名等等，为了以后的渲染做准备。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="View.prototype.render = function render(options, callback) {
    this.engine(this.path, options, callback);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">View.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">options, callback</span>) </span>{
    <span class="hljs-keyword">this</span>.engine(<span class="hljs-keyword">this</span>.path, options, callback);
};</code></pre>
<p>View的渲染函数内部就是调用一开始注册的引擎渲染函数。</p>
<p>了解了View的定义，接下来实现app.render模板渲染函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Application.prototype.render = function(name, options, callback) {
    var done = callback;
    var engines = this.engines;
    var opts = options;

    view = new View(name, {
      defaultEngine: this.get('view engine'),
      root: this.get('views'),
      engines: engines
    });


    if (!view.path) {
      var err = new Error('Failed to lookup view &quot;' + name + '&quot;');
      return done(err);
    }


    try {
      view.render(options, callback);
    } catch (e) {
      callback(e);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Application.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, options, callback</span>) </span>{
    <span class="hljs-keyword">var</span> done = callback;
    <span class="hljs-keyword">var</span> engines = <span class="hljs-keyword">this</span>.engines;
    <span class="hljs-keyword">var</span> opts = options;

    view = <span class="hljs-keyword">new</span> View(name, {
      <span class="hljs-attr">defaultEngine</span>: <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'view engine'</span>),
      <span class="hljs-attr">root</span>: <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'views'</span>),
      <span class="hljs-attr">engines</span>: engines
    });


    <span class="hljs-keyword">if</span> (!view.path) {
      <span class="hljs-keyword">var</span> err = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Failed to lookup view "'</span> + name + <span class="hljs-string">'"'</span>);
      <span class="hljs-keyword">return</span> done(err);
    }


    <span class="hljs-keyword">try</span> {
      view.render(options, callback);
    } <span class="hljs-keyword">catch</span> (e) {
      callback(e);
    }
};</code></pre>
<p><em>还有一些细节没有在教程中展示出来，可以参考github上传的案例代码。</em></p>
<p>貌似一切搞定，修改测试用例，尝试一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs'); // 此模板引擎依赖 fs 模块
app.engine('ntl', function (filePath, options, callback) { // 定义模板引擎
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // 这是一个功能极其简单的模板引擎
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});

app.set('views', './test/views'); // 指定视图所在的位置
app.set('view engine', 'ntl'); // 注册模板引擎


app.get('/', function(req, res, next) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>); <span class="hljs-comment">// 此模板引擎依赖 fs 模块</span>
app.engine(<span class="hljs-string">'ntl'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filePath, options, callback</span>) </span>{ <span class="hljs-comment">// 定义模板引擎</span>
  fs.readFile(filePath, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, content</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err));
    <span class="hljs-comment">// 这是一个功能极其简单的模板引擎</span>
    <span class="hljs-keyword">var</span> rendered = content.toString().replace(<span class="hljs-string">'#title#'</span>, <span class="hljs-string">'&lt;title&gt;'</span>+ options.title +<span class="hljs-string">'&lt;/title&gt;'</span>)
    .replace(<span class="hljs-string">'#message#'</span>, <span class="hljs-string">'&lt;h1&gt;'</span>+ options.message +<span class="hljs-string">'&lt;/h1&gt;'</span>);
    <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, rendered);
  });
});

app.set(<span class="hljs-string">'views'</span>, <span class="hljs-string">'./test/views'</span>); <span class="hljs-comment">// 指定视图所在的位置</span>
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'ntl'</span>); <span class="hljs-comment">// 注册模板引擎</span>


app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">title</span>: <span class="hljs-string">'Hey'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello there!'</span>});
});</code></pre>
<p>运行<code>node test/index.js</code>，查看效果。</p>
<p>上面的代码是自己注册的引擎，如果想要和现有的模板引擎结合还需要在回调函数中引用模板自身的渲染方法，当然为了方便，express框架内部提供了一个默认方法，如果模板引擎导出了该方法，则表示该模板引擎支持express框架，无需使用app.engine再次封装。</p>
<p>该方法声明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" __express(filePath, options, callback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;"> __express(<span class="hljs-name">filePath</span>, options, callback)</code></pre>
<p>可以参考ejs模板引擎的代码，看看它们是如何写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//该行代码在lib/ejs.js文件的355行左右
exports.__express = exports.renderFile;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//该行代码在lib/ejs.js文件的355行左右</span>
<span class="hljs-keyword">exports</span>.__express = <span class="hljs-keyword">exports</span>.renderFile;</code></pre>
<p>express框架是如何实现这个默认加载的功能的呢？很简单，只需要在View的构造函数中加一个判断即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!opts.engines[this.ext]) {
  // load engine
  var mod = this.ext.substr(1);
  opts.engines[this.ext] = require(mod).__express;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!opts.engines[<span class="hljs-keyword">this</span>.ext]) {
  <span class="hljs-comment">// load engine</span>
  <span class="hljs-keyword">var</span> mod = <span class="hljs-keyword">this</span>.ext.substr(<span class="hljs-number">1</span>);
  opts.engines[<span class="hljs-keyword">this</span>.ext] = <span class="hljs-built_in">require</span>(mod).__express;
}</code></pre>
<p>代码很简单，如果没有找到引擎对应的渲染函数，那就尝试加载__express函数。</p>
<h2 id="articleHeader8">后记</h2>
<p>至此，算是结束本篇文章了。其实还有很多内容可以写，但是写的有些烦了，篇幅太长了，大概有一万三千多字，后面有点应付了事的感觉。</p>
<p>简单的说一下还有哪里没有介绍。</p>
<ul><li>关于Application。</li></ul>
<p>如果稍微看过expross代码的人都会发现，Application并不是想我写的这样是一个类，而是一个中间件，一个对象，该对象使用了mixin方法的多继承手段，express.js文件中的createApplication函数算是整个框架的切入点。</p>
<ul><li>关于Router.handle。</li></ul>
<p>这个函数可以说是整个express框架的核心，如果理解了该函数，整个框架基本上就掌握了。我在仿制的时候舍弃了很多细节，在这里个函数里面内部有两个个关键点没说。一、处理URL形式的参数，这里涉及对params参数的提取过程。其中有一个restore函数使用高阶函数的方法做了缓存，仔细体会很有意思。二、setImmediate异步返回，之所以要使用异步处理，是因为下面的代码需要运行，包括路径相关的参数，这些参数在下一个处理函数中可能会用到。</p>
<ul><li>关于其他函数。</li></ul>
<p>太多函数了，不一一列举，前文已经提到，涉及的细节太多，正则表达式，http协议层，nodejs本身函数的使用，对于整个框架的理解帮助不大，全部舍弃。不过大多数函数都是自成体系，很好理解。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
express 源码阅读（全）

## 原文链接
[https://segmentfault.com/a/1190000011090124](https://segmentfault.com/a/1190000011090124)


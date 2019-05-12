---
title: '前端系列——nodejs环境下http2初尝试' 
date: 2018-12-14 2:30:11
hidden: true
slug: 3t2u59eyu0l
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">目的</h3>
<p>http2出来也有段时间了，很多网站都已经实际应用了它，而我还活在http1.1的时代，趁着还年轻，记性还行，花点时间研究了http2在nodejs中的使用。</p>
<h3 id="articleHeader1">http2基础理论</h3>
<ul>
<li>HTTP2是<strong>二进制</strong>协议</li>
<li>这是一个<strong>复用</strong>协议。并行的请求能在同一个链接中处理，移除了HTTP/1.x中顺序和阻塞的约束。</li>
<li>
<strong>压缩了headers</strong>。因为headers在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。</li>
<li>其允许服务器在客户端缓存中填充数据，通过一个叫<strong>服务器推送</strong>的机制来提前请求。</li>
<li>对Alt-Svc的支持允许了给定资源的位置和<strong>资源鉴定</strong>，允许了<strong>更智能的CDN缓冲</strong>机制。</li>
<li>
<strong>Client-Hints</strong> 的引入允许浏览器或者客户端来主动交流它的需求，或者是硬件约束的信息给服务端。</li>
<li>在Cookie头中<strong>引入安全相关的的前缀</strong>，现在帮助保证一个安全的cookie没被更改过。</li>
</ul>
<h3 id="articleHeader2">http2使用现状</h3>
<p><strong>案例1：淘宝</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3s9h?w=1838&amp;h=928" src="https://static.alili.tech/img/bV3s9h?w=1838&amp;h=928" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例2：京东</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3tal?w=1854&amp;h=986" src="https://static.alili.tech/img/bV3tal?w=1854&amp;h=986" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例3：知乎</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3taG?w=2092&amp;h=982" src="https://static.alili.tech/img/bV3taG?w=2092&amp;h=982" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>案例4：二月的公司</strong><br>不好意思，我们还没用上这么牛逼的协议。<br><span class="img-wrap"><img data-src="/img/bV3ttD?w=2064&amp;h=986" src="https://static.alili.tech/img/bV3ttD?w=2064&amp;h=986" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">nodejs应用HTTP2协议</h3>
<p>我参考了一个外国程序员和一个中国程序员的http2方案，然后对源码进行了调整，主要目的在于体验一把http2，没有很深的知识。如果你想深入了解node中http2的使用，请看这里：<a href="https://nodejs.org/api/http2.html" rel="nofollow noreferrer" target="_blank">nodejs之http2大全</a></p>
<h4>开发环境</h4>
<blockquote>mac: 10.12.6<br> node: v8.9.4</blockquote>
<h4>项目结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.js // 入口文件
├── package-lock.json 
├── package.json //配置
├── public // 前端资源文件
│&nbsp;&nbsp; ├── bundle1.js
│&nbsp;&nbsp; ├── bundle2.js
│&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; └── network.png
├── src //服务端文件
│&nbsp;&nbsp; ├── helper.js
│&nbsp;&nbsp; └── server.js
└── ssl //证书
    ├── cert.pem
    └── key.pem" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 入口文件</span>
├── package-lock<span class="hljs-selector-class">.json</span> 
├── package<span class="hljs-selector-class">.json</span> <span class="hljs-comment">//配置</span>
├── public <span class="hljs-comment">// 前端资源文件</span>
│&nbsp;&nbsp; ├── bundle1<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── bundle2<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp; └── network<span class="hljs-selector-class">.png</span>
├── src <span class="hljs-comment">//服务端文件</span>
│&nbsp;&nbsp; ├── helper<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── server<span class="hljs-selector-class">.js</span>
└── ssl <span class="hljs-comment">//证书</span>
    ├── cert<span class="hljs-selector-class">.pem</span>
    └── key.pem</code></pre>
<h4>步骤</h4>
<p><strong>1、你必须要安装http2</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save http2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> --save http2</code></pre>
<p><strong>2、生成ssl证书</strong></p>
<p>我比较懒，就没有自己生成，用别人生成好的证书来测试。</p>
<p><strong>3、项目中最核心的就是server文件</strong></p>
<p>可以看到代码中用到了fs读取文件，helper也是获取文件的插件。和使用http1.1不同的是，这里导入的是http2，然后用http2.createSecureServer()创建一个服务器。注意它的语法： http2.createSecureServer(options, callback)，options表示你的证书或者其他有关的配置选项，但是证书是必备的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const fs = require('fs')
const path = require('path')
const http2 = require('http2')
const helper = require('./helper')

const PORT = process.env.PORT || 8080
const PUBLIC_PATH = path.join(__dirname, '../public')
const publicFiles = helper.getFiles(PUBLIC_PATH)

//创建HTTP2服务器
const server = http2.createSecureServer({
  cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem')),
  key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem'))
}, onRequest)

// Request 事件
function onRequest (req, res) {
    // 路径指向 index.html
  const reqPath = req.url === '/' ? '/index.html' : req.url
    //获取html资源
  const file = publicFiles.get(reqPath)
  // 文件不存在
  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }
  
  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}
server.listen(PORT)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> http2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http2'</span>)
<span class="hljs-keyword">const</span> helper = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./helper'</span>)

<span class="hljs-keyword">const</span> PORT = process.env.PORT || <span class="hljs-number">8080</span>
<span class="hljs-keyword">const</span> PUBLIC_PATH = path.join(__dirname, <span class="hljs-string">'../public'</span>)
<span class="hljs-keyword">const</span> publicFiles = helper.getFiles(PUBLIC_PATH)

<span class="hljs-comment">//创建HTTP2服务器</span>
<span class="hljs-keyword">const</span> server = http2.createSecureServer({
  <span class="hljs-attr">cert</span>: fs.readFileSync(path.join(__dirname, <span class="hljs-string">'../ssl/cert.pem'</span>)),
  <span class="hljs-attr">key</span>: fs.readFileSync(path.join(__dirname, <span class="hljs-string">'../ssl/key.pem'</span>))
}, onRequest)

<span class="hljs-comment">// Request 事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRequest</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">// 路径指向 index.html</span>
  <span class="hljs-keyword">const</span> reqPath = req.url === <span class="hljs-string">'/'</span> ? <span class="hljs-string">'/index.html'</span> : req.url
    <span class="hljs-comment">//获取html资源</span>
  <span class="hljs-keyword">const</span> file = publicFiles.get(reqPath)
  <span class="hljs-comment">// 文件不存在</span>
  <span class="hljs-keyword">if</span> (!file) {
    res.statusCode = <span class="hljs-number">404</span>
    res.end()
    <span class="hljs-keyword">return</span>
  }
  
  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}
server.listen(PORT)
</code></pre>
<p><strong>4、写好服务端代码，剩下的事情就是启动项目，然后交给浏览器渲染html和加载资源。</strong></p>
<p><strong>5、关键点2 html文件</strong>  <br>确保你的浏览器支持fetch，因为我没有用第三方支持库，for循环的作用是客户端向服务器发起100个请求，让我们更加直观的看到http2请求多个资源的情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <meta charset=&quot;UTF-8&quot;>
</head>
<body>
  <h1>体验一把HTTP2</h1>
</body>
  <script src=&quot;bundle1.js&quot;></script>
  <script src=&quot;bundle2.js&quot;></script>
<script>
        for(var i=0;i<100;i++) {
            fetch('//localhost:8080/network.png');
        }
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>体验一把HTTP2<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">100</span>;i++) {
            fetch(<span class="hljs-string">'//localhost:8080/network.png'</span>);
        }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>6、渲染结果</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3tWv?w=2464&amp;h=1154" src="https://static.alili.tech/img/bV3tWv?w=2464&amp;h=1154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3tYV?w=1980&amp;h=378" src="https://static.alili.tech/img/bV3tYV?w=1980&amp;h=378" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">源码</h3>
<p><a href="https://github.com/hyy1115/http2-test" rel="nofollow noreferrer" target="_blank">http2-test</a></p>
<h3 id="articleHeader5">总结</h3>
<p>从测试结果来看，可以回顾一下http2的知识，非常明显的一点是：<strong>同个域名只需要占用一个 TCP 连接</strong>，头部压缩需要抓包才能分析出来，还有服务端推送等功能，在这里没有做测试，如果你也想体验一把http2，下载源码安装好插件就能用了，同时也得注意你的开发环境是否支持。</p>
<p>本文内容很浅，想要了解更多http2的知识，可以去知乎搜相关文章和回答。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——nodejs环境下http2初尝试

## 原文链接
[https://segmentfault.com/a/1190000013184607](https://segmentfault.com/a/1190000013184607)


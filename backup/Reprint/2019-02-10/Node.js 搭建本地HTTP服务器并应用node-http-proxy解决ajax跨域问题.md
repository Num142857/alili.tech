---
title: 'Node.js 搭建本地HTTP服务器并应用node-http-proxy解决ajax跨域问题' 
date: 2019-02-10 2:30:42
hidden: true
slug: zp9gl7na9ji
categories: [reprint]
---

{{< raw >}}

                    
<p>起因：公司的产品更换前端框架，接口的访问原本是通过nginx配置反向代理实现的，本地没有安装nginx，就用node.js做一个。</p>
<ul>
<li><p>node.js搭建本地http服务器参考了shawn.xie的<a href="http://www.cnblogs.com/shawn-xie/archive/2013/06/06/3121173.html" rel="nofollow noreferrer" target="_blank">《nodejs搭建本地http服务器》</a></p></li>
<li><p>node.js做转发使用node-http-proxy实现，官方文档：<a href="https://github.com/nodejitsu/node-http-proxy#using-https" rel="nofollow noreferrer" target="_blank">https://github.com/nodejitsu/node-http-proxy#using-https</a></p></li>
</ul>
<h2 id="articleHeader0">配置http服务器和proxy转发</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var mine = require('./mime').types;
var path = require('path');
var url = require('url');

var proxy = httpProxy.createProxyServer({
    target: 'https://192.168.101.166:8088',//接口地址
    ssl: {
        key: fs.readFileSync('server_decrypt.key', 'utf8'),
        cert: fs.readFileSync('server.crt', 'utf8')
    },
    secure: false
});

proxy.on('error', function(err, req, res){
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

var server = http.createServer(function(req, res){
    var pathName = url.parse(req.url).pathname;
    var realPath = req.url.substring(1);

    var extName = realPath;
    var indexOfQuestionMark = extName.indexOf('?');
    if(indexOfQuestionMark >= 0){
        extName = extName.substring(0, indexOfQuestionMark);
        realPath = realPath.substring(0, indexOfQuestionMark);
    }
    extName = path.extname(extName);
    extName = extName ? extName.slice(1) : 'unknown';


    //判断如果是接口访问，则通过proxy转发
    if(/\/svr\/.*$/.test(pathName)){
        proxy.web(req, res);
        return;
    }

    fs.exists(realPath, function(exists){
        if(!exists){
            res.writeHead(404, {'content-type': 'text/plain'});
            res.write('The request URL:' + realPath + ' could not be found.');
            res.end();
            return;
        }

        fs.readFile(realPath, 'binary', function(err, file){
            if(err){
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end(err);
                return;
            }

            var contentType = mine[extName] || 'text/plain';
            res.writeHead(200, {'content-type': contentType});
            res.write(file, 'binary');
            res.end();
        });
    });
});

server.listen(8088);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-built_in">var</span> httpProxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy'</span>);
<span class="hljs-built_in">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-built_in">var</span> mine = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./mime'</span>).types;
<span class="hljs-built_in">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

<span class="hljs-built_in">var</span> proxy = httpProxy.createProxyServer({
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'https://192.168.101.166:8088'</span>,<span class="hljs-comment">//接口地址</span>
    <span class="hljs-attribute">ssl</span>: {
        <span class="hljs-attribute">key</span>: fs.readFileSync(<span class="hljs-string">'server_decrypt.key'</span>, <span class="hljs-string">'utf8'</span>),
        <span class="hljs-attribute">cert</span>: fs.readFileSync(<span class="hljs-string">'server.crt'</span>, <span class="hljs-string">'utf8'</span>)
    },
    <span class="hljs-attribute">secure</span>: <span class="hljs-literal">false</span>
});

proxy.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, req, res</span>)</span>{
    res.writeHead(<span class="hljs-number">500</span>, {
        <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/plain'</span>
    });
    <span class="hljs-built_in">console</span>.log(err);
    res.end(<span class="hljs-string">'Something went wrong. And we are reporting a custom error message.'</span>);
});

<span class="hljs-built_in">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
    <span class="hljs-built_in">var</span> pathName = <span class="hljs-built_in">url</span>.parse(req.url).pathname;
    <span class="hljs-built_in">var</span> realPath = req.url.substring(<span class="hljs-number">1</span>);

    <span class="hljs-built_in">var</span> extName = realPath;
    <span class="hljs-built_in">var</span> indexOfQuestionMark = extName.indexOf(<span class="hljs-string">'?'</span>);
    <span class="hljs-keyword">if</span>(indexOfQuestionMark &gt;= <span class="hljs-number">0</span>){
        extName = extName.substring(<span class="hljs-number">0</span>, indexOfQuestionMark);
        realPath = realPath.substring(<span class="hljs-number">0</span>, indexOfQuestionMark);
    }
    extName = path.extname(extName);
    extName = extName ? extName.slice(<span class="hljs-number">1</span>) : <span class="hljs-string">'unknown'</span>;


    <span class="hljs-comment">//判断如果是接口访问，则通过proxy转发</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/\/svr\/.*$/</span>.test(pathName)){
        proxy.web(req, res);
        <span class="hljs-keyword">return</span>;
    }

    fs.exists(realPath, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">exists</span>)</span>{
        <span class="hljs-keyword">if</span>(!exists){
            res.writeHead(<span class="hljs-number">404</span>, {<span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/plain'</span>});
            res.write(<span class="hljs-string">'The request URL:'</span> + realPath + <span class="hljs-string">' could not be found.'</span>);
            res.end();
            <span class="hljs-keyword">return</span>;
        }

        fs.readFile(realPath, <span class="hljs-string">'binary'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, file</span>)</span>{
            <span class="hljs-keyword">if</span>(err){
                res.writeHead(<span class="hljs-number">500</span>, {<span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/plain'</span>});
                res.end(err);
                <span class="hljs-keyword">return</span>;
            }

            <span class="hljs-built_in">var</span> contentType = mine[extName] || <span class="hljs-string">'text/plain'</span>;
            res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'content-type'</span>: contentType});
            res.write(file, <span class="hljs-string">'binary'</span>);
            res.end();
        });
    });
});

server.listen(<span class="hljs-number">8088</span>);</code></pre>
<h2 id="articleHeader1">mime.js</h2>
<p>这里参考shawn.xie的源码，补充了几个字体文件的mime。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.types = {
  &quot;css&quot;: &quot;text/css&quot;,
  &quot;gif&quot;: &quot;image/gif&quot;,
  &quot;html&quot;: &quot;text/html&quot;,
  &quot;ico&quot;: &quot;image/x-icon&quot;,
  &quot;jpeg&quot;: &quot;image/jpeg&quot;,
  &quot;jpg&quot;: &quot;image/jpeg&quot;,
  &quot;js&quot;: &quot;text/javascript&quot;,
  &quot;json&quot;: &quot;application/json&quot;,
  &quot;pdf&quot;: &quot;application/pdf&quot;,
  &quot;png&quot;: &quot;image/png&quot;,
  &quot;svg&quot;: &quot;image/svg+xml&quot;,
  &quot;swf&quot;: &quot;application/x-shockwave-flash&quot;,
  &quot;tiff&quot;: &quot;image/tiff&quot;,
  &quot;txt&quot;: &quot;text/plain&quot;,
  &quot;wav&quot;: &quot;audio/x-wav&quot;,
  &quot;wma&quot;: &quot;audio/x-ms-wma&quot;,
  &quot;wmv&quot;: &quot;video/x-ms-wmv&quot;,
  &quot;xml&quot;: &quot;text/xml&quot;,
  &quot;woff&quot;: &quot;application/x-woff&quot;,
  &quot;woff2&quot;: &quot;application/x-woff2&quot;,
  &quot;tff&quot;: &quot;application/x-font-truetype&quot;,
  &quot;otf&quot;: &quot;application/x-font-opentype&quot;,
  &quot;eot&quot;: &quot;application/vnd.ms-fontobject&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">exports</span>.types = {
  <span class="hljs-string">"css"</span>: <span class="hljs-string">"text/css"</span>,
  <span class="hljs-string">"gif"</span>: <span class="hljs-string">"image/gif"</span>,
  <span class="hljs-string">"html"</span>: <span class="hljs-string">"text/html"</span>,
  <span class="hljs-string">"ico"</span>: <span class="hljs-string">"image/x-icon"</span>,
  <span class="hljs-string">"jpeg"</span>: <span class="hljs-string">"image/jpeg"</span>,
  <span class="hljs-string">"jpg"</span>: <span class="hljs-string">"image/jpeg"</span>,
  <span class="hljs-string">"js"</span>: <span class="hljs-string">"text/javascript"</span>,
  <span class="hljs-string">"json"</span>: <span class="hljs-string">"application/json"</span>,
  <span class="hljs-string">"pdf"</span>: <span class="hljs-string">"application/pdf"</span>,
  <span class="hljs-string">"png"</span>: <span class="hljs-string">"image/png"</span>,
  <span class="hljs-string">"svg"</span>: <span class="hljs-string">"image/svg+xml"</span>,
  <span class="hljs-string">"swf"</span>: <span class="hljs-string">"application/x-shockwave-flash"</span>,
  <span class="hljs-string">"tiff"</span>: <span class="hljs-string">"image/tiff"</span>,
  <span class="hljs-string">"txt"</span>: <span class="hljs-string">"text/plain"</span>,
  <span class="hljs-string">"wav"</span>: <span class="hljs-string">"audio/x-wav"</span>,
  <span class="hljs-string">"wma"</span>: <span class="hljs-string">"audio/x-ms-wma"</span>,
  <span class="hljs-string">"wmv"</span>: <span class="hljs-string">"video/x-ms-wmv"</span>,
  <span class="hljs-string">"xml"</span>: <span class="hljs-string">"text/xml"</span>,
  <span class="hljs-string">"woff"</span>: <span class="hljs-string">"application/x-woff"</span>,
  <span class="hljs-string">"woff2"</span>: <span class="hljs-string">"application/x-woff2"</span>,
  <span class="hljs-string">"tff"</span>: <span class="hljs-string">"application/x-font-truetype"</span>,
  <span class="hljs-string">"otf"</span>: <span class="hljs-string">"application/x-font-opentype"</span>,
  <span class="hljs-string">"eot"</span>: <span class="hljs-string">"application/vnd.ms-fontobject"</span>
};</code></pre>
<p>以上是全部的源码，配置中遇到几个问题说明如下：</p>
<p>1、接口采用https，所以http-proxy需要配置证书，按照官方的配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxy = httpProxy.createProxyServer({
    target: 'https://192.168.101.166:8088',
    ssl: {
        key: fs.readFileSync('server_decrypt.key', 'utf8'),
        cert: fs.readFileSync('server.crt', 'utf8')
    },
    secure: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> proxy = httpProxy.createProxyServer({
    target: <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//192.168.101.166:8088',</span>
    ssl: {
        key: fs.readFileSync(<span class="hljs-symbol">'server_decrypt</span>.key', <span class="hljs-symbol">'utf</span>8'),
        cert: fs.readFileSync(<span class="hljs-symbol">'server</span>.crt', <span class="hljs-symbol">'utf</span>8')
    },
    secure: <span class="hljs-literal">true</span>
});</code></pre>
<p>其中<strong>target</strong>是接口的IP地址，<strong>ssl</strong>配置key和证书，<strong>secure</strong>默认为true，运行访问接口后，node控制台提示：</p>
<blockquote><p>{ [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' }</p></blockquote>
<p>google后，这段意思大致是说证书未通过验证，通常在node中配置不验证证书即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rejectUnauthorized: false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">rejectUnauthorized:</span> <span class="hljs-literal">false</span></code></pre>
<p>但是我用的是http-proxy，没有rejectUnauthorized这个参数，再次阅读文档：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//
// Create the proxy server listening on port 443
//
httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  },
  target: 'https://localhost:9010',
  secure: true // Depends on your needs, could be false.
}).listen(443);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//</span>
<span class="hljs-comment">// Create the proxy server listening on port 443</span>
<span class="hljs-comment">//</span>
<span class="hljs-selector-tag">httpProxy</span><span class="hljs-selector-class">.createServer</span>({
  <span class="hljs-attribute">ssl</span>: {
    <span class="hljs-attribute">key</span>: fs.readFileSync(<span class="hljs-string">'valid-ssl-key.pem'</span>, <span class="hljs-string">'utf8'</span>),
    <span class="hljs-attribute">cert</span>: fs.readFileSync(<span class="hljs-string">'valid-ssl-cert.pem'</span>, <span class="hljs-string">'utf8'</span>)
  },
  <span class="hljs-attribute">target</span>: <span class="hljs-string">'https://localhost:9010'</span>,
  <span class="hljs-attribute">secure</span>: true <span class="hljs-comment">// Depends on your needs, could be false.</span>
})<span class="hljs-selector-class">.listen</span>(<span class="hljs-number">443</span>);</code></pre>
<p>其中<strong>secure</strong>这个参数的说明很模糊，尝试着将其设定为false，通过！</p>
<p>2、shawn.xie的源码中，对于url中扩展名的识别存在bug，比如这样的URL识别会取到最后一个点的位置，本来应该是woff2，结果却是0。<br><code>http://localhost:8000/ab/resources/fonts/font.woff2?v=4.5.0</code></p>
<p>本来尝试用正则处理，但是后向引用在js不支持，就老老实实的用indexOf解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var realPath = req.url.substring(1);
var extName = realPath;
var indexOfQuestionMark = extName.indexOf('?');
if(indexOfQuestionMark >= 0){
    extName = extName.substring(0, indexOfQuestionMark);
    realPath = realPath.substring(0, indexOfQuestionMark);
    //realPath是文件的真实路径，所以也要去掉扩展名后面?之后的部分
}
extName = path.extname(extName);
extName = extName ? extName.slice(1) : 'unknown';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> realPath = req.url.<span class="hljs-built_in">substring</span>(<span class="hljs-number">1</span>);
<span class="hljs-built_in">var</span> extName = realPath;
<span class="hljs-built_in">var</span> indexOfQuestionMark = extName.indexOf('?');
<span class="hljs-keyword">if</span>(indexOfQuestionMark &gt;= <span class="hljs-number">0</span>){
    extName = extName.<span class="hljs-built_in">substring</span>(<span class="hljs-number">0</span>, indexOfQuestionMark);
    realPath = realPath.<span class="hljs-built_in">substring</span>(<span class="hljs-number">0</span>, indexOfQuestionMark);
    //realPath是文件的真实路径，所以也要去掉扩展名后面?之后的部分
}
extName = path.extname(extName);
extName = extName ? extName.slice(<span class="hljs-number">1</span>) : '<span class="hljs-literal">unknown</span>';</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js 搭建本地HTTP服务器并应用node-http-proxy解决ajax跨域问题

## 原文链接
[https://segmentfault.com/a/1190000005101903](https://segmentfault.com/a/1190000005101903)


---
title: 'nodejs服务器部署教程二，把vue项目部署到线上' 
date: 2019-01-08 2:30:11
hidden: true
slug: gthlt69kful
categories: [reprint]
---

{{< raw >}}

                    
<p>nodejs服务端部署教程一,<a href="https://segmentfault.com/a/1190000010098126">https://segmentfault.com/a/11...</a><br>这篇文章主要介绍如何在服务端跑vuejs的项目,如果上一篇教程你成功输出了hello world，那这一篇更简单<br>首先你要有一个已经能在本地跑的基于vuejs的项目,我就以之前写的仿饿了么的项目为例来部署，如果你还没有已经写好的项目，可以用我的这个项目来学习,<a href="https://github.com/wmui/vue-elm" rel="nofollow noreferrer" target="_blank">https://github.com/wmui/vue-elm</a><br>这次部署就用最古老最省心的方法，ftp来上传项目</p>
<h4>项目打包</h4>
<p><code>npm run build</code>后会有一个dist目录，这个文件夹就是我们要部署上线的项目</p>
<h4>写一个小脚本</h4>
<p>如果你会点nodejs，脚本就很好理解了，下面是app.js启动脚本的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
// 模拟数据，api服务
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// api接口
var apiRoutes = express.Router();
apiRoutes.get('/seller', function(req, res) {
    res.json({
        erron: 0,
        data: seller
    })
});

apiRoutes.get('/goods', function(req, res) {
    res.json({
        erron: 0,
        data: goods
    })
});

apiRoutes.get('/ratings', function(req, res) {
    res.json({
        erron: 0,
        data: ratings
    })
});
app.use('/api', apiRoutes);
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
app.listen(8082);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> fs = <span class="hljs-keyword">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-comment">// 模拟数据，api服务</span>
<span class="hljs-keyword">var</span> appData = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./data.json'</span>);
<span class="hljs-keyword">var</span> seller = appData.seller;
<span class="hljs-keyword">var</span> goods = appData.goods;
<span class="hljs-keyword">var</span> ratings = appData.ratings;
<span class="hljs-comment">// api接口</span>
<span class="hljs-keyword">var</span> apiRoutes = express.Router();
apiRoutes.get(<span class="hljs-string">'/seller'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    res.json({
        erron: <span class="hljs-number">0</span>,
        data: seller
    })
});

apiRoutes.get(<span class="hljs-string">'/goods'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    res.json({
        erron: <span class="hljs-number">0</span>,
        data: goods
    })
});

apiRoutes.get(<span class="hljs-string">'/ratings'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    res.json({
        erron: <span class="hljs-number">0</span>,
        data: ratings
    })
});
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/api'</span>, apiRoutes);
app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(path.resolve(__dirname, <span class="hljs-string">'./dist'</span>)))

app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    <span class="hljs-keyword">const</span> html = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">'./dist/index.html'</span>), <span class="hljs-string">'utf-8'</span>)
    res.send(html)
})
app.listen(<span class="hljs-number">8082</span>);</code></pre>
<p>简单解释一下上面的代码，由于项目需要些数据，我的模拟数据都在data.json这个文件里，所有简单的写了三个路由,对应获取到模拟数据。然后把dist目录静态出来，读取dist目录下的index.html（因为是单页应用，只有这一个html文件）,监听8082端口</p>
<p>我们先在本地把要上传的文件都准备好：<br>我们的这个脚本使用了express框架,所以我们可以生成一个package.json，把依赖项添加进去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vue-elm-dist&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;app.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;dependencies&quot;: {
    &quot;express&quot;: &quot;^4.15.3&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"vue-elm-dist"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"app.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"express"</span>: <span class="hljs-string">"^4.15.3"</span>
  }
}</code></pre>
<p>完成以上操作，我们要上传的文件项目大概长这样<span class="img-wrap"><img data-src="/img/remote/1460000010181911" src="https://static.alili.tech/img/remote/1460000010181911" alt="" title="" style="cursor: pointer; display: inline;"></span><br>新建一个文件夹如elm,把整个项目通过ftp上传到根目录www文件夹下</p>
<h4>启动服务</h4>
<p>登陆到你的服务端,cd到elm文件夹，执行npm install 安装依赖,然后pm2 start app.js就成功启动服务了<span class="img-wrap"><img data-src="/img/remote/1460000010181912" src="https://static.alili.tech/img/remote/1460000010181912" alt="" title="" style="cursor: pointer; display: inline;"></span><br>现在通过ip加端口形式能正常访问，但是如果想通过域名访问就需要配置nginx映射</p>
<h4>nginx 端口映射配置</h4>
<p>首先你需要把一个二级域名解析到你的主机ip,比如我使用的elm.86886.wang这个二级域名<br>配置文件和之前的基本一致</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upstream elm {
    server 127.0.0.1:8082;
}

server {
    listen 80;
    server_name elm.86886.wang;

    location / {
        proxy_set_header Host  $http_host;
        proxy_set_header X-Real-IP  $remote_addr;  
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-Nginx-proxy true;
        proxy_pass http://elm;
        proxy_redirect off;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">upstream</span> elm {
    <span class="hljs-attribute">server</span> <span class="hljs-number">127.0.0.1:8082</span>;
}

<span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> elm.<span class="hljs-number">86886</span>.wang;

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">proxy_set_header</span> Host  <span class="hljs-variable">$http_host</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Real-IP  <span class="hljs-variable">$remote_addr</span>;  
        <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Nginx-proxy <span class="hljs-literal">true</span>;
        <span class="hljs-attribute">proxy_pass</span> http://elm;
        <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
    }
}</code></pre>
<p>我把它命名为elm-8082.conf<br>然后通过ftp上传到<code>/etc/nginx/conf.d/</code>目录下<br>执行sudo nginx -s reload重启nginx服务器，过个十分钟就应该能正常访问了 <a href="http://elm.86886.wang" rel="nofollow noreferrer" target="_blank">点击访问</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs服务器部署教程二，把vue项目部署到线上

## 原文链接
[https://segmentfault.com/a/1190000010205995](https://segmentfault.com/a/1190000010205995)

